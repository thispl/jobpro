
frappe.pages['rec-i-dashboard'].on_page_load = function(wrapper) {
    
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'REC-I Dashboard',
		single_column: true
	});

	const style = document.createElement('style');
style.innerHTML = `
	
	.top-actions {
		display: flex;
		gap: 10px;
		justify-content: flex-end;
		align-items: center;
		margin-top: -40px;
		margin-right: 20px;
	}
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
		width: 190px;
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
    

		
`;
document.head.appendChild(style);
style.innerHTML += `
	@keyframes cardPop {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.05);
			opacity: 0.8;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
	.pop-blink {
		animation: cardPop 0.3s ease-in-out;
	}
        #select-all-cards.selected-card {
		background-color: black !important;
		color: white !important;
		border-color: black !important;
		font-weight: bold;
	}
	#deselect-all-cards.selected-card {
		background-color: red !important;
		color: white !important;
		border-color: red !important;
		font-weight: bold;
	}
        
`;



	$(wrapper).html(`
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

		<div class="dashboard-wrapper">
			<div style="position: relative; padding: 10px;">
				<h2 style="text-align: center; font-weight: bold; margin: 0;">HR SERVICES</h2>
				<div id="current-datetime" style="font-size: 16px; color: #666; text-align: center; margin-top: 5px;"></div>

				<div class="top-actions">
					<input type="date" id="tfp-from-date" class="form-control" style="width: 140px;">
					<input type="date" id="tfp-to-date" class="form-control" style="width: 140px;">
					<button id="apply-tfp-filter" class="btn btn-dark">Apply</button>
					<button id="refresh-dashboard" class="btn btn-dark">Refresh</button>
				</div>
			</div>

			
			
		<!-- Additional Metrics Section -->
<div id="rec-i-metrics-cards" style="display: flex; gap: 20px; margin: 30px 20px 0;overflow-x: auto; flex-wrap: nowrap;background-color: #f5f5f5;border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-sizing: border-box;">
	<div class="dashboard-card project-count-card" style="background-color: #007BFF;"></div>
	<div class="dashboard-card task-count-card" style="background-color: #6C757D;"></div>
	<div class="dashboard-card vacancies-card" style="background-color: #17A2B8;"></div>
	<div class="dashboard-card sp-count-card" style="background-color: #28A745;"></div>
	<div class="dashboard-card fp-count-card" style="background-color: #FFC107;"></div>
    <div class="dashboard-card fpsp-count-card" style="background-color: #f67efa;"></div>
    <div class="dashboard-card ip-card" style="background-color: #93f8e7;"></div>
	<div class="dashboard-card sl-count-card" style="background-color: #FD7E14;"></div>
	<div class="dashboard-card psl-count-card" style="background-color: #DC3545;"></div>
</div>
<!-- Monitor Cards Section -->




<div id="ptsr-sections-wrapper" style="margin-right: 20px;margin-left: 20px;" ></div>

<div id="summary-container" style="min-height:50px;background-color:#f5f5f5;margin:0px 20px 20px;padding:12px 15px;border-radius:8px;">

    <div style="display:flex;background-color:white;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <!-- LEFT SIDE HEADING -->
        <h4 style="margin:0;font-weight:500;color:#111827;">
            <b>Candidate Project Summary (Task / Candidate)</b>
        </h4>
        <!-- RIGHT SIDE CONTROLS -->
        <div style="display:flex;align-items:center;gap:12px;">
            
        <!-- TASK VIEW -->
        <button id="task-view" class="btn btn-primary" title="Task View"
            style="background-color:#1E3A8A;border:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <img src="https://cdn-icons-png.flaticon.com/128/2921/2921222.png"
                style="width:20px;height:20px;filter:brightness(0) invert(1);">
        </button>

        <!-- CANDIDATE VIEW -->
        <button id="can-view"class="btn btn-primary"title="Candidate View"
            style="background-color:#0F766E;border:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <img src="https://cdn-icons-png.flaticon.com/128/681/681494.png"
                style="width:22px;height:22px;filter:brightness(0) invert(1);">
        </button>



            <!-- STATUS FILTER -->
            <select id="status-filter"
                style="display:none;padding:7px 10px;border-radius:6px;border:1px solid #CBD5E1;min-width:120px;background:white;">
                <option value="">Status</option></select>

            
            <!-- DOWNLOAD -->
            <button id="download-excel" title="Download Excel"
                style="background:none;border:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;">
                <img src="https://cdn-icons-png.flaticon.com/128/724/724933.png"
                    style="width:24px;height:24px;">
            </button>

        </div>

    </div>

</div>



</div>
<div id="rec-i-monitor-wrapper" style="margin: 40px 20px;border: 1px solid #ddd; border-radius: 8px;background-color: #f5f5f5;margin-left:20px;margin-right:20px;">
	<h4 style="margin-bottom: 15px;text-align:center;background-color:white;margin-top:20px">WEEK PLAN MONITOR</h4>
	<!-- 👇 Add your filters here -->
	<div id="rec-i-monitor-filters" style="margin-bottom: 20px; display: flex; gap: 15px; flex-wrap: wrap;justify-content: flex-end;">
		<input type="date" id="monitor-from-date" class="form-control" style="width: 160px;" placeholder="From Date">
		<input type="date" id="monitor-to-date" class="form-control" style="width: 160px;" placeholder="To Date">
		<select id="monitor-executive" class="form-control" style="width: 180px;">
    <option value="">Select Executive</option>
</select>

		<select id="monitor-week-plan" class="form-control" style="width: 180px;">
			<option value="">Select Week Plan</option>
		</select>
		<button class="btn btn-primary btn-sm" id="apply-monitor-filter">Apply</button>
	</div>

	<!-- 👇 Table container -->
	<div id="rec-i-monitor-table" style="overflow: auto;max-height: 500px; border: 1px solid #ddd; padding: 10px;"></div>
</div>

<div style="display: flex; gap: 20px; margin: 20px; align-items: flex-start;">

    <!-- Left Side -->
    <div style="flex: 1; border: 1px solid #ddd; border-radius: 8px; background: #f5f5f5; padding: 10px;">

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; background:white; padding:10px;">

            <h4 style="margin:0;">
                Case Status Report
            </h4>

            <button class="btn btn-sm btn-primary" id="download-case-status-report">
                Download
            </button>

        </div>

        <div id="case-status-report-table"
            style="overflow:auto; max-height:400px; min-height:400px; border:1px solid #ccc; background:white;">
        </div>

    </div>

    <!-- Right Side -->
    <div style="flex: 1; border: 1px solid #ddd; border-radius: 8px; background: #f5f5f5; padding: 10px;">

        <h4 style="text-align:center; background-color:white; padding:10px; margin-bottom:10px;">
            Check Status Report
        </h4>

        <div id="check-status-report-table"
            style="overflow:auto; max-height:400px; min-height:400px; border:1px solid #ccc; background:white;">
        </div>

    </div>

</div>

<!-- SO Details -->

<div class="ptsr-filter-section" style="display: flex; gap: 20px; margin: 20px;display:none;">

    <!-- Table 1 -->
    <div style="flex: 1; background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; padding: 10px;">
        <h4 style="margin-bottom: 15px; text-align:center; background-color:white; margin-top:20px">
           CLOSURE "DROPPED" - SALES ORDER NOT UPDATED
        </h4>
        <div id="monitor-table-1" style="overflow:auto; max-height:400px; border:1px solid #ddd; padding:10px;"></div>
    </div>

    <!-- Table 2 -->
    <div style="flex: 1; background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; padding: 10px;">
        <h4 style="margin-bottom: 15px; text-align:center; background-color:white; margin-top:20px">
            CLOSURE "ARRIVED" - SALES ORDER NOT UPDATED
        </h4>
        <div id="monitor-table-2" style="overflow:auto; max-height:400px; border:1px solid #ddd; padding:10px;"></div>
        <span id="loading-table-2" style="font-size:16px; color:#555; display:block; text-align:center;">
            Loading data...
        </span>
    </div>

</div>

		</div>
        
	`);

//     <div id="closure-matrix-container" style="margin: 40px 20px;border: 1px solid #ddd; border-radius: 8px;background-color: #f5f5f5;margin-left:20px;margin-right:20px;">
//     <h4 style="margin-bottom: 15px;text-align:center;background-color:white;margin-top:20px; position: relative;">
//         TERRITORY-WISE CLOSURE STATUS
//        <button id="download-closure-table" class="btn btn-secondary" style="margin-left:60%;">Download</button>
//     </h4>
//     <div id="closure-matrix-scroll" style="overflow: auto; max-height: 500px; border: 1px solid #ddd;">
//         <div id="closure-matrix-table" style="min-width: 1000px; width: 100%;"></div>
//     </div>
// </div>
// Add monitor section containers
$(wrapper).find('#monitor-toggle-cards').after(`
	<!-- Monitor Group Sections -->
	<div id="kickoff-section" class="ptsr-filter-section"></div>
    <div id="submission-section" class="ptsr-filter-section"></div>
	<div id="submission-feedback-section" class="ptsr-filter-section"></div>
    <div id="feedback-section" class="ptsr-filter-section"></div>
`);

$(wrapper).find('#monitor-toggle-cards').before(`
    <div style="margin-top:30px;margin-bottom:30px; display: flex;  align-items: center; justify-content: center;gap: 15px;border: 1px solid #ddd; border-radius: 8px;background-color: #f5f5f5;margin-left:20px;margin-right:20px;">
        <button class="btn btn-sm btn-outline-primary" id="select-all-cards" style="margin-top:10px;margin-bottom:10px;">Select All</button>
        <button class="btn btn-sm btn-outline-danger" id="deselect-all-cards">Deselect All</button>

        <!-- Monitor Toggle Buttons Inline -->
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#kickoff-section">Kick OFF</button>
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#submission-section">Submission</button>
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#submission-feedback-section">Submission/Feedback</button>
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#feedback-section">Feedback</button>
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#closure-matrix-container">Closure</button>
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#rec-i-monitor-wrapper">Week Plan</button>
    </div>
`);
// Add unified control + toggle card bar
$(wrapper).find('#ptsr-sections-wrapper').before(`
    <div id="monitor-toggle-cards" style="margin-top:30px;margin-bottom:30px;display: flex; gap: 15px;justify-content: center; align-items: center;border: 1px solid #ddd; border-radius: 8px;background-color: #f5f5f5;margin-left:20px;margin-right:20px;display:none;">
        <button class="btn btn-sm btn-outline-primary" id="select-all-cards" style="margin-top:10px;margin-bottom:10px;">Select All</button>
        <button class="btn btn-sm btn-outline-danger" id="deselect-all-cards">Deselect All</button>
        <button type="button" class="btn btn-sm btn-sm btn-outline-primary monitor-toggle-card" data-target="#kickoff-section">Kick OFF</button>
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#submission-section">Submission</button>
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#submission-feedback-section">Submission/Feedback</button>
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#feedback-section">Feedback</button>
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#closure-matrix-container">Closure</button>
        <button type="button" class="btn btn-sm btn-outline-primary monitor-toggle-card" data-target="#rec-i-monitor-wrapper">Week Plan</button>
    </div>
`);
// Add the monitor group section containers (hidden by default, shown when toggle is clicked)
$(wrapper).find('#monitor-toggle-cards').after(`
	<div id="kickoff-section" class="ptsr-filter-section"></div>
	<div id="submission-section" class="ptsr-filter-section"></div>
	<div id="submission-feedback-section" class="ptsr-filter-section"></div>
	<div id="feedback-section" class="ptsr-filter-section"></div>
`);

$(".monitor-toggle-card").on("click", function () {
	const $clickedCard = $(this);
	const target = $clickedCard.data("target");

	// Toggle selected class
	$clickedCard.toggleClass("selected-card");

	// Show or hide the corresponding section based on current selection
	if ($clickedCard.hasClass("selected-card")) {
		$(target).show();
	} else {
		$(target).hide();
	}

	// Optional: Hide all sections that are *not selected*
	$(".monitor-toggle-card").each(function () {
		const $card = $(this);
		const cardTarget = $card.data("target");
		if (!$card.hasClass("selected-card")) {
			$(cardTarget).hide();
		}
	});
});

$('#select-all-cards').on('click', function () {
	$(this).addClass('selected-card');
	$('#deselect-all-cards').removeClass('selected-card');

	$('.monitor-toggle-card').each(function () {
		const $card = $(this);
		const target = $card.data("target");
		$card.addClass('selected-card');
		$(target).show();
	});
});

$('#deselect-all-cards').on('click', function () {
	$(this).addClass('selected-card');
	$('#select-all-cards').removeClass('selected-card');

	$('.monitor-toggle-card').each(function () {
		const $card = $(this);
		const target = $card.data("target");
		$card.removeClass('selected-card');
		$(target).hide();
	});
});

// Manually show specific sections and highlight the toggle buttons without triggering any clicks
const defaultVisibleSections = [
    "#kickoff-section",
    "#submission-section",
    "#submission-feedback-section",
    "#feedback-section",
    "#closure-matrix-container",
    "#rec-i-monitor-wrapper"
];

defaultVisibleSections.forEach(selector => {
    $(selector).show(); // show section directly
    
});


// Add visual feedback to selected cards
const toggleCardStyle = document.createElement("style");
toggleCardStyle.innerHTML = `
	.monitor-toggle-card.selected-card {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		transform: scale(1.05);
		transition: all 0.2s ease-in-out;
	}
`;
document.head.appendChild(toggleCardStyle);
// Override section appending to correct div based on group title
const targetMap = {
	"Kick OFF": "#kickoff-section",
	// "SUBMISSION": "#submission-section",
    // "SUBMISSION / FEEDBACK": "#submission-feedback-section",
    // "FEEDBACK": "#feedback-section",
	// "CLOSURE": "#closure-section",
};
    const filterGroups = [
    { title: "Kick OFF", status: ["Draft"], custom_kick_of_completed: 0 },
    // { title: "SUBMISSION", status: ['Open', 'Enquiry'], sourcing_statu: ["SP"] }, 
    // { title: "SUBMISSION / FEEDBACK", status: ['Open', 'Enquiry'], sourcing_statu: ["SP/FP"] },
    // { title: "FEEDBACK", status: ['Open', 'Enquiry'], sourcing_statu: ["FP"] },
    // { title: "CLOSURE", status: "Closure"},
    // { title: "Hold", status: "Hold", sourcing_statu: ["SP/FP","SP","FP"] },
];

$("#case-status-report-table").html(`
    <div style="text-align:center; padding:20px; font-weight:bold;">
        Loading Data...
    </div>
`);

frappe.call({
    method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_case_status_report_html",
    callback: function(r) {

        if (r.message) {

            $("#case-status-report-table").html(r.message);

        } else {

            $("#case-status-report-table").html(`
                <div style="text-align:center; padding:20px; color:#888; font-weight:bold;">
                    Loading Data...
                </div>
            `);
        }
    }
});


