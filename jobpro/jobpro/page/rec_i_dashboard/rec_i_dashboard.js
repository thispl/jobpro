
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

			<div class="active-customer-wrapper" style="background-color: #f5f5f5;border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-sizing: border-box;margin-left: 15px;margin-right: 15px;">
				<div class="dashboard-cards-finaince" style="display: flex; gap: 30px; flex-wrap: nowrap; overflow-x: auto; margin-bottom: 30px;">
					<div class="dashboard-card order-booking-card" style="background-color: #0096A6;"></div>
					<div class="dashboard-card turnover-card" style="background-color: #2F8F46;"></div>
					<div class="dashboard-card collection-card" style="background-color: #C29100;"></div>
					<div class="dashboard-card receivable-card" style="background-color: #540D6E;"></div>
					<div class="dashboard-card tobill-card" style="background-color: #006D77;"></div>
					<div class="dashboard-card todeliverbill-card" style="background-color: #457B9D;"></div>
					<div class="dashboard-card payable-card" style="background-color: #8B0000;"></div>
				</div>
			</div>
			<div style="background-color: #f5f5f5;display: flex; gap: 20px; margin-top: 30px; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 10px;margin-left: 15px;margin-right: 15px;border: 1px solid #ddd; border-radius: 8px;">

	<!-- RECEIVABLE -->
	<div id="tfp-receivable-table" style="margin-left:15px;min-width: 420px; border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-sizing: border-box;margin-top:20px;">
		<h4 style="margin: 0; padding: 0px 0; text-align:center; background: white; position: sticky; top: 0; z-index: 1;">RECEIVABLE</h4>
		<div id="receivable-so-table-content" style="margin-top: 0px;"></div>
	</div>

	<!-- TO BILL -->
	<div id="tfp-tobill-table" style="min-width: 420px; border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-sizing: border-box;margin-top:20px;">
		<h4 style="margin: 0; padding: 0px 0; text-align:center; background: white; position: sticky; top: 0; z-index: 1;">TO BILL</h4>
		<div id="tobill-so-table-content" style="margin-top: 0px;"></div>
	</div>

	<!-- PAYABLE -->
	<div id="tfp-payable-table" style="margin-right:15px;min-width: 420px; border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-sizing: border-box;margin-top:20px;">
		<h4 style="margin: 0; padding: 0px 0; text-align:center; background: white; position: sticky; top: 0; z-index: 1;">PAYABLE</h4>
		<div id="payable-so-table-content" style="margin-top: 0px;"></div>
	</div>
	
	

		</div>
		<!-- Additional Metrics Section -->
<div id="rec-i-metrics-cards" style="display: flex; gap: 20px; margin: 30px 20px 0;overflow-x: auto; flex-wrap: nowrap;background-color: #f5f5f5;border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-sizing: border-box;">
	<div class="dashboard-card project-count-card" style="background-color: #007BFF;"></div>
	<div class="dashboard-card task-count-card" style="background-color: #6C757D;"></div>
	<div class="dashboard-card vacancies-card" style="background-color: #17A2B8;"></div>
	<div class="dashboard-card sp-count-card" style="background-color: #28A745;"></div>
	<div class="dashboard-card fp-count-card" style="background-color: #FFC107;"></div>
	<div class="dashboard-card sl-count-card" style="background-color: #FD7E14;"></div>
	<div class="dashboard-card psl-count-card" style="background-color: #DC3545;"></div>
</div>
<!-- Monitor Cards Section -->




<div id="ptsr-sections-wrapper" style="margin-right: 20px;margin-left: 20px;" ></div>



