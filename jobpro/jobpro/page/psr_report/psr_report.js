
frappe.pages['psr-report'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'PSR Report',
        single_column: true
    });

    let updatedProjects = {};
    let $headerContainer = $('<div class="form-group" style="display: flex; justify-content: flex-end; align-items: center; gap: 15px; margin-bottom: 10px;">')
        .appendTo(page.main);  
    // Add Service Filter (Link Field)
    let service_filter = frappe.ui.form.make_control({
        df: {
            fieldtype: 'Link',
            options: 'Services',  // Link to your 'Services' Doctype
            fieldname: 'service_filter',
            placeholder: 'Select a Service',
            default: "REC-I"
        },
        parent: $headerContainer,
        render_input: true
    });

    service_filter.refresh();  // Ensure control is properly initialized
    service_filter.set_value("REC-I");
    service_filter.$input.on("change", function() {
        let selected_service = service_filter.get_value();
        if (selected_service && selected_service !== "REC-I") {
            frappe.msgprint({
                title: "Under Development",
                message: `
                    <div style="text-align: center;">
                        <img src="https://cdn-icons-png.flaticon.com/512/190/190718.png" 
                             style="width: 100px; height: 100px; margin-bottom: 10px;">
                        <p style="font-size: 16px; font-weight: bold;">Developers are working on it. Stay tuned!</p>
                    </div>
                `,
                primary_action: {
                    label: "OK",
                    action() { frappe.hide_msgprint(); }
                }
            });
        }
    });

    // Add Submit Button
    let submit_btn = $('<button class="btn btn-primary">Submit</button>')
        .click(() => {
            submitUpdatedProjects();
        })
        .appendTo($headerContainer);  // Place next to filter

    let $container = $('<div>').appendTo(page.main); // Main content container

    // page.set_primary_action('Submit', () => {
    //     submitUpdatedProjects();
    // });

    // let $container = $('<div>').appendTo(page.main);

    

    frappe.call({
        method: "jobpro.jobpro.page.psr_report.psr_report.get_psr_data",
        callback: function(r) {
            if (r.message) {
                let data = r.message;

                // **Initialize grand totals**
                let grandTotal = {
                    vac: 0, sp: 0, fp: 0, sl: 0, lp: 0, psl: 0,
                    expected_value: 0, expected_psl: 0
                };

                let html = `
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse !important;
                        }
                        table, th, td {
                            border: 1px solid black !important;
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
                        .customer-row {
                            background-color: #add8e6 !important;
                            font-weight: bold;
                        }
                        .left-align {
                            text-align: left !important;
                            padding-left: 10px !important;
                            vertical-align: middle !important;
                        }
                        .editable-span {
                            cursor: pointer;
                            display: inline-block;
                            width: 100%;
                        }
                        .editable-input {
                            width: 100%;
                            border: 1px solid #0F1568;
                            outline: none;
                            padding: 5px;
                            font-size: 16px;
                            text-align: left !important;
                        }
                        .grand-total {
                            background-color: #0F1568 !important;
							color: white !important;
                            font-weight: bold;
                        }
                        td[colspan="1"]:nth-child(13), /* AM Remark */
                        td[colspan="1"]:nth-child(14), /* PM Remark */
                        td[colspan="1"]:nth-child(15)  /* SPOC Remark */ {
                            min-width: 100px !important;
                            max-width: 100px !important;
                            word-wrap: break-word;
                            white-space: normal;
                        }

                    </style>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>SI NO</th>
                                <th>Customer Name / Project Name</th>
                                <th>Project Priority</th>
                                <th>SS</th>
                                <th>VAC</th>
                                <th>SP</th>
                                <th>FP</th>
                                <th>SL</th>
                                <th>LP</th>
                                <th>PSL</th>
                                <th>EV</th>
                                <th>Expected PSL</th>
                                <th>AM Remark</th>
                                <th>PM Remark</th>
                                <th>SPOC Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                let serial_no = 1;

                data.forEach((customer) => {
                    if (!customer.customer_name || !customer.projects || customer.projects.length === 0) return;

                    let customerRowAdded = false;

                    customer.projects.forEach((project) => {
                        let project_vac = 0, project_sp = 0, project_fp = 0, project_sl = 0, project_psl = 0, project_lp = 0;

                        if (project.tasks && project.tasks.length > 0) {
                            project.tasks.forEach((task) => {
                                project_vac += task.vac || 0;
                                project_sp += task.sp || 0;
                                project_fp += task.fp || 0;
                                project_sl += task.sl || 0;
                                project_psl += task.psl || 0;
                                project_lp += task.custom_lp || 0;
                            });
                        }

                        // **Update grand totals**
                        grandTotal.vac += project_vac;
                        grandTotal.sp += project_sp;
                        grandTotal.fp += project_fp;
                        grandTotal.sl += project_sl;
                        grandTotal.lp += project_lp;
                        grandTotal.psl += project_psl;
                        grandTotal.expected_value += parseFloat(project.expected_value) || 0;
                        grandTotal.expected_psl += parseFloat(project.expected_psl) || 0;

                        if (!customerRowAdded) {
                            html += `
                                <tr class="customer-row ">
                                    <td colspan="15">${customer.customer_name} - ${project.territory}</td>
                                </tr>
                            `;
                            customerRowAdded = true;
                        }

                        html += `
                            <tr>
                                <td>${serial_no++}</td>
                                <td class="left-align">${project.project_name}</td>
                                <td>${project.priority || '-'}</td>
                                <td>${project.sourcing_status || '-'}</td>
                                <td>${project_vac}</td>
                                <td>${project_sp}</td>
                                <td>${project_fp}</td>
                                <td>${project_sl}</td>
                                <td>${project_lp}</td>
                                <td>${project_psl}</td>
                                <td>${project.expected_value || '-'}</td>
                                <td>${project.expected_psl || '-'}</td>
                                <td class="editable-field left-align" data-project="${project.name}" data-field="remark" style="min-width: 250px; max-width: 250px; word-wrap: break-word;">
                                    <span class="editable-span">${project.remark || '-'}</span>
                                </td>
                                <td class="editable-field left-align" data-project="${project.name}" data-field="account_manager_remark" style="min-width: 250px; max-width: 250px; word-wrap: break-word;">
                                    <span class="editable-span">${project.account_manager_remark || '-'}</span>
                                </td>
                                <td class="editable-field left-align" data-project="${project.name}" data-field="custom_spoc_remark" style="min-width: 250px; max-width: 250px; word-wrap: break-word;">
                                    <span class="editable-span">${project.custom_spoc_remark || '-'}</span>
                                </td>
                            </tr>
                        `;
                    });
                });

                // **Append the Grand Total Row**
                html += `
                    <tr class="grand-total">
                        <td colspan="4" style="text-align: center;"><strong>Grand Total</strong></td>
                        <td>${grandTotal.vac}</td>
                        <td>${grandTotal.sp}</td>
                        <td>${grandTotal.fp}</td>
                        <td>${grandTotal.sl}</td>
                        <td>${grandTotal.lp}</td>
                        <td>${grandTotal.psl}</td>
                        <td>${grandTotal.expected_value.toFixed(2)}</td>
                        <td>${grandTotal.expected_psl.toFixed(2)}</td>
                        <td colspan="3"></td>
                    </tr>
                `;

                html += `</tbody></table>`;
                $container.html(html);

                $('.editable-field').click(function() {
                    makeEditable(this);
                });
                
            
            }
        }
    });

    function makeEditable(element) {
        let span = element.querySelector('.editable-span');
        let projectName = element.getAttribute('data-project');
        let field = element.getAttribute('data-field');
        let value = span.innerText.trim();

        let textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.classList.add('editable-input');

        textarea.style.width = '100%';
        textarea.style.minHeight = '80px';
        textarea.style.resize = 'vertical';

        textarea.oninput = function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        };

        textarea.onblur = function() {
            let newValue = textarea.value.trim();
            span.innerText = newValue;
            element.innerHTML = '';
            element.appendChild(span);

            if (!updatedProjects[projectName]) {
                updatedProjects[projectName] = {};
            }
            updatedProjects[projectName][field] = newValue;
        };

        element.innerHTML = '';
        element.appendChild(textarea);
        textarea.focus();
        textarea.select();
    }

    function submitUpdatedProjects() {
        if (Object.keys(updatedProjects).length === 0) {
            frappe.msgprint("No updates to submit.");
            return;
        }
        frappe.call({
            method: "jobpro.jobpro.page.psr_report.psr_report.update_project_remark_psr",
            args: { projects: updatedProjects },
            callback: function(response) {
                if (response.message) {
                    frappe.msgprint("Projects Updated Successfully");
                    updatedProjects = {};
                }
            }
        });
    }
};
