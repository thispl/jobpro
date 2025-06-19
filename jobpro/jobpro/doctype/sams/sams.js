// Copyright (c) 2022, teamPRO and contributors
// For license information, please see license.txt

frappe.ui.form.on('SAMS', {
	refresh: function(frm) {
		// if (frm.doc.sa_status=="Responding" && !frappe.user.has_role("HOD")){
		// 	frm.fields.forEach(function(field) {
		// 		frm.set_df_property(field.df.fieldname, "read_only", 1);
		// 	});
		// }
	},
	sa_status(frm){
		if (frm.doc.sa_status=="Responding"){
		frappe.call({
			method: 'jobpro.jobpro.doctype.sams.sams.set_sams_user',
			args: {
				name: frm.doc.name
			},
			callback: function(r) {
			}
		});
	}
	},
	
});