<div id="closure-matrix-container" style="margin: 40px 20px;border: 1px solid #ddd; border-radius: 8px;background-color: #f5f5f5;margin-left:20px;margin-right:20px;">
    <h4 style="margin-bottom: 15px;text-align:center;background-color:white;margin-top:20px; position: relative;">
        TERRITORY-WISE CLOSURE STATUS
		<div style="position: absolute; top: 10px; right: 10px; z-index: 10;">
       <button id="download-closure-table" class="btn btn-secondary">Download</button>
	</div>
		<div id="closure-matrix-table" style="margin-top: 0px;"></div>
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
    <div id="monitor-toggle-cards" style="margin-top:30px;margin-bottom:30px;display: flex; gap: 15px;justify-content: center; align-items: center;border: 1px solid #ddd; border-radius: 8px;background-color: #f5f5f5;margin-left:20px;margin-right:20px;">
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
	"SUBMISSION": "#submission-section",
    "SUBMISSION / FEEDBACK": "#submission-feedback-section",
    "FEEDBACK": "#feedback-section",
	// "CLOSURE": "#closure-section",
};
    const filterGroups = [
    { title: "Kick OFF", status: ["Draft"], custom_kick_of_completed: 0 },
    { title: "SUBMISSION", status: ['Open', 'Enquiry'], sourcing_statu: ["SP"] }, 
    { title: "SUBMISSION / FEEDBACK", status: ['Open', 'Enquiry'], sourcing_statu: ["SP/FP"] },
    { title: "FEEDBACK", status: ['Open', 'Enquiry'], sourcing_statu: ["FP"] },
    // { title: "CLOSURE", status: "Closure"},
    // { title: "Hold", status: "Hold", sourcing_statu: ["SP/FP","SP","FP"] },
];


    filterGroups.forEach(group => {
        if (group.title =='FEEDBACK'){
//         frappe.call({
//             method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_ptsr_data_project_wise",
//             args: {
//                 status: group.status,
//                 sourcing_statu: group.sourcing_statu
//             },
//             callback: function (r) {
//                 if (r.message && r.message.projects) {
//                     const data = r.message.projects || [];
//                     let sectionHtml = `<h3 style="margin-top:30px;text-align:center;">${group.title}</h3>`;

//                     sectionHtml += generatePTSRTables(data); 

//                    const targetSelector = targetMap[group.title] || "#ptsr-sections-wrapper";
// $(wrapper).find(targetSelector).append(sectionHtml);
//                     $('.toggle-btn').off('click').on('click', function () {
//                         const projectName = $(this).data('project');
//                         const $rows = $(`.project-${projectName}`);
//                         const isVisible = $rows.is(':visible');
//                         $rows.toggle(!isVisible);
//                         $(this).text(isVisible ? '[+]' : '[-]');
//                     });

//                 }
//             }
//         });
   
frappe.call({
    method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_candidates_tat_crossed_from_history",
    callback: function (tatRes) {
        const tatMap = tatRes.message || {};

        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_ptsr_data_project_wise",
            args: {
                status: group.status,
                sourcing_statu: group.sourcing_statu
            },
            callback: function (r) {
                if (r.message && r.message.projects) {
                    const data = r.message.projects || [];
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

                        // Toggle project-level remarks
                        $(`.project-remark-${projectName}`).toggle(isVisible); // hide when expanding

                        // Toggle [+]/[-]
                        $(this).text(isVisible ? '[+]' : '[-]');
                    });

                }
            }
        });
    }
});

}
    
    else{
//         frappe.call({
//             method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_ptsr_data_project_wise",
//             args: {
//                 status: group.status,
//                 sourcing_statu: group.sourcing_statu
//             },
//             callback: function (r) {
//             if (r.message) {
//                 const data = r.message.projects || [];
//                 const total = r.message.counts || {};
//                 let sectionHtml = `<h3 style="margin-top:30px;text-align:center;">${group.title}</h3>`;
//                 const targetSelector = targetMap[group.title] || "#ptsr-sections-wrapper";
// $(wrapper).find(targetSelector).append(sectionHtml);
//                 let html = `
//                     <style>
// 					.sp-scroll-container {
//                     max-height: 600px;
//                     overflow-y: auto;
//                     border: 1px solid #ccc;
//                     margin-bottom: 20px;
//                 }

//                 .sp-horizontal-scroll {
//                     overflow-x: auto;
// 					overflow-y: auto;
//                     width: 100%;
//                 }

//                 .sp-horizontal-scroll table {
//                     min-width: 100px; 
//                     border-collapse: collapse;
//                     width: 100%;}
//                         table {
//                             width: 100%;
//                             border-collapse: collapse !important;
//                         }
//                         table,th, td {
//                             border: 1px solid black !important;
//                             padding: 8px;
//                             text-align: center;
//                         }
//                         th {
//                             background-color: #0F1568 !important;
//                             color: white !important;
//                             text-align: center;
//                             padding: 10px;
//                         }
//                         td {
//                             padding: 8px;
//                             text-align: center;
//                         }
                        
//                         .left-align {
//                             text-align: left !important;
//                             vertical-align: middle !important;
//                         }
//                         .expected-value {
//                             text-align: right !important;
//                         }
//                         td[colspan="1"]:nth-child(4), 
//                         td[colspan="1"]:nth-child(5), 
//                         td[colspan="1"]:nth-child(6) {
//                             min-width: 100px !important;
//                             max-width: 100px !important;
//                             word-wrap: break-word;
//                             white-space: normal;
//                         }

                        
//                     </style>
// 					<div class ="sp-scroll-container">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th rowspan="2">SI NO</th>
//                                 <th rowspan="2">Project Name</th>
//                                 <th rowspan="2">Project Priority</th>
//                                 <th rowspan="2">AM Remark</th>
//                                 <th rowspan="2">PM Remark</th>
//                                 <th rowspan="2">SPOC Remark</th>
//                                 <th rowspan="2">EXP value</th>
//                                 <th rowspan="2">Ex PSL</th>
//                                 <th rowspan="2">PSL Value</th>
//                                 <th rowspan="2">SS</th>
//                                 <th rowspan="2">Task</th>
//                                 <th rowspan="2">Task Priority</th>
//                                 <th rowspan="2">VAC</th>
//                                 <th rowspan="2">SP</th>
//                                 <th rowspan="2">FP</th>
//                                 <th rowspan="2">SL</th>
//                                 <th rowspan="2">LP</th>
//                                 <th rowspan="2">PSL</th>
//                                 <th rowspan="2">Age</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                 `;

//                 let serial_no = 1;

//                 data.forEach((project) => {
//                     let project_vac = 0, project_sp = 0, project_fp = 0, project_sl = 0, project_lp = 0, project_psl = 0;

//                     project.tasks.forEach((task) => {
//                         project_vac += task.vac || 0;
//                         project_sp += task.sp || 0;
//                         project_fp += task.fp || 0;
//                         project_sl += task.sl || 0;
//                         project_lp += task.custom_lp || 0;
//                         project_psl += task.psl || 0;
//                     });
                    
//                     html += `
//                         <tr>
//                             <td colspan ="12" style="background-color: #add8e6;text-align:left">${project.name}</td>
//                             <td style="background-color: #add8e6;">${project_vac}</td>
//                             <td style="background-color: #add8e6;">${project_sp}</td>
//                             <td style="background-color: #add8e6;">${project_fp}</td>
//                             <td style="background-color: #add8e6;">${project_sl}</td>
//                             <td style="background-color: #add8e6;">${project_lp}</td>
//                             <td style="background-color: #add8e6;">${project_psl}</td>
//                             <td style="background-color: #add8e6;">${calculateAgeInDays(project.creation)|| '-'}</td>
//                         </tr>
//                     `;

//                     html += `
                    
//                         <tr>
//                             <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;">${serial_no++}</td>
//                             <td rowspan="${project.tasks.length + 1}" style="word-wrap: break-word;white-space: normal;text-align:left;vertical-align:top;">${project.project_name}</td>
//                             <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;">
//                                 ${project.priority || '-'}
//                             </td>
//                             <td rowspan="${project.tasks.length + 1}"  style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">
//                                 ${project.remark || '-'}
//                             </td>
//                             <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">
//                                 ${project.account_manager_remark || '-'}
//                             </td>
//                             <td rowspan="${project.tasks.length + 1}"  style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">
//                                 ${project.custom_spoc_remark || '-'}
//                             </td>
//                             <td rowspan="${project.tasks.length + 1}" style="text-align: right; vertical-align: top;">
//                                 ${project.expected_value || '-'}
//                             </td>

//                             <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;">
//                                 ${project.expected_psl || '-'}
//                             </td>
//                             <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;">
//                                 ${project.custom_psl_value || '-'}
//                             </td>
//                             <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;">
//                                 ${project.sourcing_statu || '-'}
//                             </td>
                        
                            
                            
//                         </tr>
//                     `;
//                     if (project.tasks.length > 0) {

//                     project.tasks.forEach((task) => {
//                         html += `
//                             <tr>
//                                 <td class="left-align" >
//                                     <a href="/app/task/${task.name}" target="_blank">${task.task_name || '-'}</a>
//                                 </td>
//                                 <td >
//                                     ${task.task_priority || '-'}
//                                 </td>
//                                 <td>${task.vac || 0}</td>
//                                 <td>${task.sp || 0}</td>
//                                 <td>${task.fp || 0}</td>
//                                 <td>${task.sl || 0}</td>
//                                 <td>${task.custom_lp || 0}</td>
//                                 <td>${task.psl || 0}</td>
//                                 <td>${task.age || 0}</td>
//                             </tr>
//                         `;
//                     });
                    
//                 }
                
//                 });

//                 html += `
//                     <tr style="font-weight:bold; background-color:#f0f0f0;">
//                         <td colspan="12" class="left-align">Total</td>
//                         <td>${total.vac || 0}</td>
//                         <td>${total.sp || 0}</td>
//                         <td>${total.fp || 0}</td>
//                         <td>${total.sl || 0}</td>
//                         <td>${total.custom_lp || 0}</td>
//                         <td>${total.psl || 0}</td>
//                         <td></td>
//                     </tr>
//                 `;

//                 html += `</tbody></table></div>`;
//                 $(wrapper).find('#ptsr-sections-wrapper').append(html);


//             }
//         }
//         });
           frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_ptsr_data_project_wise",
            args: {
                status: group.status,
                sourcing_statu: group.sourcing_statu
            },
            callback: function (r) {
                if (r.message && r.message.projects) {
                    const data = r.message.projects || [];
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
}
    
});

    
    function calculateAgeInDays(creationDate) {
        if (!creationDate) return '-';
        const created = new Date(creationDate);
        const today = new Date();
        const diffTime = today - created;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays}`;
    }


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
                    <th>EV</th>
                    <th>VAC</th>
                    <th>SP</th>
                    <th>FP</th>
                    <th>SL</th>
                    <th>LP</th>
                    <th>Ex PSL</th>
                    <th>PV</th>
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
                    <td class="text-right">${project.expected_value || 0}</td>
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
                    <td>${project.expected_psl || 0}</td>
                    <td>${project.custom_psl_value || 0}</td>
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
                    <td colspan="2">Task Priority</td>
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
                    <th>EV</th>
                    <th>VAC</th>
                    <th>SP</th>
                    <th>FP</th>
                    <th>SL</th>
                    <th>LP</th>
                    <th>Ex PSL</th>
                    <th>PV</th>
                    <th>Age</th>
                    <th style="text-align:center;vertical-align:top;min-width: 200px; max-width: 200px; word-wrap: break-word;">AM Remark</th>
                    <th style="text-align:center;vertical-align:top;min-width: 200px; max-width: 200px; word-wrap: break-word;">PM Remark</th>
                    <th colspan=4 style="text-align:center;vertical-align:top;min-width: 200px; max-width: 250px; word-wrap: break-word;">SPOC Remark</th>
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
                <tr class="project-header" style="background-color:${color};">
        <td rowspan="${task_count}">${serial_no++}</td>
        <td rowspan="${task_count}" class="left-align">
            <span class="toggle-btn" data-project="${project.name}">[+]</span>
            ${project.project_name}<br>${project.territory || '-'}
        </td>
        <td rowspan="${task_count}">${project.priority || '-'}</td>
        <td rowspan="${task_count}">${project.expected_value || 0}</td>
        <td rowspan="${task_count}">${project.tvac || 0}</td>
        <td rowspan="${task_count}">${project.tsp || 0}</td>
        <td rowspan="${task_count}">${project.tfp || 0}</td>
        <td rowspan="${task_count}">${project.tsl || 0}</td>
        <td rowspan="${task_count}">${project.custom_t_lp || 0}</td>
        <td rowspan="${task_count}">${project.expected_psl || 0}</td>
        <td rowspan="${task_count}">${project.custom_psl_value || 0}</td>
        <td rowspan="${task_count}">${calculateAgeInDays(project.creation)}</td>
        <td rowspan="${task_count}" class="project-remark-${project.name}" style="text-align:center; vertical-align: middle; min-width:200px;border-bottom:none !important; max-width:200px;">
    <div class="remark-content remark-content-${project.name}">${project.remark || '-'}</div>
</td>

<td rowspan="${task_count}" class="project-remark-${project.name}" style="text-align:left; vertical-align: middle; min-width:200px; max-width:200px;border-bottom:none !important;">
    <div class="remark-content remark-content-${project.name}">${project.account_manager_remark || '-'}</div>
</td>

<td rowspan="${task_count}" colspan="4" class="project-remark-${project.name}" style="text-align:left; vertical-align: middle; min-width:200px; max-width:200px;border-bottom:none !important;">
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
                        <td colspan="2">${task.task_priority || '-'}</td>
                        <td colspan="1">${task.vac || 0}</td>
                        <td colspan="1">${task.sp || 0}</td>
                        <td colspan="1">${task.fp || 0}</td>
                        <td colspan="1">${task.sl || 0}</td>
                        <td colspan="1">${task.custom_lp || 0}</td>
                        <td colspan="1">${task.psl || 0}</td>
                        <td colspan="2">${task.age}</td>
                        
                       
                    `;
                    if (idx === midIndex) {
                    html += `
                        <td style="text-align:center; vertical-align: middle;  border-top: none !important; border-bottom: none !important;">
                            ${project.remark || '-'}
                        </td>
                        <td style="text-align:left; vertical-align:middle;  border-top: none !important; border-bottom: none !important;">
                            ${project.account_manager_remark || '-'}
                        </td>
                        <td colspan="4" style="text-align:left; vertical-align:middle;  border-top: none !important; border-bottom: none !important;">
                            ${project.custom_spoc_remark || '-'}
                        </td>
                    `;
               
                }
    

