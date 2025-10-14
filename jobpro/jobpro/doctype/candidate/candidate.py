# -*- coding: utf-8 -*-
# Copyright (c) 2020, teamPRO and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import today, add_years,nowdate
import json
from datetime import date,datetime
import qrcode
import base64
from PIL import Image
from io import BytesIO
from erpnext.setup.utils import get_exchange_rate
from frappe.utils.data import date_diff, now_datetime, nowdate, today, add_days

class Candidate(Document):
    def before_insert(self):
        if self.task:
            task = frappe.get_doc('Task', self.task)
            if task.get("custom_criteria_table"):
                for row in task.custom_criteria_table:
                    self.append("custom_criteria", {
                        "scheduling_parameter": row.scheduling_parameter,
                        "scheduling_criteria": row.scheduling_criteria
                    })
        self.append('custom_status_transition',{
            'status':self.pending_for,
            'sourced_date':now_datetime(),
            'sourced_by':self.candidate_created_by,
            'project':self.project,
            'task':self.task,
            'position':self.position
        })
        
    def after_insert(self):
        
        avail_mail = None
        avail_mob = None
        
        if self.mail_id or self.mobile_number:
        
            if self.mail_id:
                
                avail_mail = frappe.db.sql(
                "SELECT name FROM `tabUser` WHERE email = %s ORDER BY creation",
                (self.mail_id,),
                as_dict=True
            )
                
            if self.mobile_number:
                avail_mob = frappe.db.sql(
                    "SELECT name FROM `tabUser` WHERE mobile_no = %s ORDER BY creation",
                    (self.mobile_number,),
                    as_dict=True
                )
            
            if avail_mob:
                return
                # frappe.db.set_value("User", avail_mob[0].name, "mobile_no", "")
                    # frappe.errprint(avail_mob[0].name)

            

            elif avail_mail:
                return
                # frappe.db.set_value("User", avail_mail[0].name, "first_name", self.given_name)
                # frappe.db.set_value("User", avail_mail[0].name, "mobile_no", self.mobile_number)
                # frappe.db.set_value("User", avail_mail[0].name, "role_profile_name", "JOBPRO")
            else:
                if self.mail_id and self.mail_id.strip():
                    user = frappe.new_doc("User")
                    user.first_name = self.given_name
                    user.email = self.mail_id
                    user.mobile_no = self.mobile_number
                    user.role_profile_name = "JOBPRO"
                    user.insert(ignore_permissions=True)
                    
                    reset_link = f"http://139.5.190.19:8080/frontend/reset-password?user={self.mail_id}"
                    message = f"""
                    <p style="color: #05264e; font-weight: 700; font-size: 15px;">Dear {self.given_name},</p>
                    <p>Please click the link below to Set password for your account:</p>
                    <button style="border: 0px solid black; border-radius: 8px; color: white; padding: 3px; width: 140px; background-color: #0070cc;"><a href="{reset_link}" target="_blank" style="color: white; text-align: center; text-decoration: none;">Reset Password</a></button>
                    <p>If you did not request to set a password, please ignore this email.</p>
                    <p style="color: #0070cc;">Best regards,<br>Jobpro Team</p>
                    """
                    frappe.sendmail(
                        recipients=[self.mail_id],
                        subject="Set Your Password",
                        message=message,
                        reference_doctype="User",
                        reference_name=self.given_name,
                        delayed=False,
                    )    
            

    def validate(self):
        if not self.custom_client_si ==None:
            if self.custom_billing_currency == "INR":
                self.custom_client_payment_company_currency = self.custom_client_si
            else:
                conversion = get_exchange_rate(self.custom_billing_currency, "INR")
                # conversion_amt=conversion * self.custom_client_si
                # self.custom_client_payment_company_currency =conversion_amt
        if self.custom_candidate_si:
            if self.custom_billing_currency == "INR":
                self.custom_candidate_payment_company_currency = self.custom_candidate_si
            else:
                conversion = get_exchange_rate(self.custom_billing_currency, "INR")
                # conversion_amt=conversion * self.custom_candidate_si
                # self.custom_candidate_payment_company_currency =conversion_amt
        input_str = 'QR data'
        qr = qrcode.make(input_str)
        temp = BytesIO()
        qr.save(temp, "PNG")
        temp.seek(0)
        b64 = base64.b64encode(temp.read())
        qr_img =  "<img src='data:image/png;base64,{0}'/>".format(b64.decode("utf-8"))
        self.qr = "<h1>Test</h1>"

        # if self.territory == "India":
        #     # frappe.set_value('Candidate',"service","REC-D")
        #     self.service = 'REC-D'
        # else:
        #     # frappe.set_value('Candidate',"service","REC-I")
        #     self.service = 'REC-I'
    #     if self.dob and datetime.strptime(self.dob,'%Y-%m-%d') > date.today():
    #         frappe.throw("Date Of Birth can't be Future Date")
    #     if self.issued_date and datetime.strptime(self.issued_date,'%Y-%m-%d') > nowdate():
    #         frappe.throw("Issued Date can't be Future Date")
    #     if self.expected_doj and atetime.strptime(self.expected_doj,'%Y-%m-%d') < nowdate():
    #         frappe.throw("Expected Date of Joining can't be Past Date")

    # def validate_date(self):        
    #     if self.issued_date and datetime.strptime(self.issued_date,'%Y-%m-%d') > nowdate():
    #         return "Issued Date can't be Future Date"
            
    # def validate_dob(self):
    #     if self.dob and self.dob > nowdate():
    #         return "DOB can't be Future Date"

