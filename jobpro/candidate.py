from email.mime import message
from shutil import ignore_patterns
import frappe
import pandas as pd

def update_api(**args):
	can = frappe.get_doc("Candidate")
	can.name = args['name']
	can.given_name = args['given_name']
	can.position =args ['position']
	can.passport_number = args['passport_number']
	can.mobile_number = args['mobile_number']
	can.mail_id = args['mail_id']
	can.age = args['age']
	can.dob = pd.to_datetime(args['dob']).date()
	can.india_experience = args['india_experience']
	can.total_experience = args['total_experience']
	can.overseas_experience = args['overseas_experience']
	can.ecr_status = args ['ecr_status']
	# can.qualification= args ['qualification']
	# can.specialization = args['specialization']
	can.save(ignore_permissions=True)
	frappe.db.commit()
	
	return args



# def file_list():
# 	pdf = frappe.db.get_value('File', {'attached_to_doctype': 'Candidate'}['attached_to_name'])
# 	for i in pdf:
# 		print (i)


# def file_list(candidate):
# 	pdf = frappe.db.get_all('File', {'attached_to_doctype': 'Candidate', 'attached_to_name': candidate.name}, ['*'])
# 	frappe.errprint("HI")

@frappe.whitelist()
def get_data(passport_number):
	# frappe.errprint("HIII")
	ps_id = frappe.db.get_all("Candidate",{'passport_number':passport_number},['given_name','candidate_image','nationality','ecr_status_candidate','date_of_birth','age','vaccination_status','vaccine_name','is_married','location','country','mail_id','mobile_number','mobile','highest_degree','specialization','year_of_passing','india_experience','overseas_experience','irf','passport','biometric_details','vacination_attachment','dob'])
	if ps_id:
		# frappe.errprint(ps_id) 
		return ps_id


