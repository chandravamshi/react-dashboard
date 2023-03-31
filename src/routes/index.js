import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import LoadingScreen from '../components/LoadingScreen';
import AuthGuard from 'guards/AuthGuard';
import GuestGuard from 'guards/GuestGuard';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        { path: 'login', element: <GuestGuard><LoginPage /></GuestGuard> },
      ],
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/home" replace />, index: true },
        { path: 'home', element: <HomePage /> },
        { path: 'insertContent', element: <InsertTemplateContentPage /> },
        {
          path: 'users',
          children: [
            { element: <UsersListPage />, index: true },
          ]
        },
        {
          path: 'patients',
          children: [
            { element: <PatientsListPage />, index: true },
            { path: ':id', element: <PatientDetailsPage /> },
            // { path: ':id/edit', element: <PageTwo /> }
          ]
        },
        {
          path: 'strings',
          children: [
            { element: <StringsListPage />, index: true },
          ]
        },
        {
          path: 'offers',
          children: [
            { element: <OffersListPage />, index: true },
            // { path: 'create/:id', element: <CreateOfferPage /> },
          ]
        },
        {
          path: 'prp-pos',
          children: [
            { element: <PointOfSalePage />, index: true },
          ]
        },
        {
          path: 'hp-pos',
          children: [
            { element: <PointOfSalePage />, index: true },
          ]
        },
      ],
    },
    {
      path: '/dashboard/offers/create/:id',
      element: (
        <AuthGuard>
          <CreateOfferPage />
        </AuthGuard>
      ),
    },
    {
      path: '/dashboard/offers/:id',
      element: <ViewOfferPage />,
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Auth
const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));

// Offers
const CreateOfferPage = Loadable(lazy(() => import('../pages/dashboard/offers/CreateOfferPage')));
const ViewOfferPage = Loadable(lazy(() => import('../pages/dashboard/offers/ViewOfferPage')));

// Dashboard
const HomePage = Loadable(lazy(() => import('../pages/dashboard/home/HomePage')));
const UsersListPage = Loadable(lazy(() => import('../pages/dashboard/users/UsersListPage')));
const PatientsListPage = Loadable(lazy(() => import('../pages/dashboard/patients/PatientsListPage')));
const PatientDetailsPage = Loadable(lazy(() => import('../pages/dashboard/patients/PatientDetailsPage')));
const StringsListPage = Loadable(lazy(() => import('../pages/dashboard/strings/StringsListPage')));
const OffersListPage = Loadable(lazy(() => import('../pages/dashboard/offers/OffersListPage')));
const PointOfSalePage = Loadable(lazy(() => import('../pages/dashboard/payment/PointOfSale')));
const InsertTemplateContentPage = Loadable(lazy(() => import('../pages/dashboard/offers/InsertTemplateContentPage')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
