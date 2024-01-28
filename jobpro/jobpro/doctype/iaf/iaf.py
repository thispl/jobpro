# Copyright (c) 2023, teamPRO and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class IAF(Document):    
    def on_update(self):
        if self.candidate:
            candidated = frappe.get_doc('Candidate',self.candidate)
            
        else:
            candidated = frappe.new_doc('Candidate')  
        candidated.given_name = self.candidate_name
        candidated.customer = self.client_name
        candidated.country = self.country
        candidated.project = self.project
        candidated.dob = self.dob
        candidated.mail_id = self.email_id
        candidated.age = self.candidate_age
        candidated.mobile_number = self.primary_mobile_number
        candidated.mobile = self.secondary_mobile_number
        candidated.currently_working = self.current_employer
        candidated.is_married = self.is_married
        candidated.location = self .current_location
        candidated.vaccination_status = self.vacinated
        candidated.vaccine_name = self.vaccination_name
        candidated.candidate_image= self.candidate_image
        candidated.currently_working = self.current_employer
        candidated.task = self.task
        candidated.passport_number = self.passport_number
        candidated.passport_expiry_date = self.expiery_date
        candidated.india_experience = self.india_experience
        candidated.nationality = self.nationality
        candidated.position = self.position
        candidated.task = self.task
        candidated.candidate_image = self.candidate_image
        candidated.current_ctc = self.current_ctc
        candidated.expected_ctc = self.expected_ctc
        candidated.currency_ctc = self.ctc_currency
        candidated.notice_period_months = self.notice_period_months
        candidated.total_experience = self.total_experience
        candidated.overseas_experience = self.overseas_experience
        candidated.ecr_status = self.ecr_status
        candidated.set('table_28',[])
        candidated.append('table_28',{
            'specialization':self.specialization,
            'qualification':self.degree,
            'year_of_passing':self.year_of_passing,
            'highest_qualification': 1
        })
        candidated.set('experience_details',[])
        candidated.append('experience_details',{
            'organization':self.current_employer,
        })
        candidated.save(ignore_permissions=True)
        self.candidate = candidated.name
        