@frappe.whitelist()
def update_criteria_table(task_id,name):
    project = frappe.get_doc("Task", task_id)
    if not project.custom_criteria_table:
        return
    task = frappe.get_doc("Candidate", name)
    for row in project.custom_criteria_table:
        task.append("custom_criteria", {
            
            "scheduling_criteria": row.scheduling_criteria,  
            "scheduling_parameter": row.scheduling_parameter         
        })
    task.save()

@frappe.whitelist()
def Specialization(q_data):
    category = frappe.get_value("Qualification", {"name": q_data},['category'])
    # specialization = frappe.get_all("Specialization", {"category": category},['name'])
    return category
@frappe.whitelist()
def check_territory(territory):
    site = frappe.db.get_value("Territory",{"territory_name":territory},["parent_territory"])
    return site
# @frappe.whitelist()
# def restrict_candidate():
#     if frappe.db.exists('Candidate',name):



@frappe.whitelist()
def create_closure(doc,method):
    if doc.pending_for == 'Proposed PSL':
        
        closure_id = frappe.db.exists("Closure", {"candidate": doc.name})
        if closure_id:
            closure = frappe.get_doc("Closure", closure_id)
        else:    
            closure = frappe.new_doc("Closure")
        closure.update({
            "candidate": doc.name,
            "given_name": doc.given_name,
            "territory":doc.territory,
            "mobile": doc.mobile_number,
            "mail_id": doc.mail_id,
            "basic": doc.basic,
            "food_allowance": doc.food,
            "other_allowance": doc.other_allowances,
            "customer": doc.customer,
            "nationality": doc.nationality,
            "task": doc.task,
            "project": doc.project,
            "candidate_owner":doc.candidate_created_by,
            "sa_id":doc.sa_agent,
            "sa_name":doc.sa_agent_name,
            "sams_name":doc.sa_agent_name,
            "passport_no": doc.passport_number,
            "passport_number": doc.passport_number,
            "date_of_birth":doc.dob,
            "ecr_status":doc.ecr_status,
            "issued_date":doc.issued_date,
            "expiry_date":doc.passport_expiry_date,
            "expected_doj":doc.expected_doj or '',
            "place_of_issue":doc.place_of_issue,
            "selection_date":doc.interview_date,
            "interview_location":doc.interview_location,
            "service":doc.service,
            # "vaccination_certificate":doc.certificate_attach,
            # "vaccination_status":doc.vaccination_status
            })
        if doc.irf:
            closure.update({"irf": doc.irf})
        if doc.candidate_image:
            closure.update({"photo": doc.candidate_image})
        if doc.passport:
            closure.update({"passport": doc.passport})
        if doc.offer_letter:
            closure.update({"offer_letter": doc.offer_letter})
        closure.flags.ignore_mandatory = True
        closure.save(ignore_permissions=True)   
        frappe.db.commit()

