import axios from 'axios';

const apiService = {
  async fetchData({ statusFilter = '', serviceFilter = '', limit = '', vacFilter = '' } = {}) {
    const apiKey = '4aedf12d2330fbe';
    const apiSecret = '2d72f01e8e1a60a';
    const baseUrl = '/api/resource/Task';

    const params = {
      limit_page_length: limit,
      order_by: 'creation desc',
      fields: JSON.stringify(['*']),
    };

    // Add filters to params
    const filters = [];

    if (statusFilter) {
      filters.push(['status', 'in', statusFilter]);
    }
    if (serviceFilter) {
      filters.push(['service', 'in', serviceFilter]);
    }
    if (vacFilter) {
      filters.push(['vac', '!=', vacFilter]);
    }

    if (filters.length) {
      params.filters = JSON.stringify(filters);
    }

    try {
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `token ${apiKey}:${apiSecret}`,
        },
        params: params,
      });
      // console.log('API Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data from ERPNext:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
      }
      throw error;
    }
  },

  async getTaskDetails(taskName) {
    const apiKey = '4aedf12d2330fbe';
    const apiSecret = '2d72f01e8e1a60a';
    const baseUrl = `/api/resource/Task/${taskName}`;

    try {
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `token ${apiKey}:${apiSecret}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data from ERPNext:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
      }
      throw error;
    }
  },

async createUser(full_name, email, password, mobile_no, source, reference_source, media_source, country_name) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
    const apiUrl = '/api/method/jobpro.jobpro_web.new_user'; 
    try {
        const response = await axios.post(
            apiUrl,
            {full_name, email, password, mobile_no, source, reference_source, media_source, country_name}, 
            {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `token ${apiKey}:${apiSecret}`,
                },
            }
        );
        return response;
    } catch (error) {
        return error.response.data.exception;
    }
},
async changePassword(email) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.forgot_password';  

  try {
      const response = await axios.post(
          apiUrl,
          { email }, 
          {
              headers: {
                  'Authorization': `token ${apiKey}:${apiSecret}`,
              },
          }
      );

      return response;
  } catch (error) {
      // console.log(error.response.data.exc_type)
      return error.response;
  }
},
async updatePassword(email, password) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.update_password';  
  try {
      const response = await axios.post(apiUrl,{ email, password }, 
          {
              headers: {
                  'Authorization': `token ${apiKey}:${apiSecret}`,
              },
          }
      );

      return response;
  } catch (error) {
      // console.log(error.response.data.exc_type)
      return error.response;
  }
},

async getCandidateDetails(email) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.get_candidate_details';  
  try {
      const response = await axios.post(apiUrl,{ email }, 
          {
              headers: {
                  'Authorization': `token ${apiKey}:${apiSecret}`,
              },
          }
      );

      return response;
  } catch (error) {
      // console.log(error.response.data.exc_type)
      return error.response;
  }
},
async referralDetails(name) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.get_referred_candidate';
  try {
      const response = await axios.post(apiUrl,{ name }, 
          {
              headers: {
                  'Authorization': `token ${apiKey}:${apiSecret}`,
              },
          }
      );

      return response;
  } catch (error) {
      console.log(error.response.data.exc_type)
      return error.response;
  }
},

async updateResume(file, id) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.update_resume';  
  try {
    const response = await axios.post(apiUrl, {file, id}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
            // "Content-Type": "multipart/form-data", 
        },
  });
      // console.log(response)
      return response;
  } catch (error) {
      return error.response;
  }
},

async updatePassport(file, id) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.update_passport';  
  try {
    const response = await axios.post(apiUrl, {file, id}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`, 
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async changeProfileFromJobpro(file, id) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.change_profile';  
  try {
    const response = await axios.post(apiUrl, {file, id}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
            // "Content-Type": "multipart/form-data", 
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async otpLogin(mobile) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.otp_request';  
  try {
    const response = await axios.post(apiUrl, {mobile}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
            // "Content-Type": "multipart/form-data", 
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async otpVerification(otpSent, otpValue, mobile) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.otp_verification';  
  console.log(otpValue);
  if (otpValue) {
  try {
    const response = await axios.post(apiUrl, {otpSent, otpValue, mobile}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
            // "Content-Type": "multipart/form-data", 
        },
  });
      
      return response;
  } catch (error) {
      return error.response;
  }
}
},

async convertToINR(currency, amount) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.get_inr_price';  
  try {
    const response = await axios.post(apiUrl, {currency, amount}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async getApplicantCounts(task, id) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.get_applicant_counts';  
  try {
    const response = await axios.post(apiUrl, {task, id}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async findAppliedJobs(task, id) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.find_applied_jobs';  
  try {
    const response = await axios.post(apiUrl, {task, id}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async applyJobs(task, candidate) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.apply_jobs';  
  try {
    const response = await axios.post(apiUrl, {task, candidate}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async getPopUrl() {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.popup_url';  
  try {
    const response = await axios.post(apiUrl, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async getQualificationList() {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.list_course';  
  try {
    const response = await axios.post(apiUrl, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async getPositionList() {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.list_position';  
  try {
    const response = await axios.post(apiUrl, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async candidateReferral(name, email, mobile, passport, candidate, candidate_email, position) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.refer_candidate';  
  try {
    const response = await axios.post(apiUrl, {name, email, mobile, passport, candidate, candidate_email, position}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async getReferralsFromCandidate(candidate) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.get_referral_candidate_details';  
  try {
    const response = await axios.post(apiUrl, {candidate}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async getJobnameList() {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.list_jobname';  
  try {
    const response = await axios.post(apiUrl, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async fetchCandidateDirectly({ ownerFilter = '', limit = '' } = {}) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const baseUrl = '/api/resource/Candidate';

  const params = {
    limit_page_length: limit,
    order_by: 'creation desc',
    fields: JSON.stringify(['name', 'given_name', 'mail_id', 'pending_for', 'task', 'mobile_number', 'position', 'candidate_image']),
  };

  // Add filters to params
  const filters = [];

  if (ownerFilter) {
    filters.push(['candidate_created_by', 'in', ownerFilter]);
  }

  if (filters.length) {
    params.filters = JSON.stringify(filters);
  }

  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `token ${apiKey}:${apiSecret}`,
      },
      params: params,
    });
    // console.log('API Response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data from ERPNext:', error);
    if (error.response) {
      console.log('Error response data:', error.response.data);
    }
    throw error;
  }
},

async getConvertedStatus(email) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.check_user_to_converted';  
  try {
    const response = await axios.post(apiUrl, {email}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async pointsCalculation(task) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.get_points_from_task';  
  try {
    const response = await axios.post(apiUrl, {task}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async get_referpro_profile(email) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.get_referpro_profile';  
  try {
    const response = await axios.post(apiUrl, {email}, {
      
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

// async update_referpro_profile_data(email, account_number, ifsc_code, name, primary_mobile, secondary_mobile, dob, passport_id, aadhaar_id, street_name, city, state, postal_code, country) {
//   const apiKey = '4aedf12d2330fbe';
//   const apiSecret = '2d72f01e8e1a60a';
//   const apiUrl = '/api/method/jobpro.jobpro_web.update_referpro_profile';  
//   try {
//     const response = await axios.post(apiUrl, {email, account_number, ifsc_code, name, primary_mobile, secondary_mobile, dob, passport_id, aadhaar_id, street_name, city, state, postal_code, country}, {
      
//         headers: {
//             "Authorization": `token ${apiKey}:${apiSecret}`,
//         },
//   });
//       return response;
//   } catch (error) {
//     console.log(error.response.data.exc_type)
//       return error.response;
//   }
// },

async update_referpro_profile_data(email, account_number, ifsc_code, name, primary_mobile, secondary_mobile, dob, passport_id, aadhaar_id, street_name, city, state, postal_code, country) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.update_referpro_profile';  
  try {
    const response = await axios.post(apiUrl, {email, account_number, ifsc_code, name, primary_mobile, secondary_mobile, dob, passport_id, aadhaar_id, street_name, city, state, postal_code, country}, {
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async getCandidateID(userMail) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.get_candidate_id';  
  try {
    const response = await axios.post(apiUrl, {userMail}, {
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

async createPurchaseInvoice(supplier, item) {
  const apiKey = '4aedf12d2330fbe';
  const apiSecret = '2d72f01e8e1a60a';
  const apiUrl = '/api/method/jobpro.jobpro_web.create_purchase_invoice';  
  try {
    const response = await axios.post(apiUrl, {supplier, item}, {
        headers: {
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
  });
      return response;
  } catch (error) {
      return error.response;
  }
},

};

export default apiService;