else{
    html += `
    <td style="border-top: none !important; border-bottom: none !important;"></td>
                        <td style="border-top: none !important; border-bottom: none !important;"></td>
                        <td colspan="4" style="border-top: none !important; border-bottom: none !important;"></td>
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
                        <td colspan="4" style="text-align:center">Task Total</td>
                        <td>${totals.vac}</td>
                        <td>${totals.sp}</td>
                        <td>${totals.fp}</td>
                        <td>${totals.sl}</td>
                        <td>${totals.lp}</td>
                        <td>${totals.psl}</td>
                        <td colspan="2">0</td>
                        <td colspan="6"></td>
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
                <td colspan="3" class="left-align">Total</td>
                <td class="text-right">${overallTotals.expected_value}</td>
                <td>${overallTotals.tot_vac}</td><td>${overallTotals.tot_sp}</td><td>${overallTotals.tot_fp}</td><td>${overallTotals.tot_sl}</td>
                <td>${overallTotals.tot_lp}</td>
                <td>${overallTotals.expected_psl}</td>
                <td>${overallTotals.custom_psl_value}</td>
                <td colspan="6"></td>
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
function renderClosureMatrix(data) {
	const statuses = [
		"PSL", "Waitlisted", "Sales Order", "Client Offer Letter", "Signed Offer Letter",
		"Visa", "Premedical", "PCC", "Certificate Attestation", "Trade Test", "Final Medical",
		"Biometric", "Visa Stamping", "Emigration", "Ticket", "Onboarding", "Onboarded"
	];

	const statusShortCodes = {
		"PSL": "PSL", "Waitlisted": "WL", "Sales Order": "SO", "Client Offer Letter": "COL",
		"Signed Offer Letter": "SOL", "Visa": "Visa", "Premedical": "PM", "PCC": "PCC",
		"Certificate Attestation": "CA", "Trade Test": "Trade Test", "Final Medical": "FM",
		"Biometric": "BIO", "Visa Stamping": "VS", "Emigration": "POE", "Ticket": "TKT",
		"Onboarding": "OB", "Onboarded": "OBD"
	};

	const territoryMap = {};
	const closureMap = {};

	data.forEach(row => {
		const terr = row.territory;
		const status = row.status;
		if (!territoryMap[terr]) territoryMap[terr] = {};
		territoryMap[terr][status] = {
			count: row.count || 0,
			tat_crossed_count: row.tat_crossed_count || 0,
			closure_ids: row.closure_ids || []
		};
		const key = `${terr}__${status}`;
		closureMap[key] = row.closure_ids || [];
	});

	let html = `
<style>
	#closure-matrix-wrapper {
		overflow: auto;
		width: 100%;
		max-height: 500px;
	}
	#closure-matrix-table {
		width: 100%;
		border-collapse: collapse;
		table-layout: auto;
	}
	#closure-matrix-table thead th {
		position: sticky;
		top: 0;
		z-index: 2;
		background: #002060;
		color: white;
		text-align: center;
	}
	#closure-matrix-table td, #closure-matrix-table th {
		text-align: center;
		padding: 6px;
		border: 1px solid #ccc;
	}
	#closure-matrix-table tbody tr:nth-child(odd) {
		background-color: #d9d9d9;
	}
	.project-row td {
		background-color: #f1f9ff;
	}
	#closure-matrix-table tfoot tr {
		background-color: #d0e3f0;
		color: #000;
		font-weight: bold;
	}
