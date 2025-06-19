# -*- coding: utf-8 -*-
# Copyright (c) 2020, teamPRO and Contributors
# See license.txt
from __future__ import unicode_literals
from inspect import classify_class_attrs
import frappe
from frappe.model.document import Document
from frappe.utils import today, flt, add_days, date_diff
from frappe.utils import cstr, formatdate, add_months, cint, fmt_money, add_days, flt
from frappe.utils.data import nowdate
from erpnext.setup.utils import get_exchange_rate


class TestClosure(unittest.TestCase):
	pass


