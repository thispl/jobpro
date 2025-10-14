// Copyright (c) 2020, teamPRO and contributors
// For license information, please see license.txt

frappe.ui.form.on('Closure', {
	
	// ticket(frm){
	   
	
	// },
	custom_local_mobile_number(frm){
		if(!frm.doc.territory=='Iraq'){
			frm.set_df_property("custom__emergency_contact_number_in_india","reqd",1)
			frm.set_df_property("candidate_google_review","reqd",1)
		}
		if(frm.doc.custom__emergency_contact_number_in_india && frm.doc.candidate_google_review && frm.doc.custom_local_mobile_number){
			frm.set_value("status","Arrived")
			frm.add_child("custom_history",{
				'status':frm.doc.status,
				'date':frappe.datetime.now_datetime(),
				'status_moved_by':frappe.session.user,
			})
			frm.refresh_field('custom_history')
		}
		else{
			frm.set_value("status","Onboarded")
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
		if(frm.doc.so_created){
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
	setup: function(frm) {
		frm.set_query("associate", function() {
			return {
				filters: {
					'customer_group': "Associate"
				}
			}
		});
		frm.set_query("stamping_vendor", function() {
			return {
				filters: {
					'supplier_group': "Visa Stamping"
				}
			}
		});
	},

	status:function(frm){
		// console.log("inside history")
		// frm.add_child("custom_history",{
		// 	'status':frm.doc.status,
		// 	'date':frappe.datetime.now_datetime(),
		// 	'status_moved_by':frappe.session.user,
		// })
		// frm.refresh_field('custom_history')
		// frm.set_value("custom_status_transition",frappe.datetime.now_datetime())
		// frm.set_value("custom_previous_status",frm.doc.status)
		if(frm.doc.status=="Dropped"){
			frappe.call({
				method: 'jobpro.custom.send_mail_to_drop',
				args:{
					name:frm.doc.name
				},
				callback: function(r) {

				}
			});
		}
	},
	pp_original_at:function(frm){
		// if(frm.doc.pp_original_at=="TEAMPRO"){
		// 	frappe.call({
		// 		method: 'jobpro.custom.send_mail_to_candidate',
		// 		args: {
		// 			candidate_id:frm.doc.candidate
		// 		},
		// 		callback: function(r) {
		// 		}
		// 	});
		// }
	// 	else if(frm.doc.pp_original_at=="Candidate"){
	// 		frappe.call({
	// 			method: 'jobpro.custom.send_mail_to_candidate_pass_return',
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
	refresh: function (frm) {
if (!frm.fields_dict['dashboard']) return;

const dashboardWrapper = frm.fields_dict['dashboard'].$wrapper;
dashboardWrapper.empty();

// Add FontAwesome if not loaded
if (!$("link[href*='fontawesome']").length) {
    $("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">');
}

// Determine ECR border color
const ecrBorderColor = frm.doc.ecr_status === "ECR" ? "#ff9800" : "#ccc";

// Create main container
const mainContainer = $(`
    <div class="candidate-dashboard" style="
        display:flex; 
        flex-wrap:wrap; 
        gap:25px; 
        width:100%; 
        border:2px solid ${ecrBorderColor}; 
        border-radius:18px; 
        padding:30px; 
        box-shadow: 0 12px 25px rgba(0,0,0,0.12);
        background:linear-gradient(145deg, #ffffff, #f0f2f5);
        transition: all 0.3s ease;
    ">
        <div class="left-column" style="flex:1; min-width:280px; padding:0;"></div>
        <div class="right-column" style="flex:2; min-width:450px; padding:0;"></div>
    </div>
`);

// ----------------------------
// LEFT COLUMN
// ----------------------------
const leftCol = mainContainer.find('.left-column');
const initials = (frm.doc.given_name ? frm.doc.given_name[0] : '-') + (frm.doc.family_name ? frm.doc.family_name[0] : '');
leftCol.append(`
    <div style="text-align:center; margin-bottom:25px;">
        <div style="
            width:90px;
            height:90px;
            line-height:90px;
            margin:0 auto 15px auto;
            border-radius:50%;
            background:linear-gradient(135deg,#007bff,#00c6ff);
            color:#fff;
            font-weight:700;
            font-size:32px;
            box-shadow: 0 6px 18px rgba(0,0,0,0.25);
            transition: all 0.4s ease;
        ">${initials}</div>
        <div style="font-size:22px; font-weight:700; color:#222;">${frm.doc.given_name || '-'} ${frm.doc.family_name || ''}</div>
    </div>
`);
const currencyValue = frm.doc.candidate_payment_company_currenc 
    || frm.doc.client_payment_company_currency 
    || frm.doc.associate_si 
    || 0;

// Format as currency (you can change "USD" to dynamic currency code if needed)
const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'  // Replace with your desired currency or dynamic value
}).format(currencyValue);


const candidateFields = [
    { label: "Mobile", value: frm.doc.mobile || '-', icon: "fas fa-phone" },
    { label: "Email", value: frm.doc.email_id || '-', icon: "fas fa-envelope" },
    { label: "Passport", value: frm.doc.passport_no || '-', icon: "fas fa-passport" },
    { label: "Customer", value: frm.doc.customer || '-', icon: "fas fa-building" },
  { label: "Position", value: frm.doc.task_subject || '-', icon: "fas fa-user-tie" },
{ label: "Currency", value: formattedCurrency, icon: "fas fa-money-bill-wave" },

    { label: "Nationality", value: frm.doc.nationality || '-', icon: "fas fa-flag" },
    { label: "Territory", value: frm.doc.territory || '-', icon: "fas fa-map-marker-alt" },
];

candidateFields.forEach(field => {
    leftCol.append(`
        <div style="
            display:flex; 
            align-items:center; 
            margin-bottom:14px;
            padding:10px 14px;
            border-radius:12px;
            background:#fefefe;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            transition: all 0.4s ease;
        " class="candidate-field">
            <i class="${field.icon}" style="width:26px; text-align:center; margin-right:14px; color:#007bff;"></i>
            <div style="display:flex; flex-direction:column;">
                <span style="font-size:13px; color:#666;">${field.label}</span>
                <span style="font-size:15px; font-weight:600; color:#333;">${field.value}</span>
            </div>
        </div>
    `);
});

// Hover effect
$(".candidate-field").hover(function() {
    $(this).css({
        transform: "translateY(-3px)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
    });
}, function() {
    $(this).css({
        transform: "translateY(0)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    });
});

// ----------------------------
// RIGHT COLUMN: STATUS FLOW
// ----------------------------
const rightCol = mainContainer.find('.right-column');

const container = $(`
    <div class="candidate-status-flow" style="
        width:100%;
        padding:20px 0;
        margin-top:7%;
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        row-gap:60px;
        column-gap:20px;
        background:#fff;
        border-radius:14px;
        box-shadow: inset 0 3px 10px rgba(0,0,0,0.05);
    "></div>
`);

// ----- STATUS LOGIC SAME -----
let customer_so = 0;
if (frm.doc.customer) {
    try {
        const r = frappe.db.get_value("Customer", frm.doc.customer, "custom_so_not_needed");
        if (r && r.message && r.message.custom_so_not_needed) {
            customer_so = r.message.custom_so_not_needed;
        }
    } catch (err) {
        console.warn("Failed to fetch Customer custom_so_not_needed", err);
    }
}

const territoryStatusMap = { 
    "Qatar": ["PSL","Client Offer Letter","Signed Offer Letter","PCC","Visa","Emigration","Ticket","Onboarding","Onboarded","Arrived"],
    "UAE": {
        "Abudhabi": ["PSL","Client Offer Letter","Signed Offer Letter","PCC","Visa","Final Medical","Visa Stamping","Emigration","Ticket","Onboarding","Onboarded","Arrived"],
        "Dubai": ["PSL","Client Offer Letter","Signed Offer Letter","Final Medical","PCC","Visa","Emigration","Ticket","Onboarding","Onboarded","Arrived"]
    },
    "Oman": ["PSL","Client Offer Letter","Signed Offer Letter","PCC","Final Medical","Visa","Emigration","Ticket","Onboarding","Onboarded","Arrived"],
    "Kuwait": customer_so == 1 ? ["PSL","Client Offer Letter","Signed Offer Letter","Premedical","PCC","Visa","Final Medical","Biometric","Visa Stamping","Arrived"] 
                                 : ["PSL","Client Offer Letter","Signed Offer Letter","Premedical","PCC","Visa","Final Medical","Visa Stamping","Emigration","Ticket","Onboarding","Onboarded","Arrived"],
    "KSA": frm.doc.nationality == "Indian" ? ["PSL","Client Offer Letter","Signed Offer Letter","Visa","PCC","Final Medical","Biometric","Trade Test","Visa Stamping","Emigration","Ticket","Onboarding","Onboarded","Arrived"]
                                          : ["PSL","Client Offer Letter","Signed Offer Letter","Visa","PCC","Final Medical","Biometric","Visa Stamping","Emigration","Ticket","Onboarding","Onboarded","Arrived"],
    "Iraq": ["PSL","Visa","Emigration","Arrived"],
    "Bahrain": ["PSL","Client Offer Letter","Signed Offer Letter","Final Medical","Visa","Emigration","Ticket","Onboarding","Onboarded","Arrived"]
};

const icons = {
    "PSL": "fas fa-check-circle",
    "Client Offer Letter": "fas fa-file-signature",
    "Signed Offer Letter": "fas fa-pen-nib",
    "PCC": "fas fa-id-card",
    "Visa": "fas fa-passport",
    "Emigration": "fas fa-plane-departure",
    "Ticket": "fa-solid fa-ticket-simple",
    "Onboarding": "fas fa-user-plus",
    "Onboarded": "fas fa-user-check",
    "Arrived": "fas fa-flag-checkered",
    "Final Medical": "fas fa-notes-medical",
    "Visa Stamping": "fas fa-stamp",
    "Trade Test": "fas fa-award",
    "Biometric": "fas fa-fingerprint"
};

const territory = frm.doc.territory;
const visa_state = frm.doc.visa_state;
const currentStatus = frm.doc.status || "PSL";

let statuses = [];
if (territoryStatusMap[territory]) {
    if (typeof territoryStatusMap[territory][visa_state] !== "undefined") {
        statuses = territoryStatusMap[territory][visa_state];
    } else if (Array.isArray(territoryStatusMap[territory])) {
        statuses = territoryStatusMap[territory];
    }
}

// ---- BUILD STATUS STEPS ----
statuses.forEach((status, index) => {
    const active = status === currentStatus ? "active" : "";
    const completed = statuses.indexOf(currentStatus) > statuses.indexOf(status) ? "completed" : "";
    const isLast = index === statuses.length - 1;

    // find date/time from custom_history
    let sourced_date_html = "";
    if (frm.doc.custom_history) {
        const matchingRows = frm.doc.custom_history.filter(r => r.status === status);
        if (matchingRows.length) {
            matchingRows.sort((a, b) => new Date(b.date) - new Date(a.date));
            const latestRow = matchingRows[0];
            if (latestRow.date) {
                const dt = frappe.datetime.str_to_user(latestRow.date);
                const parts = dt.split(" ");
                sourced_date_html = `
                    <div style="font-size:10px; color:#555; margin-top:3px; text-align:center;">
                        ${parts[0]}<br>${parts.slice(1).join(" ")}
                    </div>`;
            }
        }
    }

    const step = $(`
        <div class="status-step ${active} ${completed}" style="
            display:flex;
            flex-direction:column;
            align-items:center;
            position:relative;
            flex: 0 0 calc(20% - 14px); 
            max-width: calc(20% - 14px);
            box-sizing:border-box;
            transition: all 0.4s ease;
        ">
            <div style="display:flex; align-items:center; justify-content:center; position:relative; width:100%;">
                <div style="display:flex; flex-direction:column; align-items:center; position:relative; z-index:2;">
                    <div class="circle" style="
                        width:40px; height:40px; border:2px solid #ccc; border-radius:50%;
                        display:flex; align-items:center; justify-content:center;
                        background:linear-gradient(145deg,#f0f0f0,#fafafa);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                        transition: all 0.4s ease;
                    ">
                        <i class="${icons[status] || 'fas fa-circle'}" style="font-size:15px;color:#555; transition: all 0.4s ease;"></i>
                    </div>
                    <div style="font-size:12px; font-weight:600; color:#333; text-align:center; margin-top:6px;">${status}</div>
                    <div>${sourced_date_html}</div>
                </div>
               ${!isLast ? `
    <div class="connector" style="
        height:4px; width:55px; background:#ccc; position:absolute; left:calc(57% + 10px); top:20px;
        border-radius:3px;
        overflow:visible;
        transition: all 0.4s ease;
    ">
        <div style="
            width:0; height:0; 
            border-top:6px solid transparent; 
            border-bottom:6px solid transparent; 
            border-left:8px solid #ccc; 
            position:absolute; 
            right:-8px; top:-3.5px;
            animation: arrowPulse 1.2s infinite alternate;
        "></div>
    </div>
` : ''}
            </div>
        </div>
    `);

    container.append(step);
});

// ---- Apply styling for active/completed ----
container.find(".status-step").each(function() {
    const circle = $(this).find(".circle");
    const icon = circle.find("i");
    const connector = $(this).find(".connector");
    const arrow = connector?.find("div");

    if ($(this).hasClass("active")) {
        circle.css({ borderColor: "#007bff", background: "linear-gradient(135deg,#80c3ff,#007bff)", boxShadow: "0 0 12px rgba(0,123,255,0.5)" });
        icon.css("color", "#fff");
        connector?.css("background", "#007bff");
        arrow?.css("border-left-color", "#007bff");
    } else if ($(this).hasClass("completed")) {
        circle.css({ borderColor: "#28a745", background: "linear-gradient(135deg,#a0f0b0,#28a745)", boxShadow: "0 0 10px rgba(40,167,69,0.4)" });
        icon.css("color", "#fff");
        connector?.css("background", "#28a745");
        arrow?.css("border-left-color", "#28a745");
    } else {
        circle.css({ background: "linear-gradient(135deg,#f0f0f0,#fafafa)", borderColor: "#ccc" });
        icon.css("color", "#555");
    }
});

// ---- Arrow animation keyframes ----
$("<style>").prop("type", "text/css").html(`
@keyframes arrowPulse {
    0% { transform: translateX(0); opacity: 0.6; }
    50% { transform: translateX(2px); opacity: 1; }
    100% { transform: translateX(0); opacity: 0.6; }
}
`).appendTo("head");

// Center the last incomplete row dynamically
setTimeout(() => {
    const steps = container.find(".status-step");
    const total = steps.length;
    const perRow = 5;
    const remainder = total % perRow;
    if (remainder !== 0) {
        const lastRowStart = total - remainder;
        const lastRowSteps = steps.slice(lastRowStart);
        lastRowSteps.wrapAll('<div class="last-row" style="display:flex; justify-content:center; width:100%; gap:25px;"></div>');
    }
}, 50);

rightCol.append(container);
dashboardWrapper.append(mainContainer);


// 		if (!$("link[href*='fontawesome']").length) {
//     $("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">');
// }

// frm.$wrapper.find('.candidate-status-flow').remove();

// const container = $(`
//     <div class="candidate-status-flow" style="
//         width:100%;
//         padding:10px 0;
//         display:flex;
//         flex-wrap:wrap;             /* ✅ allow multiple rows */
//         justify-content:center;
//         gap:13px;
//     ">
//     </div>
// `);
// if (frm.doc.ecr_status && frm.doc.ecr_status === "ECR") {
//     container.css({
//         border: "3px solid #ff9800",
//         borderRadius: "8px"
//     });
// } else {
//     container.css({ border: "none" });
// }
// let customer_so = 0;
// if (frm.doc.customer) {
// 	try {
// 		const r =  frappe.db.get_value("Customer", frm.doc.customer, "custom_so_not_needed");
// 		if (r && r.message && r.message.custom_so_not_needed) {
// 			customer_so = r.message.custom_so_not_needed;
// 		}
// 	} catch (err) {
// 		console.warn("Failed to fetch Customer custom_so_not_needed", err);
// 	}
// }
//  const territoryStatusMap = { 
// 	"Qatar": [
//     "PSL",
//     "Client Offer Letter",
//     "Signed Offer Letter",
//     "PCC",
//     "Visa",
//     "Emigration",
//     "Ticket",
//     "Onboarding",
//     "Onboarded",
//     "Arrived"
// 	 ],
// 	 "UAE": {
//         "Abudhabi": [
//             "PSL",
//             "Client Offer Letter",
//             "Signed Offer Letter",
//             "PCC",
//             "Visa",
// 			"Final Medical",
// 			"Visa Stamping",
//             "Emigration",
//             "Ticket",
// 			"Onboarding",
//             "Onboarded",
//             "Arrived"
//         ],
//         "Dubai": [
//             "PSL",
//             "Client Offer Letter",
//             "Signed Offer Letter",
//             "Final Medical",
//             "PCC",
//             "Visa",
// 			"Emigration",
// 			"Ticket",
//             "Onboarding",
//             "Onboarded",
//             "Arrived"
//         ]
//     },
// 	"Oman": [
//     "PSL",
//     "Client Offer Letter",
//     "Signed Offer Letter",
//     "PCC",
// 	"Final Medical",
//     "Visa",
//     "Emigration",
//     "Ticket",
//     "Onboarding",
//     "Onboarded",
//     "Arrived"
// 	 ],
// 	 "Kuwait": customer_so == 1 ? [
//                 "PSL",
// 				"Client Offer Letter",
// 				"Signed Offer Letter",
// 				"Premedical",
// 				"PCC",
// 				"Visa",
// 				"Final Medical",
// 				"Biometric",
// 				"Visa Stamping",
// 				"Arrived"
//             ] : [
//                 "PSL",
//                 "Client Offer Letter",
//                 "Signed Offer Letter",
//                 "Premedical",
//                 "PCC",
//                 "Visa",
//                 "Final Medical",
// 				"Visa Stamping",
// 				"Emigration",
// 				"Ticket",
// 				"Onboarding",
// 				"Onboarded",
// 				"Arrived"
//             ],
// 	"KSA": frm.doc.nationality == "Indian" ? [
//                 "PSL",
// 				"Client Offer Letter",
// 				"Signed Offer Letter",
// 				"Visa",
// 				"PCC",
// 				"Final Medical",
// 				"Biometric",
// 				"Trade Test",
// 				"Visa Stamping",
// 				"Emigration",
// 				"Ticket",
// 				"Onboarding",
// 				"Onboarded",
// 				"Arrived"
//             ] : [
//                 "PSL",
//                 "Client Offer Letter",
//                 "Signed Offer Letter",
//                 "Visa",
// 				"PCC",
//                 "Final Medical",
// 				"Biometric",
// 				"Visa Stamping",
// 				"Emigration",
// 				"Ticket",
// 				"Onboarding",
// 				"Onboarded",
// 				"Arrived"
//             ],
// 			"Dammam": [
//     "PSL",
//     "Client Offer Letter",
//     "Signed Offer Letter",
//     "Visa",
// 	"PCC",
// 	"Final Medical",
// 	"Biometric",
// 	"Visa Stamping",
//     "Emigration",
//     "Ticket",
//     "Onboarding",
//     "Onboarded",
//     "Arrived"
// 	 ],
// 	 "Jeddah": [
//     "PSL",
//     "Client Offer Letter",
//     "Signed Offer Letter",
//     "Visa",
// 	"PCC",
// 	"Final Medical",
// 	"Biometric",
// 	"Visa Stamping",
//     "Emigration",
//     "Ticket",
//     "Onboarding",
//     "Onboarded",
//     "Arrived"
// 	 ],
// 	 "Riyadh": [
//     "PSL",
//     "Client Offer Letter",
//     "Signed Offer Letter",
//     "Visa",
// 	"PCC",
// 	"Final Medical",
// 	"Biometric",
// 	"Visa Stamping",
//     "Emigration",
//     "Ticket",
//     "Onboarding",
//     "Onboarded",
//     "Arrived"
// 	 ],
// 	  "Iraq": [
// 		"PSL",
// 		"Visa",
// 		"Emigration",
// 		"Arrived"
// 	 ],
// 	 "Bahrain": [
// 		"PSL",
// 		"Client Offer Letter",
// 		"Signed Offer Letter",
// 		"Final Medical",
// 		"Visa",
// 		"Emigration",
// 		"Ticket",
// 		"Onboarding",
//     "Onboarded",
//     "Arrived"
// 	 ],
//  };
// const territory = frm.doc.territory;
// const icons = {
//     "PSL": "fas fa-check-circle",
//     "Client Offer Letter": "fas fa-file-signature",
//     "Signed Offer Letter": "fas fa-pen-nib",
//     "PCC": "fas fa-id-card",
//     "Visa": "fas fa-passport",
//     "Emigration": "fas fa-plane-departure",
//     "Ticket": "fa-solid fa-ticket-simple",
//     "Onboarding": "fas fa-user-plus",
//     "Onboarded": "fas fa-user-check",
//     "Arrived": "fas fa-flag-checkered",
// 	"Final Medical": "fas fa-notes-medical",
// 	"Visa Stamping": "fas fa-stamp",
// 	"Trade Test":  "fas fa-award",
// "Biometric": "fas fa-fingerprint"

// };
// const currentStatus = frm.doc.status || "PSL";

// const visa_state = frm.doc.visa_state;
// // const statuses = territoryStatusMap[territory] || [];
// let statuses = [];
// if (territoryStatusMap[territory]) {
//     if (typeof territoryStatusMap[territory][visa_state] !== "undefined") {
//         statuses = territoryStatusMap[territory][visa_state];
//     } else if (Array.isArray(territoryStatusMap[territory])) {
//         statuses = territoryStatusMap[territory];
//     }
// }
// statuses.forEach((status, index) => {
//     const active = status === currentStatus ? "active" : "";
//     const completed = statuses.indexOf(currentStatus) > statuses.indexOf(status) ? "completed" : "";
// 	 const isLast = index === statuses.length - 1;
//     let sourced_date_html = "";
//     if (frm.doc.custom_history) {
//         const matchingRows = frm.doc.custom_history.filter(r => r.status === status);
//         if (matchingRows.length) {
//             matchingRows.sort((a, b) => new Date(b.date) - new Date(a.date));
//             const latestRow = matchingRows[0];
//             if (latestRow.date) {
//                 const dt = frappe.datetime.str_to_user(latestRow.date);
//                 const parts = dt.split(" ");
//                 sourced_date_html = `
//                     <div style="font-size:9px; color:#555; margin-top:2px; text-align:center">
//                         ${parts[0]}<br>${parts.slice(1).join(" ")}
//                     </div>`;
//             }
//         }
//     }
//     const step = $(`
//         <div class="status-step ${active} ${completed}" 
//              style="display:flex; flex-direction:column; align-items:center; position:relative;">
             
//             <div style="display:flex; align-items:center; position:relative;">
//                 <div class="circle" style="
//                     width:32px;
//                     height:32px;
//                     border:2px solid #ccc;
//                     border-radius:50%;
//                     display:flex;
//                     align-items:center;
//                     justify-content:center;
//                     background:#f8f8f8;
//                     z-index:1;
//                     position:relative;
//                 ">
//                     <i class="${icons[status] || 'fas fa-circle'}" style="font-size:13px;color:#555;"></i>
//                 </div>

//                 ${index < statuses.length - 1 ? `
//                     <div class="connector" style="
//                         height:2px;
//                         width:40px;       
//                         background:#ccc;
//                         margin-left:4px;
//                         position:relative;
//                     ">
//                         <div style="
//                             width:0;
//                             height:0;
//                             border-top:5px solid transparent;
//                             border-bottom:5px solid transparent;
//                             border-left:6px solid #ccc;
//                             position:absolute;
//                             right:-6px;
//                             top:-4px;
//                         "></div>
//                     </div>
//                 ` : ''}
//             </div>

//             <div style="display:flex; flex-direction:column; align-items:center; margin-top:4px;">
//                 <div class="label" title="${status}" style="
// 				margin-left:-45px;
//                     font-size:9px;
//                     color:#333;
//                     text-align:center;
//                     white-space:nowrap;
//                 ">
//                     ${status}
//                 </div>
//     ${sourced_date_html ? `<div style="font-size:9px;color:#555; margin-top:2px; text-align:center; margin-left:-45px;">${sourced_date_html}</div>` : ''}
//             </div>
//         </div>
//     `);

//     container.append(step);
// });
// // Split steps into rows of 10
// const steps = container.children(".status-step").toArray();
// container.empty();

// for (let i = 0; i < steps.length; i += 10) {
//     const row = $('<div style="display:flex; justify-content:center; gap:13px; margin-bottom:15px; flex-wrap:nowrap;"></div>');
//     row.append(steps.slice(i, i + 10));
//     container.append(row);
// }

// // Apply active/completed styles
// container.find(".status-step").each(function() {
//     const circle = $(this).find(".circle");
//     const icon = circle.find("i");
//     const connector = $(this).find(".connector");
//     const arrow = connector?.find("div");

//     if ($(this).hasClass("active")) {
//         circle.css({ borderColor: "#007bff", background: "#e7f0ff", boxShadow: "0 0 6px rgba(0,123,255,0.4)" });
//         icon.css("color", "#007bff");
//         connector?.css("background", "#007bff");
//         arrow?.css("border-left-color", "#007bff");
//     } else if ($(this).hasClass("completed")) {
//         circle.css({ borderColor: "#28a745", background: "#e9f9ee" });
//         icon.css("color", "#28a745");
//         connector?.css("background", "#28a745");
//         arrow?.css("border-left-color", "#28a745");
//     }
// });
// // After appending all steps to the container
// container.find(".status-step .circle").each(function(index) {
//     const stepDiv = $(this).closest(".status-step");
//     const status = statuses[index]; // corresponding status
//     $(this).css("cursor", "pointer"); // show pointer on hover

//     $(this).off("click").on("click", function() {
//         // Example: only show dialog for PSL, you can add more cases
//         let fields = [];
//         if (status === "PSL" && frm.doc.territory=="Qatar" && !(frm.doc.passport && frm.doc.photo)) {
//             fields = [
//                 {
//                     label: 'Passport(as per visa specification)',
//                     fieldtype: 'Attach',
//                     fieldname: 'passport',
//                     reqd: 1
//                 },
//                 {
//                     label: 'Next Action',
//                     fieldtype: 'Link',
//                     fieldname: 'standard_remarks',
//                     options:"Standard Remarks",
//                     reqd: 1,
//                     get_query: () => {
//                         return {
//                             filters: {
//                                 status: 'Client Offer Letter'
//                             }
//                         };
//                     }
//                 },
//                 {
//                     fieldtype: 'Column Break',
//                     fieldname: 'custom_col',
//                 },
//                 {
//                     label: 'Photo(as per visa specification)',
//                     fieldtype: 'Attach',
//                     fieldname: 'photo',
//                     reqd: 1
//                 }
//             ];
//         } 
// 		else if (status === "Client Offer Letter" && frm.doc.passport && frm.doc.photo && frm.doc.territory=="Qatar"&&!frm.doc.offer_letter) {
//             fields = [
//                {
// 							label: 'Client Offer Letter',
// 							fieldtype: 'Attach',
// 							fieldname: 'offer_letter',
// 							reqd:1
// 						},
						
// 						{
// 							label: 'Next Action',
// 							fieldtype: 'Link',
// 							fieldname: 'standard_remarks',
// 							options:"Standard Remarks",
// 							reqd:1,
// 							get_query: () => {
// 								return {
// 									filters: {
// 										status: 'Signed Offer Letter'
// 									}
// 								};
// 							}
// 						}

//             ];
//         }
// 		else if (status === "Signed Offer Letter" && frm.doc.territory=="Qatar"&&!frm.doc.sol) {
//             fields = [
// 				{
// 					label: 'Signed Offer Letter',
// 					fieldtype: 'Attach',
// 					fieldname: 'sol',
// 					reqd:1
// 				},
				
// 				{
// 					label: 'Next Action',
// 					fieldtype: 'Link',
// 					fieldname: 'standard_remarks',
// 					options:"Standard Remarks",
// 					reqd:1,
// 					get_query: () => {
// 						return {
// 							filters: {
// 								status: 'PCC'
// 							}
// 						};
// 					}
// 				}

//             ];
//         }
// 		else if (status === "PCC" && frm.doc.territory=="Qatar"&& frm.doc.status=="PCC") {
//             fields = [
// 				{
// 					label: 'PCC',
// 					fieldtype: 'Attach',
// 					fieldname: 'pcc',
// 				},
// 				{
// 					label: 'PCC Not Applicable',
// 					fieldtype: 'Check',
// 					fieldname: 'pcc_not_applicable',
// 				},
				
// 				{
// 					label: 'Next Action',
// 					fieldtype: 'Link',
// 					fieldname: 'standard_remarks',
// 					options:"Standard Remarks",
// 					reqd:1,
// 					get_query: () => {
// 						return {
// 							filters: {
// 								status: 'Visa'
// 							}
// 						};
// 					}
// 				}

//             ];
//         }
// 		else if (status === "Visa" && frm.doc.territory=="Qatar"&& frm.doc.status=="Visa") {
//             fields = [
// 				{
// 					label: 'Visa',
// 					fieldtype: 'Attach',
// 					fieldname: 'visa',
// 					reqd:1,
// 				},
				
// 				{
// 					label: 'Next Action',
// 					fieldtype: 'Link',
// 					fieldname: 'standard_remarks',
// 					options:"Standard Remarks",
// 					reqd:1,
// 					get_query: () => {
// 						return {
// 							filters: {
// 								status: 'Emigration'
// 							}
// 						};
// 					}
// 				}

//             ];
//         }
// 		else if (status === "Emigration" && frm.doc.territory=="Qatar" && frm.doc.status=="Emigration") {
//             fields = [
// 				{
// 					label: 'Emigration Not Applicable',
// 					fieldtype: 'Check',
// 					fieldname: 'emigration_not_applicable',
// 				},
// 				{
// 					label: 'Emigration',
// 					fieldtype: 'Attach',
// 					fieldname: 'emigration',
// 				},
// 				{
// 					label: 'Declaration',
// 					fieldtype: 'Attach',
// 					fieldname: 'declaration',
// 				},
// 				{
// 					fieldtype: 'Column Break',
// 					fieldname: 'column_1',
// 				},
// 				{
// 					label: 'Insurance',
// 					fieldtype: 'Attach',
// 					fieldname: 'attach_insurance',
// 				},
// 				{
// 					label: 'Employment Contract',
// 					fieldtype: 'Attach',
// 					fieldname: 'employment_contract',
// 				},
// 				{
// 					fieldtype: 'Section Break',
// 					fieldname: 'section_1',
// 				},
// 				{
// 					label: 'Next Action',
// 					fieldtype: 'Link',
// 					fieldname: 'standard_remarks',
// 					options:"Standard Remarks",
// 					reqd:1,
// 					get_query: () => {
// 						return {
// 							filters: {
// 								status: 'Ticket'
// 							}
// 						};
// 					}
// 				}

//             ];
//         }
// 		else if (status === "Ticket" && frm.doc.territory=="Qatar"&& frm.doc.status=="Ticket") {
//             fields = [
// 				{
// 					label: 'Ticket',
// 					fieldtype: 'Attach',
// 					fieldname: 'ticket',
// 					reqd:1,
// 				},
// 				{
// 					label:'Candidate Feedback Form',
// 					fieldtype: 'Attach',
// 					fieldname: 'candidate_feedback_form',
// 					reqd:1,

// 				},
// 				{
// 					label: 'Next Action',
// 					fieldtype: 'Link',
// 					fieldname: 'standard_remarks',
// 					options:"Standard Remarks",
// 					reqd:1,
// 					get_query: () => {
// 						return {
// 							filters: {
// 								status: 'Onboarding'
// 							}
// 						};
// 					}
// 				}
//             ];
//         }
// 		else if (status === "Onboarding" && frm.doc.territory=="Qatar"&& frm.doc.status=="Onboarding") {
//             fields = [
// 				{
// 					label: 'Onboarded',
// 					fieldtype: 'Check',
// 					fieldname: 'onboarded',
// 					reqd:1,
// 				},
// 				{
// 					label: 'Next Action',
// 					fieldtype: 'Link',
// 					fieldname: 'standard_remarks',
// 					options:"Standard Remarks",
// 					reqd:1,
// 					get_query: () => {
// 						return {
// 							filters: {
// 								status: 'Onboarded'
// 							}
// 						};
// 					}
// 				}
//             ];
//         }
// 		else if (status === "Arrived" && frm.doc.territory=="Qatar"&& frm.doc.status=="Onboarded") {
//             fields = [
// 				{
// 					label: 'Emergency Contact Number in India',
// 					fieldtype: 'Data',
// 					fieldname: 'custom__emergency_contact_number_in_india',
// 					reqd:1,
// 				},
// 				{
// 					label: 'Candidate Google Review',
// 					fieldtype: 'Data',
// 					fieldname: 'candidate_google_review',
// 					reqd:1,
// 				},
// 				{
// 					label: 'Local Mobile Number',
// 					fieldtype: 'Phone',
// 					fieldname: 'custom_local_mobile_number',
// 					reqd:1,
// 				},
// 				{
// 					label: 'Next Action',
// 					fieldtype: 'Link',
// 					fieldname: 'standard_remarks',
// 					options:"Standard Remarks",
// 					reqd:1,
// 					get_query: () => {
// 						return {
// 							filters: {
// 								status: 'Arrived'
// 							}
// 						};
// 					}
// 				}

//             ];
//         }
// 		if (status === "PSL" && frm.doc.territory=="UAE" && frm.doc.visa_state == 'Abudhabi' && !(frm.doc.passport && frm.doc.photo)) {
//             fields = [
//                 {
//                     label: 'Passport(as per visa specification)',
//                     fieldtype: 'Attach',
//                     fieldname: 'passport',
//                     reqd: 1
//                 },
//                 {
//                     label: 'Next Action',
//                     fieldtype: 'Link',
//                     fieldname: 'standard_remarks',
//                     options:"Standard Remarks",
//                     reqd: 1,
//                     get_query: () => {
//                         return {
//                             filters: {
//                                 status: 'Client Offer Letter'
//                             }
//                         };
//                     }
//                 },
//                 {
//                     fieldtype: 'Column Break',
//                     fieldname: 'custom_col',
//                 },
//                 {
//                     label: 'Photo(as per visa specification)',
//                     fieldtype: 'Attach',
//                     fieldname: 'photo',
//                     reqd: 1
//                 }
//             ];
//         } 
//         if (fields.length) {
//             let d = new frappe.ui.Dialog({
//                 title: status + ' Attachment',
//                 fields: fields,
//                 primary_action_label: 'Save',
//                 primary_action(values) {
//                     Object.keys(values).forEach(f => frm.set_value(f, values[f]));
// 					if(status=="Onboarding"){
// 						frm.set_value("status", "Onboarded")
// 						 let row = frm.add_child("custom_history");
//                         row.date = frappe.datetime.now_datetime();
//                         row.status_moved_by = frappe.session.user;
//                         row.status ="Onboarded"
//                         frm.refresh_field("custom_history");
// 					}
// 					if(status=="Visa"){
// 						frm.set_value("so_created",1)
// 					}
//                     frm.save();
//                     d.hide();
//                 },
//                 secondary_action_label: 'Cancel',
//                 secondary_action() { d.hide(); }
//             });
//             d.show();
//         }
//     });
// });

// const formPage = frm.$wrapper.find('.form-page'); 
// if (formPage.length) {
//     formPage.prepend(container);
// } else {
//     frm.$wrapper.append(container);
// }


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
			if(frm.doc.expected_doj){
            frm.set_value('expiry_period', `${diffYears} years, ${diffMonths} months`);
			}else{
				frm.set_value('expiry_period', `0 years, 0 months`);
			}
        }
        
		if(frm.doc.territory=="Qatar"){
            // set_section_visibility_qatar(frm);
		}
		if(frm.doc.territory=='UAE' && frm.doc.visa_state == 'Abudhabi'){
			// set_section_visibility_uae(frm);
		}
		if(frm.doc.territory=='UAE' && frm.doc.visa_state == 'Dubai'){
			// set_section_visibility_uae_dubai(frm);
		}
		if(frm.doc.territory=="Oman"){
			// set_section_visibility_oman(frm);
		}
		if (frm.doc.territory == "Kuwait") {
			frappe.db.get_value("Customer", { name: frm.doc.customer }, "custom_so_not_needed")
				.then(r => {
					const customer_so = r.message.custom_so_not_needed;
					if (customer_so == 1) {
						// set_section_visibility_kuwait(frm);
					}
					else{
						// set_section_visibility_kuwait_so(frm);
					}
				});
		}
		if(frm.doc.territory =='KSA' && frm.doc.nationality=="Indian"){
			// set_section_visibility_ksa_ind(frm);
		}
		if(frm.doc.territory =='KSA' && !frm.doc.nationality=="Indian"){
			// set_section_visibility_ksa_non_ind(frm);
		}
		if(frm.doc.territory =='Dammam' || frm.doc.territory =='Jeddah' || frm.doc.territory =='Riyadh' ){
			// set_section_visibility_dammam(frm);
		}
		if(frm.doc.territory =='Iraq'){
			frappe.db.get_value("Customer", { name: frm.doc.customer }, "custom_so_not_needed")
				.then(r => {
					const customer_so = r.message.custom_so_not_needed;
					if (customer_so == 1) {
						// set_section_visibility_iraq(frm);
					}
					// else{
					// 	set_section_visibility_iraq_so(frm);
					// }
				});
		}
		// if(frm.doc.territory =='Bahrain'){
		// 	set_section_visibility_bahrain(frm);
		// }
		if(frm.doc.status=="PSL"){
			
			if(frm.doc.territory=="Qatar"){
			if(!frm.doc.passport || !frm.doc.photo){
				frm.add_custom_button(__("PSL"), function () {
				let d = new frappe.ui.Dialog({
					title: 'PSL Attachment',
					fields: [
						{
							label: 'Passport(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
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
							label: 'Photo(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd:1
						},

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("passport",values.passport)
					frm.set_value("photo",values.photo)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PSL'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));}
			}
			// 
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				if(!frm.doc.passport || !frm.doc.photo){
				frm.add_custom_button(__("PSL"), function () {
				let d = new frappe.ui.Dialog({
					title: 'PSL Attachment',
					fields: [
						{
							label: 'Passport(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
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
							label: 'Photo(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd:1
						},

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("passport",values.passport)
					frm.set_value("photo",values.photo)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PSL'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));}
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Dubai"){
				if(!frm.doc.passport || !frm.doc.photo){
				frm.add_custom_button(__("PSL"), function () {
				let d = new frappe.ui.Dialog({
					title: 'PSL Attachment',
					fields: [
						{
							label: 'Passport(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
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
							label: 'Photo(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd:1
						},

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("passport",values.passport)
					frm.set_value("photo",values.photo)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PSL'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));}
			}
			else if(frm.doc.territory=="Oman"){
				if(!frm.doc.passport || !frm.doc.photo){
				frm.add_custom_button(__("PSL"), function () {
				let d = new frappe.ui.Dialog({
					title: 'PSL Attachment',
					fields: [
						{
							label: 'Passport(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
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
							label: 'Photo(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd:1
						},

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("passport",values.passport)
					frm.set_value("photo",values.photo)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

					let d = new frappe.ui.Dialog({
						title: 'Next Action',
						fields: [
							{
								label: 'Next Action',
								fieldtype: 'Link',
								fieldname: 'standard_remarks',
								options:"Standard Remarks",
								reqd:1,
								get_query: () => {
									return {
										filters: {
											status: 'PSL'
										}
									};
								}
							}

						],
						primary_action_label: 'Yes',
						primary_action() {
						let values = d.get_values();
						frm.set_value("standard_remarks",values.standard_remarks)
							frm.save();
							d.hide();
						},
						secondary_action_label: 'No',
						secondary_action() {
							d.hide();
						}
					});
					d.show();

					},("Status"));}
			}
			else if(frm.doc.territory=="Kuwait"){
				if(!frm.doc.passport || !frm.doc.photo){
				frm.add_custom_button(__("PSL"), function () {
				let d = new frappe.ui.Dialog({
					title: 'PSL Attachment',
					fields: [
						{
							label: 'Passport(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
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
							label: 'Photo(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd:1
						},

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("passport",values.passport)
					frm.set_value("photo",values.photo)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

					let d = new frappe.ui.Dialog({
						title: 'Next Action',
						fields: [
							{
								label: 'Next Action',
								fieldtype: 'Link',
								fieldname: 'standard_remarks',
								options:"Standard Remarks",
								reqd:1,
								get_query: () => {
									return {
										filters: {
											status: 'PSL'
										}
									};
								}
							}

						],
						primary_action_label: 'Yes',
						primary_action() {
						let values = d.get_values();
						frm.set_value("standard_remarks",values.standard_remarks)
							frm.save();
							d.hide();
						},
						secondary_action_label: 'No',
						secondary_action() {
							d.hide();
						}
					});
					d.show();

					},("Status"));}
			}
			else if(frm.doc.territory=="KSA" && frm.doc.nationality=="Indian"){
				if(!frm.doc.passport || !frm.doc.photo){
				frm.add_custom_button(__("PSL"), function () {
				let d = new frappe.ui.Dialog({
					title: 'PSL Attachment',
					fields: [
						{
							label: 'Passport(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
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
							label: 'Photo(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd:1
						},

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("passport",values.passport)
					frm.set_value("photo",values.photo)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

					let d = new frappe.ui.Dialog({
						title: 'Next Action',
						fields: [
							{
								label: 'Next Action',
								fieldtype: 'Link',
								fieldname: 'standard_remarks',
								options:"Standard Remarks",
								reqd:1,
								get_query: () => {
									return {
										filters: {
											status: 'PSL'
										}
									};
								}
							}

						],
						primary_action_label: 'Yes',
						primary_action() {
						let values = d.get_values();
						frm.set_value("standard_remarks",values.standard_remarks)
							frm.save();
							d.hide();
						},
						secondary_action_label: 'No',
						secondary_action() {
							d.hide();
						}
					});
					d.show();

					},("Status"));}
			}
			else if(frm.doc.territory=="Dammam" || frm.doc.territory=="Jeddah" || frm.doc.territory=="Riyadh"){
				if(!frm.doc.passport || !frm.doc.photo){
				frm.add_custom_button(__("PSL"), function () {
				let d = new frappe.ui.Dialog({
					title: 'PSL Attachment',
					fields: [
						{
							label: 'Passport(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'passport',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
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
							label: 'Photo(as pre visa specification)',
							fieldtype: 'Attach',
							fieldname: 'photo',
							reqd:1
						},

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("passport",values.passport)
					frm.set_value("photo",values.photo)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

					let d = new frappe.ui.Dialog({
						title: 'Next Action',
						fields: [
							{
								label: 'Next Action',
								fieldtype: 'Link',
								fieldname: 'standard_remarks',
								options:"Standard Remarks",
								reqd:1,
								get_query: () => {
									return {
										filters: {
											status: 'PSL'
										}
									};
								}
							}

						],
						primary_action_label: 'Yes',
						primary_action() {
						let values = d.get_values();
						frm.set_value("standard_remarks",values.standard_remarks)
							frm.save();
							d.hide();
						},
						secondary_action_label: 'No',
						secondary_action() {
							d.hide();
						}
					});
					d.show();

					},("Status"));}
			}
			
		}
		if(frm.doc.status=="Client Offer Letter"){
			if(frm.doc.territory=="Qatar"){
				if(frm.doc.passport && frm.doc.photo){
				frm.add_custom_button(__("Client Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Client Offer Letter Attachment',
					fields: [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("offer_letter",values.offer_letter)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));}
			}
			// 
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				if(frm.doc.passport && frm.doc.photo){
				frm.add_custom_button(__("Client Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Client Offer Letter Attachment',
					fields: [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("offer_letter",values.offer_letter)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));}
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Dubai"){
				if(frm.doc.passport && frm.doc.photo){
				frm.add_custom_button(__("Client Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Client Offer Letter Attachment',
					fields: [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("offer_letter",values.offer_letter)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));}
			}
			else if(frm.doc.territory=="Oman"){
				if(frm.doc.passport && frm.doc.photo){
				frm.add_custom_button(__("Client Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Client Offer Letter Attachment',
					fields: [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("offer_letter",values.offer_letter)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));}
			}
			else if(frm.doc.territory=="Kuwait"){
				if(frm.doc.passport && frm.doc.photo){
				frm.add_custom_button(__("Client Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Client Offer Letter Attachment',
					fields: [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("offer_letter",values.offer_letter)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));}
			}
			else if(frm.doc.territory=="KSA" && frm.doc.nationality=="Indian"){
				if(frm.doc.passport && frm.doc.photo){
				frm.add_custom_button(__("Client Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Client Offer Letter Attachment',
					fields: [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("offer_letter",values.offer_letter)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));}
			}
			else if(frm.doc.territory=="Dammam" || frm.doc.territory=="Jeddah" || frm.doc.territory=="Riyadh"){
				if(frm.doc.passport && frm.doc.photo){
				frm.add_custom_button(__("Client Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Client Offer Letter Attachment',
					fields: [
						{
							label: 'Client Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'offer_letter',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Signed Offer Letter'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("offer_letter",values.offer_letter)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));}
			}
		}
		if(frm.doc.status=="Signed Offer Letter"){
			if(frm.doc.territory=="Qatar"){
				frm.add_custom_button(__("Signed Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Signed Offer Letter Attachment',
					fields: [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("sol",values.sol)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				frm.add_custom_button(__("Signed Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Signed Offer Letter Attachment',
					fields: [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("sol",values.sol)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Dubai"){
				frm.add_custom_button(__("Signed Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Signed Offer Letter Attachment',
					fields: [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("sol",values.sol)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Oman"){
				frm.add_custom_button(__("Signed Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Signed Offer Letter Attachment',
					fields: [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("sol",values.sol)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Kuwait"){
				frm.add_custom_button(__("Signed Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Signed Offer Letter Attachment',
					fields: [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Premedical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("sol",values.sol)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="KSA" && frm.doc.nationality=="Indian"){
				frm.add_custom_button(__("Signed Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Signed Offer Letter Attachment',
					fields: [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("sol",values.sol)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Dammam" || frm.doc.territory=="Jeddah" || frm.doc.territory=="Riyadh"){
				frm.add_custom_button(__("Signed Offer Letter"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Signed Offer Letter Attachment',
					fields: [
						{
							label: 'Signed Offer Letter',
							fieldtype: 'Attach',
							fieldname: 'sol',
							reqd:1
						},
						
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("sol",values.sol)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
				
		}
		if(frm.doc.status=="Premedical"){
			if(frm.doc.territory=="Kuwait"){
				frm.add_custom_button(__("Premedical"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Premedical Attachment',
					fields: [
						{
							label: 'Premedical',
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
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("premedical",values.premedical)
					frm.set_value("premedical_not_applicable",values.premedical_not_applicable)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Premedical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
		}
		if(frm.doc.status=="PCC"){
			if(frm.doc.territory=="Qatar"){
				frm.add_custom_button(__("PCC"), function () {

				let d = new frappe.ui.Dialog({
					title: 'PCC Attachment',
					fields: [
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
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("pcc",values.pcc)
					frm.set_value("pcc_not_applicable",values.pcc_not_applicable)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				frm.add_custom_button(__("PCC"), function () {

				let d = new frappe.ui.Dialog({
					title: 'PCC Attachment',
					fields: [
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
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("pcc",values.pcc)
					frm.set_value("pcc_not_applicable",values.pcc_not_applicable)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Dubai"){
				frm.add_custom_button(__("PCC"), function () {

				let d = new frappe.ui.Dialog({
					title: 'PCC Attachment',
					fields: [
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
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("pcc",values.pcc)
					frm.set_value("pcc_not_applicable",values.pcc_not_applicable)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Oman"){
				frm.add_custom_button(__("PCC"), function () {

				let d = new frappe.ui.Dialog({
					title: 'PCC Attachment',
					fields: [
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
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("pcc",values.pcc)
					frm.set_value("pcc_not_applicable",values.pcc_not_applicable)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Kuwait"){
				frm.add_custom_button(__("PCC"), function () {

				let d = new frappe.ui.Dialog({
					title: 'PCC Attachment',
					fields: [
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
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("pcc",values.pcc)
					frm.set_value("pcc_not_applicable",values.pcc_not_applicable)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

					let d = new frappe.ui.Dialog({
						title: 'Next Action',
						fields: [
							{
								label: 'Next Action',
								fieldtype: 'Link',
								fieldname: 'standard_remarks',
								options:"Standard Remarks",
								reqd:1,
								get_query: () => {
									return {
										filters: {
											status: 'PCC'
										}
									};
								}
							}

						],
						primary_action_label: 'Yes',
						primary_action() {
						let values = d.get_values();
						frm.set_value("standard_remarks",values.standard_remarks)
							frm.save();
							d.hide();
						},
						secondary_action_label: 'No',
						secondary_action() {
							d.hide();
						}
					});
					d.show();

					},("Status"));
			}
			else if(frm.doc.territory=="KSA" && frm.doc.nationality=="Indian"){
				frm.add_custom_button(__("PCC"), function () {

				let d = new frappe.ui.Dialog({
					title: 'PCC Attachment',
					fields: [
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
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("pcc",values.pcc)
					frm.set_value("pcc_not_applicable",values.pcc_not_applicable)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

					let d = new frappe.ui.Dialog({
						title: 'Next Action',
						fields: [
							{
								label: 'Next Action',
								fieldtype: 'Link',
								fieldname: 'standard_remarks',
								options:"Standard Remarks",
								reqd:1,
								get_query: () => {
									return {
										filters: {
											status: 'PCC'
										}
									};
								}
							}

						],
						primary_action_label: 'Yes',
						primary_action() {
						let values = d.get_values();
						frm.set_value("standard_remarks",values.standard_remarks)
							frm.save();
							d.hide();
						},
						secondary_action_label: 'No',
						secondary_action() {
							d.hide();
						}
					});
					d.show();

					},("Status"));
			}
			else if(frm.doc.territory=="Dammam" || frm.doc.territory=="Jeddah" || frm.doc.territory=="Riyadh"){
				frm.add_custom_button(__("PCC"), function () {

				let d = new frappe.ui.Dialog({
					title: 'PCC Attachment',
					fields: [
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
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("pcc",values.pcc)
					frm.set_value("pcc_not_applicable",values.pcc_not_applicable)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

					let d = new frappe.ui.Dialog({
						title: 'Next Action',
						fields: [
							{
								label: 'Next Action',
								fieldtype: 'Link',
								fieldname: 'standard_remarks',
								options:"Standard Remarks",
								reqd:1,
								get_query: () => {
									return {
										filters: {
											status: 'PCC'
										}
									};
								}
							}

						],
						primary_action_label: 'Yes',
						primary_action() {
						let values = d.get_values();
						frm.set_value("standard_remarks",values.standard_remarks)
							frm.save();
							d.hide();
						},
						secondary_action_label: 'No',
						secondary_action() {
							d.hide();
						}
					});
					d.show();

					},("Status"));
			}
		}
		// if(frm.doc.status=="Biometric"){
		// 	if(frm.doc.territory=="KSA" && frm.doc.nationality=="Indian"){
		// 		frm.add_custom_button(__("Biometric"), function () {

		// 		let d = new frappe.ui.Dialog({
		// 			title: 'Biometric Attachment',
		// 			fields: [
		// 				{
		// 					label: 'PCC',
		// 					fieldtype: 'Attach',
		// 					fieldname: 'pcc',
		// 				},
		// 				{
		// 					label: 'PCC Not Applicable',
		// 					fieldtype: 'Check',
		// 					fieldname: 'pcc_not_applicable',
		// 				},
						
		// 				{
		// 					label: 'Next Action',
		// 					fieldtype: 'Link',
		// 					fieldname: 'standard_remarks',
		// 					options:"Standard Remarks",
		// 					reqd:1,
		// 					get_query: () => {
		// 						return {
		// 							filters: {
		// 								status: 'Visa'
		// 							}
		// 						};
		// 					}
		// 				}

		// 			],
		// 			primary_action_label: 'Yes',
		// 			primary_action() {
		// 			let values = d.get_values();
		// 			frm.set_value("pcc",values.pcc)
		// 			frm.set_value("pcc_not_applicable",values.pcc_not_applicable)
		// 			frm.set_value("standard_remarks",values.standard_remarks)
		// 				frm.save();
		// 				d.hide();
		// 			},
		// 			secondary_action_label: 'No',
		// 			secondary_action() {
		// 				d.hide();
		// 			}
		// 		});
		// 		d.show();

        // 		},("Status"));
		// 	}
		// }
		if(frm.doc.status=="Visa"){
			if(frm.doc.territory=="Qatar"){
				frm.add_custom_button(__("Visa"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Visa Attachment',
					fields: [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("visa",values.visa)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				frm.add_custom_button(__("Visa"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Visa Attachment',
					fields: [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("visa",values.visa)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Dubai"){
				frm.add_custom_button(__("Visa"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Visa Attachment',
					fields: [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("visa",values.visa)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Oman"){
				frm.add_custom_button(__("Visa"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Visa Attachment',
					fields: [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("visa",values.visa)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Kuwait"){
				frm.add_custom_button(__("Visa"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Visa Attachment',
					fields: [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("visa",values.visa)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="KSA" && frm.doc.nationality=="Indian"){
				frm.add_custom_button(__("Visa"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Visa Attachment',
					fields: [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("visa",values.visa)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Dammam" || frm.doc.territory=="Jeddah" || frm.doc.territory=="Riyadh"){
				frm.add_custom_button(__("Visa"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Visa Attachment',
					fields: [
						{
							label: 'Visa',
							fieldtype: 'Attach',
							fieldname: 'visa',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("visa",values.visa)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
		}
		if(frm.doc.status=="Final Medical"){
			if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				frm.add_custom_button(__("Final Medical"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Final Medical Attachment',
					fields: [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("final_medical",values.final_medical)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Dubai"){
				frm.add_custom_button(__("Final Medical"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Final Medical Attachment',
					fields: [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'PCC'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("final_medical",values.final_medical)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Oman"){
				frm.add_custom_button(__("Final Medical"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Final Medical Attachment',
					fields: [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("final_medical",values.final_medical)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Kuwait"){
				frm.add_custom_button(__("Final Medical"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Final Medical Attachment',
					fields: [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd:1,
						},
						{
							label: 'Medical Proof',
							fieldtype: 'Attach',
							fieldname: 'custom_medical_proof',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("final_medical",values.final_medical)
					frm.set_value("custom_medical_proof",values.custom_medical_proof)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="KSA" && frm.doc.nationality=="Indian" && !frm.doc.custom_medical_proof){
				frm.add_custom_button(__("Final Medical"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Medical Proof Attachment',
					fields: [
						{
							label: 'Medical Proof',
							fieldtype: 'Attach',
							fieldname: 'custom_medical_proof',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("custom_medical_proof",values.custom_medical_proof)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="KSA" && frm.doc.nationality=="Indian" && frm.doc.custom_medical_proof){
				frm.add_custom_button(__("Final Medical"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Final Medical Attachment',
					fields: [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Biometric'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("final_medical",values.final_medical)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Dammam" || frm.doc.territory=="Jeddah" || frm.doc.territory=="Riyadh"){
				if(!frm.doc.custom_medical_proof){
					frm.add_custom_button(__("Final Medical"), function () {

					let d = new frappe.ui.Dialog({
						title: 'Medical Proof Attachment',
						fields: [
							{
								label: 'Medical Proof',
								fieldtype: 'Attach',
								fieldname: 'custom_medical_proof',
								reqd:1,
							},
							{
								label: 'Next Action',
								fieldtype: 'Link',
								fieldname: 'standard_remarks',
								options:"Standard Remarks",
								reqd:1,
								get_query: () => {
									return {
										filters: {
											status: 'Final Medical'
										}
									};
								}
							}

						],
						primary_action_label: 'Yes',
						primary_action() {
						let values = d.get_values();
						frm.set_value("custom_medical_proof",values.custom_medical_proof)
						frm.set_value("standard_remarks",values.standard_remarks)
							frm.save();
							d.hide();
						},
						secondary_action_label: 'No',
						secondary_action() {
							d.hide();
						}
					});
					d.show();

					},("Status"));
					frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Final Medical'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				}
				if(frm.doc.custom_medical_proof){
					frm.add_custom_button(__("Final Medical"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Final Medical Attachment',
					fields: [
						{
							label: 'Final Medical',
							fieldtype: 'Attach',
							fieldname: 'final_medical',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Biometric'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("final_medical",values.final_medical)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Biometric'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				}
				
			}
		}
		
		if(frm.doc.status=="Visa Stamping"){
			if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				frm.add_custom_button(__("Visa Stamping"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Visa Stamping Attachment',
					fields: [
						{
							label: 'Visa Stamping',
							fieldtype: 'Attach',
							fieldname: 'visa_stamping',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("visa_stamping",values.visa_stamping)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Kuwait"){
				frm.add_custom_button(__("Visa Stamping"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Visa Stamping Attachment',
					fields: [
						{
							label: 'Visa Stamping',
							fieldtype: 'Attach',
							fieldname: 'visa_stamping',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("visa_stamping",values.visa_stamping)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Dammam" || frm.doc.territory=="Jeddah" || frm.doc.territory=="Riyadh"){
				frm.add_custom_button(__("Visa Stamping"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Visa Stamping Attachment',
					fields: [
						{
							label: 'Visa Stamping',
							fieldtype: 'Attach',
							fieldname: 'visa_stamping',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("visa_stamping",values.visa_stamping)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Visa Stamping'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
		}
		if(frm.doc.status=="Emigration"){	
			if(frm.doc.territory=="Qatar"){
				frm.add_custom_button(__("Emigration"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Emigration Attachment',
					fields: [
						{
							label: 'ECR Status',
							fieldtype: 'Select',
							fieldname: 'ecr_status',
							options:'\nECR\nECNR',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						{
							label: 'Emigration Not Applicable',
							fieldtype: 'Check',
							fieldname: 'emigration_not_applicable',
						},
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("ecr_status",values.ecr_status)
					frm.set_value("emigration",values.emigration)
					frm.set_value("emigration_not_applicable",values.emigration_not_applicable)
					frm.set_value("candidate_feedback_form",values.candidate_feedback_form)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				frm.add_custom_button(__("Emigration"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Emigration Attachment',
					fields: [
						{
							label: 'ECR Status',
							fieldtype: 'Select',
							fieldname: 'ecr_status',
							options:'\nECR\nECNR',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("ecr_status",values.ecr_status)
					frm.set_value("emigration",values.emigration)
					frm.set_value("emigration_not_applicable",values.emigration_not_applicable)
					frm.set_value("candidate_feedback_form",values.candidate_feedback_form)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Dubai"){
				frm.add_custom_button(__("Emigration"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Emigration Attachment',
					fields: [
						{
							label: 'ECR Status',
							fieldtype: 'Select',
							fieldname: 'ecr_status',
							options:'\nECR\nECNR',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("ecr_status",values.ecr_status)
					frm.set_value("emigration",values.emigration)
					frm.set_value("emigration_not_applicable",values.emigration_not_applicable)
					frm.set_value("candidate_feedback_form",values.candidate_feedback_form)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Oman"){
				frm.add_custom_button(__("Emigration"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Emigration Attachment',
					fields: [
						{
							label: 'ECR Status',
							fieldtype: 'Select',
							fieldname: 'ecr_status',
							options:'\nECR\nECNR',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("ecr_status",values.ecr_status)
					frm.set_value("emigration",values.emigration)
					frm.set_value("emigration_not_applicable",values.emigration_not_applicable)
					frm.set_value("candidate_feedback_form",values.candidate_feedback_form)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Kuwait"){
				frm.add_custom_button(__("Emigration"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Emigration Attachment',
					fields: [
						{
							label: 'ECR Status',
							fieldtype: 'Select',
							fieldname: 'ecr_status',
							options:'\nECR\nECNR',
						},
						{
							label: 'Emigration',
							fieldtype: 'Attach',
							fieldname: 'emigration',
						},
						
						{
							label: 'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd:1
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("ecr_status",values.ecr_status)
					frm.set_value("emigration",values.emigration)
					frm.set_value("emigration_not_applicable",values.emigration_not_applicable)
					frm.set_value("candidate_feedback_form",values.candidate_feedback_form)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Emigration'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Dammam" || frm.doc.territory=="Jeddah" || frm.doc.territory=="Riyadh"){
				
			}
		}
		if(frm.doc.status=="Ticket"){
			if(frm.doc.territory=="Qatar"){
				frm.add_custom_button(__("Ticket"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Ticket Attachment',
					fields: [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd:1,
						},
						{
							label:'Candidate Feedback Form',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd:1,

						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("ticket",values.ticket)
					frm.set_value("candidate_feedback_form",values.candidate_feedback_form)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				frm.add_custom_button(__("Ticket"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Ticket Attachment',
					fields: [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("ticket",values.ticket)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Dubai"){
				frm.add_custom_button(__("Ticket"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Ticket Attachment',
					fields: [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("ticket",values.ticket)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Oman"){
				frm.add_custom_button(__("Ticket"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Ticket Attachment',
					fields: [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd:1,
						},
						{
							label: 'Candidate Feedback',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd:1,
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("ticket",values.ticket)
					frm.set_value("candidate_feedback_form",values.candidate_feedback_form)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Kuwait"){
				frm.add_custom_button(__("Ticket"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Ticket Attachment',
					fields: [
						{
							label: 'Ticket',
							fieldtype: 'Attach',
							fieldname: 'ticket',
							reqd:1,
						},
						{
							label: 'Candidate Feedback',
							fieldtype: 'Attach',
							fieldname: 'candidate_feedback_form',
							reqd:1,
						},

						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("ticket",values.ticket)
					frm.set_value("candidate_feedback_form",values.candidate_feedback_form)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Ticket'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
		}
		if(frm.doc.status=="Onboarding"){
			if(frm.doc.territory=="Qatar"){
				frm.add_custom_button(__("Onboarded"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Onboarded Attachment',
					fields: [
						{
							label: 'Onboarded',
							fieldtype: 'Check',
							fieldname: 'onboarded',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarded'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("status", "Onboarded")
					frm.set_value("onboarded",values.onboarded)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				frm.add_custom_button(__("Onboarded"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Onboarded Attachment',
					fields: [
						{
							label: 'Onboarded',
							fieldtype: 'Check',
							fieldname: 'onboarded',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarded'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("status", "Onboarded")
					frm.set_value("onboarded",values.onboarded)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Dubai"){
				frm.add_custom_button(__("Onboarded"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Onboarded Attachment',
					fields: [
						{
							label: 'Onboarded',
							fieldtype: 'Check',
							fieldname: 'onboarded',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarded'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("status", "Onboarded")
					frm.set_value("onboarded",values.onboarded)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Oman"){
				frm.add_custom_button(__("Onboarded"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Onboarded Attachment',
					fields: [
						{
							label: 'Onboarded',
							fieldtype: 'Check',
							fieldname: 'onboarded',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarded'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("status", "Onboarded")
					frm.set_value("onboarded",values.onboarded)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Kuwait"){
				frm.add_custom_button(__("Onboarded"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Onboarded Attachment',
					fields: [
						{
							label: 'Onboarded',
							fieldtype: 'Check',
							fieldname: 'onboarded',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarded'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("status", "Onboarded")
					frm.set_value("onboarded",values.onboarded)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
				frm.add_custom_button(__("Update Remarks"), function () {

				let d = new frappe.ui.Dialog({
					title: 'Next Action',
					fields: [
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Onboarding'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
		}
		if(frm.doc.status=="Onboarded"){
			if(frm.doc.territory=="Qatar"){
				frm.add_custom_button(__("Arrived"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Arrived Attachment',
					fields: [
						{
							label: 'Emergency Contact Number in India',
							fieldtype: 'Data',
							fieldname: 'custom__emergency_contact_number_in_india',
							reqd:1,
						},
						{
							label: 'Candidate Google Review',
							fieldtype: 'Data',
							fieldname: 'candidate_google_review',
							reqd:1,
						},
						{
							label: 'Local Mobile Number',
							fieldtype: 'Phone',
							fieldname: 'custom_local_mobile_number',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Arrived'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("custom__emergency_contact_number_in_india",values.custom__emergency_contact_number_in_india)
					frm.set_value("candidate_google_review",values.candidate_google_review)
					frm.set_value("custom_local_mobile_number",values.custom_local_mobile_number)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Abudhabi"){
				frm.add_custom_button(__("Arrived"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Arrived Attachment',
					fields: [
						{
							label: 'Emergency Contact Number in India',
							fieldtype: 'Data',
							fieldname: 'custom__emergency_contact_number_in_india',
							reqd:1,
						},
						{
							label: 'Candidate Google Review',
							fieldtype: 'Data',
							fieldname: 'candidate_google_review',
							reqd:1,
						},
						{
							label: 'Local Mobile Number',
							fieldtype: 'Phone',
							fieldname: 'custom_local_mobile_number',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Arrived'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("custom__emergency_contact_number_in_india",values.custom__emergency_contact_number_in_india)
					frm.set_value("candidate_google_review",values.candidate_google_review)
					frm.set_value("custom_local_mobile_number",values.custom_local_mobile_number)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="UAE" && frm.doc.visa_state=="Dubai"){
				frm.add_custom_button(__("Arrived"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Arrived Attachment',
					fields: [
						{
							label: 'Emergency Contact Number in India',
							fieldtype: 'Data',
							fieldname: 'custom__emergency_contact_number_in_india',
							reqd:1,
						},
						{
							label: 'Candidate Google Review',
							fieldtype: 'Data',
							fieldname: 'candidate_google_review',
							reqd:1,
						},
						{
							label: 'Local Mobile Number',
							fieldtype: 'Phone',
							fieldname: 'custom_local_mobile_number',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Arrived'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("custom__emergency_contact_number_in_india",values.custom__emergency_contact_number_in_india)
					frm.set_value("candidate_google_review",values.candidate_google_review)
					frm.set_value("custom_local_mobile_number",values.custom_local_mobile_number)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Oman"){
				frm.add_custom_button(__("Arrived"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Arrived Attachment',
					fields: [
						{
							label: 'Emergency Contact Number in India',
							fieldtype: 'Data',
							fieldname: 'custom__emergency_contact_number_in_india',
							reqd:1,
						},
						
						{
							label: 'Local Mobile Number',
							fieldtype: 'Phone',
							fieldname: 'custom_local_mobile_number',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Arrived'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("custom__emergency_contact_number_in_india",values.custom__emergency_contact_number_in_india)
					frm.set_value("candidate_google_review",values.candidate_google_review)
					frm.set_value("custom_local_mobile_number",values.custom_local_mobile_number)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
			else if(frm.doc.territory=="Kuwait"){
				frm.add_custom_button(__("Arrived"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Arrived Attachment',
					fields: [
						{
							label: 'Emergency Contact Number in India',
							fieldtype: 'Data',
							fieldname: 'custom__emergency_contact_number_in_india',
							reqd:1,
						},
						{
							label: 'Candidate Google Review',
							fieldtype: 'Data',
							fieldname: 'candidate_google_review',
							reqd:1,
						},
						{
							label: 'Local Mobile Number',
							fieldtype: 'Phone',
							fieldname: 'custom_local_mobile_number',
							reqd:1,
						},
						{
							label: 'Next Action',
							fieldtype: 'Link',
							fieldname: 'standard_remarks',
							options:"Standard Remarks",
							reqd:1,
							get_query: () => {
								return {
									filters: {
										status: 'Arrived'
									}
								};
							}
						}

					],
					primary_action_label: 'Yes',
					primary_action() {
					let values = d.get_values();
					frm.set_value("custom__emergency_contact_number_in_india",values.custom__emergency_contact_number_in_india)
					frm.set_value("candidate_google_review",values.candidate_google_review)
					frm.set_value("custom_local_mobile_number",values.custom_local_mobile_number)
					frm.set_value("standard_remarks",values.standard_remarks)
						frm.save();
						d.hide();
					},
					secondary_action_label: 'No',
					secondary_action() {
						d.hide();
					}
				});
				d.show();

        		},("Status"));
			}
		}
		if(frm.doc.custom__emergency_contact_number_in_india && frm.doc.candidate_google_review && frm.doc.custom_local_mobile_number){
		}
		frappe.call({
			method: "jobpro.jobpro.doctype.closure.closure.get_status",
			args: {
				"status":frm.doc.status || '',
				"so_created":frm.doc.so_created || '',
				"visa_status":frm.doc.visa_status || '',
				"offer_letter":frm.doc.offer_letter || '',
				"sol":frm.doc.sol || '',
				"final_medical":frm.doc.final_medical || '',
				"pcc":frm.doc.pcc || '',
				"pcc_not":frm.doc.pcc_not_applicable || '',
				"visa_stamping":frm.doc.visa_stamping || ''
			},
			callback: function (d) {
				if (d.message) {
				    console.log(d.message)
				    frm.get_field("html_2").$wrapper.html(d.message);
				}
			},
		})
		if (!frm.doc.so_created) {
			// if (frm.doc.status == "Visa)
			frm.set_intro(__("<h6 style ='color:red'><b>Alert:</b>Further process is Freezed as Sales Order Submmision is Pending.Please submit <b>Sales Order</b> immediately</h6>"))
		}
		
		if (frm.doc.so_created) {
			if(frm.doc.status == 'Onboarding'){
				if (!frappe.user.has_role("Customer User")) { 
				frm.add_custom_button(__("Onboard"),
			
				function () {
					if(frm.doc.payment=="Candidate" ){
						    if (frm.doc.outstanding_amount > 0 ){
								// frm.set_value("ticket","")
								frappe.throw("Candidate Outstanding amount should be zero")
								frappe.validated = false;
								
						}
						}
					frm.set_value("status", "Onboarded")
					frm.set_value("onboarded",1)
					frm.save()
				}
			).addClass('btn btn-success');
		}
			}
			
		}
		if (frm.doc.status != 'Dropped'){
			if (frappe.user.has_role("HOD")){
			frm.add_custom_button(__("Drop"),
			function () {
				
				let d = new frappe.ui.Dialog({
					title: "Dropped Reason",
					fields :[
						{
						label: 'Reason',
						fieldname: 'reason',
						fieldtype: 'Data'
					},
					{
						label: 'Drop Approved By',
						fieldname: 'drop_approved_by',
						fieldtype: 'Link',
						options:'User'
					}
				],
					primary_action_label: 'Submit',
					primary_action(values) {
						frm.set_value("drop_reason",values.reason)
						frm.set_value("drop_approved_by",values.drop_approved_by)
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
		
		if (frm.doc.status == "Dropped"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(__("Re-Open"),
			function () {
				frm.set_value("status", "PSL")
				frm.save()
			}
		).addClass('btn btn-primary');
	}
		}
		
		
		// frm.toggle_display("part_payment_collection", frm.doc.so_created == 1)
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
			// if (frm.doc.status == "PSL"){
			// frappe.call({
			// 			method: 'jobpro.custom.on_creation_of_psl_mail',
			// 			args:{
			// 				name:frm.doc.name,
			// 				status:frm.doc.status,
			// 				customer_name:frm.doc.customer
			// 			},
			// 			callback: function(r) {
		
			// 			}
			// 		});
			// 	}
			if (frm.doc.status != "PSL") {
				// if (frm.doc.mobile && frm.doc.candidate_owner && frm.doc.posting_date && frm.doc.payment &&
				// 	 frm.doc.expected_doj && frm.doc.customer && frm.doc.project && frm.doc.territory && frm.doc.task && frm.doc.date_of_birth && frm.doc.irf
				// 	  ) {
				// if( frm.doc.ob_custodian && frm.doc.passport_no &&  frm.doc.offer_letter && frm.doc.sol && frm.doc.photo
				// 	frm.doc.ecr_status && frm.doc.passport && frm.doc.place_of_issue && frm.doc.issued_date && frm.doc.expiry_date ){

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
										delivery_manager: cur_frm.doc.candidate_owner ||'',
										task: cur_frm.doc.task,
										candidate_name: cur_frm.doc.given_name,
										contact: cur_frm.doc.mobile,
										payment: cur_frm.doc.payment,
										billing_currency: cur_frm.doc.billing_currency,
										client_sc: cur_frm.doc.client_sc || '',
										// candidate_dec: cur_frm.doc.candidate_dec,
										candidate_sc: cur_frm.doc.candidate_sc || '',
										territory: cur_frm.doc.territory,
										passport_no: cur_frm.doc.passport_no || '',
										candidate_owner: cur_frm.doc.candidate_owner||'' ,
										sa_id: cur_frm.doc.sa_id ||'',
										passport_number : cur_frm.doc.passport_no ,
										expected_doj: cur_frm.doc.expected_doj ||'',
										project: cur_frm.doc.project,
										// sa_id: cur_frm.doc.supplier
										supplier: cur_frm.doc.sa_id ||'',
										service:cur_frm.doc.service,
										// dec:cur_frm.doc.candidate_dec ||cur_frm.doc.client_dec,
										sc:cur_frm.doc.candidate_sc || cur_frm.doc.client_sc,
										client_si:cur_frm.doc.client_si,
										candidate_si:cur_frm.doc.candidate_si,

										associate: cur_frm.doc.associate || '',
										associate_sc: cur_frm.doc.associate_si || '',
										associate_si:cur_frm.doc.associate_si,


									
										// currency:cur_frm.doc.currency
									},
									callback: function (r) {
										frappe.msgprint(r.message);
										console.log(r.message)
										console.log("hello")
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
		
		// if (frm.doc.territory == "Qatar") {
		// 	if (frm.doc.sol) {
		// 		cur_frm.set_df_property("pcc_section", "hidden", 0);
		// 		cur_frm.set_df_property("premedical_section", "hidden", 0);


		// 	}
			
		// 	if (frm.doc.certificate_attestation) {
		// 		cur_frm.set_df_property("visa_section", "hidden", 0);
		// 	}
			
		// 	if (frm.doc.ecr_status == "ECR"){
		// 		cur_frm.set_df_property("section_break_79", "hidden", 0);
		// 	}
		// 	if(frm.doc.ecr_status == "ECNR" && !frm.doc.territory=='Iraq'){
		// 		cur_frm.set_df_property("section_break_79", "hidden", 0);
		// 	}
		// 	if (frm.doc.emigration || frm.doc.emigration_not_applicable) {
		// 		cur_frm.set_df_property("ticket_section", "hidden", 0);
		// 		}
			
		// }
		// if (frm.doc.territory == "UAE" && frm.doc.visa_state == "Abudhabi") {
		// 	if (frm.doc.sol) {
		// 		cur_frm.set_df_property("pcc_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.pcc || frm.doc.pcc_not_applicable) {
		// 		cur_frm.set_df_property("visa_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.certificate_attestation) {
		// 		cur_frm.set_df_property("visa_section", "hidden", 0);
		// 	}
		// 	if (!frm.doc.certificate_attestation) {
		// 		cur_frm.set_df_property("visa_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.visa && frm.doc.so_created) {
		// 		cur_frm.set_df_property("final_medical_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.final_medical) {
		// 		cur_frm.set_df_property("visa_stamping_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.visa_stamping && frm.doc.ecr_status == "ECR") {
		// 		cur_frm.set_df_property("section_break_79", "hidden", 0);
		// 	}
		// 	if (frm.doc.emigration || frm.doc.ecr_status == 'ECNR') {
		// 		cur_frm.set_df_property("ticket_section", "hidden", 0);
		// 	}
		// }
		// if (frm.doc.territory == "UAE" && frm.doc.visa_state == "Dubai") {
		// 	if (frm.doc.sol) {
		// 		cur_frm.set_df_property("pcc_section", "hidden", 0);
		// 	}
		// 	if(frm.doc.pcc || frm.doc.pcc_not_applicable){
		// 		cur_frm.set_df_property("final_medical_section","hidden",0)
		// 	}
		// 	if (frm.doc.final_medical) {
		// 		cur_frm.set_df_property("visa_section", "hidden", 0);
		// 		cur_frm.set_df_property("section_break_79", "hidden", 0)
		// 	}
			
		// 	if (frm.doc.visa || frm.doc.so_created) {
		// 		cur_frm.set_df_property("ticket_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.emigration || frm.doc.ecr_status == 'ECNR') {
		// 		cur_frm.set_df_property("ticket_section", "hidden", 0);
		// 	}
			
		// }
		// if (frm.doc.territory == "Oman") {
		// 	if (frm.doc.sol) {
		// 		cur_frm.set_df_property("pcc_section", "hidden", 0);

		// 	}
		// 	if (frm.doc.pcc || frm.doc.pcc_not_applicable){
		// 		cur_frm.set_df_property("final_medical_section","hidden",0)
		// 	}
			
		// 	if (frm.doc.certificate_attestation) {
		// 		cur_frm.set_df_property("visa_section", "hidden", 0);
		// 	}
		// 	if(frm.doc.visa && frm.doc.so_created){
		// 		cur_frm.set_df_property("section_break_79", "hidden", 0);

		// 	}
			
		// 	if (frm.doc.emigration || frm.doc.ecr_status == 'ECNR'|| frm.doc.emigration_not_applicable) {
		// 		cur_frm.set_df_property("ticket_section", "hidden", 0);
		// 	}
		// }
		// if (frm.doc.territory == "Kuwait") {
		// 	 if (frm.doc.sol) {
		// 	 	cur_frm.set_df_property("premedical_section", "hidden", 0);
		// 	 } 
			
		// 	if (frm.doc.pcc || frm.doc.pcc_not_applicable) {
		// 		cur_frm.set_df_property("certificate_attestation_section", "hidden", 0);
		// 		cur_frm.set_df_property("premedical_section", "hidden", 0);

		// 	}
			
		// 	if (frm.doc.certificate_attestation) {
		// 		cur_frm.set_df_property("visa_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.visa && frm.doc.so_created == 1) {
		// 		cur_frm.set_df_property("final_medical_section", "hidden", 0);
				
		// 	}
		// 	if (frm.doc.final_medical) {
		// 		cur_frm.set_df_property("visa_stamping_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.visa_stamping && frm.doc.ecr_status == "ECR") {
		// 		cur_frm.set_df_property("section_break_79", "hidden", 0);
		// 	}
		// 	if (frm.doc.emigration || frm.doc.ecr_status == 'ECNR' || frm.doc.emigration_not_applicable) {
		// 		cur_frm.set_df_property("ticket_section", "hidden", 0);
		// 	}
		// }
		// if (frm.doc.territory =='KSA' || frm.doc.territory =='Jeddah' || frm.doc.territory =='Riyadh' || frm.doc.territory == 'Dammam') {
		// 	console.log("h")
		// 	if (frm.doc.sol) {
		// 		cur_frm.set_df_property("certificate_attestation_section", "hidden", 0);
		// 	}
			
		// 	if (frm.doc.certificate_attestation) {
		// 		cur_frm.set_df_property("visa_section", "hidden", 0);
		// 	}
		// 	if (!frm.doc.certificate_attestation) {
		// 		cur_frm.set_df_property("visa_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.visa) {
		// 		cur_frm.set_df_property("final_medical_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.final_medical) {
		// 		cur_frm.set_df_property("visa_stamping_section", "hidden", 0);
		// 	}
		// 	if (frm.doc.visa_stamping && frm.doc.ecr_status == "ECR") {
		// 		cur_frm.set_df_property("section_break_79", "hidden", 0);
		// 	}
		// 	if (frm.doc.emigration || frm.doc.ecr_status == 'ECNR' || frm.doc.emigration_not_applicable ){
		// 		cur_frm.set_df_property("ticket_section", "hidden", 0);
		// 	}
		// }
		// if (frm.doc.territory == "Bahrain") {
		// 	if (frm.doc.sol) {
		// 		cur_frm.set_df_property("final_medical_section", "hidden", 0);

		// 	}
			
		// 	if (frm.doc.final_medical){
		// 		cur_frm.set_df_property("visa_section", "hidden", 0);

		// 	}
		// 	if (frm.doc.visa && frm.doc.so_created) {
		// 		cur_frm.set_df_property("section_break_79", "hidden", 0);
		// 	}
			
			
		// 	if (frm.doc.emigration || frm.doc.ecr_status == 'ECNR' || frm.doc.emigration_not_applicable) {
		// 		cur_frm.set_df_property("ticket_section", "hidden", 0);
		// 	}
		// }

	},
	status(frm){
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
	issued_date: function(frm) {
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

            if(frm.doc.expected_doj){
            frm.set_value('expiry_period', `${diffYears} years, ${diffMonths} months`);
			}else{
				frm.set_value('expiry_period', `0 years, 0 months`);
			}
        }
    },
	custom_update_passport_details: function(frm) {
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
            callback: function(r) {
                if (!r.exc) {
                    frm.reload_doc();
					frm.set_df_property("passport_number", "read_only", 0);
                	frm.refresh_field("passport_number");
                }
            }
        });
    },
	date_of_birth: function(frm) {
        if (frm.doc.date_of_birth) {
            const dob = new Date(frm.doc.date_of_birth);
            const today = new Date();

            let years = today.getFullYear() - dob.getFullYear();
            let months = today.getMonth() - dob.getMonth();

            // Adjust if current month is before birth month
            if (months < 0) {
                years--;
                months += 12;
            }

            frm.set_value('custom_age', `${years} years ${months} months`);
        } else {
            frm.set_value('custom_age', '');
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
	custom_trade_test_not_applicable(frm){
		if(frm.doc.custom_trade_test_not_applicable==1){
			frm.set_value("custom_closure_status","Not Applicable")
		}
		else{
			frm.set_value("custom_closure_status","Initiated")
		}
	},
	validate(frm) {
		if(frm.doc.so_confirmed_date){
			frm.set_value("so_created",1)
		}
		if(frm.doc.custom__emergency_contact_number_in_india && frm.doc.candidate_google_review && frm.doc.custom_local_mobile_number){
			frm.set_value("status","Arrived")
		}
		
			if(frm.doc.territory == 'UAE'){
			frm.set_df_property('visa_state','reqd',1)
		}
		if(frm.doc.visa){
	        frm.set_value('visa_status','Visa Received')
	    }
	    else{
	        frm.set_value('visa_status','Visa Pending')
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


// function set_section_visibility(frm) {
//     frappe.after_ajax(() => {
//         const status_to_tab_label = {
//             "PSL": "PSL Attachments",
//             "Client Offer Letter": "Selection and Client Offer",
//             "Signed Offer Letter": "Signed Offer",
//             "PCC": "PCC",
//             "Visa": "Visa",
//             "Emigration": "Emigration",
//             "Ticket": "Ticket",
//             "Arrived": "Conclusion"
//         };

//         const ordered_statuses = [
//             "PSL",
//             "Client Offer Letter",
//             "Signed Offer Letter",
//             "PCC",
//             "Visa",
//             "Emigration",
//             "Ticket",
//             "Arrived"
//         ];

//         const current_status = frm.doc.status || null;
//         const current_index = ordered_statuses.indexOf(current_status);
//         const visible_statuses = new Set(ordered_statuses.slice(0, current_index + 1));

//         Object.entries(status_to_tab_label).forEach(([status, label]) => {
//             const should_show = visible_statuses.has(status);

//             // Select tab header and tab content
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
//     });
// }

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
			"Final Medical":"Final Medical",
			"Visa Stamping":"Visa Stamping",
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
			"Final Medical":"Final Medical",
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
			"Final Medical":"Final Medical",
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
			"Premedical":"Pre-Medical",
			"PCC": "PCC",
            "Visa": "Visa",
			"Final Medical":"Final Medical",
			"Visa Stamping":"Visa Stamping",
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
			"Final Medical":"Final Medical",
			"Biometric":"Biometric",
			"Trade Test":"Trade Test",
			"Visa Stamping":"Visa Stamping",
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
			"Final Medical":"Final Medical",
			"Biometric":"Biometric",
			"Visa Stamping":"Visa Stamping",
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
			"Final Medical":"Final Medical",
			"Biometric":"Biometric",
			"Visa Stamping":"Visa Stamping",
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
			"Final Medical":"Final Medical",
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
    pin_code: function(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);  // Get the child table row

        if (!row.pin_code) return;

        $.ajax({
            url: "https://api.postalpincode.in/pincode/" + row.pin_code,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data && data.length > 0 && data[0]['PostOffice'] && data[0]['PostOffice'].length > 0) {
                    frappe.model.set_value(cdt, cdn, 'district', data[0]['PostOffice'][0]['District']);
                    frappe.model.set_value(cdt, cdn, 'state', data[0]['PostOffice'][0]['State']);
                }
            }
        });
    }
});
