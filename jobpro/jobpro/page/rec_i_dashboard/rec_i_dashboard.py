import frappe
from frappe.utils import getdate, nowdate

@frappe.whitelist()
def get_order_booking_rec(from_date=None, to_date=None):
    conditions = ["service = 'REC-I'", "docstatus = 1", "status NOT IN ('On Hold', 'Cancelled', 'Closed','Completed')"]
    # if not from_date and not to_date:
    #     today = frappe.utils.today()
    #     fiscal_year = frappe.db.get_value("Fiscal Year", 
    #         filters={"year_start_date": ["<=", today], "year_end_date": [">=", today]},
    #         fieldname=["year_start_date", "year_end_date"],
    #         as_dict=True
    #     )
    #     from_date = fiscal_year["year_start_date"]
    #     to_date = fiscal_year["year_end_date"]
    if from_date:
        conditions.append("transaction_date >= %(from_date)s")
    if to_date:
        conditions.append("transaction_date <= %(to_date)s")

    query = f"""
        SELECT SUM(base_net_total)
        FROM `tabSales Order`
        WHERE {' AND '.join(conditions)}
    """

    result = frappe.db.sql(query, {'from_date': from_date, 'to_date': to_date})[0][0] or 0
    return result

@frappe.whitelist()
def get_turnover_rec(from_date=None, to_date=None):
    conditions = ["services = 'REC-I'", "docstatus = 1", "status NOT IN ('Return','Draft','Cancelled')"]
    if not from_date and not to_date:
        today = frappe.utils.today()
        fiscal_year = frappe.db.get_value("Fiscal Year", 
            filters={"year_start_date": ["<=", today], "year_end_date": [">=", today]},
            fieldname=["year_start_date", "year_end_date"],
            as_dict=True
        )
        from_date = fiscal_year["year_start_date"]
        to_date = fiscal_year["year_end_date"]
    if from_date:
        conditions.append("posting_date >= %(from_date)s")
    if to_date:
        conditions.append("posting_date <= %(to_date)s")

    query = f"""
        SELECT SUM(base_net_total)
        FROM `tabSales Invoice`
        WHERE {' AND '.join(conditions)}
    """

    result = frappe.db.sql(query, {'from_date': from_date, 'to_date': to_date})[0][0] or 0
    return result

@frappe.whitelist()
def get_collection_value_rec(from_date=None, to_date=None):
    if not from_date and not to_date:
        today = frappe.utils.today()
        fiscal_year = frappe.db.get_value(
            "Fiscal Year",
            filters={"year_start_date": ["<=", today], "year_end_date": [">=", today]},
            fieldname=["year_start_date", "year_end_date"],
            as_dict=True
        )
        from_date = fiscal_year["year_start_date"]
        to_date = fiscal_year["year_end_date"]

    conditions = [
        "pe.payment_type = 'Receive'",
        "pe.docstatus = 1",
        "per.service = 'REC-I'"
    ]

    if from_date:
        conditions.append("pe.posting_date >= %(from_date)s")
    if to_date:
        conditions.append("pe.posting_date <= %(to_date)s")

    query = f"""
        SELECT SUM(pe.paid_amount)
        FROM `tabPayment Entry` pe
        INNER JOIN `tabPayment Entry Reference` per ON per.parent = pe.name
        WHERE {' AND '.join(conditions)}
    """

    return frappe.db.sql(query, {'from_date': from_date, 'to_date': to_date})[0][0] or 0

@frappe.whitelist()
def rec_receivable():
    today = frappe.utils.today()
    fiscal_year = frappe.db.get_value(
        "Fiscal Year",
        filters={"year_start_date": ["<=", today], "year_end_date": [">=", today]},
        fieldname=["year_start_date", "year_end_date"],
        as_dict=True
    )
    from_date = fiscal_year["year_start_date"]
    to_date = fiscal_year["year_end_date"]

    filters = {
        'from_date': from_date,
        'to_date': to_date
    }
    total_invoice = frappe.db.sql("""
        SELECT SUM(outstanding_amount)
        FROM `tabSales Invoice`
        WHERE docstatus = 1
          AND services="REC-I"
          AND outstanding_amount > 0
    """)[0][0] or 0
    return total_invoice

@frappe.whitelist()
def rec_to_bill_value():
    today = frappe.utils.today()
    fiscal_year = frappe.db.get_value(
        "Fiscal Year",
        filters={"year_start_date": ["<=", today], "year_end_date": [">=", today]},
        fieldname=["year_start_date", "year_end_date"],
        as_dict=True
    )
    from_date = fiscal_year["year_start_date"]
    to_date = fiscal_year["year_end_date"]

    filters = {
        'from_date': from_date,
        'to_date': to_date
    }
    total_invoice = frappe.db.sql("""
        SELECT SUM(base_grand_total)
        FROM `tabSales Order`
        WHERE docstatus = 1
          AND service='REC-I'
          AND status='To Bill'
    """)[0][0] or 0    
    return total_invoice

@frappe.whitelist()
def rec_to_deliver_bill_value():
    today = frappe.utils.today()
    fiscal_year = frappe.db.get_value(
        "Fiscal Year",
        filters={"year_start_date": ["<=", today], "year_end_date": [">=", today]},
        fieldname=["year_start_date", "year_end_date"],
        as_dict=True
    )
    from_date = fiscal_year["year_start_date"]
    to_date = fiscal_year["year_end_date"]

    filters = {
        'from_date': from_date,
        'to_date': to_date
    }

    total_invoice = frappe.db.sql("""
        SELECT SUM(base_grand_total)
        FROM `tabSales Order`
        WHERE docstatus = 1
          AND service='REC-I'
          AND status='To Deliver and Bill'
    """)[0][0] or 0    

    return total_invoice

@frappe.whitelist()
def rec_payable():
    # if not from_date and not to_date:
    today = frappe.utils.today()
    fiscal_year = frappe.db.get_value(
        "Fiscal Year",
        filters={"year_start_date": ["<=", today], "year_end_date": [">=", today]},
        fieldname=["year_start_date", "year_end_date"],
        as_dict=True
    )
    from_date = fiscal_year["year_start_date"]
    to_date = fiscal_year["year_end_date"]

    # filters = {
    #     'from_date': from_date,
    #     'to_date': to_date
    # }

    # Total Submitted Purchase Invoice Amount
    # total_invoice = frappe.db.sql("""
    #     SELECT SUM(outstanding_amount)
    #     FROM `tabPurchase Invoice`
    #     WHERE docstatus = 1
    #       AND services="REC-I"
    #       AND posting_date BETWEEN %(from_date)s AND %(to_date)s
    # """, filters)[0][0] or 0
    total_invoice = frappe.db.sql("""
        SELECT SUM(outstanding_amount)
        FROM `tabPurchase Invoice`
        WHERE docstatus = 1
          AND services="REC-I"
          AND outstanding_amount > 0
    """)[0][0] or 0
    return total_invoice

@frappe.whitelist()
def rec_receivable_table():
    from frappe.utils import today, getdate, nowdate, fmt_money
    from datetime import datetime
   
    data = frappe.db.sql("""
        SELECT name, customer, outstanding_amount, posting_date
        FROM `tabSales Invoice`
        WHERE docstatus = 1
          AND services="REC-I"
          AND outstanding_amount > 0
        ORDER BY posting_date
    """, as_dict=True)

    total_outstanding = 0
    today_date = getdate(nowdate())

    html = """
    <div style='max-height: 340px; overflow-y: auto; overflow-x: auto;'>
        <div style='min-width: 500px;'>
            <table class='table table-bordered' style='width: 100%; border-collapse: collapse;'>
                <thead>
                    <tr>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">S.No</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">Customer</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">Value</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">Age</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">Sales Invoice</th>
                    </tr>
                </thead>
                <tbody>
    """

    for idx, row in enumerate(data, 1):
        age = (today_date - getdate(row.posting_date)).days
        row_style = "color: red;" if age > 30 else ""
        name_style = "color: red;" if age > 30 else ""
        total_outstanding += row.outstanding_amount or 0

        html += f"""
            <tr style="{row_style}">
                <td style="text-align: center;">{idx}</td>
                <td style="white-space: nowrap;text-align: left;">{row.customer}</td>
                <td style='text-align:right;'>{fmt_money(row.outstanding_amount)}</td>
                <td style='text-align:right;'>{age}</td>
                <td style="white-space: nowrap;text-align: left;"><a href="/app/sales-invoice/{ row.name }" target="_blank" style="{name_style}">{ row.name }</a></td>
            </tr>
        """

    # Grand Total row
    html += f"""
        <tr style="background: #f0f0f0; font-weight: bold;">
            <td colspan="2" style="text-align: center;">Total</td>
            <td style="text-align: right;">{fmt_money(total_outstanding)}</td>
            <td></td>
            <td></td>
        </tr>
    """

    html += """
                </tbody>
            </table>
        </div>
    </div>
    """
    return html

