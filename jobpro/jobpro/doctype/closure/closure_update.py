# -*- coding: utf-8 -*-
# Copyright (c) 2020, teamPRO and contributors
# For license information, please see license.txt
from __future__ import unicode_literals
from inspect import classify_class_attrs
import frappe
from frappe.model.document import Document
from frappe.utils import today, flt, add_days, date_diff
from frappe.utils import cstr, formatdate, add_months, cint, fmt_money, add_days, flt
from frappe.utils import now
from frappe.utils.data import now_datetime
from erpnext.setup.utils import get_exchange_rate

class Closure(Document):
    # def on_update(self):
    #     if self.client_si:
    #         conversion = get_exchange_rate(self.billing_currency, "INR")
    #         conversion_amt=conversion * self.client_si
    #         # self.client_payment_company_currency = conversion * self.client_si
    #         self.client_payment_company_currency =conversion_amt
            # self.client_payment_dec_cc = conversion * self.client_dec
            # self.client_payment_sc_cc = conversion * self.client_service_charge
    def validate(self):
        if self.status == 'Dropped':
            frappe.db.set_value("Candidate", self.candidate,
                                "pending_for", "IDB")
            self.status = 'Dropped'

        elif self.status == 'Waitlisted':
            self.status = 'Waitlisted'
        else:
            self.validate_psl()
        if self.client_si:
            if self.billing_currency == "INR":
                self.client_payment_company_currency = self.client_si
            else:
                conversion = get_exchange_rate(self.billing_currency, "INR")
                conversion_amt=conversion * self.client_si
                self.client_payment_company_currency =conversion_amt
        if self.candidate_si:
            if self.billing_currency == "INR":
                self.candidate_payment_company_currenc = self.candidate_si
            else:
                conversion = get_exchange_rate(self.billing_currency, "INR")
                conversion_amt=conversion * self.candidate_si
                self.candidate_payment_company_currenc =conversion_amt
        # if self.visa_status=="Visa Pending" and self.visa:
        #     self.visa_status="Visa Received"
        # else:
        #     self.visa_status="Visa Pending"
    def validate_psl(self):
        if not self.onboarded:
            parent_territory = frappe.get_value(
                'Territory', self.territory, 'parent_territory')
            if self.territory == 'India' or parent_territory == 'India':
                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                if previous_status != self.status and self.status:
                    self.append("custom_history", {
                        "date":frappe.utils.now_datetime(),
                        "status_moved_by": frappe.session.user,
                        "status": self.status
                    })
                if self.so_created or self.so_confirmed_date:
                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                    if previous_status != self.status and self.status:
                        self.append("custom_history", {
                            "date":frappe.utils.now_datetime(),
                            "status_moved_by": frappe.session.user,
                            "status": self.status
                        })
                    if self.check==0:
                        # self.status = 'Arrived'
                        self.status = 'Onboarded'
                        self.onboarded = 1
                        self.status_updated_on = today()
                        self.custom_status_transition = today()
                        self.custom_modified_status= self.status
                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                        if previous_status != self.status and self.status:
                            self.append("custom_history", {
                                "date":frappe.utils.now_datetime(),
                                "status_moved_by": frappe.session.user,
                                "status": self.status
                            })
                    elif self.check==1:
                        self.status = 'Arrived'
                        self.status_updated_on = today()
                        self.custom_status_transition = today()
                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                        if previous_status != self.status and self.status:
                            self.append("custom_history", {
                                "date":frappe.utils.now_datetime(),
                                "status_moved_by": frappe.session.user,
                                "status": self.status
                            })
                    else:
                        self.status = 'Onboarding'
                        self.status_updated_on = today()
                        self.custom_status_transition = today()

                        self.custom_modified_status= self.status
                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                        if previous_status != self.status and self.status:
                            self.append("custom_history", {
                                "date":frappe.utils.now_datetime(),
                                "status_moved_by": frappe.session.user,
                                "status": self.status
                            })
                else:
                    self.status = 'Sales Order'
                    self.status_updated_on = today()
                    self.custom_status_transition = today()
                    self.custom_modified_status= self.status
                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                    if previous_status != self.status and self.status:
                        self.append("custom_history", {
                            "date":frappe.utils.now_datetime(),
                            "status_moved_by": frappe.session.user,
                            "status": self.status
                        })

            elif self.territory == 'KSA':
                if self.nationality=="Indian":
                    if self.irf and self.passport and self.photo:
                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                        if previous_status != self.status and self.status:
                            self.append("custom_history", {
                                "date":frappe.utils.now_datetime(),
                                "status_moved_by": frappe.session.user,
                                "status": self.status
                            })
                        if self.offer_letter:
                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                            if previous_status != self.status and self.status:
                                self.append("custom_history", {
                                    "date":frappe.utils.now_datetime(),
                                    "status_moved_by": frappe.session.user,
                                    "status": self.status
                                })
                            if self.sol:
                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                if previous_status != self.status and self.status:
                                    self.append("custom_history", {
                                        "date":frappe.utils.now_datetime(),
                                        "status_moved_by": frappe.session.user,
                                        "status": self.status
                                    })
                                if self.visa and self.so_created:
                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                    if previous_status != self.status and self.status:
                                        self.append("custom_history", {
                                            "date":frappe.utils.now_datetime(),
                                            "status_moved_by": frappe.session.user,
                                            "status": self.status
                                        })
                                    if self.pcc or self.pcc_not_applicable: 
                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                        if previous_status != self.status and self.status:
                                            self.append("custom_history", {
                                                "date":frappe.utils.now_datetime(),
                                                "status_moved_by": frappe.session.user,
                                                "status": self.status
                                            })
                                        if self.custom_medical_proof or self.custom_update_checkbox:
                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                            if previous_status != self.status and self.status:
                                                self.append("custom_history", {
                                                    "date":frappe.utils.now_datetime(),
                                                    "status_moved_by": frappe.session.user,
                                                    "status": self.status
                                                })
                                            if self.final_medical:
                                                # 
                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                if previous_status != self.status and self.status:
                                                    self.append("custom_history", {
                                                        "date":frappe.utils.now_datetime(),
                                                        "status_moved_by": frappe.session.user,
                                                        "status": self.status
                                                    })
                                                if self.custom_vfs_slip and self.custom_skip_biometric!=1: 
                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                    if previous_status != self.status and self.status:
                                                        self.append("custom_history", {
                                                            "date":frappe.utils.now_datetime(),
                                                            "status_moved_by": frappe.session.user,
                                                            "status": self.status
                                                        })
                                                    if self.custom_closure_status!="Initiated":
                                                        if self.visa_stamping:
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                            if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable and self.candidate_feedback_form:
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                                if self.ticket:
                                                                    if self.status == 'Onboarded':
                                                                        self.status = 'Onboarded'
                                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                        if previous_status != self.status and self.status:
                                                                            self.append("custom_history", {
                                                                                "date":frappe.utils.now_datetime(),
                                                                                "status_moved_by": frappe.session.user,
                                                                                "status": self.status
                                                                            })
                                                                        self.onboarded = 1
                                                                        self.boarded_date = today()
                                                
                                                                        self.custom_status_transition = today()
                                                                        self.custom_modified_status= self.status
                                                                        if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                                                self.custom_status_transition = today()
                                                                                self.custom_modified_status= self.status
                                                                        else:
                                                                            self.status = 'Onboarding'
                                                                            self.status_updated_on = today()
                                                    
                                                                            self.custom_status_transition = today()
                                                                            self.custom_modified_status= self.status
                                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                            if previous_status != self.status and self.status:
                                                                                self.append("custom_history", {
                                                                                    "date":frappe.utils.now_datetime(),
                                                                                    "status_moved_by": frappe.session.user,
                                                                                    "status": self.status
                                                                                })
                                                                    elif self.check==1:
                                                                        self.status = 'Arrived'
                                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                        if previous_status != self.status and self.status:
                                                                            self.append("custom_history", {
                                                                                "date":frappe.utils.now_datetime(),
                                                                                "status_moved_by": frappe.session.user,
                                                                                "status": self.status
                                                                            })
                                                                    else:
                                                                        self.status = 'Onboarding'
                                                                        self.status_updated_on = today()
                                                
                                                                        self.custom_status_transition = today()
                                                                        self.custom_modified_status= self.status
                                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                        if previous_status != self.status and self.status:
                                                                            self.append("custom_history", {
                                                                                "date":frappe.utils.now_datetime(),
                                                                                "status_moved_by": frappe.session.user,
                                                                                "status": self.status
                                                                            })
                                                                else:
                                                                    self.status = 'Ticket'
                                                                    self.ticket_date = today()
                                            
                                                                    self.custom_status_transition = today()
                                                                    self.custom_modified_status= self.status
                                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                    if previous_status != self.status and self.status:
                                                                        self.append("custom_history", {
                                                                            "date":frappe.utils.now_datetime(),
                                                                            "status_moved_by": frappe.session.user,
                                                                            "status": self.status
                                                                        })
                                                            else:
                                                                self.status = 'Emigration'
                                                                self.emigration_date = today()
                                        
                                                                self.custom_status_transition = today()
                                                                self.custom_modified_status= self.status
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                        else:
                                                            self.status = 'Visa Stamping'
                                                            self.stamped_visa_date = today()
                                    
                                                            self.custom_status_transition = today()
                                                            self.custom_modified_status= self.status
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                    else:
                                                        if self.custom_closure_status=="Initiated" and self.custom_attachment and self.custom_closure_initiated_date and self.custom_closure_location:
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                            if self.visa_stamping:
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                                if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable and self.candidate_feedback_form:
                                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                    if previous_status != self.status and self.status:
                                                                        self.append("custom_history", {
                                                                            "date":frappe.utils.now_datetime(),
                                                                            "status_moved_by": frappe.session.user,
                                                                            "status": self.status
                                                                        })
                                                                    if self.ticket:
                                                                        if self.status == 'Onboarded':
                                                                            self.status = 'Onboarded'
                                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                            if previous_status != self.status and self.status:
                                                                                self.append("custom_history", {
                                                                                    "date":frappe.utils.now_datetime(),
                                                                                    "status_moved_by": frappe.session.user,
                                                                                    "status": self.status
                                                                                })
                                                                            self.onboarded = 1
                                                                            self.boarded_date = today()
                                                    
                                                                            self.custom_status_transition = today()
                                                                            self.custom_modified_status= self.status
                                                                            if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                                                    self.custom_status_transition = today()
                                                                                    self.custom_modified_status= self.status
                                                                            else:
                                                                                self.status = 'Onboarding'
                                                                                self.status_updated_on = today()
                                                        
                                                                                self.custom_status_transition = today()
                                                                                self.custom_modified_status= self.status
                                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                                if previous_status != self.status and self.status:
                                                                                    self.append("custom_history", {
                                                                                        "date":frappe.utils.now_datetime(),
                                                                                        "status_moved_by": frappe.session.user,
                                                                                        "status": self.status
                                                                                    })
                                                                        elif self.check==1:
                                                                            self.status = 'Arrived'
                                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                            if previous_status != self.status and self.status:
                                                                                self.append("custom_history", {
                                                                                    "date":frappe.utils.now_datetime(),
                                                                                    "status_moved_by": frappe.session.user,
                                                                                    "status": self.status
                                                                                })
                                                                        else:
                                                                            self.status = 'Onboarding'
                                                                            self.status_updated_on = today()
                                                    
                                                                            self.custom_status_transition = today()
                                                                            self.custom_modified_status= self.status
                                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                            if previous_status != self.status and self.status:
                                                                                self.append("custom_history", {
                                                                                    "date":frappe.utils.now_datetime(),
                                                                                    "status_moved_by": frappe.session.user,
                                                                                    "status": self.status
                                                                                })
                                                                    else:
                                                                        self.status = 'Ticket'
                                                                        self.ticket_date = today()
                                                
                                                                        self.custom_status_transition = today()
                                                                        self.custom_modified_status= self.status
                                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                        if previous_status != self.status and self.status:
                                                                            self.append("custom_history", {
                                                                                "date":frappe.utils.now_datetime(),
                                                                                "status_moved_by": frappe.session.user,
                                                                                "status": self.status
                                                                            })
                                                                else:
                                                                    self.status = 'Emigration'
                                                                    self.emigration_date = today()
                                            
                                                                    self.custom_status_transition = today()
                                                                    self.custom_modified_status= self.status
                                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                    if previous_status != self.status and self.status:
                                                                        self.append("custom_history", {
                                                                            "date":frappe.utils.now_datetime(),
                                                                            "status_moved_by": frappe.session.user,
                                                                            "status": self.status
                                                                        })
                                                            else:
                                                                self.status = 'Visa Stamping'
                                                                self.stamped_visa_date = today()
                                        
                                                                self.custom_status_transition = today()
                                                                self.custom_modified_status= self.status
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                        else:
                                                            self.status = 'Trade Test'
                                                            self.custom_modified_status= self.status
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                    # 
                                                elif self.custom_skip_biometric==1:
                                                    if self.custom_closure_status!="Initiated":
                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                        if previous_status != self.status and self.status:
                                                            self.append("custom_history", {
                                                                "date":frappe.utils.now_datetime(),
                                                                "status_moved_by": frappe.session.user,
                                                                "status": self.status
                                                            })
                                                        if self.visa_stamping:
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                            if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable and self.candidate_feedback_form:
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                                if self.ticket:
                                                                    if self.status == 'Onboarded':
                                                                        self.status = 'Onboarded'
                                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                        if previous_status != self.status and self.status:
                                                                            self.append("custom_history", {
                                                                                "date":frappe.utils.now_datetime(),
                                                                                "status_moved_by": frappe.session.user,
                                                                                "status": self.status
                                                                            })
                                                                        self.onboarded = 1
                                                                        self.boarded_date = today()
                                                
                                                                        self.custom_status_transition = today()
                                                                        self.custom_modified_status= self.status
                                                                        if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                                            self.custom_status_transition = today()
                                                                            self.custom_modified_status= self.status
                                                                        else:
                                                                            self.status = 'Onboarding'
                                                                            self.status_updated_on = today()
                                                    
                                                                            self.custom_status_transition = today()
                                                                            self.custom_modified_status= self.status
                                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                            if previous_status != self.status and self.status:
                                                                                self.append("custom_history", {
                                                                                    "date":frappe.utils.now_datetime(),
                                                                                    "status_moved_by": frappe.session.user,
                                                                                    "status": self.status
                                                                                })
                                                                    elif self.check==1:
                                                                        self.status = 'Arrived'
                                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                        if previous_status != self.status and self.status:
                                                                            self.append("custom_history", {
                                                                                "date":frappe.utils.now_datetime(),
                                                                                "status_moved_by": frappe.session.user,
                                                                                "status": self.status
                                                                            })
                                                                    else:
                                                                        self.status = 'Onboarding'
                                                                        self.status_updated_on = today()
                                                
                                                                        self.custom_status_transition = today()
                                                                        self.custom_modified_status= self.status
                                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                        if previous_status != self.status and self.status:
                                                                            self.append("custom_history", {
                                                                                "date":frappe.utils.now_datetime(),
                                                                                "status_moved_by": frappe.session.user,
                                                                                "status": self.status
                                                                            })
                                                                else:
                                                                    self.status = 'Ticket'
                                                                    self.ticket_date = today()
                                            
                                                                    self.custom_status_transition = today()
                                                                    self.custom_modified_status= self.status
                                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                    if previous_status != self.status and self.status:
                                                                        self.append("custom_history", {
                                                                            "date":frappe.utils.now_datetime(),
                                                                            "status_moved_by": frappe.session.user,
                                                                            "status": self.status
                                                                        })
                                                            else:
                                                                self.status = 'Emigration'
                                                                self.emigration_date = today()
                                        
                                                                self.custom_status_transition = today()
                                                                self.custom_modified_status= self.status
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                        else:
                                                            self.status = 'Visa Stamping'
                                                            self.stamped_visa_date = today()
                                    
                                                            self.custom_status_transition = today()
                                                            self.custom_modified_status= self.status
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                    else:
                                                        if self.custom_closure_status=="Initiated" and self.custom_attachment and self.custom_closure_initiated_date and self.custom_closure_location:
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                            if self.visa_stamping:
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                                if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable and self.candidate_feedback_form:
                                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                    if previous_status != self.status and self.status:
                                                                        self.append("custom_history", {
                                                                            "date":frappe.utils.now_datetime(),
                                                                            "status_moved_by": frappe.session.user,
                                                                            "status": self.status
                                                                        })
                                                                    if self.ticket:
                                                                        if self.status == 'Onboarded':
                                                                            self.status = 'Onboarded'
                                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                            if previous_status != self.status and self.status:
                                                                                self.append("custom_history", {
                                                                                    "date":frappe.utils.now_datetime(),
                                                                                    "status_moved_by": frappe.session.user,
                                                                                    "status": self.status
                                                                                })
                                                                            self.onboarded = 1
                                                                            self.boarded_date = today()
                                                    
                                                                            self.custom_status_transition = today()
                                                                            self.custom_modified_status= self.status
                                                                            if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                                                self.custom_status_transition = today()
                                                                                self.custom_modified_status= self.status
                                                                            else:
                                                                                self.status = 'Onboarding'
                                                                                self.status_updated_on = today()
                                                        
                                                                                self.custom_status_transition = today()
                                                                                self.custom_modified_status= self.status
                                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                                if previous_status != self.status and self.status:
                                                                                    self.append("custom_history", {
                                                                                        "date":frappe.utils.now_datetime(),
                                                                                        "status_moved_by": frappe.session.user,
                                                                                        "status": self.status
                                                                                    })
                                                                        elif self.check==1:
                                                                            self.status = 'Arrived'
                                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                            if previous_status != self.status and self.status:
                                                                                self.append("custom_history", {
                                                                                    "date":frappe.utils.now_datetime(),
                                                                                    "status_moved_by": frappe.session.user,
                                                                                    "status": self.status
                                                                                })
                                                                        else:
                                                                            self.status = 'Onboarding'
                                                                            self.status_updated_on = today()
                                                    
                                                                            self.custom_status_transition = today()
                                                                            self.custom_modified_status= self.status
                                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                            if previous_status != self.status and self.status:
                                                                                self.append("custom_history", {
                                                                                    "date":frappe.utils.now_datetime(),
                                                                                    "status_moved_by": frappe.session.user,
                                                                                    "status": self.status
                                                                                })
                                                                    else:
                                                                        self.status = 'Ticket'
                                                                        self.ticket_date = today()
                                                
                                                                        self.custom_status_transition = today()
                                                                        self.custom_modified_status= self.status
                                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                        if previous_status != self.status and self.status:
                                                                            self.append("custom_history", {
                                                                                "date":frappe.utils.now_datetime(),
                                                                                "status_moved_by": frappe.session.user,
                                                                                "status": self.status
                                                                            })
                                                                else:
                                                                    self.status = 'Emigration'
                                                                    self.emigration_date = today()
                                            
                                                                    self.custom_status_transition = today()
                                                                    self.custom_modified_status= self.status
                                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                    if previous_status != self.status and self.status:
                                                                        self.append("custom_history", {
                                                                            "date":frappe.utils.now_datetime(),
                                                                            "status_moved_by": frappe.session.user,
                                                                            "status": self.status
                                                                        })
                                                            else:
                                                                self.status = 'Visa Stamping'
                                                                self.stamped_visa_date = today()
                                        
                                                                self.custom_status_transition = today()
                                                                self.custom_modified_status= self.status
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                        else:
                                                            self.status = 'Trade Test'
                                                            self.custom_modified_status= self.status
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                    #   
                                                else:
                                                    self.status = 'Biometric'
                                                    self.custom_status_transition = today()
                            
                                                    self.custom_modified_status= self.status
                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                    if previous_status != self.status and self.status:
                                                        self.append("custom_history", {
                                                            "date":frappe.utils.now_datetime(),
                                                            "status_moved_by": frappe.session.user,
                                                            "status": self.status
                                                        })
                                                    
                                            else:
                                                self.status = 'Biometric'
                                                self.custom_status_transition = today()
                        
                                                self.custom_modified_status= self.status
                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                if previous_status != self.status and self.status:
                                                    self.append("custom_history", {
                                                        "date":frappe.utils.now_datetime(),
                                                        "status_moved_by": frappe.session.user,
                                                        "status": self.status
                                                    })
                                        else:
                                            self.status = 'Final Medical'
                                            self.final_medical_date = today()
                    
                                            self.custom_status_transition = today()
                                            self.custom_modified_status= self.status
                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                            if previous_status != self.status and self.status:
                                                self.append("custom_history", {
                                                    "date":frappe.utils.now_datetime(),
                                                    "status_moved_by": frappe.session.user,
                                                    "status": self.status
                                                })
                                                
                                    else:
                                        self.status = "PCC"
                                        self.pcc_uploaded_date = today()
                
                                        self.custom_status_transition = today()
                                        self.custom_modified_status= self.status
                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                        if previous_status != self.status and self.status:
                                            self.append("custom_history", {
                                                "date":frappe.utils.now_datetime(),
                                                "status_moved_by": frappe.session.user,
                                                "status": self.status
                                            })
                                else:
                                    if self.is_required:
                                        if not self.certificate_attestation:
                                            self.status = 'Certificate Attestation'
                                            self.custom_status_transition = today()
                    
                                            self.custom_modified_status= self.status
                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                            if previous_status != self.status and self.status:
                                                self.append("custom_history", {
                                                    "date":frappe.utils.now_datetime(),
                                                    "status_moved_by": frappe.session.user,
                                                    "status": self.status
                                                })
                                            # self.reload()
                                        else:
                                            self.status = 'Visa'
                                            self.visa_date = today()
                    
                                            self.custom_status_transition = today()
                                            self.custom_modified_status= self.status
                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                            if previous_status != self.status and self.status:
                                                self.append("custom_history", {
                                                    "date":frappe.utils.now_datetime(),
                                                    "status_moved_by": frappe.session.user,
                                                    "status": self.status
                                                })
                                    else:
                                        self.status = 'Visa'
                                        self.visa_date = today()
                
                                        self.custom_status_transition = today()
                                        self.custom_modified_status= self.status
                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                        if previous_status != self.status and self.status:
                                            self.append("custom_history", {
                                                "date":frappe.utils.now_datetime(),
                                                "status_moved_by": frappe.session.user,
                                                "status": self.status
                                            })
                                

                            else:
                                self.status = "Signed Offer Letter"
                                self.col_date = today()
        
                                self.custom_status_transition = today()
                                self.custom_modified_status= self.status
                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                if previous_status != self.status and self.status:
                                    self.append("custom_history", {
                                        "date":frappe.utils.now_datetime(),
                                        "status_moved_by": frappe.session.user,
                                        "status": self.status
                                    })
                        else:
                            self.status = 'Client Offer Letter'
                            self.offer_letter_date = today()

                            self.custom_status_transition = today()
                            self.custom_modified_status= self.status
                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                            if previous_status != self.status and self.status:
                                self.append("custom_history", {
                                    "date":frappe.utils.now_datetime(),
                                    "status_moved_by": frappe.session.user,
                                    "status": self.status
                                })
                    else:
                        self.status = 'PSL'
                        self.status_updated_on = today()
                        self.custom_status_transition = today()
                        self.custom_modified_status= self.status
                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                        if previous_status != self.status and self.status:
                            self.append("custom_history", {
                                "date":frappe.utils.now_datetime(),
                                "status_moved_by": frappe.session.user,
                                "status": self.status
                            })
                