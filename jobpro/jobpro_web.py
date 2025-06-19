import frappe
import requests
import random
import string
from erpnext.setup.utils import get_exchange_rate
from frappe.utils import fmt_money
import re

@frappe.whitelist(allow_guest=True)
def new_user(full_name, email, password, mobile_no, source, reference_source, media_source, country_name):
	user = frappe.new_doc("User")
	user.first_name = full_name
	user.email = email
	user.mobile_no = mobile_no
	user.new_password = password
	user.role_profile_name = "JOBPRO"
	user.insert()
	user.save()
	candidate = new_candidate(full_name, email, mobile_no, source, reference_source, media_source, country_name)
	return candidate

def new_candidate(full_name, email, mobile_no, source, reference_source, media_source, country_name):
	if not source == "REFERPRO" and not reference_source:
		candidate = frappe.new_doc("Candidate")
		candidate.given_name = full_name
		candidate.mail_id = email
		candidate.mobile_number = mobile_no
		candidate.position = 'JOBPRO'
		candidate.country = country_name
		candidate.candidate_created_by = 'jobpro@groupteampro.com'
		if source == "Reference":
			candidate.source = "E-Reference"
			candidate.custom_referred_by = reference_source
		elif source == "Direct":
			candidate.source = "A-Portal"
		elif source == "Paper Advertisement":
			candidate.source = "B-Paper Advertisement"
		elif source == "Social Media":
			candidate.source = "C-Social Media"
			candidate.custom_social_media_platform = media_source
		else:
			candidate.source = "A-Portal"
		candidate.insert()
		candidate.save()
	return "Candidate created successfully"

@frappe.whitelist(allow_guest=True)
def forgot_password(email):
	user = frappe.get_doc("User", {"email": email})
	if user:
		reset_link = f"http://139.5.190.19:8080/frontend/reset-password?user={email}"
		message = f"""
			<p style="color: #05264e; font-weight: 700; font-size: 15px;">Dear {user.full_name},</p>
			<p>Please click the link below to reset your password:</p>
			<button style="border: 0px solid black; border-radius: 8px; color: white; padding: 3px; width: 140px; background-color: #0070cc;"><a href="{reset_link}" target="_blank" style="color: white; text-align: center; text-decoration: none;">Reset Password</a></button>
			<p>If you did not request a password reset, please ignore this email.</p>
			<p style="color: #0070cc;">Best regards,<br>Jobpro Team</p>
		"""
		frappe.sendmail(
			recipients=[email],
			subject="Reset Your Password",
			message=message,
			reference_doctype="User",
			reference_name=user.name,
			delayed=False,
		)
	else:
		frappe.throw("User with this email does not exist.")

@frappe.whitelist(allow_guest=True)
def update_password(email, password):
	user = frappe.get_doc("User", {"email": email})
	if user:
		user.new_password = password
		user.save(ignore_permissions=True)
		response = "success"
	else:
		response = "user doesn't exist"

	return response

@frappe.whitelist(allow_guest=True)
def get_candidate_details(email):
	candidate = frappe.get_doc("Candidate", {"mail_id": email})
	return candidate.as_dict()

@frappe.whitelist(allow_guest=True)
def get_referred_candidate(name):
	candidate = frappe.get_doc("Candidate", {"name": name})
	return candidate.as_dict()

@frappe.whitelist(allow_guest=True)
def update_resume(file, id):
	candidate = frappe.get_doc("Candidate", id)
	candidate.irf =  file
	candidate.save(ignore_permissions=True)

	return candidate

@frappe.whitelist(allow_guest=True)
def update_passport(file, id):
	candidate = frappe.get_doc("Candidate", id)
	candidate.passport =  file
	candidate.save(ignore_permissions=True)

	return candidate

@frappe.whitelist(allow_guest=True)
def change_profile(file, id):
	candidate = frappe.get_doc("Candidate", id)
	candidate.candidate_image =  file
	candidate.save(ignore_permissions=True)