@frappe.whitelist()
def rec_payable_table():
    from frappe.utils import today, getdate, nowdate
    from datetime import datetime
    from frappe.utils import today, getdate, nowdate, fmt_money
    # fiscal_year = frappe.db.get_value(
    #     "Fiscal Year",
    #     filters={"year_start_date": ["<=", today()], "year_end_date": [">=", today()]},
    #     fieldname=["year_start_date", "year_end_date"],
    #     as_dict=True
    # )
    # from_date = fiscal_year["year_start_date"]
    # to_date = fiscal_year["year_end_date"]

    # filters = {
    #     'from_date': from_date,
    #     'to_date': to_date
    # }

    # data = frappe.db.sql("""
    #     SELECT name, supplier, outstanding_amount, posting_date
    #     FROM `tabPurchase Invoice`
    #     WHERE docstatus = 1
    #       AND services="REC-I"
    #       AND posting_date BETWEEN %(from_date)s AND %(to_date)s
    #       AND outstanding_amount > 0
    #     ORDER BY posting_date
    # """, filters, as_dict=True)
    data = frappe.db.sql("""
        SELECT name, supplier, outstanding_amount, posting_date
        FROM `tabPurchase Invoice`
        WHERE docstatus = 1
          AND services="REC-I"
          AND outstanding_amount > 0
        ORDER BY posting_date
    """, as_dict=True)

    html = """
    <div style='max-height: 340px; overflow-y: auto; overflow-x: auto;'>
        <div style='min-width: 500px;'>
            <table class='table table-bordered' style='width: 100%; border-collapse: collapse;'>
                <thead>
                    <tr>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">S.No</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center; white-space: nowrap;">Supplier</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">Value</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">Age</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center; white-space: nowrap;">Purchase Invoice</th>
                    </tr>
                </thead>
                <tbody>
    """
    today_date = getdate(nowdate())
    total_outstanding = 0
    for idx, row in enumerate(data, 1):
        age = (today_date - getdate(row.posting_date)).days
        row_style = "color: red;" if age > 30 else ""  # Apply to whole row
        name_style = "color: red;" if age > 30 else ""
        total_outstanding += row.outstanding_amount or 0
        html += f"""
            <tr style="{row_style}">
            <td style="text-align: center;">{idx}</td>
                <td style="white-space: nowrap;text-align: left;">{row.supplier}</td>
                <td style='text-align:right;'>{frappe.utils.fmt_money(row.outstanding_amount)}</td>
                <td style='text-align:right;'>{age}</td>
                <td style="white-space: nowrap;text-align: left;"><a href="/app/purchase-invoice/{ row.name }" target="_blank" style="{name_style}">{ row.name }</a></td>
            </tr>
        """
    html += f"""
        <tr style="background: #f0f0f0; font-weight: bold;">
            <td colspan="2" style="text-align: center;">Total</td>
            <td style="text-align: right;">{fmt_money(total_outstanding)}</td>
            <td></td>
            <td></td>
        </tr>
    """

    html += """
                </tbody>
            </table>
        </div>
    </div>
    """
    return html

@frappe.whitelist()
def rec_tobill_table():
    from frappe.utils import today, getdate, nowdate
    from datetime import datetime
    from frappe.utils import today, getdate, nowdate, fmt_money
    from datetime import datetime
   
    data = frappe.db.sql("""
        SELECT name, customer, base_grand_total, transaction_date
        FROM `tabSales Order`
        WHERE docstatus = 1
          AND service='REC-I'
          AND status='To Bill'
          AND base_grand_total > 0
        ORDER BY transaction_date
    """, as_dict=True)
    html = """
    <div style='max-height: 340px; overflow-y: auto; overflow-x: auto;'>
        <div style='min-width: 500px;'>
            <table class='table table-bordered' style='width: 100%; border-collapse: collapse;'>
                <thead>
                    <tr>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">S.No</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center; white-space: nowrap;">Customer</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">Value</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center;">Age</th>
                        <th style="position: sticky; top: 0; background: #002060; color: white; text-align: center; white-space: nowrap;">Sales Order</th>
                    </tr>
                </thead>
                <tbody>
    """

    total_outstanding = 0
    today_date = getdate(nowdate())
    for idx, row in enumerate(data, 1):
        age = (today_date - getdate(row.transaction_date)).days
        row_style = "color: red;" if age > 30 else ""  # Apply to whole row
        name_style = "color: red;" if age > 30 else ""
        total_outstanding += row.base_grand_total or 0
        html += f"""
            <tr style="{row_style}">
                <td style="text-align: center;">{idx}</td>
                <td style="white-space: nowrap;text-align: left;">{row.customer}</td>
                <td style='text-align:right;'>{frappe.utils.fmt_money(row.base_grand_total)}</td>
                <td style='text-align:right;'>{age}</td>
                <td style="white-space: nowrap;text-align: left;"><a href="/app/sales-order/{ row.name }" target="_blank" style="{name_style}">{ row.name }</a></td>
            </tr>
        """
    html += f"""
        <tr style="background: #f0f0f0; font-weight: bold;">
            <td colspan="2" style="text-align: center;" >Total</td>
            <td style="text-align: right;">{fmt_money(total_outstanding)}</td>
            <td></td>
            <td></td>
        </tr>
    """

    html += """
                </tbody>
            </table>
        </div>
    </div>
    """
    return html

@frappe.whitelist()
def get_project_count():
    return frappe.db.count("Project", filters={
        "status": ["in", ["Open"]],
        "service": "REC-I"
    })
    
@frappe.whitelist()
def get_teampro_closure_count():
    return frappe.db.count("Closure",filters={"status":["in",["PSL","Emigration","Visa Stamping","Onboarding"]]})  
     
@frappe.whitelist()
def get_candidate_agent_closure_count():
    return frappe.db.count("Closure",filters={"status":["in",["Signed Offer Letter","Premedical","PCC","Final Medical"]]})  
     
@frappe.whitelist()
def get_client_closure_count():
    return frappe.db.count("Closure",filters={"status":["in",["Client Offer Letter","Visa","Ticket"]]})       

@frappe.whitelist()
def get_task_count():
    count = frappe.db.sql("""
        SELECT COUNT(*)
        FROM `tabTask` t
        JOIN `tabProject` p ON t.project = p.name
        WHERE p.service = 'REC-I'
          AND p.status IN ('Open')
          AND t.status IN('Open','Working','Overdue','Pending Review')
    """)[0][0] or 0
    return count


@frappe.whitelist()
def get_vacancy_count():
    total = frappe.db.sql("""
        SELECT SUM(t.vac)
        FROM `tabTask` t
        JOIN `tabProject` p ON t.project = p.name
        WHERE p.service = 'REC-I'
          AND p.status IN ('Open')
          AND t.status IN('Open','Working','Overdue','Pending Review')
    """)[0][0] or 0
    return total

@frappe.whitelist()
def get_sp_count():
   
    total = frappe.db.sql("""
        SELECT SUM(t.sp)
        FROM `tabTask` t
        JOIN `tabProject` p ON t.project = p.name
        WHERE p.service = 'REC-I'
          AND p.status IN ('Open')
          AND t.status IN('Open','Working','Overdue','Pending Review')
    """)[0][0] or 0
    return total

@frappe.whitelist()
def get_fp_count():
    
    total = frappe.db.sql("""
        SELECT SUM(t.fp)
        FROM `tabTask` t
        JOIN `tabProject` p ON t.project = p.name
        WHERE p.service = 'REC-I'
          AND p.status IN ('Open')
          AND t.status IN('Open','Working','Overdue','Pending Review')
    """)[0][0] or 0
    return total

