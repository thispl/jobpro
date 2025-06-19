// Copyright (c) 2024, teamPRO and contributors
// For license information, please see license.txt

frappe.ui.form.on("Candidate Live Status", {
	project(frm) {
        frappe.call({
            method:"jobpro.custom.show_candidate_live_status_total",
            args:{
                project:frm.doc.project
            },
            callback(r){
                if (r.message) {
                    console.log(r.message)
                    frm.fields_dict.html.$wrapper.empty().append(r.message)
                }
            }
        })
        frappe.call({
            method:"jobpro.custom.show_candidate_live_status",
            args:{
                project:frm.doc.project
            },
            callback(r){
                if (r.message) {
                    console.log(r.message)
                    frm.fields_dict.live_status.$wrapper.empty().append(r.message)
                }
            }
        })
	},
    refresh: function(frm) {
        frappe.call({
            method:"jobpro.custom.show_candidate_live_status_total",
            args:{
                project:frm.doc.project
            },
            callback(r){
                if (r.message) {
                    console.log(r.message)
                    frm.fields_dict.html.$wrapper.empty().append(r.message)
                }
            }
        })
        frappe.call({
            method:"jobpro.custom.show_candidate_live_status",
            args:{
                project:frm.doc.project
            },
            callback(r){
                if (r.message) {
                    console.log(r.message)
                    frm.fields_dict.live_status.$wrapper.empty().append(r.message)
                }
            }
        })
    }
});
