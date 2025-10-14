import frappe
from frappe import _
from frappe.utils import getdate, flt, today, nowdate
from frappe.utils import now_datetime
from datetime import datetime
from openpyxl.styles import PatternFill

import json

import json
import frappe
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, Border, Side
from openpyxl.drawing.image import Image
import frappe, io
import os
from frappe.utils.file_manager import get_file_path
from openpyxl.drawing.spreadsheet_drawing import AnchorMarker, OneCellAnchor
import base64



@frappe.whitelist()
def get_ptsr_data_project_wise(status=None, sourcing_statu=None):
    filters = {
        "service": ["in", ['REC-I', 'REC-D']]
    }

    # Parse status if it's a JSON stringified list
    if status:
        if isinstance(status, str):
            try:
                status = json.loads(status)
            except json.JSONDecodeError:
                status = [status]
        elif not isinstance(status, list):
            status = [status]
        filters["status"] = ["in", status]

    # Parse sourcing_statu if it's a JSON stringified list
    if sourcing_statu:
        if isinstance(sourcing_statu, str):
            try:
                sourcing_statu = json.loads(sourcing_statu)
            except json.JSONDecodeError:
                sourcing_statu = [sourcing_statu]
        elif not isinstance(sourcing_statu, list):
            sourcing_statu = [sourcing_statu]
        filters["sourcing_statu"] = ["in", sourcing_statu]


    projects = frappe.get_all(
        "Project",
        filters=filters,
        fields=[
            'name', 'project_name', 'priority', 'remark','tvac','tsp','tfp','tsl','custom_t_lp','tpsl',
            'account_manager_remark', 'custom_spoc_remark',
            'sourcing_statu', 'territory', 'expected_value',
            'expected_psl', 'custom_psl_value', 'customer', 'creation'
        ],
        order_by="priority ASC, customer ASC"
    )

    return get_task_data(projects)


@frappe.whitelist()
def get_task_data(projects):
    today = now_datetime()
    data = []
    total_counts = {
        "vac": 0, "sp": 0, "fp": 0, "sl": 0, "psl": 0, "custom_lp": 0, "age": 0
    }

    for p in projects:
        task_list = frappe.get_all("Task", {
            "status": ("in", ['Working', 'Open', 'Overdue', 'Pending Review']),
            "project": p.name
        }, ['name','subject','priority','vac','sp','fp','sl','psl','custom_lp','creation'], order_by="priority ASC")

        tasks = []
        for t in task_list:
            age = (today - t['creation']).days
            vac = flt(t.get('vac'))
            sp = flt(t.get('sp'))
            fp = flt(t.get('fp'))
            sl = flt(t.get('sl'))
            psl = flt(t.get('psl'))
            lp = flt(t.get('custom_lp'))

            tasks.append({
                "name": t['name'],
                "task_name": t['subject'],
                "task_priority": t['priority'],
                "vac": vac,
                "sp": sp,
                "fp": fp,
                "sl": sl,
                "psl": psl,
                "custom_lp": lp,
                "age": age
            })

            # Accumulate totals
            total_counts['vac'] += vac
            total_counts['sp'] += sp
            total_counts['fp'] += fp
            total_counts['sl'] += sl
            total_counts['psl'] += psl
            total_counts['custom_lp'] += lp
            total_counts['age'] += age

        data.append({
            "name": p['name'],
            "project_name": p['project_name'],
            "priority": p['priority'],
            "remark": p['remark'],
            "tvac":p['tvac'],
            "tsp":p['tsp'],
            "tfp":p['tfp'],
            "tsl":p['tsl'],
            "custom_t_lp":p['custom_t_lp'],
            "tpsl":p['tpsl'],
            "account_manager_remark": p['account_manager_remark'],
            "custom_spoc_remark": p['custom_spoc_remark'],
            "sourcing_statu": p['sourcing_statu'],
            "territory": p['territory'],
            "expected_value": p['expected_value'],
            "expected_psl": p['expected_psl'],
            "custom_psl_value": p['custom_psl_value'],
            "customer": p['customer'],
            "creation": p['creation'],
            "task_count": len(tasks),
            "tasks": tasks
        })

    return {
        "projects": data,
        "counts": total_counts
    }