@frappe.whitelist()
def get_sl_count():
    total = frappe.db.sql("""
        SELECT SUM(t.sl)
        FROM `tabTask` t
        JOIN `tabProject` p ON t.project = p.name
        WHERE p.service = 'REC-I'
          AND p.status IN ('Open')
          AND t.status IN('Open','Working','Overdue','Pending Review')
    """)[0][0] or 0
    return total

@frappe.whitelist()
def get_psl_count():
    total = frappe.db.sql("""
        SELECT SUM(t.psl)
        FROM `tabTask` t
        JOIN `tabProject` p ON t.project = p.name
        WHERE p.service = 'REC-I'
          AND p.status IN ('Open')
          AND t.status IN('Open','Working','Overdue','Pending Review')
    """)[0][0] or 0
    return total


@frappe.whitelist()
def get_territory_status_matrix():
    from datetime import datetime
    from collections import defaultdict
    settings = frappe.get_single("Closure Settings")
    tat_map = {}
    global_tat_map = {}
    for row in settings.closure_tat_days:
        if row.territory:
            tat_map[(row.status, row.territory)] = row.tat_days
        else:
            global_tat_map[row.status] = row.tat_days
    history_map = defaultdict(list)
    history_data = frappe.db.sql("""
        SELECT parent, status, date
        FROM `tabClosure Status History`
        ORDER BY parent, date DESC
    """, as_dict=True)

    for row in history_data:
        history_map[row.parent].append(row)
        if len(history_map[row.parent]) > 2:
            history_map[row.parent] = history_map[row.parent][:2]
    closures = frappe.get_all("Closure", fields=["name", "territory", "status"])
    matrix = {}

    for closure in closures:
        closure_id = closure.name
        territory = closure.territory
        status = closure.status
        history = history_map.get(closure_id, [])

        if not territory or not status:
            continue

        tat_days = tat_map.get((status, territory)) or global_tat_map.get(status)
        tat_crossed = False

        if tat_days and history:
            start_date_raw = history[1]["date"] if len(history) >= 2 else history[0]["date"]
            try:
                start_date = start_date_raw.date() if isinstance(start_date_raw, datetime) else \
                    datetime.strptime(str(start_date_raw), "%Y-%m-%d %H:%M:%S.%f").date()
            except ValueError:
                start_date = datetime.strptime(str(start_date_raw), "%Y-%m-%d %H:%M:%S").date()

            days_elapsed = (datetime.now().date() - start_date).days
            tat_crossed = days_elapsed > tat_days
        if territory not in matrix:
            matrix[territory] = {}
        if status not in matrix[territory]:
            matrix[territory][status] = {
                "count": 0,
                "crossed_ids": []
            }

        matrix[territory][status]["count"] += 1
        if tat_crossed:
            matrix[territory][status]["crossed_ids"].append(closure_id)
    result = []
    for territory, statuses in matrix.items():
        for status, data in statuses.items():
            result.append({
                "territory": territory,
                "status": status,
                "count": data["count"],
                "tat_crossed_count": len(data["crossed_ids"]),
                "closure_ids": data["crossed_ids"]
            })

    return result

@frappe.whitelist()
def get_project_details_for_territory(territory):
    from datetime import datetime
    from collections import defaultdict

    settings = frappe.get_single("Closure Settings")
    tat_map = {}
    global_tat_map = {}

    # Build territory-specific and global TAT maps
    for row in settings.closure_tat_days:
        if row.territory:
            tat_map[(row.status, row.territory)] = row.tat_days
        else:
            global_tat_map[row.status] = row.tat_days

    # Load closure history sorted by latest date
    history_map = defaultdict(list)
    history_data = frappe.db.sql("""
        SELECT parent, status, date
        FROM `tabClosure Status History`
        ORDER BY parent, date DESC
    """, as_dict=True)

    for row in history_data:
        history_map[row.parent].append(row)
        if len(history_map[row.parent]) > 2:
            history_map[row.parent] = history_map[row.parent][:2]

    # Load closures in that territory
    closures = frappe.get_all("Closure", 
        filters={"territory": territory},
        fields=["name", "status", "project"]
    )

    project_matrix = {}

    for closure in closures:
        closure_id = closure.name
        status = closure.status
        project = closure.project
        history = history_map.get(closure_id, [])

        if not status or not project:
            continue

        tat_days = tat_map.get((status, territory)) or global_tat_map.get(status)
        tat_crossed = False

        if tat_days and history:
            start_date_raw = history[1]["date"] if len(history) >= 2 else history[0]["date"]
            try:
                start_date = start_date_raw.date() if isinstance(start_date_raw, datetime) else \
                    datetime.strptime(str(start_date_raw), "%Y-%m-%d %H:%M:%S.%f").date()
            except ValueError:
                start_date = datetime.strptime(str(start_date_raw), "%Y-%m-%d %H:%M:%S").date()

            days_elapsed = (datetime.now().date() - start_date).days
            tat_crossed = days_elapsed > tat_days

        if project not in project_matrix:
            project_matrix[project] = {}
        if status not in project_matrix[project]:
            project_matrix[project][status] = {
                "count": 0,
                "crossed_ids": []
            }

        project_matrix[project][status]["count"] += 1
        if tat_crossed:
            project_matrix[project][status]["crossed_ids"].append(closure_id)

    # Load project names
    project_names = frappe._dict({
        row.name: row.project_name for row in frappe.get_all("Project", fields=["name", "project_name","customer"], order_by="customer ASC")
    })

    # Build output list
    result = []
    for project, statuses in project_matrix.items():
        for status, data in statuses.items():
            result.append({
                "project": project,
                "project_name": project_names.get(project, project),
                "status": status,
                "count": data["count"],
                "tat_crossed_count": len(data["crossed_ids"]),
                "closure_ids": data["crossed_ids"]
            })

    return result


@frappe.whitelist()
def get_candidates_tat_crossed_from_history():
    from datetime import datetime
    from frappe.utils import now_datetime

    target_statuses = ["Submit(SPOC)", "Submitted(Client)", "Interviewed"]

    closures = frappe.get_all("Candidate",
        filters={"pending_for": ["in", target_statuses]},
        fields=["name", "given_name", "pending_for", "project", "territory", "subject"]
    )

    project_map = {}

    for closure in closures:
        pending_for = closure.pending_for

        history = frappe.get_all("Candidate status",
            filters={"parent": closure.name, "status": pending_for},
            fields=["sourced_date"],
            order_by="sourced_date desc",
            limit=1
        )

        if history:
            start_date = history[0]["sourced_date"]
            if isinstance(start_date, str):
                start_date = datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S")

            days_pending = (now_datetime().date() - start_date.date()).days
            if days_pending > 10:
                project_id = closure.project or "No Project"
                project_name = frappe.db.get_value("Project", project_id, "project_name") if project_id and project_id != "No Project" else "No Project"
                subject = closure.subject or "-"
                territory = closure.territory or ""

                if project_name not in project_map:
                    project_map[project_name] = {
                        "territory": territory,
                        "status_map": []
                    }

                # Group by status + subject
                status_list = project_map[project_name]["status_map"]
                status_entry = next(
                    (s for s in status_list if s["status"] == pending_for and s["subject"] == subject),
                    None
                )

                candidate_data = {
                    "closure_id": closure.name,
                }

                if status_entry:
                    status_entry["count"] += 1
                    status_entry["candidates"].append(candidate_data)
                else:
                    status_list.append({
                        "status": pending_for,
                        "subject": subject,
                        "count": 1,
                        "candidates": [candidate_data]
                    })

    return project_map

