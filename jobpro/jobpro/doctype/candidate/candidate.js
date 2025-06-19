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
	task(frm){
		if(frm.doc.task){
			frappe.call({
				method:"jobpro.jobpro.doctype.candidate.candidate.update_criteria_table",
				args:{
					task_id:frm.doc.task,
					name:frm.doc.name
				},
			})
		}
		
	},
	pending_for(frm){
		if(frm.doc.pending_for == "Submitted(Internal)") {
			frm.set_value('submitted_date',frappe.datetime.now_date())
			frm.save()
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
		var me = new Date(frm.doc.issued_date);
        var expiry_date = new Date(me.getFullYear() + 10, me.getMonth(), me.getDate() - 1)
		frm.set_value("expiry_date", expiry_date)
		if(frm.doc.issued_date > frappe.datetime.nowdate()){
			frappe.throw("Date of Issue Can't be Future Date")
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
	custom_linedup_confirmed_attachement:function(frm){
		if(!frm.doc.custom_linedup_confirmed_attachement){
			frm.set_value("pending_for","Linedup")
		}
		else{
		frm.set_value("pending_for","Linedup Confirmed")
		}
	},
	
	onload:function(frm){
		frm.set_value('mobile',frm.doc.mobile_number)
		if(frm.doc.__islocal){
			frm.set_value("custom_sourced_by","Normal")
		}
		
		// if(frm.doc.mobile_number && frm.doc.custom_has_whatsapp==1){
		// 	frm.set_value('whatsapp_number',frm.doc.mobile_number)
		// }
	},

	refresh:function(frm) {
		if (frm.doc.passport_number){
			frm.set_df_property('temp_passport_number', 'hidden', 1);
		}
		else{
			frm.set_df_property('temp_passport_number', 'hidden', 0);
		}

		if (frm.doc.pending_for=="IDB"){
			if (!frappe.user.has_role("Customer User")) { 
	 		frm.add_custom_button(__("Move Candidate to new Customer"), function () {
				let d = new frappe.ui.Dialog({
					title: 'Move Candidate to new Customer',
					fields: [
						{
							label: 'Customer',
							fieldname: 'customer',
							fieldtype: 'Link',
							options:'Customer',
						},
						{
							label: 'Project',
							fieldname: 'project',
							fieldtype: 'Link',
							options:'Project',
						},
						{
							label: 'Task',
							fieldname: 'task',
							fieldtype: 'Link',
							options:'Task',
							
						},
					],
					
					primary_action_label: __('Update'),
					primary_action: () => {
						let values = d.get_values();
						frm.add_child('custom__history',{
							'c_customer':frm.doc.customer,
							'p_project':frm.doc.project,
							't_task':frm.doc.task,
							})
						frm.set_value("customer",values.customer)
						frm.set_value("project",values.project)
						frm.set_value("task",values.task)
							
					d.hide();
					// frm.add_child('custom__history',{
					// 	'c_customer':frm.doc.customer,
					// 	'p_project':frm.doc.project,
					// 	't_task':frm.doc.task,
					// 	})
						frm.refresh_field('custom__history')
					frm.save()
					},
				});
				d.fields_dict.project.$input.on('change', function () {
					let project = d.get_value('project');
		
					// Set query to filter tasks by selected project
					d.fields_dict.task.get_query = function () {
						return {
							filters: {
								project: project
							}
						};
					};
				});
		
				d.show();
			});
		}
		}

		if(frm.doc.pending_for == "Sourced"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Submit (Internal)"), function () {
				frm.set_value("pending_for","Submitted(Internal)")
				frm.set_value('submitted_date',frappe.datetime.now_date())
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
						frm.set_value("pending_for","IDB")
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
				// frm.set_value("pending_for","IDB")
				// frm.add_child("custom_status_transition",{
				// 	'status':frm.doc.pending_for,
				// 	'sourced_date':frappe.datetime.now_datetime(),
				// 	'sourced_by':frappe.session.user,
				// })
				// frm.refresh_field('custom_status_transition')
				// frm.save()
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
				// else if (frappe.user.has_role("HOD")){
					// frm.set_value("pending_for","Sourced")
					// 	frm.add_child("custom_status_transition",{
					// 		'status':frm.doc.pending_for,
					// 		'sourced_date':frappe.datetime.now_datetime(),
					// 		'sourced_by':frappe.session.user,
					// 	})
					// 	frm.refresh_field('custom_status_transition')
					// 	frm.save()
				// }	
				// else{
				// frm.set_value("pending_for","Sourced")
				// frm.add_child("custom_status_transition",{
				// 	'status':frm.doc.pending_for,
				// 	'sourced_date':frappe.datetime.now_datetime(),
				// 	'sourced_by':frappe.session.user,
				// })
				// frm.refresh_field('custom_status_transition')
				// frm.save()
			// }
				// if (!frappe.user.has_role("HOD")){
				// 	frappe.call({
				// 		method: 'jobpro.custom.check_candidate_for_sourced',
				// 		args: {
				// 			candidate_id: frm.doc.name
				// 		},
				// 		callback: function(r) {
				// 			if (r.message) {
				// 				frappe.throw(r.message);
				// 			}
				// 			else{
				// 	let d = new frappe.ui.Dialog({
				// 		title: 'Remark is mandatory',
				// 		fields: [
				// 			{
				// 				label: 'IDB Remarks',
				// 				fieldname: 'custom_idb_remarks',
				// 				fieldtype: 'Small Text',
				// 				reqd:1,
				// 			},
				// 		],
				// 		primary_action_label: __('Save'),
				// 		primary_action: () => {
				// 			let values = d.get_values();
				// 			frm.set_value("custom_idb_remarks",values.custom_idb_remarks)
				// 			frm.set_df_property("custom_idb_remarks", "read_only", 1);
				// 			frm.set_df_property("custom_idb_remarks", "reqd", 1);
				// 			frm.set_value("pending_for","Sourced")
				// 			frm.add_child("custom_status_transition",{
				// 				'status':frm.doc.pending_for,
				// 				'sourced_date':frappe.datetime.now_datetime(),
				// 				'sourced_by':frappe.session.user,
				// 			})
				// 			frm.refresh_field('custom_status_transition')
				// 			frm.save()
				// 			d.hide();
				// 			// frm.save()
				// 	    },
				//     })
				// 	d.show();
				// 			}
				// 		}
				// 	});
				// }
			    // else if(frappe.user.has_role("HOD")) {
					// let d = new frappe.ui.Dialog({
					// 	title: 'Remark is mandatory',
					// 	fields: [
					// 		{
					// 			label: 'IDB Remarks',
					// 			fieldname: 'custom_idb_remarks',
					// 			fieldtype: 'Small Text',
					// 			reqd:1,
					// 		},
					// 	],
					// 	primary_action_label: __('Save'),
					// 	primary_action: () => {
					// 		let values = d.get_values();
					// 		frm.set_value("custom_idb_remarks",values.custom_idb_remarks)
					// 		frm.set_df_property("custom_idb_remarks", "read_only", 1);
					// 		frm.set_df_property("custom_idb_remarks", "reqd", 1);
					// 		frm.set_value("pending_for","Sourced")
					// 		frm.add_child("custom_status_transition",{
					// 			'status':frm.doc.pending_for,
					// 			'sourced_date':frappe.datetime.now_datetime(),
					// 			'sourced_by':frappe.session.user,
					// 		})
					// 		frm.refresh_field('custom_status_transition')
					// 		frm.save()
					// 		d.hide();
					// 		// frm.save()
					//     },
				    // })
					// d.show();
				// }
			frm.save()

			},("Action"));
			}
		}
		if(frm.doc.pending_for=="Submitted(Internal)"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("Pending QC"), function () {
				frm.set_df_property("custom_candidates_acknowledgement_","reqd",1)
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
			},("Action"));
		}
		}
		if(frm.doc.pending_for=="Pending QC"){
			if (!frappe.user.has_role("Customer User")) { 
			frm.add_custom_button(("QC Cleared"), function () {
				frm.set_value("pending_for","QC Cleared")
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
						frm.set_value("pending_for","IDB")
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
				// frm.set_value("pending_for","IDB")
				// frm.add_child("custom_status_transition",{
				// 	'status':frm.doc.pending_for,
				// 	'sourced_date':frappe.datetime.now_datetime(),
				// 	'sourced_by':frappe.session.user,
				// })
				// frm.refresh_field('custom_status_transition')
				// frm.save()
			},("Action"));
		}
		}
		if(frm.doc.pending_for=="QC Cleared"){
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
				frappe.call({
					method: "teampro.teampro.doctype.rec_week_plan.rec_week_plan.update_week_plan_ac_by_today",
					args: {
						candidate: frm.doc.name
					},
					callback: function(r) {
						
					}
				});
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
						frm.set_value("pending_for","IDB")
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
				// frm.set_value("pending_for","IDB")
				// frm.add_child("custom_status_transition",{
				// 	'status':frm.doc.pending_for,
				// 	'sourced_date':frappe.datetime.now_datetime(),
				// 	'sourced_by':frappe.session.user,
				// })
				// frm.refresh_field('custom_status_transition')
				// frm.save()
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
				frappe.call({
					method: "teampro.teampro.doctype.rec_week_plan.rec_week_plan.update_week_plan_ac_by_today",
					args: {
						candidate: frm.doc.name
					},
					callback: function(r) {
						
					}
				});
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
						frm.set_value("pending_for","IDB")
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
				// frm.set_value("pending_for","IDB")
				// frm.add_child("custom_status_transition",{
				// 	'status':frm.doc.pending_for,
				// 	'sourced_date':frappe.datetime.now_datetime(),
				// 	'sourced_by':frappe.session.user,
				// })
				// frm.refresh_field('custom_status_transition')
				// frm.save()
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
						frm.set_value("pending_for","IDB")
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
				// frm.set_value("pending_for","IDB")
				// frm.add_child("custom_status_transition",{
				// 	'status':frm.doc.pending_for,
				// 	'sourced_date':frappe.datetime.now_datetime(),
				// 	'sourced_by':frappe.session.user,
				// })
				// frm.refresh_field('custom_status_transition')
				// frm.save()
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
						frm.set_value("pending_for","IDB")
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
				// frm.set_value("pending_for","IDB")
				// frm.add_child("custom_status_transition",{
				// 	'status':frm.doc.pending_for,
				// 	'sourced_date':frappe.datetime.now_datetime(),
				// 	'sourced_by':frappe.session.user,
				// })
				// frm.refresh_field('custom_status_transition')
				// frm.save()
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
						frm.set_value("pending_for","IDB")
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
						frm.set_value("pending_for","IDB")
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
						// let values = d.get_values();
						// frm.set_value("custom_idbremarks",values.custom_idbremarks)
						// frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
						// frm.set_df_property("custom_idbremarks", "read_only", 1);
						// frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
						// frm.set_df_property("custom_idbremarks", "reqd", 1);
						// d.hide();
						// if (values.custom_idbremarks=="Rejected By Client"){
						// 		frappe.call({
						// 			method: 'jobpro.custom.candidate_idb_remarks',
						// 			args: {
						// 				candidate_id: frm.doc.name,
						// 				reason:frm.doc.custom_idbremarks
						// 			},
						// 			callback: function(r) {
						// 				
						// 			}
						// 		});

						// }
						// else{
						// frm.set_value("pending_for","IDB")
						// 	frm.add_child("custom_status_transition",{
						// 		'status':frm.doc.pending_for,
						// 		'sourced_date':frappe.datetime.now_datetime(),
						// 		'sourced_by':frappe.session.user,
						// 	})
						// 	frm.refresh_field('custom_status_transition')
						// 	frm.save()
						// }
			// 		},
			// 	})
			// d.show();
			// frm.save()
							let values = d.get_values();
							frm.set_value("custom_idbremarks",values.custom_idbremarks)
							frm.set_value("custom_any_other_reason",values.custom_any_other_reason)
							frm.set_df_property("custom_idbremarks", "read_only", 1);
							frm.set_df_property("custom_any_other_reason", "custom_any_other_reason", 1);
							frm.set_df_property("custom_idbremarks", "reqd", 1);
							frm.set_value("pending_for","IDB")
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
									method: 'jobpro.custom.candidate_idb_remarks',
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
						frm.set_value("pending_for","IDB")
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

