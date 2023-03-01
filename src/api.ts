import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginReqBody {}
interface LoginResponse {}

type Roles = "companyAdmin" | "superAdmin" | "companyUser" | "admin" | "user";

const getUserRoles = (user) => {
  const roles = [];

  if (user.company_admin) return roles;
};

export const customApi = createApi({
  reducerPath: "customApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://174.138.9.133/",
    prepareHeaders: async (headers, { getState }) => {
      const token = localStorage.getItem("user_token");
      console.log({ token });
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchIndustries: build.query<{}, LoginReqBody>({
      query: () => ({
        url: `/get-industries/`,
        method: "GET",
      }),
    }),

    fetchStates: build.query<{}, LoginReqBody>({
      query: () => ({
        url: `/get-states/`,
        method: "GET",
      }),
    }),

    fetchLgas: build.query<{}, LoginReqBody>({
      query: (state) => ({
        url: `/get-lgas/?state=${state}`,

        method: "GET",
      }),
    }),

    fetchIncidentTypes: build.query<{}, LoginReqBody>({
      query: () => ({
        url: `/get-incident-type/`,
        method: "GET",
      }),
    }),

    fetchIncidentNature: build.query<{}, LoginReqBody>({
      query: () => ({
        url: `/get-incident-nature/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchIndustriesQuery,
  useFetchStatesQuery,
  useFetchLgasQuery,
  useFetchIncidentTypesQuery,
  useFetchIncidentNatureQuery,
} = customApi;

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://174.138.9.133/api/v1/",
    prepareHeaders: async (headers, { getState }) => {
      const token = localStorage.getItem("user_token");
      console.log({ token });
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginReqBody>({
      query: (body) => ({
        url: `/auth/login/`,
        method: "POST",
        body,
      }),
    }),

    userSignUp: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/auth/register/customer/`,
        method: "POST",
        body,
      }),
    }),

    organizationSignUp: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/auth/register/company/`,
        method: "POST",
        body,
      }),
    }),

    fetchUserProfile: build.query<{}, {}>({
      query: () => ({
        url: `/profile/user/`,
        method: "GET",
      }),
    }),

    fetchOrganizationProfile: build.query<{}, {}>({
      query: () => ({
        url: `/profile/company/`,
        method: "GET",
      }),
    }),

    updateUserProfile: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/profile/user/`,
        method: "PUT",
        body,
      }),
    }),

    updateCompanyProfile: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/profile/company/`,
        method: "PUT",
        body,
      }),
    }),
    submitOtp: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/auth/verify-otp/`,
        method: "POST",
        body,
      }),
    }),

    sendOtp: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/auth/send-otp/`,
        method: "POST",
        body,
      }),
    }),

    resendOtp: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/auth/resend-otp/`,
        method: "POST",
        body,
      }),
    }),

    submitKyc: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/profile/user/kyc-update/`,
        method: "PUT",
        contentType: "application/x-www-form-urlencoded",
        body,
      }),
    }),

    resetPassword: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/auth/change-password/`,
        method: "POST",
        body,
      }),
    }),

    fetchIncidents: build.query<{}, LoginReqBody>({
      query: () => ({
        url: `/incident/`,
        method: "GET",
      }),
    }),

    addIncident: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/incident/`,
        method: "POST",
        body,
      }),
    }),

    approveIncident: build.mutation<{}, { id: string }>({
      query: ({ id }) => ({
        url: `/company/incident/${id}/approve/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useUserSignUpMutation,
  useOrganizationSignUpMutation,
  useSubmitOtpMutation,
  useResendOtpMutation,
  useSubmitKycMutation,
  useResetPasswordMutation,
  useFetchIncidentsQuery,
  useAddIncidentMutation,
  useUpdateCompanyProfileMutation,
  useUpdateUserProfileMutation,
  useFetchOrganizationProfileQuery,
  useFetchUserProfileQuery,
  useApproveIncidentMutation,
} = appApi;

export const parseErrorMessage = (result: any) => {
  if (
    result.error?.data?.message &&
    typeof result.error?.data?.message === "string"
  ) {
    return result.error?.data?.message;
  } else if (
    result.error?.data?.code &&
    typeof result.error?.data?.code === "string" &&
    result.error?.data?.detail &&
    typeof result.error?.data?.detail === "string"
  ) {
    return result.error?.data?.detail;
  } else if (result.error?.status && typeof result.error?.status === "string") {
    return result.error?.status;
  }

  return "An error occurred, please try again.";
};