@frappe.whitelist()
def get_planned_work_monitor_filter(start_date=None, end_date=None, executive=None, week_plan=None):
    import frappe
    from frappe.utils import getdate, add_days, formatdate
    if week_plan:
        parent_docs = frappe.get_doc("REC Week Plan",week_plan)
    else:
        parent_docs = frappe.get_all("REC Week Plan", filters={
            "start_date": ["<=", end_date],
            "end_date": [">=", start_date],
        }, fields=["name"])
        parent_docs = [frappe.get_doc("REC Week Plan", d.name) for d in parent_docs]
    # Parse dates
    start_date = getdate(start_date)
    end_date = getdate(end_date)
   
    # Generate date range
    date_list = []
    current = start_date
    while current <= end_date:
        date_list.append(current)
        current = add_days(current, 1)

    result = {}

    def init_task_entry(subject, project,project_name=None):
        return {
            "subject": subject,
            "project": project,
            "project_name": project_name,
            "dates": {str(d): {"rt": 0, "ac": 0} for d in date_list}
        }

    # Process allocation (RT)
    for parent_doc in parent_docs if isinstance(parent_docs, list) else [parent_docs]:
        for row in parent_doc.allocation:
            if not row.exe:
                continue
            row_date = getdate(row.date)
            if start_date <= row_date <= end_date and (not executive or row.exe == executive):
                result.setdefault(row.exe, {})
                task_map = result[row.exe]
                if row.task not in task_map:
                    project_name = frappe.db.get_value("Project", row.project, "project_name") if row.project else ""
                    task_map[row.task] = init_task_entry(row.subject, row.project, project_name)
                    # task_map[row.task] = init_task_entry(row.subject, row.project)
                task_map[row.task]["dates"][str(row_date)]["rt"] = row.rc or 0
                task_map[row.task]["dates"][str(row_date)]["ac"] += row.ac or 0

    # Process dsr (AC)
    for parent_doc in parent_docs if isinstance(parent_docs, list) else [parent_docs]:
        for row in parent_doc.dsr:
            if not row.exe:
                continue
            row_date = getdate(row.date)
            if start_date <= row_date <= end_date and (not executive or row.exe == executive):
                result.setdefault(row.exe, {})
                task_map = result[row.exe]
                if row.task not in task_map:
                    project_name = frappe.db.get_value("Project", row.project, "project_name") if row.project else ""
                    task_map[row.task] = init_task_entry(row.subject, row.project, project_name)

                    # task_map[row.task] = init_task_entry(row.subject, row.project)
                task_map[row.task]["dates"][str(row_date)]["ac"] += row.ac or 0
                task_map[row.task]["dates"][str(row_date)]["rt"] += row.rc or 0
    executive_meta = {}
    for exe in result.keys():
        emp = frappe.db.get_value("Employee", {"user_id": exe}, ["employee_name", "image"], as_dict=True)
        if emp:
            executive_meta[exe] = {
                "name": emp.employee_name,
                "image": emp.image
            }

    return {
        "date_headers": [formatdate(d, "d MMM") for d in date_list],
        "raw_dates": [str(d) for d in date_list],
        "data": result,
        "executive_meta": executive_meta
    }
    

@frappe.whitelist()
def get_planned_work_monitor(start_date=None, end_date=None, executive=None, week_plan=None):
    import frappe
    from frappe.utils import getdate, add_days, formatdate
    if week_plan:
        parent_doc = frappe.get_doc("REC Week Plan",week_plan)
    else:
        parent_doc = frappe.get_doc("REC Week Plan", {"workflow_state": "Planned"})
    # Parse dates
    start_date = getdate(start_date)
    end_date = getdate(end_date)
   
    # Generate date range
    date_list = []
    current = start_date
    while current <= end_date:
        date_list.append(current)
        current = add_days(current, 1)

    result = {}

    def init_task_entry(subject, project,project_name=None):
        return {
            "subject": subject,
            "project": project,
            "project_name": project_name,
            "dates": {str(d): {"rt": 0, "ac": 0} for d in date_list}
        }

    # Process allocation (RT)
    for row in parent_doc.allocation:
        row_date = getdate(row.date)
        if start_date <= row_date <= end_date and (not executive or row.exe == executive):
            result.setdefault(row.exe, {})
            task_map = result[row.exe]
            if row.task not in task_map:
                project_name = frappe.db.get_value("Project", row.project, "project_name") if row.project else ""
                task_map[row.task] = init_task_entry(row.subject, row.project, project_name)
                # task_map[row.task] = init_task_entry(row.subject, row.project)
            task_map[row.task]["dates"][str(row_date)]["rt"] = row.rc or 0
            task_map[row.task]["dates"][str(row_date)]["ac"] += row.ac or 0

    # Process dsr (AC)
    for row in parent_doc.dsr:
        row_date = getdate(row.date)
        if start_date <= row_date <= end_date and (not executive or row.exe == executive):
            result.setdefault(row.exe, {})
            task_map = result[row.exe]
            if row.task not in task_map:
                project_name = frappe.db.get_value("Project", row.project, "project_name") if row.project else ""
                task_map[row.task] = init_task_entry(row.subject, row.project, project_name)

                # task_map[row.task] = init_task_entry(row.subject, row.project)
            task_map[row.task]["dates"][str(row_date)]["ac"] += row.ac or 0
            task_map[row.task]["dates"][str(row_date)]["rt"] += row.rc or 0
    # Get Employee Names and Images
    executive_meta = {}
    for exe in result.keys():
        emp = frappe.db.get_value("Employee", {"user_id": exe}, ["employee_name", "image"], as_dict=True)
        if emp:
            executive_meta[exe] = {
                "name": emp.employee_name,
                "image": emp.image
            }

    return {
        "date_headers": [formatdate(d, "d MMM") for d in date_list],
        "raw_dates": [str(d) for d in date_list],
        "data": result,
        "executive_meta": executive_meta
    }


# import frappe
# from frappe.utils import flt
# from collections import defaultdict

# @frappe.whitelist()
# def get_payment_collection_details(from_date=None, to_date=None):
#     if not from_date and not to_date:
#         today = frappe.utils.today()
#         fiscal_year = frappe.db.get_value(
#             "Fiscal Year", 
#             filters={
#                 "year_start_date": ["<=", today], 
#                 "year_end_date": [">=", today]
#             },
#             fieldname=["year_start_date", "year_end_date"],
#             as_dict=True
#         )
#         if fiscal_year:
#             from_date = fiscal_year["year_start_date"]
#             to_date = fiscal_year["year_end_date"]

#     payment_entries = frappe.db.sql("""
#         SELECT per.allocated_amount, per.reference_name AS sales_invoice, pe.name AS payment_entry
#         FROM `tabPayment Entry Reference` per
#         INNER JOIN `tabPayment Entry` pe ON pe.name = per.parent
#         WHERE pe.docstatus = 1
#           AND per.reference_doctype = 'Sales Invoice'
#           AND pe.payment_type = 'Receive'
#           AND pe.posting_date BETWEEN %s AND %s
#     """, (from_date, to_date), as_dict=True)

#     grouped_data = defaultdict(lambda: {
#         "employee_code": "",
#         "employee_name": "",
#         "department": "",
#         "role": "",
#         "collection_value": 0.0,
#         "net_collection": 0.0
#     })

#     for ref in payment_entries:
#         si = frappe.get_doc("Sales Invoice", ref.sales_invoice)
#         if not si:
#             continue

#         participants = []

#         if si.get("account_manager"):
#             participants.append({"employee": si.account_manager, "role": "AM"})

#         if si.get("delivery_manager"):
#             participants.append({"employee": si.delivery_manager, "role": "DM"})

#         if si.get("services") == "REC-I":
#             for item in si.items:
#                 if item.get("candidate_owner"):
#                     participants.append({"employee": item.candidate_owner, "role": "CO"})

#         if not participants:
#             continue

#         has_tax = 1 if si.get("taxes") else 0
#         allocated = flt(ref.allocated_amount)

#         # Precompute net after tax
#         net_total = allocated / 1.18 if has_tax else allocated

#         for p in participants:
#             emp = frappe.db.get_value("Employee", {"user_id": p["employee"], "status": "Active"},
#                                     ["name", "employee_name", "department"],
#                                     as_dict=True)
#             if not emp:
#                 continue

#             key = (emp.name, p["role"])

#             # Default to total allocated amount
#             share = allocated
#             net_share = net_total

#             if p["role"] == "CO":
#                 # Sum amounts from items owned by this candidate_owner
#                 item_share = 0.0
#                 net_item_share = 0.0
#                 for item in si.items:
#                     if item.candidate_owner == p["employee"]:
#                         item_share += flt(item.amount)
#                         net_item_share += item_share / 1.18 if has_tax else item_share
#                 share = item_share
#                 net_share = net_item_share

