import {
  CreateIncident,
  Dashboard,
  ForgotPassword,
  IncidentTypes,
  Incidents,
  Kyc,
  Login,
  Otp,
  Packages,
  Register,
  RegisterOrganization,
  RegisterUser,
  Roles,
  Settings,
  Tickets,
  Users,
  ViewIncident,
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
      path: "/kyc",
      element: <Kyc />,
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
      path: "/home/incidents/:id",
      element: <ViewIncident />,
    },

    {
      path: "/home/incidents/types",
      element: <IncidentTypes />,
    },

    {
      path: "/home/incidents/create",
      element: <CreateIncident />,
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
      path: "/home/subscriptions",
      element: <Packages />,
    },

    {
      path: "/home/users",
      element: <Users />,
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
