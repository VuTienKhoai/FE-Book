import { lazy, Suspense } from 'react';
// project import
import Loadable from 'components/Loadable';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from 'layout/Dashboard';
// render - login
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const PageBook = Loadable(lazy(() => import('pages/book/PageBook')));
const PagePost = Loadable(lazy(() => import('pages/postManagement/PostManagement')));
const AddBook = Loadable(lazy(() => import('pages/book/addbook/AddBook')));
const PageUser = Loadable(lazy(() => import('pages/user/ManagementUser')));
// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| AUTH ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'book-management',
      element: <PageBook />
    },
    {
      path: 'post-management',
      element: <PagePost />
    },
    {
      path: 'user-management',
      element: <PageUser />
    },
    {
      path: 'add-book',
      element: <AddBook />
    }
  ]
};
const AdminRoutes = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <DashboardDefault />
  // },
  // {
  //   path: 'color',
  //   element: <Color />
  // },
  // {
  //   path: 'dashboard',
  //   children: [
  //     {
  //       path: 'default',
  //       element: <DashboardDefault />
  //     }
  //   ]
  // },
  // {
  //   path: 'sample-page',
  //   element: <SamplePage />
  // },
  // {
  //   path: 'shadow',
  //   element: <Shadow />
  // },
  // {
  //   path: 'typography',
  //   element: <Typography />
  // },
  // {
  //   path: 'book-management',
  //   element: <PageBook />
  // },
  // {
  //   path: 'post-management',
  //   element: <PagePost />
  // },
  // {
  //   path: '*', // Route không hợp lệ
  //   element: <div>404 - Page Not Found</div>
  // }
  MainRoutes
]);

export default AdminRoutes;
