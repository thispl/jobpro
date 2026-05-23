frappe.pages['candidate-dashboard'].on_page_load = function (wrapper) {

    
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: '',
        single_column: true
    });

    
    const style = document.createElement('style');
    style.innerHTML = `
    .dashboard-cards-finaince {
		padding: 15px;
	border-radius: 12px;
	color: white;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	text-align: center;
	font-size: 18px;
	font-weight: bold;
	min-width: 150px;
	flex-shrink: 0;
	}
	.dashboard-card {
		width: 165px;
		border-radius: 12px;
		padding: 10px;
		text-align: center;
		flex-shrink: 0;
	}
	.card-inner {
		background-color: white;
		padding: 20px 10px;
		border-radius: 8px;
		box-shadow: 0 2px 5px rgba(0,0,0,0.1);
	}
	.card-inner h3 {
		margin: 0;
		font-size: 17px;
		font-weight: bold;
		color: #222;
		text-align: center;
		white-space: normal;
	}
	.card-inner .amount {
		font-size: 22px;
		font-weight: bold;
		color: green;
		margin-top: 10px;
		text-align: center;
	}
      .monitor-toggle-card.selected-card {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	transform: scale(1.05);
	transition: all 0.2s ease-in-out;
	background-color: #000000 !important;  /* black background */
	color: #ffffff !important;             /* white text */
	border-color: #000000 !important;      /* match border */
	font-weight: bold;
}
        .candidate-table {
            border-collapse: collapse;
            width: 100%;
        }
        .candidate-table th, .candidate-table td {
            border: 1px solid black;
            padding: 8px;
        }
        th {
            background-color: #0F1568 !important;
			text-align:center;
            color: white !important;
            position: sticky;
            top: 0;
            z-index: 2;
        }
            .customer-header {
                background: #0F1568 !important;
            }

            /* Project Header */
            .project-header {
                background: #4682B4 !important;
            }

            /* Task Header */
            .task-header {
                background: #4682B4 !important;
            }

            /* Summary Main Header */
            .summary-main-header {
                background: #c7d2fe !important;
            }

            /* Summary Sub Header */
            .summary-sub-header {
                background: #e0e7ff !important;
            }

            /* Column Colors */
            .col-src { background:#fee2e2 !important; }
            .col-pq { background:#fef3c7 !important; }
            .col-spoc { background:#dbeafe !important; }
            .col-client { background:#dcfce7 !important; }
            .col-interview { background:#ede9fe !important; }
            .col-reported { background:#cffafe !important; }
            .col-result { background:#fce7f3 !important; }
            .col-lp { background:#fde68a !important; }
            .col-lpc { background:#bae6fd !important; }
            .col-sl { background:#bbf7d0 !important; }
.col-psl { background:#fecaca !important; }
        
    `;
    document.head.appendChild(style);

    
    $(wrapper).html(`
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <div class="dashboard-wrapper" style="margin-bottom:30px;">
            <div style="position: relative; padding: 10px;">
                <h2 style="text-align: center; font-weight: bold; margin: 0;">CANDIDATE DASHBOARD</h2>
                <div id="current-datetime" style="font-size: 16px; color: #666; text-align: center; margin-top: 5px;"></div>
            </div>
        </div>
        <!-- <div id="rec-i-metrics-cards" style="display: flex; gap: 10px; margin: 45px 45px 0;overflow-x: auto; flex-wrap: nowrap;background-color: #f5f5f5;border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-sizing: border-box;">
            <div class="dashboard-card project-count-card" style="background-color: #007BFF;"></div>
            <div class="dashboard-card task-count-card" style="background-color: #6C757D;"></div>
            
            <div class="dashboard-card sp-count-card" style="background-color: #28A745;"></div>
            <div class="dashboard-card fp-count-card" style="background-color: #FFC107;"></div>
            <div class="dashboard-card sl-count-card" style="background-color: #FD7E14;"></div>
            <div class="dashboard-card ip-card" style="background-color: #6C757D;"></div>
            <div class="dashboard-card fp-card" style="background-color: #FFC107;"></div>
            <div class="dashboard-card sl-card" style="background-color: #FD7E14;"></div>
            <div class="dashboard-card psl-card" style="background-color: #DC3545;"></div>
        </div> -->
        <div id="rec-i-metrics-cards" style="margin:45px 45px 0;">

            <!-- On Count -->
            <div style="display:flex; align-items:center; gap:20px; background:#f5f5f5;
                        border:1px solid #ddd; border-radius:8px; padding:10px; margin-bottom:10px;">

                <div style="min-width:140px; font-weight:bold; font-size:16px;">
                    Task
                </div>

                <div style="display:flex; gap:10px; overflow-x:auto;">
                    <div class="dashboard-card project-count-card" style="background-color:#007BFF;"></div>
                    <div class="dashboard-card task-count-card" style="background-color:#6C757D;"></div>
                    <div class="dashboard-card sp-count-card" style="background-color:#28A745;"></div>
                    <div class="dashboard-card fp-count-card" style="background-color:#FFC107;"></div>
                    <div class="dashboard-card sl-count-card" style="background-color:#FD7E14;"></div>
                </div>

            </div>


            <!-- On Candidate -->
            <div style="display:flex; align-items:center; gap:20px; background:#f5f5f5;
                        border:1px solid #ddd; border-radius:8px; padding:10px;">

                <div style="min-width:140px; font-weight:bold; font-size:16px;">
                    Candidate
                </div>

                <div style="display:flex; gap:10px; overflow-x:auto;">
                    <div class="dashboard-card ip-card" style="background-color:#6C757D;"></div>
                    <div class="dashboard-card fp-card" style="background-color:#FFC107;"></div>
                    <div class="dashboard-card sl-card" style="background-color:#FD7E14;"></div>
                    <div class="dashboard-card psl-card" style="background-color:#DC3545;"></div>
                </div>

            </div>

        </div>
        <br>
        
        <div id="summary-container" 
     style="min-height:50px; background-color:#f5f5f5; margin:0px 50px 50px; padding:10px;">

    <div style="display:flex;align-items:center;">
        
        <h4 style="margin:0;">
            <b>Candidate Project Summary (Task / Candidate)</b>
        </h4>

        <button id="task-view" class="btn btn-primary" 
            style="background-color:#1E3A8A; border-color:#334155; margin-right:20px;margin-left:400px;">
            Task View
        </button>

        <button id="can-view" class="btn btn-primary" 
            style="background-color:#0F766E; border-color:#334155; margin-right:20px;">
            Candidate View
        </button>

        <button id="download-excel" class="btn btn-primary">
            Download
        </button>

    </div>

</div>

        

<!-- Candidate Table -->	


        <!-- <div class="candidate-table-div " style="min-height:50px; background-color:#f5f5f5; margin:0px 50px 50px; padding:10px;">


				<h4><b>Candidate</b></h4>

				


				<div id="candidate-table-container"></div>

	</div> -->




<!-- Active -->



	<!-- <div class="active-client-table-div" style="min-height:50px; background-color:#f5f5f5; margin:50px; padding:10px;">


				<h4><b>Active Client</b></h4>

				


				<div id="active-client-table-container"></div>

	</div> -->


<!-- In Active -->


	<!-- <div class="inactive-client-table-div" style="min-height:50px; background-color:#f5f5f5; margin:50px; padding:10px;">


				<h4><b>Inactive Client</b></h4>

				


				<div id="inactive-client-table-container"></div>

	</div> -->


    `);

    load_customers();
    frappe.call({
	method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_project_count",
	callback: r => renderSimpleCard('.project-count-card', '#Project', r.message || 0)
	});
    frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_task_count",
		callback: r => renderSimpleCard('.task-count-card', '#Task', r.message || 0)
	});
    frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_task_sp_count",
		callback: r => renderSimpleCard('.sp-count-card', '#SP', r.message || 0)
	});

	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_task_fp_count",
		callback: r => renderSimpleCard('.fp-count-card', '#FP', r.message || 0)
	});

	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_task_spfp_count",
		callback: r => renderSimpleCard('.sl-count-card', '#SP/FP', r.message || 0)
	});
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_canidate_ip_count",
		callback: r => renderSimpleCard('.ip-card', '#IP', r.message || 0)
	});
    frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_canidate_fp_count",
		callback: r => renderSimpleCard('.fp-card', '#FP', r.message || 0)
	});
    frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_canidate_sl_count",
		callback: r => renderSimpleCard('.sl-card', '#SL', r.message || 0)
	});
    frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_canidate_psl_count",
		callback: r => renderSimpleCard('.psl-card', '#PSL', r.message || 0)
	});
    function renderSimpleCard(selector, label, value, color = 'green') {
	$(wrapper).find(selector).html(`
		<div class="card-inner">
			<h3>${label}</h3>
			<div class="amount" style="color: ${color}">${value}</div>
		</div>
	`);
}

    function load_customers() {

        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_customers_from_candidate",
            callback: function(r) {

                let html = `
                    <style>
                        .toggle-btn {
                            cursor: pointer;
                            font-weight: bold;
                            color: #ffffff;
                            margin-right: 8px;
                            font-size: 16px;
                        }
                            .data-row:nth-child(odd) {
                                background-color: #f2f6fc;  /* light blue */
                            }

                            .data-row:nth-child(even) {
                                background-color: #e2e8f0;  /* light grey */
                            }
                        /* Customer Header */
                            .customer-header {
                                background-color: #0F1568;
                                color: white;
                                font-weight: bold;
                            }

                            /* Project Header */
                            .project-header {
                                background-color: #1E3A8A;
                                color: white;
                                font-weight: bold;
                            }

                            /* Task Header */
                            .task-header {
                                background-color: #334155;
                                color: white;
                                font-weight: bold;
                            }

                            /* Summary Main Header */
                            .summary-main-header {
                                background-color: #0ea5e9;
                                color: white;
                                font-weight: bold;
                            }

                            /* Summary Sub Header */
                            .summary-sub-header {
                                background-color: #38bdf8;
                                color: white;
                                font-weight: bold;
                            }

                            /* Column Colors */
                            .col-src { background-color: #fef3c7; }
                            .col-pq { background-color: #fde68a; }
                            .col-spoc { background-color: #fca5a5; }
                            .col-client { background-color: #fdba74; }
                            .col-interview { background-color: #bbf7d0; }
                            .col-reported { background-color: #86efac; }
                            .col-result { background-color: #93c5fd; }
                            .col-lp { background-color: #c4b5fd; }
                            .col-lpc { background-color: #f9a8d4; }
                            .col-sl { background-color: #e9d5ff; }
                            .col-psl { background-color: #fecaca; }
                    </style>

                    <div style="max-height:500px; overflow-y:auto; border:1px solid #ddd;">

                        <!-- Header Row -->
                        <div style="display:flex; align-items:center; padding:10px;">
                            
                            <h4 style="margin:0;">
                                <b>Candidate Project Summary (Task / Candidate)</b>
                            </h4>
                            <button id="task-view" class="btn btn-primary" 
                                style="background-color:#1E3A8A; border-color:#334155; margin-right:20px;margin-left:400px;">
                                Task View
                            </button>

                            <button id="can-view" class="btn btn-primary" 
                                style="background-color:#0F766E; border-color:#334155; margin-right:20px;">
                                Candidate View
                            </button>

                            <button id="download-excel" class="btn btn-primary">
                                Download
                            </button>

                        </div>
                        
                        <table class="table table-bordered">
                            <thead class="customer-header">
                                <tr>
                                    <td style="width:60px;text-align:center;border:1px solid black;">S.No</td>
                                    <td style="text-align:center;border:1px solid black;">Customer / Project</td>
                                    <td style="text-align:center;border:1px solid black;">VAC</td>
                                    <td style="text-align:center;border:1px solid black;">SP</td>
                                    <td style="text-align:center;border:1px solid black;">FP</td>
                                    <td style="text-align:center;border:1px solid black;">SL</td>
                                    <td style="text-align:center;border:1px solid black;">LP</td>
                                    <td style="text-align:center;border:1px solid black;">SPOC Remarks</td>
                                </tr>
                            </thead>
                            <tbody>
                
                            `;
                function showValue(val) {
                    return val && val !== 0 ? val : "-";
                }
                r.message.forEach((row, index) => {
                    
                    let key = btoa(row.customer).replace(/=/g, "");
                    let rowColor = index % 2 === 0 
                        ? "#85819e" 
                        : "#85819e";

                    html += `
                    
                        <tr class="data-row" style="background-color:${rowColor}; color: white;">
                            <td style="border:1px solid black;">${index + 1}</td>

                            <td style="border:1px solid black;">
                                <span class="toggle-btn"
                                    data-client="${key}"
                                    data-customer="${row.customer}">
                                    +
                                </span>
                                ${row.customer}
                            </td>

                            <td style="border:1px solid black; text-align:center;">${showValue(row.vao)}</td>
                            <td style="border:1px solid black; text-align:center;">${showValue(row.sp)}</td>
                            <td style="border:1px solid black; text-align:center;">${showValue(row.fp)}</td>
                            <td style="border:1px solid black; text-align:center;">${showValue(row.sl)}</td>
                            <td style="border:1px solid black; text-align:center;">${showValue(row.lp)}</td>
                            <td style="border:1px solid black; text-align:center;"></td>
                        </tr>
                    
                    `;
                });

                html += `</tbody></table></div>`;

                $("#summary-container").html(html);
            }
        });
    }
    $("#summary-container").on("click", ".toggle-btn", function () {

        let btn = $(this);
        let key = btn.data("client");
        let customer = btn.data("customer");

        if ($(".project-of-" + key).length > 0) {

            $(".project-of-" + key).each(function () {

                let countToggle = $(this).find(".count-toggle");
                let candidateToggle = $(this).find(".candidate-toggle");

                if (countToggle.length) {
                    let countKey = countToggle.data("key");
                    $(".count-row-" + countKey).remove();
                }

                if (candidateToggle.length) {
                    let candidateKey = candidateToggle.data("key");
                    $(".candidate-row-" + candidateKey).remove();
                }

            });

            // Remove project rows
            $(".project-of-" + key).remove();

            // Reset customer toggle
            btn.text("+");

            return;
        }

        // Open
        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_projects_from_candidate",
            args: { customer: customer },
            // freeze:true,
            // freeze_message:"Loading...",
            callback: function (r) {

                if (!r.message || r.message.length === 0) {
                    btn.text("+");
                    return;
                }

                let rows = "";
                function showValue(val) {
                    return val && val !== 0 ? val : "-";
                }
                r.message.forEach(function (row, i) {
                    let bg = (i % 2 === 0) ? "#ffffff" : "#e7e6ec";
                    rows += `
                        <tr class="project-row project-of-${key}" style="background:${bg};">
                            <td style="border:1px solid black; text-align:left;">${i + 1}</td>


                            <td style="border:1px solid black; text-align:left;">
    
                                <div style="display:flex; align-items:center; gap:70px; padding-left:20px;">

                                    <a href="/app/project/${row.project}" style="min-width:250px;">
                                        ${row.project_name}
                                    </a>

                                    <span class="count-toggle"
                                        data-project="${row.project}"
                                        data-key="${btoa(row.project).replace(/=/g,"")}"
                                        style="cursor:pointer; color:#1E3A8A; font-weight:bold;padding-left:10px">
                                        Task
                                    </span>

                                    <span class="candidate-toggle"
                                        data-project="${row.project}"
                                        data-key="${btoa(row.project).replace(/=/g,"")}"
                                        style="cursor:pointer; color:#0F766E; font-weight:bold;padding-right:20px">
                                        Candidate
                                    </span>

                                </div>

                            </td>

                            <!-- <td style="border:1px solid black;">
                                <span class="task-toggle"
                                    data-project="${row.project}"
                                    data-key="${btoa(row.project).replace(/=/g,"")}"
                                    style="cursor:pointer;font-weight:bold;margin-right:6px;">
                                    +
                                </span>

                                <a href="/app/project/${row.project}">
                                    ${row.project_name}
                                </a>
                            </td> -->

                            <td style="border:1px solid black; text-align:center;">${showValue(row.vao)}</td>
                            <td style="border:1px solid black; text-align:center;">${showValue(row.sp)}</td>
                            <td style="border:1px solid black; text-align:center;">${showValue(row.fp)}</td>
                            <td style="border:1px solid black; text-align:center;">${showValue(row.sl)}</td>
                            <td style="border:1px solid black; text-align:center;">${showValue(row.lp)}</td>
                            <td style="border:1px solid black; text-align:left;">${row.remark}</td>
                        </tr>
                        `;
                });

                btn.closest("tr").after(rows);
            }
        });

    });



    $(document).on("click", ".count-toggle", function () {

        let btn = $(this);
        let project = btn.data("project");
        let key = btn.data("key");

        

        // Close if already open
        if ($(".count-row-" + key).length > 0) {
            $(".count-row-" + key).remove();
            return;
        }

        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_candidate_status_summary",
            args: { project: project },
            // freeze:true,
            // freeze_message:"Loading...",
            callback: function (r) {
                $(".candidate-row-" + key).remove();

                if (!r.message || r.message.length === 0) {
                    return;
                }
                let taskMap = {};

                r.message.forEach(row => {

                    if (!taskMap[row.task]) {
                        taskMap[row.task] = {
                            subject: row.subject || "",
                            counts: {}
                        };
                    }

                    taskMap[row.task].counts[row.pending_for] = row.count;
                });

                function getCount(task, status) {
                    return taskMap[task].counts[status] || 0;
                }
                let rows = `
                    <tr class="count-row-${key}">
                        <td colspan="13" style="padding:10px; border:1px solid #000;">
                            <div style="overflow-x:auto;">
                                <table class="table table-bordered" style="margin:0;">
                                    <thead>
                                        <!-- <tr style="background:#1E3A8A;color:white;font-weight:bold;">
                                            <th  rowspan="2" style="width:60px;border:1px solid black;">S.No</th>
                                            <th rowspan="2" style="border:1px solid black;">Position</th>
                                            <th colspan="2" style="border:1px solid black;">IP</th>
                                            <th colspan="5" style="border:1px solid black;">FEEDBACK PENDING</th>
                                            <th colspan="3" style="border:1px solid black;">SHORTLISTED</th>
                                            <th rowspan="2" style="border:1px solid black;"><div style="padding-bottom:10px;">PSL</div></th>
                                        </tr> -->
                                        <tr style="background:#334155;color:white;font-weight:bold;">
                                            <th style="width:60px;border:1px solid black;background-color:#2483cc !important;">S.No</th>
                                            <th style="border:1px solid black;background-color:#2483cc !important;">Position</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">SRC - IP</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">PQ - IP</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">SUB - IP</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">SUBC - CP</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">SL - CP</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">LP - IP</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">LPC - IP</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">RPT - CP</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">IVD - CP</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">RP - CP</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">PSL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                    `;
                
                function showValue(val) {
                    return val && val !== 0 ? val : "-";
                }

                let i = 1;

                for (let task in taskMap) {

                    rows += `
                        <tr>
                            <td style="border:1px solid black;">${i++}</td>
                            <td style="border:1px solid black;">
                                <a href="/app/task/${task}" target="_blank"> ${taskMap[task].subject}
                                </a>
                            </td>

                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Sourced"))}</td>
                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Pending QC"))}</td>

                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Submit(SPOC)"))}</td>
                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Submitted(Client)"))}</td>
                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Shortlisted"))}</td>
                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Linedup"))}</td>
                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Linedup Confirmed"))}</td>
                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Reported"))}</td>
                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Interviewed"))}</td>
                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Result Pending"))}</td>
                            <td style="border:1px solid black;text-align:center;">${showValue(getCount(task,"Proposed PSL"))}</td>
                        </tr>
                    `;
                }

                rows += `
                            <tr>
                            <td colspan="13"><div style="margin-top:10px;font-size:10px;text-align:center;">
                                    SRC - Sourced, 
                                    PQ - Pending QC,
                                    SUB - Submitted (SPOC),
                                    SUBC - Submitted (Client),
                                    SL - Shortlisted,
                                    LP - Linedup,
                                    LPC - Linedup Confirmed,
                                    RPT - Reported,
                                    IVD - Interviewed,
                                    RP - Result Pending,
                                    PSL - Proposed PSL
                                </div>
                            </td>
                            </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                `;

                btn.closest("tr").after(rows);
            }
        });
    });


