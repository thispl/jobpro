// Copyright (c) 2020, teamPRO and contributors
// For license information, please see license.txt

let calculate_age = function (birth) {
	let ageMS = Date.parse(Date()) - Date.parse(birth);
	let age = new Date();
	age.setTime(ageMS);
	let years = age.getFullYear() - 1970;
	return years
};

frappe.ui.form.on('Candidate', {
	setup:function(frm){
		frm.set_query("task", function () {
			return {
				"filters": {
					"project": frm.doc.project
				}
			};
		});
	},
	// task(frm){
	// 	if(frm.doc.task){
	// 		frappe.call({
	// 			method:"jobpro.jobpro.doctype.candidate.candidate.update_criteria_table",
	// 			args:{
	// 				task_id:frm.doc.task,
	// 				name:frm.doc.name
	// 			},
	// 		})
	// 	}
		
	// },
	pending_for(frm){
		if(frm.doc.pending_for == "Pending QC") {
			frm.set_value('submitted_date',frappe.datetime.now_date())
			frm.save()
		}
	},

	custom_candidate_si(frm){
		if(frm.doc.custom_billing_currency!="INR"){
		frappe.call({
                    method: "frappe.client.get_list",
                    args: {
                        doctype: "Currency Exchange",
                        filters: {
                            from_currency: frm.doc.custom_billing_currency,
                            to_currency: "INR"
                        },
                        fields: ["exchange_rate", "date"],
                        order_by: "date desc",
                        limit_page_length: 1
                    },
                    callback: function (r) {
                        if (r.message && r.message.length > 0) {
                            const rate = r.message[0].exchange_rate;
                            frm.set_value("custom_candidate_payment_company_currency",(frm.doc.custom_candidate_si * rate))
                        } else {
							frm.set_value("custom_candidate_payment_company_currency",0.00)
                        }
                    }
                });
		}
		else{
			frm.set_value("custom_candidate_payment_company_currency",frm.doc.custom_candidate_si)
		}
	},
	custom_billing_currency(frm){
		frm.set_df_property("custom_candidate_si", "label", "Candidate SI (" + frm.doc.custom_billing_currency + ")");
		if(frm.doc.custom_billing_currency!="INR"){
		frappe.call({
                    method: "frappe.client.get_list",
                    args: {
                        doctype: "Currency Exchange",
                        filters: {
                            from_currency: frm.doc.custom_billing_currency,
                            to_currency: "INR"
                        },
                        fields: ["exchange_rate", "date"],
                        order_by: "date desc",
                        limit_page_length: 1
                    },
                    callback: function (r) {
                        if (r.message && r.message.length > 0) {
                            const rate = r.message[0].exchange_rate;
                            frm.set_value("custom_candidate_payment_company_currency",(frm.doc.custom_candidate_si * rate))
                        } else {
							frm.set_value("custom_candidate_payment_company_currency",0.00)
                        }
                    }
                });
		}
		else{
			frm.set_value("custom_candidate_payment_company_currency",frm.doc.custom_candidate_si)
		}
	},
	custom_client_si(frm){
		if(frm.doc.custom_client_billing_currency!="INR"){
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
                            frm.set_value("custom_client_payment_company_currency",(frm.doc.custom_client_si * rate))
                        } else {
							frm.set_value("custom_client_payment_company_currency",0.00)
                        }
                    }
                });
		}
		else{
			frm.set_value("custom_client_payment_company_currency",frm.doc.custom_client_si)
		}
	},
	custom_client_billing_currency(frm){
		frm.set_df_property("custom_client_si", "label", "Client SI (" + frm.doc.custom_client_billing_currency + ")");
		if(frm.doc.custom_client_billing_currency!="INR"){
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
                            frm.set_value("custom_client_payment_company_currency",(frm.doc.custom_client_si * rate))
                        } else {
							frm.set_value("custom_client_payment_company_currency",0.00)
                        }
                    }
                });
		}
		else{
			frm.set_value("custom_client_payment_company_currency",frm.doc.custom_client_si)
		}
	},
	custom_associate_si(frm){
		if(frm.doc.custom_associate_paymentinr!="INR"){
		frappe.call({
                    method: "frappe.client.get_list",
                    args: {
                        doctype: "Currency Exchange",
                        filters: {
                            from_currency: frm.doc.custom_associate_paymentinr,
                            to_currency: "INR"
                        },
                        fields: ["exchange_rate", "date"],
                        order_by: "date desc",
                        limit_page_length: 1
                    },
                    callback: function (r) {
                        if (r.message && r.message.length > 0) {
                            const rate = r.message[0].exchange_rate;
                            frm.set_value("custom_associate_payment",(frm.doc.custom_associate_si * rate))
                        } else {
							frm.set_value("custom_associate_payment",0.00)
                        }
                    }
                });
		}
		else{
			frm.set_value("custom_associate_payment",frm.doc.custom_associate_si)
		}
	},
	custom_associate_paymentinr(frm){
		frm.set_df_property("custom_associate_si", "label", "Associate SI (" + frm.doc.custom_associate_paymentinr + ")");
		if(frm.doc.custom_associate_paymentinr!="INR"){
		frappe.call({
                    method: "frappe.client.get_list",
                    args: {
                        doctype: "Currency Exchange",
                        filters: {
                            from_currency: frm.doc.custom_associate_paymentinr,
                            to_currency: "INR"
                        },
                        fields: ["exchange_rate", "date"],
                        order_by: "date desc",
                        limit_page_length: 1
                    },
                    callback: function (r) {
                        if (r.message && r.message.length > 0) {
                            const rate = r.message[0].exchange_rate;
                            frm.set_value("custom_associate_payment",(frm.doc.custom_associate_si * rate))
                        } else {
							frm.set_value("custom_associate_payment",0.00)
                        }
                    }
                });
		}
		else{
			frm.set_value("custom_associate_payment",frm.doc.custom_associate_si)
		}
	},
	passport_number(frm){
	frappe.call({
		method:"jobpro.custom.validate_passport",
		args:{
			passport:frm.doc.passport_number,
			// given_name:frm.doc.given_name,
			// name:frm.doc.name
		},
	})
	},
	validate:function(frm){
		if(frm.doc.mobile_number){
			frm.set_value('mobile',frm.doc.mobile_number)
		}
		if(frm.doc.pending_for == "Proposed PSL") {
			frm.set_df_property("customer", "reqd", 1);
			frm.set_df_property("project", "reqd", 1);
			frm.set_df_property("territory", "reqd", 1);
			frm.set_df_property("interview_date", "reqd", 1);
			frm.set_df_property("expected_doj", "reqd", 1);
			frm.set_df_property("task", "reqd", 1);
			frappe.db.get_value('Territory',frm.doc.territory, 'parent_territory', (r) => {
				if (r && r.parent_territory == 'India') {
					frm.set_df_property("passport_number", "reqd", 0);
				}
				else{
					frm.set_df_property("passport_number", "reqd", 1);
				}
			});
		
		}
		else{
			frm.set_df_property("customer", "reqd", 0);
			frm.set_df_property("project", "reqd", 0);
			frm.set_df_property("territory", "reqd", 0);
			frm.set_df_property("task", "reqd", 0);
			frm.set_df_property("passport_number", "reqd", 0);
			frm.set_df_property("expected_doj", "reqd", 0);
			frm.set_df_property("interview_date", "reqd", 0);
		}
	var highest_qualification = 0;
	var latest_work_experience = 0;
	var currently_working = 0;
	$.each(frm.doc.table_28,function(i,d){
		highest_qualification += d.highest_qualification;
	})
	if(highest_qualification > 1){
		frappe.msgprint(__("Only one highest qualification has to be selected"));
		frappe.validated = false;
	}

	$.each(frm.doc.experience_details,function(i,d){
		if(d.from_date > d.to_date){
			frappe.msgprint(__("From Date cannot be Higher than To Date"));
			frappe.validated = false;
		}
		latest_work_experience += d.latest_work_experience;
	})
	if(latest_work_experience > 1){
		frappe.msgprint(__("Only latest experience has to be selected"));
		frappe.validated = false;
	}

	$.each(frm.doc.experience_details,function(i,d){
		currently_working += d.currently_working;
	})
	if(currently_working > 1){
		frappe.msgprint(__("Only one currently working has to be selected"));
		frappe.validated = false;
	}
	$.each(frm.doc.driving_licence,function(i,d){
		if(d.doi > frappe.datetime.get_today()){
			frappe.msgprint(__("DoI cannot be a Future Date"));
			frappe.validated = false;
		}
		latest_work_experience += d.latest_work_experience;
		if(d.doi > d.doe){
			frappe.msgprint(__("DOE cannot be before DOI"));
			frappe.validated = false;
		}
	})
	var len = frm.doc.mobile_number
	if(frm.doc.mobile_number){
		var regex = /[^0-9]/g;
		if (regex.test(frm.doc.mobile_number) === true){
			frappe.msgprint(__("Mobile No.: Only Numbers are allowed."));
			frappe.validated = false;
		}
	// if(len.length < 10 || len.length > 10){
	// 	frappe.throw("Mobile Number must be 10 digits")
	// 	frappe.validated = false;
	// }
}
	
	if (frm.doc.passport_number){
		var regex = /[^0-9A-Za-z]/g;
	if (regex.test(frm.doc.passport_number) === true){
		frappe.msgprint(__("Passport No.: Only letters and numbers are allowed."));
		frappe.validated = false;
	}
		var len = frm.doc.passport_number
		if(len.length > 9 || len.length <8){
			frappe.throw("Passport Number must be 8 digits")
			frappe.validated = false;
		}

	}




	if(frm.doc.pending_for=="Interviewed"){
		frm.add_child('custom_interview_history', {
			'client_name': frm.doc.customer,
			'p_project': frm.doc.project,
			't_task': frm.doc.task,
			'i_interview_location': frm.doc.interview_location,
			'd_date':frappe.datetime.now_datetime()
		})
	}
// 	if(frm.doc.pending_for=="Interviewed"){
// 	if (frappe.user.has_role != "HOD"){
// 		frappe.call({
// 			method: 'jobpro.custom.check_candidate_for_sourced',
// 			args: {
// 				candidate_id: frm.doc.name
// 			},
// 			callback: function(r) {
// 				if (r.message == "ok") {
// 				// 	frappe.msgprint(r.message.message);
// 					frappe.validated = false;
// 				}
// 			}
// 		});
// 	}
// }
	
	},
	
	pincode: function(frm) {
		$.ajax({
			url: "https://api.postalpincode.in/pincode/"+frm.doc.pincode,
			type: 'GET',
			dataType: 'json',
			success: function (data, textStatus, xhr) {
				cur_frm.set_value("temp_location__district", data[0]['PostOffice'][0]['District'])
				cur_frm.set_value("temp_state", data[0]['PostOffice'][0]['State'])
				cur_frm.refresh_fields();
			}
		});
	},
	issued_date: function(frm){
		// var me = new Date(frm.doc.issued_date);
        // var expiry_date = new Date(me.getFullYear() + 10, me.getMonth(), me.getDate() - 1)
		// frm.set_value("expiry_date", expiry_date)
		// if(frm.doc.issued_date > frappe.datetime.nowdate()){
		// 	frappe.throw("Date of Issue Can't be Future Date")
		// }
		if (frm.doc.issued_date) {
            // Calculate expiry date (10 years after issued date)
            let issued = new Date(frm.doc.issued_date);
            let expiry = new Date(issued);
            expiry.setFullYear(expiry.getFullYear() + 10);
			expiry.setDate(expiry.getDate() - 1)
            frm.set_value('expiry_date', expiry.toISOString().split('T')[0]);

            // Calculate difference between today and expiry date
            let today = new Date(frm.doc.interviewed_date);
            let diffYears = expiry.getFullYear() - today.getFullYear();
            let diffMonths = expiry.getMonth() - today.getMonth();

            if (diffMonths < 0) {
                diffYears -= 1;
                diffMonths += 12;
            }

            if (frm.doc.interviewed_date){
            frm.set_value('expiry_period', `${diffYears} years, ${diffMonths} months`);
			}else{
				frm.set_value('expiry_period', `0 years, 0 months`);
			}
        }
	},
	
	dob: function(frm){
		if(frm.doc.dob > frappe.datetime.nowdate()){
			frappe.throw("Date of Birth Can't be Future Date")
		}
		var age = calculate_age(frm.doc.dob)
		if (age < 18) {
			frm.set_value('dob','')
			frappe.msgprint({
				title: __('Notification'),
				indicator: 'red',
				message: __("Age cannot be lesser than 18")
			});
			
		}
	},
	
	expected_doj: function(frm){
		if(frm.doc.expected_doj < frappe.datetime.nowdate()){
			frappe.throw("Expected DOJ Can't be Past Date")
		}
	},
	sa_agent(frm){
		frappe.call({
			method:"jobpro.jobpro.doctype.candidate.candidate.update_sa_details_task",
			args:{
				"task":frm.doc.task,
				"sa_agent":frm.doc.sa_agent
			},
			callback(){
				
			}
		})
	},
	alternate_contact: function(frm){
		var regex = /[^0-9]/g;
		if (regex.test(frm.doc.alternate_contact) === true){
			frappe.msgprint(__("Alternate Contact No.: Only Numbers are allowed."));
			frappe.validated = false;
		}
	},
	imo_number: function(frm){
		var regex = /[^0-9]/g;
		if (regex.test(frm.doc.imo_number) === true){
			frappe.msgprint(__("IMO No.: Only Numbers are allowed."));
			frappe.validated = false;
		}
	},
	// custom_linedup_confirmed_attachement:function(frm){
	// 	if(!frm.doc.custom_linedup_confirmed_attachement){
	// 		frm.set_value("pending_for","Linedup")
	// 	}
	// 	else{
	// 	frm.set_value("pending_for","Linedup Confirmed")
	// 	}
	// },


	
	onload:function(frm){
		if (frm.doc.pending_for !== "IDB" && frm.doc.pending_for !== "Sourced" && !frm.doc.whatsapp_number) {
    frm.set_value("whatsapp_number", "+91-");
}
		// frm.set_value('mobile',frm.doc.mobile_number)
		if(frm.doc.__islocal){
			frm.set_value("custom_sourced_by","Normal")
		}
		
		// if(frm.doc.mobile_number && frm.doc.custom_has_whatsapp==1){
		// 	frm.set_value('whatsapp_number',frm.doc.mobile_number)
		// }
	},

	refresh:function(frm) {
		frm.set_query('specialization', function () {
            return {
                query: 'jobpro.jobpro.doctype.candidate.candidate.get_specialization',
                filters: {
                    degree: frm.doc.highest_degree || ''
                }
            };
        });
		if (frm.doc.pending_for !== "IDB" && frm.doc.pending_for !== "Sourced" && !frm.doc.whatsapp_number) {
    frm.set_value("whatsapp_number", "+91-");
}

		if (!$("link[href*='fontawesome']").length) {
    $("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">');
}

frm.$wrapper.find('.candidate-status-flow').remove();

const container = $(`
    <div class="candidate-status-flow" style="
        width:100%; 
        padding:10px 0; 
        display:flex; 
        flex-wrap:nowrap;      
        justify-content:center; 
        gap:13px;               
        overflow-x:auto;   
		flex-shrink: 0;    
    ">
    </div>
`);

if(frm.doc.ecr_status && frm.doc.ecr_status === "ECR") {
    container.css({
        border: "3px solid #ff9800",
        borderRadius: "8px",
		
		
    });
} else {
    container.css({ border: "none" });
}

const statuses = ["IDB","Sourced","Pending QC","Submit(SPOC)","Submitted(Client)","Shortlisted","Linedup","Linedup Confirmed","Reported","Interviewed","Result Pending","Proposed PSL"];
const icons = {
    "IDB":"fas fa-database",
    "Sourced":"fas fa-search",
    "Pending QC":"fas fa-hourglass-half",
	// "QC Completed": "fas fa-check-double",
    "Submit(SPOC)": "fas fa-paper-plane",
    "Submitted(Client)":"fas fa-user-tie",
    "Shortlisted":"fas fa-list-check",
    "Linedup":"fas fa-users",
    "Linedup Confirmed":"fas fa-user-check",
    "Reported":"fas fa-user-clock",
    "Interviewed":"fas fa-comments",
    "Result Pending":"fas fa-clipboard-question",
    "Proposed PSL": "fas fa-check-circle"  
};

const currentStatus = frm.doc.pending_for || "IDB";
const taskName = frm.doc.task;

statuses.forEach((status, index) => {
    const active = status === currentStatus ? "active" : "";
    const completed = statuses.indexOf(currentStatus) > statuses.indexOf(status) ? "completed" : "";

    let sourced_date_html = "";
    if(frm.doc.custom_status_transition) {
        const matchingRows = frm.doc.custom_status_transition.filter(r => r.task === taskName && r.status === status);
        if(matchingRows.length) {
            matchingRows.sort((a,b)=> new Date(b.sourced_date)-new Date(a.sourced_date));
            const latestRow = matchingRows[0];
            if(latestRow.sourced_date){
                const dt = frappe.datetime.str_to_user(latestRow.sourced_date);
                const parts = dt.split(" ");
                sourced_date_html = `<div style="font-size:9px; color:#555; margin-top:2px;text-align:center">${parts[0]}<br>${parts.slice(1).join(" ")}</div>`;
            }
        }
    }
 let labelText = status;

    const step = $(`
        <div class="status-step ${active} ${completed}" style="display:flex; justify-content:start; flex-direction:column;  align-items:center; position:relative;  ">
            <div style="display:flex; justify-content:start; align-items:center; position:relative;  ">
                <div class="circle" style="
                    width:32px;
                    height:32px;
                    border:2px solid #ccc;
                    border-radius:50%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background:#f8f8f8;
                    z-index:1;
                    position:relative;
                ">
                    <i class="${icons[status]}" style="font-size:13px;color:#555;"></i>
                </div>
                ${index < statuses.length - 1 ? `<div class="connector" style="
                    height:2px;
                    width:28px;       
                    background:#ccc;
                    margin-left:0px;	
                    position:relative;
                ">
                    <div style="
                        width:0;
                        height:0;
                        border-top:5px solid transparent;
                        border-bottom:5px solid transparent;
                        border-left:6px solid #ccc;
                        position:absolute;
                        right:-6px;
                        top:-4px;
                    "></div>
                </div>` : `<div class="connector" style="visibility:hidden;width:28px;"></div>`}
            </div>
           <div style="display:flex; flex-direction:column;   align-items:center; margin-top:4px; margin-left:-20px; ">
    <div class="label" title="${status}" style="
        /* adjust this value as needed */
		margin-right:14px;
        font-size:9px;
        color:#333;
        overflow:hidden;
		white-space: normal;
		word-break: break-word;  
		overflow-wrap: break-word;   
        text-overflow:ellipsis;
        text-align:start;
		
		
		
		
    ">
        ${labelText}
    </div>
    ${sourced_date_html ? `<div style="font-size:9px;color:#555; margin-top:2px; text-align:center; margin-right:18px;">${sourced_date_html}</div>` : ''}

</div>


    `);

    container.append(step);
});

container.find(".status-step").each(function(){
    const circle = $(this).find(".circle");
    const icon = circle.find("i");
    const connector = $(this).find(".connector");
    const arrow = connector.find("div");

    if($(this).hasClass("active")){
        circle.css({borderColor:"#007bff", background:"#e7f0ff", boxShadow:"0 0 6px rgba(0,123,255,0.4)"});
        icon.css("color","#007bff");
        if(connector.length) connector.css("background","#007bff");
        if(arrow.length) arrow.css("border-left-color","#007bff");
    } else if($(this).hasClass("completed")){
        circle.css({borderColor:"#28a745", background:"#e9f9ee"});
        icon.css("color","#28a745");
        if(connector.length) connector.css("background","#28a745");
        if(arrow.length) arrow.css("border-left-color","#28a745");
    }
});

const formPage = frm.$wrapper.find('.form-page'); 
if(formPage.length) {
    formPage.prepend(container);
} else {
    frm.$wrapper.append(container);
}

	
		frm.set_df_property("custom_candidate_si", "label", "Candidate SI (" + frm.doc.custom_billing_currency + ")");
		frm.set_df_property("custom_client_si", "label", "Client SI (" + frm.doc.custom_client_billing_currency + ")");
		frm.set_df_property("custom_associate_si", "label", "Associate SI (" + frm.doc.custom_associate_paymentinr + ")");
		if ( frm.doc.issued_date && !frm.doc.expiry_date) {
            // Calculate expiry date (10 years after issued date)
            let issued = new Date(frm.doc.issued_date);
            let expiry = new Date(issued);
            expiry.setFullYear(expiry.getFullYear() + 10);
			expiry.setDate(expiry.getDate() - 1)
            frm.set_value('expiry_date', expiry.toISOString().split('T')[0]);

            // Calculate difference between today and expiry date
            let today = new Date(frm.doc.interview_date);
            let diffYears = expiry.getFullYear() - today.getFullYear();
            let diffMonths = expiry.getMonth() - today.getMonth();

            if (diffMonths < 0) {
                diffYears -= 1;
                diffMonths += 12;
            }
			if (frm.doc.interview_date){
            frm.set_value('expiry_period', `${diffYears} years, ${diffMonths} months`);
			}else{
				frm.set_value('expiry_period', `0 years, 0 months`);
			}
        }
		// if (frm.doc.passport_number){
		// 	frm.set_df_property('temp_passport_number', 'hidden', 1);
		// }
		// else{
		// 	frm.set_df_property('temp_passport_number', 'hidden', 0);
		// }
		
		// if (frm.doc.pending_for=="IDB"){
		// 	if (!frappe.user.has_role("Customer User")) { 
	 	// 	frm.add_custom_button(__("Move Candidate to new Customer"), function () {
		// 		let d = new frappe.ui.Dialog({
		// 			title: 'Move Candidate to new Customer',
		// 			fields: [
		// 				{
		// 					label: 'Customer',
		// 					fieldname: 'customer',
		// 					fieldtype: 'Link',
		// 					options:'Customer',
		// 				},
		// 				{
		// 					label: 'Project',
		// 					fieldname: 'project',
		// 					fieldtype: 'Link',
		// 					options:'Project',
		// 				},
		// 				{
		// 					label: 'Task',
		// 					fieldname: 'task',
		// 					fieldtype: 'Link',
		// 					options:'Task',
							
		// 				},
		// 			],
					
		// 			primary_action_label: __('Update'),
		// 			primary_action: () => {
		// 				let values = d.get_values();
		// 				frm.add_child('custom__history',{
		// 					'c_customer':frm.doc.customer,
		// 					'p_project':frm.doc.project,
		// 					't_task':frm.doc.task,
		// 					})
		// 				frm.set_value("customer",values.customer)
		// 				frm.set_value("project",values.project)
		// 				frm.set_value("task",values.task)
							
		// 			d.hide();
		// 			// frm.add_child('custom__history',{
		// 			// 	'c_customer':frm.doc.customer,
		// 			// 	'p_project':frm.doc.project,
		// 			// 	't_task':frm.doc.task,
		// 			// 	})
		// 				frm.refresh_field('custom__history')
		// 			frm.save()
		// 			},
		// 		});
		// 		d.fields_dict.project.$input.on('change', function () {
		// 			let project = d.get_value('project');
		
		// 			// Set query to filter tasks by selected project
		// 			d.fields_dict.task.get_query = function () {
		// 				return {
		// 					filters: {
		// 						project: project
		// 					}
		// 				};
		// 			};
		// 		});
		
		// 		d.show();
		// 	});
		// }
		// }
		let status_btn = frm.add_custom_button(__('Status'), null, 'Action');
            status_btn.css({
                'background-color': '#138d8d',
                'color': '#fff',
                'font-weight': 'bold'
            });
            status_btn.addClass('disabled-button');
		if(frm.doc.pending_for == "Sourced"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Pending QC"), function () {

				

				if(!frm.doc.updated__masked_cv && !frm.doc.custom_updated__un_masked_cv ){
                    frappe.msgprint("Both Masked and Unmasked CV are mandatory to move to Pending QC")
				}
				else if(!frm.doc.updated__masked_cv){
                    frappe.msgprint("Masked CV is mandatory to move to Pending QC")
				}
				else if(!frm.doc.custom_updated__un_masked_cv){
                   frappe.msgprint("Unmasked CV is mandatory to move to Pending QC")
				}
				else{

				frm.set_df_property("custom_candidates_acknowledgement_","reqd",1)
				// frm.set_value("pending_for","Pending QC")
				// frm.add_child("custom_status_transition",{
				// 	'status':frm.doc.pending_for,
				// 	'sourced_date':frappe.datetime.now_datetime(),
				// 	'sourced_by':frappe.session.user,
				// 	'project':frm.doc.project,
				// 	'task':frm.doc.task,
				// })
				// frm.refresh_field('custom_status_transition')
				// frm.save()
				if (!frm.doc.custom_candidates_acknowledgement_){
				let d = new frappe.ui.Dialog({
					title: "Candidate Acknowledgement",
					fields: [
						{
							fieldname: "custom_candidates_acknowledgement_",
							fieldtype: "Attach",
							label: "Candidate Acknowledgement",
							reqd: 1
						}
					],
					primary_action_label: "Save",
					primary_action(values) {

						if (!values.custom_candidates_acknowledgement_) {
							frappe.throw("Candidate Acknowledgement is mandatory");
						}

						frm.set_value(
							"custom_candidates_acknowledgement_",
							values.custom_candidates_acknowledgement_
						);

						frm.set_value("pending_for", "Pending QC");

						frm.add_child("custom_status_transition", {
							status: "Pending QC",
							sourced_date: frappe.datetime.now_datetime(),
							sourced_by: frappe.session.user,
							project: frm.doc.project,
							task: frm.doc.task
						});

						frm.refresh_field("custom_status_transition");

						frm.save().then(() => {
							d.hide();
						});
					},
					secondary_action_label: "Cancel",
					secondary_action() {
						d.hide();
					}
				});

				d.show();
				}
				else{
					frm.set_value("pending_for","Pending QC")
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
					'task':frm.doc.task,
				})
				frm.refresh_field('custom_status_transition')
				frm.save()
				}
						}

			},("Action"));
			frm.add_custom_button(("IDB"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Remark is mandatory',
					fields: [
						{
							label: 'IDB-Remarks',
							fieldname: 'custom_idbremarks',
							fieldtype: 'Select',
							options: 'Rejected By Client\nAny other',
							default:'Rejected By Client',
							reqd:1,
						},
						{
							label: 'Any Other Reason',
							fieldname: 'custom_any_other_reason',
							fieldtype: 'Small Text',
							depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
							mandatory_depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
						},
					],
					primary_action_label: __('Save'),
					primary_action: () => {
						let values = d.get_values();
						frm.set_value("custom_idbremarks",values.custom_idbremarks)
						frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
						frm.set_df_property("custom_idbremarks", "read_only", 1);
						frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
						frm.set_df_property("custom_idbremarks", "reqd", 1);
						frm.set_value("pending_for","IDB")
						frm.set_value("candidate_created_by","cv@groupteampro.com");
						frm.add_child("custom_status_transition",{
							'status':frm.doc.pending_for,
							'sourced_date':frappe.datetime.now_datetime(),
							'sourced_by':frappe.session.user,
							'project':frm.doc.project,
							'task':frm.doc.task,
							'remarks':values.custom_idbremarks,

						})
						frm.refresh_field('custom_status_transition')
						frm.save()
						d.hide();

					},
				})
			d.show();
				
			},("Action")); 	
			}
		}
		if (frm.doc.pending_for=="IDB"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Sourced"), function () {
				if (!frappe.user.has_role("HOD")){
					frappe.call({
						method: 'jobpro.custom.check_candidate_for_sourced',
						args: {
							candidate_id: frm.doc.name
						},
						callback: function(r) {
							if (r.message) {
								frappe.throw(r.message);
							}
							else{
								frm.set_value("pending_for","Sourced")
								frm.add_child("custom_status_transition",{
									'status':frm.doc.pending_for,
									'sourced_date':frappe.datetime.now_datetime(),
									'sourced_by':frappe.session.user,
									'project':frm.doc.project,
									'task':frm.doc.task,
									'remarks':values.custom_idbremarks,
								})
								frm.refresh_field('custom_status_transition')
								frm.save()
							}
						}	
					});
				}
				else{
					if(frappe.user.has_role("HOD")){
						frm.set_value("pending_for","Sourced")
						frm.add_child("custom_status_transition",{
							'status':frm.doc.pending_for,
							'sourced_date':frappe.datetime.now_datetime(),
							'sourced_by':frappe.session.user,
							'project':frm.doc.project,
							'task':frm.doc.task,
							'remarks':values.custom_idbremarks,
						})
						frm.refresh_field('custom_status_transition')
						frm.save()
					}
				}
				
			frm.save()

			},("Action"));
			}
		}
		
		
		if(frm.doc.pending_for=="Pending QC"){
			if (!frappe.user.has_role("Customer User")) { 
			
			frm.add_custom_button(("Submit (SPOC)"), function () {
				frm.set_value("pending_for","Submit(SPOC)")
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
					'task':frm.doc.task,
				})
				frm.refresh_field('custom_status_transition')
				frm.save()
				frappe.call({
					method: "teampro.teampro.doctype.rec_week_plan.rec_week_plan.update_week_plan_ac_by_today",
					args: {
						candidate: frm.doc.name
					},
					callback: function(r) {
						
					}
				});
			},("Action"));
			frm.add_custom_button(("IDB"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Remark is mandatory',
					fields: [
						{
							label: 'IDB-Remarks',
							fieldname: 'custom_idbremarks',
							fieldtype: 'Select',
							options: 'Rejected By Client\nAny other',
							default:'Rejected By Client',
							reqd:1,
						},
						{
							label: 'Any Other Reason',
							fieldname: 'custom_any_other_reason',
							fieldtype: 'Small Text',
							depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
							mandatory_depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
						},
					],
					primary_action_label: __('Save'),
					primary_action: () => {
						let values = d.get_values();
						frm.set_value("custom_idbremarks",values.custom_idbremarks)
						frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
						frm.set_df_property("custom_idbremarks", "read_only", 1);
						frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
						frm.set_df_property("custom_idbremarks", "reqd", 1);
						frm.set_value("pending_for","IDB");
						frm.set_value("candidate_created_by","cv@groupteampro.com");
						frm.add_child("custom_status_transition",{
							'status':frm.doc.pending_for,
							'sourced_date':frappe.datetime.now_datetime(),
							'sourced_by':frappe.session.user,
							'project':frm.doc.project,
							'task':frm.doc.task,
							'remarks':values.custom_idbremarks,
						})
						frm.refresh_field('custom_status_transition')
						frm.save()
						d.hide();

					},
				})
			d.show();
				
			},("Action"));
		}
		}
		
		if(frm.doc.pending_for=="Submit(SPOC)"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Submit (Client)"), function () {
				frm.set_value("pending_for","Submitted(Client)")
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
					'task':frm.doc.task,
				})
				
				frm.refresh_field('custom_status_transition')
				frm.save()
				
			},("Action"));
			frm.add_custom_button(("IDB"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Remark is mandatory',
					fields: [
						{
							label: 'IDB-Remarks',
							fieldname: 'custom_idbremarks',
							fieldtype: 'Select',
							options: 'Rejected By Client\nAny other',
							default:'Rejected By Client',
							reqd:1,
						},
						{
							label: 'Any Other Reason',
							fieldname: 'custom_any_other_reason',
							fieldtype: 'Small Text',
							depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
							mandatory_depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
						},
					],
					primary_action_label: __('Save'),
					primary_action: () => {
						let values = d.get_values();
						frm.set_value("custom_idbremarks",values.custom_idbremarks)
						frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
						frm.set_df_property("custom_idbremarks", "read_only", 1);
						frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
						frm.set_df_property("custom_idbremarks", "reqd", 1);
						frm.set_value("pending_for","IDB");
						frm.set_value("candidate_created_by","cv@groupteampro.com");
						frm.add_child("custom_status_transition",{
							'status':frm.doc.pending_for,
							'sourced_date':frappe.datetime.now_datetime(),
							'sourced_by':frappe.session.user,
							'project':frm.doc.project,
							'task':frm.doc.task,
							'remarks':values.custom_idbremarks,
						})
						frm.refresh_field('custom_status_transition')
						frm.save()
						d.hide();

					},
				})
			d.show();
				
			},("Action"));
		}
		}
		
		if(frm.doc.pending_for=="Submitted(Client)"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Shortlisted"), function () {
				frm.set_value("pending_for","Shortlisted")
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
					'task':frm.doc.task,
				})
				frm.refresh_field('custom_status_transition')
				frm.save()
			},("Action"));
			frm.add_custom_button(("IDB"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Remark is mandatory',
					fields: [
						{
							label: 'IDB-Remarks',
							fieldname: 'custom_idbremarks',
							fieldtype: 'Select',
							options: 'Rejected By Client\nAny other',
							default:'Rejected By Client',
							reqd:1,
						},
						{
							label: 'Any Other Reason',
							fieldname: 'custom_any_other_reason',
							fieldtype: 'Small Text',
							depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
							mandatory_depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
						},
					],
					primary_action_label: __('Save'),
					primary_action: () => {
						let values = d.get_values();
						frm.set_value("custom_idbremarks",values.custom_idbremarks)
						frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
						frm.set_df_property("custom_idbremarks", "read_only", 1);
						frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
						frm.set_df_property("custom_idbremarks", "reqd", 1);
						frm.set_value("pending_for","IDB");
						frm.set_value("candidate_created_by","cv@groupteampro.com");
						frm.add_child("custom_status_transition",{
							'status':frm.doc.pending_for,
							'sourced_date':frappe.datetime.now_datetime(),
							'sourced_by':frappe.session.user,
							'project':frm.doc.project,
							'task':frm.doc.task,
							'remarks':values.custom_idbremarks,
						})
						frm.refresh_field('custom_status_transition')
						frm.save()
						d.hide();

					},
				})
			d.show();
				
			},("Action"));
		}
		}
		if(frm.doc.pending_for=="Shortlisted"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Linedup"), function () {
				frm.set_df_property("interview_location", "reqd", 1);
				frm.set_df_property("interviewed_date", "reqd", 1);
				frm.set_value("pending_for","Linedup")
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
					'task':frm.doc.task,
				})
				frm.refresh_field('custom_status_transition')
				frm.save()
			},("Action"));
			frm.add_custom_button(("IDB"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Remark is mandatory',
					fields: [
						{
							label: 'IDB-Remarks',
							fieldname: 'custom_idbremarks',
							fieldtype: 'Select',
							options: 'Rejected By Client\nAny other',
							default:'Rejected By Client',
							reqd:1,
						},
						{
							label: 'Any Other Reason',
							fieldname: 'custom_any_other_reason',
							fieldtype: 'Small Text',
							depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
							mandatory_depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
						},
					],
					primary_action_label: __('Save'),
					primary_action: () => {
						let values = d.get_values();
						frm.set_value("custom_idbremarks",values.custom_idbremarks)
						frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
						frm.set_df_property("custom_idbremarks", "read_only", 1);
						frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
						frm.set_df_property("custom_idbremarks", "reqd", 1);
						frm.set_value("pending_for","IDB");
						frm.set_value("candidate_created_by","cv@groupteampro.com");
						frm.add_child("custom_status_transition",{
							'status':frm.doc.pending_for,
							'sourced_date':frappe.datetime.now_datetime(),
							'sourced_by':frappe.session.user,
							'project':frm.doc.project,
							'task':frm.doc.task,
							'remarks':values.custom_idbremarks,
						})
						frm.refresh_field('custom_status_transition')
						frm.save()
						d.hide();

					},
				})
			d.show();
				
			},("Action"));
		}
		}
		if(frm.doc.pending_for=="Linedup"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("IDB"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Remark is mandatory',
					fields: [
						{
							label: 'IDB-Remarks',
							fieldname: 'custom_idbremarks',
							fieldtype: 'Select',
							options: 'Rejected By Client\nAny other',
							default:'Rejected By Client',
							reqd:1,
						},
						{
							label: 'Any Other Reason',
							fieldname: 'custom_any_other_reason',
							fieldtype: 'Small Text',
							depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
							mandatory_depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
						},
					],
					primary_action_label: __('Save'),
					primary_action: () => {
						let values = d.get_values();
						frm.set_value("custom_idbremarks",values.custom_idbremarks)
						frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
						frm.set_df_property("custom_idbremarks", "read_only", 1);
						frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
						frm.set_df_property("custom_idbremarks", "reqd", 1);
						frm.set_value("pending_for","IDB");
						frm.set_value("candidate_created_by","cv@groupteampro.com");
						frm.add_child("custom_status_transition",{
							'status':frm.doc.pending_for,
							'sourced_date':frappe.datetime.now_datetime(),
							'sourced_by':frappe.session.user,
							'project':frm.doc.project,
							'task':frm.doc.task,
							'remarks':values.custom_idbremarks,
						})
						frm.refresh_field('custom_status_transition')
						frm.save()
						d.hide();

					},
				})
			d.show();
			},("Action"));
		if (!frappe.user.has_role("Customer User")) { 
			
			frm.add_custom_button("Linedup Confirmed", function () {
				if(!frm.doc.custom_linedup_confirmed_attachement){
				let d = new frappe.ui.Dialog({
					title: "Linedup Confirmed Attachment",
					fields: [
						{
							fieldname: "custom_linedup_confirmed_attachement",
							fieldtype: "Attach",
							label: "Linedup Confirmed Attachment",
							reqd: 1
						}
					],
					primary_action_label: "Save",
					primary_action(values) {

						if (!values.custom_linedup_confirmed_attachement) {
							frappe.throw("Kindly attach Linedup Confirmed Attachment");
						}

						frm.set_value(
							"custom_linedup_confirmed_attachement",
							values.custom_linedup_confirmed_attachement
						);

						frm.set_value("pending_for", "Linedup Confirmed");

						frm.add_child("custom_status_transition", {
							status: "Linedup Confirmed",
							sourced_date: frappe.datetime.now_datetime(),
							sourced_by: frappe.session.user,
							project: frm.doc.project,
							task: frm.doc.task
						});

						frm.refresh_field("custom_status_transition");

						frm.save().then(() => {
							d.hide();
						});
					},
					secondary_action_label: "Cancel",
					secondary_action() {
						d.hide();
					}
				});

				d.show();
			}
			else{
				frm.set_value("pending_for","Linedup Confirmed")
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
					'task':frm.doc.task,
				})
				frm.refresh_field('custom_status_transition')
				frm.save()
			}
			}, __("Action"));

				// frm.add_custom_button(("Linedup Confirmed"), function () {
				// if(!frm.doc.custom_linedup_confirmed_attachement){
				// 	frappe.throw("Kindly attach Linedup Confirmed Attachement before move to next status")
				// }
				// else{
					
				// 	frm.set_value("pending_for","Linedup Confirmed")
				// 	frm.add_child("custom_status_transition",{
				// 		'status':frm.doc.pending_for,
				// 		'sourced_date':frappe.datetime.now_datetime(),
				// 		'sourced_by':frappe.session.user,
				// 		'project':frm.doc.project,
				// 		'task':frm.doc.task,
				// 	})
				// 	frm.refresh_field('custom_status_transition')
				// 	frm.save()
				// // }
			// },__("Action"));
			
		}
		}
		}
		// 
		if(frm.doc.pending_for=="Linedup Confirmed"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Reported"), function () {
				frm.set_value("pending_for","Reported")
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
					'task':frm.doc.task,
				})
				frm.refresh_field('custom_status_transition')
				frm.save()
			},__("Action"));
			frm.add_custom_button(("IDB"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Remark is mandatory',
					fields: [
						{
							label: 'IDB-Remarks',
							fieldname: 'custom_idbremarks',
							fieldtype: 'Select',
							options: 'Rejected By Client\nAny other',
							default:'Rejected By Client',
							reqd:1,
						},
						{
							label: 'Any Other Reason',
							fieldname: 'custom_any_other_reason',
							fieldtype: 'Small Text',
							depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
							mandatory_depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
						},
					],
					primary_action_label: __('Save'),
					primary_action: () => {
						let values = d.get_values();
						frm.set_value("custom_idbremarks",values.custom_idbremarks)
						frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
						frm.set_df_property("custom_idbremarks", "read_only", 1);
						frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
						frm.set_df_property("custom_idbremarks", "reqd", 1);
						frm.set_value("pending_for","IDB");
						frm.set_value("candidate_created_by","cv@groupteampro.com");
						frm.add_child("custom_status_transition",{
							'status':frm.doc.pending_for,
							'sourced_date':frappe.datetime.now_datetime(),
							'sourced_by':frappe.session.user,
							'project':frm.doc.project,
							'task':frm.doc.task,
							'remarks':values.custom_idbremarks,
						})
						frm.refresh_field('custom_status_transition')
						frm.save()
						d.hide();

					},
				})
			d.show();
			},("Action"));
		}
		}
		// 
		if(frm.doc.pending_for=="Reported"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Interviewed"), function () {
				frm.set_value("pending_for","Interviewed")
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
					'task':frm.doc.task,
				})
				frm.refresh_field('custom_status_transition')
				frm.save()
			},("Action"));
			frm.add_custom_button(("IDB"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Remark is mandatory',
					fields: [
						{
							label: 'IDB-Remarks',
							fieldname: 'custom_idbremarks',
							fieldtype: 'Select',
							options: 'Rejected By Client\nAny other',
							default:'Rejected By Client',
							reqd:1,
						},
						{
							label: 'Any Other Reason',
							fieldname: 'custom_any_other_reason',
							fieldtype: 'Small Text',
							depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
							mandatory_depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
						},
					],
					primary_action_label: __('Save'),
					primary_action: () => {
						let values = d.get_values();
						frm.set_value("custom_idbremarks",values.custom_idbremarks)
						frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
						frm.set_df_property("custom_idbremarks", "read_only", 1);
						frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
						frm.set_df_property("custom_idbremarks", "reqd", 1);
						frm.set_value("pending_for","IDB");
						frm.set_value("candidate_created_by","cv@groupteampro.com");
						frm.add_child("custom_status_transition",{
							'status':frm.doc.pending_for,
							'sourced_date':frappe.datetime.now_datetime(),
							'sourced_by':frappe.session.user,
							'project':frm.doc.project,
							'task':frm.doc.task,
							'remarks':values.custom_idbremarks,
						})
						frm.refresh_field('custom_status_transition')
						frm.save()
						d.hide();

					},
				})
			d.show();
			},("Action"));
		}
		}
		// 
		
		if(frm.doc.pending_for=="Interviewed"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Proposed PSL"), function () {
				frm.set_value("pending_for","Proposed PSL")
				 if(frm.doc.task) {
                frappe.db.get_doc("Task", frm.doc.task).then(task => {

                    if(task.custom_payment_from) {
                        frm.set_value("custom_payment_from", task.custom_payment_from);
                    } else {
                        frappe.throw("Please set <b>Payment From</b> in the Task before moving to PSL.");
                    }
					if(task.custom_payment_from === "Candidate") {
                        if(task.custom_candidate_si) {
                            frm.set_value("custom_candidate_si", task.custom_candidate_si);
                        } else {
                            frappe.throw("Please set <b>Candidate SI</b> in Payment Details.");
                        }
						if(task.custom_candidate_billing_currency){
							frm.set_value("custom_billing_currency", task.custom_candidate_billing_currency);
						}
						else{
							frappe.throw("Please set <b>Candidate Billing Currency</b> in Payment Details.");
						}
                    }
					if(task.custom_payment_from === "Client") {
                        if(task.custom_client_si) {
                            frm.set_value("custom_client_si", task.custom_client_si);
                        } else {
                            frappe.throw("Please set <b>Candidate SI</b> in Payment Details.");
                        }
						if(task.custom_client_billing_currency){
							frm.set_value("custom_client_billing_currency", task.custom_client_billing_currency);
						}
						else{
							frappe.throw("Please set <b>Client Billing Currency</b> in Payment Details.");
						}
                    }
					if(task.custom_payment_from === "Associate") {
                        if(task.custom_associate_si) {
                            frm.set_value("custom_associate_si", task.custom_associate_si);
                        } else {
                            frappe.throw("Please set <b>Candidate SI</b> in Payment Details.");
                        }
						if(task.custom_associate_billing_currency){
							frm.set_value("custom_associate_paymentinr", task.custom_associate_billing_currency);
						}
						else{
							frappe.throw("Please set <b>Associate Billing Currency</b> in Payment Details.");
						}
                    }
					if(task.custom_payment_from === "Both") {
                       if(task.custom_candidate_si) {
                            frm.set_value("custom_candidate_si", task.custom_candidate_si);
                        } else {
                            frappe.throw("Please set <b>Candidate SI</b> in Payment Details.");
                        }
						if(task.custom_candidate_billing_currency){
							frm.set_value("custom_billing_currency", task.custom_candidate_billing_currency);
						}
						else{
							frappe.throw("Please set <b>Candidate Billing Currency</b> in Payment Details.");
						}
						if(task.custom_client_si) {
                            frm.set_value("custom_client_si", task.custom_client_si);
                        } else {
                            frappe.throw("Please set <b>Candidate SI</b> in Payment Details.");
                        }
						if(task.custom_client_billing_currency){
							frm.set_value("custom_client_billing_currency", task.custom_client_billing_currency);
						}
						else{
							frappe.throw("Please set <b>Client Billing Currency</b> in Payment Details.");
						}
						
                    }

				})
			}
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
					'task':frm.doc.task,
				})
				frm.refresh_field('custom_status_transition')
				frm.save()
			},("Action"));
			frm.add_custom_button(("Result Pending"), function () {
				frm.set_value("pending_for","Result Pending")
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
					'task':frm.doc.task,
				})
				frm.refresh_field('custom_status_transition')
				frm.save()
			},("Action"));
			frm.add_custom_button(("IDB"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Remark is mandatory',
					fields: [
						{
							label: 'IDB-Remarks',
							fieldname: 'custom_idbremarks',
							fieldtype: 'Select',
							options: 'Rejected By Client\nAny other',
							default:'Rejected By Client',
							reqd:1,
						},
						{
							label: 'Any Other Reason',
							fieldname: 'custom_any_other_reason',
							fieldtype: 'Small Text',
							depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
							mandatory_depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
						},
					],
					primary_action_label: __('Save'),
					primary_action: () => {
						
							let values = d.get_values();
							frm.set_value("custom_idbremarks",values.custom_idbremarks)
							frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
							frm.set_df_property("custom_idbremarks", "read_only", 1);
							frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
							frm.set_df_property("custom_idbremarks", "reqd", 1);
							frm.set_value("pending_for","IDB");
							frm.set_value("candidate_created_by","cv@groupteampro.com");
							frm.add_child("custom_status_transition",{
								'status':frm.doc.pending_for,
								'sourced_date':frappe.datetime.now_datetime(),
								'sourced_by':frappe.session.user,
								'project':frm.doc.project,
								'task':frm.doc.task,
								'remarks':values.custom_idbremarks,
							})
							frm.refresh_field('custom_status_transition')
							frm.save()
							d.hide();
							if (values.custom_idbremarks=="Rejected By Client"){
								frappe.call({
									method: 'teampro.email_alerts.candidate_idb_remarks',
									args: {
										candidate_id: frm.doc.name,
										reason:frm.doc.custom_idbremarks
									},
									callback: function(r) {
										
									}
								});
							}
						},
					})
				d.show();
				},("Action"));
			}
			}
		if(frm.doc.pending_for=="Result Pending"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Proposed PSL"), function(){
				frm.set_value("pending_for","Proposed PSL")
				 if(frm.doc.task) {
                frappe.db.get_doc("Task", frm.doc.task).then(task => {

                    if(task.custom_payment_from) {
                        frm.set_value("custom_payment_from", task.custom_payment_from);
                    } else {
                        frappe.throw("Please set <b>Payment From</b> in the Task before moving to PSL.");
                    }
					if(task.custom_payment_from === "Candidate") {
                        if(task.custom_candidate_si) {
                            frm.set_value("custom_candidate_si", task.custom_candidate_si);
                        } else {
                            frappe.throw("Please set <b>Candidate SI</b> in Payment Details.");
                        }
						if(task.custom_candidate_billing_currency){
							frm.set_value("custom_billing_currency", task.custom_candidate_billing_currency);
						}
						else{
							frappe.throw("Please set <b>Candidate Billing Currency</b> in Payment Details.");
						}
                    }
					if(task.custom_payment_from === "Client") {
                        if(task.custom_client_si) {
                            frm.set_value("custom_client_si", task.custom_client_si);
                        } else {
                            frappe.throw("Please set <b>Candidate SI</b> in Payment Details.");
                        }
						if(task.custom_client_billing_currency){
							frm.set_value("custom_client_billing_currency", task.custom_client_billing_currency);
						}
						else{
							frappe.throw("Please set <b>Client Billing Currency</b> in Payment Details.");
						}
                    }
					if(task.custom_payment_from === "Associate") {
                        if(task.custom_associate_si) {
                            frm.set_value("custom_associate_si", task.custom_associate_si);
                        } else {
                            frappe.throw("Please set <b>Candidate SI</b> in Payment Details.");
                        }
						if(task.custom_associate_billing_currency){
							frm.set_value("custom_associate_paymentinr", task.custom_associate_billing_currency);
						}
						else{
							frappe.throw("Please set <b>Associate Billing Currency</b> in Payment Details.");
						}
                    }
					if(task.custom_payment_from === "Both") {
                       if(task.custom_candidate_si) {
                            frm.set_value("custom_candidate_si", task.custom_candidate_si);
                        } else {
                            frappe.throw("Please set <b>Candidate SI</b> in Payment Details.");
                        }
						if(task.custom_candidate_billing_currency){
							frm.set_value("custom_billing_currency", task.custom_candidate_billing_currency);
						}
						else{
							frappe.throw("Please set <b>Candidate Billing Currency</b> in Payment Details.");
						}
						if(task.custom_client_si) {
                            frm.set_value("custom_client_si", task.custom_client_si);
                        } else {
                            frappe.throw("Please set <b>Candidate SI</b> in Payment Details.");
                        }
						if(task.custom_client_billing_currency){
							frm.set_value("custom_client_billing_currency", task.custom_client_billing_currency);
						}
						else{
							frappe.throw("Please set <b>Client Billing Currency</b> in Payment Details.");
						}
						
                    }

				})
			}
				frm.add_child("custom_status_transition",{
					'status':frm.doc.pending_for,
					'sourced_date':frappe.datetime.now_datetime(),
					'sourced_by':frappe.session.user,
					'project':frm.doc.project,
						'task':frm.doc.task,
				})
				frm.refresh_field('custom_status_transition')
				frm.save()
			},("Action"));
			frm.add_custom_button(("IDB"),function(){
				let d = new frappe.ui.Dialog({
					title: 'Remark is mandatory',
					fields: [
						{
							label: 'IDB-Remarks',
							fieldname: 'custom_idbremarks',
							fieldtype: 'Select',
							options: 'Rejected By Client\nAny other',
							default:'Rejected By Client',
							reqd:1,
						},
						{
							label: 'Any Other Reason',
							fieldname: 'custom_any_other_reason',
							fieldtype: 'Small Text',
							depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
							mandatory_depends_on: "eval:doc.custom_idbremarks===\"Any other\"",
						},
					],
					primary_action_label: __('Save'),
					primary_action: () => {
						let values = d.get_values();
						frm.set_value("custom_idbremarks",values.custom_idbremarks)
						frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
						frm.set_df_property("custom_idbremarks", "read_only", 1);
						frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
						frm.set_df_property("custom_idbremarks", "reqd", 1);
						frm.set_value("pending_for","IDB");
						frm.set_value("candidate_created_by","cv@groupteampro.com");
						frm.add_child("custom_status_transition",{
							'status':frm.doc.pending_for,
							'sourced_date':frappe.datetime.now_datetime(),
							'sourced_by':frappe.session.user,
							'project':frm.doc.project,
							'task':frm.doc.task,
							'remarks':values.custom_idbremarks,
						})
						frm.refresh_field('custom_status_transition')
						frm.save()
						d.hide();

					},
				})
			d.show();
			},("Action"));
		}
		}


	},
	
});

