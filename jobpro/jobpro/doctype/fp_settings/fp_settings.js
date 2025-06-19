// Copyright (c) 2024, teamPRO and contributors
// For license information, please see license.txt

frappe.ui.form.on("FP Settings", {
	process_count(frm) {
        frappe.call({
            method: 'jobpro.custom.update_task',
            callback: function(r) {
            }
        });

	},
});
