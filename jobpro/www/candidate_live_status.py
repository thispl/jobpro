from __future__ import unicode_literals
import frappe
from frappe.utils import today,flt,cint, getdate, get_datetime
from datetime import timedelta,datetime
from frappe.utils import (
    add_days,
    ceil,
    cint,
    comma_and,
    flt,
    get_link_to_form,
    getdate,
    now_datetime,
    datetime,get_first_day,get_last_day,
    nowdate,
    today,
)

no_cache = 1

def get_context(context):
    context.att_data = get_data()
    context.project_summary = get_datas()

@frappe.whitelist(allow_guest=True)
def get_data():
    from datetime import datetime

    project_name = frappe.db.get_single_value("Candidate Live Status", "project")
    project = frappe.db.get_all("Task", {"project": project_name}, ["name", "subject"])
    date = nowdate()
    # now = datetime.now()
    now = datetime.now()
    date_now = now.strftime("%d/%m/%Y")
    time_now = now.strftime("%H:%M:%S")
    time_now_combined = f"{date_now} {time_now}"
    date = nowdate()
    data = []
    
    for i in project:
        position = i.subject
        
        linedup_count = frappe.db.sql("""
            SELECT COUNT(DISTINCT c.name) AS status_count
            FROM `tabCandidate` c
            INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
            WHERE c.project = %s
            AND cs.status = %s
            AND c.subject = %s
            AND c.task = %s
        """, (project_name, "Linedup", i.subject, i.name), as_dict=True)[0].status_count
        

        reported_count = frappe.db.sql("""
            SELECT COUNT(DISTINCT c.name) AS status_count
            FROM `tabCandidate` c
            INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
            WHERE cs.project = %s
            AND cs.status = %s
            AND cs.position = %s
            AND cs.task = %s
            AND DATE(cs.sourced_date) = %s
        """, (project_name, "Reported", i.subject, i.name, date), as_dict=True)[0].status_count
        
        attended_count = frappe.db.sql("""
            SELECT COUNT(DISTINCT c.name) AS status_count
            FROM `tabCandidate` c
            INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
            WHERE cs.project = %s
            AND cs.status = %s
            AND cs.position = %s
            AND cs.task = %s
            AND DATE(cs.sourced_date) = %s
        """, (project_name, "Interviewed", i.subject, i.name, date), as_dict=True)[0].status_count
       
        ppl_count = frappe.db.sql("""
            SELECT COUNT(DISTINCT c.name) AS status_count
            FROM `tabCandidate` c
            INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
            WHERE cs.project = %s
            AND cs.status = %s
            AND cs.position = %s
            AND cs.task = %s
            AND DATE(cs.sourced_date) = %s
        """, (project_name, "Proposed PSL", i.subject, i.name, date), as_dict=True)[0].status_count
        
        rp_count = frappe.db.sql("""
            SELECT COUNT(DISTINCT c.name) AS status_count
            FROM `tabCandidate` c
            INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
            WHERE cs.project = %s
            AND cs.status = %s
            AND cs.position = %s
            AND cs.task = %s
            AND DATE(cs.sourced_date) = %s
        """, (project_name, "Result Pending", i.subject, i.name, date), as_dict=True)[0].status_count
        
        rejected_count = frappe.db.sql("""
            SELECT COUNT(DISTINCT c.name) AS status_count
            FROM `tabCandidate` c
            INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
            WHERE cs.project = %s
            AND c.pending_for = %s 
            AND cs.status="Interviewed"
            AND cs.position = %s
            AND cs.task = %s
            AND DATE(cs.sourced_date) = %s
        """, (project_name, "IDB", i.subject, i.name, date), as_dict=True)[0].status_count
        pending_count = reported_count - attended_count
        if reported_count > 0:
            data.append({
                'position': position,
                'date': time_now_combined,
                'linedup': linedup_count,
                'reported': reported_count,
                'attended': attended_count,
                'rp': pending_count,
                'psl': ppl_count,
                'pending':rp_count,
                'rejected':rejected_count

            })

    return data

@frappe.whitelist(allow_guest=True)
def get_datas():
    from datetime import datetime

    project_name = frappe.db.get_single_value("Candidate Live Status", "project")
    project = frappe.db.get_all("Task", {"project": project_name}, ["name", "subject"])
    date = nowdate()
    data = []
    linedup_count = frappe.db.sql("""
        SELECT COUNT(DISTINCT c.name) AS status_count
        FROM `tabCandidate` c
        INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
        WHERE c.project = %s
        AND cs.status = %s
    """, (project_name, "Linedup"), as_dict=True)[0].status_count

    reported_count = frappe.db.sql("""
        SELECT COUNT(DISTINCT c.name) AS status_count
        FROM `tabCandidate` c
        INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
        WHERE cs.project = %s
        AND cs.status = %s
        AND DATE(cs.sourced_date) = %s
    """, (project_name, "Reported",date), as_dict=True)[0].status_count
    
    attended_count = frappe.db.sql("""
        SELECT COUNT(DISTINCT c.name) AS status_count
        FROM `tabCandidate` c
        INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
        WHERE cs.project = %s
        AND cs.status = %s
        AND DATE(cs.sourced_date) = %s
    """, (project_name, "Interviewed",date), as_dict=True)[0].status_count
    
    ppl_count = frappe.db.sql("""
        SELECT COUNT(DISTINCT c.name) AS status_count
        FROM `tabCandidate` c
        INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
        WHERE cs.project = %s
        AND cs.status = %s
        AND DATE(cs.sourced_date) = %s
    """, (project_name, "Proposed PSL",date), as_dict=True)[0].status_count
    rp_count = frappe.db.sql("""
        SELECT COUNT(DISTINCT c.name) AS status_count
        FROM `tabCandidate` c
        INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
        WHERE cs.project = %s
        AND cs.status = %s
        AND DATE(cs.sourced_date) = %s
    """, (project_name, "Result Pending",date), as_dict=True)[0].status_count
    rejected_count = frappe.db.sql("""
            SELECT COUNT(DISTINCT c.name) AS status_count
            FROM `tabCandidate` c
            INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
            WHERE cs.project = %s
            AND c.pending_for = %s 
            AND cs.status="Interviewed"
            AND DATE(cs.sourced_date) = %s
        """, (project_name, "IDB",date), as_dict=True)[0].status_count
    pending_count = reported_count - attended_count
    data.append({
            'linedup': linedup_count,
            'reported': reported_count,
            'attended': attended_count,
            'rp':pending_count,
            'psl': ppl_count,
            'pending':rp_count,
            'rejected':rejected_count
        })
    return data


