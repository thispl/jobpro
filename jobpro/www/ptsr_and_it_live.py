

import frappe
from datetime import datetime

def get_context(context):
    context.ptsr_data = get_ptsr_data()
    context.itsr=ptis_live_report()



@frappe.whitelist(allow_guest=True)
def ptis_live_report():
    tot_cr=0
    posting_date = datetime.now().strftime("%d-%m-%Y")
    projects = frappe.db.get_all(
        "Project",
        filters={"service": "IT-SW", "status": ["not in", ["Completed", "Cancelled", "Hold"]]},
        fields=["name", "project_name", "project_type"]
    )
    grand_open=0
    grand_working=0
    grand_pr=0
    grand_cr=0
    grand_overdue=0
    grand_hold=0
    data = []
    s_no=1
    for project in projects:
        cr_count = frappe.db.count("Task", {"project": project.name, "status": "Client Review"})
        pr_count = frappe.db.count("Task", {"project": project.name, "status": "Pending Review"})
        hold_count = frappe.db.count("Task", {"project": project.name, "status": "Hold"})
        open_count = frappe.db.count("Task", {"project": project.name, "status": "Open"})
        overdue_count = frappe.db.count("Task", {"project": project.name, "status": "Overdue"})
        working_count = frappe.db.count("Task", {"project": project.name, "status": "Working"})
        total_count = cr_count + pr_count + hold_count + open_count + overdue_count + working_count
        grand_open+=open_count
        grand_working+=working_count
        grand_pr+=pr_count
        grand_cr+=cr_count
        grand_overdue+=overdue_count
        grand_hold+=hold_count
        s_no+=1
        data.append({
            "date":posting_date,
            "s_no":s_no,
            "project_name": project.project_name,
            "type": project.project_type,
            "client_review": cr_count,
            "pending_review": pr_count,
            "hold": hold_count,
            "open": open_count,
            "overdue": overdue_count,
            "working": working_count,
            "total": total_count,
            "grand_open":grand_open,
            "grand_working":grand_working,
            "grand_pr":grand_pr,
            "grand_cr":grand_cr,
            "grand_overdue":grand_overdue,
            "grand_hold":grand_hold
        })

    return data



# @frappe.whitelist(allow_guest=True)
# def get_ptsr_data():
#     posting_date = datetime.now().strftime("%d-%m-%Y")
#     data_list = []
#     sl_no = 1

#     cust = frappe.db.sql("""
#         SELECT * FROM `tabCustomer` 
#         WHERE `disabled` = 0 AND service IN ('REC-I','REC-D') 
#         ORDER BY `customer_name` ASC
#     """, as_dict=True)

#     for c in cust:
#         customer_data = {
#             "customer_name": c['customer_name'],
#             "projects": []
#         }
#         projects = frappe.get_all("Project", {
#             "status": ("in", ['Open', 'Enquiry']),
#             "customer": c['name'],
#             "service": ("in", ['REC-I', 'REC-D'])
#         }, ['name', 'project_name', 'priority', 'expected_value', 'remark', 'account_manager_remark', 'custom_spoc_remark', 'territory','sourcing_statu'], order_by="priority ASC")
#         tot_vac=0
#         tot_sp=0
#         tot_fp=0
#         tot_sl=0
#         tot_psl=0
#         tot_lp=0
#         for p in projects:
#             project_data = {
#                 "project_name": p['project_name'],
#                 "project_priority": p['priority'],
#                 "remark": p.get('remark', ''),
#                 "account_manager_remark": p.get('account_manager_remark', ''),
#                 "custom_spoc_remark": p.get('custom_spoc_remark', ''),
#                 "expected_value": p.get('expected_value', 0),
#                 "expected_psl": p.get('expected_value', 0),
#                 "territory": p.get('territory', ''),
#                 "sourcing_statu": p.get('sourcing_statu', ''),
#                 "tasks": []
#             }

#             tasks = frappe.get_all("Task", {
#                 "status": ("in", ('Working', 'Open', 'Overdue', 'Pending Review')),
#                 "project": p.name
#             }, ['subject', 'priority', 'vac', 'sp', 'fp', 'sl', 'psl', 'custom_lp'])