#             grouped_data[key]["employee_code"] = emp.name
#             grouped_data[key]["employee_name"] = emp.employee_name
#             grouped_data[key]["department"] = emp.department
#             grouped_data[key]["role"] = p["role"]
#             grouped_data[key]["collection_value"] += round(share, 2)
#             grouped_data[key]["net_collection"] += round(net_share, 2)


#     return sorted(
#     grouped_data.values(),
#     key=lambda x: (
#         {"AM": 0, "DM": 1, "CO": 2}.get(x["role"], 99),
#         x["employee_name"].lower() if x["employee_name"] else ""
#     )
# )

import frappe
from frappe.utils import flt
from collections import defaultdict

@frappe.whitelist()
def get_payment_collection_details(from_date=None, to_date=None):
    if not from_date and not to_date:
        today = frappe.utils.today()
        fiscal_year = frappe.db.get_value(
            "Fiscal Year",
            filters={"year_start_date": ["<=", today], "year_end_date": [">=", today]},
            fieldname=["year_start_date", "year_end_date"],
            as_dict=True
        )
        if fiscal_year:
            from_date = fiscal_year["year_start_date"]
            to_date = fiscal_year["year_end_date"]

    payment_entries = frappe.db.sql("""
        SELECT per.allocated_amount, per.reference_name AS sales_invoice, pe.name AS payment_entry
        FROM `tabPayment Entry Reference` per
        INNER JOIN `tabPayment Entry` pe ON pe.name = per.parent
        WHERE pe.docstatus = 1
          AND per.reference_doctype = 'Sales Invoice'
          AND pe.payment_type = 'Receive'
          AND pe.posting_date BETWEEN %s AND %s
    """, (from_date, to_date), as_dict=True)

    grouped_data = defaultdict(lambda: {
        "employee_code": "",
        "employee_name": "",
        "department": "",
        "role": "",
        "collection_value": 0.0,
        "net_collection": 0.0
    })

    for ref in payment_entries:
        si = frappe.get_doc("Sales Invoice", ref.sales_invoice)
        if not si:
            continue

        allocated = flt(ref.allocated_amount)
        has_tax = 1 if si.get("taxes") else 0

        is_rec_i = si.services == "REC-I"
        candidate_owners = set()
        participants = []

        if is_rec_i:
            # Add candidate owners from items
            for item in si.items:
                if item.candidate_owner:
                    candidate_owners.add(item.candidate_owner)
                    participants.append({"employee": item.candidate_owner, "role": "CO"})

            # Add AM only if not in candidate_owners
            if si.account_manager and si.account_manager not in candidate_owners:
                participants.append({"employee": si.account_manager, "role": "AM"})

            # Add DM only if not in candidate_owners
            if si.delivery_manager and si.delivery_manager not in candidate_owners:
                participants.append({"employee": si.delivery_manager, "role": "DM"})
        else:
            # For non REC-I, include AM and DM directly
            if si.account_manager:
                participants.append({"employee": si.account_manager, "role": "AM"})
            if si.delivery_manager:
                participants.append({"employee": si.delivery_manager, "role": "DM"})

        if not participants:
            continue

        for p in participants:
            emp = frappe.db.get_value("Employee", {"user_id": p["employee"], "status": "Active"},
                                      ["name", "employee_name", "department"],
                                      as_dict=True)
            if not emp:
                continue

            key = (emp.name, p["role"])

            share = 0.0
            net_share = 0.0

            if is_rec_i:
                # Share per item if service is REC-I
                for item in si.items:
                    item_amount = flt(item.amount)
                    net_amount = item_amount / 1.18 if has_tax else item_amount

                    if p["role"] == "CO" and item.candidate_owner == p["employee"]:
                        share += item_amount
                        net_share += net_amount

                    elif p["role"] in ("AM", "DM"):
                        share += item_amount
                        net_share += net_amount
            else:
                # If not REC-I, full allocated goes to AM/DM
                share = allocated
                net_share = allocated / 1.18 if has_tax else allocated

            grouped_data[key]["employee_code"] = emp.name
            grouped_data[key]["employee_name"] = emp.employee_name
            grouped_data[key]["department"] = emp.department
            grouped_data[key]["role"] = p["role"]
            grouped_data[key]["collection_value"] += round(share, 2)
            grouped_data[key]["net_collection"] += round(net_share, 2)

    # Sort by role and then name
    return sorted(
        grouped_data.values(),
        key=lambda x: (
            {"AM": 0, "DM": 1, "CO": 2}.get(x["role"], 99),
            x["employee_name"].lower() if x["employee_name"] else ""
        )
    )


import frappe
import openpyxl
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from frappe.utils import today
from io import BytesIO
from .rec_i_dashboard import get_payment_collection_details

@frappe.whitelist()
def download_payment_excel(from_date=None, to_date=None):
    if not from_date or not to_date:
        today_date = today()
        fiscal = frappe.db.get_value("Fiscal Year", {
            "year_start_date": ["<=", today_date],
            "year_end_date": [">=", today_date]
        }, ["year_start_date", "year_end_date"], as_dict=True)
        if fiscal:
            from_date = fiscal.year_start_date
            to_date = fiscal.year_end_date

    data = get_payment_collection_details(from_date=from_date, to_date=to_date)

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Payment Collection"

    headers = ["S.No", "Employee Code", "Employee Name", "Department", "Role", "Collection Value", "Net Collection"]
    ws.append(headers)

    # Styles
    header_fill = PatternFill(start_color="FF1E0C6F", end_color="FF1E0C6F", fill_type="solid")  # Deep Blue
    header_font = Font(bold=True, color="FFFFFFFF")  # White text
    header_alignment = Alignment(horizontal="center", vertical="center")
    thin_border = Border(
        left=Side(style='thin'),
        right=Side(style='thin'),
        top=Side(style='thin'),
        bottom=Side(style='thin')
    )
    currency_format = u'₹#,##0.00'  # Indian currency format

    # Apply header styles
    for cell in ws[1]:
        cell.font = header_font
        cell.alignment = header_alignment
        cell.fill = header_fill
        cell.border = thin_border

    # Add data rows with S.No
    for idx, row_data in enumerate(data, start=1):
        row = [
            idx,
            row_data.get("employee_code"),
            row_data.get("employee_name"),
            row_data.get("department") or "-",
            row_data.get("role"),
            float(row_data.get("collection_value") or 0),
            float(row_data.get("net_collection") or 0)
        ]
        ws.append(row)

    # Apply border and currency format
    for row in ws.iter_rows(min_row=2, max_row=ws.max_row, min_col=1, max_col=7):
        for cell in row:
            cell.border = thin_border

        # Format collection columns
        row[5].number_format = currency_format  # Collection Value
        row[6].number_format = currency_format  # Net Collection

    # Auto-adjust column widths
    for column_cells in ws.columns:
        max_length = max(len(str(cell.value or "")) for cell in column_cells)
        ws.column_dimensions[column_cells[0].column_letter].width = max_length + 2

    # Return file to browser
    output = BytesIO()
    wb.save(output)
    output.seek(0)

    from frappe.utils import formatdate

    filename = f"Payment_Collection_{formatdate(from_date, 'dd-mm-yyyy')}_to_{formatdate(to_date, 'dd-mm-yyyy')}.xlsx"

    frappe.response['filename'] = filename
    frappe.response['filecontent'] = output.getvalue()
    frappe.response['type'] = 'binary'
    frappe.response['headers'] = {
        'Content-Disposition': f'attachment; filename={filename}',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }

# import frappe
# from frappe.utils import flt
# from openpyxl import Workbook
# from openpyxl.utils import get_column_letter
# from io import BytesIO
# from frappe import _

# @frappe.whitelist()
# def download_payment_details_excel(from_date=None, to_date=None):
#     frappe.response['filename'] = 'Payment Collection Details.xlsx'
#     frappe.response['type'] = 'binary'
#     frappe.response['filecontent'] = generate_payment_excel(from_date, to_date)

# def generate_payment_excel(from_date=None, to_date=None):
#     if not from_date and not to_date:
#         today = frappe.utils.today()
#         fiscal_year = frappe.db.get_value(
#             "Fiscal Year",
#             filters={"year_start_date": ["<=", today], "year_end_date": [">=", today]},
#             fieldname=["year_start_date", "year_end_date"],
#             as_dict=True
#         )
#         if fiscal_year:
#             from_date = fiscal_year["year_start_date"]
#             to_date = fiscal_year["year_end_date"]

