// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
  }
  
  const ROOTS_AUTH = '/auth';
  const ROOTS_DASHBOARD = '/dashboard';
  
  // ----------------------------------------------------------------------
  
  export const PATH_AUTH = {
    // root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    // register: path(ROOTS_AUTH, '/register'),
    // verify: path(ROOTS_AUTH, '/verify'),
    // resetPassword: path(ROOTS_AUTH, '/reset-password'),
  };
  
  export const PATH_PAGE = {
    // contact: '/contact',
    page404: '/404',
  };
  
  export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
      home: path(ROOTS_DASHBOARD, '/home'),
      offers: path(ROOTS_DASHBOARD, '/offers'),
      offersById: path(ROOTS_DASHBOARD,'/offers/:id')
    },
    appManagement: {
      patients: path(ROOTS_DASHBOARD, '/patients'),
      users: path(ROOTS_DASHBOARD, '/users'),
      strings: path(ROOTS_DASHBOARD, '/strings'),
    },
    payment: {
      prp_pos: path(ROOTS_DASHBOARD, '/prp-pos'),
      hp_pos: path(ROOTS_DASHBOARD, '/hp-pos'),
    },
  };
  