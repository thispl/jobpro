# Copyright (c) 2025, teamPRO and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
# from __future__ import unicode_literals
# from inspect import classify_class_attrs
import frappe
from frappe.model.document import Document
from frappe.utils import today, flt, add_days, date_diff
from frappe.utils import cstr, formatdate, add_months, cint, fmt_money, add_days, flt
from frappe.utils.data import nowdate
# from erpnext.setup.utils import get_exchange_rate

class CertificateAttestation(Document):
    pass

@frappe.whitelist()
def create_sale_order(due_date,ca,reference_customer_,delivery_manager,candidate_name,contact,payment,billing_currency,passport_no,passport_number,supplier,service,client_si,candidate_si,associate,associate_sc,associate_si,customer=None):
    parent_territory = frappe.get_value('Customer', customer, 'territory')
    account_manager=frappe.db.get_value("Customer",customer,"account_manager")
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
        if parent_territory != 'India':
            if payment == "Client":
                so = frappe.new_doc("Sales Order")
                so.customer = customer
                so.reference_customer_ = customer
                so.passport_number = passport_no
                so.account_manager = account_manager
                so.delivery_manager = delivery_manager
                so.currency = billing_currency
                so.supplier = supplier
                so.service = service
                so.company_address = "TEAMPRO HR & IT Services Pvt. Ltd."
                so.append("items", {
                    "item_code": item.item_code,
                    "item_name": item.item_name,
                    "sa_id":item.sa_id,
                    "payment_type": "Candidate",
                    "description": item.description,
                    "uom": item.stock_uom,
                    "is_stock_item": "0",
                    "passport_no": passport_no,
                    "delivery_date": due_date or '',
                    "qty": "1",
                    "rate": client_si,
                    # "sc1": client_sc,
                    "cost_center": "Main - THIS",
                })
                so.save(ignore_permissions=True)
                frappe.db.commit()
            if payment == "Candidate":
                candidate_customer = frappe.new_doc("Customer")
                candidate_customer.customer_name = candidate_name + '-' + passport_no
                candidate_customer.customer_type = "Individual"
                candidate_customer.customer_group = "Individual"
                candidate_customer.territory = parent_territory
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
                    "delivery_date": due_date or '',
                    "qty": "1",
                    "rate": candidate_si,
                    "cost_center": "Main - THIS",
                })
                so.save(ignore_permissions=True)
                frappe.db.commit()
            if payment == "Associate":
                so = frappe.new_doc("Sales Order")
                so.customer = associate
                so.reference_customer_ = customer
                so.customer_group = "Associate"
                so.service = service
                so.company_address = "TEAMPRO HR & IT Services Pvt. Ltd."
                so.append("items", {
                    "item_code": item.item_code,
                    "item_name": item.item_name,
                    "candidate_owner": item.candidate_owner,
                    "sa_id":item.sa_id,
                    "description": item.description,
                    "uom": item.stock_uom,
                    "is_stock_item": "0",
                    "passport_no": passport_no,
                    "delivery_date": due_date or '',
                    "qty": "1",
                    "rate": associate_si,
                    "cost_center": "Main - THIS",
                })
                so.save(ignore_permissions=True)
                frappe.db.commit()
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
                    "delivery_date": due_date or '',
                    "qty": "1",
                    "rate": client_si,
                    # "sc1": client_sc,
                    "cost_center": "Main - THIS",
                })
                so.save(ignore_permissions=True)
                frappe.db.commit()
                candidate_customer = frappe.new_doc("Customer")
                candidate_customer.customer_name = candidate_name + '-' + passport_no
                candidate_customer.customer_type = "Individual"
                candidate_customer.customer_group = "Individual"
                candidate_customer.territory = parent_territory
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
                    "delivery_date": due_date or '',
                    "qty": "1",
                    "rate": candidate_si,
                    # "sc1":candidate_sc,
                    "cost_center": "Main - THIS",
                })
                so.save(ignore_permissions=True)
                frappe.db.commit()
            frappe.set_value('Certificate Attestation', ca, 'so_created', 1)
            frappe.set_value('Certificate Attestation', ca, 'so_confirmed_date', today())
            return "Sales Order Created for Total value "