#     payment_entries = frappe.db.sql("""
#         SELECT per.allocated_amount, per.reference_name AS sales_invoice, pe.name AS payment_entry
#         FROM `tabPayment Entry Reference` per
#         INNER JOIN `tabPayment Entry` pe ON pe.name = per.parent
#         WHERE pe.docstatus = 1
#           AND per.reference_doctype = 'Sales Invoice'
#           AND pe.payment_type = 'Receive'
#           AND pe.posting_date BETWEEN %s AND %s
#     """, (from_date, to_date), as_dict=True)

#     rows = []
#     for ref in payment_entries:
#         si = frappe.get_doc("Sales Invoice", ref.sales_invoice)
#         if not si:
#             continue

#         has_tax = 1 if si.get("taxes") else 0
#         allocated = flt(ref.allocated_amount)
#         net_total = allocated / 1.18 if has_tax else allocated

#         participants = []

#         if si.account_manager:
#             participants.append({"employee": si.account_manager, "role": "AM"})

#         if si.delivery_manager:
#             participants.append({"employee": si.delivery_manager, "role": "DM"})

#         if si.services == "REC-I":
#             for item in si.items:
#                 if item.candidate_owner:
#                     participants.append({"employee": item.candidate_owner, "role": "CO"})

#         if not participants:
#             continue

#         for p in participants:
#             emp = frappe.db.get_value("Employee", {"user_id": p["employee"], "status": "Active"},
#                                       ["name", "employee_name", "department"],
#                                       as_dict=True)
#             if not emp:
#                 continue

#             share = allocated
#             net_share = net_total

#             if p["role"] == "CO":
#                 item_share = 0.0
#                 net_item_share = 0.0
#                 for item in si.items:
#                     if item.candidate_owner == p["employee"]:
#                         amount = flt(item.amount)
#                         item_share += amount
#                         net_item_share += amount / 1.18 if has_tax else amount
#                 share = item_share
#                 net_share = net_item_share

#             rows.append({
#                 "payment_entry": ref.payment_entry,
#                 "sales_invoice": ref.sales_invoice,
#                 "allocated_amount": round(share, 2),
#                 "net_amount": round(net_share, 2),
#                 "employee_code": emp.name,
#                 "employee_name": emp.employee_name,
#                 "department": emp.department,
#                 "role": p["role"]
#             })

#     # Create Excel
#     wb = Workbook()
#     ws = wb.active
#     ws.title = "Payment Collection Details"

#     headers = [
#         "Payment Entry", "Sales Invoice", "Allocated Amount", "Net Amount",
#         "Employee Code", "Employee Name", "Department", "Role"
#     ]
#     ws.append(headers)

#     for row in rows:
#         ws.append([
#             row["payment_entry"],
#             row["sales_invoice"],
#             row["allocated_amount"],
#             row["net_amount"],
#             row["employee_code"],
#             row["employee_name"],
#             row["department"],
#             row["role"]
#         ])

#     # Formatting: Auto width
#     for col in ws.columns:
#         max_length = 0
#         column = get_column_letter(col[0].column)
#         for cell in col:
#             try:
#                 max_length = max(max_length, len(str(cell.value)))
#             except:
#                 pass
#         ws.column_dimensions[column].width = max_length + 2

#     # Return binary
#     output = BytesIO()
#     wb.save(output)
#     return output.getvalue()
from openpyxl.styles import PatternFill, Font, Alignment, Border, Side
from openpyxl import Workbook
from openpyxl.utils import get_column_letter
from io import BytesIO
import frappe
from frappe.utils import flt
from frappe import _

@frappe.whitelist()
def download_payment_details_excel(from_date=None, to_date=None):
    frappe.response['filename'] = 'Payment Collection Details.xlsx'
    frappe.response['type'] = 'binary'
    frappe.response['filecontent'] = generate_payment_excel(from_date, to_date)

def generate_payment_excel(from_date=None, to_date=None):
    if not from_date and not to_date:
        today = frappe.utils.today()
        fiscal_year = frappe.db.get_value(
            "Fiscal Year",
            filters={"year_start_date": ["<=", today], "year_end_date": [">=", today]},
            fieldname=["year_start_date", "year_end_date"],
            as_dict=True
        )
        if fiscal_year:
            from_date = fiscal_year["year_start_date"]
            to_date = fiscal_year["year_end_date"]

    payment_entries = frappe.db.sql("""
        SELECT per.allocated_amount, per.reference_name AS sales_invoice, pe.name AS payment_entry
        FROM `tabPayment Entry Reference` per
        INNER JOIN `tabPayment Entry` pe ON pe.name = per.parent
        WHERE pe.docstatus = 1
          AND per.reference_doctype = 'Sales Invoice'
          AND pe.payment_type = 'Receive'
          AND pe.posting_date BETWEEN %s AND %s
    """, (from_date, to_date), as_dict=True)

    rows = []

    for ref in payment_entries:
        si = frappe.get_doc("Sales Invoice", ref.sales_invoice)
        if not si:
            continue

        has_tax = 1 if si.get("taxes") else 0
        allocated_total = flt(ref.allocated_amount)
        net_total = allocated_total / 1.18 if has_tax else allocated_total

        candidate_owners = set()
        allocations = []

        if si.services == "REC-I":
            for item in si.items:
                item_amount = flt(item.amount)
                item_net = item_amount / 1.18 if has_tax else item_amount

                if item.candidate_owner:
                    candidate_owners.add(item.candidate_owner)
                    allocations.append({
                        "employee": item.candidate_owner,
                        "role": "CO",
                        "amount": item_amount,
                        "net_amount": item_net
                    })

                if si.account_manager and si.account_manager not in candidate_owners:
                    allocations.append({
                        "employee": si.account_manager,
                        "role": "AM",
                        "amount": item_amount,
                        "net_amount": item_net
                    })

                if si.delivery_manager and si.delivery_manager not in candidate_owners:
                    allocations.append({
                        "employee": si.delivery_manager,
                        "role": "DM",
                        "amount": item_amount,
                        "net_amount": item_net
                    })

        else:
            if si.account_manager:
                allocations.append({
                    "employee": si.account_manager,
                    "role": "AM",
                    "amount": allocated_total,
                    "net_amount": net_total
                })
            if si.delivery_manager:
                allocations.append({
                    "employee": si.delivery_manager,
                    "role": "DM",
                    "amount": allocated_total,
                    "net_amount": net_total
                })

        for alloc in allocations:
            emp = frappe.db.get_value("Employee", {"user_id": alloc["employee"], "status": "Active"},
                                      ["name", "employee_name", "department"], as_dict=True)
            if not emp:
                continue

            rows.append({
                "payment_entry": ref.payment_entry,
                "sales_invoice": ref.sales_invoice,
                "allocated_amount": round(alloc["amount"], 2),
                "net_amount": round(alloc["net_amount"], 2),
                "employee_code": emp.name,
                "employee_name": emp.employee_name,
                "department": emp.department,
                "role": alloc["role"]
            })

    # === Create Excel ===
    wb = Workbook()
    ws = wb.active
    ws.title = "Payment Collection Details"

    # === Styles ===
    header_fill = PatternFill(start_color="FF1E0C6F", end_color="FF1E0C6F", fill_type="solid")
    header_font = Font(bold=True, color="FFFFFFFF")
    header_alignment = Alignment(horizontal="center", vertical="center")
    thin_border = Border(
        left=Side(style='thin'),
        right=Side(style='thin'),
        top=Side(style='thin'),
        bottom=Side(style='thin')
    )
    currency_format = u'₹#,##0.00'

    # === Headers ===
    headers = [
        "S.No", "Payment Entry", "Sales Invoice","Employee Code", "Employee Name", "Department", "Role", "Allocated Amount", "Net Amount"
        
    ]
    ws.append(headers)

    # Apply styles to header
    for cell in ws[1]:
        cell.font = header_font
        cell.alignment = header_alignment
        cell.fill = header_fill
        cell.border = thin_border

    # === Data Rows ===
    for idx, row in enumerate(rows, start=1):
        ws.append([
            idx,
            row["payment_entry"],
            row["sales_invoice"],
            row["employee_code"],
            row["employee_name"],
             row["department"],
            row["role"],
            row["allocated_amount"],
            row["net_amount"],
        ])

    # === Apply currency format and borders ===
    for row in ws.iter_rows(min_row=2, min_col=1, max_col=9):
        for cell in row:
            cell.border = thin_border
        row[3].number_format = currency_format  # Allocated Amount
        row[4].number_format = currency_format  # Net Amount

    # Auto column width
    for col in ws.columns:
        max_length = 0
        column = get_column_letter(col[0].column)
        for cell in col:
            try:
                max_length = max(max_length, len(str(cell.value or "")))
            except:
                pass
        ws.column_dimensions[column].width = max_length + 2

    output = BytesIO()
    wb.save(output)
    return output.getvalue()


