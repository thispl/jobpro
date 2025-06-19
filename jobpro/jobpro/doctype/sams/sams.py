# Copyright (c) 2022, teamPRO and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import random
import string
import smtplib
from email.mime.text import MIMEText
from collections.abc import Iterable
from datetime import timedelta

import frappe
import frappe.defaults
import frappe.permissions
import frappe.share
from frappe import STANDARD_USERS, _, msgprint, throw
from frappe.auth import MAX_PASSWORD_SIZE
from frappe.core.doctype.user_type.user_type import user_linked_with_permission_on_doctype
from frappe.desk.doctype.notification_settings.notification_settings import (
    create_notification_settings,
    toggle_notifications,
)
from frappe.desk.notifications import clear_notifications
from frappe.model.document import Document
from frappe.query_builder import DocType
from frappe.rate_limiter import rate_limit
from frappe.utils import (
    cint,
    escape_html,
    flt,
    format_datetime,
    get_formatted_email,
    get_system_timezone,
    has_gravatar,
    now_datetime,
    today,
)
from frappe.utils.deprecations import deprecated
from frappe.utils.password import check_password, get_password_reset_limit
from frappe.utils.password import update_password as _update_password
from frappe.utils.user import get_system_managers
from frappe.website.utils import is_signup_disabled

class SAMS(Document):
    pass
    # def send_welcome_mail_to_samsuser(self):
    #     from frappe.utils import get_url
    #     subject = None
    #     method = frappe.get_hooks("welcome_email")
    #     if method:
    #         subject = frappe.get_attr(method[-1])()
    #     if not subject:
    #         site_name = frappe.db.get_default("site_name") or frappe.get_conf().get("site_name")
    #         if site_name:
    #             subject = _("Welcome to {0}").format(site_name)
    #     welcome_email_template = frappe.db.get_system_setting("welcome_email_template")

    #     self.send_login_mail(
    #         subject,
    #         "sams_user",
    #         dict(
    #             # link=link,
    #             site_url=get_url(),
    #         ),
    #         custom_template=welcome_email_template,
    #     )
        

@frappe.whitelist()
def set_sams_user(name):
    mail_id=frappe.db.get_value("SAMS",{'name':name},['email_address'])
    first_name=frappe.db.get_value("SAMS",{'name':name},['person_name'])
    if not frappe.db.get_value("User",{"email":mail_id}):
        new_user = frappe.get_doc({
            "doctype": "User",
            "email": mail_id,
            "first_name":first_name,
            "send_welcome_email": 0,
            "new_password": "Sams@user123",
            # "roles": [{"doctype": "Has Role", "role": "SAMS User"}],
            "role_profile_name":"Sams",
            "module_profile":"jobpro",
        })
        new_user.insert()
        sams_user = frappe.new_doc("User Permission")
        sams_user.update({
            "user":mail_id,
            'allow':"SAMS",
            "for_value":name,
            "apply_to_all_doctypes":1,
            "is_default":1
        })
        sams_user.save(ignore_permissions=True)
        frappe.db.commit()
        sams_users = frappe.new_doc("User Permission")
        sams_users.update({
            "user":mail_id,
            'allow':"Sourced",
            "for_value":"SAMS",
            "apply_to_all_doctypes":1,
            "is_default":1
        })
        sams_users.save(ignore_permissions=True)
        frappe.db.commit()
        def send_welcome_mail_to_samsuser(mail_id,first_name):
            from frappe.utils import get_url
            site_name = frappe.db.get_default("site_name") or frappe.get_conf().get("site_name")
            subject = _("Welcome to TEAMPRO HR & IT Services Pvt. Ltd.")
            welcome_email_template = frappe.db.get_system_setting("welcome_email_template")
            send_login_mail_sams(
                mail_id,
                first_name,
                subject,
                "samss_user",
                dict(
                    site_url=get_url(),
                ),
                custom_template=welcome_email_template,
            )
            

        def send_login_mail_sams(mail_id,first_name, subject, template,add_args, now=None, custom_template=None):
            from frappe.utils.user import get_user_fullname
            from frappe.utils import get_url
            
            created_by = get_user_fullname(frappe.session["user"])
            if created_by == "Guest":
                created_by = "Administrator"
            args = {
                "user":mail_id,
                "first_name": first_name,
                "title": subject,
                "login_url": get_url(),
            }
            args.update(add_args)

            sender = frappe.session.user if frappe.session.user not in frappe.STANDARD_USERS else None
            content = None

            if custom_template:
                from frappe.email.doctype.email_template.email_template import get_email_template

                email_template = get_email_template(custom_template, args)
                subject = email_template.get("subject")
                content = email_template.get("message")

            frappe.sendmail(
                recipients=[mail_id],
                sender=sender,
                subject=subject,
                template=template if not custom_template else None,
                content=content if custom_template else None,
                args=args,
                header=[subject, "green"],
            )
        send_welcome_mail_to_samsuser(mail_id,first_name)

            