$(document).on("click", "#task-view", function () {

    

    frappe.show_alert({
        message: "Loading all Tasks...",
        indicator: "blue"
    }, 3);

    // STEP 1: open all customers
    $("#summary-container .toggle-btn").each(function () {
        $(this).trigger("click");
    });

    // STEP 2: WAIT UNTIL FIRST DATA APPEARS (IMPORTANT FIX)
    waitForFirstProjects(function () {

        console.log("PROJECTS STARTED LOADING");

        // STEP 3: wait full load
        waitForStableProjects(function (total) {

            console.log("FINAL PROJECT COUNT:", total);

            // STEP 4: open tasks
            $("#summary-container .count-toggle").each(function () {
                $(this).trigger("click");
            });

            console.log("ALL TASKS OPENED");
        });

    });

});


function waitForFirstProjects(callback) {

    let interval = setInterval(function () {

        let count = $("#summary-container .project-row").length;

        console.log("Waiting first load:", count);

        if (count > 0) {
            clearInterval(interval);
            callback();
        }

    }, 300);
}

function waitForStableProjects(callback) {

    let last = -1;
    let stable = 0;

    let interval = setInterval(function () {

        let current = $("#summary-container .project-row").length;

        console.log("Projects Loading:", current);

        if (current === last) {
            stable++;
        } else {
            stable = 0;
        }

        last = current;

        if (stable >= 4 && current > 0) {
            clearInterval(interval);
            callback(current);
        }

    }, 500);
}