@frappe.whitelist()
def get_ptsr_data_closure_wise(status=None,territory=None,client=None):
    filters = {}

    
    if status:
        if isinstance(status, str):
            try:
                status = json.loads(status)
            except json.JSONDecodeError:
                status = [status]
        elif not isinstance(status, list):
            status = [status]
        filters["status"] = ["in", status]
        
    if territory:
        filters["territory"] = territory

    if client:
        filters["customer"] = client

    
    closures = frappe.db.get_all(
        "Closure",
        filters=filters,
        fields=["name", "given_name", "passport_no", "territory", "status", "customer"]
    )

    
    for c in closures:
        history = frappe.get_all(
            "Closure Status History",  
            filters={
                "parent": c["name"],
                "parenttype": "Closure",
                "parentfield": "custom_history"
            },
            fields=["date"]
        )

        

        
        c["custom_history"] = history

    frappe.log_error(message=closures, title="Closure with History")

    return { "closure": closures }
# @frappe.whitelist()
# def get_ptsr_data_closure_wise(status=None,territory=None,client=None):
#     filters = {}

    
#     if status:
#         if isinstance(status, str):
#             try:
#                 status = json.loads(status)
#             except json.JSONDecodeError:
#                 status = [status]
#         elif not isinstance(status, list):
#             status = [status]
#         filters["status"] = ["in", status]

    
#     closures = frappe.db.get_all(
#         "Closure",
#         filters=filters,
#         fields=["name", "given_name", "passport_no", "territory", "status", "customer"]
#     )

    
#     for c in closures:
#         history = frappe.get_all(
#             "Closure Status History",  
#             filters={
#                 "parent": c["name"],
#                 "parenttype": "Closure",
#                 "parentfield": "custom_history"
#             },
#             fields=["date"]
#         )

        

        
#         c["custom_history"] = history

#     frappe.log_error(message=closures, title="Closure with History")

#     return { "closure": closures }



@frappe.whitelist()
def get_territories():
    return frappe.get_all("Territory", fields=["name"])

@frappe.whitelist()
def get_client():
    return frappe.get_all("Customer", fields=["name"])

# @frappe.whitelist()
# def get_filtered_data(territory=None, client=None, table_type=None):
#     filters = {}
#     if territory:
#         filters["territory"] = territory
#     if client:
#         filters["Customer"] = client

#     if table_type == "teampro-btn":
#         data = frappe.get_all("Teampro", filters=filters, fields=["name", "status"])
#     elif table_type == "candidate-btn":
#         data = frappe.get_all("Candidate", filters=filters, fields=["name", "status"])
#     else:
#         data = frappe.get_all("Client", filters=filters, fields=["name", "status"])

#     return data



