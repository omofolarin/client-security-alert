import {
  Dashboard,
  ForgotPassword,
  Incidents,
  Login,
  Otp,
  Packages,
  Register,
  RegisterOrganization,
  RegisterUser,
  Roles,
  Settings,
  Tickets,
} from "./pages";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/otp",
      element: <Otp />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/signup/user",
      element: <RegisterUser />,
    },
    {
      path: "/signup/organization",
      element: <RegisterOrganization />,
    },

    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },

    {
      path: "/home",
      element: <Dashboard />,
    },

    {
      path: "/home/settings",
      element: <Settings />,
    },

    {
      path: "/home/incidents",
      element: <Incidents />,
    },

    {
      path: "/home/roles",
      element: <Roles />,
    },

    {
      path: "/home/tickets",
      element: <Tickets />,
    },

    {
      path: "/home/packages",
      element: <Packages />,
    },
  ],
  {}
);

/**
 *
 *  Packages are subscription packages /subscription
 *  - name, duration, no of users, price, package-type: individual/company
 *
 *  incident & locations
 *
 *  tickets & reply
 *
 *  roles  - super user, super admin, company user and user
 */
