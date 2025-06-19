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

            elif self.territory == 'Qatar':
                if self.irf and self.passport and self.photo:
                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                    if previous_status != self.status and self.status:
                        self.append("custom_history", {
                            "date": frappe.utils.now_datetime(),
                            "status_moved_by": frappe.session.user,
                            "status": self.status
                        })
                    if self.offer_letter:
                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                        if previous_status != self.status and self.status:
                            self.append("custom_history", {
                                "date": frappe.utils.now_datetime(),
                                "status_moved_by": frappe.session.user,
                                "status": self.status
                            })
                        if self.sol:
                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                            if previous_status != self.status and self.status:
                                self.append("custom_history", {
                                    "date": frappe.utils.now_datetime(),
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
                                # if self.final_medical:
                                if self.visa and self.so_created:
                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                    if previous_status != self.status and self.status:
                                        self.append("custom_history", {
                                            "date":frappe.utils.now_datetime(),
                                            "status_moved_by": frappe.session.user,
                                            "status": self.status
                                        })
                                    if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable ==1 and self.candidate_feedback_form:
                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                        if previous_status != self.status and self.status:
                                            self.append("custom_history", {
                                                "date":frappe.utils.now_datetime(),
                                                "status_moved_by": frappe.session.user,
                                                "status": self.status
                                            })
                                        if self.ticket:
                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                            if previous_status != self.status and self.status:
                                                self.append("custom_history", {
                                                    "date":frappe.utils.now_datetime(),
                                                    "status_moved_by": frappe.session.user,
                                                    "status": self.status
                                                })
                                            # if self.status == 'Arrived':
                                            if self.status == 'Onboarded':
                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                if previous_status != self.status and self.status:
                                                    self.append("custom_history", {
                                                        "date":frappe.utils.now_datetime(),
                                                        "status_moved_by": frappe.session.user,
                                                        "status": self.status
                                                    })
                                                self.status = 'Onboarded'
                                                # self.status = 'Arrived'
                                                self.onboarded = 1
                                                self.boarded_date = today()
                        
                                                self.custom_status_transition = today()
                                                self.custom_modified_status= self.status
                                                # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                                                if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                    # self.status='Concluded'
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
                                    if self.is_required:
                                        if not self.certificate_attestation:
                                            frappe.db.set_value(
                                                "Closure", self.name, "status", "Certificate Attestation")
                                            # self.save(ignore_permissions=True)
                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                            if previous_status != self.status and self.status:
                                                self.append("custom_history", {
                                                    "date":frappe.utils.now_datetime(),
                                                    "status_moved_by": frappe.session.user,
                                                    "status": self.status
                                                })
                                            frappe.reload_doctype("Closure")
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
                                            # self.save()
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
                                    # else:
                                    #     self.status = 'Final Medical'
                                    #     self.premedical_date = today()
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
                            self.status = 'Signed Offer Letter'
                            self.pcc_not_applicable = 1
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
                        self.status = 'Client Offer Letter'
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

            elif self.territory == 'UAE' and self.visa_state == 'Abudhabi':
                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                if previous_status != self.status and self.status:
                    self.append("custom_history", {
                        "date":frappe.utils.now_datetime(),
                        "status_moved_by": frappe.session.user,
                        "status": self.status
                    })
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
                            if self.pcc or self.pcc_not_applicable:        
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
                                    if self.final_medical:
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
                                            if self.ecr_status != 'ECR' or self.emigration and self.candidate_feedback_form:
                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                if previous_status != self.status and self.status:
                                                    self.append("custom_history", {
                                                        "date":frappe.utils.now_datetime(),
                                                        "status_moved_by": frappe.session.user,
                                                        "status": self.status
                                                    })
                                                if self.ticket:
                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                    if previous_status != self.status and self.status:
                                                        self.append("custom_history", {
                                                            "date":frappe.utils.now_datetime(),
                                                            "status_moved_by": frappe.session.user,
                                                            "status": self.status
                                                        })
                                                    if self.status == 'Onboarded':
                                                        self.status = 'Onboarded'
                                                    # if self.status == 'Arrived':
                                                    #     self.status = 'Arrived'
                                                        self.onboarded = 1
                                
                                                        self.boarded_date = today()
                                                        self.custom_status_transition = today()
                                                        self.custom_modified_status= self.status
                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                        if previous_status != self.status and self.status:
                                                            self.append("custom_history", {
                                                                "date":frappe.utils.now_datetime(),
                                                                "status_moved_by": frappe.session.user,
                                                                "status": self.status
                                                            })
                                                        # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                                                        if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                            # self.status='Concluded'
                                    
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
                            self.status = 'Signed Offer Letter'
                            self.pcc_not_applicable = 1
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
                        # else:
                        #     self.status = 'Sales Order'
                        #     self.status_updated_on = today()
                    else:
                        self.status = "Client Offer Letter"
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

            elif self.territory == 'UAE' and self.visa_state == 'Dubai':
                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                if previous_status != self.status and self.status:
                    self.append("custom_history", {
                        "date":frappe.utils.now_datetime(),
                        "status_moved_by": frappe.session.user,
                        "status": self.status
                    })
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
                        # if self.so_created or self.so_confirmed_date:
                        if self.sol:
                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                            if previous_status != self.status and self.status:
                                self.append("custom_history", {
                                    "date":frappe.utils.now_datetime(),
                                    "status_moved_by": frappe.session.user,
                                    "status": self.status
                                })
                            if self.final_medical:
                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                if previous_status != self.status and self.status:
                                    self.append("custom_history", {
                                        "date":frappe.utils.now_datetime(),
                                        "status_moved_by": frappe.session.user,
                                        "status": self.status
                                    })
                                if self.pcc or self.pcc_not_applicable == 1:
                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                    if previous_status != self.status and self.status:
                                        self.append("custom_history", {
                                            "date":frappe.utils.now_datetime(),
                                            "status_moved_by": frappe.session.user,
                                            "status": self.status
                                        })
                                    if self.visa:
                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                        if previous_status != self.status and self.status:
                                            self.append("custom_history", {
                                                "date":frappe.utils.now_datetime(),
                                                "status_moved_by": frappe.session.user,
                                                "status": self.status
                                            })
                                        if self.ecr_status != 'ECR' or self.emigration and self.candidate_feedback_form:
                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                            if previous_status != self.status and self.status:
                                                self.append("custom_history", {
                                                    "date":frappe.utils.now_datetime(),
                                                    "status_moved_by": frappe.session.user,
                                                    "status": self.status
                                                })
                                            if self.ticket:
                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                if previous_status != self.status and self.status:
                                                    self.append("custom_history", {
                                                        "date":frappe.utils.now_datetime(),
                                                        "status_moved_by": frappe.session.user,
                                                        "status": self.status
                                                    })
                                                if self.status == 'Onboarded':
                                                    self.status = 'Onboarded'
                                                # if self.status == 'Arrived':
                                                #     self.status = 'Arrived'
                                                    self.onboarded = 1
                            
                                                    self.boarded_date = today()
                                                    self.custom_status_transition = today()
                                                    self.custom_modified_status= self.status
                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                    if previous_status != self.status and self.status:
                                                        self.append("custom_history", {
                                                            "date":frappe.utils.now_datetime(),
                                                            "status_moved_by": frappe.session.user,
                                                            "status": self.status
                                                        })
                                                    # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                                                    if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                            # self.status='Concluded'
                                    
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
                                    self.status = "PCC"
                                    self.pcc_uploaded_date
            
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
                                self.premedical_date = today()
        
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
                            self.status = 'Signed Offer Letter'
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
                        # else:
                        #     self.status = 'Sales Order'
                        #     self.status_updated_on = today()
                    else:
                        self.status = 'Client Offer Letter'
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

            elif self.territory == 'Oman':
                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                if previous_status != self.status and self.status:
                    self.append("custom_history", {
                        "date":frappe.utils.now_datetime(),
                        "status_moved_by": frappe.session.user,
                        "status": self.status
                    })
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
                            if self.pcc or self.pcc_not_applicable == 1 :
                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                if previous_status != self.status and self.status:
                                    self.append("custom_history", {
                                        "date":frappe.utils.now_datetime(),
                                        "status_moved_by": frappe.session.user,
                                        "status": self.status
                                    })
                                if self.final_medical:
                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                    if previous_status != self.status and self.status:
                                        self.append("custom_history", {
                                            "date":frappe.utils.now_datetime(),
                                            "status_moved_by": frappe.session.user,
                                            "status": self.status
                                        })
                                    if self.visa and self.so_created == 1:
                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                        if previous_status != self.status and self.status:
                                            self.append("custom_history", {
                                                "date":frappe.utils.now_datetime(),
                                                "status_moved_by": frappe.session.user,
                                                "status": self.status
                                            })
                                        if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable == 1 and self.candidate_feedback_form:
                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                            if previous_status != self.status and self.status:
                                                self.append("custom_history", {
                                                    "date":frappe.utils.now_datetime(),
                                                    "status_moved_by": frappe.session.user,
                                                    "status": self.status
                                                })
                                            if self.ticket:
                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                if previous_status != self.status and self.status:
                                                    self.append("custom_history", {
                                                        "date":frappe.utils.now_datetime(),
                                                        "status_moved_by": frappe.session.user,
                                                        "status": self.status
                                                    })
                                                if self.status == 'Onboarded':
                                                    self.status = 'Onboarded'
                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                    if previous_status != self.status and self.status:
                                                        self.append("custom_history", {
                                                            "date":frappe.utils.now_datetime(),
                                                            "status_moved_by": frappe.session.user,
                                                            "status": self.status
                                                        })
                                                # if self.status == 'Arrived':
                                                #     self.status = 'Arrived'
                                                    self.onboarded = 1
                                                    self.boarded_date = today()
                            
                                                    self.custom_status_transition = today()
                                                    self.custom_modified_status= self.status
                                                    # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                                                    if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                            # self.status='Concluded'
                                    
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
                                        if self.is_required:
                                            if not self.certificate_attestation:
                                                frappe.db.set_value(
                                                    "Closure", self.name, "status", "Certificate Attestation")
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
                                    self.status = 'Final Medical'
                                    self.date_of_final_medical = today()
            
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
                                self.status = 'PCC'
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
                            self.status = 'Signed Offer Letter'
                            self.pcc_not_applicable = 1
                            self.sol_uploaded_date = today()
    
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

            elif self.territory == 'Kuwait':
                customer_so=frappe.db.get_value("Customer",{"name":self.customer},["custom_so_not_needed"])
                # 
                if customer_so==1:
                    self.so_created=1
                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                    if previous_status != self.status and self.status:
                        self.append("custom_history", {
                            "date":frappe.utils.now_datetime(),
                            "status_moved_by": frappe.session.user,
                            "status": self.status
                        })
                    if self.status != "Dropped":
                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                        if previous_status != self.status and self.status:
                            self.append("custom_history", {
                                "date":frappe.utils.now_datetime(),
                                "status_moved_by": frappe.session.user,
                                "status": self.status
                            })
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
                                    if self.premedical or self.premedical_not_applicable == 1:
                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                        if previous_status != self.status and self.status:
                                            self.append("custom_history", {
                                                "date":frappe.utils.now_datetime(),
                                                "status_moved_by": frappe.session.user,
                                                "status": self.status
                                            })
                                        if self.pcc or self.pcc_not_applicable ==1:
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
                                                if self.custom_medical_proof:
                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                    if previous_status != self.status and self.status:
                                                        self.append("custom_history", {
                                                            "date":frappe.utils.now_datetime(),
                                                            "status_moved_by": frappe.session.user,
                                                            "status": self.status
                                                        })
                                                    if self.final_medical:
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
                                                            self.status="Arrived"
                                                        else:
                                                            self.status = 'Visa Stamping'
                                    
                                                            self.custom_status_transition = today()
                                                            self.custom_modified_status= self.status
                                                            self.date_of_visa = today()    
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                    else:
                                                        self.status='Biometric'  
                                                        self.custom_status_transition = today()
                                                        self.biometric_date=today()      
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
                                            self.status = 'PCC'
                    
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
                                        self.status = 'Premedical'
                                        self.premedical_date = today()
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
                                    self.status = 'Signed Offer Letter'
            
                                    self.sol_uploaded_date = today()
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
                                self.status= 'Client Offer Letter'
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
                else:
                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                    if previous_status != self.status and self.status:
                        self.append("custom_history", {
                            "date":frappe.utils.now_datetime(),
                            "status_moved_by": frappe.session.user,
                            "status": self.status
                        })
                    if self.status != "Dropped":
                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                        if previous_status != self.status and self.status:
                            self.append("custom_history", {
                                "date":frappe.utils.now_datetime(),
                                "status_moved_by": frappe.session.user,
                                "status": self.status
                            })
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
                                    if self.premedical or self.premedical_not_applicable == 1:
                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                        if previous_status != self.status and self.status:
                                            self.append("custom_history", {
                                                "date":frappe.utils.now_datetime(),
                                                "status_moved_by": frappe.session.user,
                                                "status": self.status
                                            })
                                        if self.pcc or self.pcc_not_applicable ==1:
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
                                            # if self.pcc or self.pcc_not_applicable ==1:
                                                if self.custom_medical_proof:
                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                    if previous_status != self.status and self.status:
                                                        self.append("custom_history", {
                                                            "date":frappe.utils.now_datetime(),
                                                            "status_moved_by": frappe.session.user,
                                                            "status": self.status
                                                        })
                                                    if self.final_medical:
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
                                                            if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable == 1 and self.candidate_feedback_form:
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                                if self.ticket:
                                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                    if previous_status != self.status and self.status:
                                                                        self.append("custom_history", {
                                                                            "date":frappe.utils.now_datetime(),
                                                                            "status_moved_by": frappe.session.user,
                                                                            "status": self.status
                                                                        })
                                                                    if self.status == 'Onboarded':
                                                                        self.status = 'Onboarded'
                                                                    # if self.status == 'Arrived':
                                                                    #     self.status = 'Arrived'
                                                                        self.onboarded = 1
                                                                        self.boarded_date = today()
                                                                        self.custom_status_transition = today()
                                                                        self.custom_modified_status= self.status
                                                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                        if previous_status != self.status and self.status:
                                                                            self.append("custom_history", {
                                                                                "date":frappe.utils.now_datetime(),
                                                                                "status_moved_by": frappe.session.user,
                                                                                "status": self.status
                                                                            })
                                                                        # else:
                                                                        #     self.status = 'Onboarding'
                                                    
                                                                        #     self.status_updated_on = today()
                                                                        #     self.custom_status_transition = today()
                                                                        #     self.custom_modified_status= self.status
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
                                    
                                                            self.custom_status_transition = today()
                                                            self.custom_modified_status= self.status
                                                            self.date_of_visa = today()    
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                    else:
                                                        self.status='Final Medical'  
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
                                                        # self.custom_status_transition = today()
                                                        # self.biometric_date=today()      
                                                        # self.custom_modified_status= self.status    
                                                        # previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                        # if previous_status != self.status and self.status:
                                                        #     self.append("custom_history", {
                                                        #         "date":frappe.utils.now_datetime(),
                                                        #         "status_moved_by": frappe.session.user,
                                                        #         "status": self.status
                                                        #     })
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
                                            self.status = 'PCC'
                    
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
                                        self.status = 'Premedical'
                
                                        self.premedical_date = today()
                                        self.custom_status_transition = today()
                                        self.custom_modified_status= self.status
                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                        if previous_status != self.status and self.status:
                                            self.append("custom_history", {
                                                "date":frappe.utils.now_datetime(),
                                                "status_moved_by": frappe.session.user,
                                                "status": self.status
                                            })
                                        # else:
                                        #     self.status = 'MOH Approval'
                                        #     self.moh_uploaded_date = today()                                                                  
                                    
                                else:
                                    self.status = 'Signed Offer Letter'
            
                                    self.sol_uploaded_date = today()
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
                                self.status= 'Client Offer Letter'
        
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
                
                # if self.nationality=="Indian":
                #     if self.irf and self.passport and self.photo:
                #         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #         if previous_status != self.status and self.status:
                #             self.append("custom_history", {
                #                 "date":frappe.utils.now_datetime(),
                #                 "status_moved_by": frappe.session.user,
                #                 "status": self.status
                #             })
                #         if self.offer_letter:
                #             previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #             if previous_status != self.status and self.status:
                #                 self.append("custom_history", {
                #                     "date":frappe.utils.now_datetime(),
                #                     "status_moved_by": frappe.session.user,
                #                     "status": self.status
                #                 })
                #             if self.sol:
                #                 previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                 if previous_status != self.status and self.status:
                #                     self.append("custom_history", {
                #                         "date":frappe.utils.now_datetime(),
                #                         "status_moved_by": frappe.session.user,
                #                         "status": self.status
                #                     })
                #                 # if self.pcc or self.pcc_not_applicable: 
                #                 if self.visa and self.so_created:
                #                     previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                     if previous_status != self.status and self.status:
                #                         self.append("custom_history", {
                #                             "date":frappe.utils.now_datetime(),
                #                             "status_moved_by": frappe.session.user,
                #                             "status": self.status
                #                         })
                #                     if self.pcc or self.pcc_not_applicable: 
                #                         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                         if previous_status != self.status and self.status:
                #                             self.append("custom_history", {
                #                                 "date":frappe.utils.now_datetime(),
                #                                 "status_moved_by": frappe.session.user,
                #                                 "status": self.status
                #                             })
                #                         if self.custom_medical_proof or self.custom_update_checkbox:
                #                             previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                             if previous_status != self.status and self.status:
                #                                 self.append("custom_history", {
                #                                     "date":frappe.utils.now_datetime(),
                #                                     "status_moved_by": frappe.session.user,
                #                                     "status": self.status
                #                                 })
                #                             if self.final_medical:
                #                                 previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                 if previous_status != self.status and self.status:
                #                                     self.append("custom_history", {
                #                                         "date":frappe.utils.now_datetime(),
                #                                         "status_moved_by": frappe.session.user,
                #                                         "status": self.status
                #                                     })
                #                                 if self.custom_vfs_slip and self.custom_skip_biometric!=1: 
                #                                     previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                     if previous_status != self.status and self.status:
                #                                         self.append("custom_history", {
                #                                             "date":frappe.utils.now_datetime(),
                #                                             "status_moved_by": frappe.session.user,
                #                                             "status": self.status
                #                                         })
                #                                     if self.visa_stamping:
                #                                         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                         if previous_status != self.status and self.status:
                #                                             self.append("custom_history", {
                #                                                 "date":frappe.utils.now_datetime(),
                #                                                 "status_moved_by": frappe.session.user,
                #                                                 "status": self.status
                #                                             })
                #                                         if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable and self.candidate_feedback_form:
                #                                             previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                             if previous_status != self.status and self.status:
                #                                                 self.append("custom_history", {
                #                                                     "date":frappe.utils.now_datetime(),
                #                                                     "status_moved_by": frappe.session.user,
                #                                                     "status": self.status
                #                                                 })
                #                                             if self.ticket:
                #                                                 if self.status == 'Onboarded':
                #                                                     self.status = 'Onboarded'
                #                                                     previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                                     if previous_status != self.status and self.status:
                #                                                         self.append("custom_history", {
                #                                                             "date":frappe.utils.now_datetime(),
                #                                                             "status_moved_by": frappe.session.user,
                #                                                             "status": self.status
                #                                                         })
                #                                                 # if self.status == 'Arrived':
                #                                                 #     self.status = 'Arrived'
                #                                                     self.onboarded = 1
                #                                                     self.boarded_date = today()
                                            
                #                                                     self.custom_status_transition = today()
                #                                                     self.custom_modified_status= self.status
                #                                                     # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                #                                                     if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                #                                                             # self.status='Concluded'
                #                                                             self.custom_status_transition = today()
                                                    
                #                                                             self.custom_modified_status= self.status
                #                                                     else:
                #                                                         self.status = 'Onboarding'
                #                                                         self.status_updated_on = today()
                                                
                #                                                         self.custom_status_transition = today()
                #                                                         self.custom_modified_status= self.status
                #                                                         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                                         if previous_status != self.status and self.status:
                #                                                             self.append("custom_history", {
                #                                                                 "date":frappe.utils.now_datetime(),
                #                                                                 "status_moved_by": frappe.session.user,
                #                                                                 "status": self.status
                #                                                             })
                #                                                 elif self.check==1:
                #                                                     self.status = 'Arrived'
                #                                                     previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                                     if previous_status != self.status and self.status:
                #                                                         self.append("custom_history", {
                #                                                             "date":frappe.utils.now_datetime(),
                #                                                             "status_moved_by": frappe.session.user,
                #                                                             "status": self.status
                #                                                         })
                #                                                 else:
                #                                                     self.status = 'Onboarding'
                #                                                     self.status_updated_on = today()
                                            
                #                                                     self.custom_status_transition = today()
                #                                                     self.custom_modified_status= self.status
                #                                                     previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                                     if previous_status != self.status and self.status:
                #                                                         self.append("custom_history", {
                #                                                             "date":frappe.utils.now_datetime(),
                #                                                             "status_moved_by": frappe.session.user,
                #                                                             "status": self.status
                #                                                         })
                #                                             else:
                #                                                 self.status = 'Ticket'
                #                                                 self.ticket_date = today()
                                        
                #                                                 self.custom_status_transition = today()
                #                                                 self.custom_modified_status= self.status
                #                                                 previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                                 if previous_status != self.status and self.status:
                #                                                     self.append("custom_history", {
                #                                                         "date":frappe.utils.now_datetime(),
                #                                                         "status_moved_by": frappe.session.user,
                #                                                         "status": self.status
                #                                                     })
                #                                         else:
                #                                             self.status = 'Emigration'
                #                                             self.emigration_date = today()
                                    
                #                                             self.custom_status_transition = today()
                #                                             self.custom_modified_status= self.status
                #                                             previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                             if previous_status != self.status and self.status:
                #                                                 self.append("custom_history", {
                #                                                     "date":frappe.utils.now_datetime(),
                #                                                     "status_moved_by": frappe.session.user,
                #                                                     "status": self.status
                #                                                 })
                #                                     else:
                #                                         self.status = 'Visa Stamping'
                #                                         self.stamped_visa_date = today()
                                
                #                                         self.custom_status_transition = today()
                #                                         self.custom_modified_status= self.status
                #                                         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                         if previous_status != self.status and self.status:
                #                                             self.append("custom_history", {
                #                                                 "date":frappe.utils.now_datetime(),
                #                                                 "status_moved_by": frappe.session.user,
                #                                                 "status": self.status
                #                                             })
                                                
                #                                 elif self.custom_skip_biometric==1:
                #                                     previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                     if previous_status != self.status and self.status:
                #                                         self.append("custom_history", {
                #                                             "date":frappe.utils.now_datetime(),
                #                                             "status_moved_by": frappe.session.user,
                #                                             "status": self.status
                #                                         })
                #                                     if self.visa_stamping:
                #                                         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                         if previous_status != self.status and self.status:
                #                                             self.append("custom_history", {
                #                                                 "date":frappe.utils.now_datetime(),
                #                                                 "status_moved_by": frappe.session.user,
                #                                                 "status": self.status
                #                                             })
                #                                         if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable and self.candidate_feedback_form:
                #                                             previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                             if previous_status != self.status and self.status:
                #                                                 self.append("custom_history", {
                #                                                     "date":frappe.utils.now_datetime(),
                #                                                     "status_moved_by": frappe.session.user,
                #                                                     "status": self.status
                #                                                 })
                #                                             if self.ticket:
                #                                                 if self.status == 'Onboarded':
                #                                                     self.status = 'Onboarded'
                #                                                     previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                                     if previous_status != self.status and self.status:
                #                                                         self.append("custom_history", {
                #                                                             "date":frappe.utils.now_datetime(),
                #                                                             "status_moved_by": frappe.session.user,
                #                                                             "status": self.status
                #                                                         })
                #                                                 # if self.status == 'Arrived':
                #                                                 #     self.status = 'Arrived'
                #                                                     self.onboarded = 1
                #                                                     self.boarded_date = today()
                                            
                #                                                     self.custom_status_transition = today()
                #                                                     self.custom_modified_status= self.status
                #                                                     # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                #                                                     if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                #                                                         # self.status='Concluded'
                                                
                #                                                         self.custom_status_transition = today()
                #                                                         self.custom_modified_status= self.status
                #                                                     else:
                #                                                         self.status = 'Onboarding'
                #                                                         self.status_updated_on = today()
                                                
                #                                                         self.custom_status_transition = today()
                #                                                         self.custom_modified_status= self.status
                #                                                         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                                         if previous_status != self.status and self.status:
                #                                                             self.append("custom_history", {
                #                                                                 "date":frappe.utils.now_datetime(),
                #                                                                 "status_moved_by": frappe.session.user,
                #                                                                 "status": self.status
                #                                                             })
                #                                                 elif self.check==1:
                #                                                     self.status = 'Arrived'
                #                                                     previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                                     if previous_status != self.status and self.status:
                #                                                         self.append("custom_history", {
                #                                                             "date":frappe.utils.now_datetime(),
                #                                                             "status_moved_by": frappe.session.user,
                #                                                             "status": self.status
                #                                                         })
                #                                                 else:
                #                                                     self.status = 'Onboarding'
                #                                                     self.status_updated_on = today()
                                            
                #                                                     self.custom_status_transition = today()
                #                                                     self.custom_modified_status= self.status
                #                                                     previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                                     if previous_status != self.status and self.status:
                #                                                         self.append("custom_history", {
                #                                                             "date":frappe.utils.now_datetime(),
                #                                                             "status_moved_by": frappe.session.user,
                #                                                             "status": self.status
                #                                                         })
                #                                             else:
                #                                                 self.status = 'Ticket'
                #                                                 self.ticket_date = today()
                                        
                #                                                 self.custom_status_transition = today()
                #                                                 self.custom_modified_status= self.status
                #                                                 previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                                 if previous_status != self.status and self.status:
                #                                                     self.append("custom_history", {
                #                                                         "date":frappe.utils.now_datetime(),
                #                                                         "status_moved_by": frappe.session.user,
                #                                                         "status": self.status
                #                                                     })
                #                                         else:
                #                                             self.status = 'Emigration'
                #                                             self.emigration_date = today()
                                    
                #                                             self.custom_status_transition = today()
                #                                             self.custom_modified_status= self.status
                #                                             previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                             if previous_status != self.status and self.status:
                #                                                 self.append("custom_history", {
                #                                                     "date":frappe.utils.now_datetime(),
                #                                                     "status_moved_by": frappe.session.user,
                #                                                     "status": self.status
                #                                                 })
                #                                     else:
                #                                         self.status = 'Visa Stamping'
                #                                         self.stamped_visa_date = today()
                                
                #                                         self.custom_status_transition = today()
                #                                         self.custom_modified_status= self.status
                #                                         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                         if previous_status != self.status and self.status:
                #                                             self.append("custom_history", {
                #                                                 "date":frappe.utils.now_datetime(),
                #                                                 "status_moved_by": frappe.session.user,
                #                                                 "status": self.status
                #                                             })
                #                                 else:
                #                                     self.status = 'Biometric'
                #                                     self.custom_status_transition = today()
                            
                #                                     self.custom_modified_status= self.status
                #                                     previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                     if previous_status != self.status and self.status:
                #                                         self.append("custom_history", {
                #                                             "date":frappe.utils.now_datetime(),
                #                                             "status_moved_by": frappe.session.user,
                #                                             "status": self.status
                #                                         })
                #                             else:
                #                                 self.status = 'Biometric'
                #                                 self.custom_status_transition = today()
                        
                #                                 self.custom_modified_status= self.status
                #                                 previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                                 if previous_status != self.status and self.status:
                #                                     self.append("custom_history", {
                #                                         "date":frappe.utils.now_datetime(),
                #                                         "status_moved_by": frappe.session.user,
                #                                         "status": self.status
                #                                     })
                #                         else:
                #                             self.status = 'Final Medical'
                #                             self.final_medical_date = today()
                    
                #                             self.custom_status_transition = today()
                #                             self.custom_modified_status= self.status
                #                             previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                             if previous_status != self.status and self.status:
                #                                 self.append("custom_history", {
                #                                     "date":frappe.utils.now_datetime(),
                #                                     "status_moved_by": frappe.session.user,
                #                                     "status": self.status
                #                                 })
                                                
                #                     else:
                #                         self.status = "PCC"
                #                         self.pcc_uploaded_date = today()
                
                #                         self.custom_status_transition = today()
                #                         self.custom_modified_status= self.status
                #                         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                         if previous_status != self.status and self.status:
                #                             self.append("custom_history", {
                #                                 "date":frappe.utils.now_datetime(),
                #                                 "status_moved_by": frappe.session.user,
                #                                 "status": self.status
                #                             })
                #                 else:
                #                     if self.is_required:
                #                         if not self.certificate_attestation:
                #                             self.status = 'Certificate Attestation'
                #                             self.custom_status_transition = today()
                    
                #                             self.custom_modified_status= self.status
                #                             previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                             if previous_status != self.status and self.status:
                #                                 self.append("custom_history", {
                #                                     "date":frappe.utils.now_datetime(),
                #                                     "status_moved_by": frappe.session.user,
                #                                     "status": self.status
                #                                 })
                #                             # self.reload()
                #                         else:
                #                             self.status = 'Visa'
                #                             self.visa_date = today()
                    
                #                             self.custom_status_transition = today()
                #                             self.custom_modified_status= self.status
                #                             previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                             if previous_status != self.status and self.status:
                #                                 self.append("custom_history", {
                #                                     "date":frappe.utils.now_datetime(),
                #                                     "status_moved_by": frappe.session.user,
                #                                     "status": self.status
                #                                 })
                #                     else:
                #                         self.status = 'Visa'
                #                         self.visa_date = today()
                
                #                         self.custom_status_transition = today()
                #                         self.custom_modified_status= self.status
                #                         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                         if previous_status != self.status and self.status:
                #                             self.append("custom_history", {
                #                                 "date":frappe.utils.now_datetime(),
                #                                 "status_moved_by": frappe.session.user,
                #                                 "status": self.status
                #                             })
                                

                #             else:
                #                 self.status = "Signed Offer Letter"
                #                 self.col_date = today()
        
                #                 self.custom_status_transition = today()
                #                 self.custom_modified_status= self.status
                #                 previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #                 if previous_status != self.status and self.status:
                #                     self.append("custom_history", {
                #                         "date":frappe.utils.now_datetime(),
                #                         "status_moved_by": frappe.session.user,
                #                         "status": self.status
                #                     })
                #         else:
                #             self.status = 'Client Offer Letter'
                #             self.offer_letter_date = today()

                #             self.custom_status_transition = today()
                #             self.custom_modified_status= self.status
                #             previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #             if previous_status != self.status and self.status:
                #                 self.append("custom_history", {
                #                     "date":frappe.utils.now_datetime(),
                #                     "status_moved_by": frappe.session.user,
                #                     "status": self.status
                #                 })
                #     else:
                #         self.status = 'PSL'
                #         self.status_updated_on = today()
                #         self.custom_status_transition = today()
                #         self.custom_modified_status= self.status
                #         previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                #         if previous_status != self.status and self.status:
                #             self.append("custom_history", {
                #                 "date":frappe.utils.now_datetime(),
                #                 "status_moved_by": frappe.session.user,
                #                 "status": self.status
                #             })
                else:
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
                                # if self.pcc or self.custom_pcc_not_applicable: 
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
                                        if self.final_medical:
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
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                            if self.status == 'Onboarded':
                                                                self.status = 'Onboarded'
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                            # if self.status == 'Arrived':
                                                            #     self.status = 'Arrived'
                                                                self.onboarded = 1
                                                                self.boarded_date = today()
                                        
                                                                self.custom_status_transition = today()
                                                                self.custom_modified_status= self.status
                                                                # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                                                                if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:       
                                                                        # self.status='Concluded'
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
                                                if self.custom_skip_biometric==1:
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
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                                if self.status == 'Onboarded':
                                                                    self.status = 'Onboarded'
                                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                    if previous_status != self.status and self.status:
                                                                        self.append("custom_history", {
                                                                            "date":frappe.utils.now_datetime(),
                                                                            "status_moved_by": frappe.session.user,
                                                                            "status": self.status
                                                                        })
                                                                # if self.status == 'Arrived':
                                                                #     self.status = 'Arrived'
                                                                    self.onboarded = 1
                                                                    self.boarded_date = today()
                                            
                                                                    self.custom_status_transition = today()
                                                                    self.custom_modified_status= self.status
                                                                    # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                                                                    if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:    
                                                                        # self.status='Concluded'
                                                
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
            elif self.territory in ['Dammam', 'Jeddah', 'Riyadh']:
                # if self.nationality=="Indian":
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
                            # if self.pcc or self.pcc_not_applicable: 
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
                                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                            if previous_status != self.status and self.status:
                                                                self.append("custom_history", {
                                                                    "date":frappe.utils.now_datetime(),
                                                                    "status_moved_by": frappe.session.user,
                                                                    "status": self.status
                                                                })
                                                            if self.status == 'Onboarded':
                                                                self.status = 'Onboarded'
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                            # if self.status == 'Arrived':
                                                            #     self.status = 'Arrived'
                                                                self.onboarded = 1
                                                                self.boarded_date = today()
                                        
                                                                self.custom_status_transition = today()
                                                                self.custom_modified_status= self.status
                                                                # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                                                                if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                                        # self.status='Concluded'
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
                                                if self.custom_skip_biometric==1:
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
                                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                if previous_status != self.status and self.status:
                                                                    self.append("custom_history", {
                                                                        "date":frappe.utils.now_datetime(),
                                                                        "status_moved_by": frappe.session.user,
                                                                        "status": self.status
                                                                    })
                                                                if self.status == 'Onboarded':
                                                                    self.status = 'Onboarded'
                                                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                                    if previous_status != self.status and self.status:
                                                                        self.append("custom_history", {
                                                                            "date":frappe.utils.now_datetime(),
                                                                            "status_moved_by": frappe.session.user,
                                                                            "status": self.status
                                                                        })
                                                                # if self.status == 'Arrived':
                                                                #     self.status = 'Arrived'
                                                                    self.onboarded = 1
                                                                    self.boarded_date = today()
                                            
                                                                    self.custom_status_transition = today()
                                                                    self.custom_modified_status= self.status
                                                                    # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                                                                    if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                                        # self.status='Concluded'
                                                
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
                # else:
                #     if self.irf and self.passport and self.photo:
                #         if self.offer_letter:
                #             if self.sol:
                #                 # if self.pcc or self.custom_pcc_not_applicable: 
                #                 if self.visa and self.so_created:
                                
                #                     if self.pcc or self.pcc_not_applicable: 
                #                         if self.final_medical:
                #                             if self.custom_vfs_slip and self.custom_skip_biometric!=1:   
                #                                 if self.visa_stamping:
                #                                     if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable and self.candidate_feedback_form:
                #                                         if self.ticket:
                #                                             if self.status == 'Onboarded':
                #                                                 self.status = 'Onboarded'
                #                                             # if self.status == 'Arrived':
                #                                             #     self.status = 'Arrived'
                #                                                 self.onboarded = 1
                #                                                 self.boarded_date = today()
                                        
                #                                                 self.custom_status_transition = today()
                #                                                 self.custom_modified_status= self.status
                #                                                 # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                #                                                 if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:       
                #                                                         # self.status='Concluded'
                #                                                         self.custom_status_transition = today()
                                                
                #                                                         self.custom_modified_status= self.status
                #                                                 else:
                #                                                     self.status = 'Onboarding'
                #                                                     self.status_updated_on = today()
                                            
                #                                                     self.custom_status_transition = today()
                #                                                     self.custom_modified_status= self.status
                #                                             elif self.check==1:
                #                                                 self.status = 'Arrived'
                #                                             else:
                #                                                 self.status = 'Onboarding'
                #                                                 self.status_updated_on = today()
                                        
                #                                                 self.custom_status_transition = today()
                #                                                 self.custom_modified_status= self.status
                #                                         else:
                #                                             self.status = 'Ticket'
                #                                             self.ticket_date = today()
                                    
                #                                             self.custom_status_transition = today()
                #                                             self.custom_modified_status= self.status
                #                                     else:
                #                                         self.status = 'Emigration'
                #                                         self.emigration_date = today()
                                
                #                                         self.custom_status_transition = today()
                #                                         self.custom_modified_status= self.status
                #                                 else:
                #                                     self.status = 'Visa Stamping'
                #                                     self.stamped_visa_date = today()
                            
                #                                     self.custom_status_transition = today()
                #                                     self.custom_modified_status= self.status
                #                             else:
                #                                 if self.custom_skip_biometric==1:
                #                                     if self.visa_stamping:
                #                                         if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable and self.candidate_feedback_form:
                #                                             if self.ticket:
                #                                                 if self.status == 'Onboarded':
                #                                                     self.status = 'Onboarded'
                #                                                 # if self.status == 'Arrived':
                #                                                 #     self.status = 'Arrived'
                #                                                     self.onboarded = 1
                #                                                     self.boarded_date = today()
                                            
                #                                                     self.custom_status_transition = today()
                #                                                     self.custom_modified_status= self.status
                #                                                     # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                #                                                     if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:    
                #                                                         # self.status='Concluded'
                                                
                #                                                         self.custom_status_transition = today()
                #                                                         self.custom_modified_status= self.status
                #                                                     else:
                #                                                         self.status = 'Onboarding'
                #                                                         self.status_updated_on = today()
                                                
                #                                                         self.custom_status_transition = today()
                #                                                         self.custom_modified_status= self.status
                #                                                 elif self.check==1:
                #                                                     self.status = 'Arrived'
                #                                                 else:
                #                                                     self.status = 'Onboarding'
                #                                                     self.status_updated_on = today()
                                            
                #                                                     self.custom_status_transition = today()
                #                                                     self.custom_modified_status= self.status
                #                                             else:
                #                                                 self.status = 'Ticket'
                #                                                 self.ticket_date = today()
                                        
                #                                                 self.custom_status_transition = today()
                #                                                 self.custom_modified_status= self.status
                #                                         else:
                #                                             self.status = 'Emigration'
                #                                             self.emigration_date = today()
                                    
                #                                             self.custom_status_transition = today()
                #                                             self.custom_modified_status= self.status
                #                                     else:
                #                                         self.status = 'Visa Stamping'
                #                                         self.stamped_visa_date = today()
                                
                #                                         self.custom_status_transition = today()
                #                                         self.custom_modified_status= self.status
                #                                 else:
                #                                     self.status = 'Biometric'
                #                                     self.custom_status_transition = today()
                            
                #                                     self.custom_modified_status= self.status
                #                         else:
                #                             self.status = 'Final Medical'
                #                             self.final_medical_date = today()
                    
                #                             self.custom_status_transition = today()
                #                             self.custom_modified_status= self.status
                #                     else:
                #                         self.status = "PCC"
                #                         self.pcc_uploaded_date = today()
                
                #                         self.custom_status_transition = today()
                #                         self.custom_modified_status= self.status
                #                 else:
                #                     if self.is_required:
                #                         if not self.certificate_attestation:
                #                             self.status = 'Certificate Attestation'
                #                             self.custom_status_transition = today()
                    
                #                             self.custom_modified_status= self.status
                #                             # self.reload()
                #                         else:
                #                             self.status = 'Visa'
                #                             self.visa_date = today()
                    
                #                             self.custom_status_transition = today()
                #                             self.custom_modified_status= self.status
                #                     else:
                #                         self.status = 'Visa'
                #                         self.visa_date = today()
                
                #                         self.custom_status_transition = today()
                #                         self.custom_modified_status= self.status
                                

                #             else:
                #                 self.status = "Signed Offer Letter"
                #                 self.col_date = today()
        
                #                 self.custom_status_transition = today()
                #                 self.custom_modified_status= self.status
                #         else:
                #             self.status = 'Client Offer Letter'
                #             self.offer_letter_date = today()

                #             self.custom_status_transition = today()
                #             self.custom_modified_status= self.status
                #     else:
                #         self.status = 'PSL'
                #         self.status_updated_on = today()
                #         self.custom_status_transition = today()
                #         self.custom_modified_status= self.status
            elif self.territory=='Iraq':
                customer_so=frappe.db.get_value("Customer",{"name":self.customer},["custom_so_not_needed"])
                # 
                if customer_so==1:
                    self.so_created=1
                    if self.irf and self.passport and self.photo:
                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                        if previous_status != self.status and self.status:
                            self.append("custom_history", {
                                "date":frappe.utils.now_datetime(),
                                "status_moved_by": frappe.session.user,
                                "status": self.status
                            })
                        if self.visa and self.so_created == 1:
                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                            if previous_status != self.status and self.status:
                                self.append("custom_history", {
                                    "date":frappe.utils.now_datetime(),
                                    "status_moved_by": frappe.session.user,
                                    "status": self.status
                                })
                            if self.ecr_status== 'ECR' or self.ecr_status== 'ECNR' or self.emigration or self.emigration_not_applicable == 1 and self.candidate_feedback_form:
                                self.status = 'Arrived'
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
                else:
                    if self.irf and self.passport and self.photo:
                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                        if previous_status != self.status and self.status:
                            self.append("custom_history", {
                                "date":frappe.utils.now_datetime(),
                                "status_moved_by": frappe.session.user,
                                "status": self.status
                            })
                        if self.visa and self.so_created == 1:
                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                            if previous_status != self.status and self.status:
                                self.append("custom_history", {
                                    "date":frappe.utils.now_datetime(),
                                    "status_moved_by": frappe.session.user,
                                    "status": self.status
                                })
                            if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable == 1 and self.candidate_feedback_form:
                                self.status = 'Arrived'
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

            elif self.territory == 'Bahrain':
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
                        # if self.so_created or self.so_confirmed_date:
                        if self.sol:
                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                            if previous_status != self.status and self.status:
                                self.append("custom_history", {
                                    "date":frappe.utils.now_datetime(),
                                    "status_moved_by": frappe.session.user,
                                    "status": self.status
                                })
                            if self.final_medical:
                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                if previous_status != self.status and self.status:
                                    self.append("custom_history", {
                                        "date":frappe.utils.now_datetime(),
                                        "status_moved_by": frappe.session.user,
                                        "status": self.status
                                    })
                                if self.visa and self.so_created == 1:
                                    previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                    if previous_status != self.status and self.status:
                                        self.append("custom_history", {
                                            "date":frappe.utils.now_datetime(),
                                            "status_moved_by": frappe.session.user,
                                            "status": self.status
                                        })
                                    if self.ecr_status != 'ECR' or self.emigration or self.emigration_not_applicable == 1 and self.candidate_feedback_form:
                                        previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                        if previous_status != self.status and self.status:
                                            self.append("custom_history", {
                                                "date":frappe.utils.now_datetime(),
                                                "status_moved_by": frappe.session.user,
                                                "status": self.status
                                            })
                                        if self.ticket:
                                            previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                            if previous_status != self.status and self.status:
                                                self.append("custom_history", {
                                                    "date":frappe.utils.now_datetime(),
                                                    "status_moved_by": frappe.session.user,
                                                    "status": self.status
                                                })
                                            if self.status == 'Onboarded':
                                                self.status = 'Onboarded'
                                                previous_status = self.get_doc_before_save().status if self.get_doc_before_save() else None
                                                if previous_status != self.status and self.status:
                                                    self.append("custom_history", {
                                                        "date":frappe.utils.now_datetime(),
                                                        "status_moved_by": frappe.session.user,
                                                        "status": self.status
                                                    })
                                            # if self.status == 'Arrived':
                                            #     self.status = 'Arrived'
                                                self.onboarded = 1
                                                self.boarded_date = today()
                        
                                                self.custom_status_transition = today()
                                                self.custom_modified_status= self.status
                                                # if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                                                if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
                                                    # self.status='Concluded'
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
                                            elif self.status == 'Dropped':
                                                self.status = 'Dropped'
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
                                self.status = 'Final Medical'
                                self.premedical_date = today()
        
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
                            self.status = 'Signed Offer Letter'
                            self.pcc_not_applicable = 1
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
                        # else:
                        #     self.status = 'Sales Order'
                        #     self.status_updated_on = today()
                    else:
                        self.status = "Client Offer Letter"
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
        else:
            if self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india:
            # if self.status == 'Onboarded' and self.candidate_feedback_form and self.candidate_google_review and self.custom__emergency_contact_number_in_india and self.custom_local_mobile_number:
                # self.status='Concluded'
                self.custom_status_transition = today()
                self.custom_modified_status= self.status
@frappe.whitelist()
def get_status(status,so_created,visa_status,offer_letter,sol,final_medical,pcc,pcc_not,visa_stamping):
    data = ''
    data += '<table border="1" width="100%"><tr style="">'
    data += '<td style = "background-color:#e35310;color:white"><b>Offer Status</b></td>'
    data += '<td style = "background-color:#e35310;color:white"><b>Medical Status</b></td>'    
    data += '<td style = "background-color:#e35310;color:white"><b>PCC Status</b></td>'    
    data += '<td style = "background-color:#e35310;color:white"><b>Statmping Status</b></td></tr>'
    if offer_letter and not sol:
        data += '<td style = "color:orange"><b>Client Offer Letter</b></td>'
    elif offer_letter and sol:
        data += '<td style = "color:orange"><b>Signed Offer Letter</b></td>'
    else:
        data += '<td style = "color:orange"><b>Yet to be processed</b></td>'
    if final_medical:
        data += '<td style = "color:orange"><b>Final Medical</b></td>'
    else:
        data += '<td style = "color:orange"><b>Yet to be Processed</b></td>'
    if pcc:    
        data += '<td style = "color:orange"><b>PCC</b></td>'
    elif pcc_not:
        data += '<td style = "color:orange"><b>PCC not applicable</b></td>'
    else:
        data += '<td style = "color:orange"><b>Yet to be Processed</b></td>'
    if visa_stamping:
        data += '<td style = "color:orange"><b>Visa Stamped</b></td>'
    else:
        data += '<td style = "color:orange"><b>Yet to be Processed</b></td>'
    return data

@frappe.whitelist()
def create_sale_order(closure, project, customer, task, candidate_name, contact, payment,client_sc,candidate_owner,sa_id,candidate_sc,billing_currency, territory, associate,passport_no, expected_doj, delivery_manager, account_manager,service,supplier,associate_si,client_si,candidate_si):
    # cg = frappe.db.get_value("Customer", customer, "customer_group")
    so=frappe.db.get_value("Customer",customer,"custom_so_not_needed")
    parent_territory = frappe.get_value(
        'Territory', territory, 'parent_territory')
    if payment:
        item_candidate_id = frappe.db.get_value("Item", {"name": contact})
        item_pp_id = frappe.db.get_value("Item", {"name": passport_no})
        if item_candidate_id or item_pp_id:
            item = frappe.get_doc("Item",item_pp_id)
        else:
            item = frappe.new_doc("Item")
            if parent_territory == 'India':
                item.item_code = candidate_name
                item.append("taxes", {
                            "item_tax_template": "T - GST @ 18% - THIS",
                            "tax_category": "Professional Service - GST",
                            "valid_from": today()
                            })
            else:
                item.item_code = passport_no
                item.is_non_gst = "0"
            item.item_name = passport_no + ":"+candidate_name
            if candidate_owner:
                item.candidate_owner = candidate_owner
            if sa_id:
                item.sa_id = sa_id
            item.item_group = "Candidates"
            item.stock_uom = "Nos"
            item.qty = "1"
            item.gst_hsn_code = '998519'
            item.is_stock_item = "0"
            item.include_item_in_manufacturing = "0"
            item.description = customer
            item.append("item_defaults", {
                "company": "TeamPRO HR & IT Services Pvt. Ltd."
            })
            item.append("customer_items", {
                "customer_name": customer,
                "ref_code": contact
            })
            item.insert()
            item.save(ignore_permissions=True)

        if territory != 'India' or parent_territory != 'India':
            if so==0:
                if payment == "Client":
                    so = frappe.new_doc("Sales Order")
                    so.customer = customer
                    so.reference_customer_ = customer
                    so.passport_number = passport_no
                    so.account_manager = account_manager
                    so.delivery_manager = delivery_manager
                    so.closure_project = project
                    so.currency = billing_currency
                    so.supplier = supplier
                    so.service = service
                    so.company_address = "TEAMPRO HR & IT Services Pvt. Ltd."
                    # so.total_orginal_dec = dec
                    
                    
                    # so.sa_id = sa_id
                    so.append("items", {
                        "item_code": item.item_code,
                        "item_name": item.item_name,
                        "candidate_owner": item.candidate_owner,
                        "sa_id":item.sa_id,
                        "payment_type": "Candidate",
                        "description": item.description,
                        "uom": item.stock_uom,
                        "is_stock_item": "0",
                        "passport_no": passport_no,
                        "delivery_date": expected_doj or '',
                        "qty": "1",
                        "rate": client_si,
                        # "dec1": dec,
                        "sc1": client_sc,
                        
                        # "currency":currency,
                        "cost_center": "Main - THIS",
                    })
                    so.save(ignore_permissions=True)
                    frappe.db.commit()
                    # so.submit()

                # candidate
                if payment == "Candidate":
                    new_existing=candidate_name + '-' + passport_no
                    if not frappe.db.exists("Existing Customer",new_existing):
                        existing_customer=frappe.new_doc("Existing Customer")
                        existing_customer.customer_id=candidate_name + '-' + passport_no
                        existing_customer.insert()
                        existing_customer.save(ignore_permissions=True)
                        frappe.db.commit()
                    candidate_customer = frappe.new_doc("Customer")
                    candidate_customer.customer_name = candidate_name + '-' + passport_no
                    candidate_customer.customer_type = "Individual"
                    candidate_customer.customer_group = "Individual"
                    candidate_customer.territory = territory
                    candidate_customer.account_manager=account_manager
                    candidate_customer.insert()
                    candidate_customer.save(ignore_permissions=True)
                    frappe.db.commit()

                    so = frappe.new_doc("Sales Order")
                    so.customer = candidate_name + '-' + passport_no
                    so.reference_customer_ = customer
                    so.customer_group = "Individual"
                    so.passport_number = passport_no
                    so.account_manager = account_manager
                    so.delivery_manager = delivery_manager
                    so.service = service
                    so.currency = "INR"
                    so.company_address = "TEAMPRO HR & IT Services Pvt. Ltd."
                    # so.total_original_dec = candidate_dec
                    so.append("items", {
                        "item_code": item.item_code,
                        "item_name": item.item_name,
                        "candidate_owner": item.candidate_owner,
                        "sa_id":item.sa_id,
                        "payment_type": "Candidate",
                        "description": item.description,
                        "uom": item.stock_uom,
                        "is_stock_item": "0",
                        "passport_no": passport_no,
                        "delivery_date": expected_doj or '',
                        "qty": "1",
                        "rate": candidate_si,
                        # "dec1":candidate_dec,
                        "sc1":candidate_sc,
                        # "currency":currency,
                        "cost_center": "Main - THIS",
                    })
                    so.save(ignore_permissions=True)
                    frappe.db.commit()
                    # so.submit()

                # associate
                if payment == "Associate":

                    so = frappe.new_doc("Sales Order")
                    so.customer = associate
                    so.reference_customer_ = customer
                    so.customer_group = "Associate"
                    # so.passport_number = passport_no
                    # so.account_manager = account_manager
                    # so.delivery_manager = delivery_manager
                    so.currency = billing_currency
                    so.service = service
                    so.company_address = "TEAMPRO HR & IT Services Pvt. Ltd."
                    # so.total_orginal_dec = dec
                    so.append("items", {
                        "item_code": item.item_code,
                        "item_name": item.item_name,
                        "candidate_owner": item.candidate_owner,
                        "sa_id":item.sa_id,
                        # "payment_type": "Candidate",
                        "description": item.description,
                        "uom": item.stock_uom,
                        "is_stock_item": "0",
                        "passport_no": passport_no,
                        "delivery_date": expected_doj or '',
                        "qty": "1",
                        "rate": associate_si,
                        # "dec1":dec,
                        # "sc1":sc,
                        # "currency":currency,
                        "cost_center": "Main - THIS",
                    })
                    so.save(ignore_permissions=True)
                    frappe.db.commit()
                    # so.submit()

                
                # both
                if payment == "Both":
                    # client
                    so = frappe.new_doc("Sales Order")
                    so.customer = customer
                    so.reference_customer_ = customer
                    so.passport_number = passport_no
                    so.account_manager = account_manager
                    so.currency = billing_currency
                    so.delivery_manager = delivery_manager
                    so.service = service
                    so.company_address = "TEAMPRO HR & IT Services Pvt. Ltd."
                    #so.total_orginal_dec = client_dec
                    
                    so.append("items", {
                        "item_code": item.item_code,
                        "item_name": item.item_name,
                        "candidate_owner": item.candidate_owner,
                        "sa_id":item.sa_id,
                        "payment_type": "Candidate",
                        "description": item.description,
                        "uom": item.stock_uom,
                        "is_stock_item": "0",
                        "passport_no": passport_no,
                        "delivery_date": expected_doj or '',
                        "qty": "1",
                        "rate": client_si,
                        #"dec1": client_dec,
                        "sc1": client_sc,
                        # "rate": client_sc,
                        # "currency":currency,
                        "cost_center": "Main - THIS",
                    })
                    so.save(ignore_permissions=True)
                    frappe.db.commit()
                    # so.submit()
                    new_existing=candidate_name + '-' + passport_no
                    if not frappe.db.exists("Existing Customer",new_existing):
                        existing_customer=frappe.new_doc("Existing Customer")
                        existing_customer.customer_id=candidate_name + '-' + passport_no
                        existing_customer.insert()
                        existing_customer.save(ignore_permissions=True)
                        frappe.db.commit()
                    # candidate
                    candidate_customer = frappe.new_doc("Customer")
                    candidate_customer.customer_name = candidate_name + '-' + passport_no
                    candidate_customer.customer_type = "Individual"
                    candidate_customer.customer_group = "Individual"
                    candidate_customer.territory = territory
                    candidate_customer.account_manager=account_manager
                    candidate_customer.insert()
                    candidate_customer.save(ignore_permissions=True)
                    frappe.db.commit()
                    so = frappe.new_doc("Sales Order")
                    so.customer = candidate_name + '-' + passport_no
                    so.reference_customer_ = customer
                    so.customer_group = "Individual"
                    so.passport_number = passport_no
                    so.account_manager = account_manager
                    so.currency ="INR"
                    so.company_address = "TEAMPRO HR & IT Services Pvt. Ltd."
                    so.delivery_manager = delivery_manager
                    so.service = service
                    so.append("items", {
                        "item_code": item.item_code,
                        "item_name": item.item_name,
                        "candidate_owner": item.candidate_owner,
                        "sa_id":item.sa_id,
                        "payment_type": "Candidate",
                        "description": item.description,
                        "uom": item.stock_uom,
                        "is_stock_item": "0",
                        "passport_no": passport_no,
                        "delivery_date": expected_doj or '',
                        "qty": "1",
                        "rate": candidate_si,
                        # "dec1":candidate_dec,
                        "sc1":candidate_sc,
                        # "rate": candidate_sc,
                        "cost_center": "Main - THIS",
                    })
                    so.save(ignore_permissions=True)
                    frappe.db.commit()
                    # so.submit()
                    frappe.set_value('Closure', closure, 'status', 'Visa')

                    # if territory == 'India' or parent_territory == 'India':
                    #     # client
                    #     if payment == "Client":
                    #         so = frappe.new_doc("Sales Order")
                    #         so.customer = customer
                    #         so.account_manager = account_manager
                    #         so.append("items", {
                    #             "item_code": item.item_code,
                    #             "item_name": item.item_name,
                    #             "payment_type": "Candidate",
                    #             "description": item.description,
                    #             "uom": item.stock_uom,
                    #             "is_stock_item": "0",
                    #             "passport_no": passport_no,
                    #             "delivery_date": expected_doj,
                    #             "qty": "1",
                    #             "rate": client_sc,
                    #             "cost_center":"Main - THIS",
                    #         })
                    #         so.save(ignore_permissions=True)
                    #         frappe.db.commit()
                    #         # so.submit()

                    #     # candidate
                    #     if payment == "Candidate":
                    #         customer = frappe.new_doc("Customer")
                    #         customer.customer_name = candidate_name
                    #         customer.customer_type = "Individual"
                    #         customer.customer_group = "Individual"
                    #         customer.territory = territory
                    #         customer.insert()
                    #         customer.save(ignore_permissions=True)
                    #         frappe.db.commit()

                    #         so = frappe.new_doc("Sales Order")
                    #         so.customer = candidate_name
                    #         so.account_manager = account_manager
                    #         so.append("items", {
                    #             "item_code": item.item_code,
                    #             "item_name": item.item_name,
                    #             "payment_type": "Candidate",
                    #             "description": item.description,
                    #             "uom": item.stock_uom,
                    #             "is_stock_item": "0",
                    #             "passport_no": passport_no,
                    #             "delivery_date": expected_doj,
                    #             "qty": "1",
                    #             "rate": candidate_sc,
                    #             "cost_center":"Main - THIS",
                    #         })

                    #         so.save(ignore_permissions=True)
                    #         frappe.db.commit()
                    #         # so.submit()

                    #     if payment == "Both":
                    #         #client
                    #         so = frappe.new_doc("Sales Order")
                    #         so.customer = customer
                    #         so.account_manager = account_manager
                    #         so.append("items", {
                    #             "item_code": item.item_code,
                    #             "item_name": item.item_name,
                    #             "payment_type": "Candidate",
                    #             "description": item.description,
                    #             "uom": item.stock_uom,
                    #             "is_stock_item": "0",
                    #             "passport_no": passport_no,
                    #             "delivery_date": expected_doj,
                    #             "qty": "1",
                    #             "rate": client_sc,
                    #             "cost_center":"Main - THIS",
                    #         })
                    #         so.save(ignore_permissions=True)
                    #         frappe.db.commit()
                    #         # so.submit()

                    #         #candidate
                    #         customer = frappe.new_doc("Customer")
                    #         customer.customer_name = candidate_name
                    #         customer.customer_type = "Individual"
                    #         customer.customer_group = "Individual"
                    #         customer.territory = territory
                    #         customer.insert()
                    #         customer.save(ignore_permissions=True)
                    #         frappe.db.commit()
                    #         so = frappe.new_doc("Sales Order")
                    #         so.customer = candidate_name
                    #         so.account_manager = account_manager
                    #         so.append("items", {
                    #             "item_code": item.item_code,
                    #             "item_name": item.item_name,
                    #             "payment_type": "Candidate",
                    #             "description": item.description,
                    #             "uom": item.stock_uom,
                    #             "is_stock_item": "0",
                    #             "passport_no": passport_no,
                    #             "delivery_date": expected_doj,
                    #             "qty": "1",
                    #             "rate": candidate_sc,
                    #             "cost_center":"Main - THIS",
                    #         })
                    # frappe.set_value('Closure', closure, 'status', 'Arrived')

                frappe.set_value('Closure', closure, 'so_created', 1)
                frappe.set_value('Closure', closure, 'so_confirmed_date', today())

                total = cint(client_sc) + cint(candidate_sc)

                return "Sales Order Created for Total value {0}".format(frappe.bold(fmt_money(total, currency=billing_currency)))
            else:
                frappe.set_value('Closure', closure, 'so_created', 1)
                return "Item Created Successfully"
        # elif self.territory == 'Abudhabi':
        #     if self.irf and self.passport and self.photo:
        #         if self.so_created or self.so_confirmed_date:
        #             if self.offer_letter:
        #                 if self.mol:
        #                     if self.visa:
        #                         if self.final_medical:
        #                             if self.stamped_visa:
        #                                 if self.ecr_status != 'ECR' or self.emigration:
        #                                     if self.ticket:
        #                                         if self.status == 'Arrived':
        #                                             self.status = 'Arrived'
        #                                             self.boarded_date = today()
        #                                         else:
        #                                             self.status = 'Onboarding'
        #                                             self.status_updated_on = today()
        #                                     else:
        #                                         self.status = 'Ticket'
        #                                         self.ticket_date = today()
        #                                 else:
        #                                     self.status = 'Emigration'
        #                                     self.emigration_date = today()
        #                             else:
        #                                 self.status = 'Visa Stamping'
        #                                 self.stamped_visa_date = today()
        #                         else:
        #                             self.status = 'Final Medical'
        #                             self.final_medical_date = today()
        #                     else:
        #                         self.status = 'Visa'
        #                         self.visa_date = today()
        #                 else:
        #                     self.status = 'MOL'
        #                     self.mol_date = today()
        #             else:
        #                 self.status = 'Client Offer Letter'
        #                 self.offer_letter_date = today()
        #         else:
        #             self.status = 'Sales Order'
        #             self.status_updated_on = today()
        #     else:
        #         self.status = 'PSL'
        #         self.status_updated_on = today()

        # elif self.territory == 'UAE' or self.territory == 'Dubai':
        #     if self.irf and self.passport and self.photo:
        #         if self.status == 'Sales Order Confirmed' or self.sales_order_confirmed_date:
        #             if self.offer_letter:
        #                 if self.premedical:
        #                     if self.mol:
        #                         if self.visa:
        #                             if self.ecr_status != 'ECR' or self.poe:
        #                                 # if self.payment_reciept:
        #                                 if self.ticket:
        #                                     if self.status == 'Arrived':
        #                                         self.status = 'Arrived'
        #                                         self.boarded_date = today()
        #                                     else:
        #                                         self.status = 'Onboarding'
        #                                         self.status_updated_on = today()
        #                                 else:
        #                                     self.status = 'Ticket Details'
        #                                     self.ticket_date = today()
        #                                 # else:
        #                                 #     self.status = 'Payment Receipt'
        #                                 #     self.payment_receipt_date = today()
        #                             else:
        #                                 self.status = 'PoE'
        #                                 self.poe_date = today()
        #                         else:
        #                             self.status = 'Visa'
        #                             self.visa_date = today()
        #                     else:
        #                         self.status = 'MOL'
        #                         self.mol_date = today()
        #                 else:
        #                     self.status = 'Premedical'
        #                     self.premedical_date = today()
        #             else:
        #                 self.status = 'Client Offer Letter'
        #                 self.offer_letter_date = today()
        #         else:
        #             self.status = 'Sales Order'
        #             self.status_updated_on = today()
        #     else:
        #         self.status = 'PSL'
        #         self.status = 'Sales Order'
        #         self.status_updated_on = today()

        # elif self.territory == 'Dammam' or self.territory == 'Jeddah' or self.territory == 'Riyadh':
        #     if self.irf and self.passport and self.photo:
        #         if self.status == 'Sales Order Confirmed' or self.sales_order_confirmed_date:
        #             if self.offer_letter:
        #                 if self.visa:
        #                     if self.final_medical:
        #                         if self.stamped_visa:
        #                             if self.ecr_status != 'ECR' or self.poe:
        #                                 # if self.payment_reciept:
        #                                 if self.ticket:
        #                                     if self.status == 'Arrived':
        #                                         self.status = 'Arrived'
        #                                         self.boarded_date = today()
        #                                     else:
        #                                         self.status = 'Onboarding'
        #                                         self.status_updated_on = today()
        #                                 else:
        #                                     self.status = 'Ticket Details'
        #                                     self.ticket_date = today()
        #                                 # else:
        #                                 #     self.status = 'Payment Receipt'
        #                                 #     self.payment_receipt_date = today()
        #                             else:
        #                                 self.status = 'PoE'
        #                                 self.poe_date = today()
        #                         else:
        #                             self.status = 'Visa Stamping'
        #                             self.stamped_visa_date = today()
        #                     else:
        #                         self.status = 'Final Medical'
        #                         self.final_medical_date = today()
        #                 else:
        #                     self.status = 'Visa'
        #                     self.visa_date = today()
        #             else:
        #                 self.status = 'Client Offer Letter'
        #                 self.offer_letter_date = today()
        #         else:
        #             self.status = 'Sales Order'
        #             self.status_updated_on = today()
        #     else:
        #         self.status = 'PSL'
        #         self.status = 'Sales Order'
        #         self.status_updated_on = today()

        # elif self.territory == 'Oman' or self.territory == 'Maldives' or self.territory == 'Bahrain':
        #     if self.irf and self.passport and self.photo:
        #         if self.status == 'Sales Order Confirmed' or self.sales_order_confirmed_date:
        #             if self.offer_letter:
        #                 if self.premedical:
        #                     if self.stamped_visa:
        #                         if self.ecr_status != 'ECR' or self.poe:
        #                             # if self.payment_reciept:
        #                             if self.ticket:
        #                                 if self.status == 'Arrived':
        #                                     self.status = 'Arrived'
        #                                     self.boarded_date = today()
        #                                 else:
        #                                     self.status = 'Onboarding'
        #                                     self.status_updated_on = today()
        #                             else:
        #                                 self.status = 'Ticket Details'
        #                                 self.ticket_date = today()
        #                             # else:
        #                             #     self.status = 'Payment Receipt'
        #                             #     self.payment_receipt_date = today()
        #                         else:
        #                             self.status = 'PoE'
        #                             self.poe_date = today()
        #                     else:
        #                         self.status = 'Visa'
        #                         self.visa_date = today()
        #                 else:
        #                     self.status = 'Premedical'
        #                     self.premedical_date = today()
        #             else:
        #                 self.status = 'Client Offer Letter'
        #                 self.offer_letter_date = today()
        #         else:
        #             self.status = 'Sales Order'
        #             self.status_updated_on = today()
        #     else:
        #         self.status = 'PSL'
        #         self.status = 'Sales Order'
        #         self.status_updated_on = today()

        # elif self.territory == 'Kuwait' or self.territory == 'Singapore':
        #     if self.irf and self.passport and self.photo:
        #         if self.status == 'Sales Order Confirmed' or self.sales_order_confirmed_date:
        #             if self.offer_letter:
        #                 if self.premedicalpremedical:
        #                     if self.pcc:
        #                         if self.visa:
        #                             if self.final_medical:
        #                                 if self.stamped_visa:
        #                                     if self.ecr_status != 'ECR' or self.poe:
        #                                         # if self.payment_reciept:
        #                                         if self.ticket:
        #                                             if self.status == 'Arrived':
        #                                                 self.status = 'Arrived'
        #                                                 self.boarded_date = today()
        #                                             else:
        #                                                 self.status = 'Onboarding'
        #                                                 self.status_updated_on = today()
        #                                         else:
        #                                             self.status = 'Ticket Details'
        #                                             self.ticket_date = today()
        #                                     # else:
        #                                     #     self.status = 'Payment Receipt'
        #                                     #     self.payment_receipt_date = today()
        #                                     else:
        #                                         self.status = 'PoE'
        #                                         self.poe_date = today()
        #                                 else:
        #                                     self.status = 'Visa Stamping'
        #                                     self.stamped_visa_date = today()
        #                             else:
        #                                 self.status = 'Final Medical'
        #                                 self.final_medical_date = today()
        #                         else:
        #                             self.status = 'Visa'
        #                             self.visa_date = today()
        #                     else:
        #                         self.status = 'PCC'
        #                         self.pcc_date = today()
        #                 else:
        #                     self.status = 'Premedical'
        #                     self.premedical_date = today()
        #             else:
        #                 self.status = 'Client Offer Letter'
        #                 self.offer_letter_date = today()
        #         else:
        #             self.status = 'Sales Order'
        #             self.status_updated_on = today()
        #     else:
        #         self.status = 'PSL'
        #         self.status = 'Sales Order'
        #         self.status_updated_on = today()


# def closure_payment_entry(doc, method):
#     if doc.payment_type == "Receive":
#         given_name= doc.party
#         split = given_name.split('-',1)
#         fs = split[0]
#         closure = frappe.db.exists('Closure', {'given_name': fs})
#         if closure:
#             clid = frappe.get_doc('Closure', closure)
#             current_outstanding = clid.outstanding_amount
#             outstanding = current_outstanding - doc.paid_amount
#             current_outstanding = outstanding
#             clid.append('part_payment_collection', {
#                 'date': today(),
#                 'amount': doc.paid_amount
#             })
#             clid.save(ignore_permissions=True)
#             frappe.log_error(message=doc)

@frappe.whitelist()
def passport_number_update(pno,cand):
    frappe.db.set_value("Candidate",cand,"passport_number",pno)

@frappe.whitelist()
def visa_expiry_alert():
    start_date = nowdate()
    end_date = add_days(nowdate(),15)
    count = 0
    vs_date = frappe.db.sql("""SELECT customer,name,passport_no,vs_initiated_date,given_name,vs_expected_date,passport_no,task_subject FROM `tabClosure` WHERE vs_expected_date BETWEEN '%s' AND '%s' AND status = 'Visa Stamping' """%(start_date,end_date),as_dict =True)
    data=" "
    data +='<table border="1" width="100%" style="border-collapse: collapse;text-align: center;" ><tr style="background-color: #009dd1;color:white;"><td  width="20%">CLIENT</td><td  width="15%">CANDIDATE NAME</td><td  width="12%">PASSPORT NUMBER</td><td  width="15%">POSITION</td><td  width="10%">VISA INITIATED DATE</td><td  width="10%">VISA EXPIRY DATE</td><td  width="8%">AGE</td></tr>'
    for i in vs_date:
        date=(date_diff(i.vs_expected_date,start_date))
        data += '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'%(i.customer,i.given_name,i.passport_no,i.task_subject,i.vs_initiated_date or ' ',i.vs_expected_date,date)
        count += 1
    data += '</table>'
    if count > 0:
        frappe.sendmail(
                recipients=['sangeetha.s@groupteampro.com','sangeetha.a@groupteampro.com','dc@groupteampro.com','ramachandran.s@groupteampro.com'],
                cc = [''],
                subject=('Visa Expiry Date Report-%s '%(nowdate())),
                message="""
                        Dear Sir/Madam,<br>Kindly Find the below Visa Expiry Date Report.<br> %s <br>
                        Thanks & Regards,<br>TEAM ERP<br>"This email has been automatically generated. Please do not reply"
            
                        """ % (data)
            ) 
    else:
            data=" "
            data +='<table border="1" width="100%" style="border-collapse: collapse;text-align: center;" ><tr style="background-color: #009dd1;color:white;"><td  width="20%">CLIENT</td><td  width="15%">CANDIDATE NAME</td><td  width="12%">PASSPORT NUMBER</td><td  width="15%">POSITION</td><td  width="10%">VISA INITIATED DATE</td><td  width="10%">VISA EXPIRY DATE</td><td  width="8%">AGE</td></tr>'
            data += '<tr><td>NIL</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>'
            data += '</table>'
            frappe.sendmail(
                recipients=['sangeetha.s@groupteampro.com','sangeetha.a@groupteampro.com','dc@groupteampro.com','ramachandran.s@groupteampro.com'],
                cc = [''],
                subject=('Visa Expiry Date Report-%s '%(nowdate())),
                message="""
                        Dear Sir/Madam,<br>Kindly Find the below Visa Expiry Date Report.<br> %s <br>
                        Thanks & Regards,<br>TEAM ERP<br>"This email has been automatically generated. Please do not reply"
            
                        """ % (data)
            )
    return True 

@frappe.whitelist()
def fm_expiry_alert():
    count = 0
    start_date = nowdate()
    end_date = add_days(nowdate(),15)
    vs_date = frappe.db.sql("""SELECT customer,passport_no,fm_initiated_date,given_name,fm_expected_date,passport_no,task_subject FROM `tabClosure` WHERE fm_expected_date BETWEEN '%s' AND '%s' AND status = 'Final Medical' """%(start_date,end_date),as_dict =True)
    data=" "
    data +='<table border="1" width="100%" style="border-collapse: collapse;text-align: center;" ><tr style="background-color: #009dd1;color:white;"><td  width="20%">CLIENT</td><td  width="15%">CANDIDATE NAME</td><td  width="12%">PASSPORT NUMBER</td><td  width="15%">POSITION</td><td  width="10%">FM INITIATED DATE</td><td  width="10%"> FM EXPIRY DATE</td><td  width="8%">AGE</td></tr>'
    for i in vs_date:
        date=(date_diff(i.fm_expected_date,start_date))
        data += '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'%(i.customer,i.given_name,i.passport_no,i.task_subject,i.fm_initiated_date or ' ',i.fm_expected_date,date)
        count += 1
    data += '</table>'
    if count>0:
        frappe.sendmail(
            recipients=['sangeetha.s@groupteampro.com','sangeetha.a@groupteampro.com','dc@groupteampro.com','ramachandran.s@groupteampro.com'],
                cc = [''],
                subject=('Final Medical Report-%s '%(nowdate())),
                message="""
                        Dear Sir/Madam,<br>Kindly Find the below Final Medical Report.<br> %s <br>
                        Thanks & Regards,<br>TEAM ERP<br>"This email has been automatically generated. Please do not reply"
                        
                        """ % (data)
            )
    else:
        data=" "
        data +='<table border="1" width="100%" style="border-collapse: collapse;text-align: center;" ><tr style="background-color: #009dd1;color:white;"><td  width="20%">CLIENT</td><td  width="15%">CANDIDATE NAME</td><td  width="12%">PASSPORT NUMBER</td><td  width="15%">POSITION</td><td  width="10%">FM INITIATED DATE</td><td  width="10%"> FM EXPIRY DATE</td><td  width="8%">AGE</td></tr>'
        data += '<tr><td>NIL</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>'
        data += '</table>'
        frappe.sendmail(
            recipients=['sangeetha.s@groupteampro.com','sangeetha.a@groupteampro.com','dc@groupteampro.com','ramachandran.s@groupteampro.com'],
            cc = [''],
            subject=('port-%s '%(nowdate())),
            message="""
                    Dear Sir/Madam,<br>Kindly Find the below Final Medical Report.<br> %s <br>
                    Thanks & Regards,<br>TEAM ERP<br>"This email has been automatically generated. Please do not reply"
        
                    """ % (data)
        )
    return True 
    
@frappe.whitelist()
def mail_alert_for_vs_expiry_date():
    job = frappe.db.exists('Scheduled Job Type', 'visa_expiry_alert')
    if not job:
        sjt = frappe.new_doc("Scheduled Job Type")
        sjt.update({
            "method": 'jobpro.jobpro.doctype.closure.closure.visa_expiry_alert',
            "frequency": 'Cron',
            "cron_format": '00 09 * * *'
        })
        sjt.save(ignore_permissions=True)

    
@frappe.whitelist()
def mail_alert_for_fm_expiry_date():
    job = frappe.db.exists('Scheduled Job Type', 'fm_expiry_alert')
    if not job:
        sjt = frappe.new_doc("Scheduled Job Type")
        sjt.update({
            "method": 'jobpro.jobpro.doctype.closure.closure.fm_expiry_alert',
            "frequency": 'Cron',
            "cron_format": '00 09 * * *'
        })
        sjt.save(ignore_permissions=True)
    

import frappe
@frappe.whitelist()
def visa_validate(doc, method):
    visa = frappe.db.get_value("Closure", {"name": doc.name}, ["visa"])
    if visa:
        frappe.db.set_value("Closure", doc.name, "visa_status", "Visa Received")
    else:
        frappe.db.set_value("Closure", doc.name, "visa_status", "Visa Pending")


