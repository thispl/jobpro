
frappe.listview_settings["Closure"] = {
    onload: function (listview) {
        listview.page.add_inner_button(__('Certificate Attestation'), function() {
            frappe.new_doc('Certificate Attestation');
        });
            listview.page.add_action_item(__('Send WP Notification'), function () {
            let checked_items = listview.get_checked_items();

            if (!checked_items.length) {
                frappe.msgprint(__('Please select at least one Closure'));
                return;
            }

            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "Closure",
                    filters: { "name": ["in", checked_items.map(i => i.name)] },
                    fields: ["name", "given_name", "status"]
                },
                callback: function (r) {
                    if (!r.message || !r.message.length) {
                        frappe.msgprint(__('No valid Closure records found.'));
                        return;
                    }

                    let closures = r.message.filter(c => c.status === "Final Medical");

                    if (!closures.length) {
                        frappe.msgprint(__('No selected Candidates has status Final Medical.'));
                        return;
                    }

                    let table_html = `
                        <table class="table table-bordered;">
                            <thead>
                                <tr style="background-color:rgb(30, 12, 111);color:white">
                                    <th>Closure ID</th>
                                    <th>Candidate Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${closures.map(c => `
                                    <tr>
                                        <td>${c.name}</td>
                                        <td>${c.given_name || ""}</td>
                                        <td>${c.status}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    `;

                    let d = new frappe.ui.Dialog({
                        title: __('Send WP Notification'),
                        fields: [
                            {
                                fieldtype: "HTML",
                                fieldname: "closures_html",
                                options: table_html
                            }
                        ],
                        primary_action_label: __("Send"),
                        primary_action: function () {
                            frappe.call({
                                method: "frappe.client.insert",
                                args: {
                                    doc: {
                                        doctype: "Bulk Whatsapp Message",
                                        title: "Congratulations to candidate",
                                        // recipients: closures.map(c => ({
                                        //     mobile_number: "9940643740",
                                        // })),
                                        recipients: [
                                            { mobile_number: "9940643740" },
                                            { mobile_number: "9715327487" },
                                            { mobile_number: "9840242277" }
                                        ],
                                        template:"final_medical_candidates",
                                        message: "Final Medical Processing Notifications"
                                    }
                                },
                                callback: function (res) {
                                    if (!res.exc) {
                                        frappe.msgprint(__("WhatsApp Notification has been successfully sent to candidates"));
                                        d.hide();
                                    }
                                }
                            });
                        }
                    });

                    d.show();
                }
            });
        });
            

        // listview.page.add_action_item(__("Create SO"), () => {
        //     let checked_items = listview.get_checked_items();
        //     const doc_names = [];
        //     const validation_errors = [];
        //     checked_items.forEach((item) => {
        //         doc_names.push(item.name);
        //     });

        //     const validateClosure = (closureName) => {
        //         return frappe.call({
        //             method: 'frappe.client.get_value',
        //             args: {
        //                 doctype: 'Closure',
        //                 filters: { name: closureName },
        //                 fieldname: ['*']
        //             }
        //         }).then((response) => {
        //             if (response.message) {
        //                 const closure = response.message;

        //                 if (closure.status === "PSL") {
        //                     validation_errors.push(
        //                         `SO Can't be created for the closure ${closure.name} in PSL. Kindly remove it from the selected list.`
        //                     );
        //                 } else if (closure.payment === 'Client' && closure.client_si <= 0) {
        //                     validation_errors.push(
        //                         `Please enter the Client Service Charge value for ${closure.name}.`
        //                     );
        //                 } else if (closure.payment === 'Candidate' && closure.candidate_si <= 0) {
        //                     validation_errors.push(
        //                         `Please enter the Candidate Service Charge value for ${closure.name}.`
        //                     );
        //                 } else if (closure.payment === 'Associate' && closure.associate_si <= 0) {
        //                     validation_errors.push(
        //                         `Please enter the Associate Service Charge value for ${closure.name}.`
        //                     );
        //                 } else if (closure.payment === 'Both' && closure.client_si <= 0 && closure.candidate_si <= 0) {
        //                     validation_errors.push(
        //                         `Please enter both Client and Candidate Service Charge values for ${closure.name}.`
        //                     );
        //                 }
        //             }
        //         });
        //     };

        //     Promise.all(doc_names.map(validateClosure)).then(() => {
        //         if (validation_errors.length > 0) {
        //             frappe.msgprint(validation_errors.join("<br>"));
        //         } else {
        //             frappe.confirm(
        //                 'Have you verified the payment terms?',
        //                 function () {
        //                     frappe.call({
        //                         method: "jobpro.custom.create_sale_order_in_bulk",
        //                         freeze: true,
        //                         freeze_message: __("Creating Sales Order..."),
        //                         args: {
        //                             closure: doc_names
        //                         },
        //                         callback: function (response) {
        //                             frappe.msgprint(response.message || "Sales Order created successfully.");
        //                         }
        //                     });
        //                 }
        //             );
        //         }
        //     });
        // });
    }
};