$("#download-case-status-report").click(function () {

    window.open(
        "/api/method/jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.download_case_status_report_excel"
    );

});

    function load_customers() {

        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_customers_from_candidate",
            freeze: true,
            freeze_message: "Loading Projects...",
            callback: function(r) {
                console.log("HI")
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

                        
<div id="summary-container" style="min-height:500px;
        max-height:500px;
        overflow-y:auto;
        overflow-x:auto;min-height:50px;background-color:#f5f5f5;margin:0px 20px 20px;padding:12px 15px;border-radius:8px;">

    <div style="display:flex;background-color:white;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <!-- LEFT SIDE HEADING -->
        <h4 style="margin:0;font-weight:500;color:#111827;">
            <b>Candidate Project Summary (Task / Candidate)</b>
        </h4>
        <!-- RIGHT SIDE CONTROLS -->
        <div style="display:flex;align-items:center;gap:12px;">
            
        <!-- TASK VIEW -->
        <button id="task-view" class="btn btn-primary" title="Task View"
            style="background-color:#1E3A8A;border:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <img src="https://cdn-icons-png.flaticon.com/128/2921/2921222.png"
                style="width:20px;height:20px;filter:brightness(0) invert(1);">
        </button>

        <!-- CANDIDATE VIEW -->
        <button id="can-view"class="btn btn-primary"title="Candidate View"
            style="background-color:#0F766E;border:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <img src="https://cdn-icons-png.flaticon.com/128/681/681494.png"
                style="width:22px;height:22px;filter:brightness(0) invert(1);">
        </button>



            <!-- STATUS FILTER -->
            <select id="status-filter"
                style="display:none;padding:7px 10px;border-radius:6px;border:1px solid #CBD5E1;min-width:120px;background:white;">
                <option value="">Status</option></select>

            
            <!-- DOWNLOAD -->
            <button id="download-excel" title="Download Excel"
                style="background:none;border:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;">
                <img src="https://cdn-icons-png.flaticon.com/128/724/724933.png"
                    style="width:24px;height:24px;">
            </button>

        </div>

    </div>

</div>
                

                    <table class="table table-bordered">
                            <thead class="customer-header">
                                <tr>
                                    <td style="width:60px;text-align:center;border:1px solid black;position:sticky;top:0;background:#0F1568;z-index:5;">S.No</td>
                                    <td style="text-align:center;border:1px solid black;position:sticky;top:0;background:#0F1568;z-index:5;">Customer / Project</td>
                                    <td style="text-align:center;border:1px solid black;position:sticky;top:0;background:#0F1568;z-index:5;">VAC</td>
                                    <td style="text-align:center;border:1px solid black;position:sticky;top:0;background:#0F1568;z-index:5;">SP</td>
                                    <td style="text-align:center;border:1px solid black;position:sticky;top:0;background:#0F1568;z-index:5;">FP</td>
                                    <td style="text-align:center;border:1px solid black;position:sticky;top:0;background:#0F1568;z-index:5;">SL</td>
                                    <td style="text-align:center;border:1px solid black;position:sticky;top:0;background:#0F1568;z-index:5;">LP</td>
                                    <td style="text-align:center;border:1px solid black;position:sticky;top:0;background:#0F1568;z-index:5;">SPOC Remarks</td>
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

                            <td style="border:1px solid black; text-align:left;">
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
            freeze:true,
            freeze_message:"Loading...",
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
    
                                <div style="display:flex; align-items:center; gap:20px; padding-left:20px;">

                                    <a href="/app/project/${row.project}" style="min-width:250px;">
                                        ${row.project_name}
                                    </a>

                                    <span class="count-toggle"
                                        data-project="${row.project}"
                                        data-key="${btoa(row.project).replace(/=/g,"")}"
                                        style="background-color:#1E3A8A;border:none;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:0;">

                                        <img src="https://cdn-icons-png.flaticon.com/128/2921/2921222.png"
                                            style="width:20px;height:20px;object-fit:contain;filter:brightness(0) invert(1);display:block;margin:auto;">
                                    </span>

                                    <span class="candidate-toggle"
                                        data-project="${row.project}"
                                        data-key="${btoa(row.project).replace(/=/g,"")}"
                                        style="background-color:#0F766E;border:none;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:0;">
                                        <img 
                                            src="https://cdn-icons-png.flaticon.com/128/681/681494.png"
                                            style="width:20px;height:20px;object-fit:contain;filter:brightness(0) invert(1);display:block;margin:auto;">
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
            freeze:true,
            freeze_message:"Loading Task Summary...",
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
                            vac: row.vac || "-",
                            sp: row.sp || "-",
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
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">VAC</th>
                                            <th style="width:100px;border:1px solid black;background-color:#2483cc !important;">SP</th>
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
                            <td style="border:1px solid black;text-align:center;">${showValue(taskMap[task].vac)}</td>
                            <td style="border:1px solid black;text-align:center;">${taskMap[task].sp || "-"}</td>
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

    $("#status-filter").hide();

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
        <div style="text-align:center; padding:10px;">

            <p style="
                margin-bottom:20px;
                font-size:14px;
                font-weight:500;
            ">
                What do you want to download?
            </p>

            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                gap:20px;
            ">

                <!-- TASK BUTTON -->
                <button class="btn btn-primary" id="download-task" title="Task Download"
                    style="background-color:#1E3A8A;border:none;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:0;">

                    <img src="https://cdn-icons-png.flaticon.com/128/2921/2921222.png"
                        style="width:20px;height:20x;object-fit:contain;filter:brightness(0) invert(1);display:block;margin:auto;">
                </button>

                <!-- CANDIDATE BUTTON -->
                <button class="btn btn-primary" id="download-candidate" title="Candidate Download"
                    style="background-color:#0F766E;border:none;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:0;">
                    <img src="https://cdn-icons-png.flaticon.com/128/681/681494.png"
                        style="width:20px;height:20px;object-fit:contain;filter:brightness(0) invert(1);display:block;margin:auto;">
                </button>
            </div>

        </div>
    `);

    d.show();

    d.$wrapper.on("click", "#download-task", function () {

        d.hide();

        window.open(
            "/api/method/jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.download_task_summary_full"
        );

    });

    d.$wrapper.on("click", "#download-candidate", function () {

        d.hide();

        window.open(
            "/api/method/jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.download_candidate_summary_full"
        );

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
            freeze:true,
            freeze_message:"Loading Candidate Summary...",
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

    let btn = $(this);

    if (btn.data("opened")) {

        btn.data("opened", false);

        $("#status-filter").hide().empty();

        $("#summary-container .toggle-btn").text("+");
        $("#summary-container .project-row").hide();

        $("#summary-container tr").each(function () {

            let cls = $(this).attr("class") || "";

            if (cls.includes("candidate-row-")) {
                $(this).remove();
            }

        });

        frappe.show_alert({
            message: "Candidate View Closed",
            indicator: "orange"
        }, 3);

        return;
    }

    btn.data("opened", true);

    $("#status-filter").show();

    frappe.show_alert({
        message: "Loading all Tasks...",
        indicator: "blue"
    }, 3);

    // STEP 1:open customers
    $("#summary-container .toggle-btn").each(function () {
        $(this).trigger("click");
    });

    // STEP 2
    waitForFirstProjects(function () {

        waitForStableProjects(function (total) {

            // STEP 3: open candidates
            $("#summary-container .candidate-toggle").each(function () {
                $(this).trigger("click");
            });

            // STEP 4: load status dropdown
            setTimeout(() => {

                let statusSet = new Set();

                $("#summary-container .status-cell").each(function () {

                    let status = $(this).text().trim();

                    if (status && status !== "-") {
                        statusSet.add(status);
                    }

                });

                let dropdown = $("#status-filter");

                dropdown.empty();
                dropdown.append(`<option value="">All Status</option>`);

                statusSet.forEach(status => {
                    dropdown.append(`<option value="${status}">${status}</option>`);
                });

            }, 2000);

        });

    });

});


$(document).on("change", "#status-filter", function () {

    let selected = $(this).val();

    $("#summary-container .status-cell").each(function () {

        let row = $(this).closest("tr");

        let status = $(this)
            .text()
            .trim();

        if (!selected || status === selected) {

            row.show();

        } else {

            row.hide();

        }

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

            
            // attachCandidateFilterHandler();
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
                // attachCandidateFilterHandler();

                // const downloadBtn = document.getElementById("download-closure-teampro");
                // if (downloadBtn) {
                //     downloadBtn.addEventListener("click", downloadTeamproExcel);
                // }
            }
        });
    });
}
loadDefaultCandidate();
load_customers();
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





    filterGroups.forEach(group => {
//         if (group.title =='FEEDBACK'){
// //         frappe.call({
// //             method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_ptsr_data_project_wise",
// //             args: {
// //                 status: group.status,
// //                 sourcing_statu: group.sourcing_statu
// //             },
// //             callback: function (r) {
// //                 if (r.message && r.message.projects) {
// //                     const data = r.message.projects || [];
// //                     let sectionHtml = `<h3 style="margin-top:30px;text-align:center;">${group.title}</h3>`;

// //                     sectionHtml += generatePTSRTables(data); 

// //                    const targetSelector = targetMap[group.title] || "#ptsr-sections-wrapper";
// // $(wrapper).find(targetSelector).append(sectionHtml);
// //                     $('.toggle-btn').off('click').on('click', function () {
// //                         const projectName = $(this).data('project');
// //                         const $rows = $(`.project-${projectName}`);
// //                         const isVisible = $rows.is(':visible');
// //                         $rows.toggle(!isVisible);
// //                         $(this).text(isVisible ? '[+]' : '[-]');
// //                     });

// //                 }
// //             }
// //         });
   
// frappe.call({
//     method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_candidates_tat_crossed_from_history",
//     callback: function (tatRes) {
//         const tatMap = tatRes.message || {};

//         frappe.call({
//             method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_ptsr_data_project_wise",
//             args: {
//                 status: group.status,
//                 sourcing_statu: group.sourcing_statu
//             },
//             callback: function (r) {
//                 if (r.message && r.message.projects) {
//                     const data = r.message.projects || [];
//                     console.log(group.sourcing_statu)
//                     sectionHtml = `
//                     <div style="margin-top: 30px;">
//                         ${generatePTSRTablesothers(data, group.title)}
//                     </div>
//                 `;
//                     const targetSelector = targetMap[group.title] || "#ptsr-sections-wrapper";
//                     $(wrapper).find(targetSelector).append(sectionHtml);

//                     $('.toggle-btn').off('click').on('click', function () {
//                         const projectName = $(this).data('project');
//                         const $rows = $(`.project-${projectName}`);
//                         const isVisible = $rows.is(':visible');

//                         // Toggle task rows
//                         $rows.toggle(!isVisible);

//                         // Toggle project-level remarks
//                         $(`.project-remark-${projectName}`).toggle(isVisible); // hide when expanding

//                         // Toggle [+]/[-]
//                         $(this).text(isVisible ? '[+]' : '[-]');
//                     });

//                 }
//             }
//         });
//     }
// });

// }
    
    // else{

           frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_ptsr_data_project_wise",
            args: {
                status: group.status,
                sourcing_statu: group.sourcing_statu
            },
            callback: function (r) {
                if (r.message && r.message.projects) {
                    const data = r.message.projects || [];
                    console.log(group.sourcing_statu)
                    // let sectionHtml = `<h3 style="margin-top:30px;text-align:center;">${group.title}</h3>`;

                    // sectionHtml += generatePTSRTablesothers(data); 
                    sectionHtml = `
                    <div style="margin-top: 30px;">
                        ${generatePTSRTablesothers(data, group.title)}
                    </div>
                `;


                   const targetSelector = targetMap[group.title] || "#ptsr-sections-wrapper";
$(wrapper).find(targetSelector).append(sectionHtml);
                   
$('.toggle-btn').off('click').on('click', function () {
    const projectName = $(this).data('project');
    const $rows = $(`.project-${projectName}`);
    const isVisible = $rows.is(':visible');

    // Toggle task rows
    $rows.toggle(!isVisible);

    // Hide/show ONLY the inner content of remarks (not the cell or border)
    $(`.remark-content-${projectName}`).css('visibility', isVisible ? 'visible' : 'hidden');

    // Toggle [+]/[-]
    $(this).text(isVisible ? '[+]' : '[-]');
});


                }
            }
        });
// }
    
});

    
    function calculateAgeInDays(creationDate) {
        if (!creationDate) return '-';
        const created = new Date(creationDate);
        const today = new Date();
        const diffTime = today - created;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays}`;
    }


//     function generatePTSRTables(data, tatData) {
//         tatData = tatData || {};
//         let html = `
//             <style>
//                  .ptsr-scroll-container {
//                     max-height: 600px;
//                     overflow-y: auto;
//                     border: 1px solid #ccc;
//                     margin-bottom: 20px;
//                 }

//                 .ptsr-horizontal-scroll {
//                     overflow-x: auto;
// 					overflow-y: auto;
//                     width: 100%;
//                 }

//                 .ptsr-horizontal-scroll table {
//                     min-width: 100px; 
//                     border-collapse: collapse;
//                     width: 100%;}
  
//                 table { width: 100%; border-collapse: collapse !important;overflow-y: auto;overflow-x: auto; }
//                 table, th, td { border: 1px solid black !important; padding: 8px; text-align: center; }
                

//                 th { background-color: #0F1568 !important; position: sticky; top: 0; color: white !important; z-index: 2; }
                
//                     .project-row:nth-of-type(odd) {
//                     background-color: #add8e6;
//                 }
//                 .project-row:nth-of-type(even) {
//                     background-color: #ffffff;
//                 }
//                 .task-header td { position: sticky; top: 41px; background-color: #d3d3d3 !important; z-index: 1; }
//                 .left-align { text-align: left !important; }
//                 .toggle-btn { cursor: pointer; font-weight: bold; color: #0F1568; }
//             </style>
//             <div class="ptsr-scroll-container">
//             <div class="ptsr-horizontal-scroll" style="max-height:600px; overflow-y:auto;">
//             <table>
//             <thead>
//                 <tr>
//                     <th>SI NO</th>
//                     <th>Project Name</th>
//                     <th>PP</th>
//                     <th style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">AM Remark</th>
//                     <th style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">PM Remark</th>
//                     <th colspan=4 style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">SPOC Remark</th>
//                     <th>EV</th>
//                     <th>VAC</th>
//                     <th>SP</th>
//                     <th>FP</th>
//                     <th>SL</th>
//                     <th>LP</th>
//                     <th>Ex PSL</th>
//                     <th>PV</th>
//                     <th>Age</th>
//                 </tr>
//             </thead>
//             <tbody>`;

//         let serial_no = 1;
//         let overallTotals = { vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0, expected_value: 0, expected_psl: 0, custom_psl_value: 0 ,tot_vac:0,tot_sp:0,tot_fp:0,tot_sl:0,tot_lp:0};

//         data.forEach((project) => {

//             let color = "";

//             if (serial_no % 2 === 0) {
//                 color = "#ffffff"; 
//             } else {
//                 color = "#add8e6";  
//             }
//             Object.keys(tatData).forEach(key => {
//     console.log("Project:", key, "→", tatData[key]);
// });
//                 const highlightStatuses = ['Submit(SPOC)', 'Submitted(Client)','Interviewed'];