def validate(self):
    if self.passport_number:
        existing = frappe.db.exists('Candidate', {'passport_number': self.passport_number, 'name': ['!=', self.name]})
        if existing:
            frappe.throw(('Passport Number must be unique'), frappe.DuplicateEntryError)

import frappe

@frappe.whitelist()
def send_interview_email(candidate_email, candidate_name, candidate_created_by, name):
    # check=frappe.db.get_value('Candidate','name':name,'custom_via_email_send')
    # if check != 1:
    #     frappe.db.set_value('Candidate','name':name,'custom_via_email_send',1)
    subject = f"Interview Invitation for {candidate_name}"
    
    message = f"""
    <p><b>Dear {candidate_name},</p>
    <p>You have been invited for an interview. Kindly find the attached documents for your reference.</p><b><br><br><br>
    <p><strong>Best Regards,<br>TEAMPRO HR & IT Services Pvt. Ltd.</strong></p>
    """
    
    frappe.sendmail(
        sender=candidate_created_by,
        recipients=[candidate_email],
        cc=[candidate_created_by,"sangeetha.a@groupteampro.com"],
        subject=subject,
        message=message,
        now=True,
        attachments=[frappe.attach_print("Candidate", name,
            file_name="Interview Call Letter", print_format="Interview Call Letter")]
    )
    
