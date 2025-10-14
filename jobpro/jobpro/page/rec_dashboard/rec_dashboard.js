

frappe.pages['rec-dashboard'].on_page_load = function (wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'REC Dashboard',
        single_column: true
    });

    let $headerContainer = $('<div class="form-group" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">')
        .appendTo(page.main);

    let $leftSection = $('<div>').css({ display: 'flex', gap: '1px', flex: '1' }).appendTo($headerContainer);
    let $rightSection = $('<div>').css({ flexShrink: '0' }).appendTo($headerContainer);

    let $container = $('<div id="ptsr-table-container">').appendTo(page.main);

    const filterGroups = [
    { title: "Kick OFF Pending", status: ["Kick OFF"], sourcing_statu: "SP" },
    { title: "Submission Pending", status: ["Draft","Kick OFF","Created","Enquiry","Open","Working","Overdue","Hold","Closure"], sourcing_statu: ["SP"] }, 
    { title: "SP / FP", status: ["Draft","Kick OFF","Created","Enquiry","Open","Working","Overdue","Hold","Closure"], sourcing_statu: ["SP/FP"] },
    { title: "FP", status: ["Draft","Kick OFF","Created","Enquiry","Open","Working","Overdue","Hold","Closure"], sourcing_statu: ["FP"] },
    { title: "Closure", status: "Closed", sourcing_statu: ["SP/FP","SP","FP"] },
    { title: "Hold", status: "Hold", sourcing_statu: ["SP/FP","SP","FP"] },
];


    filterGroups.forEach(group => {
        if (group.title !='Submission Pending'){
        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_ptsr_data_project_wise",
            args: {
                status: group.status,
                sourcing_statu: group.sourcing_statu
            },
            callback: function (r) {
                if (r.message && r.message.projects) {
                    const data = r.message.projects || [];
                    let sectionHtml = `<h3 style="margin-top:30px;">${group.title}</h3>`;
                    sectionHtml += generatePTSRTables(data); 
                    $container.append(sectionHtml);

                    $('.toggle-btn').off('click').on('click', function () {
                        const projectName = $(this).data('project');
                        const $rows = $(`.project-${projectName}`);
                        const isVisible = $rows.is(':visible');
                        $rows.toggle(!isVisible);
                        $(this).text(isVisible ? '[+]' : '[-]');
                    });
                }
            }
        });
    }
    
    else{
        frappe.call({
            method: "jobpro.jobpro.page.rec_dashboard.rec_dashboard.get_ptsr_data_project_wise",
            args: {
                status: group.status,
                sourcing_statu: group.sourcing_statu
            },
            callback: function (r) {
            if (r.message) {
                const data = r.message.projects || [];
                const total = r.message.counts || {};
                let sectionHtml = `<h3 style="margin-top:30px;">${group.title}</h3>`;
                $container.append(sectionHtml);

                let html = `
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse !important;
                        }
                        table,th, td {
                            border: 1px solid black !important;
                            padding: 8px;
                            text-align: center;
                        }
                        th {
                            background-color: #0F1568 !important;
                            color: white !important;
                            text-align: center;
                            padding: 10px;
                        }
                        td {
                            padding: 8px;
                            text-align: center;
                        }
                        
                        .left-align {
                            text-align: left !important;
                            vertical-align: middle !important;
                        }
                        .expected-value {
                            text-align: right !important;
                        }
                        td[colspan="1"]:nth-child(4), 
                        td[colspan="1"]:nth-child(5), 
                        td[colspan="1"]:nth-child(6) {
                            min-width: 100px !important;
                            max-width: 100px !important;
                            word-wrap: break-word;
                            white-space: normal;
                        }

                        
                    </style>
                    <table>
                        <thead>
                            <tr>
                                <th rowspan="2">SI NO</th>
                                <th rowspan="2">Project Name</th>
                                <th rowspan="2">Project Priority</th>
                                <th rowspan="2">AM Remark</th>
                                <th rowspan="2">PM Remark</th>
                                <th rowspan="2">SPOC Remark</th>
                                <th rowspan="2">EXP value</th>
                                <th rowspan="2">Ex PSL</th>
                                <th rowspan="2">PSL Value</th>
                                <th rowspan="2">SS</th>
                                <th rowspan="2">Task</th>
                                <th rowspan="2">Task Priority</th>
                                <th rowspan="2">VAC</th>
                                <th rowspan="2">SP</th>
                                <th rowspan="2">FP</th>
                                <th rowspan="2">SL</th>
                                <th rowspan="2">LP</th>
                                <th rowspan="2">PSL</th>
                                <th rowspan="2">Age</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                let serial_no = 1;

                data.forEach((project) => {
                    let project_vac = 0, project_sp = 0, project_fp = 0, project_sl = 0, project_lp = 0, project_psl = 0;

                    project.tasks.forEach((task) => {
                        project_vac += task.vac || 0;
                        project_sp += task.sp || 0;
                        project_fp += task.fp || 0;
                        project_sl += task.sl || 0;
                        project_lp += task.custom_lp || 0;
                        project_psl += task.psl || 0;
                    });
                    
                    html += `
                        <tr>
                            <td colspan ="12" style="background-color: #add8e6;text-align:left">${project.name}</td>
                            <td style="background-color: #add8e6;">${project_vac}</td>
                            <td style="background-color: #add8e6;">${project_sp}</td>
                            <td style="background-color: #add8e6;">${project_fp}</td>
                            <td style="background-color: #add8e6;">${project_sl}</td>
                            <td style="background-color: #add8e6;">${project_lp}</td>
                            <td style="background-color: #add8e6;">${project_psl}</td>
                            <td style="background-color: #add8e6;">${calculateAgeInDays(project.creation)|| '-'}</td>
                        </tr>
                    `;

                    html += `
                    
                        <tr>
                            <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;">${serial_no++}</td>
                            <td rowspan="${project.tasks.length + 1}" style="word-wrap: break-word;white-space: normal;text-align:left;vertical-align:top;">${project.project_name}</td>
                            <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;">
                                ${project.priority || '-'}
                            </td>
                            <td rowspan="${project.tasks.length + 1}"  style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">
                                ${project.remark || '-'}
                            </td>
                            <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">
                                ${project.account_manager_remark || '-'}
                            </td>
                            <td rowspan="${project.tasks.length + 1}"  style="text-align:center;vertical-align:top;min-width: 250px; max-width: 250px; word-wrap: break-word;">
                                ${project.custom_spoc_remark || '-'}
                            </td>
                            <td rowspan="${project.tasks.length + 1}" style="text-align: right; vertical-align: top;">
                                ${project.expected_value || '-'}
                            </td>

                            <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;">
                                ${project.expected_psl || '-'}
                            </td>
                            <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;">
                                ${project.custom_psl_value || '-'}
                            </td>
                            <td rowspan="${project.tasks.length + 1}" style="text-align:center;vertical-align:top;">
                                ${project.sourcing_statu || '-'}
                            </td>
                        
                            
                            
                        </tr>
                    `;
                    if (project.tasks.length > 0) {

                    project.tasks.forEach((task) => {
                        html += `
                            <tr>
                                <td class="left-align" >
                                    <a href="/app/task/${task.name}" target="_blank">${task.task_name || '-'}</a>
                                </td>
                                <td >
                                    ${task.task_priority || '-'}
                                </td>
                                <td>${task.vac || 0}</td>
                                <td>${task.sp || 0}</td>
                                <td>${task.fp || 0}</td>
                                <td>${task.sl || 0}</td>
                                <td>${task.custom_lp || 0}</td>
                                <td>${task.psl || 0}</td>
                                <td>${task.age || 0}</td>
                            </tr>
                        `;
                    });
                    
                }
                
                });

                html += `
                    <tr style="font-weight:bold; background-color:#f0f0f0;">
                        <td colspan="12" class="left-align">Total</td>
                        <td>${total.vac || 0}</td>
                        <td>${total.sp || 0}</td>
                        <td>${total.fp || 0}</td>
                        <td>${total.sl || 0}</td>
                        <td>${total.custom_lp || 0}</td>
                        <td>${total.psl || 0}</td>
                        <td></td>
                    </tr>
                `;

                html += `</tbody></table>`;
                $container.append(html);
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

    function generatePTSRTables(data) {
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
                    width: 100%;
                }

                .ptsr-horizontal-scroll table {
                    min-width: 1400px; 
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
            <div class="ptsr-horizontal-scroll">
            <table>
            <thead>
                <tr>
                    <th>SI NO</th>
                    <th>Project Name</th>
                    <th>Project Priority</th>
                    <th>AM Remark</th>
                    <th>PM Remark</th>
                    <th colspan=4>SPOC Remark</th>
                    <th>EXP Value</th>
                    <th>Ex PSL</th>
                    <th>PSL Value</th>
                    <th>Sourcing Status</th>
                    <th>Territory</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>`;

        let serial_no = 1;
        let overallTotals = { vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0, expected_value: 0, expected_psl: 0, custom_psl_value: 0 };

        data.forEach((project) => {
            let color = "";

            if (serial_no % 2 === 0) {
                color = "#ffffff"; 
            } else {
                color = "#add8e6";  
            }


            html += `
                <tr class="project-header" style ="background-color:${color};">
                    <td>${serial_no++}</td>
                    <td class="left-align">
                        <span class="toggle-btn" data-project="${project.name}">[+]</span>
                        ${project.project_name}
                    </td>
                    <td>${project.priority || '-'}</td>
                    <td>${project.remark || '-'}</td>
                    <td>${project.account_manager_remark || '-'}</td>
                    <td colspan="4">${project.custom_spoc_remark || '-'}</td>
                    <td class="text-right">${project.expected_value || 0}</td>
                    <td>${project.expected_psl || 0}</td>
                    <td>${project.custom_psl_value || 0}</td>
                    <td>${project.sourcing_statu || '-'}</td>
                    <td>${project.territory || '-'}</td>
                    <td>${calculateAgeInDays(project.creation)}</td>
                </tr>`;

            overallTotals.expected_value += parseFloat(project.expected_value) || 0;
            overallTotals.expected_psl += parseFloat(project.expected_psl) || 0;
            overallTotals.custom_psl_value += parseFloat(project.custom_psl_value) || 0;

            if (project.tasks.length > 0) {
                let task_serial_no = 1;
                let totals = { vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0 };

                html += `<tbody class="project-${project.name}" style="display:none;">
                <tr class="task-header">
                    <td>SI NO</td>
                    <td colspan="4">Task</td>
                    <td colspan="2">Task Priority</td>
                    <td colspan="2">VAC</td>
                    <td>SP</td>
                    <td>FP</td>
                    <td>SL</td>
                    <td>LP</td>
                    <td>PSL</td>
                    <td>Age</td>
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
                        <td>${task_serial_no++}</td>
                        <td colspan="4" class="left-align"><a href="/app/task/${task.name}">${task.task_name || '-'}</a></td>
                        <td colspan="2">${task.task_priority || '-'}</td>
                        <td colspan="2">${task.vac || 0}</td>
                        <td>${task.sp || 0}</td>
                        <td>${task.fp || 0}</td>
                        <td>${task.sl || 0}</td>
                        <td>${task.custom_lp || 0}</td>
                        <td>${task.psl || 0}</td>
                        <td>${task.age}</td>
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
                        <td colspan="8" class="left-align">Task Total</td>
                        <td>${totals.vac}</td>
                        <td>${totals.sp}</td>
                        <td>${totals.fp}</td>
                        <td>${totals.sl}</td>
                        <td>${totals.lp}</td>
                        <td>${totals.psl}</td>
                    </tr>
                </tbody>`;
            }
            else{
                html += `<tbody class="project-${project.name}" style="display:none;">
            <tr style="font-weight:bold; background-color:#d0d0d0;">
            <td colspan="15"><center>No Data Available</center></td>
            </tr>`;
        
            }
        });

        if (data.length > 0) {
            html += `
            <tr style="font-weight:bold; background-color:#d0d0d0;">
                <td colspan="9" class="left-align">Total</td>
                <td class="text-right">${overallTotals.expected_value}</td>
                <td>${overallTotals.expected_psl}</td>
                <td>${overallTotals.custom_psl_value}</td>
                <td></td><td></td><td></td>
            </tr>`;
        }
        else{
            html += `
            <tr style="font-weight:bold; background-color:#d0d0d0;">
            <td colspan="15"><center>No Data Available</center></td>
            </tr>`;
        }

        html += `</tbody></table></div></div>`;
        return html;
    }
};