//             html += `
//                 <tr class="project-header" style ="background-color:${color};">
//                     <td>${serial_no++}</td>
//                     <td class="left-align">
//                         <span class="toggle-btn" data-project="${project.name}">[+]</span>
//                         ${project.project_name}<br>${project.territory || '-'}
//                     </td>
//                     <td>${project.priority || '-'}</td>
//                     <td style="text-align:left;vertical-align:top;;vertical-align:middle;min-width: 250px; max-width: 250px; ">${project.remark || '-'}</td>
//                     <td style="text-align:left;vertical-align:top;vertical-align:middle;min-width: 250px; max-width: 250px; ">${project.account_manager_remark || '-'}</td>
//                     <td colspan="4" style="text-align:left;vertical-align:top;;vertical-align:middle;min-width: 250px; max-width: 250px; ">${project.custom_spoc_remark || '-'}</td>
//                     <td class="text-right">${project.expected_value || 0}</td>
//                     <td>${project.tvac || 0}</td>
//                     <td>${project.tsp || 0}</td>
//                 <td>
//                     ${project.tfp || 0}/
//                     ${
//                         (tatData[project.project_name]?.status_map || []).some(s =>
//                             highlightStatuses.includes(s.status)
//                         )
//                         ? (() => {
//                             const matchingStatus = (tatData[project.project_name].status_map.find(s =>
//                                 highlightStatuses.includes(s.status)
//                             ) || {});
//                             const ids = (matchingStatus.candidates || []).map(c => c.closure_id);
//                             const idFilter = JSON.stringify(["in", ids]);
//                             const count = matchingStatus.count || 0;
//                             return `<a href="javascript:void(0)" onclick='frappe.set_route("List", "Candidate", { "name": ${idFilter} })' style="color:red;font-weight:bold;">(${count})</a>`;
//                         })()
//                         : 0
//                     }

//                     </td>

//                     <td>${project.tsl || 0}</td>
//                     <td>${project.custom_t_lp || 0}</td>
//                     <td>${project.expected_psl || 0}</td>
//                     <td>${project.custom_psl_value || 0}</td>
//                     <td>${calculateAgeInDays(project.creation)}</td>
//                 </tr>`;

//             overallTotals.expected_value += parseFloat(project.expected_value) || 0;
//             overallTotals.expected_psl += parseFloat(project.expected_psl) || 0;
//             overallTotals.custom_psl_value += parseFloat(project.custom_psl_value) || 0;
//             overallTotals.tot_vac+=parseFloat(project.tvac) || 0;
//             overallTotals.tot_sp+=parseFloat(project.tsp) || 0;
//             overallTotals.tot_fp+=parseFloat(project.tfp) || 0;
//             overallTotals.tot_sl+=parseFloat(project.tsl) || 0;
//             overallTotals.tot_lp+=parseFloat(project.custom_t_lp) || 0;
//             if (project.tasks.length > 0) {
//                 let task_serial_no = 1;
//                 let totals = { vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0 };

//                 html += `<tbody class="project-${project.name}" style="display:none;">
//                 <tr class="task-header">
//                     <td colspan="1">SI NO</td>
//                     <td colspan="7">Task</td>
//                     <td colspan="2">Task Priority</td>
//                     <td colspan="1">VAC</td>
//                     <td colspan="1">SP</td>
//                     <td colspan="1">FP</td>
//                     <td colspan="1">SL</td>
//                     <td colspan="1">LP</td>
//                     <td colspan="1">PSL</td>
//                     <td colspan="2">Age</td>
//                 </tr>`;

//                 project.tasks.forEach(task => {
//                     totals.vac += task.vac || 0;
//                     totals.sp += task.sp || 0;
//                     totals.fp += task.fp || 0;
//                     totals.sl += task.sl || 0;
//                     totals.lp += task.custom_lp || 0;
//                     totals.psl += task.psl || 0;

//                     html += `
//                     <tr>
//                         <td colspan="1">${task_serial_no++}</td>
//                         <td colspan="7" class="left-align"><a href="/app/task/${task.name}">${task.task_name || '-'}</a></td>
//                         <td colspan="2">${task.task_priority || '-'}</td>
//                         <td colspan="1">${task.vac || 0}</td>
//                         <td colspan="1">${task.sp || 0}</td>
//                         <td colspan="1">${task.fp || 0}</td>
//                         <td colspan="1">${task.sl || 0}</td>
//                         <td colspan="1">${task.custom_lp || 0}</td>
//                         <td colspan="1">${task.psl || 0}</td>
//                         <td colspan="2">${task.age}</td>
//                     </tr>`;
//                 });

//                 overallTotals.vac += totals.vac;
//                 overallTotals.sp += totals.sp;
//                 overallTotals.fp += totals.fp;
//                 overallTotals.sl += totals.sl;
//                 overallTotals.lp += totals.lp;
//                 overallTotals.psl += totals.psl;

//                 html += `
//                     <tr style="font-weight:bold; background-color:#f9f9f9;">
//                         <td colspan="10" style="text-align:center">Task Total</td>
//                         <td>${totals.vac}</td>
//                         <td>${totals.sp}</td>
//                         <td>${totals.fp}</td>
//                         <td>${totals.sl}</td>
//                         <td>${totals.lp}</td>
//                         <td>${totals.psl}</td>
//                         <td colspan="2">0</td>
//                     </tr>
//                 </tbody>`;
//             }
//             else {
//     html += `<tbody class="project-${project.name}" style="display:none;">
//         <tr style="font-weight:bold; background-color:#d0d0d0;">
//             <td colspan="15"><center>No Data Available</center></td>
//         </tr>
//     </tbody>`;
// }

//         });
//         if (data.length > 0) {
//             html += `
//             <tr style="font-weight:bold; background-color:#d0d0d0;">
//                 <td colspan="9" class="left-align">Total</td>
//                 <td class="text-right">${overallTotals.expected_value}</td>
//                 <td>${overallTotals.tot_vac}</td><td>${overallTotals.tot_sp}</td><td>${overallTotals.tot_fp}</td><td>${overallTotals.tot_sl}</td>
//                 <td>${overallTotals.tot_lp}</td>
//                 <td>${overallTotals.expected_psl}</td>
//                 <td>${overallTotals.custom_psl_value}</td>
//                 <td></td>
//             </tr>`;
//         }
//         else{
//             html += `
//             <tr style="font-weight:bold; background-color:#d0d0d0;">
//             <td colspan="18"><center>No Data Available</center></td>
//             </tr>`;
//         }

//         html += `</tbody></table></div></div>`;
//         return html;
//     }
     


// function generatePTSRTablesothers(data, title) {

//         let html = `
//             <style>
//                  .ptsr-scroll-container {
//                     max-height: 600px;
//                     overflow-y: auto;
//                     border: 1px solid #ccc;
//                     margin-bottom: 20px;
//                 }

//                 .ptsr-horizontal-scroll {
//                     overflow-x: auto;
// 					overflow-y: auto;
//                     width: 100%;
//                 }

//                 .ptsr-horizontal-scroll table {
//                     min-width: 100px; 
//                     border-collapse: collapse;
//                     width: 100%;}
  
//                 table { width: 100%; border-collapse: collapse !important;overflow-y: auto;overflow-x: auto; }
//                 table, th, td { border: 1px solid black !important; padding: 8px; text-align: center; }
                

//                 th { background-color: #0F1568 !important; position: sticky; top: 0; color: white !important; z-index: 2; }
                
//                     .project-row:nth-of-type(odd) {
//                     background-color: #e6f2f1;
//                 }
//                 .project-row:nth-of-type(even) {
//                     background-color: #ffffff;
//                 }
//                    /* Table cell default */
// table td {
//     max-width: 250px;
//     overflow: auto;
//     text-overflow: ellipsis;
//     vertical-align: middle;
// }


//                 .task-header td { position: sticky; top: 41px; background-color: #d3d3d3 !important; z-index: 1; }
//                 .left-align { text-align: left !important; }
//                 .toggle-btn { cursor: pointer; font-weight: bold; color: #0F1568; }
//             </style>
//             <div class="ptsr-scroll-container" style="background-color: #f5f5f5;border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-sizing: border-box;margin-left: 15px;margin-right: 15px;">
//             <div class="ptsr-horizontal-scroll" style="max-height:600px; overflow-y:auto;position: sticky; top: 0; z-index: 1;"" >
//             		<h4 style="margin: 10px; padding: 0px 0; text-align:center; background: white; position: sticky; top: 0; z-index: 1;">${title}</h4>

//             <table>
//             <thead>
//                 <tr>
//                     <th>SI NO</th>
//                     <th>Project Name</th>
//                     <th>PP</th>
//                     <th>EV</th>
//                     <th>VAC</th>
//                     <th>SP</th>
//                     <th>FP</th>
//                     <th>SL</th>
//                     <th>LP</th>
//                     <th>Ex PSL</th>
//                     <th>PV</th>
//                     <th>Age</th>
//                     <th style="text-align:center;vertical-align:top;min-width: 200px; max-width: 200px; word-wrap: break-word;">AM Remark</th>
//                     <th style="text-align:center;vertical-align:top;min-width: 200px; max-width: 200px; word-wrap: break-word;">PM Remark</th>
//                     <th colspan=4 style="text-align:center;vertical-align:top;min-width: 200px; max-width: 250px; word-wrap: break-word;">SPOC Remark</th>
//                 </tr>
//             </thead>
//             <tbody>`;

//         let serial_no = 1;
//         let overallTotals = { vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0, expected_value: 0, expected_psl: 0, custom_psl_value: 0 ,tot_vac:0,tot_sp:0,tot_fp:0,tot_sl:0,tot_lp:0};
//         let rowspan = 1;
//         data.forEach((project) => {
//             let task_count = (project.tasks.length || 1) + 1; // include task total row



//             let color = "";

//             if (serial_no % 2 === 0) {
//                 color = "#ffffff"; 
//             } else {
//                 color = "#e6f2f1"; 
//             }
            


//             html += `
//                 <tr class="project-header" style="background-color:${color};">
//         <td rowspan="${task_count}">${serial_no++}</td>
//         <td rowspan="${task_count}" class="left-align">
//             <span class="toggle-btn" data-project="${project.name}">[+]</span>
//             ${project.project_name}<br>${project.territory || '-'}
//         </td>
//         <td rowspan="${task_count}">${project.priority || '-'}</td>
//         <td rowspan="${task_count}">${project.expected_value || 0}</td>
//         <td rowspan="${task_count}">${project.tvac || 0}</td>
//         <td rowspan="${task_count}">${project.tsp || 0}</td>
//         <td rowspan="${task_count}">${project.tfp || 0}</td>
//         <td rowspan="${task_count}">${project.tsl || 0}</td>
//         <td rowspan="${task_count}">${project.custom_t_lp || 0}</td>
//         <td rowspan="${task_count}">${project.expected_psl || 0}</td>
//         <td rowspan="${task_count}">${project.custom_psl_value || 0}</td>
//         <td rowspan="${task_count}">${calculateAgeInDays(project.creation)}</td>
//         <td rowspan="${task_count}" class="project-remark-${project.name}" style="text-align:center; vertical-align: middle; min-width:200px;border-bottom:none !important; max-width:200px;">
//     <div class="remark-content remark-content-${project.name}">${project.remark || '-'}</div>
// </td>

// <td rowspan="${task_count}" class="project-remark-${project.name}" style="text-align:left; vertical-align: middle; min-width:200px; max-width:200px;border-bottom:none !important;">
//     <div class="remark-content remark-content-${project.name}">${project.account_manager_remark || '-'}</div>
// </td>

// <td rowspan="${task_count}" colspan="4" class="project-remark-${project.name}" style="text-align:left; vertical-align: middle; min-width:200px; max-width:200px;border-bottom:none !important;">
//     <div class="remark-content remark-content-${project.name}">${project.custom_spoc_remark || '-'}</div>
// </td>
// </tr>
// `;
//             overallTotals.expected_value += parseFloat(project.expected_value) || 0;
//             overallTotals.expected_psl += parseFloat(project.expected_psl) || 0;
//             overallTotals.custom_psl_value += parseFloat(project.custom_psl_value) || 0;
//             overallTotals.tot_vac+=parseFloat(project.tvac) || 0;
//             overallTotals.tot_sp+=parseFloat(project.tsp) || 0;
//             overallTotals.tot_fp+=parseFloat(project.tfp) || 0;
//             overallTotals.tot_sl+=parseFloat(project.tsl) || 0;
//             overallTotals.tot_lp+=parseFloat(project.custom_t_lp) || 0;
                
//             if (project.tasks.length > 0) {
//                 rowspan = project.tasks.length + 2; // header + total
//                 let task_serial_no = 1;
//                 let totals = { vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0 };

//                 const task_count = project.tasks.length;
//                 let midIndex = Math.floor(project.tasks.length / 2);

//                 project.tasks.forEach((task, idx) => {
//                     totals.vac += task.vac || 0;
//                     totals.sp += task.sp || 0;
//                     totals.fp += task.fp || 0;
//                     totals.sl += task.sl || 0;
//                     totals.lp += task.custom_lp || 0;
//                     totals.psl += task.psl || 0;

//                     html += `
//                     <tbody class="project-${project.name}" style="display:none;">
//                     <tr>
//                         <td colspan="1">${task_serial_no++}</td>
//                         <td colspan="1" style="text-align:left;width:5%;"><a href="/app/task/${task.name}">${task.task_name || '-'}</a></td>
//                         <td colspan="2">${task.task_priority || '-'}</td>
//                         <td colspan="1">${task.vac || 0}</td>
//                         <td colspan="1">${task.sp || 0}</td>
//                         <td colspan="1">${task.fp || 0}</td>
//                         <td colspan="1">${task.sl || 0}</td>
//                         <td colspan="1">${task.custom_lp || 0}</td>
//                         <td colspan="1">${task.psl || 0}</td>
//                         <td colspan="2">${task.age}</td>
                        
                       
//                     `;
//                     if (idx === midIndex) {
//                     html += `
//                         <td style="text-align:center; vertical-align: middle;  border-top: none !important; border-bottom: none !important;">
//                             ${project.remark || '-'}
//                         </td>
//                         <td style="text-align:left; vertical-align:middle;  border-top: none !important; border-bottom: none !important;">
//                             ${project.account_manager_remark || '-'}
//                         </td>
//                         <td colspan="4" style="text-align:left; vertical-align:middle;  border-top: none !important; border-bottom: none !important;">
//                             ${project.custom_spoc_remark || '-'}
//                         </td>
//                     `;
               
//                 }
    

// else{
//     html += `
//     <td style="border-top: none !important; border-bottom: none !important;"></td>
//                         <td style="border-top: none !important; border-bottom: none !important;"></td>
//                         <td colspan="4" style="border-top: none !important; border-bottom: none !important;"></td>
//          `;    
// }