@frappe.whitelist(allow_guest=True)
def edit_profile(profileData, id):
	candidate = frappe.get_doc("Candidate", id)
	candidate.given_name = profileData.get('fullName')
	candidate.location = profileData.get('location')
	candidate.mobile_number = profileData.get('mobile')
	candidate.badge = profileData.get('profileBadge')
	candidate.country = profileData.get('country')
	candidate.save(ignore_permissions=True)

	user = frappe.get_doc("User", profileData.get('emailId'))
	user.first_name = profileData.get('fullName')
	user.save(ignore_permissions=True)

@frappe.whitelist(allow_guest=True)
def contact_details(contactData, id):
	candidate = frappe.get_doc("Candidate", id)
	candidate.mobile_number = contactData.get('mobile')
	candidate.whatsapp_number = contactData.get('whatsappNo')
	candidate.mobile = contactData.get('mobile')
	candidate.country = contactData.get('country')
	candidate.save(ignore_permissions=True)

@frappe.whitelist(allow_guest=True)
def education_details(educationData, id):
	candidate = frappe.get_doc("Candidate", id)
	candidate.highest_degree = educationData.get('qualification')
	candidate.specialization = educationData.get('specialization')
	candidate.year_of_passing = educationData.get('year')
	candidate.save(ignore_permissions=True)

@frappe.whitelist(allow_guest=True)
def experience_details(experienceData, id):
	candidate = frappe.get_doc("Candidate", id)
	candidate.india_experience = experienceData.get('indExp')
	candidate.overseas_experience = experienceData.get('overseasExp')
	candidate.total_experience = int(experienceData.get('indExp')) + int(experienceData.get('overseasExp'))
	candidate.current_ctc = experienceData.get('currentCtc')
	candidate.currency_ctc = experienceData.get('currencyCtc')
	candidate.current_employer = experienceData.get('currentEmployer')
	candidate.expected_ctc = experienceData.get('expCtc')
	candidate.notice_period_months = experienceData.get('noPeriod')
	candidate.ctc_mentioned_in = experienceData.get('ctcMentionedIn')
	candidate.save(ignore_permissions=True)

@frappe.whitelist(allow_guest=True)
def personal_details(personalData, id):
	candidate = frappe.get_doc("Candidate", id)
	candidate.given_name = personalData.get('fullName')
	candidate.vaccination_status = personalData.get('vacStatus')
	candidate.nationality = personalData.get('nationality')
	candidate.date_of_birth = personalData.get('dob')
	candidate.location = personalData.get('location')
	if personalData.get('dob'):
		age = calculate_age(personalData.get('dob'))
		candidate.age = age
	candidate.ecr_status_candidate = personalData.get('ecrStatus')
	candidate.gender = personalData.get('gender')
	candidate.save(ignore_permissions=True)

from datetime import datetime
def calculate_age(dob: str):
	dob = datetime.strptime(dob, "%Y-%m-%d")
	today = datetime.today()
	age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
	age = int(age)
	return age

@frappe.whitelist(allow_guest=True)
def passport_details(passportData, id):
	candidate = frappe.get_doc("Candidate", id)
	candidate.passport_number = passportData.get('passNo')
	candidate.temp_passport_number = passportData.get('tempPassNo')
	candidate.passport_expiry_date = passportData.get('expiryDate')
	candidate.ecr_status_candidate = passportData.get('ecrStatus')
	candidate.save(ignore_permissions=True)

@frappe.whitelist(allow_guest=True)
def otp_request(mobile):
	phone_number = mobile
	otp = ''.join(random.choices(string.digits, k=6))

	api_key = "318865AQkupt3W9xLS5e4b98b8P1"
	sender_id = "THISPL"
	otp_message = f"Hi, Your resume has been shortlisted for { otp } position by a leading company in TEAMPRO HR & IT SERVICES. - TEAMPRO.Contact: +91 7305056208 / +91 7305056221."


	url = "https://api.msg91.com/api/sendhttp.php"

	data = {
		"authkey": api_key,
		"mobiles": phone_number,
		"sender": sender_id,
		"DLT_TE_ID": '1307161915541758343',
		"message": otp_message,
	}

	response = requests.post(url, data=data)
	print(response)

	if response.status_code == 200:
		return otp
	else:
		print("Failed to send OTP. Please try again.")