$(document).on("click", "#download-excel", function () {

    let d = new frappe.ui.Dialog({
        title: "Download Options",
        fields: [
            {
                fieldtype: "HTML",
                fieldname: "options_html"
            }
        ]
    });

    d.fields_dict.options_html.$wrapper.html(`
        <div style="text-align:center;">
            <p style="margin-bottom:15px;">
                What do you want to download?
            </p>

            <button class="btn btn-primary" id="download-task"
                style="background-color:#1E3A8A; border-color:#334155; margin-right:10px;">
                Task
            </button>

            <button class="btn btn-primary" id="download-candidate"
                style="background-color:#0F766E; border-color:#334155;">
                Candidate
            </button>
        </div>
    `);

    d.show();

    d.$wrapper.on("click", "#download-task", function () {
        d.hide();

        window.open("/api/method/jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.download_task_summary_full");
    });

    d.$wrapper.on("click", "#download-candidate", function () {
        d.hide();

        window.open("/api/method/jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.download_candidate_summary_full");
    });

});
    
    
    $(document).on("click", ".candidate-toggle", function () {

        let btn = $(this);
        let project = btn.data("project");
        let key = btn.data("key");

        let existingRow = btn.closest("tr").next(".candidate-row-" + key);

        if (existingRow.length) {
            existingRow.remove();
            return;
        }

        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_candidate_data_candidate_dashboard",
            args: {
                project: project
            },
            // freeze:true,
            // freeze_message:"Loading...",
            callback: function (r) {

                $(`.count-row-${key}`).remove();

                let table = generateSubCandidateTable(r.message?.candidate || []);

                let row = `
                    <tr class="candidate-row-${key}">
                        <td colspan="13" style="padding:0; border:1px solid black;">
                            <div style="padding:10px;">
                                ${table}
                            </div>
                        </td>
                    </tr>
                `;

                btn.closest("tr").after(row);
            }
        });

    });