#             for t in tasks:
#                 tot_vac+=t.get('vac', 0)
#                 tot_sp+=t.get('sp', 0),
#                 tot_fp+= t.get('fp', 0),
#                 tot_sl+=t.get('sl', 0),
#                 tot_psl+= t.get('psl', 0),
#                 tot_lp+=t.get('custom_lp', 0)
#                 project_data["tasks"].append({
#                     "task": t['subject'],
#                     "task_priority": t['priority'],
#                     "vac": t.get('vac', 0),
#                     "sp": t.get('sp', 0),
#                     "fp": t.get('fp', 0),
#                     "sl": t.get('sl', 0),
#                     "psl": t.get('psl', 0),
#                     "lp": t.get('custom_lp', 0)
#                 })

#             customer_data["projects"].append(project_data)
#         data_list.append(customer_data)

#     return data_list
@frappe.whitelist(allow_guest=True)
def get_ptsr_data():
    posting_date = datetime.now().strftime("%d-%m-%Y")
    data_list = []

    cust = frappe.db.sql("""
        SELECT * FROM `tabCustomer` 
        WHERE `disabled` = 0 AND service IN ('REC-I','REC-D') 
        ORDER BY `customer_name` ASC
    """, as_dict=True)

    for c in cust:
        customer_data = {
            "customer_name": c['customer_name'],
            "projects": [],
            "tot_vac": 0,
            "tot_sp": 0,
            "tot_fp": 0,
            "tot_sl": 0,
            "tot_psl": 0,
            "tot_lp": 0
        }

        projects = frappe.get_all("Project", {
            "status": ("in", ['Open', 'Enquiry']),
            "customer": c['name'],
            "service": ("in", ['REC-I', 'REC-D'])
        }, ['name', 'project_name', 'priority', 'expected_value', 'remark', 'account_manager_remark', 'custom_spoc_remark', 'territory', 'sourcing_statu'], order_by="priority ASC")

        for p in projects:
            project_totals = {
                "vac": 0,
                "sp": 0,
                "fp": 0,
                "sl": 0,
                "psl": 0,
                "lp": 0
            }
            
            project_data = {
                "project_name": p['project_name'],
                "project_priority": p['priority'],
                "remark": p.get('remark', ''),
                "account_manager_remark": p.get('account_manager_remark', ''),
                "custom_spoc_remark": p.get('custom_spoc_remark', ''),
                "expected_value": p.get('expected_value', 0),
                "expected_psl": p.get('expected_value', 0),
                "territory": p.get('territory', ''),
                "sourcing_statu": p.get('sourcing_statu', ''),
                "tasks": []
            }

            tasks = frappe.get_all("Task", {
                "status": ("in", ('Working', 'Open', 'Overdue', 'Pending Review')),
                "project": p.name
            }, ['subject', 'priority', 'vac', 'sp', 'fp', 'sl', 'psl', 'custom_lp'])

            for t in tasks:
                project_totals["vac"] += t.get('vac', 0)
                project_totals["sp"] += t.get('sp', 0)
                project_totals["fp"] += t.get('fp', 0)
                project_totals["sl"] += t.get('sl', 0)
                project_totals["psl"] += t.get('psl', 0)
                project_totals["lp"] += t.get('custom_lp', 0)

                project_data["tasks"].append({
                    "task": t['subject'],
                    "task_priority": t['priority'],
                    "vac": t.get('vac', 0),
                    "sp": t.get('sp', 0),
                    "fp": t.get('fp', 0),
                    "sl": t.get('sl', 0),
                    "psl": t.get('psl', 0),
                    "lp": t.get('custom_lp', 0)
                })

            # Add project totals to project data
            project_data.update(project_totals)
            
            # Add project totals to customer totals
            customer_data["tot_vac"] += project_totals["vac"]
            customer_data["tot_sp"] += project_totals["sp"]
            customer_data["tot_fp"] += project_totals["fp"]
            customer_data["tot_sl"] += project_totals["sl"]
            customer_data["tot_psl"] += project_totals["psl"]
            customer_data["tot_lp"] += project_totals["lp"]
            
            customer_data["projects"].append(project_data)

        data_list.append(customer_data)

    return data_list