@frappe.whitelist(allow_guest=True)
def otp_verification(otpSent, otpValue, mobile):
	if otpSent == otpValue:
		user_data = frappe.db.sql("""select name, full_name from `tabUser` where mobile_no = '%s'""" %(mobile), as_dict=1)
		if user_data:
			user = user_data[0].name
			full_name = user_data[0].full_name
			candidate_data = frappe.db.sql("""select name from `tabCandidate` where mail_id = '%s'""" %(user), as_dict=1)
			if candidate_data:
				candidate = candidate_data[0].name
				from frappe.auth import LoginManager
				login_manager = LoginManager()
				login_manager.login_as(user)
				auth_token = frappe.generate_hash(length=32)
				frappe.cache().hset("auth_token", auth_token, user)
				result = {
					"status": "success",
					"message": candidate,
					"auth_token": auth_token,
					"full_name": full_name,
					"user": user,
				}
			else:
				result = 'candidate not found'
		else:
			result = 'user not found'
	else:
		result = "invalid"
	return result

@frappe.whitelist(allow_guest=True)
def get_inr_price(currency, amount):
	conversion = get_exchange_rate(currency, "INR")
	amt = conversion * amount
	amt = round(amt, 0)
	return fmt_money(amt, precision=0)

@frappe.whitelist(allow_guest=True)
def apply_jobs(task, candidate):
	task = frappe.get_doc("Task", task)
	candidate = frappe.get_doc("Candidate", candidate)
	if candidate.irf:
		task.append("custom_jobpro_candidates", {
			"candidate": candidate.name,
			"given_name": candidate.given_name,
			"status": candidate.pending_for,
		})
		task.save()
		# Send mail to hr
		message = f"""
			<p style="color: #05264e; font-weight: 700; font-size: 15px;">Dear HR,</p>
			<p></p>
			<p style="color: #05264e;">Candidate {candidate.name} has applied for the Job Post - {task.name}</p>
			<p style="color: #0070cc;">Best regards,<br>JOBPRO Team</p>
		"""
		frappe.sendmail(
			recipients=[task.custom_allocated_to or 'hr@groupteampro.com'],
			subject="Job Application - Reg",
			message=message,
			reference_doctype="Candidate",
			reference_name=candidate.name,
			delayed=False,
		)
		# Send mail to candidate
		message = f"""
			<p style="color: #05264e; font-weight: 700; font-size: 15px;">Dear {candidate.name},</p>
			<p></p>
			<p style="color: #05264e;">You have successfully applied for the job - {task.subject}. Our team will contact you soon</p>
			<p style="color: #0070cc;">Best regards,<br>JOBPRO Team</p>
		"""
		frappe.sendmail(
			recipients=[candidate.mail_id],
			subject="Job Application - Reg",
			message=message,
			reference_doctype="Candidate",
			reference_name=candidate.name,
			delayed=False,
		)
		return "true"
	else:
		return "false"

@frappe.whitelist(allow_guest=True)
def popup_url():
	url = frappe.db.get_value("Web Page", "jobpro", "custom_popup_banner")
	return url

@frappe.whitelist(allow_guest=True)
def get_applicant_counts(task, id):
	task = frappe.get_doc("Task", task)
	count = 0
	applied = "false"
	for row in task.custom_jobpro_candidates:
		if row.candidate == id:
			applied = "true"
		count += 1
	return count, applied

@frappe.whitelist(allow_guest=True)
def find_applied_jobs(task, id):
	task = frappe.get_doc("Task", task, id)
	applied = []
	for row in task.custom_jobpro_candidates:
		if row.candidate == id:
			applied.append("true")
	if "true" in applied:
		return applied
	else:
		return "false"