$(document).on("click", "#can-view", function () {

    

    frappe.show_alert({
        message: "Loading all Tasks...",
        indicator: "blue"
    }, 3);

    // STEP 1: open all customers
    $("#summary-container .toggle-btn").each(function () {
        $(this).trigger("click");
    });

    // STEP 2: WAIT UNTIL FIRST DATA APPEARS (IMPORTANT FIX)
    waitForFirstProjects(function () {

        console.log("PROJECTS STARTED LOADING");

        // STEP 3: wait full load
        waitForStableProjects(function (total) {

            console.log("FINAL PROJECT COUNT:", total);

            // STEP 4: open tasks
            $("#summary-container .candidate-toggle").each(function () {
                $(this).trigger("click");
            });

            console.log("ALL TASKS OPENED");
        });

    });

});


function waitForFirstProjects(callback) {

    let interval = setInterval(function () {

        let count = $("#summary-container .project-row").length;

        console.log("Waiting first load:", count);

        if (count > 0) {
            clearInterval(interval);
            callback();
        }

    }, 300);
}

function waitForStableProjects(callback) {

    let last = -1;
    let stable = 0;

    let interval = setInterval(function () {

        let current = $("#summary-container .project-row").length;

        console.log("Projects Loading:", current);

        if (current === last) {
            stable++;
        } else {
            stable = 0;
        }

        last = current;

        if (stable >= 4 && current > 0) {
            clearInterval(interval);
            callback(current);
        }

    }, 500);
}
     
    function updateDateTime() {
        const now = new Date();
        const dateStr = now.toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const timeStr = now.toLocaleTimeString();

        document.getElementById('current-datetime').innerHTML = `${dateStr} | ${timeStr}`;
    }



    updateDateTime();
    setInterval(updateDateTime, 1000);

function loadDefaultCandidate(){

	const selectedCustomer = "";
    const selectedProject = "";
    const selectedStatus = "";
    const selectedCanid =""
	 frappe.call({
        method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_candidate_data_candidate_dashboard",
        args: {
            customer: selectedCustomer,
            project: selectedProject,
            pending_for:selectedStatus,
            name:selectedCanid
        },
        callback: function (r) {
            const data = r.message?.candidate || [];
            const sectionHtml = data.length > 0
                ? generateCandidateTable(data)
                : `<div><div style="margin-top: 30px;">No Data Available</div></div>`;

            const targetSelector = "#candidate-table-container";
            $(wrapper).find(targetSelector).html(sectionHtml);

            


            populateCustomerDropdown();
            populateProjectDropdown();

            
            attachCandidateFilterHandler();
        }
    });
}

let candidateFilters = {
    customer: "",
    project: "",
    pending_for: "",
    name: ""
};

function attachCandidateFilterHandler() {
    const applyBtn = document.getElementById("apply-filter-candidate");

    if (!applyBtn) {
        console.warn("Apply button not found. Delaying binding.");
        return;
    }
    applyBtn.replaceWith(applyBtn.cloneNode(true));
    const newApplyBtn = document.getElementById("apply-filter-candidate");

    newApplyBtn.addEventListener("click", function () {
        const selectedCustomer = document.getElementById("candidate-select-customer").value;
        const selectedProject = document.getElementById("candidate-select-project").value;
        const selectedStatus = document.getElementById("candidate-select-status").value;
        const selectedCanid = document.getElementById("candidate-input-canid").value;

        candidateFilters = {
        customer: selectedCustomer,
        project: selectedProject,
        pending_for: selectedStatus,
        name: selectedCanid
    };

        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_candidate_data_candidate_dashboard",
            args: {
                customer:selectedCustomer,
                project: selectedProject,
                pending_for:selectedStatus,
                name:selectedCanid
            },
            callback: function (r) {
                const data = r.message?.candidate || [];
                const sectionHtml = data.length > 0
                    ? generateCandidateTable(data)
                    : `<div  >
                        <div style="margin-top: 30px; text-align:center; font-weight:bold;">No Data Available</div>
                       <button id="back-candidate" style="margin-left:680px; margin-top:5px; text-align:center; margin-bottom:5px;" class="btn btn-primary" >Back</button></div>`;

                const targetSelector = "#candidate-table-container";
                $(wrapper).find(targetSelector).html(sectionHtml);

                


                populateCustomerDropdown();
                populateProjectDropdown();

                document.getElementById("back-candidate")?.addEventListener("click", loadDefaultCandidate);

                // Re-bind the filter handler again since table is re-rendered
                attachCandidateFilterHandler();

                // const downloadBtn = document.getElementById("download-closure-teampro");
                // if (downloadBtn) {
                //     downloadBtn.addEventListener("click", downloadTeamproExcel);
                // }
            }
        });
    });
}
loadDefaultCandidate();
function populateCustomerDropdown() {
   frappe.call({
    method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_customer",
    callback: function (res) {
        if (res.message) {
            $('#candidate-select-customer').each(function () {
                const select = $(this);
                select.empty().append('<option value="">Select Customer</option>');
                res.message.forEach(cus => {
                    select.append(`<option value="${cus.name}">${cus.name}</option>`);
                });
            });
            
        }
    }
});
}

