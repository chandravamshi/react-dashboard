const stringsEndpoints = {
  listStrings: '/api/strings/stringslist',
  createString: '/api/strings/add-string',
  updateString: '/api/strings/update',
  deleteString: '/api/strings/delete-string',
  mutlipleActionsStrings: '/api/strings/multi-action',
};

// Dashboard users
const usersEndpoints = {
  login: '/api/dashboard/login',
  renewAccessToken: '/api/dashboard/renew-access',
  listUsers: '/api/dashboard/userlist',
  createUser: '/api/dashboard/create-user',
  updateUser: '/api/dashboard/update-user',
  sendUserResetPasswordEmail: '/api/dashboard/forgot-password',
};

// App users
const patientsEndpoints = {
  getPatientById: '/api/patients/get-patient',
  listPatients: '/api/patients/',
  createPatient: '/api/patients/create-patient',
  updatePatient: '/api/patients/update-patient',
  sendPatientResetPasswordEmail: '/api/patients/forgot-password',
};

const leadsEndpoints = {
  getLeadById: '/api/leads/find',
};

const offersEndpoints = {
  getOffersList: '/api/offers/',
  // getOffersListWithTemplateAndData: '/api/offers/',
  // getOfferTemplates: '/api/offers/list-templates',
  getOffersListWithTemplateAndData: 'http://localhost:5001/offers/get-templates',
  getOfferTemplateById: '/api/offers/find-template',
  getTmeplateByIdAndSectionContents: 'http://localhost:5001/offers/get-template-and-sections',
  createOffer: '/api/offers/create-offer',
  getOfferById: '/api/offers/find-offer',
};

const endpoints = {
  ...stringsEndpoints,
  ...usersEndpoints,
  ...patientsEndpoints,
  ...leadsEndpoints,
  ...offersEndpoints,
};

export default endpoints;
