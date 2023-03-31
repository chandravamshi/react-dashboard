// components
import TranslateIcon from '@mui/icons-material/Translate';
import PaymentIcon from '@mui/icons-material/Payment';
import SvgIconStyle from '../../../components/SvgIconStyle';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AssessmentIcon from '@mui/icons-material/Assessment';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  translate: <TranslateIcon />,
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  invoice: getIcon('ic_invoice'),
  payment: <PaymentIcon />,
  groups: <GroupsIcon />
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'General',
    items: [
      { title: 'Offers', path: '/dashboard/offers_DONTOPENTHEPAGE', icon: ICONS.invoice },
      // { title: 'Two', path: '/dashboard/two', icon: ICONS.ecommerce },
      // { title: 'Three', path: '/dashboard/three', icon: ICONS.analytics },
    ],
  },

  // Mobile APP MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Mobile App',
    items: [
      {
        title: 'App Users',
        path: '/dashboard/patients',
        icon: ICONS.user,
      },
      {
        title: 'Strings',
        path: '/dashboard/strings',
        icon: ICONS.translate,
      },
      {
        title: 'Template',
        path: '/dashboard/insertContent',
        icon: ICONS.ecommerce,
      },
    ],
  },

  // PATIENTS
  // ----------------------------------------------------------------------
  {
    subheader: 'Patients',
    items: [
      { title: 'PRP Patients', path: '/dashboard/prp-patients', icon: ICONS.groups },
      { title: 'HP Patients', path: '/dashboard/hp-patients', icon: ICONS.groups },
    ],
  },

  // PAYMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Payment',
    items: [
      { title: 'PRP Point of Sale', path: '/dashboard/prp-pos', icon: ICONS.payment },
      { title: 'HP Point of Sale', path: '/dashboard/hp-pos', icon: ICONS.payment },
    ],
  },

  // AFFILIATE
  // ----------------------------------------------------------------------
  {
    subheader: 'Affiliate',
    items: [
      { title: 'Partners', path: '/dashboard/partners', icon: <HandshakeIcon /> },
      { title: 'Reports', path: '/dashboard/partner-reports', icon: <AssessmentIcon /> },
    ],
  },

  // SETTINGS
  // ----------------------------------------------------------------------
  {
    subheader: 'Settings',
    items: [
      { title: 'Users', path: '/dashboard/users', icon: ICONS.user },
    ],
  },
];

export default sidebarConfig;