function populateProjectDropdown() {
   frappe.call({
    method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_project",
    callback: function (res) {
        if (res.message) {
            $('#candidate-select-project').each(function () {
                const select = $(this);
                select.empty().append('<option value="">Select Project</option>');
                res.message.forEach(pro => {
                    select.append(`<option value="${pro.name}">${pro.name}</option>`);
                });
            });
           
        }
    }
});
}

function generateCandidateTable(data) {
    // Group by project + customer
    const grouped = {};
    data.forEach(c => {
        const key = `${c.project || 'N/A'}||${c.customer || 'N/A'}`;
        if (!grouped[key]) {
            grouped[key] = {
                project: c.project,
                customer: c.customer,
                tvac: c.tvac,
                tsp: c.tsp,
                tfp: c.tfp,
                tsl: c.tsl,
                custom_t_lp: c.custom_t_lp,
                candidates: []
            };
        }
        grouped[key].candidates.push(c);
    });

    let html = `

        <div style="display:flex; justify-content:end; gap:15px;">

			<input id="candidate-input-canid" placeholder="Candidate ID" class="" style="width:15%; height:28px; border:1px solid #aaaaaa; border-radius:5px; background-color:white; "  />

			<select   id="candidate-select-customer"  class=" customer-select form-control" style="width: 15%; border:1px solid black;  " >
                    <option value="">Select Customer</option>

                </select>



			<select   id="candidate-select-status"  class=" status-select form-control" style="width: 15%; border:1px solid black;  " >
                    <option value="">Select Status</option>
                    <option value="Submit(SPOC)">Submit(SPOC)</option>
                    <option value="Submitted(Client)">Submitted(Client)</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Linedup">Linedup</option>
                    <option value="Linedup Confirmed">Linedup Confirmed</option>
                    <option value="Reported">Reported</option>
                    <option value="Interviewed">Interviewed</option>
                    <option value="Result Pending">Result Pending</option>
                    

                </select>



			<select   id="candidate-select-project"  class=" project-select form-control" style="width: 15%; border:1px solid black;  " >
                    <option value="">Select Project</option>

            </select>

			<button id="apply-filter-candidate" class="btn btn-primary">Apply</button>	

			</div>

			<script>
                    $(document).ready(function() {
                        $('#candidate-select-customer').select2({
                            placeholder: "Select Customer",
                            width: 'resolve'
                        });
                    });

                    
            </script>

			<script>
                    $(document).ready(function() {
                        $('#candidate-select-status').select2({
                            placeholder: "Select Status",
                            width: 'resolve'
                        });
                    });

                    
            </script>


			<script>
                    $(document).ready(function() {
                        $('#candidate-select-project').select2({
                            placeholder: "Select Project",
                            width: 'resolve'
                        });
                    });

                    
            </script>
    
    <div class="table-scroll" style="margin-top:15px;">
        <table class="candidate-table" style="width:100%;">
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Project</th>
                    <th>Customer</th>
                    <th>VAC</th>
                    <th>SP</th>
                    <th>FP</th>
                    <th>SL</th>
                    <th>LP</th>
                </tr>
            </thead>
            <tbody>`;

    const keys = Object.keys(grouped);
    if (keys.length === 0) {
        html += `<tr><td colspan="8" style="text-align:center;font-weight:bold;">No Data Available</td></tr>`;
    } else {
        keys.forEach((key, index) => {
            const g = grouped[key];
            html += `
                <tr>
                    <td style="text-align:center;">${index + 1}</td>
                    <td style="text-align:center;"><a href="https://erp.teamproit.com/app/project/${g.project}">${g.project || '-'}</a></td>
                    <td style="text-align:left;">
                        <span class="toggle-btn" style="cursor: pointer; color: blue; " data-row="${index}" data-project="${g.project}" data-customer="${g.customer}">[+]</span> ${g.customer || '-'}
                    </td>
                    <td style="text-align:center;">${g.tvac || '-'}</td>
                    <td style="text-align:center;">${g.tsp || '-'}</td>
                    <td style="text-align:center;">${g.tfp || '-'}</td>
                    <td style="text-align:center;">${g.tsl || '-'}</td>
                    <td style="text-align:center;">${g.custom_t_lp || '-'}</td>
                </tr>
                <tr id="expand-row-${index}" class="expand-row" style="display:none;">
                    <td colspan="8" id="expand-content-${index}" style="background:#f8f8f8;"></td>
                </tr>`;
        });
    }

    html += `</tbody></table></div></div>`;

    // Attach toggle after table rendered
    setTimeout(() => {
        $(".toggle-btn").off("click").on("click", function () {
            const row = $(this).data("row");
            const project = $(this).data("project");
            const customer = $(this).data("customer");
            const target = $(`#expand-row-${row}`);

            if (target.is(":visible")) {
                target.hide();
                $(this).text("[+]");
                return;
            }

            $(this).text("[-]");

            if (!project || !customer) {
                $(`#expand-content-${row}`).html("<div style='padding:10px;color:red;'>Project/Customer Missing</div>");
                target.show();
                return;
            }

            frappe.call({
                method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_candidate_by_project_customer",
                args: { project, customer,
                    pending_for: candidateFilters.pending_for,
                    name: candidateFilters.name
                 },
                callback: function (r) {
                    console.log(r.message)
                    const list = r.message || [];
                    const html = generateSubCandidateTable(list);
                    $(`#expand-content-${row}`).html(html);
                    target.show();
                }
            });
        });
    }, 100);

    return html;
}

function generateSubCandidateTable(list) {
    if (!list.length) {
        return `
            <table style="width:100%; border-collapse:collapse;">
                <tr>
                    <td colspan="9" style="padding:12px; text-align:center; font-weight:bold; border:1px solid black;">
                        No Candidates Found
                    </td>
                </tr>
            </table>
        `;
    }
    
    let html = `
        <table style="width:100%; border-collapse:collapse; background:white;">
            <thead>
                <tr style="background-color:#2483cc;">
                    <th style="padding:6px; background-color:#2483cc !important;border:1px solid black;">S.No</th>
                    <th style="padding:6px; background-color:#2483cc !important;border:1px solid black;">Candidate ID</th>
                    <th style="padding:6px; background-color:#2483cc !important;border:1px solid black;">Name</th>
                    <th style="padding:6px; background-color:#2483cc !important;border:1px solid black;">Passport</th>
                    <th style="padding:6px; background-color:#2483cc !important;border:1px solid black;">Position</th>
                    <th style="padding:6px; background-color:#2483cc !important;border:1px solid black;">Status</th>
                    <th style="padding:6px; background-color:#2483cc !important;border:1px solid black;">Age</th>
                    <th style="padding:6px; background-color:#2483cc !important;border:1px solid black;">Contact</th>
                    <th style="padding:6px; background-color:#2483cc !important;border:1px solid black;">WhatsApp</th>
                </tr>
            </thead>
            <tbody>
    `;

    list.forEach((c, idx) => {
        console.log(c.name)
        html += `
            <tr>
                <td style="text-align:center !important;border:1px solid black;">${idx + 1}</td>
                <td style="text-align:center !important;border:1px solid black;" ><a href="https://erp.teamproit.com/app/candidate/${c.name}">${c.name}</a></td>
                <td style="border:1px solid black;">${c.given_name || '-'}</td>
                <td style="text-align:center !important;border:1px solid black;" >${c.passport_number || '-'}</td>
                <td style="border:1px solid black;">${c.position || '-'}</td>

                <td style="cursor:pointer;border:1px solid black;" class="status-cell" 
                data-name="${c.name}" 
                data-status="${c.pending_for}">${c.pending_for || '-'}</td>
                <td style="text-align:center;border:1px solid black;">
                    ${c.status_age}
                </td>
                <td style="text-align:center !important;border:1px solid black;" >${c.mobile_number || '-'}</td>
                <td style="text-align:center; width:100px;border:1px solid black;">${
                    c.whatsapp_number 
                    ? (() => {
                        const wa = c.whatsapp_number.replace(/\D/g, ""); 
                        return `<a href="https://wa.me/${wa}" target="_blank">
                                    <i class="fa fa-whatsapp" style="font-size:24px; color:green;"></i>
                                </a>`;
                    })()
                    : '-'
                }</td>

            </tr>
        `;
    });

    html += `</tbody></table>`;
    return html;
}