//     html += `</tr>`;
//                 });

                
//                 overallTotals.vac += totals.vac;
//                 overallTotals.sp += totals.sp;
//                 overallTotals.fp += totals.fp;
//                 overallTotals.sl += totals.sl;
//                 overallTotals.lp += totals.lp;
//                 overallTotals.psl += totals.psl;
            
//                 html += `
//                     <tr style="font-weight:bold; background-color:#f9f9f9;">
//                         <td colspan="4" style="text-align:center">Task Total</td>
//                         <td>${totals.vac}</td>
//                         <td>${totals.sp}</td>
//                         <td>${totals.fp}</td>
//                         <td>${totals.sl}</td>
//                         <td>${totals.lp}</td>
//                         <td>${totals.psl}</td>
//                         <td colspan="2">0</td>
//                         <td colspan="6"></td>
//                     </tr>
//                 </tbody>`;
//             }
//             else {
//     html += `<tbody class="project-${project.name}" style="display:none;">
//         <tr style="font-weight:bold; background-color:#d0d0d0;">
//             <td colspan="15"><center>No Data Available</center></td>
//         </tr>
//     </tbody>`;
// }

//         });
//         if (data.length > 0) {
//             html += `
//             <tr style="font-weight:bold; background-color:#d0d0d0;">
//                 <td colspan="3" class="left-align">Total</td>
//                 <td class="text-right">${overallTotals.expected_value}</td>
//                 <td>${overallTotals.tot_vac}</td><td>${overallTotals.tot_sp}</td><td>${overallTotals.tot_fp}</td><td>${overallTotals.tot_sl}</td>
//                 <td>${overallTotals.tot_lp}</td>
//                 <td>${overallTotals.expected_psl}</td>
//                 <td>${overallTotals.custom_psl_value}</td>
//                 <td colspan="6"></td>
//             </tr>`;
//         }
//         else{
//             html += `
//             <tr style="font-weight:bold; background-color:#d0d0d0;">
//             <td colspan="18"><center>No Data Available</center></td>
//             </tr>`;
//         }

//         html += `</tbody></table></div></div>`;
//         return html;
//     }

function generatePTSRTables(data, tatData) {
        tatData = tatData || {};
        let html = `
            <style>
                 .ptsr-scroll-container {
                    max-height: 600px;
                    overflow-y: auto;
                    border: 1px solid #ccc;
                    margin-bottom: 20px;
                }

                .ptsr-horizontal-scroll {
                    overflow-x: auto;
					overflow-y: auto;
                    width: 100%;
                }

                .ptsr-horizontal-scroll table {
                    min-width: 100px; 
                    border-collapse: collapse;
                    width: 100%;}
  
                table { width: 100%; border-collapse: collapse !important;overflow-y: auto;overflow-x: auto; }
                table, th, td { border: 1px solid black !important; padding: 8px; text-align: center; }
                

                th { background-color: #0F1568 !important; position: sticky; top: 0; color: white !important; z-index: 2; }
                
                    .project-row:nth-of-type(odd) {
                    background-color: #add8e6;
                }
                .project-row:nth-of-type(even) {
                    background-color: #ffffff;
                }
                .task-header td { position: sticky; top: 41px; background-color: #d3d3d3 !important; z-index: 1; }
                .left-align { text-align: left !important; }
                .toggle-btn { cursor: pointer; font-weight: bold; color: #0F1568; }
            </style>
            <div class="ptsr-scroll-container">
            <div class="ptsr-horizontal-scroll" style="max-height:600px; overflow-y:auto;">
            <table>
            <thead>
                <tr>
                    <th>SI NO</th>
                    <th>Project Name</th>
                    <th>PP</th>
                    <th style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">AM Remark</th>
                    <th style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">PM Remark</th>
                    <th colspan=4 style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">SPOC Remark</th>
                    <th>VAC</th>
                    <th>SP</th>
                    <th>FP</th>
                    <th>SL</th>
                    <th>LP</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>`;

        let serial_no = 1;
        let overallTotals = { vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0, expected_value: 0, expected_psl: 0, custom_psl_value: 0 ,tot_vac:0,tot_sp:0,tot_fp:0,tot_sl:0,tot_lp:0};

        data.forEach((project) => {

            let color = "";

            if (serial_no % 2 === 0) {
                color = "#ffffff"; 
            } else {
                color = "#add8e6";  
            }
            Object.keys(tatData).forEach(key => {
    console.log("Project:", key, "→", tatData[key]);
});
                const highlightStatuses = ['Submit(SPOC)', 'Submitted(Client)','Interviewed'];


            html += `
                <tr class="project-header" style ="background-color:${color};">
                    <td>${serial_no++}</td>
                    <td class="left-align">
                        <span class="toggle-btn" data-project="${project.name}">[+]</span>
                        ${project.project_name}<br>${project.territory || '-'}
                    </td>
                    <td>${project.priority || '-'}</td>
                    <td style="text-align:left;vertical-align:top;;vertical-align:middle;min-width: 250px; max-width: 250px; ">${project.remark || '-'}</td>
                    <td style="text-align:left;vertical-align:top;vertical-align:middle;min-width: 250px; max-width: 250px; ">${project.account_manager_remark || '-'}</td>
                    <td colspan="4" style="text-align:left;vertical-align:top;;vertical-align:middle;min-width: 250px; max-width: 250px; ">${project.custom_spoc_remark || '-'}</td>
                    <td>${project.tvac || 0}</td>
                    <td>${project.tsp || 0}</td>
                <td>
                    ${project.tfp || 0}/
                    ${
                        (tatData[project.project_name]?.status_map || []).some(s =>
                            highlightStatuses.includes(s.status)
                        )
                        ? (() => {
                            const matchingStatus = (tatData[project.project_name].status_map.find(s =>
                                highlightStatuses.includes(s.status)
                            ) || {});
                            const ids = (matchingStatus.candidates || []).map(c => c.closure_id);
                            const idFilter = JSON.stringify(["in", ids]);
                            const count = matchingStatus.count || 0;
                            return `<a href="javascript:void(0)" onclick='frappe.set_route("List", "Candidate", { "name": ${idFilter} })' style="color:red;font-weight:bold;">(${count})</a>`;
                        })()
                        : 0
                    }

                    </td>

                    <td>${project.tsl || 0}</td>
                    <td>${project.custom_t_lp || 0}</td>
                    <td>${calculateAgeInDays(project.creation)}</td>
                </tr>`;

            overallTotals.expected_value += parseFloat(project.expected_value) || 0;
            overallTotals.expected_psl += parseFloat(project.expected_psl) || 0;
            overallTotals.custom_psl_value += parseFloat(project.custom_psl_value) || 0;
            overallTotals.tot_vac+=parseFloat(project.tvac) || 0;
            overallTotals.tot_sp+=parseFloat(project.tsp) || 0;
            overallTotals.tot_fp+=parseFloat(project.tfp) || 0;
            overallTotals.tot_sl+=parseFloat(project.tsl) || 0;
            overallTotals.tot_lp+=parseFloat(project.custom_t_lp) || 0;
            if (project.tasks.length > 0) {
                let task_serial_no = 1;
                let totals = { vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0 };

                html += `<tbody class="project-${project.name}" style="display:none;">
                <tr class="task-header">
                    <td colspan="1">SI NO</td>
                    <td colspan="7">Task</td>
                    <td colspan="1">Task Priority</td>
                    <td colspan="1">VAC</td>
                    <td colspan="1">SP</td>
                    <td colspan="1">FP</td>
                    <td colspan="1">SL</td>
                    <td colspan="1">LP</td>
                    <td colspan="1">PSL</td>
                    <td colspan="2">Age</td>
                </tr>`;

                project.tasks.forEach(task => {
                    totals.vac += task.vac || 0;
                    totals.sp += task.sp || 0;
                    totals.fp += task.fp || 0;
                    totals.sl += task.sl || 0;
                    totals.lp += task.custom_lp || 0;
                    totals.psl += task.psl || 0;

                    html += `
                    <tr>
                        <td colspan="1">${task_serial_no++}</td>
                        <td colspan="7" class="left-align"><a href="/app/task/${task.name}">${task.task_name || '-'}</a></td>
                        <td colspan="2">${task.task_priority || '-'}</td>
                        <td colspan="1">${task.vac || 0}</td>
                        <td colspan="1">${task.sp || 0}</td>
                        <td colspan="1">${task.fp || 0}</td>
                        <td colspan="1">${task.sl || 0}</td>
                        <td colspan="1">${task.custom_lp || 0}</td>
                        <td colspan="1">${task.psl || 0}</td>
                        <td colspan="2">${task.age}</td>
                    </tr>`;
                });

                overallTotals.vac += totals.vac;
                overallTotals.sp += totals.sp;
                overallTotals.fp += totals.fp;
                overallTotals.sl += totals.sl;
                overallTotals.lp += totals.lp;
                overallTotals.psl += totals.psl;

                html += `
                    <tr style="font-weight:bold; background-color:#f9f9f9;">
                        <td colspan="10" style="text-align:center">Task Total</td>
                        <td>${totals.vac}</td>
                        <td>${totals.sp}</td>
                        <td>${totals.fp}</td>
                        <td>${totals.sl}</td>
                        <td>${totals.lp}</td>
                        <td>${totals.psl}</td>
                        <td colspan="2">0</td>
                    </tr>
                </tbody>`;
            }
            else {
    html += `<tbody class="project-${project.name}" style="display:none;">
        <tr style="font-weight:bold; background-color:#d0d0d0;">
            <td colspan="15"><center>No Data Available</center></td>
        </tr>
    </tbody>`;
}

        });
        if (data.length > 0) {
            html += `
            <tr style="font-weight:bold; background-color:#d0d0d0;">
                <td colspan="9" class="left-align">Total</td>
                <td class="text-right">${overallTotals.expected_value}</td>
                <td>${overallTotals.tot_vac}</td><td>${overallTotals.tot_sp}</td><td>${overallTotals.tot_fp}</td><td>${overallTotals.tot_sl}</td>
                <td>${overallTotals.tot_lp}</td>
                <td>${overallTotals.expected_psl}</td>
                <td>${overallTotals.custom_psl_value}</td>
                <td></td>
            </tr>`;
        }
        else{
            html += `
            <tr style="font-weight:bold; background-color:#d0d0d0;">
            <td colspan="18"><center>No Data Available</center></td>
            </tr>`;
        }

        html += `</tbody></table></div></div>`;
        return html;
    }
     


function generatePTSRTablesothers(data, title) {

        let html = `
            <style>
                 .ptsr-scroll-container {
                    max-height: 600px;
                    overflow-y: auto;
                    border: 1px solid #ccc;
                    margin-bottom: 20px;
                }

                .ptsr-horizontal-scroll {
                    overflow-x: auto;
					overflow-y: auto;
                    width: 100%;
                }

                .ptsr-horizontal-scroll table {
                    min-width: 100px; 
                    border-collapse: collapse;
                    width: 100%;}
  
                table { width: 100%; border-collapse: collapse !important;overflow-y: auto;overflow-x: auto; }
                table, th, td { border: 1px solid black !important; padding: 8px; text-align: center; }
                

                th { background-color: #0F1568 !important; position: sticky; top: 0; color: white !important; z-index: 2; }
                
                    .project-row:nth-of-type(odd) {
                    background-color: #e6f2f1;
                }
                .project-row:nth-of-type(even) {
                    background-color: #ffffff;
                }
                   /* Table cell default */
table td {
    max-width: 250px;
    overflow: auto;
    text-overflow: ellipsis;
    vertical-align: middle;
}


                .task-header td { position: sticky; top: 41px; background-color: #d3d3d3 !important; z-index: 1; }
                .left-align { text-align: left !important; }
                .toggle-btn { cursor: pointer; font-weight: bold; color: #0F1568; }
            </style>
            <div class="ptsr-scroll-container" style="background-color: #f5f5f5;border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-sizing: border-box;margin-left: 15px;margin-right: 15px;">
            <div class="ptsr-horizontal-scroll" style="max-height:600px; overflow-y:auto;position: sticky; top: 0; z-index: 1;"" >
            		<h4 style="margin: 10px; padding: 0px 0; text-align:center; background: white; position: sticky; top: 0; z-index: 1;">${title}</h4>

            <table>
            <thead>
                <tr>
                    <th>SI NO</th>
                    <th>Project Name</th>
                    <th>PP</th>
                    <th>VAC</th>
                    <th>SP</th>
                    <th>FP</th>
                    <th>SL</th>
                    <th>LP</th>
                    <th>PSL</th>
                    <th>Age</th>
                    <th colspan="1" style="text-align:center;vertical-align:top;min-width: 200px; max-width: 200px; word-wrap: break-word;">SPOC Remark</th>
                </tr>
            </thead>
            <tbody>`;

        let serial_no = 1;
        let overallTotals = { vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0, expected_value: 0, expected_psl: 0, custom_psl_value: 0 ,tot_vac:0,tot_sp:0,tot_fp:0,tot_sl:0,tot_lp:0};
        let rowspan = 1;
        data.forEach((project) => {
            let task_count = (project.tasks.length || 1) + 1; // include task total row



            let color = "";

            if (serial_no % 2 === 0) {
                color = "#ffffff"; 
            } else {
                color = "#e6f2f1"; 
            }
            


            html += `
                <tr class="project-header" style="background-color:${color};color:black;">
        <td rowspan="${task_count}">${serial_no++}</td>
        <td rowspan="${task_count}" class="left-align" style = "color:black;">
            <span class="toggle-btn" style = "color:black;" data-project="${project.name}"  >[+]</span>
            ${project.project_name}<br>${project.territory || '-'}
        </td>
        <td rowspan="${task_count}">${project.priority || '-'}</td>
        <td rowspan="${task_count}">${project.tvac || 0}</td>
        <td rowspan="${task_count}">${project.tsp || 0}</td>
        <td rowspan="${task_count}">${project.tfp || 0}</td>
        <td rowspan="${task_count}">${project.tsl || 0}</td>
        <td rowspan="${task_count}">${project.custom_t_lp || 0}</td>
        <td rowspan="${task_count}">${project.tpsl || 0}</td>
        <td rowspan="${task_count}">${calculateAgeInDays(project.creation)}</td>
       

<td rowspan="${task_count}" class="project-remark-${project.name}" style="text-align:left; vertical-align: middle; min-width:200px; max-width:200px;border-bottom:none !important;">
    <div class="remark-content remark-content-${project.name}">${project.custom_spoc_remark || '-'}</div>
</td>


</tr>
`;
            overallTotals.expected_value += parseFloat(project.expected_value) || 0;
            overallTotals.expected_psl += parseFloat(project.expected_psl) || 0;
            overallTotals.custom_psl_value += parseFloat(project.custom_psl_value) || 0;
            overallTotals.tot_vac+=parseFloat(project.tvac) || 0;
            overallTotals.tot_sp+=parseFloat(project.tsp) || 0;
            overallTotals.tot_fp+=parseFloat(project.tfp) || 0;
            overallTotals.tot_sl+=parseFloat(project.tsl) || 0;
            overallTotals.tot_lp+=parseFloat(project.custom_t_lp) || 0;
                
            if (project.tasks.length > 0) {
                rowspan = project.tasks.length + 2; // header + total
                let task_serial_no = 1;
                let totals = { vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0 };

                const task_count = project.tasks.length;
                let midIndex = Math.floor(project.tasks.length / 2);

                project.tasks.forEach((task, idx) => {
                    totals.vac += task.vac || 0;
                    totals.sp += task.sp || 0;
                    totals.fp += task.fp || 0;
                    totals.sl += task.sl || 0;
                    totals.lp += task.custom_lp || 0;
                    totals.psl += task.psl || 0;

                    html += `
                    <tbody class="project-${project.name}" style="display:none;">
                    <tr>
                        <td colspan="1">${task_serial_no++}</td>
                        <td colspan="1" style="text-align:left;width:5%;"><a href="/app/task/${task.name}">${task.task_name || '-'}</a></td>
                        <td colspan="1">${task.task_priority || '-'}</td>
                        <td colspan="1">${task.vac || 0}</td>
                        <td colspan="1">${task.sp || 0}</td>
                        <td colspan="1">${task.fp || 0}</td>
                        <td colspan="1">${task.sl || 0}</td>
                        <td colspan="1">${task.custom_lp || 0}</td>
                        <td colspan="1">${task.psl || 0}</td>
                        <td colspan="1">${task.age}</td>
                        
                       
                    `;
                    if (idx === midIndex) {
                    html += `
                       
                        <td colspan ="1" style="text-align:left; vertical-align:middle;  border-top: none !important; border-bottom: none !important;">
                            ${project.custom_spoc_remark || '-'}
                        </td>
                        
                    `;
               
                }
    

else{
    html += `
                        <td colspan="1" style="border-top: none !important; border-bottom: none !important;"></td>
         `;    
}



    html += `</tr>`;
                });

                
                overallTotals.vac += totals.vac;
                overallTotals.sp += totals.sp;
                overallTotals.fp += totals.fp;
                overallTotals.sl += totals.sl;
                overallTotals.lp += totals.lp;
                overallTotals.psl += totals.psl;
            
                html += `
                    <tr style="font-weight:bold; background-color:#f9f9f9;">
                        <td colspan="3" style="text-align:center">Task Total</td>
                        <td>${totals.vac}</td>
                        <td>${totals.sp}</td>
                        <td>${totals.fp}</td>
                        <td>${totals.sl}</td>
                        <td>${totals.lp}</td>
                        <td>${totals.psl}</td>
                        <td colspan="1">0</td>
                        <td colspan="1"></td>
                    </tr>
                </tbody>`;
            }
            else {
    html += `<tbody class="project-${project.name}" style="display:none;">
        <tr style="font-weight:bold; background-color:#d0d0d0;">
            <td colspan="11"><center>No Data Available</center></td>
        </tr>
    </tbody>`;
}

        });
        if (data.length > 0) {
            html += `
            <tr style="font-weight:bold; background-color:#d0d0d0;">
                <td colspan="3" class="left-align">Total</td>
                <td>${overallTotals.tot_vac}</td><td>${overallTotals.tot_sp}</td><td>${overallTotals.tot_fp}</td><td>${overallTotals.tot_sl}</td>
                <td>${overallTotals.tot_lp}</td>
                <td>${overallTotals.psl}</td>
                <td>0</td>
                <td colspan="1"></td>
            </tr>`;
        }
        else{
            html += `
            <tr style="font-weight:bold; background-color:#d0d0d0;">
            <td colspan="11"><center>No Data Available</center></td>
            </tr>`;
        }

        html += `</tbody></table></div></div>`;
        return html;
    }