@frappe.whitelist()
def create_closure_with_payment(doc,method):
    if doc.pending_for == 'Proposed PSL':
        
        closure_id = frappe.db.exists("Closure", {"candidate": doc.name})
        if closure_id:
            closure = frappe.get_doc("Closure", closure_id)
        else:    
            closure = frappe.new_doc("Closure")
        closure.update({
            "candidate": doc.name,
            "given_name": doc.given_name,
            "territory":doc.territory,
            "mobile": doc.mobile_number,
            "mail_id": doc.mail_id,
            "basic": doc.basic,
            "food_allowance": doc.food,
            "other_allowance": doc.other_allowances,
            "customer": doc.customer,
            "nationality": doc.nationality,
            "task": doc.task,
            "project": doc.project,
            "candidate_owner":doc.candidate_created_by,
            "sa_id":doc.sa_agent,
            "sa_name":doc.sa_agent_name,
            "sams_name":doc.sa_agent_name,
            "passport_no": doc.passport_number,
            "passport_number": doc.passport_number,
            "date_of_birth":doc.dob,
            "ecr_status":doc.ecr_status,
            "issued_date":doc.issued_date,
            "expiry_date":doc.passport_expiry_date,
            "expected_doj":doc.expected_doj or '',
            "place_of_issue":doc.place_of_issue,
            "selection_date":doc.interview_date,
            "interview_location":doc.interview_location,
            "service":doc.service,
            })
        if doc.irf:
            closure.update({"irf": doc.irf})
        if doc.candidate_image:
            closure.update({"photo": doc.candidate_image})
        if doc.passport:
            closure.update({"passport": doc.passport})
        if doc.offer_letter:
            closure.update({"offer_letter": doc.offer_letter})
        closure.payment=doc.custom_payment_from
        if not doc.custom_billing_currency:
            frappe.throw("Kindly enter the Billing Currency in Payment Details")
        closure.billing_currency=doc.custom_billing_currency
        if doc.custom_payment_from=="Candidate":
            if not doc.custom_candidate_si:
                frappe.throw("Kindly enter the Candidate SI in Payment Details")
            if not doc.custom_candidate_payment_company_currency:
                frappe.throw("Kindly enter the Candidate Payment Company Currency in Payment Details")
            closure.candidate_si=doc.custom_candidate_si
            closure.candidate_payment_company_currenc=doc.custom_candidate_payment_company_currency
            closure.candidate_service_charge=doc.custom_candidate_si
        if doc.custom_payment_from=="Client":
            if not doc.custom_client_si:
                frappe.throw("Kindly enter the Client SI in Payment Details")
            if not doc.custom_client_payment_company_currency:
                frappe.throw("Kindly enter the Client Payment Company Currency in Payment Details")
            closure.client_si=doc.custom_client_si
            closure.client_payment_company_currency=doc.custom_client_payment_company_currency
        if doc.custom_payment_from=="Associate":
            if not doc.custom_associate_si:
                frappe.throw("Kindly enter the Associate SI in Payment Details")
            closure.associate_si=doc.custom_associate_si
            closure.associate_service_charge=doc.custom_associate_si
        if doc.custom_payment_from=="Both":
            if not doc.custom_client_si:
                frappe.throw("Kindly enter the Client SI in Payment Details")
            if not doc.custom_client_payment_company_currency:
                frappe.throw("Kindly enter the Client Payment Company Currency in Payment Details")
            if not doc.custom_candidate_payment_company_currency:
                frappe.throw("Kindly enter the Candidate Payment Company Currency in Payment Details")
            if not doc.custom_candidate_si:
                frappe.throw("Kindly enter the Candidate SI in Payment Details")
            closure.client_si=doc.custom_client_si
            closure.client_payment_company_currency=doc.custom_client_payment_company_currency
            closure.candidate_payment_company_currenc=doc.custom_candidate_payment_company_currency
            closure.candidate_si=doc.custom_candidate_si
                
        # if doc.payment_details:
        #     for i in doc.payment_details:
        #         closure.payment=i.payment_from
                # if not i.billing_currency:
                #     frappe.throw("Kindly enter the Billing Currency in Payment Details")
                # closure.billing_currency=i.billing_currency
                # if i.payment_from=="Candidate":
                #     if not i.candidate_si:
                #         frappe.throw("Kindly enter the Candidate SI in Payment Details")
                #     if not i.candidate_payment_company_currency:
                #         frappe.throw("Kindly enter the Candidate Payment Company Currency in Payment Details")
                    # closure.candidate_si=i.candidate_si
                    # closure.candidate_payment_company_currenc=i.candidate_payment_company_currency
                    # closure.candidate_service_charge=i.candidate_si
                # if i.payment_from=="Client":
                #     if not i.client_si:
                #         frappe.throw("Kindly enter the Client SI in Payment Details")
                #     if not i.client_payment_company_currency:
                #         frappe.throw("Kindly enter the Client Payment Company Currency in Payment Details")
                #     closure.client_si=i.client_si
                #     closure.client_payment_company_currency=i.client_payment_company_currency
                # if i.payment_from=="Associate":
                #     if not i.associate_si:
                #         frappe.throw("Kindly enter the Associate SI in Payment Details")
                #     closure.associate_si=i.associate_si
                #     closure.associate_service_charge=i.associate_si
                # if i.payment_from=="Both":
                #     if not i.client_si:
                #         frappe.throw("Kindly enter the Client SI in Payment Details")
                #     if not i.client_payment_company_currency:
                #         frappe.throw("Kindly enter the Client Payment Company Currency in Payment Details")
                #     if not i.candidate_payment_company_currency:
                #         frappe.throw("Kindly enter the Candidate Payment Company Currency in Payment Details")
                #     if not i.candidate_si:
                #         frappe.throw("Kindly enter the Candidate SI in Payment Details")
                #     closure.client_si=i.client_si
                #     closure.client_payment_company_currency=i.client_payment_company_currency
                #     closure.candidate_payment_company_currenc=i.candidate_payment_company_currency
                #     closure.candidate_si=i.candidate_si

        closure.flags.ignore_mandatory = True
        closure.save(ignore_permissions=True)   
        frappe.db.commit()

@frappe.whitelist()
def update_sa_details_task(task=None, sa_agent=None):
    if sa_agent and task:
        if frappe.db.exists("Task", task):
            task_doc = frappe.get_doc("Task", task)
            found = False
            if task_doc.sa_detail:
                for i in task_doc.sa_detail:
                    if i.sa_id == sa_agent:
                        i.received_count += 1
                        found = True
                        break  
            if not found:
                task_doc.append("sa_detail", {
                    "sa_id": sa_agent,
                    "received_count": 1
                })
            task_doc.save(ignore_permissions=True)
            frappe.db.commit()
            return "Updated successfully"