//Active

function loadDefaultActive(){

	const selectedService = "";
	 frappe.call({
        method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_active_client_data_candidate_dashboard",
        args: {
            service: selectedService,
        },
        callback: function (r) {
            const data = r.message?.client || [];
            const sectionHtml = data.length > 0
                ? generateClientTable(data)
                : `<div ><div style="margin-top: 30px; text-align:center; ">No Data Available</div></div>`;

            const targetSelector = "#active-client-table-container";
            $(wrapper).find(targetSelector).html(sectionHtml);
            
            attachActiveFilterHandler();

        }
    });
}

function attachActiveFilterHandler() {
    const applyBtn = document.getElementById("apply-filter-active-client");

    if (!applyBtn) {
        console.warn("Apply button not found. Delaying binding.");
        return;
    }

    
    applyBtn.replaceWith(applyBtn.cloneNode(true));
    const newApplyBtn = document.getElementById("apply-filter-active-client");

    newApplyBtn.addEventListener("click", function () {
        const selectedService = document.getElementById("active-client-select-service").value;
        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_active_client_data_candidate_dashboard",
            args: {
                service: selectedService,
            },
            callback: function (r) {
                const data = r.message?.client || [];
                const sectionHtml = data.length > 0
                    ? generateClientTable(data)
                    : `<div  >
                        <div style="margin-top: 30px; text-align:center; font-weight:bold;">No Data Available</div>
                       <button id="back-active-client" style="margin-left:680pxpx; margin-top:5px; margin-bottom:5px; text-align:center;" class="btn btn-primary" >Back</button></div>`;

                const targetSelector = "#active-client-table-container";
                $(wrapper).find(targetSelector).html(sectionHtml);


                
                

                document.getElementById("back-active-client")?.addEventListener("click", loadDefaultActive);

                
                attachActiveFilterHandler();

                // const downloadBtn = document.getElementById("download-closure-teampro");
                // if (downloadBtn) {
                //     downloadBtn.addEventListener("click", downloadTeamproExcel);
                // }
            }
        });
    });
}

loadDefaultActive();
function generateClientTable(data){

	let html =`

	<style>


	.table-scroll {
		max-height: 500px;
		overflow-y: auto;
		border: 1px solid #ccc;
	}

	.client-table {
		width: 100%;
		border-collapse: collapse;
        table-layout: fixed;
        border:1px solid black;
	}

    
    .client-table th {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 6px;
         border:1px solid black;
    }

    .client-table td {
        white-space: normal;      
        overflow-wrap: break-word; 
        word-break: break-word;    

        padding: 6px;
         border:1px solid black;
    }


	</style>


	<div style="display:flex; justify-content:end; gap:15px;">

			<select   id="active-client-select-service"  class=" customer-select form-control" style="width: 20%; border:1px solid black;  " >
                    <option value="">Select Service</option>
					<option value="REC-I">REC-I</option>
					<option value="REC-D">REC-D</option>
					<option value="IT-SW">IT-SW</option>

                </select>

			

			<button id="apply-filter-active-client" class="btn btn-primary">Apply</button>	

			</div>

			<script>
                    $(document).ready(function() {
                        $('#active-client-select-service').select2({
                            placeholder: "Select Service",
                            width: 'resolve'
                        });
                    });

                    
            </script>

	<div class="table-scroll" style="margin-top:15px;">
	 <table class="client-table" >
                <thead>
                    <tr>
                        <th style="width:25px;">S.No</th>
                        <th style="width:25px;">Service</th>
                        <th style="width:130px;">Customer</th>
                        <th style="width:20px;">Status</th>
                        <th style="width:80px;">Project</th>
                    </tr>
                </thead>
                <tbody>`

	if(data.length >0){

		data.forEach((client, index) => {


			 html += `

			 <tr>

			 <td style="text-align:center; width:25px;">${index+1}</td>
			 <td style="text-align:left; width:25px;">${client.service || '-'}</td>
			 <td style="text-align:left; width:130px; " >${client.party_name || '-' }</td>
			 <td style="text-align:left; width:20px;" >${client.status || '-'}</td>
			 <td style="text-align:left; width:80px;" >${client.project || '-'}</td>
			 
			 
			 </tr>
			 
			 
			 
			 `

		})


	}	
	
	else{
            html += `
            <tr style="font-weight:bold; background-color:#d0d0d0;">
            <td colspan="5"><center>No Data Available</center></td>
            </tr>`;
        }

	html += `</tbody></table></div>`;	


	return html;		
}

//Inactive
function loadDefaultInactive(){

	const selectedService = "";
    



	 frappe.call({
        method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_inactive_client_data_candidate_dashboard",
        args: {
            service: selectedService,
        },
        callback: function (r) {
            const data = r.message?.client || [];
            const sectionHtml = data.length > 0
                ? generateInactiveClientTable(data)
                : `<div ><div style="margin-top: 30px; text-align:center; ">No Data Available</div></div>`;

            const targetSelector = "#inactive-client-table-container";
            $(wrapper).find(targetSelector).html(sectionHtml);


            
           

            
            attachInactiveFilterHandler();

            
        }
    });

}