@frappe.whitelist(allow_guest=True)
def list_course():
	data = []
	qualification = frappe.db.sql("""
						select name
	  					from `tabQualification`
		   				where qualification_type in ("Vocational skills", "Graduate", "Post Graduate", "PhD")
						order by name
					""", as_dict=True
					)

	for qual in qualification:
		data.append(qual.name)
	return data

@frappe.whitelist(allow_guest=True)
def list_position():
	data = []
	position = frappe.db.sql("""
						select subject, name
	  					from `tabTask`
		   				where status in ("Pending Review", "Overdue", "Open", "Working")
								and service in ("REC-I", "REC-D")
						order by name
					""", as_dict=True
					)

	for pos in position:
		data.append(pos.subject + " - " + pos.name)
	return data

@frappe.whitelist(allow_guest=True)
def education_details_hsc(educationHSCData, id):
	candidate = frappe.get_doc("Candidate", id)
	for row in candidate.custom_education_details:
		if row.qualification == "HSC":
			candidate.remove(row)
	candidate.append("custom_education_details", {
		"school_univ":  educationHSCData.get('schoolNameHSC'),
		"year_of_passing": educationHSCData.get('yearHSC'),
		"class_per": educationHSCData.get('percentageHSC'),
		"qualification": 'HSC',
		"level": 'HSC',
		"state_board": educationHSCData.get('stateHSC'),
		"medium": educationHSCData.get('mediumHSC')
	})
	candidate.save(ignore_permissions=True)

@frappe.whitelist(allow_guest=True)
def get_school_hsc(email):
	data = []
	candidate = frappe.get_doc("Candidate", {"mail_id": email})
	for row in candidate.get("custom_education_details"):
		if row.qualification == "HSC":
			data.append({
				"schoolNameHSC": row.school_univ,
				"yearHSC": row.year_of_passing,
				"percentageHSC": row.class_per,
				"stateHSC": row.state_board,
				"mediumHSC": row.medium,
			})
	return data


@frappe.whitelist(allow_guest=True)
def education_details_sslc(educationSSLCData, id):
	candidate = frappe.get_doc("Candidate", id)
	for row in candidate.custom_education_details:
		if row.qualification == "SSLC":
			candidate.remove(row)
	candidate.append("custom_education_details", {
		"school_univ":  educationSSLCData.get('schoolNameSSLC'),
		"year_of_passing": educationSSLCData.get('yearSSLC'),
		"class_per": educationSSLCData.get('percentageSSLC'),
		"qualification": 'SSLC',
		"level": 'SSLC',
		"state_board": educationSSLCData.get('stateSSLC'),
		"medium": educationSSLCData.get('mediumSSLC')
	})
	candidate.save(ignore_permissions=True)

@frappe.whitelist(allow_guest=True)
def get_school_sslc(email):
	data = []
	candidate = frappe.get_doc("Candidate", {"mail_id": email})
	for row in candidate.get("custom_education_details"):
		if row.qualification == "SSLC":
			data.append({
				"schoolNameSSLC": row.school_univ,
				"yearSSLC": row.year_of_passing,
				"percentageSSLC": row.class_per,
				"stateSSLC": row.state_board,
				"mediumSSLC": row.medium,
			})
	return data

def is_valid_email(email):
	pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
	if re.match(pattern, email) is not None:
		return "valid mail"

def is_valid_mobile(mobile):
	pattern = r'^[0-9]{10}$'
	if re.match(pattern, mobile) is not None:
		return "valid mobile no."

def is_valid_passport(passport):
	pattern = r'^[A-Z0-9]{8}$'
	if re.match(pattern, passport) is not None:
		return "valid passport"

def is_valid_ifsc(ifsc_code):
	pattern = r'^[A-Z]{4}0[A-Z0-9]{6}$'
	if re.match(pattern, ifsc_code.upper()) is not None:
		return "valid ifsc code"

def is_valid_aadhaar(aadhaar):
	aadhaar = aadhaar.replace(" ", "")
	pattern = r'^[2-9][0-9]{11}$'
	if re.match(pattern, aadhaar) is not None:
		return "valid aadhaar"