$(".dashboard-card").on("click", function () {
	const $card = $(this);
	$card.addClass("pop-blink");

	setTimeout(() => {
		$card.removeClass("pop-blink");
	}, 300); // match the animation duration
});

	// Clock
	function updateDateTime() {
		const now = new Date();
		const dateStr = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
		const timeStr = now.toLocaleTimeString();
		document.getElementById('current-datetime').innerHTML = `${dateStr} | ${timeStr}`;
	}
	updateDateTime();
	setInterval(updateDateTime, 1000);
    // renderTatCrossedCandidateTable();
	// Buttons
	$(wrapper).on('click', '#refresh-dashboard', () => location.reload());

	$(wrapper).on('click', '#apply-tfp-filter', function () {
		const from_date = $('#tfp-from-date').val();
		const to_date = $('#tfp-to-date').val();
		loadOrderBooking(from_date, to_date);
		loadturnover(from_date, to_date);
		loadtcollection(from_date, to_date);
	});

	// Reusable function to render cards
	// function renderCard(selector, label, value) {
	// 	const formatted = parseFloat(value).toLocaleString('en-IN', {
	// 		style: 'currency',
	// 		currency: 'INR',
	// 		maximumFractionDigits: 0
	// 	});
	// 	$(wrapper).find(selector).html(`
	// 		<div class="card-inner">
	// 			<h3>${label}</h3>
	// 			<div class="amount">${formatted}</div>
	// 		</div>
	// 	`);
	// }
    function renderCard(selector, title, value) {
	const now = new Date();
	const currentMonth = now.getMonth() + 1; // 1–12
	let financialMonth = currentMonth >= 4 ? currentMonth - 3 : currentMonth + 9;

	const avg = value / financialMonth;
	const avg_value = Math.round(avg || 0);

	const formatted = parseFloat(value).toLocaleString('en-IN', {
		style: 'currency',
		currency: 'INR',
		maximumFractionDigits: 0
	});
    const formattedAvg = parseFloat(avg_value).toLocaleString('en-IN', {
            maximumFractionDigits: 0 
        });

let arrowSvg = `
<svg width="60" height="20" viewBox="0 0 60 40">
    <path d="M5 30 L20 20 L35 25 L50 10 L55 5" 
          stroke="black" stroke-width="2" fill="none" 
          stroke-linecap="round" stroke-linejoin="round" 
          style="stroke-dasharray: 4,1;" />
    <polygon points="57,10 52,0 58,0" fill="black"/>
</svg>`;
	$(wrapper).find(selector).html(`
		<div class="card-inner">
			<h3>${title}</h3>
			<div class="amount">${formatted}</div>
            <div style="font-size: 12px; text-align: center;color:red; margin-top: 5px;">[${formattedAvg}]
                </div>
				<div style="font-size: 10px;color:black;text-align: center;">[Avg]</div>
            </div>
	`);
}

	function renderSimpleCard(selector, label, value, color = 'green') {
	$(wrapper).find(selector).html(`
		<div class="card-inner">
			<h3>${label}</h3>
			<div class="amount" style="color: ${color}">${value}</div>
		</div>
	`);
}

	function loadOrderBooking(from_date = null, to_date = null) {
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_order_booking_rec",
		args: { from_date, to_date },
		callback: function(r) {
			const value = r.message || 0;
            const now = new Date();
        const currentMonth = now.getMonth() + 1; // 1-12
        const currentYear = now.getFullYear();

        // Calculate current financial month number
        // April (4) is month 1, March (3) is month 12
        let financialMonth;
        if (currentMonth >= 4) {
            financialMonth = currentMonth - 3;
        } else {
            financialMonth = currentMonth + 9;
        }
			const formatted = parseFloat(value).toLocaleString('en-IN', {
				style: 'currency',
				currency: 'INR',
				maximumFractionDigits: 0
			});
			$(wrapper).find('.order-booking-card').html(`
				<div class="card-inner">
					<h3>Order Booking</h3>
					<div class="amount">${formatted}</div>
                    <div style="font-size: 12px; text-align: center; color: #555;">[Avg: ${avg_value}]</div>
				</div>
			`);
		}
	});
}

	function loadturnover(from_date = null, to_date = null) {
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_turnover_rec",
		args: { from_date, to_date },
		callback: function(r) {
			const value = r.message || 0;
			const formatted = parseFloat(value).toLocaleString('en-IN', {
				style: 'currency',
				currency: 'INR',
				maximumFractionDigits: 0
			});
			$(wrapper).find('.turnover-card').html(`
				<div class="card-inner">
					<h3>Turnover</h3>
					<div class="amount">${formatted}</div>
				</div>
			`);
		}
	});
}

	function loadtcollection(from_date = null, to_date = null) {
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_collection_value_rec",
		args: { from_date, to_date },
		callback: function(r) {
			const value = r.message || 0;
			const formatted = parseFloat(value).toLocaleString('en-IN', {
				style: 'currency',
				currency: 'INR',
				maximumFractionDigits: 0
			});
			$(wrapper).find('.collection-card').html(`
				<div class="card-inner">
					<h3>Collection</h3>
					<div class="amount">${formatted}</div>
				</div>
			`);
		}
	});
}

	// Call and render data
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_order_booking_rec",
		callback: r => renderCard('.order-booking-card', 'Order Booking', r.message || 0)
	});
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_turnover_rec",
		callback: r => renderCard('.turnover-card', 'Turnover', r.message || 0)
	});
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_collection_value_rec",
		callback: r => renderCard('.collection-card', 'Collection', r.message || 0)
	});
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.rec_receivable",
		callback: r => renderCard('.receivable-card', 'Receivable', r.message || 0)
	});
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.rec_to_bill_value",
		callback: r => renderCard('.tobill-card', 'To Bill', r.message || 0)
	});
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.rec_to_deliver_bill_value",
		callback: r => renderCard('.todeliverbill-card', 'To Deliver and Bill', r.message || 0)
	});
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.rec_payable",
		callback: r => renderCard('.payable-card', 'Payable', r.message || 0)
	});
	frappe.call({
		method: 'jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.rec_receivable_table',
		callback: function(r) {
			if (r.message) {
				$('#receivable-so-table-content').html(r.message);
			}
			else {
				$('#receivable-so-table-content').html(`<div style="padding: 10px;text-align:center">No data found</div>`);
			}
		}
	});
	frappe.call({
		method: 'jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.rec_payable_table',
		callback: function(r) {
			if (r.message) {
				$('#payable-so-table-content').html(r.message);
			}
			else {
				$('#payable-so-table-content').html(`<div style="padding: 10px;text-align:center">No data found</div>`);
			}
		}
	});
	
	frappe.call({
		method: 'jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.rec_tobill_table',
		callback: function(r) {
			if (r.message) {
				$('#tobill-so-table-content').html(r.message);
			}
			else {
				$('#tobill-so-table-content').html(`<div style="padding: 10px;text-align:center">No data found</div>`);
			}
		}
	});
	frappe.call({
	method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_project_count",
	callback: r => renderSimpleCard('.project-count-card', '#Project', r.message || 0)
	});

	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_task_count",
		callback: r => renderSimpleCard('.task-count-card', '#Task', r.message || 0)
	});

	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_vacancy_count",
		callback: r => renderSimpleCard('.vacancies-card', '#Vacancies', r.message || 0)
	});

	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_sp_count",
		callback: r => renderSimpleCard('.sp-count-card', '#SP', r.message || 0)
	});

	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_fp_count",
		callback: r => renderSimpleCard('.fp-count-card', '#FP', r.message || 0)
	});

    frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_task_spfp_count",
		callback: r => renderSimpleCard('.fpsp-count-card', '#SP/FP', r.message || 0)
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
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_sl_count",
		callback: r => renderSimpleCard('.sl-count-card', '#SL', r.message || 0)
	});
	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_psl_count",
		callback: r => renderSimpleCard('.psl-count-card', '#PSL', r.message || 0)
	});


function renderTatCrossedCandidateTable() {
	$("#candidate-matrix-table").html(`<div style="padding: 20px; font-weight: bold;">Loading TAT Crossed Candidates...</div>`);

	frappe.call({
		method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_candidates_tat_crossed_from_history",
		callback: function (r) {
			if (r.message && Object.keys(r.message).length > 0) {
				let html = `<table class="table table-bordered" style="font-size: 13px; margin-top: 20px;">
					<thead style="background-color: #002060;color: white;">
						<tr>
							<th>Project Name</th>
							<th>Territory</th>
							<th>Status</th>
							<th>Subject</th>
							<th>#TAT Crossed</th>
						</tr>
					</thead>
					<tbody>`;

				Object.entries(r.message).forEach(([project_name, data]) => {
					(data.status_map || []).forEach(statusData => {
						const subject = statusData.subject || "-";
						const count = statusData.count || 0;
						const ids = statusData.candidates.map(c => `"${c.closure_id}"`); // wrap each ID in quotes

						html += `
							<tr>
								<td style="color:#002060; font-weight: 600;">${project_name}</td>
								<td>${data.territory || "-"}</td>
								<td>${statusData.status}</td>
								<td>${subject}</td>
								<td style="text-align:center;">
									<a href="javascript:void(0)" onclick='frappe.set_route("List", "Candidate", { "name": ["in", [${ids.join(",")}] ] })' style="font-weight:bold;">
										${count}
									</a>
								</td>
							</tr>`;
					});
				});

				html += `</tbody></table>`;
				$("#candidate-matrix-table").html(html);
			} else {
				$("#candidate-matrix-table").html(`<div style="padding: 20px; font-weight: bold; color: #888;">No TAT Crossed Candidates Found</div>`);
			}
		}
	});
}