function attachInactiveFilterHandler() {
    const applyBtn = document.getElementById("apply-filter-inactive-client");

    if (!applyBtn) {
        console.warn("Apply button not found. Delaying binding.");
        return;
    }

    
    applyBtn.replaceWith(applyBtn.cloneNode(true));
    const newApplyBtn = document.getElementById("apply-filter-inactive-client");

    newApplyBtn.addEventListener("click", function () {
        const selectedService = document.getElementById("inactive-client-select-service").value;
        

        

       

        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_inactive_client_data_candidate_dashboard",
            args: {
                service: selectedService,
            },
            callback: function (r) {
                const data = r.message?.client || [];
                const sectionHtml = data.length > 0
                    ? generateInactiveClientTable(data)
                    : `<div  >
                        <div style="margin-top: 30px; text-align:center; font-weight:bold;">No Data Available</div>
                       <button id="back-inactive-client" style="margin-left:680px; margin-top:5px; margin-bottom:5px; text-align:center;" class="btn btn-primary" >Back</button></div>`;

                const targetSelector = "#inactive-client-table-container";
                $(wrapper).find(targetSelector).html(sectionHtml);


                
                

                document.getElementById("back-inactive-client")?.addEventListener("click", loadDefaultInactive);

                
                attachInactiveFilterHandler();

                // const downloadBtn = document.getElementById("download-closure-teampro");
                // if (downloadBtn) {
                //     downloadBtn.addEventListener("click", downloadTeamproExcel);
                // }
            }
        });
    });
}
loadDefaultInactive();
function generateInactiveClientTable(data){

	let html =`

	<style>


	.table-scroll {
		max-height: 500px;
		overflow-y: auto;
		border: 1px solid #ccc;
	}

	.inactive-client-table {
		width: 100%;
		border-collapse: collapse;
        table-layout: fixed;
        border:1px solid black;
	}

    
    .inactive-client-table th {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 6px;
         border:1px solid black;
    }

    .inactive-client-table td {
        white-space: normal;      
        overflow-wrap: break-word; 
        word-break: break-word;    

        padding: 6px;
         border:1px solid black;
    }


	</style>


	<div style="display:flex; justify-content:end; gap:15px;">

			<select   id="inactive-client-select-service"  class=" customer-select form-control" style="width: 20%; border:1px solid black;  " >
                    <option value="">Select Service</option>
					<option value="REC-I">REC-I</option>
					<option value="REC-D">REC-D</option>
					<option value="IT-SW">IT-SW</option>

                </select>

			

			<button id="apply-filter-inactive-client" class="btn btn-primary">Apply</button>	

			</div>

			<script>
                    $(document).ready(function() {
                        $('#inactive-client-select-service').select2({
                            placeholder: "Select Service",
                            width: 'resolve'
                        });
                    });

                    
            </script>













	<div class="table-scroll" style="margin-top:15px;">
	 <table class="inactive-client-table" >
                <thead>
                    <tr>
                        <th style="width:25px;">S.No</th>
                        <th style="width:25px;">Service</th>
                        <th style="width:120px;">Customer</th>
                        <th style="width:50px;">Status</th>
                        <th style="width:200px;">Remarks</th>
                    </tr>
                </thead>
                <tbody>`

                 

	if(data.length >0){

		data.forEach((client, index) => {


			 html += `

			 <tr>

			 <td style="text-align:center; width:25px;">${index+1}</td>
			 <td style="text-align:left; width:25px;">${client.service || '-'}</td>
			 <td style="text-align:left; width:120px; " >${client.party_name || '-' }</td>
			 <td style="text-align:left; width:50px;">${client.status || '-'}</td>
			 <td style="text-align:left; width:200px; " >${client.remarks || '-'}</td>
			 
			 
			 </tr>
			 
			 
			 
			 `

		})


	}	
	
	else{
            html += `
            <tr style="font-weight:bold; background-color:#d0d0d0;">
            <td colspan="5"><center>No Data Available</center></td>
            </tr>`;
        }

	html += `</tbody></table></div>`;	


	return html;		
}