</style>

<div id="closure-matrix-wrapper">
<table class="table table-bordered" id="closure-matrix-table" style="font-size: 13px; white-space: nowrap;">
	<thead>
		<tr>
			<th>Territory</th>
			${statuses.map(s => `<th title="${s}">${statusShortCodes[s] || s}</th>`).join('')}
			<th>Total</th>
		</tr>
	</thead>
	<tbody>`;

	for (let terr in territoryMap) {
		let rowTotal = 0;
		let rowTotals = 0;
		statuses.forEach(status => {
			const count = territoryMap[terr][status]?.count || 0;
			rowTotals += count;
		});
		if (rowTotals === 0) continue;

		html += `<tr>
			<td class="territory-cell" style="cursor:pointer; text-align:left;" data-territory="${terr}">
				<span class="toggle-icon" style="font-weight:bold; color:#002060; margin-right:4px;float:left;">[+]</span>
				<strong>${terr}</strong>
			</td>`;

		statuses.forEach(status => {
			const statusData = territoryMap[terr][status] || { count: 0, tat_crossed_count: 0 };
			const count = statusData.count;
			const crossed = statusData.tat_crossed_count;
			const key = `${terr}__${status}`;
			rowTotal += count;
			if (crossed > 0) {
				html += `<td>${count} / <a href="#" class="tat-link" data-key="${key}" style="color:red;font-weight:bold;">${crossed}</a></td>`;
			} else {
				html += `<td>${count} / <span style="color:gray;">${crossed}</span></td>`;
			}
		});
		html += `<td style="font-weight: bold;">${rowTotal}</td></tr>`;
	}

	// Grand totals
	let grandTotals = {};
	let grandTotalSum = 0;
	statuses.forEach(status => grandTotals[status] = 0);
	for (let terr in territoryMap) {
		statuses.forEach(status => {
			const count = territoryMap[terr][status]?.count || 0;
			grandTotals[status] += count;
			grandTotalSum += count;
		});
	}

	html += `</tbody>
	<tfoot><tr>
		<td>Grand Total</td>
		${statuses.map(status => `<td>${grandTotals[status]}</td>`).join("")}
		<td>${grandTotalSum}</td>
	</tr></tfoot>
