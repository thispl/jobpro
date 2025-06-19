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

class Candidate(Document):
    def validate(self):
        if self.custom_client_si:
            if self.custom_billing_currency == "INR":
                self.custom_client_payment_company_currency = self.custom_client_si
            else:
                conversion = get_exchange_rate(self.custom_billing_currency, "INR")
                conversion_amt=conversion * self.custom_client_si
                self.custom_client_payment_company_currency =conversion_amt
        if self.custom_candidate_si:
            if self.custom_billing_currency == "INR":
                self.custom_candidate_payment_company_currency = self.custom_candidate_si
            else:
                conversion = get_exchange_rate(self.custom_billing_currency, "INR")
                conversion_amt=conversion * self.custom_candidate_si
                self.custom_candidate_payment_company_currency =conversion_amt
        # if frappe.db.exists("Candidate",{'passport_number':self.passport_number,'project':self.project,'name':('!=', self.name)}):
        #     frappe.throw("Candidate Already Exists with Same Passport Number in Same Project")
        # candidate = frappe.get_doc('Candidate',{"mobile_number":self.mobile_number})
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

