// Copyright (c) 2020, teamPRO and contributors
// For license information, please see license.txt

frappe.ui.form.on('Closure', {

	// ticket(frm){


	// },
	custom_local_mobile_number(frm) {
		if (!frm.doc.territory == 'Iraq') {
			frm.set_df_property("custom__emergency_contact_number_in_india", "reqd", 1)
			frm.set_df_property("candidate_google_review", "reqd", 1)
		}
		if (frm.doc.custom__emergency_contact_number_in_india && frm.doc.candidate_google_review && frm.doc.custom_local_mobile_number) {
			frm.set_value("status", "Arrived")
			frm.add_child("custom_history", {
				'status': frm.doc.status,
				'date': frappe.datetime.now_datetime(),
				'status_moved_by': frappe.session.user,
			})
			frm.refresh_field('custom_history')
		}
		else {
			if(frm.doc.territory!="Ascension Island")
			frm.set_value("status", "Onboarded")
			}

	},
	payment: function (frm) {
		if (frm.doc.payment == 'Client') {
			frm.set_value('candidate_service_charge', 0)
			// frm.set_value('candidate_dec', 0)
			frm.set_value('candidate_si', 0)
		}
		if (frm.doc.payment == 'Candidate') {
			// frm.set_value('client_service_charge', 0)
			// frm.set_value('client_dec', 0)
			frm.set_value('client_si', 0)
		}
		if (frm.doc.payment == 'Both') {
			frm.set_value('candidate_service_charge', 0)
			// frm.set_value('candidate_dec', 0)
			frm.set_value('candidate_si', 0)
			// frm.set_value('client_service_charge', 0)
			// frm.set_value('client_dec', 0)
			frm.set_value('client_si', 0)
		}
	},
	onload: function (frm) {

		// 	if (frm.doc.expiry_date && !frm.doc.expiry_period) {
		//     let today = new Date();
		//     let expiry = new Date(frm.doc.expiry_date);

		//     let diffYears = expiry.getFullYear() - today.getFullYear();
		//     let diffMonths = expiry.getMonth() - today.getMonth();

		//     if (diffMonths < 0) {
		//         diffYears -= 1;
		//         diffMonths += 12;
		//     }

		//     if (diffYears < 0 || (diffYears === 0 && diffMonths < 0)) {
		//         diffYears = 0;
		//         diffMonths = 0;
		//     }

		//     frm.set_value('expiry_period', `${diffYears} years, ${diffMonths} months`);
		// }

		var so_created = 'No'
		if (frm.doc.so_created) {
			so_created = 'Yes'
		}

		$(frm.fields_dict.html_1.wrapper).html(`
		<table border="1" width="100%">
		    <tbody><tr style="">
		        <td style = 'background-color:blue;color:white'><b>Document Status</b></td>
		        <td style = 'background-color:blue;color:white'><b>Sales Order Status</b></td>
				<td style = 'background-color:blue;color:white'><b>Visa Status</b></td>
		        <td style = 'background-color:blue;color:white'><b>Collection Priority</b></td>
		        <td style = 'background-color:blue;color:white'><b>Outstanding</b></td>
		    </tr>
		    <tr>
		        <td style = 'color:orange'><b>${frm.doc.status}</b></td>
		        <td style = 'color:orange'><b>${so_created}</b></td>
		        <td style = 'color:orange'><b>${frm.doc.visa_status}</b></td>
		        <td style = 'color:orange'><b>${frm.doc.collection_priority}</b></td>
		        <td style = 'color:orange'><b>${frm.doc.outstanding_amount}</b></td>
		    </tr>
		</tbody></table>`);






		// cur_frm.set_df_property("premedical_section", "hidden", 1);
		// cur_frm.set_df_property("certificate_attestation_section", "hidden", 1);
		// cur_frm.set_df_property("final_medical_section", "hidden", 1);
		// cur_frm.set_df_property("visa_stamping_section", "hidden", 1);
		// cur_frm.set_df_property("section_break_79", "hidden", 1);
		// cur_frm.set_df_property("ticket_section", "hidden", 1);
	},
	setup: function (frm) {
		frm.set_query("associate", function () {
			return {
				filters: {
					'customer_group': "Associate"
				}
			}
		});
		frm.set_query("stamping_vendor", function () {
			return {
				filters: {
					'supplier_group': "Visa Stamping"
				}
			}
		});
		frm.set_query("standard_remarks", function () {
			return {
				filters: {
					status: frm.doc.status || ""
				}
			};
		});
	},

	status: function (frm) {
		// console.log("inside history")
		// frm.add_child("custom_history",{
		// 	'status':frm.doc.status,
		// 	'date':frappe.datetime.now_datetime(),
		// 	'status_moved_by':frappe.session.user,
		// })
		// frm.refresh_field('custom_history')
		// frm.set_value("custom_status_transition",frappe.datetime.now_datetime())
		// frm.set_value("custom_previous_status",frm.doc.status)
		if (frm.doc.status == "Dropped") {
			frappe.call({
				method: 'teampro.email_alerts.send_mail_to_drop',
				args: {
					name: frm.doc.name
				},
				callback: function (r) {

				}
			});
		}
	},
	pp_original_at: function (frm) {
		// if(frm.doc.pp_original_at=="TEAMPRO"){
		// 	frappe.call({
		// 		method: 'teampro.email_alerts.send_mail_to_candidate',
		// 		args: {
		// 			candidate_id:frm.doc.candidate
		// 		},
		// 		callback: function(r) {
		// 		}
		// 	});
		// }
		// 	else if(frm.doc.pp_original_at=="Candidate"){
		// 		frappe.call({
		// 			method: 'teampro.email_alerts.send_mail_to_candidate_pass_return',
		// 			args: {
		// 				candidate_id:frm.doc.candidate
		// 			},
		// 			callback: function(r) {
		// 			}
		// 		});
		// 	}
	},
	// custom_country_code:function(frm){
	// 	let countryCode = frm.doc.custom_country_code.match(/\+\d+/)[0];
	//     if (countryCode) {
	//         frm.set_value('custom_local_mobile_number', `${countryCode}`);
	//     }
	// },
	candidate_si(frm) {
		if (frm.doc.billing_currency != "INR") {
			frappe.call({
				method: "frappe.client.get_list",
				args: {
					doctype: "Currency Exchange",
					filters: {
						from_currency: frm.doc.billing_currency,
						to_currency: "INR"
					},
					fields: ["exchange_rate", "date"],
					order_by: "date desc",
					limit_page_length: 1
				},
				callback: function (r) {
					if (r.message && r.message.length > 0) {
						const rate = r.message[0].exchange_rate;
						frm.set_value("candidate_payment_company_currenc", (frm.doc.candidate_si * rate))
					} else {
						frm.set_value("candidate_payment_company_currenc", 0.00)
					}
				}
			});
		}
		else {
			frm.set_value("candidate_payment_company_currenc", frm.doc.candidate_si)
		}
	},
	billing_currency(frm) {
		frm.set_df_property("candidate_si", "label", "Candidate SI (" + frm.doc.billing_currency + ")");
		if (frm.doc.billing_currency != "INR") {
			frappe.call({
				method: "frappe.client.get_list",
				args: {
					doctype: "Currency Exchange",
					filters: {
						from_currency: frm.doc.billing_currency,
						to_currency: "INR"
					},
					fields: ["exchange_rate", "date"],
					order_by: "date desc",
					limit_page_length: 1
				},
				callback: function (r) {
					if (r.message && r.message.length > 0) {
						const rate = r.message[0].exchange_rate;
						frm.set_value("candidate_payment_company_currenc", (frm.doc.candidate_si * rate))
					} else {
						frm.set_value("candidate_payment_company_currenc", 0.00)
					}
				}
			});
		}
		else {
			frm.set_value("candidate_payment_company_currenc", frm.doc.candidate_si)
		}
	},
	client_si(frm) {
		if (frm.doc.custom_client_billing_currency != "INR") {
			frappe.call({
				method: "frappe.client.get_list",
				args: {
					doctype: "Currency Exchange",
					filters: {
						from_currency: frm.doc.custom_client_billing_currency,
						to_currency: "INR"
					},
					fields: ["exchange_rate", "date"],
					order_by: "date desc",
					limit_page_length: 1
				},
				callback: function (r) {
					if (r.message && r.message.length > 0) {
						const rate = r.message[0].exchange_rate;
						frm.set_value("client_payment_company_currency", (frm.doc.client_si * rate))
					} else {
						frm.set_value("client_payment_company_currency", 0.00)
					}
				}
			});
		}
		else {
			frm.set_value("client_payment_company_currency", frm.doc.client_si)
		}
	},
	custom_client_billing_currency(frm) {
		frm.set_df_property("client_si", "label", "Client SI (" + frm.doc.custom_client_billing_currency + ")");
		if (frm.doc.custom_client_billing_currency != "INR") {
			frappe.call({
				method: "frappe.client.get_list",
				args: {
					doctype: "Currency Exchange",
					filters: {
						from_currency: frm.doc.custom_client_billing_currency,
						to_currency: "INR"
					},
					fields: ["exchange_rate", "date"],
					order_by: "date desc",
					limit_page_length: 1
				},
				callback: function (r) {
					if (r.message && r.message.length > 0) {
						const rate = r.message[0].exchange_rate;
						frm.set_value("client_payment_company_currency", (frm.doc.client_si * rate))
					} else {
						frm.set_value("client_payment_company_currency", 0.00)
					}
				}
			});
		}
		else {
			frm.set_value("client_payment_company_currency", frm.doc.client_si)
		}
	},
	associate_si(frm) {
		if (frm.doc.custom_associate_billing_currency != "INR") {
			frappe.call({
				method: "frappe.client.get_list",
				args: {
					doctype: "Currency Exchange",
					filters: {
						from_currency: frm.doc.custom_associate_billing_currency,
						to_currency: "INR"
					},
					fields: ["exchange_rate", "date"],
					order_by: "date desc",
					limit_page_length: 1
				},
				callback: function (r) {
					if (r.message && r.message.length > 0) {
						const rate = r.message[0].exchange_rate;
						frm.set_value("custom_associate_payment_company_currency", (frm.doc.associate_si * rate))
					} else {
						frm.set_value("custom_associate_payment_company_currency", 0.00)
					}
				}
			});
		}
		else {
			frm.set_value("custom_associate_payment_company_currency", frm.doc.associate_si)
		}
	},
	custom_associate_billing_currency(frm) {
		frm.set_df_property("associate_si", "label", "Associate SI (" + frm.doc.custom_associate_billing_currency + ")");
		if (frm.doc.custom_associate_billing_currency != "INR") {
			frappe.call({
				method: "frappe.client.get_list",
				args: {
					doctype: "Currency Exchange",
					filters: {
						from_currency: frm.doc.custom_associate_billing_currency,
						to_currency: "INR"
					},
					fields: ["exchange_rate", "date"],
					order_by: "date desc",
					limit_page_length: 1
				},
				callback: function (r) {
					if (r.message && r.message.length > 0) {
						const rate = r.message[0].exchange_rate;
						frm.set_value("custom_associate_payment_company_currency", (frm.doc.associate_si * rate))
					} else {
						frm.set_value("custom_associate_payment_company_currency", 0.00)
					}
				}
			});
		}
		else {
			frm.set_value("custom_associate_payment_company_currency", frm.doc.associate_si)
		}
	},
	refresh: function (frm) {
		// frm.add_custom_button(__('Create SO'), function () {
		// 	frappe.call({
		// 										method: "jobpro.jobpro.doctype.closure.closure.create_sale_order",
		// 										freeze: true,
		// 										freeze_message: __("Creating Sales Order..."),
		// 										args: {
		// 											closure: frm.doc.name,
		// 											project: frm.doc.project,
		// 											domestic: frm.doc.custom_is_domestic,
		// 											customer: frm.doc.customer,
		// 											reference_customer_: frm.doc.customer,
		// 											account_manager: frm.doc.account_manager,
		// 											delivery_manager: frm.doc.candidate_owner || '',
		// 											task: frm.doc.task,
		// 											candidate_name: frm.doc.given_name,
		// 											contact: frm.doc.mobile,
		// 											payment: frm.doc.payment,
		// 											billing_currency: frm.doc.billing_currency,
		// 											client_sc: frm.doc.client_sc || '',
		// 											associate_cur: frm.doc.custom_associate_billing_currency,
		// 											client_cur: frm.doc.custom_client_billing_currency,
		// 											candidate_sc: frm.doc.candidate_sc || '',
		// 											territory: frm.doc.territory,
		// 											passport_no: frm.doc.passport_no || '',
		// 											candidate_owner: frm.doc.candidate_owner || '',
		// 											sa_id: frm.doc.sa_id || '',
		// 											passport_number: frm.doc.passport_no,
		// 											expected_doj: frm.doc.expected_doj || '',
		// 											supplier: frm.doc.sa_id || '',
		// 											service: frm.doc.service,
		// 											sc: frm.doc.candidate_sc || frm.doc.client_sc,
		// 											client_si: frm.doc.client_si,
		// 											candidate_si: frm.doc.candidate_si,
		// 											associate: frm.doc.associate || '',
		// 											associate_sc: frm.doc.associate_si || '',
		// 											associate_si: frm.doc.associate_si,
		// 										},
		// 										callback: function (r) {
		// 											frappe.msgprint(r.message);
		// 											frm.set_value("so_created", 1);
		// 											frm.reload_doc();
		// 										}
		// 									});
		// })
		frm.set_query("standard_remarks", function () {
			return {
				filters: {
					status: frm.doc.status || ""
				}
			};
		});

		setTimeout(() => {
			$("#latest-remarks").val(frm.doc.remark || "");
			$(".remarks-submit").hide();

		}, 300);

		frm.set_df_property("candidate_si", "label", "Candidate SI (" + frm.doc.billing_currency + ")");
		frm.set_df_property("client_si", "label", "Client SI (" + frm.doc.custom_client_billing_currency + ")");
		frm.set_df_property("associate_si", "label", "Associate SI (" + frm.doc.custom_associate_billing_currency + ")");


		if (!frm.fields_dict['dashboard']) return;

		const dashboardWrapper = frm.fields_dict['dashboard'].$wrapper;
		dashboardWrapper.empty();
		if (!$("link[href*='fontawesome']").length) {
			$("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">');
		}

		const ecrBorderColor = frm.doc.ecr_status === "ECR" ? "#ff9800" : "#ccc";

		const mainContainer = $(`
    <div class="candidate-dashboard" style="
    display:flex; 
    flex-wrap:wrap; 
    gap:20px; 
    width:100%; 
    border:2px solid ${ecrBorderColor}; 
    border-radius:18px; 
    padding:30px; 
    box-shadow: 0 12px 25px rgba(0,0,0,0.12);
    background:linear-gradient(145deg, #ffffff, #f0f2f5);
    transition: all 0.3s ease;
">
        <div class="left-column" style="flex:1; min-width:250px; padding:0;height:560px;"></div>
       <div class="right-column" style="flex:5; min-width:450px; padding:0px; overflow:auto; height:560px;"></div>

    </div>
`);

		const flagMap = {
			"Qatar": "https://flagcdn.com/w80/qa.png",
			"UAE": "https://flagcdn.com/w80/ae.png",
			"Oman": "https://flagcdn.com/w80/om.png",
			"Kuwait": "https://flagcdn.com/w80/kw.png",
			"KSA": "https://flagcdn.com/w80/sa.png",
			"Iraq": "https://flagcdn.com/w80/iq.png",
			"Bahrain": "https://flagcdn.com/w80/bh.png",
			"India": "https://flagcdn.com/w80/in.png"
		};

		const leftCol = mainContainer.find('.left-column');

		const territoryFlag = flagMap[frm.doc.territory] || "https://cdn-icons-png.flaticon.com/512/484/484582.png";
		leftCol.append(`
    <div style="display:flex;  align-items:center; margin-bottom:20px;">
       
        <div style="font-weight:700; font-size:16px; color:#333;">
            ${frm.doc.given_name || 'Unknown'}
        </div>
    </div>
`);

		const currencyValue = frm.doc.candidate_payment_company_currenc
			|| frm.doc.client_payment_company_currency
			|| frm.doc.custom_associate_payment_company_currency
			|| 0;

		const formattedCurrency = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'INR'
		}).format(currencyValue);


		const candidateCurrencyValue = frm.doc.candidate_payment_company_currenc || 0;
		const clientCurrencyValue = frm.doc.client_payment_company_currency || 0;


		const formatter = new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'INR',
			minimumFractionDigits: 2,
		});


		const formattedCandidate = formatter.format(candidateCurrencyValue);
		const formattedClient = formatter.format(clientCurrencyValue);


		const format_both = `(${formattedClient} + ${formattedCandidate})`;

		let soImage = "";

		if (frm.doc.so_created == 1) {
			soImage = "/file/c35b772ef8/b700dbd353SO Created.png";
		} else {
			soImage = "/file/98038ba673/bb5fe0c06cSO Pending.png";
		}
		const candidateFields = [
			{ icon: "fas fa-phone", value: frm.doc.mobile || '-' },
			{ icon: "fas fa-envelope", value: frm.doc.email_id || '-' },
			{ icon: "fas fa-passport", value: frm.doc.passport_no || '-' },
			{ icon: "fas fa-building", value: frm.doc.customer || '-' },
			{ icon: "fas fa-globe", value: frm.doc.territory || '-' },
			{ icon: "fas fa-user-tie", value: frm.doc.task_subject || '-' },
			{ icon: "fas fa-money-bill-wave", value: frm.doc.payment == "Both" ? format_both : formattedCurrency },
			{ icon: "fas fa-flag", value: frm.doc.nationality || '-' },
		];


		candidateFields.forEach(field => {
			leftCol.append(`
        <div style="display:flex; align-items:center; margin-bottom:10px; font-size:14px; color:#333;">
            <i class="${field.icon}" style="width:20px; margin-right:3px; color:#007bff;"></i>
            <span>${field.value}</span>
        </div>
    `);

		});
		leftCol.append(`
    <div style="display:flex; align-items:center; margin-bottom:10px;margin-bottom:5px; text-align:center;">
        <img src="${soImage}" style="width:100px; height:auto;margin-right:10px;"> 
    </div>
	<button class="btn btn-primary" onclick="open_so(cur_frm)">Click to SO</button><br>

	<div style="display:flex; flex-direction:column; align-items:start;  margin-bottom:5px; text-align:center;">
    <label>Latest Remarks</label>
	<textarea id="latest-remarks"  style="height:120px; width:205px; border-radius:8px; background-color:#f3f3f3; padding:8px; resize:none;" ></textarea>

	</div>

	<div style="text-align:right;">
	<button class="remarks-submit"  style=" display:none; background-color:black;  border-radius:8px; color:white; margin-right:45px; "> submit </button>
	</div>
	
	
`);

		$(document).on("input", "#latest-remarks", function () {
			const currentValue = $(this).val();
			const savedValue = frm.doc.remark || "";

			if (currentValue.trim() !== savedValue.trim()) {
				$(".remarks-submit").show();
			} else {
				$(".remarks-submit").hide();
			}
		});

		$(document).on('click', '.remarks-submit', function () {


			const remark = $('#latest-remarks').val();

			frm.set_value("remark", remark);

			frm.save().then(r => {


				frappe.call({
					method: "frappe.desk.form.utils.add_comment",
					args: {
						reference_doctype: frm.doctype,
						reference_name: frm.docname,
						content: remark,
						comment_by: frappe.session.user,
						comment_email: frappe.session.user
					},
					callback: function (r) {
					}
				});

				$(".remarks-submit").hide();
				location.reload();
			})



		})

		const rightCol = mainContainer.find('.right-column');
		const flowContainer = $('<div class="status-flow" style="position:relative; min-height:400px;"></div>');
		rightCol.append(flowContainer);


		const customer_so = frm.doc.so_not_needed || 0;
		let statuses = [];

		const territory = frm.doc.territory;
		const subTerritory = frm.doc.visa_state || null; // if applicable

		if (territory === "Qatar") {
			statuses = ["PSL", "Client Offer Letter", "Signed Offer Letter", "PCC", "Visa", "Emigration", "Ticket", "Onboarding", "Onboarded", "Arrived"];
		} else if (territory === "UAE") {
			if (subTerritory === "Abudhabi") {
				statuses = ["PSL", "Client Offer Letter", "Signed Offer Letter", "Visa", "PCC", "Final Medical", "Visa Stamping", "Emigration", "Ticket", "Onboarding", "Onboarded", "Arrived"];
			} else if (subTerritory === "Dubai") {

				statuses = ["PSL", "Client Offer Letter", "Signed Offer Letter", "Visa", "PCC", "Final Medical", "Emigration", "Ticket", "Onboarding", "Onboarded", "Arrived"];
			}
		} else if (territory === "Oman") {
			statuses = ["PSL", "Client Offer Letter", "Signed Offer Letter", "PCC", "Final Medical", "Visa", "Emigration", "Ticket", "Onboarding", "Onboarded", "Arrived"];
		} else if (territory === "Kuwait") {
			statuses = customer_so == 1
				? ["PSL", "Client Offer Letter", "Signed Offer Letter", "Premedical", "PCC", "Visa", "Final Medical", "Visa Stamping", "Onboarding", "Onboarded", "Arrived"]
				: ["PSL", "Client Offer Letter", "Signed Offer Letter", "Premedical", "PCC", "Visa", "Final Medical", "Visa Stamping", "Emigration", "Ticket", "Onboarding", "Onboarded", "Arrived"];
		} else if (territory === "KSA") {
			statuses = frm.doc.nationality === "Indian"
				? ["PSL", "Client Offer Letter", "Signed Offer Letter", "Visa", "PCC", "Final Medical", "Biometric", "QVP","Trade Test", "Visa Stamping", "Emigration", "Ticket", "Onboarding", "Onboarded", "Arrived"]
				: ["PSL", "Client Offer Letter", "Signed Offer Letter", "Visa", "PCC", "Final Medical", "Biometric", "QVP","Visa Stamping", "Emigration", "Ticket", "Onboarding", "Onboarded", "Arrived"];
		} else if (territory === "Iraq") {
			statuses = ["PSL", "Visa", "Emigration", "Onboarding", "Onboarded", "Arrived"];
		} else if (territory === "Bahrain") {
			statuses = ["PSL", "Client Offer Letter", "Signed Offer Letter", "Final Medical", "Visa", "Emigration", "Ticket", "Onboarding", "Onboarded", "Arrived"];
		} else if (territory === "Dammam" || territory == "Jeddah" || territory == "Riyadh") {
			statuses = ["PSL", "Client Offer Letter", "Signed Offer Letter", "Visa", "PCC", "Final Medical", "Biometric", "Visa Stamping", "Emigration", "Ticket", "Onboarding", "Onboarded", "Arrived"]
		}
		else if(territory==="Ascension Island"){
			statuses = ["PSL","Sales Order","Arrived"]
		}
		else {
			// default fallback
			statuses = ["PSL", "Client Offer Letter", "Signed Offer Letter", "PCC", "Visa", "Emigration", "Ticket", "Onboarding", "Onboarded", "Arrived"];
		}

		// Status setup
		const currentStatus = frm.doc.status || "PSL";

		

		const icons = {
			"PSL": "/file/94f09b76bc/93157f45db6b35echeck.png",
			"Client Offer Letter": "/file/62fa1a8f20/96f32c107ffdd6dcontracct_16930579.png",
			"Signed Offer Letter": "/file/a3fbbc1b54/3a4ab3fb7c56046draw_15618756.png",
			"PCC": "/file/0c81ebf06b/34b5aa8bb83e021identity_12988210.png",
			"Visa": "/file/44337c3673/bb3d3676c14eee8passport_620765.png",
			"Emigration": "/file/b9bf2a2d2b/c25078ceb1100fadepartures_619171.png",
			"Ticket": "/file/6d50782e14/1a0cb5a140d84f7ticket_1614997.png",
			"Onboarding": "/file/92f4ac4cf5/125bea3782bde2aadd-friend_9798159.png",
			"Onboarded": "/file/b4dfc454b2/f1aee6072290a5buser_8763379.png",
			"Arrived": "/file/ecd8410208/03f5b6e69571ecfflag_469091.png",
			"Final Medical": "/file/17d4d8513b/2ed5a7d881a7733medical_11104018.png",
			"Visa Stamping": "/file/013dd8afd0/15e69f227a0c3b3stamp_16796951.png",
			"Trade Test": "/file/f13f6b56df/c6c28f8f5437e5amedal_411728.png",
			"Biometric": "/file/6de15bd423/75fb7b7328a6e7btouch_1410059.png",
			"Premedical": "/file/b863ca2af7/ac95d92f09e01dbstethoscope_7404160.png",
			"Sales Order":"/file/d0f5c598a5/2fd8d6402dSales_Order_Image-removebg-preview.png",
			"QVP":"/file/321fc21503/6c1fa0677eQVP Image.png"

		};


		$("<style>").prop("type", "text/css").html(`



				.icon-green { color:#28a745; }
				.icon-blue { color:#007bff; }
				.icon-purple { color:#6f42c1; }
				.icon-teal { color:#17a2b8; }
				.icon-brown { color:#795548; }
				.icon-orange { color:#ff5722; }
				.icon-yellow { color:#ffc107; }
				.icon-mint { color:#20c997; }
				.icon-green2 { color:#28a745; }
				.icon-black { color:#000; }
				.icon-pink { color:#e91e63; }
				.icon-violet { color:#9c27b0; }
				.icon-gold { color:#ff9800; }
				.icon-indigo { color:#3f51b5; }
				.icon-aqua { color:#009688; }




				.status-box {
				width:140px; height:75px; border-radius:12px;
				background:#fff; text-align:center;
				box-shadow:0 2px 8px rgba(0,0,0,0.08);
				position:absolute; display:flex;
				flex-direction:column; align-items:center; justify-content:center;
				transition:0.3s;
				}
				.status-box i { font-size:20px; margin-bottom:5px; }
				.status-box.completed { border:2px solid #28a745; background:#d4f8d4; }
				.status-box.active { border:2px solid #007bff;
				background:linear-gradient(135deg,#80c3ff,#007bff); color:#fff; }

				/* --- CONNECTOR STYLING WITH ARROWS --- */
				.connector {
				position:absolute;
				background:#ccc;
				height:2px;
				border-radius:2px;
				}
				.connector.completed { background:#28a745; }
				.connector.active { background:#007bff; }

				/* add arrowhead using :after pseudo-element */
				.connector::after {
				content:"";
				position:absolute;
				right:0;
				top:50%;
				transform:translateY(-50%) rotate(0deg);
				width:0; height:0;
				border-top:6px solid transparent;
				border-bottom:6px solid transparent;
				border-left:10px solid #ccc;
				}
				.connector.completed::after { border-left-color:#28a745; }
				.connector.active::after { border-left-color:#007bff; }
				.status-box {
					z-index: 5;
				}


				`).appendTo("head");

		const perRow = 3;
		const boxWidth = 140;
		const boxHeight = 70;
		const hGap = 50;
		const vGap = 50;

		let positions = [];

		statuses.forEach((s, i) => {
			const rowIndex = Math.floor(i / perRow);
			const colIndex = i % perRow;
			const isOddRow = rowIndex % 2 !== 0;

			const x = isOddRow ? (perRow - 1 - colIndex) * (boxWidth + hGap) : colIndex * (boxWidth + hGap);
			const y = rowIndex * (boxHeight + vGap);

			const cls = (s === currentStatus ? "active" : (statuses.indexOf(currentStatus) > i ? "completed" : ""));

			let sourced_date_html = "";
			if (frm.doc.custom_history) {
				const matchingRows = frm.doc.custom_history.filter(r => r.status === s);
				if (matchingRows.length) {
					matchingRows.sort((a, b) => new Date(b.date) - new Date(a.date));
					const latestRow = matchingRows[0];
					if (latestRow.date) {
						const dt = frappe.datetime.str_to_user(latestRow.date);
						const parts = dt.split(" ");
						sourced_date_html = `
                    <div style="font-size:10px; color:#555; margin-top:3px; text-align:center;">
                        ${parts[0]}&nbsp;${parts.slice(1).join(" ")}
                    </div>`;
					}
				}
			}



			const box = $(`
        <div class="status-box ${cls}" style="left:${x}px; top:${y}px;">
           <!-- <i class="${icons[s]}"></i> -->
		  	<img src="${icons[s]}" style="width:30px; height:30px;" /> 
            <div style="font-size:12px; font-weight:600;">${s}</div>
            ${sourced_date_html}  <!-- Inject date/time below status -->
        </div>
    `);

			let isPccComplete = !!frm.doc.pcc;
			let isVisaComplete = !!frm.doc.visa;

			if (frm.doc.territory === "Kuwait" && (s === "Visa" || s === "PCC")) {

				if (isPccComplete && isVisaComplete) {
					box.removeClass("active");
					box.addClass("completed");   
				} 
				else if (isPccComplete || isVisaComplete) {
					box.removeClass("completed");
					box.addClass("active");      
				}
			}

		
			box.on("click", function () {
				let fields = [];
				const status = statuses[i];
				const current_status_index = statuses.indexOf(frm.doc.status);
				const clicked_status_index = statuses.indexOf(status);

				if (clicked_status_index < current_status_index) {
					frappe.show_alert(`You cannot update a previous status: ${status}`);
					return;
				}
				// Qatar
				if (status === "PSL" && (frm.doc.territory == "Qatar") && !(frm.doc.passport && frm.doc.photo)) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Client Offer Letter'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status === "PSL" || status == "Client Offer Letter") && frm.doc.territory == "Qatar") {
					fields = [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					];
				}
				else if ((status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter") && frm.doc.territory == "Qatar") {
					fields = [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					];
				}
				else if (frm.doc.territory == "Qatar" && (status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "PCC")) {
					fields = [
						{
							label: 'PCC',
							fieldtype: 'Attach',
							fieldname: 'pcc',
						},
						{
							label: 'PCC Not Applicable',
							fieldtype: 'Check',
							fieldname: 'pcc_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					];
				}
				else if (frm.doc.territory == "Qatar" && (status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "PCC" || status == "Visa")) {
					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					];
				}
				else if (frm.doc.territory == "Qatar" && (status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "PCC" || status == "Visa" || status == "Emigration")) {
					fields = [
						{
							label: 'Emigration Not Applicable',
							fieldtype: 'Check',
							fieldname: 'emigration_not_applicable',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Declaration',
							fieldtype: 'Attach',
							fieldname: 'declaration',
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'column_1',
						},
						{
							label: 'Insurance',
							fieldtype: 'Attach',
							fieldname: 'attach_insurance',
						},
						{
							label: 'Employment Contract',
							fieldtype: 'Attach',
							fieldname: 'employment_contract',
						},
						{
							fieldtype: 'Section Break',
							fieldname: 'section_1',
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					];
				}
				else if (frm.doc.territory == "Qatar" && (status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "PCC" || status == "Visa" || status == "Emigration" || status == "Ticket")) {
					fields = [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd: 1,
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}
					];
				}
				else if (status === "Onboarding" && (frm.doc.territory == "Iraq" || frm.doc.territory == "Oman" || frm.doc.territory == "Qatar" || (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh") || frm.doc.territory == "Bahrain" || (frm.doc.territory == "Kuwait") || (frm.doc.territory == "KSA") || (frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Abudhabi' || frm.doc.visa_state == 'Dubai'))) && frm.doc.status == "Onboarding") {
					fields = [
						{
							label: 'Onboarded',
							fieldtype: 'Check',
							fieldname: 'onboarded',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarded'
									}
								};
							}
						}
					];
				}
				else if (status === "Arrived" && (frm.doc.territory == "Iraq" || frm.doc.territory == "Oman" || frm.doc.territory == "Qatar" || (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh") || frm.doc.territory == "Bahrain" || (frm.doc.territory == "Kuwait") || (frm.doc.territory == "KSA") || (frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Abudhabi' || frm.doc.visa_state == 'Dubai'))) && frm.doc.status == "Onboarded") {
					fields = [
						{
							label: 'Emergency Contact Number in India',
							fieldtype: 'Data',
							fieldname: 'custom__emergency_contact_number_in_india',
							reqd: 1,
						},
						{
							label: 'Candidate Google Review',
							fieldtype: 'Data',
							fieldname: 'candidate_google_review',
							reqd: 1,
						},
						{
							label: 'Local Mobile Number',
							fieldtype: 'Phone',
							fieldname: 'custom_local_mobile_number',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Arrived'
									}
								};
							}
						}

					];
				}
				// Abudhabi
				if (status === "PSL" && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Abudhabi') && !(frm.doc.passport && frm.doc.photo)) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Client Offer Letter'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status === "PSL" || status == "Client Offer Letter") && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Abudhabi')) {
					fields = [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					];
				}
				else if ((status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter") && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Abudhabi')) {
					fields = [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					];
				}
				else if (frm.doc.territory == "UAE" && frm.doc.visa_state == 'Abudhabi' && (status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "PCC" || status == "Visa")) {
					fields = [
						{
							label: 'PCC',
							fieldtype: 'Attach',
							fieldname: 'pcc',
						},
						{
							label: 'PCC Not Applicable',
							fieldtype: 'Check',
							fieldname: 'pcc_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					];
				}
				else if (frm.doc.territory == "UAE" && frm.doc.visa_state == 'Abudhabi' && (status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "Visa")) {
					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					];
				}
				else if (frm.doc.territory == "UAE" && frm.doc.visa_state == 'Abudhabi' && (status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "PCC" || status == "Visa" || status == "Final Medical")) {
					fields = [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd: 1,
						},


						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						}

					];
				}
				else if (frm.doc.territory == "UAE" && frm.doc.visa_state == 'Abudhabi' && (status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "PCC" || status == "Visa" || status == "Final Medical" || status == "Visa Stamping")) {

					fields = [
						{
							label: 'Stamped Visa',
							fieldtype: 'Attach',
							fieldname: 'visa_stamping',
							reqd: 1,
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					];
				}
				else if (frm.doc.territory == "UAE" && frm.doc.visa_state == 'Abudhabi' && (status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "PCC" || status == "Visa" || status == "Final Medical" || status == "Visa Stamping" || status == "Emigration")) {
					fields = [
						{
							label: 'Emigration Not Applicable',
							fieldtype: 'Check',
							fieldname: 'emigration_not_applicable',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Declaration',
							fieldtype: 'Attach',
							fieldname: 'declaration',
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'column_1',
						},
						{
							label: 'Insurance',
							fieldtype: 'Attach',
							fieldname: 'attach_insurance',
						},
						{
							label: 'Employment Contract',
							fieldtype: 'Attach',
							fieldname: 'employment_contract',
						},
						{
							fieldtype: 'Section Break',
							fieldname: 'section_1',
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					];
				}
				else if (frm.doc.territory == "UAE" && frm.doc.visa_state == 'Abudhabi' && (status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "PCC" || status == "Visa" || status == "Final Medical" || status == "Visa Stamping" || status == "Emigration" || status == "Ticket")) {
					fields = [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd: 1,
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}
					];
				}
				// Dubai
				if (status === "PSL" && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Dubai') && !(frm.doc.passport && frm.doc.photo)) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Client Offer Letter'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status === "PSL" || status == "Client Offer Letter") && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Dubai')) {
					fields = [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					];
				}
				else if ((status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter") && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Dubai')) {
					fields = [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					];
				}
				else if ((status == "Visa" || status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter") && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Dubai')) {
					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					];

				}
				else if ((status == "PCC" || status === "PSL" || status == "Visa" || status == "Client Offer Letter" || status == "Signed Offer Letter") && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Dubai')) {
					fields = [
						{
							label: 'PCC',
							fieldtype: 'Attach',
							fieldname: 'pcc',
						},
						{
							label: 'PCC Not Applicable',
							fieldtype: 'Check',
							fieldname: 'pcc_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					];
				}
				else if ((status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "Visa" || status == "Final Medical" || status == "PCC") && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Dubai')) {

					fields = [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
						},
						{
							label: 'Final Medical Not Applicable',
							fieldtype: 'Check',
							fieldname: 'final_medical_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					];
				}


				else if ((status == "Emigration" || status == "Visa" || status == "PCC" || status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "Final Medical") && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Dubai')) {
					fields = [
						{
							label: 'Emigration Not Applicable',
							fieldtype: 'Check',
							fieldname: 'emigration_not_applicable',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Declaration',
							fieldtype: 'Attach',
							fieldname: 'declaration',
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'column_1',
						},
						{
							label: 'Insurance',
							fieldtype: 'Attach',
							fieldname: 'attach_insurance',
						},
						{
							label: 'Employment Contract',
							fieldtype: 'Attach',
							fieldname: 'employment_contract',
						},
						{
							fieldtype: 'Section Break',
							fieldname: 'section_1',
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					];

				}
				else if ((status == "Ticket" || status == "Emigration" || status == "Visa" || status == "PCC" || status === "PSL" || status == "Client Offer Letter" || status == "Signed Offer Letter" || status == "Final Medical") && frm.doc.territory == "UAE" && (frm.doc.visa_state == 'Dubai')) {
					fields = [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd: 1,
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}
					];

				}
				// Oman
				if (status === "PSL" && frm.doc.territory == "Oman" && !(frm.doc.passport && frm.doc.photo)) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Client Offer Letter'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status == "Client Offer Letter" || status === "PSL") && frm.doc.territory == "Oman") {
					fields = [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					];
				}
				else if ((status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && frm.doc.territory == "Oman") {
					fields = [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					];
				}
				else if ((status == "PCC" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && frm.doc.territory == "Oman") {
					fields = [
						{
							label: 'PCC',
							fieldtype: 'Attach',
							fieldname: 'pcc',
						},
						{
							label: 'PCC Not Applicable',
							fieldtype: 'Check',
							fieldname: 'pcc_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					];

				}
				else if ((status == "Final Medical" || status == "PCC" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && frm.doc.territory == "Oman") {
					fields = [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd: 1,
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					];

				}
				else if ((status == "Visa" || status == "Final Medical" || status == "PCC" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && frm.doc.territory == "Oman") {

					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					];

				}
				else if ((status == "Emigration" || status == "Visa" || status == "Final Medical" || status == "PCC" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && frm.doc.territory == "Oman") {
					fields = [
						{
							label: 'Emigration Not Applicable',
							fieldtype: 'Check',
							fieldname: 'emigration_not_applicable',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Declaration',
							fieldtype: 'Attach',
							fieldname: 'declaration',
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'column_1',
						},
						{
							label: 'Insurance',
							fieldtype: 'Attach',
							fieldname: 'attach_insurance',
						},
						{
							label: 'Employment Contract',
							fieldtype: 'Attach',
							fieldname: 'employment_contract',
						},
						{
							fieldtype: 'Section Break',
							fieldname: 'section_1',
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					];

				}
				else if ((status == "Ticket" || status == "Emigration" || status == "Visa" || status == "Final Medical" || status == "PCC" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && frm.doc.territory == "Oman") {
					fields = [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd: 1,
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}
					];

				}

				// Kuwait(customer_so == 0 )
				if (status === "PSL" && (frm.doc.territory == "Kuwait" && customer_so == 0) && !(frm.doc.passport && frm.doc.photo)) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Client Offer Letter'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 0)) {
					fields = [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					];
				}
				else if ((status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 0)) {
					fields = [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Premedical'
									}
								};
							}
						}

					];
				}
				else if ((status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 0)) {
					fields = [
						{
							label: 'Pre-Medical',
							fieldtype: 'Attach',
							fieldname: 'premedical',
						},
						{
							label: 'Pre-Medical Not Applicable',
							fieldtype: 'Check',
							fieldname: 'premedical_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					];
				}
				else if ((status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 0)) {
					fields = [
						{
							label: 'PCC',
							fieldtype: 'Attach',
							fieldname: 'pcc',
						},
						{
							label: 'PCC Not Applicable',
							fieldtype: 'Check',
							fieldname: 'pcc_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					];
				}
				else if ((status == "Visa" || status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 0)) {
					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					];
				}
				else if ((status == "Final Medical" || status == "Visa" || status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 0)) {
					fields = [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd: 1,
						},
						{
							label: 'Proof',
							fieldtype: 'Attach',
							fieldname: 'custom_medical_proof',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						}

					];
				}
				
				else if ((status == "Visa Stamping" || status == "Final Medical" || status == "Visa" || status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 0)) {

					fields = [
						{
							label: 'Stamped Visa',
							fieldtype: 'Attach',
							fieldname: 'visa_stamping',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					];
				}
				else if ((status == "Emigration" || status == "Visa Stamping" || status == "Final Medical" || status == "Visa" || status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 0)) {
					fields = [
						{
							label: 'Emigration Not Applicable',
							fieldtype: 'Check',
							fieldname: 'emigration_not_applicable',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Declaration',
							fieldtype: 'Attach',
							fieldname: 'declaration',
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'column_1',
						},
						{
							label: 'Insurance',
							fieldtype: 'Attach',
							fieldname: 'attach_insurance',
						},
						{
							label: 'Employment Contract',
							fieldtype: 'Attach',
							fieldname: 'employment_contract',
						},
						{
							fieldtype: 'Section Break',
							fieldname: 'section_1',
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					];
				}
				else if ((status == "Ticket" || status == "Emigration" || status == "Visa Stamping" || status == "Final Medical" || status == "Visa" || status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 0)) {
					fields = [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd: 1,
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}
					];
				}

				// Kuwait(customer_so == 1 )
				if (status === "PSL" && (frm.doc.territory == "Kuwait" && customer_so == 1) && !(frm.doc.passport && frm.doc.photo)) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Client Offer Letter'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 1)) {
					fields = [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					];
				}
				else if ((status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 1)) {
					fields = [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Premedical'
									}
								};
							}
						}

					];
				}
				else if ((status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 1)) {
					fields = [
						{
							label: 'Pre-Medical',
							fieldtype: 'Attach',
							fieldname: 'premedical',
						},
						{
							label: 'Pre-Medical Not Applicable',
							fieldtype: 'Check',
							fieldname: 'premedical_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					];
				}
				else if ((status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 1)) {
					fields = [
						{
							label: 'PCC',
							fieldtype: 'Attach',
							fieldname: 'pcc',
						},
						{
							label: 'PCC Not Applicable',
							fieldtype: 'Check',
							fieldname: 'pcc_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					];
				}
				else if ((status == "Visa" || status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 1)) {
					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					];
				}
				else if ((status == "Final Medical" || status == "Visa" || status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 1)) {
					fields = [
						{
							label: 'Proof',
							fieldtype: 'Attach',
							fieldname: 'custom_medical_proof',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Biometric'
									}
								};
							}
						}

					];
				}
				else if ((status == "Biometric" || status == "Final Medical" || status == "Visa" || status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 1)) {
					fields = [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						}

					];
				}
				else if ((status == "Biometric" || status == "Visa Stamping" || status == "Final Medical" || status == "Visa" || status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 1)) {
					fields = [
						{
							label: 'Stamped Visa',
							fieldtype: 'Attach',
							fieldname: 'visa_stamping',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					];
				}
				else if ((status == "Ticket" || status == "Visa Stamping" || status == "Final Medical" || status == "Visa" || status == "PCC" || status == "Premedical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Kuwait" && customer_so == 1)) {
					fields = [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd: 1,
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}
					];
				}

				// KSA and Nationality Indian
				if (status === "PSL" && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian") && !(frm.doc.passport && frm.doc.photo)) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Client Offer Letter'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {
					fields = [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					];
				}
				else if ((status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {
					fields = [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					];
				}
				else if ((status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {
					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					];
				}
				else if ((status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {
					fields = [
						{
							label: 'PCC',
							fieldtype: 'Attach',
							fieldname: 'pcc',
						},
						{
							label: 'PCC Not Applicable',
							fieldtype: 'Check',
							fieldname: 'pcc_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					];
				}
				else if ((status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {
					fields = [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd: 1,
						},
						{
							label: 'Proof',
							fieldtype: 'Attach',
							fieldname: 'custom_medical_proof',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Biometric'
									}
								};
							}
						}

					];
				}
				else if ((status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {
					fields = [
						{
							label: 'VFS Slip',
							fieldtype: 'Attach',
							fieldname: 'custom_vfs_slip',
						},
						{
							label: "Skip Biometric",
							fieldtype: "Check",
							fieldname: 'custom_skip_biometric'
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'QVP'
									}
								};
							}
						}

					];
				}
				else if ((status == "QVP"|| status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {
					fields = [
						{
							label: "QVP",
							fieldtype: "Attach",
							fieldname: 'qvp'
						},
						{
							label: "QVP Not Applicable",
							fieldtype: "Check",
							fieldname: 'qvp_not_applicable'
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Trade Test'
									}
								};
							}
						},
						
					];
				}
				else if ((status == "Trade Test" || status=="QVP" ||status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {
					fields = [
						{
							label: 'Status',
							fieldtype: 'Select',
							fieldname: 'custom_closure_status',
							options: "\nInitiated\nNot Applicable"
						},
						{
							label: "Trade Test Not Applicable",
							fieldtype: "Check",
							fieldname: 'custom_trade_test_not_applicable'
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						},
						{
							fieldtype: "Column Break",
							fieldname: 'col_break_2'
						},
						{
							label: "Attachment",
							fieldtype: "Attach",
							fieldname: 'custom_attachment'
						},
						{
							label: "Initiated Date",
							fieldtype: "Date",
							fieldname: 'custom_closure_initiated_date'
						},
						{
							label: "Location",
							fieldtype: "Link",
							options: "Location",
							fieldname: 'custom_closure_location'
						},


					];
				}
				else if ((status == "Visa Stamping" || status == "Trade Test" || status=="QVP" || status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {

					fields = [
						{
							label: 'Stamped Visa',
							fieldtype: 'Attach',
							fieldname: 'visa_stamping',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					];
				}
				else if ((status == "Emigration" || status == "Visa Stamping" || status == "Trade Test" || status=="QVP" || status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {
					fields = [
						{
							label: 'Emigration Not Applicable',
							fieldtype: 'Check',
							fieldname: 'emigration_not_applicable',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Declaration',
							fieldtype: 'Attach',
							fieldname: 'declaration',
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'column_1',
						},
						{
							label: 'Insurance',
							fieldtype: 'Attach',
							fieldname: 'attach_insurance',
						},
						{
							label: 'Employment Contract',
							fieldtype: 'Attach',
							fieldname: 'employment_contract',
						},
						{
							fieldtype: 'Section Break',
							fieldname: 'section_1',
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					];
				}
				else if ((status == "Ticket" || status == "Emigration" || status == "Visa Stamping" || status == "Trade Test" || status=="QVP" || status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality == "Indian")) {
					fields = [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd: 1,
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}
					];
				}

				// KSA and Nationality Not Indian
				if (status === "PSL" && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian") && !(frm.doc.passport && frm.doc.photo)) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Client Offer Letter'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian")) {
					fields = [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					];
				}
				else if ((status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian")) {
					fields = [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					];
				}
				else if ((status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian")) {
					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					];
				}
				else if ((status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian")) {
					fields = [
						{
							label: 'PCC',
							fieldtype: 'Attach',
							fieldname: 'pcc',
						},
						{
							label: 'PCC Not Applicable',
							fieldtype: 'Check',
							fieldname: 'pcc_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					];
				}
				else if ((status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian")) {
					fields = [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Biometric'
									}
								};
							}
						}

					];
				}
				else if ((status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian")) {
					fields = [
						{
							label: 'VFS Slip',
							fieldtype: 'Attach',
							fieldname: 'custom_vfs_slip',
						},
						{
							label: "Skip Biometric",
							fieldtype: "Check",
							fieldname: 'custom_skip_biometric'
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						}

					];
				}
				else if ((status == "QVP" || status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian")) {
					fields = [
						{
							label: "QVP",
							fieldtype: "Attach",
							fieldname: 'qvp'
						},
						{
							label: "QVP Not Applicable",
							fieldtype: "Check",
							fieldname: 'qvp_not_applicable'
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						},
						

					];
				}
				else if ((status == "Visa Stamping" || status == "QVP" || status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian")) {

					fields = [
						{
							label: 'Stamped Visa',
							fieldtype: 'Attach',
							fieldname: 'visa_stamping',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					];
				}
				else if ((status == "Emigration" || status == "Visa Stamping" || status == "QVP" || status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian")) {
					fields = [
						{
							label: 'Emigration Not Applicable',
							fieldtype: 'Check',
							fieldname: 'emigration_not_applicable',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Declaration',
							fieldtype: 'Attach',
							fieldname: 'declaration',
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'column_1',
						},
						{
							label: 'Insurance',
							fieldtype: 'Attach',
							fieldname: 'attach_insurance',
						},
						{
							label: 'Employment Contract',
							fieldtype: 'Attach',
							fieldname: 'employment_contract',
						},
						{
							fieldtype: 'Section Break',
							fieldname: 'section_1',
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					];
				}
				else if ((status == "Ticket" || status == "Emigration" || status == "Visa Stamping" || status == "QVP" || status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "KSA" && frm.doc.nationality != "Indian")) {
					fields = [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd: 1,
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}
					];
				}

				// Iraq
				if ((status === "PSL") && (frm.doc.territory == "Iraq")) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status == "Visa" || status === "PSL") && (frm.doc.territory == "Iraq")) {
					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					];
				
				}
				else if ((status == "Emigration" || status == "Visa" || status === "PSL") && (frm.doc.territory == "Iraq")) {
					fields = [
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Insurance',
							fieldtype: 'Attach',
							fieldname: 'attach_insurance',
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'column_1',
						},

						{
							label: 'Employment Contract',
							fieldtype: 'Attach',
							fieldname: 'employment_contract',
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							fieldtype: 'Section Break',
							fieldname: 'section_1',
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					];
				}
				// Ascension Island
				if((status=== "PSL") && (frm.doc.territory == "Ascension Island")){
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Sales Order'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if((status=="Sales Order")&& (frm.doc.territory == "Ascension Island")){			
					if ((!frm.doc.so_created || frm.doc.so_created == 0)) {
						if (frm.doc.payment === 'Client' && frm.doc.client_si <= 0) {
							msgprint("Please Enter Client Service Charge Value");
							return;
						}
						if (frm.doc.payment === 'Candidate' && frm.doc.candidate_si <= 0) {
							msgprint("Please Enter Candidate Service Charge Value");
							return;
						}
						if (frm.doc.payment === 'Associate' && frm.doc.associate_si <= 0) {
							msgprint("Please Enter Associate Service Charge Value");
							return;
						}
						if (frm.doc.payment === 'Both' &&
							(frm.doc.client_si <= 0 || frm.doc.candidate_si <= 0)) {
							msgprint("Please Enter Client and Candidate Service Charge Value");
							return;
						}
						frappe.confirm('Did you verify the payment terms?', function () {

							frappe.call({
								method: "jobpro.jobpro.doctype.closure.closure.create_sale_order",
								freeze: true,
								freeze_message: __("Creating Sales Order..."),
								args: {
									closure: frm.doc.name,
									project: frm.doc.project,
									domestic: frm.doc.custom_is_domestic,
									customer: frm.doc.customer,
									reference_customer_: frm.doc.customer,
									account_manager: frm.doc.account_manager,
									delivery_manager: frm.doc.candidate_owner || '',
									task: frm.doc.task,
									candidate_name: frm.doc.given_name,
									contact: frm.doc.mobile,
									payment: frm.doc.payment,
									billing_currency: frm.doc.billing_currency,
									client_sc: frm.doc.client_sc || '',
									associate_cur: frm.doc.custom_associate_billing_currency,
									client_cur: frm.doc.custom_client_billing_currency,
									candidate_sc: frm.doc.candidate_sc || '',
									territory: frm.doc.territory,
									passport_no: frm.doc.passport_no || '',
									candidate_owner: frm.doc.candidate_owner || '',
									sa_id: frm.doc.sa_id || '',
									passport_number: frm.doc.passport_no,
									expected_doj: frm.doc.expected_doj || '',
									supplier: frm.doc.sa_id || '',
									service: frm.doc.service,
									sc: frm.doc.candidate_sc || frm.doc.client_sc,
									client_si: frm.doc.client_si,
									candidate_si: frm.doc.candidate_si,
									associate: frm.doc.associate || '',
									associate_sc: frm.doc.associate_si || '',
									associate_si: frm.doc.associate_si,
								},
								callback: function (r) {
									frappe.msgprint(r.message);
									frm.set_value("so_created", 1);
									frm.reload_doc();
								}
							});

						});

					}

				}	
				else if((status==="Arrived")&& frm.doc.territory == "Ascension Island"){
					fields = [
						{
							label: 'Emergency Contact Number in India',
							fieldtype: 'Data',
							fieldname: 'custom__emergency_contact_number_in_india',
							reqd: 1,
						},
						{
							label: 'Candidate Google Review',
							fieldtype: 'Data',
							fieldname: 'candidate_google_review',
							reqd: 1,
						},
						{
							label: 'Local Mobile Number',
							fieldtype: 'Phone',
							fieldname: 'custom_local_mobile_number',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Arrived'
									}
								};
							}
						}

					];
				}										
				// Bahrain
				if (status === "PSL" && (frm.doc.territory == "Bahrain") && !(frm.doc.passport && frm.doc.photo)) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Client Offer Letter'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Bahrain")) {
					fields = [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					];
				}
				else if ((status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Bahrain")) {
					fields = [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					];
				}
				else if ((status == "Final Medical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Bahrain")) {
					fields = [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					];
				}
				else if ((status == "Visa" || status == "Final Medical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Bahrain")) {

					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					];
				}
				else if ((status == "Emigration" || status == "Visa" || status == "Final Medical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Bahrain")) {
					fields = [
						{
							label: 'Emigration Not Applicable',
							fieldtype: 'Check',
							fieldname: 'emigration_not_applicable',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Declaration',
							fieldtype: 'Attach',
							fieldname: 'declaration',
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'column_1',
						},
						{
							label: 'Insurance',
							fieldtype: 'Attach',
							fieldname: 'attach_insurance',
						},
						{
							label: 'Employment Contract',
							fieldtype: 'Attach',
							fieldname: 'employment_contract',
						},
						{
							fieldtype: 'Section Break',
							fieldname: 'section_1',
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					];
				}
				else if ((status == "Ticket" || status == "Emigration" || status == "Visa" || status == "Final Medical" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Bahrain")) {
					fields = [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd: 1,
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}
					];
				}

				// 'Dammam', 'Jeddah', 'Riyadh'
				if (status === "PSL" && (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh") && !(frm.doc.passport && frm.doc.photo)) {
					fields = [
						{
							label: 'Passport(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd: 1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Client Offer Letter'
									}
								};
							}
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'custom_col',
						},
						{
							label: 'Photo(as per visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd: 1
						}
					];
				}
				else if ((status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh")) {
					fields = [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					];
				}
				else if ((status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh")) {
					fields = [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd: 1
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					];
				}
				else if ((status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh")) {
					fields = [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					];
				}
				else if ((status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh")) {
					fields = [
						{
							label: 'PCC',
							fieldtype: 'Attach',
							fieldname: 'pcc',
						},
						{
							label: 'PCC Not Applicable',
							fieldtype: 'Check',
							fieldname: 'pcc_not_applicable',
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					];
				}
				else if ((status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh")) {
					fields = [
						{
							label: 'Proof',
							fieldtype: 'Attach',
							fieldname: 'custom_medical_proof',
							reqd: 1,
						},
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Biometric'
									}
								};
							}
						}

					];
				}
				else if ((status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh")) {
					fields = [
						{
							label: 'VFS Slip',
							fieldtype: 'Attach',
							fieldname: 'custom_vfs_slip',
						},
						{
							label: "Skip Biometric",
							fieldtype: "Check",
							fieldname: 'custom_skip_biometric'
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						}

					];
				}
				else if ((status == "Visa Stamping" || status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh")) {
					fields = [
						{
							label: 'Stamped Visa',
							fieldtype: 'Attach',
							fieldname: 'visa_stamping',
							reqd: 1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					];
				}
				else if ((status == "Emigration" || status == "Visa Stamping" || status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh")) {
					fields = [
						{
							label: 'Emigration Not Applicable',
							fieldtype: 'Check',
							fieldname: 'emigration_not_applicable',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Declaration',
							fieldtype: 'Attach',
							fieldname: 'declaration',
						},
						{
							fieldtype: 'Column Break',
							fieldname: 'column_1',
						},
						{
							label: 'Insurance',
							fieldtype: 'Attach',
							fieldname: 'attach_insurance',
						},
						{
							label: 'Employment Contract',
							fieldtype: 'Attach',
							fieldname: 'employment_contract',
						},
						{
							fieldtype: 'Section Break',
							fieldname: 'section_1',
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					];
				}
				else if ((status == "Ticket" || status == "Emigration" || status == "Visa Stamping" || status == "Biometric" || status == "Final Medical" || status == "PCC" || status == "Visa" || status == "Signed Offer Letter" || status == "Client Offer Letter" || status === "PSL") && (frm.doc.territory == "Dammam" || frm.doc.territory == "Jeddah" || frm.doc.territory == "Riyadh")) {
					fields = [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd: 1,
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd: 1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options: "Standard Remarks",
							reqd: 1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}
					];
				}
				if (fields.length) {
					let d = new frappe.ui.Dialog({
						title: status + ' Attachment',
						fields: fields,
						primary_action_label: 'Save',

						primary_action(values) {
							const promises = [];
							Object.keys(values).forEach(f => {
								const value = values[f];

								if (d.fields_dict[f].df.fieldtype === 'Attach' && value) {
									promises.push(
										frappe.call({
											freeze: true,
											freeze_message: 'Saving, please wait...',
											method: "frappe.client.insert",
											args: {
												doc: {
													doctype: "File",
													file_url: value,
													attached_to_doctype: frm.doc.doctype,
													attached_to_name: frm.doc.name,
													is_private: 0
												}
											}
										})
									);
								}

								frm.set_value(f, value);
							});

							Promise.all(promises).then(() => {

								if (status === "Onboarding") {
									frm.set_value("status", "Onboarded");
									let row = frm.add_child("custom_history");
									row.date = frappe.datetime.now_datetime();
									row.status_moved_by = frappe.session.user;
									row.status = "Onboarded";
									frm.refresh_field("custom_history");
								}
								frm.save().then(() => {
									if (status === "Visa" && (!frm.doc.so_created || frm.doc.so_created == 0)) {
										if (frm.doc.payment === 'Client' && frm.doc.client_si <= 0) {
											msgprint("Please Enter Client Service Charge Value");
											return;
										}
										if (frm.doc.payment === 'Candidate' && frm.doc.candidate_si <= 0) {
											msgprint("Please Enter Candidate Service Charge Value");
											return;
										}
										if (frm.doc.payment === 'Associate' && frm.doc.associate_si <= 0) {
											msgprint("Please Enter Associate Service Charge Value");
											return;
										}
										if (frm.doc.payment === 'Both' &&
											(frm.doc.client_si <= 0 || frm.doc.candidate_si <= 0)) {
											msgprint("Please Enter Client and Candidate Service Charge Value");
											return;
										}
										frappe.confirm('Did you verify the payment terms?', function () {

											frappe.call({
												method: "jobpro.jobpro.doctype.closure.closure.create_sale_order",
												freeze: true,
												freeze_message: __("Creating Sales Order..."),
												args: {
													closure: frm.doc.name,
													project: frm.doc.project,
													domestic: frm.doc.custom_is_domestic,
													customer: frm.doc.customer,
													reference_customer_: frm.doc.customer,
													account_manager: frm.doc.account_manager,
													delivery_manager: frm.doc.candidate_owner || '',
													task: frm.doc.task,
													candidate_name: frm.doc.given_name,
													contact: frm.doc.mobile,
													payment: frm.doc.payment,
													billing_currency: frm.doc.billing_currency,
													client_sc: frm.doc.client_sc || '',
													associate_cur: frm.doc.custom_associate_billing_currency,
													client_cur: frm.doc.custom_client_billing_currency,
													candidate_sc: frm.doc.candidate_sc || '',
													territory: frm.doc.territory,
													passport_no: frm.doc.passport_no || '',
													candidate_owner: frm.doc.candidate_owner || '',
													sa_id: frm.doc.sa_id || '',
													passport_number: frm.doc.passport_no,
													expected_doj: frm.doc.expected_doj || '',
													supplier: frm.doc.sa_id || '',
													service: frm.doc.service,
													sc: frm.doc.candidate_sc || frm.doc.client_sc,
													client_si: frm.doc.client_si,
													candidate_si: frm.doc.candidate_si,
													associate: frm.doc.associate || '',
													associate_sc: frm.doc.associate_si || '',
													associate_si: frm.doc.associate_si,
												},
												callback: function (r) {
													frappe.msgprint(r.message);
													frm.set_value("so_created", 1);
													frm.reload_doc();
												}
											});

										});

									}

									frappe.show_alert({ message: __("Saved successfully!"), indicator: "green" });
									d.hide();
								});
							});
						},

						secondary_action_label: 'Cancel',
						secondary_action() {
							d.hide();
						}
					});

					d.show();
				}

			});



			flowContainer.append(box);

			positions.push({ x: x + boxWidth / 2, y: y + boxHeight / 2, cls: cls });
		});

		for (let i = 0; i < positions.length - 1; i++) {
			const start = positions[i];
			const end = positions[i + 1];

			const connector = $('<div class="connector"></div>');
			connector.addClass(start.cls);

			let deltaX = end.x - start.x;
			let deltaY = end.y - start.y;
			let length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

			// Angle in radians
			const angle = Math.atan2(deltaY, deltaX);

			// Offset to stop at box edge (half width/height)
			const offsetX = (boxWidth / 2) * Math.cos(angle);
			const offsetY = (boxHeight / 2) * Math.sin(angle);

			// Adjust start point and length
			const startX = start.x + offsetX;
			const startY = start.y + offsetY;
			const endX = end.x - offsetX;
			const endY = end.y - offsetY;

			const adjustedDeltaX = endX - startX;
			const adjustedDeltaY = endY - startY;
			const adjustedLength = Math.sqrt(adjustedDeltaX * adjustedDeltaX + adjustedDeltaY * adjustedDeltaY);
			const adjustedAngle = Math.atan2(adjustedDeltaY, adjustedDeltaX) * 180 / Math.PI;

			connector.css({
				width: adjustedLength + 'px',
				top: startY + 'px',
				left: startX + 'px',
				transformOrigin: '0 50%',
				transform: `rotate(${adjustedAngle}deg)`
			});

			flowContainer.append(connector);
		}

		dashboardWrapper.append(mainContainer);

		if (!frm.doc.expiry_date) {
			// Calculate expiry date (10 years after issued date)
			let issued = new Date(frm.doc.issued_date);
			let expiry = new Date(issued);
			expiry.setFullYear(expiry.getFullYear() + 10);
			expiry.setDate(expiry.getDate() - 1)
			// frm.set_value('expiry_date', expiry.toISOString().split('T')[0]);

			// Calculate difference between today and expiry date
			let today = new Date(frm.doc.expected_doj);
			let diffYears = expiry.getFullYear() - today.getFullYear();
			let diffMonths = expiry.getMonth() - today.getMonth();

			if (diffMonths < 0) {
				diffYears -= 1;
				diffMonths += 12;
			}
			if (frm.doc.expected_doj) {
				frm.set_value('expiry_period', `${diffYears} years, ${diffMonths} months`);
			} else {
				frm.set_value('expiry_period', `0 years, 0 months`);
			}
		}
		if (frm.doc.custom__emergency_contact_number_in_india && frm.doc.candidate_google_review && frm.doc.custom_local_mobile_number) {
		}
		frappe.call({
			method: "jobpro.jobpro.doctype.closure.closure.get_status",
			args: {
				"status": frm.doc.status || '',
				"so_created": frm.doc.so_created || '',
				"visa_status": frm.doc.visa_status || '',
				"offer_letter": frm.doc.offer_letter || '',
				"sol": frm.doc.sol || '',
				"final_medical": frm.doc.final_medical || '',
				"pcc": frm.doc.pcc || '',
				"pcc_not": frm.doc.pcc_not_applicable || '',
				"visa_stamping": frm.doc.visa_stamping || ''
			},
			callback: function (d) {
				if (d.message) {
					frm.get_field("html_2").$wrapper.html(d.message);
				}
			},
		})
		if (!frm.doc.so_created) {
			frm.set_intro(__("<h6 style ='color:red'><b>Alert:</b>Further process is Freezed as Sales Order Submmision is Pending.Please submit <b>Sales Order</b> immediately</h6>"))
		}

		if (frm.doc.so_created) {
			if (frm.doc.status == 'Onboarding') {
				if (!frappe.user.has_role("Customer User")) {
					frm.add_custom_button(__("Onboard"),

						function () {
							if (frm.doc.payment == "Candidate") {
								if (frm.doc.outstanding_amount > 0) {
									// frm.set_value("ticket","")
									frappe.throw("Candidate Outstanding amount should be zero")
									frappe.validated = false;

								}
							}
							frm.set_value("status", "Onboarded")
							frm.set_value("onboarded", 1)
							frm.save()
						}
					).addClass('btn btn-success');
				}
			}

		}
		if (frm.doc.status != 'Dropped') {
			if (frappe.user.has_role("HOD") || frappe.session.user=="keerthana.b@groupteampro.com") {
				frm.add_custom_button(__("Drop"),
					function () {

						let d = new frappe.ui.Dialog({
							title: "Dropped Reason",
							fields: [
								{
									label: 'Reason',
									fieldname: 'reason',
									fieldtype: 'Data'
								},
								{
									label: 'Drop Approved By',
									fieldname: 'drop_approved_by',
									fieldtype: 'Link',
									options: 'User'
								}
							],
							primary_action_label: 'Submit',
							primary_action(values) {
								frm.set_value("drop_reason", values.reason)
								frm.set_value("drop_approved_by", values.drop_approved_by)
								d.hide()
								frm.set_value("status", "Dropped")
								frm.save()

							}
						})
						d.show()

					}

				).addClass('btn btn-primary');
			}
		}

		if (frm.doc.status == "Dropped") {
			if (!frappe.user.has_role("Customer User")) {
				frm.add_custom_button(__("Re-Open"),
					function () {
						frm.set_value("status", "PSL")
						frm.save()
					}
				).addClass('btn btn-primary');
			}
		}


		if (frm.doc.sa_owner) {
			if (!frappe.user.has_role("Customer User")) {
				frm.add_custom_button(__("SA Candidate"), function () {
					frappe.msgprint(
						"SA ID : " + frm.doc.sa_owner,
						"SA Name : " + frm.doc.sa_name
					)
				}).addClass('btn btn-success');
			}
		}
		if (frm.doc.ecr_status == "ECR") {
			if (!frappe.user.has_role("Customer User")) {
				frm.add_custom_button(__("ECR")).addClass('btn btn-success');
			}
		}
		frm.refresh_fields();
		if (!frm.doc.so_created) {
			if (frm.doc.status == "Sales Order") {
				frappe.db.get_value('Territory', frm.doc.territory, 'parent_territory', (r) => {
					if (r) {
						if (r.parent_territory != 'India') {
							// frm.set_df_property("ob_custodian", "reqd", 1);
							frm.set_df_property("passport_no", "reqd", 1);
							frm.set_df_property("offer_letter", "reqd", 1);
							frm.set_df_property("sol", "reqd", 1);
							frm.set_df_property("photo", "reqd", 1);
							frm.set_df_property("ecr_status", "reqd", 1);
							frm.set_df_property("passport", "reqd", 1);
							frm.set_df_property("place_of_issue", "reqd", 1);
							frm.set_df_property("issued_date", "reqd", 1);
							frm.set_df_property("expiry_date", "reqd", 1);
						}

					}
				});

			}
			
			if (frm.doc.status != "PSL") {
				
				if (!frappe.user.has_role("Customer User")) {
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

										method: "jobpro.jobpro.doctype.closure.closure.create_sale_order",
										freeze: true,
										freeze_message: __("Creating Sales Order..."),
										args: {
											closure: cur_frm.doc.name,
											project: cur_frm.doc.project,
											customer: cur_frm.doc.customer,
											reference_customer_: cur_frm.doc.customer,
											account_manager: cur_frm.doc.account_manager,
											delivery_manager: cur_frm.doc.candidate_owner || '',
											task: cur_frm.doc.task,
											candidate_name: cur_frm.doc.given_name,
											contact: cur_frm.doc.mobile,
											payment: cur_frm.doc.payment,
											billing_currency: cur_frm.doc.billing_currency,
											client_sc: cur_frm.doc.client_si || '',
											associate_cur: cur_frm.doc.custom_associate_billing_currency,
											client_cur: cur_frm.doc.custom_client_billing_currency,
											// candidate_dec: cur_frm.doc.candidate_dec,
											candidate_sc: cur_frm.doc.candidate_si || '',
											territory: cur_frm.doc.territory,
											passport_no: cur_frm.doc.passport_no || '',
											candidate_owner: cur_frm.doc.candidate_owner || '',
											sa_id: cur_frm.doc.sa_id || '',
											passport_number: cur_frm.doc.passport_no,
											expected_doj: cur_frm.doc.expected_doj || '',
											project: cur_frm.doc.project,
											// sa_id: cur_frm.doc.supplier
											supplier: cur_frm.doc.sa_id || '',
											service: cur_frm.doc.service,
											// dec:cur_frm.doc.candidate_dec ||cur_frm.doc.client_dec,
											sc: cur_frm.doc.candidate_sc || cur_frm.doc.client_sc,
											client_si: cur_frm.doc.client_si,
											candidate_si: cur_frm.doc.candidate_si,

											associate: cur_frm.doc.associate || '',
											associate_sc: cur_frm.doc.associate_si || '',
											associate_si: cur_frm.doc.associate_si,



											// currency:cur_frm.doc.currency
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
			}
		}

		

	},
	status(frm) {
		frm.set_query("standard_remarks", function () {
			return {
				filters: {
					status: frm.doc.status || ""
				}
			};
		});
	},
	passport_no: function (frm) {
		var regex = /[^0-9A-Za-z]/g;
		if (regex.test(frm.doc.passport_no) === true) {
			frappe.msgprint(__("Passport No.: Only letters and numbers are allowed."));
			frappe.validated = false;
		}
		var len = frm.doc.passport_no
		if (len.length < 8) {
			frappe.throw("Passport Number must be minimum 8 digits")
			frappe.validated = false;
		}
	},
	issued_date: function (frm) {
		if (frm.doc.issued_date) {
			// Calculate expiry date (10 years after issued date)
			let issued = new Date(frm.doc.issued_date);
			let expiry = new Date(issued);
			expiry.setFullYear(expiry.getFullYear() + 10);
			expiry.setDate(expiry.getDate() - 1)
			frm.set_value('expiry_date', expiry.toISOString().split('T')[0]);

			// Calculate difference between today and expiry date
			let today = new Date(frm.doc.expected_doj);
			let diffYears = expiry.getFullYear() - today.getFullYear();
			let diffMonths = expiry.getMonth() - today.getMonth();

			if (diffMonths < 0) {
				diffYears -= 1;
				diffMonths += 12;
			}

			if (frm.doc.expected_doj) {
				frm.set_value('expiry_period', `${diffYears} years, ${diffMonths} months`);
			} else {
				frm.set_value('expiry_period', `0 years, 0 months`);
			}
		}
	},
	custom_update_passport_details: function (frm) {
		if (!frm.doc.passport_number && !frm.doc.place_of_issue && !frm.doc.issued_date && !frm.doc.expiry_date) {
			frappe.msgprint("No data to move!");
			return;
		}

		frappe.call({
			method: "jobpro.jobpro.doctype.closure.closure.move_to_child_table",
			args: {
				docname: frm.doc.name,
				passport_number: frm.doc.passport_number,
				place_of_issue: frm.doc.place_of_issue,
				issued_date: frm.doc.issued_date,
				expiry_date: frm.doc.expiry_date
			},
			callback: function (r) {
				if (!r.exc) {
					frm.reload_doc();
					frm.set_df_property("passport_number", "read_only", 0);
					frm.refresh_field("passport_number");
				}
			}
		});
	},
	date_of_birth: function (frm) {
		if (frm.doc.date_of_birth) {
			const dob = new Date(frm.doc.date_of_birth);
			const today = new Date();

			let years = today.getFullYear() - dob.getFullYear();

			// Adjust if birthday not yet reached this year
			if (
				today.getMonth() < dob.getMonth() || 
				(today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
			) {
				years--;
			}

			frm.set_value('custom_age', years); 
		} else {
			frm.set_value('custom_age', 0);
		}
	},
	// mobile: function (frm) {
	// 	var regex = /[^0-9]/g;
	// 	if (regex.test(frm.doc.passport_no) === true) {
	// 		frappe.msgprint(__("Mobile No.: Only Numbers are allowed."));
	// 		frappe.validated = false;
	// 	}
	// var len = frm.doc.mobile
	// if (len.length < 10) {
	// 	frappe.throw("Mobile Number must be minimum 10 digits")
	// 	frappe.validated = false;
	// }
	// },

	// custom_local_mobile_number: function(frm) {
	// 	let mobile_number = frm.doc.custom_local_mobile_number;
	// 	if (mobile_number.startsWith('+')) {
	// 		mobile_number = mobile_number.substring(1);
	// 	var regex = /[^0-9]/g;
	// 	if (regex.test(frm.doc.custom_local_mobile_number) === true) {
	// 		console.log(mobile_number)
	// 		frappe.msgprint(__("Mobile No.: Only Numbers are allowed"));
	// 		frappe.validated = false;
	// 	}
	// 	if (custom_local_mobile_number.length >12 || custom_local_mobile_number.length <11 ) {
	// 		frappe.throw(__("Mobile Number must be 9 digits long excluding the country code."));
	// 		frappe.validated = false;
	// 	}
	// 	}

	// },
	custom_trade_test_not_applicable(frm) {
		if (frm.doc.custom_trade_test_not_applicable == 1) {
			frm.set_value("custom_closure_status", "Not Applicable")
		}
		else {
			frm.set_value("custom_closure_status", "Initiated")
		}
	},
	validate(frm) {
		if (frm.doc.date_of_birth) {
			const dob = new Date(frm.doc.date_of_birth);
			const today = new Date();

			let years = today.getFullYear() - dob.getFullYear();

			// Adjust if birthday not yet reached this year
			if (
				today.getMonth() < dob.getMonth() || 
				(today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
			) {
				years--;
			}

			frm.set_value('custom_age', years); 
		} else {
			frm.set_value('custom_age', 0);
		}

		if (frm.doc.last_updated_on != frappe.datetime.get_today()) {

			frm.set_value('last_updated_on', frappe.datetime.get_today());

		}

		if (frm.doc.so_confirmed_date) {
			frm.set_value("so_created", 1)
		}
		if (frm.doc.custom__emergency_contact_number_in_india && frm.doc.candidate_google_review && frm.doc.custom_local_mobile_number) {
			frm.set_value("status", "Arrived")
		}

		if (frm.doc.territory == 'UAE') {
			frm.set_df_property('visa_state', 'reqd', 1)
		}
		if (frm.doc.visa) {
			frm.set_value('visa_status', 'Visa Received')
		}
		else {
			frm.set_value('visa_status', 'Visa Pending')
		}
		// if(frm.doc.customer){
		// 	if(frm.doc.customer=="Vectrus Global Support Services LLP"){
		// 		frm.set_value("so_created",1)
		// 	}
		// }
		// if(frm.doc.territory != India)
		// if (frm.doc.candidate_service_charge <= 0 && frm.doc.associate_service_charge ) {
		// 	frappe.msgprint(__("Atleast one DEC/SI has to be filled"));
		// 	frappe.validated = false;
		// }

		if (frm.doc.payment == 'Associate') {
			var associate_service_charge = frm.doc.associate_si
			frm.set_value('associate_service_charge', associate_service_charge);

		}
		if (frm.doc.payment == "Candidate") {
			var candidate_service_charge = frm.doc.candidate_si
			frm.set_value('candidate_service_charge', candidate_service_charge);
			// if (frm.doc.candidate_dec > frm.doc.candidate_si) {
			// 	frappe.msgprint(__("DEC Cannot be greater than SI in Candidate Payment"));
			// 	frappe.validated = false;
			// }
		}
		// if(frm.doc.custom__emergency_contact_number_in_india){
		// var regex = /[^0-9]/g;
		// if (regex.test(frm.doc.custom__emergency_contact_number_in_india) === true){
		// 	frappe.msgprint(__("Mobile No.: Only Numbers are allowed."));
		// 	frappe.validated = false;
		// }
		// var len = frm.doc.custom__emergency_contact_number_in_india
		// if(len.length > 10 || len.length < 9){
		// 	frappe.throw("Mobile Number must be 10 digits")
		// 	frappe.validated = false;
		// }
		// }

		// if(frm.doc.custom_local_mobile_number){
		// 	var regex = /[^0-9]/g;
		// 	if (regex.test(frm.doc.custom_local_mobile_number) === true){
		// 		frappe.msgprint(__("Mobile No.: Only Numbers are allowed."));
		// 		frappe.validated = false;
		// 	}
		// 	var len = frm.doc.custom_local_mobile_number
		// 	if(len.length > 9 || len.length <= 8){
		// 		frappe.throw("Mobile Number must be 9 digits")
		// 		frappe.validated = false;
		// 	}
		// 	}
		// if(frm.doc.payment=="Candidate" ){
		//     if (frm.doc.outstanding_amount > 0 ){
		// 		// frm.set_value("ticket","")
		// 		frappe.throw("Candidate Outstanding amount should be zero")
		// 		frappe.validated = false;

		// }
		// }
		// if (frm.doc.payment == 'Client') {
		// 	var client_si = frm.doc.client_service_charge + frm.doc.client_dec
		// 	frm.set_value('client_si', client_si);
		// }

		// if (frm.doc.payment == 'Candidate') {
		// 	var candidate_si = frm.doc.candidate_service_charge + frm.doc.candidate_dec
		// 	frm.set_value('candidate_si', candidate_si);
		// }
		// if (frm.doc.payment == 'Both') {
		// 	var client_service_charge = frm.doc.client_si
		// 	frm.set_value('client_service_charge', client_service_charge);
		// 	var candidate_service_charge = frm.doc.candidate_si
		// 	frm.set_value('candidate_service_charge', candidate_service_charge);
		// }
		// var total_si = frm.doc.client_service_charge + frm.doc.candidate_service_charge + frm.doc.candidate_dec;
		var sum = 0;
		var candidate_si = frm.doc.candidate_si;
		frm.set_value("outstanding_amount", candidate_si)
		// frm.set_value("outstanding_amount", sum)
		if (frm.doc.part_payment_collection) {
			$.each(frm.doc.part_payment_collection, function (i, item) {
				sum += item.amount;
			})
			// if (sum > total_si) {
			// 	frappe.msgprint(__("Total Collection should not be greater than SI"));
			// 	frappe.validated = false;
			// }
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
	custom_medical_proof: function (frm) {
		if (frm.doc.territory === "KSA" && !frm.doc.custom_mofa_number) {
			if (frm.doc.custom_medical_proof) {
				frm.set_value('custom_medical_proof', null);
			}
			frappe.throw("First add 'MOFA Number' before attaching the 'Proof'");
		}
	},

});




function set_section_visibility_qatar(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			"Client Offer Letter": "Selection and Client Offer",
			"Signed Offer Letter": "Signed Offer",
			"PCC": "PCC",
			"Visa": "Visa",
			"Emigration": "Emigration",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			"Client Offer Letter",
			"Signed Offer Letter",
			"PCC",
			"Visa",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [
			"Pre-Medical",
			"Certificate Attestation",
			"Final Medical",
			"Biometric",
			"Trade Test",
			"Visa Stamping"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}

function set_section_visibility_uae(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			"Client Offer Letter": "Selection and Client Offer",
			"Signed Offer Letter": "Signed Offer",
			"PCC": "PCC",
			"Visa": "Visa",
			"Final Medical": "Final Medical",
			"Visa Stamping": "Visa Stamping",
			"Emigration": "Emigration",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			"Client Offer Letter",
			"Signed Offer Letter",
			"PCC",
			"Visa",
			"Final Medical",
			"Visa Stamping",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [
			"Pre-Medical",
			"Certificate Attestation",
			"Biometric",
			"Trade Test"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}

function set_section_visibility_uae_dubai(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			"Client Offer Letter": "Selection and Client Offer",
			"Signed Offer Letter": "Signed Offer",
			"Final Medical": "Final Medical",
			"PCC": "PCC",
			"Visa": "Visa",
			"Emigration": "Emigration",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			"Client Offer Letter",
			"Signed Offer Letter",
			"Final Medical",
			"PCC",
			"Visa",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [
			"Pre-Medical",
			"Certificate Attestation",
			"Visa Stamping",
			"Biometric",
			"Trade Test"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}

function set_section_visibility_oman(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			"Client Offer Letter": "Selection and Client Offer",
			"Signed Offer Letter": "Signed Offer",
			"PCC": "PCC",
			"Final Medical": "Final Medical",
			"Visa": "Visa",
			"Emigration": "Emigration",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			"Client Offer Letter",
			"Signed Offer Letter",
			"PCC",
			"Final Medical",
			"Visa",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [
			"Pre-Medical",
			"Certificate Attestation",
			"Visa Stamping",
			"Biometric",
			"Trade Test"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}

// function set_section_visibility_kuwait(frm) {
//     frappe.after_ajax(() => {
//         const status_to_tab_label = {
//             "PSL": "PSL Attachments",
//             "Client Offer Letter": "Selection and Client Offer",
//             "Signed Offer Letter": "Signed Offer",
// 			"Premedical":"Pre-Medical",
// 			"PCC": "PCC",
//             "Visa": "Visa",
// 			"Final Medical":"Final Medical",
// 			"Biometric":"Biometric",
// 			"Visa Stamping":"Visa Stamping",
//             "Ticket": "Ticket",
//             "Arrived": "Conclusion"
//         };

//         const ordered_statuses = [
//             "PSL",
//             "Client Offer Letter",
//             "Signed Offer Letter",
// 			"Premedical",
// 			"PCC",
//             "Visa",
// 			"Final Medical",
// 			"Biometric",
// 			"Visa Stamping",
// 			"Ticket",
//             "Arrived"
//         ];

//         const tabs_to_always_hide = [

//             "Certificate Attestation",
//             "Trade Test",
// 			"Emigration"
//         ];

//         const current_status = frm.doc.status || null;
//         const current_index = ordered_statuses.indexOf(current_status);
//         const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));

//         // 1. Show/hide based on current status
//         Object.entries(status_to_tab_label).forEach(([status, label]) => {
//             const should_show = visible_statuses.has(status);

//             const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
//             const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

//             if (should_show) {
//                 $tab_header.show();
//                 $tab_content.show();
//             } else {
//                 $tab_header.hide();
//                 $tab_content.hide();
//             }

//             console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
//         });

//         // 2. Always hide these tabs regardless of status
//         tabs_to_always_hide.forEach(label => {
//             const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
//             const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

//             $tab_header.hide();
//             $tab_content.hide();

//             console.log(`Always hiding tab: ${label}`);
//         });
//     });
// }
function set_section_visibility_kuwait(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			"Client Offer Letter": "Selection and Client Offer",
			"Signed Offer Letter": "Signed Offer",
			"Premedical": "Pre-Medical",
			"PCC": "PCC",
			"Visa": "Visa",
			"Final Medical": "Final Medical",
			"Biometric": "Biometric",
			"Visa Stamping": "Visa Stamping",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			"Client Offer Letter",
			"Signed Offer Letter",
			"Premedical",
			"PCC",
			"Visa",
			"Final Medical",
			"Biometric",
			"Visa Stamping",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [
			"Certificate Attestation",
			"Trade Test",
			"Emigration"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// Special case: always show both PCC and Visa together
		if (visible_statuses.has("PCC") || visible_statuses.has("Visa")) {
			visible_statuses.add("PCC");
			visible_statuses.add("Visa");

		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}


// function set_section_visibility_kuwait_so(frm) {
//     frappe.after_ajax(() => {
//         const status_to_tab_label = {
//             "PSL": "PSL Attachments",
//             "Client Offer Letter": "Selection and Client Offer",
//             "Signed Offer Letter": "Signed Offer",
// 			"Premedical":"Pre-Medical",
// 			"PCC": "PCC",
//             "Visa": "Visa",
// 			"Final Medical":"Final Medical",
// 			"Visa Stamping":"Visa Stamping",
// 			 "Emigration": "Emigration",
//             "Ticket": "Ticket",
//             "Arrived": "Conclusion"
//         };

//         const ordered_statuses = [
//             "PSL",
//             "Client Offer Letter",
//             "Signed Offer Letter",
// 			"Premedical",
// 			"PCC",
//             "Visa",
// 			"Final Medical",
// 			"Visa Stamping",
// 			"Emigration",
// 			"Ticket",
//             "Arrived"
//         ];

//         const tabs_to_always_hide = [

//             "Certificate Attestation",
//             "Trade Test",
// 			"Biometric"
//         ];

//         const current_status = frm.doc.status || null;
//         const current_index = ordered_statuses.indexOf(current_status);
//         const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));

//         // 1. Show/hide based on current status
//         Object.entries(status_to_tab_label).forEach(([status, label]) => {
//             const should_show = visible_statuses.has(status);

//             const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
//             const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

//             if (should_show) {
//                 $tab_header.show();
//                 $tab_content.show();
//             } else {
//                 $tab_header.hide();
//                 $tab_content.hide();
//             }

//             console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
//         });

//         // 2. Always hide these tabs regardless of status
//         tabs_to_always_hide.forEach(label => {
//             const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
//             const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

//             $tab_header.hide();
//             $tab_content.hide();

//             console.log(`Always hiding tab: ${label}`);
//         });
//     });
// }
function set_section_visibility_kuwait_so(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			"Client Offer Letter": "Selection and Client Offer",
			"Signed Offer Letter": "Signed Offer",
			"Premedical": "Pre-Medical",
			"PCC": "PCC",
			"Visa": "Visa",
			"Final Medical": "Final Medical",
			"Visa Stamping": "Visa Stamping",
			"Emigration": "Emigration",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			"Client Offer Letter",
			"Signed Offer Letter",
			"Premedical",
			"PCC",
			"Visa",
			"Final Medical",
			"Visa Stamping",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [
			"Certificate Attestation",
			"Trade Test",
			"Biometric"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// Special case: always show both PCC and Visa together
		if (visible_statuses.has("PCC") || visible_statuses.has("Visa")) {
			visible_statuses.add("PCC");
			visible_statuses.add("Visa");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}


function set_section_visibility_ksa_ind(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			"Client Offer Letter": "Selection and Client Offer",
			"Signed Offer Letter": "Signed Offer",
			// "Premedical":"Pre-Medical",
			"Visa": "Visa",
			"PCC": "PCC",
			"Final Medical": "Final Medical",
			"Biometric": "Biometric",
			"Trade Test": "Trade Test",
			"Visa Stamping": "Visa Stamping",
			"Emigration": "Emigration",
			"Ticket": "Ticket",

			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			"Client Offer Letter",
			"Signed Offer Letter",
			// "Premedical",
			"Visa",
			"PCC",
			"Final Medical",
			"Biometric",
			"Trade Test",
			"Visa Stamping",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [

			"Certificate Attestation",
			"Pre-Medical"
		];

		const current_status = frm.doc.status || null;
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}

function set_section_visibility_ksa_non_ind(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			"Client Offer Letter": "Selection and Client Offer",
			"Signed Offer Letter": "Signed Offer",
			"Visa": "Visa",
			"PCC": "PCC",
			"Final Medical": "Final Medical",
			"Biometric": "Biometric",
			"Visa Stamping": "Visa Stamping",
			"Emigration": "Emigration",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			"Client Offer Letter",
			"Signed Offer Letter",
			"Visa",
			"PCC",
			"Final Medical",
			"Biometric",
			"Visa Stamping",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [

			"Certificate Attestation",
			"Trade Test",
			"Pre-Medical"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}

function set_section_visibility_dammam(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			"Client Offer Letter": "Selection and Client Offer",
			"Signed Offer Letter": "Signed Offer",
			"Visa": "Visa",
			"PCC": "PCC",
			"Final Medical": "Final Medical",
			"Biometric": "Biometric",
			"Visa Stamping": "Visa Stamping",
			"Emigration": "Emigration",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			"Client Offer Letter",
			"Signed Offer Letter",
			"Visa",
			"PCC",
			"Final Medical",
			"Biometric",
			"Visa Stamping",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [

			"Certificate Attestation",
			"Trade Test",
			"Pre-Medical"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}

function set_section_visibility_iraq(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			// "Client Offer Letter": "Selection and Client Offer",
			// "Signed Offer Letter": "Signed Offer",
			"Visa": "Visa",
			// "PCC": "PCC",
			// "Final Medical":"Final Medical",
			// "Biometric":"Biometric",
			// "Visa Stamping":"Visa Stamping",
			"Emigration": "Emigration",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			// "Client Offer Letter",
			// "Signed Offer Letter",
			"Visa",
			// "PCC",
			// "Final Medical",
			// "Biometric",
			// "Visa Stamping",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [

			"Certificate Attestation",
			"Selection and Client Offer",
			"PCC",
			"Final Medical",
			"Biometric",
			"Visa Stamping",
			"Signed Offer",
			"Trade Test",
			"Pre-Medical"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}

function set_section_visibility_iraq_so(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			// "Client Offer Letter": "Selection and Client Offer",
			// "Signed Offer Letter": "Signed Offer",
			"Visa": "Visa",
			// "PCC": "PCC",
			// "Final Medical":"Final Medical",
			// "Biometric":"Biometric",
			// "Visa Stamping":"Visa Stamping",
			"Emigration": "Emigration",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			// "Client Offer Letter",
			// "Signed Offer Letter",
			"Visa",
			// "PCC",
			// "Final Medical",
			// "Biometric",
			// "Visa Stamping",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [

			"Certificate Attestation",
			"Selection and Client Offer",
			"PCC",
			"Final Medical",
			"Biometric",
			"Visa Stamping",
			"Signed Offer",
			"Trade Test",
			"Pre-Medical"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}

function set_section_visibility_bahrain(frm) {
	frappe.after_ajax(() => {
		const status_to_tab_label = {
			"PSL": "PSL Attachments",
			"Client Offer Letter": "Selection and Client Offer",
			"Signed Offer Letter": "Signed Offer",
			"Final Medical": "Final Medical",
			"Visa": "Visa",
			// "PCC": "PCC",
			// "Biometric":"Biometric",
			// "Visa Stamping":"Visa Stamping",
			"Emigration": "Emigration",
			"Ticket": "Ticket",
			"Arrived": "Conclusion"
		};

		const ordered_statuses = [
			"PSL",
			"Client Offer Letter",
			"Signed Offer Letter",
			"Final Medical",
			"Visa",
			// "PCC",
			// "Biometric",
			// "Visa Stamping",
			"Emigration",
			"Ticket",
			"Arrived"
		];

		const tabs_to_always_hide = [

			"Certificate Attestation",
			"PCC",
			"Biometric",
			"Visa Stamping",
			"Trade Test",
			"Pre-Medical"
		];

		const current_status = frm.doc.status || null;
		const current_index = ordered_statuses.indexOf(current_status);
		// const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));
		const show_all = current_status === "Onboarded" || current_status === "Onboarding";
		const visible_statuses = show_all
			? new Set([...ordered_statuses])
			: new Set(ordered_statuses.slice(0, ordered_statuses.indexOf(current_status) + 1));

		if (show_all) {
			console.log("Status is Onboarded or Onboarding — showing all tabs.");
		}

		// 1. Show/hide based on current status
		Object.entries(status_to_tab_label).forEach(([status, label]) => {
			const should_show = visible_statuses.has(status);

			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			if (should_show) {
				$tab_header.show();
				$tab_content.show();
			} else {
				$tab_header.hide();
				$tab_content.hide();
			}

			console.log(`${should_show ? "Showing" : "Hiding"} tab: ${label}`);
		});

		// 2. Always hide these tabs regardless of status
		tabs_to_always_hide.forEach(label => {
			const $tab_header = $(`.form-tabs .nav-link:contains("${label}")`).closest('li');
			const $tab_content = $(`.tab-content .tab-pane[data-label="${label}"]`);

			$tab_header.hide();
			$tab_content.hide();

			console.log(`Always hiding tab: ${label}`);
		});
	});
}


frappe.ui.form.on('Closure Personal Details', {  // Replace with your child table doctype
	pin_code: function (frm, cdt, cdn) {
		let row = frappe.get_doc(cdt, cdn);  // Get the child table row

		if (!row.pin_code) return;

		$.ajax({
			url: "https://api.postalpincode.in/pincode/" + row.pin_code,
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				if (data && data.length > 0 && data[0]['PostOffice'] && data[0]['PostOffice'].length > 0) {
					frappe.model.set_value(cdt, cdn, 'district', data[0]['PostOffice'][0]['District']);
					frappe.model.set_value(cdt, cdn, 'state', data[0]['PostOffice'][0]['State']);
				}
			}
		});
	}
});

window.open_so = function(frm) {

    frappe.call({
        method: "jobpro.jobpro.doctype.closure.closure.get_so_for_closure_button",
        args: {
            closure_name: frm.doc.name
        },
        callback: function(r) {
            let so = r.message;

            if (so) {
                frappe.set_route('Form', 'Sales Order', so);
            } else {
                frappe.msgprint("No Sales Order found");
            }
        }
    });

}