@frappe.whitelist()
def get_rec_live_status():
    date = nowdate()
    rows = frappe.db.sql("""
        SELECT 
            recruiter,
            position,
            status,
            cnt
        FROM (
            SELECT 
                c.candidate_created_by AS recruiter,
                c.position,
                cs.status,
                COUNT(DISTINCT c.name) AS cnt,
                ROW_NUMBER() OVER (PARTITION BY c.name ORDER BY cs.sourced_date DESC) AS rn
            FROM `tabCandidate` c
            INNER JOIN `tabCandidate status` cs ON cs.parent = c.name
            WHERE c.candidate_created_by IS NOT NULL
            AND c.position IS NOT NULL
            AND DATE(cs.sourced_date) = %s
            GROUP BY c.name, c.candidate_created_by, c.position, cs.status, cs.sourced_date
        ) t
        WHERE rn = 1
        ORDER BY recruiter
    """, (date,), as_dict=True)

    data = {}
    for r in rows:
        recruiter = r.recruiter or "Unassigned"
        if recruiter not in data:
            data[recruiter] = {
                "tasks": [],
                "idb": 0,
                "source": 0,
                "qc": 0,
                "spoc": 0
            }

        task = next((t for t in data[recruiter]["tasks"] if t["position"] == r.position), None)
        if not task:
            task = {
                "position": r.position,
                "idb": 0,
                "source": 0,
                "qc": 0,
                "spoc": 0
            }
            data[recruiter]["tasks"].append(task)

        if r.status == "IDB":
            data[recruiter]["idb"] += r.cnt
            task["idb"] += r.cnt
        elif r.status == "Sourced":
            data[recruiter]["source"] += r.cnt
            task["source"] += r.cnt
        elif r.status == "Pending QC":
            data[recruiter]["qc"] += r.cnt
            task["qc"] += r.cnt
        elif r.status == "Submit(SPOC)":
            data[recruiter]["spoc"] += r.cnt
            task["spoc"] += r.cnt

    for rec in data:
        data[rec]["positions_count"] = len({t["position"] for t in data[rec]["tasks"]})

    return {"data": data}



# @frappe.whitelist()
# def get_current_status_counts(executive, project, task=None, date=None):
#     import frappe
#     from frappe.utils import getdate

#     date = getdate(date) if date else getdate()
#     current_statuses = ["IDB", "Sourced", "Pending QC", "Submit(SPOC)"]
#     counts = {}

#     task_condition = "AND cs.task = %s" if task else ""
#     task_value = (task,) if task else ()
#     for status in current_statuses:
#         if status == "Submit(SPOC)":
#             query = f"""
#                 SELECT DISTINCT c.name
#                 FROM `tabCandidate` c
#                 INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
#                 WHERE c.candidate_created_by = %s
#                 AND cs.project = %s
#                 AND cs.status = %s
#                 {task_condition}
#                 AND DATE(cs.sourced_date) = %s
#             """
#             params = (executive, project, status) + task_value + (date,)
#         else:
#             query = f"""
#                 SELECT DISTINCT c.name
#                 FROM `tabCandidate` c
#                 INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
#                 WHERE c.candidate_created_by = %s
#                 AND c.pending_for = %s
#                 {task_condition}
#                 AND DATE(cs.sourced_date) = %s
#             """
#             params = (executive, status) + task_value + (date,)

#         ppl = frappe.db.sql(query, params, as_dict=True)
#         counts[status] = len(ppl)

#     extra_query = f"""
#         SELECT DISTINCT c.name, cs.project, cs.task, cs.status
#         FROM `tabCandidate` c
#         INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
#         WHERE c.candidate_created_by = %s
#         {task_condition}
#         AND DATE(cs.sourced_date) = %s
#         AND cs.status NOT IN %s
#     """
#     extra_params = (executive,) + task_value + (date, tuple(current_statuses))
#     extra_candidates = frappe.db.sql(extra_query, extra_params, as_dict=True)

#     info_query = f"""
#         SELECT DISTINCT cs.project, cs.task
#         FROM `tabCandidate` c
#         INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
#         WHERE c.candidate_created_by = %s
#         {task_condition}
#         AND DATE(cs.sourced_date) = %s
#     """
#     info_params = (executive,) + task_value + (date,)
#     project_task_info = frappe.db.sql(info_query, info_params, as_dict=True)

#     return {
#         "counts": counts,
#         "extra_candidates": extra_candidates,
#         "project_task_info": project_task_info
#     }


import frappe
from openpyxl import Workbook
from openpyxl.styles import PatternFill, Font, Border, Side, Alignment
from openpyxl.utils import get_column_letter
from datetime import datetime
from collections import defaultdict
from io import BytesIO
import base64

