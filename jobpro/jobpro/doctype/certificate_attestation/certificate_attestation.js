// Copyright (c) 2025, teamPRO and contributors
// For license information, please see license.txt

frappe.ui.form.on("Certificate Attestation", {
	refresh(frm) {
        if (!frm.doc.so_created) {
			frm.set_intro(__("<h6 style ='color:red'><b>Alert:</b>Further process is Freezed as Sales Order Submmision is Pending.Please submit <b>Sales Order</b> immediately</h6>"))
		}
		if (frm.doc.status != "Completed" && frm.doc.so_created==0) {

			cur_frm.add_custom_button(__("Sale Order"), function () {
				if (frm.doc.payment == 'Client' && frm.doc.client_si <= 0) {
					msgprint("Please Enter Client Service Charge Value")
					
				} else if (frm.doc.payment == 'Candidate' && frm.doc.candidate_si <= 0) {
					msgprint("Please Enter Candidate Service Charge Value")
				} else if (frm.doc.payment == 'Associate' && frm.doc.associate_si <= 0) {
					msgprint("Please Enter Associate Service Charge Value")
				} else if (frm.doc.payment == 'Both' && frm.doc.client_si <= 0 && frm.doc.candidate_si <= 0) {
					msgprint("Please Enter Client and Candidate Service Charge Value")
				} else {
					
					frappe.confirm('Did you verified the payment terms?',
						function () {
							frappe.call({

								method: "jobpro.jobpro.doctype.certificate_attestation.certificate_attestation.create_sale_order",
								freeze: true,
								freeze_message: __("Creating Sales Order..."),
								args: {
									ca: cur_frm.doc.name,
									customer: cur_frm.doc.customer,
									reference_customer_: cur_frm.doc.customer,
									delivery_manager:'dc@groupteampro.com',
									candidate_name: cur_frm.doc.candidate_name,
									contact: cur_frm.doc.mobile,
									payment: cur_frm.doc.payment,
									billing_currency: cur_frm.doc.billing_currency,
									passport_no: cur_frm.doc.passport_number || '',
									passport_number : cur_frm.doc.passport_number ,
									supplier: cur_frm.doc.supplier_name ||'',
									service:"REC-I",
									client_si:cur_frm.doc.client_si,
									candidate_si:cur_frm.doc.candidate_si,
									associate: cur_frm.doc.associate || '',
									associate_sc: cur_frm.doc.associate_sc || '',
									associate_si:cur_frm.doc.associate_si,
									due_date:cur_frm.doc.due_date
								},
								callback: function (r) {
									frappe.msgprint(r.message);
									cur_frm.reload_doc();

								}
							});

						})
				}
				cur_frm.set_df_property("so_created", 1);

			}).addClass('btn btn-primary');
		}
	},
    payment: function (frm) {
		if (frm.doc.payment == 'Client') {
			frm.set_value('candidate_service_charge', 0)
			frm.set_value('candidate_si', 0)
		}
		if (frm.doc.payment == 'Candidate') {
			frm.set_value('client_si', 0)
		}
		if (frm.doc.payment == 'Both') {
			frm.set_value('candidate_service_charge', 0)
			frm.set_value('candidate_si', 0)
			frm.set_value('client_si', 0)
		}
    },
    onload: function (frm) {
				
		var so_created = 'No'
		if(frm.doc.so_created){
			so_created = 'Yes'
		}
		$(frm.fields_dict.html_1.wrapper).html(`
		<table border="1" width="100%">
		    <tbody><tr style="">
		        <td style = 'background-color:blue;color:white'><b>Document Status</b></td>
		        <td style = 'background-color:blue;color:white'><b>Sales Order Status</b></td>
		        <td style = 'background-color:blue;color:white'><b>Outstanding</b></td>
		    </tr>
		    <tr>
		        <td style = 'color:orange'><b>${frm.doc.status}</b></td>
		        <td style = 'color:orange'><b>${so_created}</b></td>
		        <td style = 'color:orange'><b>${frm.doc.outstanding_amount}</b></td>
		    </tr>
		</tbody></table>`);
	},
    setup: function(frm) {
		frm.set_query("associate", function() {
			return {
				filters: {
					'customer_group': "Associate"
				}
			}
		});
	},
	validate(frm) {
		if(!frm.doc.attestation_document){
			frm.set_value("status","In Progress")
		}
		if (frm.doc.payment == 'Associate') {
			var associate_service_charge = frm.doc.associate_si
			frm.set_value('associate_service_charge', associate_service_charge);
			
		}
		if (frm.doc.payment == "Candidate") {
			var candidate_service_charge = frm.doc.candidate_si
			frm.set_value('candidate_service_charge', candidate_service_charge);
		}
		var sum = 0;
		var candidate_si = frm.doc.candidate_si;
		frm.set_value("outstanding_amount", candidate_si)
		if (frm.doc.part_payment_collection) {
			$.each(frm.doc.part_payment_collection, function (i, item) {
				sum += item.amount;
			})
			if (sum == 0) {
				frm.set_value("collection_status", "YTS")
			}
			else if (sum >= frm.doc.candidate_si) {
				var amount = frm.doc.candidate_si - sum
				frm.set_value("outstanding_amount", amount)
				frm.set_value("collection_status", "PAID")
			}
			else {
				var amount = frm.doc.candidate_si - sum
				frm.set_value("outstanding_amount", amount)
				frm.set_value("collection_status", "Partially Paid")
			}
		}
	},
	passport_number: function (frm) {
		var regex = /[^0-9A-Za-z]/g;
		if (regex.test(frm.doc.passport_number) === true) {
			frappe.msgprint(__("Passport No.: Only letters and numbers are allowed."));
			frappe.validated = false;
		}
		var len = frm.doc.passport_number
		if (len.length < 8) {
			frappe.throw("Passport Number must be minimum 8 digits")
			frappe.validated = false;
		}
	},
	attestation_document(frm){
		frm.set_value("status","Completed")
	}
});