function formatDate(dateStr) {
	if (!dateStr) return "";
	const d = new Date(dateStr);
	const day = String(d.getDate()).padStart(2, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-based
	const year = d.getFullYear();
	return `${day}-${month}-${year}`;
}


function loadRecLiveStatus() {
frappe.call({
    method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_rec_live_status",
    callback: function (r) {
        if (r.message && r.message.data && Object.keys(r.message.data).length > 0) {
            const { data } = r.message;

            let html = `
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse !important;
                        font-family: "Segoe UI", sans-serif;
                    }
                    table, th, td {
                        border: 1px solid #ced4da !important;
                    }
                    th {
                        background-color: rgb(30, 12, 111) !important;
                        color: white !important;
                        text-align: center;
                        padding: 10px;
                    }
                    td {
                        padding: 8px;
                        text-align: center;
                        font-size: 13px;
                    }
                    .left-align {
                        text-align: left !important;
                        padding-left: 10px !important;
                    }
                    .parent-row {
                        cursor: pointer;
                        background-color: #e0e0e0 !important;
                        font-weight: bold;
                    }
                    .footer-row {
                        background-color: #e9ecef !important;
                        font-weight: bold;
                    }
                    .child-row {
                        display: none;
                        background-color: #f9f9f9 !important;
                    }
                    .child-row td {
                        padding: 6px;
                        text-align: center;
                        font-size: 12px;
                    }
                </style>
            `;

            html += `<table class="table table-bordered main-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Recruiter</th>
                        <th>Positions</th>
                        <th>IDB</th>
                        <th>Source</th>
                        <th>Pending QC</th>
                        <th>Submit (SPOC)</th>
                    </tr>
                </thead>
                <tbody>`;

            let rowCount = 1;
            let total_idb = 0, total_source = 0, total_qc = 0, total_spoc = 0;

            Object.keys(data).forEach((rec, idx) => {
                let recData = data[rec];

                total_idb += recData.idb || 0;
                total_source += recData.source || 0;
                total_qc += recData.qc || 0;
                total_spoc += recData.spoc || 0;

                html += `
                <tr class="parent-row" data-recruiter="${rec}">
                    <td>${rowCount++}</td>
                    <td class="left-align"><span class="toggle-icon" style="float:left">[+]</span> ${rec}</td>
                    <td><b>${recData.positions_count}</b></td>
                    <td><b>${recData.idb}</b></td>
                    <td><b>${recData.source}</b></td>
                    <td><b>${recData.qc}</b></td>
                    <td><b>${recData.spoc}</b></td>
                </tr>`;

                // Add empty child rows for each task
                let tasks = recData.tasks || [];
                tasks.forEach(t => {
                    html += `
                    <tr class="child-row" data-parent="${rec}">
                        <td class="left-align" colspan="3">${t.position}</td>
                        <td>${t.idb}</td>
                        <td>${t.source}</td>
                        <td>${t.qc}</td>
                        <td>${t.spoc}</td>
                    </tr>`;
                });
            });

            html += `
                <tr class="footer-row">
                    <td colspan="3" style="text-align:center;">Overall Totals</td>
                    <td><b>${total_idb}</b></td>
                    <td><b>${total_source}</b></td>
                    <td><b>${total_qc}</b></td>
                    <td><b>${total_spoc}</b></td>
                </tr>
            </tbody></table>`;

            $('#rec-i-live-table').html(html);

            // Toggle child rows
            $('.parent-row').click(function () {
                let recruiter = $(this).data('recruiter');
                let icon = $(this).find('.toggle-icon');
                let childRows = $(`.child-row[data-parent='${recruiter}']`);

                if (childRows.is(':visible')) {
                    childRows.hide();
                    icon.text('[+]');
                } else {
                    childRows.show();
                    icon.text('[-]');
                }
            });

        } else {
            $('#rec-i-live-table').html(`<p style="color:#888;">No live status found.</p>`);
        }
    }
});
}
loadRecLiveStatus()
setInterval(() => {
    loadRecLiveStatus();
}, 300000);
// function renderClosureMatrix(data) {
// 	const statuses = [
// 		"PSL", "Waitlisted", "Sales Order", "Client Offer Letter", "Signed Offer Letter",
// 		"Visa", "Premedical", "PCC", "Certificate Attestation", "Trade Test", "Final Medical",
// 		"Biometric", "Visa Stamping", "Emigration", "Ticket", "Onboarding", "Onboarded"
// 	];

// 	const statusShortCodes = {
// 		"PSL": "PSL", "Waitlisted": "WL", "Sales Order": "SO", "Client Offer Letter": "COL",
// 		"Signed Offer Letter": "SOL", "Visa": "Visa", "Premedical": "PM", "PCC": "PCC",
// 		"Certificate Attestation": "CA", "Trade Test": "Trade Test", "Final Medical": "FM",
// 		"Biometric": "BIO", "Visa Stamping": "VS", "Emigration": "POE", "Ticket": "TKT",
// 		"Onboarding": "OB", "Onboarded": "OBD"
// 	};

// 	const territoryMap = {};
// 	const closureMap = {};

// 	data.forEach(row => {
// 		const terr = row.territory;
// 		const status = row.status;
// 		if (!territoryMap[terr]) territoryMap[terr] = {};
// 		territoryMap[terr][status] = {
// 			count: row.count || 0,
// 			tat_crossed_count: row.tat_crossed_count || 0,
// 			closure_ids: row.closure_ids || []
// 		};
// 		const key = `${terr}__${status}`;
// 		closureMap[key] = row.closure_ids || [];
// 	});

// 	let html = `
// <style>
// 	#closure-matrix-wrapper {
// 		overflow: auto;
// 		width: 100%;
// 		max-height: 500px;
// 	}
// 	#closure-matrix-table {
// 		width: 100%;
// 		border-collapse: collapse;
// 		table-layout: auto;
// 	}
// 	#closure-matrix-table thead th {
// 		position: sticky;
// 		top: 0;
// 		z-index: 2;
// 		background: #002060;
// 		color: white;
// 		text-align: center;
// 	}
// 	#closure-matrix-table td, #closure-matrix-table th {
// 		text-align: center;
// 		padding: 6px;
// 		border: 1px solid #ccc;
// 	}
// 	#closure-matrix-table tbody tr:nth-child(odd) {
// 		background-color: #d9d9d9;
// 	}
// 	.project-row td {
// 		background-color: #f1f9ff;
// 	}
// 	#closure-matrix-table tfoot tr {
// 		background-color: #d0e3f0;
// 		color: #000;
// 		font-weight: bold;
// 	}
// </style>

// <div id="closure-matrix-wrapper">
// <table class="table table-bordered" id="closure-matrix-table" style="font-size: 13px; white-space: nowrap;">
// 	<thead>
// 		<tr>
// 			<th>Territory</th>
// 			${statuses.map(s => `<th title="${s}">${statusShortCodes[s] || s}</th>`).join('')}
// 			<th>Total</th>
// 		</tr>
// 	</thead>
// 	<tbody>`;

// 	for (let terr in territoryMap) {
// 		let rowTotal = 0;
// 		let rowTotals = 0;
// 		statuses.forEach(status => {
// 			const count = territoryMap[terr][status]?.count || 0;
// 			rowTotals += count;
// 		});
// 		if (rowTotals === 0) continue;

// 		html += `<tr>
// 			<td class="territory-cell" style="cursor:pointer; text-align:left;" data-territory="${terr}">
// 				<span class="toggle-icon" style="font-weight:bold; color:#002060; margin-right:4px;float:left;">[+]</span>
// 				<strong>${terr}</strong>
// 			</td>`;

// 		statuses.forEach(status => {
// 			const statusData = territoryMap[terr][status] || { count: 0, tat_crossed_count: 0 };
// 			const count = statusData.count;
// 			const crossed = statusData.tat_crossed_count;
// 			const key = `${terr}__${status}`;
// 			rowTotal += count;
// 			if (crossed > 0) {
// 				html += `<td>${count} / <a href="#" class="tat-link" data-key="${key}" style="color:red;font-weight:bold;">${crossed}</a></td>`;
// 			} else {
// 				html += `<td>${count} / <span style="color:gray;">${crossed}</span></td>`;
// 			}
// 		});
// 		html += `<td style="font-weight: bold;">${rowTotal}</td></tr>`;
// 	}

// 	// Grand totals
// 	let grandTotals = {};
// 	let grandTotalSum = 0;
// 	statuses.forEach(status => grandTotals[status] = 0);
// 	for (let terr in territoryMap) {
// 		statuses.forEach(status => {
// 			const count = territoryMap[terr][status]?.count || 0;
// 			grandTotals[status] += count;
// 			grandTotalSum += count;
// 		});
// 	}

// 	html += `</tbody>
// 	<tfoot><tr>
// 		<td>Grand Total</td>
// 		${statuses.map(status => `<td>${grandTotals[status]}</td>`).join("")}
// 		<td>${grandTotalSum}</td>
// 	</tr></tfoot>
// </table></div>`;

// 	// $("#closure-matrix-table").html(html);

// 	// TAT crossed link (territory-level)
// 	$(".tat-link").on("click", function (e) {
// 		e.preventDefault();
// 		const key = $(this).data("key");
// 		const ids = closureMap[key] || [];
// 		if (!ids.length) return frappe.msgprint("No TAT crossed Closure records.");
// 		frappe.set_route("List", "Closure", { name: ["in", ids] });
// 	});

// 	// Expand territory for project breakdown
// 	$(".territory-cell").on("click", function () {
// 		const $cell = $(this);
// 		const $row = $cell.closest("tr");
// 		const territory = $cell.data("territory");
// 		const $icon = $cell.find(".toggle-icon");

// 		// Collapse if open
// 		if ($row.next().hasClass("project-row")) {
// 			while ($row.next().hasClass("project-row")) {
// 				$row.next().remove();
// 			}
// 			$icon.text("[+]");
// 			return;
// 		}

// 		$(".project-row").remove();
// 		$(".toggle-icon").text("[+]");

// 		$icon.text("[−]");

// 		frappe.call({
// 			method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_project_details_for_territory",
// 			args: { territory },
// 			callback: function (r) {
// 				if (r.message && r.message.length) {
// 					let projectMap = {};
// 					let projectClosureMap = {};

// 					r.message.forEach(row => {
// 						const projectId = row.project;
// 						const status = row.status;

// 						if (!projectMap[projectId]) {
// 							projectMap[projectId] = {
// 								name: row.project_name || row.project,
// 								statusCounts: {}
// 							};
// 						}
// 						projectMap[projectId].statusCounts[status] = {
// 							count: row.count || 0,
// 							tat_crossed_count: row.tat_crossed_count || 0,
// 							closure_ids: row.closure_ids || []
// 						};
// 						projectClosureMap[`${projectId}__${status}`] = row.closure_ids || [];
// 					});

// 					Object.entries(projectMap).forEach(([projectId, data]) => {
// 						const { name, statusCounts } = data;
// 						let total = 0;

// 						statuses.forEach(status => {
// 							total += statusCounts[status]?.count || 0;
// 						});
// 						if (total === 0) return;

// 						let breakdownRow = `<tr class="project-row">`;
// 						breakdownRow += `<td style="text-align:left;padding-left:20px;">
// 							<a href="/app/project/${projectId}" target="_blank" style="font-weight:bold;">${name}</a>
// 						</td>`;

// 						statuses.forEach(status => {
// 							const count = statusCounts[status]?.count || 0;
// 							const crossed = statusCounts[status]?.tat_crossed_count || 0;
// 							const key = `${projectId}__${status}`;
// 							if (crossed > 0) {
// 								breakdownRow += `<td>${count} / <a href="#" class="tat-link-pro" data-key="${key}" style="color:red;font-weight:bold;">${crossed}</a></td>`;
// 							} else {
// 								breakdownRow += `<td>${count} / <span style="color:gray;">${crossed}</span></td>`;
// 							}
// 						});

// 						breakdownRow += `<td style="font-weight:bold;">${total}</td></tr>`;
// 						$row.after(breakdownRow);
// 					});

// 					// Project-level TAT links
// 					$(".tat-link-pro").off("click").on("click", function (e) {
// 						e.preventDefault();
// 						const key = $(this).data("key");
// 						const ids = projectClosureMap[key] || [];
// 						if (!ids.length) return frappe.msgprint("No TAT crossed Closure records.");
// 						frappe.set_route("List", "Closure", {
// 							name: ["in", ids]
// 						});
// 					});
// 				} else {
// 					frappe.msgprint("No project data for this territory.");
// 				}
// 			}
// 		});
// 	});
// }


// Initial call
// frappe.call({
// 	method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_territory_status_matrix",
// 	callback: function (r) {
// 		if (r.message) {
// 			renderClosureMatrix(r.message);
// 		} else {
// 			$("#closure-matrix-table").html("No data found.");
// 		}
// 	}
// });






frappe.call({
    method: "frappe.client.get_list",
    args: {
        doctype: "User",
        fields: ["name","full_name"],
        filters: { enabled: 1 ,user_type:"System User"},
        limit_page_length: 2000 // Optional: increase limit if you have many users
    },
    callback: function (res) {
        if (res.message) {
            let select = $('#monitor-executive');
            select.empty().append(`<option></option>`); 
            res.message.forEach(user => {
                select.append(
                    `<option value="${user.name}">${user.full_name || user.name}</option>`
                );
            });

            select.select2({
                placeholder: "Select Executive",
                width: '20%'
            });
        }
    }
});

// commented method
// frappe.call({
//     method: "frappe.client.get_list",
//     args: {
//         doctype: "REC Week Plan",
//         fields: ["name", "start_date", "end_date"],
//         order_by: "creation desc",
//         limit_page_length: 5
//     },
//     callback: function (res) {
//         if (res.message && res.message.length > 0) {
//             let options = res.message.map((d, idx) => {
//                 let selected = idx === 0 ? 'selected' : '';
//                 return `<option value="${d.name}" ${selected}>${d.name}</option>`;
//             });
           
//             let select = $('#monitor-week-plan');
// select.empty().append(`<option></option>`); // Placeholder

// res.message.forEach((plan, idx) => {
//     select.append(
//         `<option value="${plan.name}" data-start="${plan.start_date}" data-end="${plan.end_date}">
//             ${plan.name}
//         </option>`
//     );
// });

// // Initialize Select2
// select.select2({
//     placeholder: "Select Week Plan",
//     width: '20%'
// });

// // Set default selection (first option)
// let defaultPlan = res.message[0];
// select.val(defaultPlan.name).trigger('change');
// $('#monitor-from-date').val(defaultPlan.start_date);
// $('#monitor-to-date').val(defaultPlan.end_date);

// // Handle change to update from/to date
// select.on('change', function () {
//     let selected = $(this).find('option:selected');
//     let start = selected.data('start');
//     let end = selected.data('end');
//     $('#monitor-from-date').val(start || '');
//     $('#monitor-to-date').val(end || '');
// });

//              let from_date = $('#monitor-from-date').val();
//             let to_date = $('#monitor-to-date').val();
//             let executive = $('#monitor-executive').val();
//             let week_plan = $('#monitor-week-plan').val();
//             frappe.call({
//     method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_planned_work_monitor",
//     args: {
//         start_date: from_date,
//         end_date: to_date,
//         executive: executive,
//         week_plan: week_plan
//     },
//     callback: function (r) {
//         if (r.message && r.message.data && Object.keys(r.message.data).length > 0) {
//             const { date_headers, raw_dates, data } = r.message;

//             let html = ` <style>
//                     table {
//                         width: 100%;
//                         border-collapse: collapse !important;
//                         font-family: "Segoe UI", sans-serif;
//                     }
//                     table, th, td {
//                         border: 1px solid #ced4da !important;
//                     }
//                     th {
//                         background-color:rgb(30, 12, 111) !important;
//                         color: white !important;
//                         text-align: center;
//                         padding: 10px;
//                     }
//                     td {
//                         padding: 8px;
//                         text-align: center;
//                         font-size: 13px;
//                     }
//                     .left-align {
//                         text-align: left !important;
//                         padding-left: 10px !important;
//                     }
//                     .parent-row {
//                         cursor: pointer;
//                         background-color: #e0e0e0 !important;
//                         font-weight: bold;
//                     }
//                     .child-row:nth-child(even) {
//                         background-color: #f8f9fa !important;
//                     }
//                     .toggle-icon {
//                         float: right;
//                         font-weight: bold;
//                         color: #6c757d;
//                     }
//                     .rc-header {
//                         background-color: #bbdefb !important;
//                         color: black !important;
//                     }
//                     .ac-header {
//                         background-color: #e1f5fe !important;
//                         color: black !important;
//                     }
//                     .footer-row {
//                         background-color: #e9ecef !important;
//                         font-weight: bold;
//                     }
//                 </style>`;

//             html += `<table class="table table-bordered">`;
//             html += `
//                 <thead>
//                     <tr>
//                         <th rowspan="2">S.No</th>
//                         <th rowspan="2">EXE</th>
//                         <th rowspan="2">Project</th>
//                         <th rowspan="2">Position</th>
//                         <th rowspan="2">Total RC</th>
//                         <th rowspan="2">Total AC</th>`;
//             date_headers.forEach(d => {
//                 html += `<th colspan="2">${d}</th>`;
//             });
//             html += `</tr><tr>`;
//             raw_dates.forEach(() => {
//                 html += `<th class="rc-header">RC</th><th class="ac-header">AC</th>`;
//             });
//             html += `</tr></thead><tbody>`;

//             let groupIdCounter = 1;
//             let rowCount = 1;
//             let rCount=1;
//             let overall_total_rc = 0;
//             let overall_total_ac = 0;
//             let daywise_rc_totals = {};
//             let daywise_ac_totals = {};

//             raw_dates.forEach(d => {
//                 daywise_rc_totals[d] = 0;
//                 daywise_ac_totals[d] = 0;
//             });

//             Object.keys(data).forEach((exe) => {
//                 let groupId = `group-${groupIdCounter++}`;
//                 let tasks = data[exe];
//                 let totalTasks = Object.keys(tasks).length;
//                 let exe_rt_totals = {};
//                 let exe_ac_totals = {};
//                 let exe_total_rc = 0;

//                 raw_dates.forEach(d => {
//                     exe_rt_totals[d] = 0;
//                     exe_ac_totals[d] = 0;
//                 });

//                 for (let task in tasks) {
//                     raw_dates.forEach(d => {
//                         let rt = tasks[task].dates[d]?.rt || 0;
//                         let ac = tasks[task].dates[d]?.ac || 0;

//                         exe_rt_totals[d] += rt;
//                         exe_ac_totals[d] += ac;
//                         exe_total_rc += rt;

//                         daywise_rc_totals[d] += rt;
//                         daywise_ac_totals[d] += ac;
//                     });
//                 }

//                 let exe_total_ac = Object.values(exe_ac_totals).reduce((a, b) => a + b, 0);
//                 overall_total_rc += exe_total_rc;
//                 overall_total_ac += exe_total_ac;
//                 let emp_meta = r.message.executive_meta?.[exe] || {};
//                 let emp_name = emp_meta.name || exe;
//                 let emp_img = emp_meta.image ? `<img src="${emp_meta.image}" style="height:20px;width:20px;border-radius:50%;margin-right:5px;">` : '';
//                                 html += `
//                     <tr class="parent-row" data-group="${groupId}">
//                     <td>${rCount++}</td>
//                         <td class="left-align">
// 	<div style="display: flex; align-items: center; justify-content: space-between;">
// 		<span>
// 			<span class="toggle-icon" style="float:left">[+]</span>
// 			${emp_name}
// 		</span>
// 		<span>${emp_img}</span>
// 	</div>
// </td>

//                         <td></td>
//                          <td>${totalTasks}</td>
//                         <td><b>${exe_total_rc}</b></td>
//                         <td><b>${exe_total_ac}</b></td>`;

//                 raw_dates.forEach(d => {
//                     html += `<td><b>${exe_rt_totals[d]}</b></td><td><b>${exe_ac_totals[d]}</b></td>`;
//                 });

//                 html += `</tr>`;
//                 let sr_percent = exe_total_rc > 0 ? ((exe_total_ac / exe_total_rc) * 100).toFixed(2) : '0.00';
//                 html += `
//                     <tr class="child-row ${groupId}" style="display: none; background-color: #d1ecf1; font-weight: bold;">
//                         <td colspan="4" style="text-align:center;color: #340dfaff;">Strike Rate (SR)%</td>
//                         <td colspan="2" style="color: #340dfaff;">${sr_percent}%</td>`;
//                 raw_dates.forEach(d => {
//                     const rc = exe_rt_totals[d];
//                     const ac = exe_ac_totals[d];
//                     const daily_sr = rc > 0 ? ((ac / rc) * 100).toFixed(2) : '0.00';
//                     html += `<td colspan="2" style="color: #340dfaff;">${daily_sr}%</td>`;
//                 });
//                 html += `</tr>`;

//                 // Child rows (tasks)
//                 for (let task in tasks) {
//                     let taskData = tasks[task];
//                     let task_total_rc = 0;
//                     let task_total_ac = 0;

//                     raw_dates.forEach(d => {
//                         task_total_rc += taskData.dates[d]?.rt || 0;
//                         task_total_ac += taskData.dates[d]?.ac || 0;
//                     });

//                     html += `<tr class="child-row ${groupId}" style="display: none;">
//                     <td>${rowCount++}</td>
//                         <td class="left-align">${taskData.subject || ""}</td>
//                         <td class="left-align">${taskData.project || ""}${taskData.project_name ? ' - ' + taskData.project_name : ''}</td>
//                         <td class="left-align">${task}</td>
//                         <td>${task_total_rc}</td>
//                         <td>${task_total_ac}</td>`;
//                     raw_dates.forEach(d => {
//                         html += `<td>${taskData.dates[d]?.rt || 0}</td><td>${taskData.dates[d]?.ac || 0}</td>`;
//                     });
//                     html += `</tr>`;
//                 }
//             });

//             // Footer
//             html += `
//                 <tr class="footer-row">
//                     <td colspan="4" style="text-align:center">Overall Totals</td>
//                     <td><b>${overall_total_rc}</b></td>
//                     <td><b>${overall_total_ac}</b></td>`;
//             raw_dates.forEach(d => {
//                 html += `<td><b>${daywise_rc_totals[d]}</b></td><td><b>${daywise_ac_totals[d]}</b></td>`;
//             });
//             html += `</tr>`;

//             let overall_sr_percent = overall_total_rc > 0 ? ((overall_total_ac / overall_total_rc) * 100).toFixed(2) : '0.00';
//             html += `
//                 <tr class="footer-row" style="background-color: #cfe2ff;">
//                     <td colspan="4" style="text-align:center;">Overall Strike Rate (SR) %</td>
//                     <td colspan="2" style="color: #084298;"><b>${overall_sr_percent}%</b></td>`;
//             raw_dates.forEach(d => {
//                 const rc = daywise_rc_totals[d];
//                 const ac = daywise_ac_totals[d];
//                 const sr = rc > 0 ? ((ac / rc) * 100).toFixed(2) : '0.00';
//                 html += `<td colspan="2" style="color: #084298;"><b>${sr}%</b></td>`;
//             });
//             html += `</tr></tbody></table>`;

//             $('#rec-i-monitor-table').html(html);

//             $('.parent-row').click(function () {
//                 let groupId = $(this).data('group');
//                 let icon = $(this).find('.toggle-icon');
//                 $(`.${groupId}`).toggle();
//                 icon.text(icon.text() === '[+]' ? '[-]' : '[+]');
//             });

//         } else {
//             $('#rec-i-monitor-table').html(`<p style="color: #888;">No planned work found for the selected dates.</p>`);
//         }
//     }
// });
//         }
//     }
// });


// On click filter
$('#apply-monitor-filter').on('click', function () {
    let from_date = $('#monitor-from-date').val();
    let to_date = $('#monitor-to-date').val();
    let executive = $('#monitor-executive').val();
    let week_plan = $('#monitor-week-plan').val();
	console.log(from_date)
	console.log(to_date)
   
	frappe.call({
    method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_planned_work_monitor_filter",
    args: {
        start_date: from_date,
        end_date: to_date,
        executive: executive,
        week_plan: week_plan
    },
     callback: function (r) {
        if (r.message && r.message.data && Object.keys(r.message.data).length > 0) {
            const { date_headers, raw_dates, data } = r.message;

            let html = ` <style>
                    table {
                        width: 100%;
                        border-collapse: collapse !important;
                        font-family: "Segoe UI", sans-serif;
                    }
                    table, th, td {
                        border: 1px solid #ced4da !important;
                    }
                    th {
                        background-color:rgb(30, 12, 111) !important;
                        color: white !important;
                        text-align: center;
                        padding: 10px;
                    }
                    td {
                        padding: 8px;
                        text-align: center;
                        font-size: 13px;
                    }
                    .left-align {
                        text-align: left !important;
                        padding-left: 10px !important;
                    }
                    .parent-row {
                        cursor: pointer;
                        background-color: #e0e0e0 !important;
                        font-weight: bold;
                    }
                    .child-row:nth-child(even) {
                        background-color: #f8f9fa !important;
                    }
                    .toggle-icon {
                        float: right;
                        font-weight: bold;
                        color: #6c757d;
                    }
                    .rc-header {
                        background-color: #bbdefb !important;
                        color: black !important;
                    }
                    .ac-header {
                        background-color: #e1f5fe !important;
                        color: black !important;
                    }
                    .footer-row {
                        background-color: #e9ecef !important;
                        font-weight: bold;
                    }
                </style>`;

            html += `<table class="table table-bordered">`;
            html += `
                <thead>
                    <tr>
                        <th rowspan="2">S.No</th>
                        <th rowspan="2">EXE</th>
                        <th rowspan="2">Project</th>
                        <th rowspan="2">Position</th>
                        <th rowspan="2">Total RC</th>
                        <th rowspan="2">Total AC</th>`;
            date_headers.forEach(d => {
                html += `<th colspan="2">${d}</th>`;
            });
            html += `</tr><tr>`;
            raw_dates.forEach(() => {
                html += `<th class="rc-header">RC</th><th class="ac-header">AC</th>`;
            });
            html += `</tr></thead><tbody>`;

            let groupIdCounter = 1;
            let rowCount = 1;
            let rCount=1;
            let overall_total_rc = 0;
            let overall_total_ac = 0;
            let daywise_rc_totals = {};
            let daywise_ac_totals = {};

            raw_dates.forEach(d => {
                daywise_rc_totals[d] = 0;
                daywise_ac_totals[d] = 0;
            });

            Object.keys(data).forEach((exe) => {
                let groupId = `group-${groupIdCounter++}`;
                let tasks = data[exe];
                let totalTasks = Object.keys(tasks).length;
                let exe_rt_totals = {};
                let exe_ac_totals = {};
                let exe_total_rc = 0;

                raw_dates.forEach(d => {
                    exe_rt_totals[d] = 0;
                    exe_ac_totals[d] = 0;
                });

                for (let task in tasks) {
                    raw_dates.forEach(d => {
                        let rt = tasks[task].dates[d]?.rt || 0;
                        let ac = tasks[task].dates[d]?.ac || 0;

                        exe_rt_totals[d] += rt;
                        exe_ac_totals[d] += ac;
                        exe_total_rc += rt;

                        daywise_rc_totals[d] += rt;
                        daywise_ac_totals[d] += ac;
                    });
                }

                let exe_total_ac = Object.values(exe_ac_totals).reduce((a, b) => a + b, 0);
                overall_total_rc += exe_total_rc;
                overall_total_ac += exe_total_ac;
                let emp_meta = r.message.executive_meta?.[exe] || {};
                let emp_name = emp_meta.name || exe;
                let emp_img = emp_meta.image ? `<img src="${emp_meta.image}" style="height:20px;width:20px;border-radius:50%;margin-right:5px;">` : '';
                                html += `
                    <tr class="parent-row" data-group="${groupId}">
                    <td>${rCount++}</td>
                        <td class="left-align">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span>
                        <span class="toggle-icon" style="float:left">[+]</span>
                        ${emp_name}
                    </span>
                    <span>${emp_img}</span>
                </div>
            </td>

                        <td></td>
                         <td>${totalTasks}</td>
                        <td><b>${exe_total_rc}</b></td>
                        <td><b>${exe_total_ac}</b></td>`;

                raw_dates.forEach(d => {
                    html += `<td><b>${exe_rt_totals[d]}</b></td><td><b>${exe_ac_totals[d]}</b></td>`;
                });

                html += `</tr>`;
                let sr_percent = exe_total_rc > 0 ? ((exe_total_ac / exe_total_rc) * 100).toFixed(2) : '0.00';
                html += `
                    <tr class="child-row ${groupId}" style="display: none; background-color: #d1ecf1; font-weight: bold;">
                        <td colspan="4" style="text-align:center;color: #340dfaff;">Strike Rate (SR)%</td>
                        <td colspan="2" style="color: #340dfaff;">${sr_percent}%</td>`;
                raw_dates.forEach(d => {
                    const rc = exe_rt_totals[d];
                    const ac = exe_ac_totals[d];
                    const daily_sr = rc > 0 ? ((ac / rc) * 100).toFixed(2) : '0.00';
                    html += `<td colspan="2" style="color: #340dfaff;">${daily_sr}%</td>`;
                });
                html += `</tr>`;

                for (let task in tasks) {
                    let taskData = tasks[task];
                    let task_total_rc = 0;
                    let task_total_ac = 0;

                    raw_dates.forEach(d => {
                        task_total_rc += taskData.dates[d]?.rt || 0;
                        task_total_ac += taskData.dates[d]?.ac || 0;
                    });

                    html += `<tr class="child-row ${groupId}" style="display: none;">
                    <td>${rowCount++}</td>
                        <td class="left-align">${taskData.subject || ""}</td>
                        <td class="left-align">${taskData.project || ""}${taskData.project_name ? ' - ' + taskData.project_name : ''}</td>
                        <td class="left-align">${task}</td>
                        <td>${task_total_rc}</td>
                        <td>${task_total_ac}</td>`;
                    raw_dates.forEach(d => {
                        html += `<td>${taskData.dates[d]?.rt || 0}</td><td>${taskData.dates[d]?.ac || 0}</td>`;
                    });
                    html += `</tr>`;
                }
            });

            html += `
                <tr class="footer-row">
                    <td colspan="4" style="text-align:center">Overall Totals</td>
                    <td><b>${overall_total_rc}</b></td>
                    <td><b>${overall_total_ac}</b></td>`;
            raw_dates.forEach(d => {
                html += `<td><b>${daywise_rc_totals[d]}</b></td><td><b>${daywise_ac_totals[d]}</b></td>`;
            });
            html += `</tr>`;

            let overall_sr_percent = overall_total_rc > 0 ? ((overall_total_ac / overall_total_rc) * 100).toFixed(2) : '0.00';
            html += `
                <tr class="footer-row" style="background-color: #cfe2ff;">
                    <td colspan="4" style="text-align:center;">Overall Strike Rate (SR) %</td>
                    <td colspan="2" style="color: #084298;"><b>${overall_sr_percent}%</b></td>`;
            raw_dates.forEach(d => {
                const rc = daywise_rc_totals[d];
                const ac = daywise_ac_totals[d];
                const sr = rc > 0 ? ((ac / rc) * 100).toFixed(2) : '0.00';
                html += `<td colspan="2" style="color: #084298;"><b>${sr}%</b></td>`;
            });
            html += `</tr></tbody></table>`;

            $('#rec-i-monitor-table').html(html);

            $('.parent-row').click(function () {
                let groupId = $(this).data('group');
                let icon = $(this).find('.toggle-icon');
                $(`.${groupId}`).toggle();
                icon.text(icon.text() === '[+]' ? '[-]' : '[+]');
            });

        } else {
            $('#rec-i-monitor-table').html(`<p style="color: #888;">No planned work found for the selected dates.</p>`);
        }
    }
});


})

// second new


// Load week plans and setup select2
frappe.call({
    method: "frappe.client.get_list",
    args: {
        doctype: "REC Week Plan",
        fields: ["name", "start_date", "end_date"],
        order_by: "creation desc",
        limit_page_length: 5
    },
    callback: function(res) {
        if (res.message && res.message.length > 0) {
            let select = $('#monitor-week-plan');
            select.empty().append(`<option></option>`);

            res.message.forEach((plan, idx) => {
                let selected = idx === 0 ? 'selected' : '';
                select.append(
                    `<option value="${plan.name}" data-start="${plan.start_date}" data-end="${plan.end_date}" ${selected}>
                        ${plan.name}
                    </option>`
                );
            });

            select.select2({ placeholder: "Select Week Plan", width: '20%' });

            // Set default plan dates
            let defaultPlan = res.message[0];
            $('#monitor-from-date').val(defaultPlan.start_date);
            $('#monitor-to-date').val(defaultPlan.end_date);

            select.on('change', function () {
                let selected = $(this).find('option:selected');
                $('#monitor-from-date').val(selected.data('start') || '');
                $('#monitor-to-date').val(selected.data('end') || '');
            });

            loadPlannedWork();
        }
    }
});


frappe.call({
    method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_dropped_closure_active_so",
    callback: function(r) {
        let data = r.message || [];
        render_table("monitor-table-1", data);
    }
});
document.getElementById("loading-table-2").style.display = "block";

frappe.call({
    method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_arrived_closure_active_so",
    callback: function(r) {

        let data = r.message || [];

        render_table("monitor-table-2", data);
        document.getElementById("loading-table-2").style.display = "none";
    }
});

function render_table(container_id, data) {

    let container = document.getElementById(container_id);

    if (!container) return;

    if (!data || data.length === 0) {
        container.innerHTML = `<p style="text-align:center;">No Data Available</p>`;
        return;
    }

    let html = `
        <div class="custom-table-wrapper">
            <table class="custom-table">
                <thead>
                    <tr>
                        <th>S#</th>
                        <th>Cl#</th>
                        <th>PP#</th>
                        <th>Name</th>
                        <th>Client</th>
                    </tr>
                </thead>
                <tbody>
    `;
    let s_no = 1

    data.forEach(row => {
        html += `
            <tr>
                <td>${s_no++}</td>
                <td>
                    <a href="/app/closure/${row.closure_id}" target="_blank">
                        ${row.closure_id || "-"}
                    </a>
                </td>
                <td>${row.passport_number || "-"}</td>
                <td style="text-align:left;">${row.name || "-"}</td>
                <td style="text-align:left;">${row.client || "-"}</td>
            </tr>
        `;
        
    });
    

    html += `
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = html;
}

function loadPlannedWork() {
    let from_date = $('#monitor-from-date').val();
    let to_date = $('#monitor-to-date').val();
    let executive = $('#monitor-executive').val();
    let week_plan = $('#monitor-week-plan').val();

    $('#rec-i-monitor-table').html(`
        <div style="display:flex; justify-content:center; align-items:center; height:200px;">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem; margin-right:10px;"></div>
            <span style="font-size:16px; color:#555;">Loading data...</span>
        </div>
    `);

    frappe.call({
        method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_planned_work_monitor_filter",
        args: { start_date: from_date, end_date: to_date, executive: executive, week_plan: week_plan },
        callback: async function(r) {
            if (r.message && r.message.data && Object.keys(r.message.data).length > 0) {
                await renderMonitorTableAsync(r.message);
            } else {
                $('#rec-i-monitor-table').html(`<p style="color:#888;">No planned work found for the selected dates.</p>`);
            }
        }
    });
}
loadPlannedWork();

setInterval(loadPlannedWork, 300000);

async function renderMonitorTableAsync(msg) {
    const { date_headers, raw_dates, data } = msg;
    let now = new Date();
    let formattedTime = now.toLocaleString("en-GB", { 
        day: "2-digit", month: "2-digit", year: "numeric", 
        hour: "2-digit", minute: "2-digit" 
    }).replace(",", " -");

    let html = `<style>
        table { width: 100%; border-collapse: collapse !important; font-family: "Segoe UI", sans-serif; }
        table, th, td { border: 1px solid #ced4da !important; }
        th { background-color: rgb(30,12,111) !important; color: white !important; text-align: center; padding: 10px; }
        td { padding: 8px; text-align: center; font-size: 13px; }
        .left-align { text-align: left !important; padding-left: 10px !important; }
        .parent-row { cursor: pointer; background-color: #e0e0e0 !important; font-weight: bold; }
        .child-row:nth-child(even) { background-color: #f8f9fa !important; }
        .toggle-icon { float: right; font-weight: bold; color: #6c757d; }
        .rc-header { background-color: #bbdefb !important; color: black !important; }
        .ac-header { background-color: #e1f5fe !important; color: black !important; }
        .current-status-header { background-color: red !important; color: white !important; text-align: center; padding: 10px; }
        .footer-row { background-color: #e9ecef !important; font-weight: bold; }
        .sr-row { background-color: #d1ecf1 !important; font-weight: bold; color: #340dfaff; }
    </style>`;

    html += `<table class="table table-bordered"><thead>
    <tr>
        <th rowspan="2">S.No</th>
        <th rowspan="2">Teammate</th>
        <th rowspan="2">Project</th>
        <th rowspan="2">Position</th>
        <th rowspan="2">Total RC</th>
        <th rowspan="2">Total AC</th>
        <th colspan="5">
            Current Status <br>
            <span style="font-size:11px; font-weight:normal;">(${formattedTime})</span>
        </th>`;

    date_headers.forEach(d => html += `<th colspan="2">${d}</th>`);
    html += `</tr><tr>`;

    // Instead of just looping, write each header explicitly
    html += `<th class="current-status-header">IDB</th>`;
    html += `<th class="current-status-header">SRC</th>`;
    html += `<th class="current-status-header">PQC</th>`;
    html += `<th class="rc-header" style="background-color:#2196F3; color:white;">RC</th>`; // New RC column in blue
    html += `<th class="current-status-header">SUB</th>`;

    // ['IDB','SRC','PQC','SUB'].forEach(status => html += `<th class="current-status-header">${status}</th>`);
    raw_dates.forEach(() => html += `<th class="rc-header">RC</th><th class="ac-header">AC</th>`);
    html += `</tr></thead><tbody>`;

    let groupIdCounter = 1, overall_total_rc = 0, overall_total_ac = 0;
    let daywise_rc_totals = {}, daywise_ac_totals = {};
    let overall_status_totals = { "IDB": 0, "Sourced": 0, "Pending QC": 0, "Submit(SPOC)": 0 };
    raw_dates.forEach(d => { daywise_rc_totals[d]=0; daywise_ac_totals[d]=0; });
    let statusCalls = [];
    Object.keys(data).forEach(exe => {
        let tasks = data[exe];
        for (let task in tasks) {
            let taskData = tasks[task];
            statusCalls.push(frappe.call({
                method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_current_status_counts",
                args: { executive: exe, project: taskData.project, task: taskData.name || task, date: frappe.datetime.get_today() },
                freeze: false
            }));
        }
    });

    let statusResults = await Promise.all(statusCalls);
    let statusMap = {};
    let idx = 0;
    Object.keys(data).forEach(exe => {
        let tasks = data[exe];
        for (let task in tasks) {
            let counts = statusResults[idx].message?.counts || {};
            let executive_only = statusResults[idx].message?.executive_only_counts || {};
            statusMap[exe+"_"+task] = { counts, executive_only };

            idx++;
        }
    });

    // Render rows per executive
    Object.keys(data).forEach((exe, exeIndex) => {
        let groupId = `group-${groupIdCounter++}`;
        let tasks = data[exe];

        let exe_total_rc = 0, exe_total_ac = 0;
        let exe_rt_totals = {}, exe_ac_totals = {};
        let exe_status_totals = { "IDB":0,"Sourced":0,"Pending QC":0,"Submit(SPOC)":0 };
        raw_dates.forEach(d => { exe_rt_totals[d]=0; exe_ac_totals[d]=0; });

        for (let task in tasks) {
            let taskData = tasks[task];
            raw_dates.forEach(d => {
                let rt = taskData.dates[d]?.rt || 0;
                let ac = taskData.dates[d]?.ac || 0;
                exe_rt_totals[d] += rt; exe_ac_totals[d] += ac;
                exe_total_rc += rt; exe_total_ac += ac;
                daywise_rc_totals[d] += rt; daywise_ac_totals[d] += ac;
            });
            let counts = statusMap[exe+"_"+task]?.counts || {};
            Object.keys(exe_status_totals).forEach(st => { exe_status_totals[st] += counts[st] || 0; });
        }

        overall_total_rc += exe_total_rc; overall_total_ac += exe_total_ac;
        Object.keys(overall_status_totals).forEach(st => { overall_status_totals[st] += exe_status_totals[st]; });

        let emp_meta = msg.executive_meta?.[exe] || {};
        let emp_name = emp_meta.name || exe;
        let emp_img = emp_meta.image ? `<img src="${emp_meta.image}" style="height:20px;width:20px;border-radius:50%;margin-right:5px;">` : '';
        let today = frappe.datetime.get_today(); 
        let exe_current_rc = exe_rt_totals[today] || 0;
        html += `<tr class="parent-row" data-group="${groupId}">
            <td>${exeIndex+1}</td>
            <td class="left-align">
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <span><span class="toggle-icon" style="float:left">[+]</span>${emp_name}</span>
                    <span>${emp_img}</span>
                </div>
            </td>
            <td></td>
            <td>${Object.keys(tasks).length}</td>
            <td><b>${exe_total_rc}</b></td>
            <td><b>${exe_total_ac}</b></td>
            <td><b>${exe_status_totals["IDB"] + (statusResults[0].message?.executive_idb_only || 0)}</b></td>            <td><b>${exe_status_totals["Sourced"] + (statusResults[0].message?.executive_only_counts?.["Sourced"] || 0)}</b></td>
            <td><b>${exe_status_totals["Pending QC"] + (statusResults[0].message?.executive_only_counts?.["Pending QC"] || 0)}</b></td>
            <td><b>${exe_current_rc || 0}</b></td>
            <td><b>${exe_status_totals["Submit(SPOC)"]}</b></td>`;
        raw_dates.forEach(d => html += `<td><b>${exe_rt_totals[d]}</b></td><td><b>${exe_ac_totals[d]}</b></td>`);
        html += `</tr>`;

        let exe_sr = exe_total_rc>0 ? ((exe_total_ac/exe_total_rc)*100).toFixed(2) : '0.00';
        html += `<tr class="sr-row ${groupId}" style="display:none;">
            <td colspan="4" style="text-align:center;">Strike Rate (SR)%</td>
            <td colspan="2"><b>${exe_sr}%</b></td>
            <td colspan="5"></td>`;
        raw_dates.forEach(d => {
            let daily_sr = exe_rt_totals[d]>0 ? ((exe_ac_totals[d]/exe_rt_totals[d])*100).toFixed(2) : '0.00';
            html += `<td colspan="2"><b>${daily_sr}%</b></td>`;
        });
        html += `</tr>`;

        let taskSNo = 1;
        for (let task in tasks) {
            let taskData = tasks[task];
            let task_total_rc=0, task_total_ac=0;
            raw_dates.forEach(d=>{ task_total_rc+=taskData.dates[d]?.rt||0; task_total_ac+=taskData.dates[d]?.ac||0; });
           let currentDate = raw_dates.find(d => d === frappe.datetime.get_today());
            let currentDateRC = currentDate ? taskData.dates[currentDate]?.rt || 0 : 0;

            let counts = statusMap[exe+"_"+task]?.counts || {};
            html += `<tr class="child-row ${groupId}" style="display:none;">
                <td>${taskSNo++}</td>
                <td class="left-align">${taskData.subject||""}</td>
                <td class="left-align">${taskData.project||""}${taskData.project_name? ' - '+taskData.project_name:''}</td>
                <td class="left-align">${task}</td>
                <td>${task_total_rc}</td>
                <td>${task_total_ac}</td>
                <td>${counts["IDB"]||0}</td>
                <td>${counts["Sourced"]||0}</td>
                <td>${counts["Pending QC"]||0}</td>
                <td>${currentDateRC}</td>
                <td>${counts["Submit(SPOC)"]||0}</td>`;
            raw_dates.forEach(d=>html+=`<td>${taskData.dates[d]?.rt||0}</td><td>${taskData.dates[d]?.ac||0}</td>`);
            html += `</tr>`;
        }
    });
    let today = frappe.datetime.get_today();
    html += `<tr class="footer-row"><td colspan="4" style="text-align:center">Overall Totals</td>
        <td><b>${overall_total_rc}</b></td><td><b>${overall_total_ac}</b></td>
        <td><b>${overall_status_totals["IDB"]}</b></td>
        <td><b>${overall_status_totals["Sourced"]}</b></td>
        <td><b>${overall_status_totals["Pending QC"]}</b></td>
            <td><b>${daywise_rc_totals[today] || 0}</b></td>

        <td><b>${overall_status_totals["Submit(SPOC)"]}</b></td>`;
    raw_dates.forEach(d=>html+=`<td><b>${daywise_rc_totals[d]}</b></td><td><b>${daywise_ac_totals[d]}</b></td>`);
    html += `</tr>`;
    let overall_sr = overall_total_rc>0 ? ((overall_total_ac/overall_total_rc)*100).toFixed(2) : '0.00';
    html += `<tr class="footer-row sr-row">
        <td colspan="4" style="text-align:center;">Overall Strike Rate (SR)%</td>
        <td colspan="2"><b>${overall_sr}%</b></td>
        <td colspan="5"></td>`;
    raw_dates.forEach(d => {
        let daily_sr = daywise_rc_totals[d]>0 ? ((daywise_ac_totals[d]/daywise_rc_totals[d])*100).toFixed(2) : '0.00';
        html += `<td colspan="2"><b>${daily_sr}%</b></td>`;
    });
    html += `</tr>`;

    $('#rec-i-monitor-table').html(html);

    // Toggle child rows
    $('.parent-row').click(function(){
        let groupId=$(this).data('group');
        let icon=$(this).find('.toggle-icon');
        $(`.${groupId}`).toggle();
        icon.text(icon.text()==='[+]'?'[-]':'[+]');
    });
}

// document.getElementById("download-closure-table").addEventListener("click", function () {
//     frappe.call({
//         method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.download_closure_matrix_with_projects",
//         callback: function (r) {
//             if (r.message) {
//                 var element = document.createElement('a');
//                 element.setAttribute('href', 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + r.message);
//                 element.setAttribute('download', 'Closure_Matrix.xlsx');
//                 document.body.appendChild(element);
//                 element.click();
//                 document.body.removeChild(element);
//             }
//         }
//     });
// });


};