</table></div>`;

	$("#closure-matrix-table").html(html);

	// TAT crossed link (territory-level)
	$(".tat-link").on("click", function (e) {
		e.preventDefault();
		const key = $(this).data("key");
		const ids = closureMap[key] || [];
		if (!ids.length) return frappe.msgprint("No TAT crossed Closure records.");
		frappe.set_route("List", "Closure", { name: ["in", ids] });
	});

	// Expand territory for project breakdown
	$(".territory-cell").on("click", function () {
		const $cell = $(this);
		const $row = $cell.closest("tr");
		const territory = $cell.data("territory");
		const $icon = $cell.find(".toggle-icon");

		// Collapse if open
		if ($row.next().hasClass("project-row")) {
			while ($row.next().hasClass("project-row")) {
				$row.next().remove();
			}
			$icon.text("[+]");
			return;
		}

		$(".project-row").remove();
		$(".toggle-icon").text("[+]");

		$icon.text("[−]");

		frappe.call({
			method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_project_details_for_territory",
			args: { territory },
			callback: function (r) {
				if (r.message && r.message.length) {
					let projectMap = {};
					let projectClosureMap = {};

					r.message.forEach(row => {
						const projectId = row.project;
						const status = row.status;

						if (!projectMap[projectId]) {
							projectMap[projectId] = {
								name: row.project_name || row.project,
								statusCounts: {}
							};
						}
						projectMap[projectId].statusCounts[status] = {
							count: row.count || 0,
							tat_crossed_count: row.tat_crossed_count || 0,
							closure_ids: row.closure_ids || []
						};
						projectClosureMap[`${projectId}__${status}`] = row.closure_ids || [];
					});

					Object.entries(projectMap).forEach(([projectId, data]) => {
						const { name, statusCounts } = data;
						let total = 0;

						statuses.forEach(status => {
							total += statusCounts[status]?.count || 0;
						});
						if (total === 0) return;

						let breakdownRow = `<tr class="project-row">`;
						breakdownRow += `<td style="text-align:left;padding-left:20px;">
							<a href="/app/project/${projectId}" target="_blank" style="font-weight:bold;">${name}</a>
						</td>`;

						statuses.forEach(status => {
							const count = statusCounts[status]?.count || 0;
							const crossed = statusCounts[status]?.tat_crossed_count || 0;
							const key = `${projectId}__${status}`;
							if (crossed > 0) {
								breakdownRow += `<td>${count} / <a href="#" class="tat-link-pro" data-key="${key}" style="color:red;font-weight:bold;">${crossed}</a></td>`;
							} else {
								breakdownRow += `<td>${count} / <span style="color:gray;">${crossed}</span></td>`;
							}
						});

						breakdownRow += `<td style="font-weight:bold;">${total}</td></tr>`;
						$row.after(breakdownRow);
					});

					// Project-level TAT links
					$(".tat-link-pro").off("click").on("click", function (e) {
						e.preventDefault();
						const key = $(this).data("key");
						const ids = projectClosureMap[key] || [];
						if (!ids.length) return frappe.msgprint("No TAT crossed Closure records.");
						frappe.set_route("List", "Closure", {
							name: ["in", ids]
						});
					});
				} else {
					frappe.msgprint("No project data for this territory.");
				}
			}
		});
	});
}


// Initial call
frappe.call({
	method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.get_territory_status_matrix",
	callback: function (r) {
		if (r.message) {
			renderClosureMatrix(r.message);
		} else {
			$("#closure-matrix-table").html("No data found.");
		}
	}
});






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
        let today = frappe.datetime.get_today(); // 'YYYY-MM-DD'
        let exe_current_rc = exe_rt_totals[today] || 0;

        // html += `<tr class="parent-row" data-group="${groupId}">
        //     <td>${exeIndex+1}</td>
        //     <td class="left-align">
        //         <div style="display:flex; align-items:center; justify-content:space-between;">
        //             <span><span class="toggle-icon" style="float:left">[+]</span>${emp_name}</span>
        //             <span>${emp_img}</span>
        //         </div>
        //     </td>
        //     <td></td>
        //     <td>${Object.keys(tasks).length}</td>
        //     <td><b>${exe_total_rc}</b></td>
        //     <td><b>${exe_total_ac}</b></td>
        //     <td><b>${exe_status_totals["IDB"]}</b></td>
        //     <td><b>${exe_status_totals["Sourced"]}</b></td>
        //     <td><b>${exe_status_totals["Pending QC"]}</b></td>
        //     <td><b>${exe_current_rc || 0}</b></td>
        //     <td><b>${exe_status_totals["Submit(SPOC)"]}</b></td>`;
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
            <td><b>${exe_status_totals["Submit(SPOC)"] + (statusResults[0].message?.executive_only_counts?.["Submit(SPOC)"] || 0)}</b></td>`;
        raw_dates.forEach(d => html += `<td><b>${exe_rt_totals[d]}</b></td><td><b>${exe_ac_totals[d]}</b></td>`);
        html += `</tr>`;

        // SR% row per executive
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

document.getElementById("download-closure-table").addEventListener("click", function () {
    frappe.call({
        method: "jobpro.jobpro.page.rec_i_dashboard.rec_i_dashboard.download_closure_matrix_with_projects",
        callback: function (r) {
            if (r.message) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + r.message);
                element.setAttribute('download', 'Closure_Matrix.xlsx');
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        }
    });
});


};