@frappe.whitelist()
def download_closure_matrix_with_projects():
    settings = frappe.get_single("Closure Settings")

    tat_map, global_tat_map = {}, {}
    for row in settings.closure_tat_days:
        if row.territory:
            tat_map[(row.status, row.territory)] = row.tat_days
        else:
            global_tat_map[row.status] = row.tat_days

    history_map = defaultdict(list)
    history_data = frappe.db.sql("""
        SELECT parent, status, date
        FROM `tabClosure Status History`
        ORDER BY parent, date DESC
    """, as_dict=True)
    for row in history_data:
        history_map[row.parent].append(row)
        if len(history_map[row.parent]) > 2:
            history_map[row.parent] = history_map[row.parent][:2]

    closures = frappe.get_all("Closure", fields=["name", "territory", "status", "project"])

    project_names = frappe._dict({
        row.name: row.project_name for row in frappe.get_all("Project", fields=["name", "project_name"])
    })

    statuses = [
        "PSL", "Waitlisted", "Sales Order", "Client Offer Letter", "Signed Offer Letter",
        "Visa", "Premedical", "PCC", "Certificate Attestation", "Trade Test", "Final Medical",
        "Biometric", "Visa Stamping", "Emigration", "Ticket", "Onboarding", "Onboarded"
    ]

    territory_matrix = defaultdict(lambda: defaultdict(lambda: {"count": 0, "crossed_count": 0}))
    project_matrix = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: {"count": 0, "crossed_count": 0})))

    for closure in closures:
        territory, status, project, closure_id = closure.territory, closure.status, closure.project, closure.name
        if not territory or not status:
            continue

        history = history_map.get(closure_id, [])
        tat_days = tat_map.get((status, territory)) or global_tat_map.get(status)
        tat_crossed = False

        if tat_days and history:
            start_date_raw = history[1]["date"] if len(history) >= 2 else history[0]["date"]
            try:
                start_date = start_date_raw.date() if isinstance(start_date_raw, datetime) else datetime.strptime(str(start_date_raw), "%Y-%m-%d %H:%M:%S.%f").date()
            except ValueError:
                start_date = datetime.strptime(str(start_date_raw), "%Y-%m-%d %H:%M:%S").date()
            tat_crossed = (datetime.now().date() - start_date).days > tat_days

        territory_matrix[territory][status]["count"] += 1
        if tat_crossed:
            territory_matrix[territory][status]["crossed_count"] += 1

        if project:
            project_matrix[territory][project][status]["count"] += 1
            if tat_crossed:
                project_matrix[territory][project][status]["crossed_count"] += 1

    wb = Workbook()
    ws = wb.active
    ws.title = "Closure Matrix"

    header_fill = PatternFill(start_color="002060", end_color="002060", fill_type="solid")
    territory_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")  # Entire territory row color
    project_fill = PatternFill(start_color="F1F9FF", end_color="F1F9FF", fill_type="solid")
    red_font = Font(color="FF0000")
    bold_font = Font(bold=True)
    border = Border(
        left=Side(style='thin'),
        right=Side(style='thin'),
        top=Side(style='thin'),
        bottom=Side(style='thin')
    )
    center_align = Alignment(horizontal="center", vertical="center")

    headers = ["Territory/Project"] + statuses + ["Total"]
    ws.append(headers)
    for col in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col)
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = header_fill
        cell.border = border
        cell.alignment = center_align

    for territory, statuses_map in territory_matrix.items():
        terr_total = sum([statuses_map[st]["count"] for st in statuses])
        if terr_total == 0:
            continue

        terr_row = [territory]
        for st in statuses:
            count = statuses_map[st]["count"]
            crossed = statuses_map[st]["crossed_count"]
            if count == 0:
                terr_row.append("0")
            elif crossed > 0:
                terr_row.append(f"{count}/{crossed}")
            else:
                terr_row.append(f"{count}")
        terr_row.append(terr_total)
        ws.append(terr_row)

        for col_idx in range(1, len(headers)+1):
            cell = ws.cell(row=ws.max_row, column=col_idx)
            cell.border = border
            cell.fill = territory_fill
            if col_idx == 1:
                cell.alignment = Alignment(horizontal="left")
            else:
                cell.alignment = center_align
            if col_idx >= 2 and col_idx <= len(statuses)+1 and statuses_map[statuses[col_idx-2]]["crossed_count"] > 0:
                cell.font = red_font

        for project, proj_statuses in project_matrix[territory].items():
            proj_total = sum([proj_statuses[st]["count"] for st in statuses])
            if proj_total == 0:
                continue
            proj_row = [f"   ↳ {project_names.get(project, project)}"]
            for st in statuses:
                count = proj_statuses[st]["count"]
                crossed = proj_statuses[st]["crossed_count"]
                if count == 0:
                    proj_row.append("0")
                elif crossed > 0:
                    proj_row.append(f"{count}/{crossed}")
                else:
                    proj_row.append(f"{count}")
            proj_row.append(proj_total)
            ws.append(proj_row)
            for col_idx in range(1, len(headers)+1):
                cell = ws.cell(row=ws.max_row, column=col_idx)
                cell.fill = project_fill
                cell.border = border
                if col_idx == 1:
                    cell.alignment = Alignment(horizontal="left")
                else:
                    cell.alignment = center_align
                if col_idx >= 2 and col_idx <= len(statuses)+1 and proj_statuses[statuses[col_idx-2]]["crossed_count"] > 0:
                    cell.font = red_font

    grand_row = ["Grand Total"]
    for st in statuses:
        total_count = sum(territory_matrix[territory][st]["count"] for territory in territory_matrix)
        grand_row.append(total_count)
    grand_row.append(sum([cell for cell in grand_row[1:]]))  
    ws.append(grand_row)
    for col_idx in range(1, len(headers) + 1):
        cell = ws.cell(row=ws.max_row, column=col_idx)
        cell.font = bold_font
        cell.border = border
        if col_idx == 1:
            cell.alignment = Alignment(horizontal="left")
        else:
            cell.alignment = center_align

    for col in ws.columns:
        max_len = 0
        col_letter = get_column_letter(col[0].column)
        for cell in col:
            try:
                if cell.value and len(str(cell.value)) > max_len:
                    max_len = len(str(cell.value))
            except:
                pass
        ws.column_dimensions[col_letter].width = max_len + 2

    output = BytesIO()
    wb.save(output)
    output.seek(0)
    return base64.b64encode(output.read()).decode("utf-8")

@frappe.whitelist()
def get_current_status_counts(executive, project=None, task=None, date=None):
    import frappe
    from frappe.utils import getdate

    date = getdate(date) if date else getdate()
    current_statuses = ["IDB", "Sourced", "Pending QC", "Submit(SPOC)"]
    counts = {}

    task_condition = "AND cs.task = %s" if task else ""
    task_value = (task,) if task else ()

    # 🔹 Project/Task-specific counts
    for status in current_statuses:
        if status == "IDB":
            query = f"""
                SELECT DISTINCT c.name
                FROM `tabCandidate` c
                INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
                WHERE c.candidate_created_by = %s
                AND cs.project = %s
                AND cs.status = 'IDB'
                AND c.pending_for = 'IDB'
                {task_condition}
                AND DATE(cs.sourced_date) = %s
            """
            params = (executive, project) + task_value + (date,)
        elif status == "Submit(SPOC)":
            query = f"""
                SELECT DISTINCT c.name
                FROM `tabCandidate` c
                INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
                WHERE c.candidate_created_by = %s
                AND cs.project = %s
                AND cs.status = %s
                {task_condition}
                AND DATE(cs.sourced_date) = %s
            """
            params = (executive, project, status) + task_value + (date,)
        else:
            query = f"""
                SELECT DISTINCT c.name
                FROM `tabCandidate` c
                INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
                WHERE c.candidate_created_by = %s
                AND c.pending_for = %s
                {task_condition}
                AND DATE(cs.sourced_date) = %s
            """
            params = (executive, status) + task_value + (date,)

        ppl = frappe.db.sql(query, params, as_dict=True)
        counts[status] = len(ppl)

    # 🔹 Extra candidates (outside current_statuses)
    extra_query = f"""
        SELECT DISTINCT c.name, cs.project, cs.task, cs.status
        FROM `tabCandidate` c
        INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
        WHERE c.candidate_created_by = %s
        {task_condition}
        AND DATE(cs.sourced_date) = %s
        AND cs.status NOT IN %s
    """
    extra_params = (executive,) + task_value + (date, tuple(current_statuses))
    extra_candidates = frappe.db.sql(extra_query, extra_params, as_dict=True)

    # 🔹 Project/Task info
    info_query = f"""
        SELECT DISTINCT cs.project, cs.task
        FROM `tabCandidate` c
        INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
        WHERE c.candidate_created_by = %s
        {task_condition}
        AND DATE(cs.sourced_date) = %s
    """
    info_params = (executive,) + task_value + (date,)
    project_task_info = frappe.db.sql(info_query, info_params, as_dict=True)

    # 🔹 Executive-only counts
    task_candidates = frappe.db.sql(f"""
        SELECT DISTINCT c.name
        FROM `tabCandidate` c
        INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
        WHERE c.candidate_created_by = %s
        AND cs.project = %s
    """, (executive, project), as_dict=True) if project else []

    task_candidate_names = [d.name for d in task_candidates]

    executive_only_counts = {}
    executive_idb_only = 0

    for status in current_statuses:
        if status == "IDB":
            # Executive-only IDB
            q = """
                SELECT COUNT(DISTINCT c.name) AS cnt
                FROM `tabCandidate` c
                INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
                WHERE c.candidate_created_by = %s
                AND DATE(cs.sourced_date) = %s
                AND cs.status = 'IDB'
                AND c.pending_for = 'IDB'
                AND DATE(c.creation) BETWEEN %s AND %s
            """
            params = [executive, date,date,date]
            if task_candidate_names:
                q += " AND c.name NOT IN %s"
                params.append(tuple(task_candidate_names))

            row = frappe.db.sql(q, params, as_dict=True)
            executive_idb_only = row[0].cnt if row else 0
        else:
            # Executive-only for other statuses
            q = """
                SELECT COUNT(DISTINCT c.name) AS cnt
                FROM `tabCandidate` c
                INNER JOIN `tabCandidate status` cs ON c.name = cs.parent
                WHERE c.candidate_created_by = %s
                AND DATE(cs.sourced_date) = %s
                AND cs.status = %s
            """
            params = [executive, date, status]
            if task_candidate_names:
                q += " AND c.name NOT IN %s"
                params.append(tuple(task_candidate_names))

            row = frappe.db.sql(q, params, as_dict=True)
            executive_only_counts[status] = row[0].cnt if row else 0

    return {
        "counts": counts,                      # project/task-based
        "extra_candidates": extra_candidates,  # statuses outside list
        "project_task_info": project_task_info,
        "executive_only_counts": executive_only_counts,  # other statuses
        "executive_idb_only": executive_idb_only        # separate IDB count
    }