@frappe.whitelist(allow_guest=True)
def refer_candidate(name, email, mobile, passport, candidate, candidate_email, position=None):
	# candidate_doc = frappe.db.get_value("Candidate", candidate)
	# friend = candidate_doc.given_name
	friend = "Amar Karthick P"
	if position:
		actual_position = position[:-10]
		position_message = f' for the position of {actual_position}'
	message = f'''
				<p>Dear {name},</p>
				<p>You are receiving this email from JOBPRO because your friend {friend} referred you for an abroad job{position_message}.</p>
				<p>If you are interested, <a href="http://139.5.190.19:8080/registration/?reference={candidate}&email={email}&name={name.replace(' ', '%20')}&phone={mobile}">click here</a></p>
				<p>Best Regards,<br>JOBPRO Team</p>
			'''
	if is_valid_email(email) == "valid mail":
		if not frappe.db.exists("Candidate", {"mail_id": email}):
			if is_valid_mobile(mobile) == "valid mobile no.":
				if not frappe.db.exists("Candidate", {"mobile_number": mobile}):
					if is_valid_passport(passport) == "valid passport":
						if not frappe.db.exists("Candidate", {"passport_number": passport}):
							cand = frappe.new_doc("Candidate")
							cand.given_name = name
							cand.mail_id = email
							cand.mobile_number = mobile
							cand.task = position[-7:]
							cand.position = position
							cand.passport_number = passport
							cand.source = "REFERPRO"
							cand.candidate_created_by = candidate_email
							cand.insert()
							frappe.sendmail(
								recipients=[email],
								subject="Your friend referred you for an Abroad Job!",
								message=message,
								reference_doctype="Candidate",
								reference_name=name,
								delayed=False,
							)
							queue_create_supplier_and_item(candidate, candidate_email, name, email)
							return "Candidate created successfully"
						else:
							return "Passport number already exists"
					else:
						return "Invalid passport number"
				else:
					return "Mobile number already exists"
			else:
				return "Invalid mobile number"
		else:
			return "Email already exists"
	else:
		return "Invalid mail"

@frappe.whitelist(allow_guest=True)
def get_referral_candidate_details(candidate):
	owner = frappe.db.get_value("Candidate", candidate, "mail_id")
	candidate_list = frappe.db.get_all("Candidate", {"candidate_created_by": owner}, ["id", "given_name", "mail_id", "pending_for", "candidate_image"])
	return candidate_list

@frappe.whitelist(allow_guest=True)
def list_jobname():
	data = []
	jobnames = frappe.db.sql("""
						select subject, name
	  					from `tabTask`
		   				where service in ("REC-I", "REC-D")
							and status in ("Open", "Overdue", "Pending Review", "Working")
						order by subject
					""", as_dict=True
					)

	for name in jobnames:
		data.append(name.subject)
	return data




# import frappe
# from frappe import _

# @frappe.whitelist(allow_guest=True)
# def create_issue_from_mattermost_new():
# 	# form = frappe.local.form_dict

# 	# user_name = form.get("user_name", "Unknown")
# 	# text = form.get("text", "No message")

# 	# frappe.log_error(f"Received from {user_name}", text)

# 	# issue = frappe.new_doc("Issue")
# 	# issue.subject = f"Issue from Mattermost: {user_name}"
# 	# issue.description = text
# 	# issue.save()
# 	# frappe.db.commit()
# 	frappe.log_error("Message", "From mattermost")
# 	return "Issue Created"


@frappe.whitelist(allow_guest=True)
def check_user_to_converted(email):
	if frappe.db.exists("User", email):
		return True
	else:
		return False

@frappe.whitelist(allow_guest=True)
def get_points_from_task(task):
	doc = frappe.get_doc("Task", task)
	conversion = get_exchange_rate(doc.currency, "INR")
	amt = conversion * doc.amount
	amt = (amt*5/100)/10
	amt = round(amt, 0)
	return amt