@frappe.whitelist()
def download_teampro_excel(status):
    
    wb = Workbook()
    ws = wb.active
    ws.title = "TEAMPRO CLOSURE"
    
    # Styles
    thin = Side(border_style="thin", color="000000")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    center = Alignment(horizontal="center", vertical="center")
    left = Alignment(horizontal="left", vertical="center")
    bold = Font(bold=True)
    header_fill = PatternFill(start_color="0F1568", end_color="0F1568", fill_type="solid")

    
    
    filters = {}

    
    if status:
        if isinstance(status, str):
            try:
                status = json.loads(status)
            except json.JSONDecodeError:
                status = [status]
        elif not isinstance(status, list):
            status = [status]
        filters["status"] = ["in", status]

    
    closures = frappe.db.get_all(
        "Closure",
        filters=filters,
        fields=["name", "given_name", "passport_no", "territory", "status", "customer"]
    )

    
    for c in closures:
        history = frappe.get_all(
            "Closure Status History",  
            filters={
                "parent": c["name"],
                "parenttype": "Closure",
                "parentfield": "custom_history"
            },
            fields=["date"]
        )
        
        c["custom_history"] = history
        
        
    
    
        
    
    ws.merge_cells("A1:H2")    
    ws["A1"]="TEAMPRO"
    ws["A1"].font = Font(bold=True, size=14,color="FFFFFF")
    ws["A1"].alignment = center    
    ws["A1"].fill = header_fill   
        
        
    ws["A3"]="S.No" 
    ws["A3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["A3"].alignment = center
    ws["A3"].fill = header_fill
       
    ws["B3"]="CLID"
    ws["B3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["B3"].alignment = center
    ws["B3"].fill = header_fill
         
    ws["C3"]="Name"
    ws["C3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["C3"].alignment = center
    ws["C3"].fill = header_fill
         
    ws["D3"]="PP Number"
    ws["D3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["D3"].alignment = center
    ws["D3"].fill = header_fill
         
    ws["E3"]="Territory"
    ws["E3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["E3"].alignment = center
    ws["E3"].fill = header_fill
         
    ws["F3"]="Status"
    ws["F3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["F3"].alignment = center
    ws["F3"].fill = header_fill
         
    ws["G3"]="Client"
    ws["G3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["G3"].alignment = center
    ws["G3"].fill = header_fill
         
    ws["H3"]="Age"
    ws["H3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["H3"].alignment = center
    ws["H3"].fill = header_fill    
    
    column_widths = {
        "A": 10, "B": 12, "C": 35, "D": 20, "E": 20, "F": 18, "G": 45, "H": 10,
        
    }
 
    for col, width in column_widths.items():
        ws.column_dimensions[col].width = width
    
    
    
    
    for idx, closure in enumerate(closures, start=1):
        age = calculate_age_from_history(closure.get("custom_history"))

        row_data = [
            idx,
            closure.get("name", ""),
            closure.get("given_name", ""),
            closure.get("passport_no", ""),
            closure.get("territory", ""),
            closure.get("status", ""),
            closure.get("customer", ""),
            age
        ]

        ws.append(row_data)
        row = ws.max_row
        
    for r in ws.iter_rows(min_row=1, max_row=row,
                                min_col=1, max_col=8):
            for cell in r:
                cell.border = border    
    

    
    
    
    
    file_data = io.BytesIO()
    wb.save(file_data)
    file_data.seek(0)

    encoded = base64.b64encode(file_data.getvalue()).decode()
    filename = "Teampro_Closure.xlsx"
    return {"filename": filename, "data": encoded}



@frappe.whitelist()
def download_candidate_excel(status):
    
    wb = Workbook()
    ws = wb.active
    ws.title = "CANDIDATE CLOSURE"
    
    # Styles
    thin = Side(border_style="thin", color="000000")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    center = Alignment(horizontal="center", vertical="center")
    left = Alignment(horizontal="left", vertical="center")
    bold = Font(bold=True)
    header_fill = PatternFill(start_color="0F1568", end_color="0F1568", fill_type="solid")

    
    
    filters = {}

    
    if status:
        if isinstance(status, str):
            try:
                status = json.loads(status)
            except json.JSONDecodeError:
                status = [status]
        elif not isinstance(status, list):
            status = [status]
        filters["status"] = ["in", status]

    
    closures = frappe.db.get_all(
        "Closure",
        filters=filters,
        fields=["name", "given_name", "passport_no", "territory", "status", "customer"]
    )

    
    for c in closures:
        history = frappe.get_all(
            "Closure Status History",  
            filters={
                "parent": c["name"],
                "parenttype": "Closure",
                "parentfield": "custom_history"
            },
            fields=["date"]
        )
        
        c["custom_history"] = history
        
        
    
    
        
    
    ws.merge_cells("A1:H2")    
    ws["A1"]="CANDIDATE"
    ws["A1"].font = Font(bold=True, size=14,color="FFFFFF")
    ws["A1"].alignment = center    
    ws["A1"].fill = header_fill   
        
        
    ws["A3"]="S.No" 
    ws["A3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["A3"].alignment = center
    ws["A3"].fill = header_fill
       
    ws["B3"]="CLID"
    ws["B3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["B3"].alignment = center
    ws["B3"].fill = header_fill
         
    ws["C3"]="Name"
    ws["C3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["C3"].alignment = center
    ws["C3"].fill = header_fill
         
    ws["D3"]="PP Number"
    ws["D3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["D3"].alignment = center
    ws["D3"].fill = header_fill
         
    ws["E3"]="Territory"
    ws["E3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["E3"].alignment = center
    ws["E3"].fill = header_fill
         
    ws["F3"]="Status"
    ws["F3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["F3"].alignment = center
    ws["F3"].fill = header_fill
         
    ws["G3"]="Client"
    ws["G3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["G3"].alignment = center
    ws["G3"].fill = header_fill
         
    ws["H3"]="Age"
    ws["H3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["H3"].alignment = center
    ws["H3"].fill = header_fill    
    
    column_widths = {
        "A": 10, "B": 12, "C": 35, "D": 20, "E": 20, "F": 18, "G": 45, "H": 10,
        
    }
 
    for col, width in column_widths.items():
        ws.column_dimensions[col].width = width
    
    
    
    
    for idx, closure in enumerate(closures, start=1):
        age = calculate_age_from_history(closure.get("custom_history"))

        row_data = [
            idx,
            closure.get("name", ""),
            closure.get("given_name", ""),
            closure.get("passport_no", ""),
            closure.get("territory", ""),
            closure.get("status", ""),
            closure.get("customer", ""),
            age
        ]

        ws.append(row_data)
        row = ws.max_row
        
    for r in ws.iter_rows(min_row=1, max_row=row,
                                min_col=1, max_col=8):
            for cell in r:
                cell.border = border    
    

    
    
    
    
    file_data = io.BytesIO()
    wb.save(file_data)
    file_data.seek(0)

    encoded = base64.b64encode(file_data.getvalue()).decode()
    filename = "Candidate_Closure.xlsx"
    return {"filename": filename, "data": encoded}



@frappe.whitelist()
def download_client_excel(status):
    
    wb = Workbook()
    ws = wb.active
    ws.title = "CLIENT CLOSURE"
    
    # Styles
    thin = Side(border_style="thin", color="000000")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    center = Alignment(horizontal="center", vertical="center")
    left = Alignment(horizontal="left", vertical="center")
    bold = Font(bold=True)
    header_fill = PatternFill(start_color="0F1568", end_color="0F1568", fill_type="solid")

    
    
    filters = {}

    
    if status:
        if isinstance(status, str):
            try:
                status = json.loads(status)
            except json.JSONDecodeError:
                status = [status]
        elif not isinstance(status, list):
            status = [status]
        filters["status"] = ["in", status]

    
    closures = frappe.db.get_all(
        "Closure",
        filters=filters,
        fields=["name", "given_name", "passport_no", "territory", "status", "customer"]
    )

    
    for c in closures:
        history = frappe.get_all(
            "Closure Status History",  
            filters={
                "parent": c["name"],
                "parenttype": "Closure",
                "parentfield": "custom_history"
            },
            fields=["date"]
        )
        
        c["custom_history"] = history
        
        
    
    
        
    
    ws.merge_cells("A1:H2")    
    ws["A1"]="CLIENT"
    ws["A1"].font = Font(bold=True, size=14,color="FFFFFF")
    ws["A1"].alignment = center    
    ws["A1"].fill = header_fill   
        
        
    ws["A3"]="S.No" 
    ws["A3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["A3"].alignment = center
    ws["A3"].fill = header_fill
       
    ws["B3"]="CLID"
    ws["B3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["B3"].alignment = center
    ws["B3"].fill = header_fill
         
    ws["C3"]="Name"
    ws["C3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["C3"].alignment = center
    ws["C3"].fill = header_fill
         
    ws["D3"]="PP Number"
    ws["D3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["D3"].alignment = center
    ws["D3"].fill = header_fill
         
    ws["E3"]="Territory"
    ws["E3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["E3"].alignment = center
    ws["E3"].fill = header_fill
         
    ws["F3"]="Status"
    ws["F3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["F3"].alignment = center
    ws["F3"].fill = header_fill
         
    ws["G3"]="Client"
    ws["G3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["G3"].alignment = center
    ws["G3"].fill = header_fill
         
    ws["H3"]="Age"
    ws["H3"].font = Font(bold=True, size=12,color="FFFFFF")
    ws["H3"].alignment = center
    ws["H3"].fill = header_fill    
    
    column_widths = {
        "A": 10, "B": 12, "C": 35, "D": 20, "E": 20, "F": 18, "G": 45, "H": 10,
        
    }
 
    for col, width in column_widths.items():
        ws.column_dimensions[col].width = width
    
    
    
    
    for idx, closure in enumerate(closures, start=1):
        age = calculate_age_from_history(closure.get("custom_history"))

        row_data = [
            idx,
            closure.get("name", ""),
            closure.get("given_name", ""),
            closure.get("passport_no", ""),
            closure.get("territory", ""),
            closure.get("status", ""),
            closure.get("customer", ""),
            age
        ]

        ws.append(row_data)
        row = ws.max_row
        
    for r in ws.iter_rows(min_row=1, max_row=row,
                                min_col=1, max_col=8):
            for cell in r:
                cell.border = border    
    

    
    
    
    
    file_data = io.BytesIO()
    wb.save(file_data)
    file_data.seek(0)

    encoded = base64.b64encode(file_data.getvalue()).decode()
    filename = "Client_Closure.xlsx"
    return {"filename": filename, "data": encoded}




from datetime import datetime

def calculate_age_from_history(history):
    if not history:
        return "-"
    try:
        # Get the latest date instead of the oldest
        valid_dates = [h["date"] for h in history if h.get("date")]
        if not valid_dates:
            return "-"
        
        # Sort and pick the latest date
        latest_date = max(valid_dates)
        
        # If the date is in string format, parse it
        if isinstance(latest_date, str):
            latest_date = datetime.strptime(latest_date, "%Y-%m-%d").date()
        else:
            latest_date = latest_date.date() if isinstance(latest_date, datetime) else latest_date
        
        age = (datetime.now().date() - latest_date).days
        return age
    except Exception as e:
        print("Error calculating age:", e)
        return "-"
