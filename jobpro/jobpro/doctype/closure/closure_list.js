// frappe.listview_settings["Closure"] = {
//     onload: function(listview) {
//         listview.page.add_action_item(__("Create SO"), ()=>{
//             let checked_items = listview.get_checked_items();
//             const doc_name = [];
//             checked_items.forEach((Item)=> {
//                 doc_name.push(Item.name);
//             });
//             $.each(doc_name,function(i,d){
//                 frappe.call({
//                     method: 'frappe.client.get_value',
//                     args: {
//                         doctype: 'Closure',
//                         filters: { name:d },
//                         fieldname: ['*']
//                     },
//                     callback: function(r) {
//                         if (r.message) {
//                             if(r.message.status=="PSL"){
//                                 frappe.throw("SO Can't Create for the closure "+ r.message.name + "in PSL. Kindly remove it form selected list")
//                             }
//                             else if (r.message.payment == 'Client' && r.message.client_si <= 0) {
//                                 msgprint("Please Enter Client Service Charge Value")
//                             }
//                             else if (r.message.payment == 'Candidate' && r.message.candidate_si <= 0) {
//                                 msgprint("Please Enter Candidate Service Charge Value")
//                             } 
//                             else if (r.message.payment == 'Associate' && r.message.associate_si <= 0) {
//                                 msgprint("Please Enter Associate Service Charge Value")
//                             } else if (r.message.payment == 'Both' && r.message.client_si <= 0 && r.message.candidate_si <= 0) {
//                                 msgprint("Please Enter Client and Candidate Service Charge Value")
//                             }
//                             else {
//                                 frappe.confirm('Did you verified the payment terms?',
//                                     function () {
//                                         frappe.call({
                                            
//                                             method: "jobpro.custom.create_sale_order_in_bulk",
//                                             freeze: true,
//                                             freeze_message: __("Creating Sales Order..."),
//                                             args: {
//                                                 closure: doc_name
//                                             },
//                                             callback: function (response) {
//                                                 // frappe.msgprint(response.message);
//                                                 // console.log(response.message)
//                                                 // console.log("hello")
//                                                 // response.message.reload_doc();
        
//                                             }
//                                         });
        
//                                     })
//                             }
//                         }
//                     }
//                 });
//             })

//         });
//     }

// }
frappe.listview_settings["Closure"] = {
    onload: function (listview) {
        listview.page.add_inner_button(__('Certificate Attestation'), function() {
            frappe.new_doc('Certificate Attestation');
        });
        listview.page.add_action_item(__("Create SO"), () => {
            let checked_items = listview.get_checked_items();
            const doc_names = [];
            const validation_errors = [];
            checked_items.forEach((item) => {
                doc_names.push(item.name);
            });

            const validateClosure = (closureName) => {
                return frappe.call({
                    method: 'frappe.client.get_value',
                    args: {
                        doctype: 'Closure',
                        filters: { name: closureName },
                        fieldname: ['*']
                    }
                }).then((response) => {
                    if (response.message) {
                        const closure = response.message;

                        if (closure.status === "PSL") {
                            validation_errors.push(
                                `SO Can't be created for the closure ${closure.name} in PSL. Kindly remove it from the selected list.`
                            );
                        } else if (closure.payment === 'Client' && closure.client_si <= 0) {
                            validation_errors.push(
                                `Please enter the Client Service Charge value for ${closure.name}.`
                            );
                        } else if (closure.payment === 'Candidate' && closure.candidate_si <= 0) {
                            validation_errors.push(
                                `Please enter the Candidate Service Charge value for ${closure.name}.`
                            );
                        } else if (closure.payment === 'Associate' && closure.associate_si <= 0) {
                            validation_errors.push(
                                `Please enter the Associate Service Charge value for ${closure.name}.`
                            );
                        } else if (closure.payment === 'Both' && closure.client_si <= 0 && closure.candidate_si <= 0) {
                            validation_errors.push(
                                `Please enter both Client and Candidate Service Charge values for ${closure.name}.`
                            );
                        }
                    }
                });
            };

            Promise.all(doc_names.map(validateClosure)).then(() => {
                if (validation_errors.length > 0) {
                    frappe.msgprint(validation_errors.join("<br>"));
                } else {
                    frappe.confirm(
                        'Have you verified the payment terms?',
                        function () {
                            frappe.call({
                                method: "jobpro.custom.create_sale_order_in_bulk",
                                freeze: true,
                                freeze_message: __("Creating Sales Order..."),
                                args: {
                                    closure: doc_names
                                },
                                callback: function (response) {
                                    frappe.msgprint(response.message || "Sales Order created successfully.");
                                }
                            });
                        }
                    );
                }
            });
        });
    }
};