@frappe.whitelist(allow_guest=True)
def get_referpro_profile(email):
	if frappe.db.exists("REFERPRO Profile", email):
		user = frappe.get_doc("REFERPRO Profile", email)
		if user:
			mobile_number = frappe.db.get_value("Candidate", {"mail_id": email}, "mobile_number")
			user_dict = user.as_dict()
			user_dict["primary_mobile"] = mobile_number
			return user_dict
	else:
		return "user doesn't exist"

@frappe.whitelist(allow_guest=True)
def update_referpro_profile(email=None, account_number=None, ifsc_code=None, name=None, primary_mobile=None, secondary_mobile=None, dob=None, passport_id=None, aadhaar_id=None, street_name=None, city=None, state=None, postal_code=None, country=None):
	if ifsc_code and is_valid_ifsc(ifsc_code) != "valid ifsc code":
		return "Invalid IFSC code"
	if passport_id and is_valid_passport(passport_id) != "valid passport":
		return "Invalid Passport ID"
	if aadhaar_id and is_valid_aadhaar(aadhaar_id) != "valid aadhaar":
		return "Invalid Aadhaar ID"
	if secondary_mobile and is_valid_mobile(secondary_mobile) != "valid mobile no.":
		return "Invalid Secondary Mobile Number"
	
	if frappe.db.exists("REFERPRO Profile", email):
		user = frappe.get_doc("REFERPRO Profile",email)
		user.account_number = account_number
		user.ifsc_code = ifsc_code
		user.passport_id = passport_id
		user.aadhaar_id = aadhaar_id

		user.full_name = name
		user.secondary_mobile = secondary_mobile
		user.passport_id = passport_id
		user.date_of_birth = dob

		user.street_name = street_name
		user.city = city
		user.state = state
		user.postal_code = postal_code
		user.country = country
		user.save(ignore_permissions=True)
	else:
		user = frappe.new_doc("REFERPRO Profile")
		user.email_id = email
		user.account_number = account_number
		user.ifsc_code = ifsc_code
		user.passport_id = passport_id
		user.aadhaar_id = aadhaar_id

		user.full_name = name
		user.secondary_mobile = secondary_mobile
		user.passport_id = passport_id
		user.date_of_birth = dob

		user.street_name = street_name
		user.city = city
		user.state = state
		user.postal_code = postal_code
		user.country = country
		user.insert()
	return "Saved"

@frappe.whitelist(allow_guest=True)
def queue_create_supplier_and_item(candidate, candidate_email, name, email):
	referral_candidate_code = frappe.db.get_value("Candidate", {"mail_id": email}, "name")
	frappe.enqueue(
		create_supplier_and_item,
		supplier_name=candidate,
		candidate_owner=candidate_email,
		item_code=referral_candidate_code,
		item_name=name
	)

@frappe.whitelist(allow_guest=True)
def create_supplier_and_item(supplier_name, candidate_owner, item_code, item_name):
	if not frappe.db.exists("Supplier", {"supplier_name": supplier_name}):
		supplier = frappe.new_doc("Supplier")
		supplier.supplier_name = supplier_name
		supplier.supplier_type = "Individual"
		supplier.insert()

	if not frappe.db.exists("Item", {"item_code": item_code}):
		item = frappe.new_doc("Item")
		item.item_code = item_code
		item.item_name = item_name
		item.is_stock_item = 0
		item.stock_uom = "Nos"
		item.item_group = "Candidates"
		item.gst_hsn_code = "998519"
		item.candidate_owner = candidate_owner
		item.insert()


@frappe.whitelist(allow_guest=True)
def get_candidate_id(userMail):
	candidate = frappe.db.get_value("Candidate", {"mail_id": userMail}, "name")
	return candidate

@frappe.whitelist(allow_guest=True)
def create_purchase_invoice(supplier, item):
	pi = frappe.new_doc("Purchase Invoice")
	pi.supplier = supplier
	
	pi.append("items", {
		"item_code": item,
		"qty": 1,
		"rate": 1000,
	})

	pi.insert()
	return "ok"

@frappe.whitelist(allow_guest=True)
def test_check():
	update_referpro_profile(email = "amar.p@groupteampro.com", account_number="7767899098")