$(document).on('click', '.status-cell', function() {

    const candidateName = $(this).data('name');
    const currentstatus = $(this).data('status')

    frappe.call({
                            method: "frappe.client.get",
                            args: {
                                doctype: "Candidate",
                                name: candidateName
                            },
                            callback: function(r) {
                                if (!r.message) {
                                    frappe.msgprint("Unable to fetch Candidate details");
                                    return;
                                }

                                const candidate = r.message;
                                const can_project =candidate.project
                                const can_task =candidate.task
                                const can_position =candidate.position
                                const can_remarks_1 =candidate.remarks_1
                                
                                
                                
                                

                               
                                
                                let fields = [
                                    {
                                        label: 'Candidate ID',
                                        fieldname: 'candidate_id',
                                        fieldtype: 'Data',
                                        read_only: 1,
                                        default: candidateName
                                    },

                                    {
                                        label:'Current Status',
                                        fieldname:"current_status",
                                        fieldtype: 'Data',
                                        read_only: 1,
                                        default: currentstatus
                                    }
                                    
                                ];

                                if (currentstatus =="Submit(SPOC)"){
                                     fields.push(

                                    {
                                        label: 'Next Status',
                                        fieldname: 'next_status',
                                        fieldtype: 'Select',
                                        options:["Submitted(Client)","IDB"],
                                        reqd:1
                                    },

                                    {
                                        label: 'IDB-Remarks',
                                        fieldname: 'idb_remarks',
                                        fieldtype: 'Select',
                                        options:["Rejected By Client","Any other"],
                                        depends_on: "eval:doc.next_status=='IDB'",
                                        mandatory_depends_on: "eval:doc.next_status=='IDB'"
                                    },
                                    {
                                        label: 'Any Other Reason',
                                        fieldname: 'custom_any_other_reason',
                                        fieldtype: 'Small Text',
                                        depends_on: "eval:doc.idb_remarks=='Any other'",
                                        mandatory_depends_on: "eval:doc.idb_remarks=='Any other'"
                                    },
                                )
                                }
                                else if(currentstatus =="Submitted(Client)"){

                                     fields.push(

                                    {
                                        label: 'Next Status',
                                        fieldname: 'next_status',
                                        fieldtype: 'Select',
                                        options:["Shortlisted","IDB"],
                                        reqd:1
                                    },

                                     {
                                        label: 'IDB-Remarks',
                                        fieldname: 'idb_remarks',
                                        fieldtype: 'Select',
                                        options:["Rejected By Client","Any other"],
                                        depends_on: "eval:doc.next_status=='IDB'",
                                        mandatory_depends_on: "eval:doc.next_status=='IDB'"
                                    },
                                    {
                                        label: 'Any Other Reason',
                                        fieldname: 'custom_any_other_reason',
                                        fieldtype: 'Small Text',
                                        depends_on: "eval:doc.idb_remarks=='Any other'",
                                        mandatory_depends_on: "eval:doc.idb_remarks=='Any other'"
                                    },
                                )


                                }
                                else if(currentstatus =="Shortlisted"){

                                     fields.push(

                                    {
                                        label: 'Next Status',
                                        fieldname: 'next_status',
                                        fieldtype: 'Select',
                                        options:["Linedup","IDB"],
                                        reqd:1
                                    },

                                     {
                                        label: 'IDB-Remarks',
                                        fieldname: 'idb_remarks',
                                        fieldtype: 'Select',
                                        options:["Rejected By Client","Any other"],
                                        depends_on: "eval:doc.next_status=='IDB'",
                                        mandatory_depends_on: "eval:doc.next_status=='IDB'"
                                    },
                                    {
                                        label: 'Any Other Reason',
                                        fieldname: 'custom_any_other_reason',
                                        fieldtype: 'Small Text',
                                        depends_on: "eval:doc.idb_remarks=='Any other'",
                                        mandatory_depends_on: "eval:doc.idb_remarks=='Any other'"
                                    },
                                )


                                }
                                else if(currentstatus =="Linedup"){

                                     fields.push(

                                    {
                                        label: 'Next Status',
                                        fieldname: 'next_status',
                                        fieldtype: 'Select',
                                        options:["Linedup Confirmed","IDB"],
                                        reqd:1
                                    },

                                    {
                                        label: 'Linedup Confirmed Attachement',
                                        fieldname: 'custom_linedup_confirmed_attachement',
                                        fieldtype: 'Attach',
                                        depends_on: "eval:doc.next_status=='Linedup Confirmed'",
                                        reqd:1
                                    },

                                      {
                                        label: 'IDB-Remarks',
                                        fieldname: 'idb_remarks',
                                        fieldtype: 'Select',
                                        options:["Rejected By Client","Any other"],
                                        depends_on: "eval:doc.next_status=='IDB'",
                                        mandatory_depends_on: "eval:doc.next_status=='IDB'"
                                    },
                                    {
                                        label: 'Any Other Reason',
                                        fieldname: 'custom_any_other_reason',
                                        fieldtype: 'Small Text',
                                        depends_on: "eval:doc.idb_remarks=='Any other'",
                                        mandatory_depends_on: "eval:doc.idb_remarks=='Any other'"
                                    },
                                )


                                }
                                else if(currentstatus =="Linedup Confirmed"){

                                     fields.push(

                                    {
                                        label: 'Next Status',
                                        fieldname: 'next_status',
                                        fieldtype: 'Select',
                                        options:["Reported","IDB"],
                                        reqd:1
                                    },

                                     {
                                        label: 'IDB-Remarks',
                                        fieldname: 'idb_remarks',
                                        fieldtype: 'Select',
                                        options:["Rejected By Client","Any other"],
                                        depends_on: "eval:doc.next_status=='IDB'",
                                        mandatory_depends_on: "eval:doc.next_status=='IDB'"
                                    },
                                    {
                                        label: 'Any Other Reason',
                                        fieldname: 'custom_any_other_reason',
                                        fieldtype: 'Small Text',
                                        depends_on: "eval:doc.idb_remarks=='Any other'",
                                        mandatory_depends_on: "eval:doc.idb_remarks=='Any other'"
                                    },
                                )
                            }
                                else if(currentstatus =="Reported"){

                                     fields.push(

                                    {
                                        label: 'Next Status',
                                        fieldname: 'next_status',
                                        fieldtype: 'Select',
                                        options:["Interviewed","IDB"],
                                        reqd:1
                                    },

                                     {
                                        label: 'IDB-Remarks',
                                        fieldname: 'idb_remarks',
                                        fieldtype: 'Select',
                                        options:["Rejected By Client","Any other"],
                                        depends_on: "eval:doc.next_status=='IDB'",
                                        mandatory_depends_on: "eval:doc.next_status=='IDB'"
                                    },
                                    {
                                        label: 'Any Other Reason',
                                        fieldname: 'custom_any_other_reason',
                                        fieldtype: 'Small Text',
                                        depends_on: "eval:doc.idb_remarks=='Any other'",
                                        mandatory_depends_on: "eval:doc.idb_remarks=='Any other'"
                                    },
                                )
                            }
                                else if(currentstatus =="Interviewed"){

                                     fields.push(

                                    {
                                        label: 'Next Status',
                                        fieldname: 'next_status',
                                        fieldtype: 'Select',
                                        options:["Result Pending","IDB"],
                                        reqd:1
                                    },

                                     {
                                        label: 'IDB-Remarks',
                                        fieldname: 'idb_remarks',
                                        fieldtype: 'Select',
                                        options:["Rejected By Client","Any other"],
                                        depends_on: "eval:doc.next_status=='IDB'",
                                        mandatory_depends_on: "eval:doc.next_status=='IDB'"
                                    },
                                    {
                                        label: 'Any Other Reason',
                                        fieldname: 'custom_any_other_reason',
                                        fieldtype: 'Small Text',
                                        depends_on: "eval:doc.idb_remarks=='Any other'",
                                        mandatory_depends_on: "eval:doc.idb_remarks=='Any other'"
                                    },
                                )
                            }
                                else if(currentstatus =="Result Pending"){

                                     fields.push(

                                    {
                                        label: 'Next Status',
                                        fieldname: 'next_status',
                                        fieldtype: 'Select',
                                        options:["Proposed PSL","IDB"],
                                        reqd:1
                                    },

                                     {
                                        label: 'IDB-Remarks',
                                        fieldname: 'idb_remarks',
                                        fieldtype: 'Select',
                                        options:["Rejected By Client","Any other"],
                                        depends_on: "eval:doc.next_status=='IDB'",
                                        mandatory_depends_on: "eval:doc.next_status=='IDB'"
                                    },
                                    {
                                        label: 'Any Other Reason',
                                        fieldname: 'custom_any_other_reason',
                                        fieldtype: 'Small Text',
                                        depends_on: "eval:doc.idb_remarks=='Any other'",
                                        mandatory_depends_on: "eval:doc.idb_remarks=='Any other'"
                                    },
                                )
                            }





let d = new frappe.ui.Dialog({
    title:"Status Change",
    fields: fields
}) 
    
    d.show();





d.set_primary_action("Submit", function () {
    let values = d.get_values();
    if (!values) return;

    const next_status = values.next_status;
    const current_status = currentstatus;

    frappe.confirm(
        `Are you sure you want to move the candidate from <b>${current_status}</b> → <b>${next_status}</b>?`,
        function () {
            frappe.dom.freeze("Please wait... Updating candidate status...");

            let update_data = {
                pending_for: next_status,
                custom_status_transition: [{
                    status: next_status,
                    sourced_date: frappe.datetime.now_datetime(),
                    sourced_by: frappe.session.user,
                    project: can_project,
                    task: can_task,
                    position: can_position,
                    remarks: can_remarks_1
                }]
            };

            // IDB handling
            if (next_status === "IDB") {
                update_data.custom_idbremarks = values.idb_remarks || "";
                update_data.custom_any_other_reason = values.idb_remarks === "Any other" 
                    ? values.custom_any_other_reason || "" 
                    : "";
            }

            // Linedup Confirmed handling
            if (next_status === "Linedup Confirmed" && values.custom_linedup_confirmed_attachement) {
                let file_url = values.custom_linedup_confirmed_attachement;

                frappe.call({
                    method: "frappe.client.insert",
                    args: {
                        doc: {
                            doctype: "File",
                            file_url: file_url,
                            attached_to_doctype: "Candidate",
                            attached_to_name: candidateName,
                            is_private: 0
                        }
                    },
                    callback(r) {
                        if (r.message) {
                            update_data.custom_linedup_confirmed_attachement = r.message.file_url;

                            frappe.call({
                                method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.update_candidate_status",
                                args: {
                                    name: candidateName,
                                    data: update_data
                                },
                                callback(res) {
                                    frappe.dom.unfreeze();
                                    if (!res.exc) {
                                        frappe.msgprint("Candidate status updated successfully!");
                                        d.hide();
                                        if (typeof loadDefaultCandidate === "function") loadDefaultCandidate();
                                    }
                                }
                            });
                        } else frappe.dom.unfreeze();
                    }
                });
                return; // prevent outer call
            }

            // For all other statuses
            frappe.call({
                method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.update_candidate_status",
                args: {
                    name: candidateName,
                    data: update_data
                },
                callback(r) {
                    frappe.dom.unfreeze();
                    if (!r.exc) {
                        frappe.msgprint("Candidate status updated successfully!");
                        d.hide();
                        if (typeof loadDefaultCandidate === "function") loadDefaultCandidate();
                    }
                }
            });
        },
        function () {
            frappe.show_alert("Cancelled");
        }
    );
});










                            }

                            })

})

};
