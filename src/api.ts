import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginReqBody {}
interface LoginResponse {}

export const customApi = createApi({
  reducerPath: "customApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://174.138.9.133/",
    prepareHeaders: async (headers) => {
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
    prepareHeaders: async (headers) => {
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

    fetchIncidents: build.mutation<
      {},
      {
        search?: string;
        state?: string;
        incident_type?: string;
        lga?: string;
      }
    >({
      query: (params) => {
        const query = {};
        if (params.search) {
          query["search"] = params.search;
        }
        if (params.incident_type) {
          query["incident_type"] = params.incident_type;
        }
        if (params.lga) {
          console.log("got here...");
          query["lga"] = params.lga;
        }
        if (params.state) {
          query["state"] = params.state;
        }

        let queryString = "";
        if (Object.keys(query).length) {
          Object.entries(query).map(([key, value], i) => {
            console.log(key);
            queryString =
              queryString +
              `${key}=${value}${queryString.length - 1 !== i ? "&" : ""}`;
          });
        }

        console.log({ queryString, params });
        return {
          url: `/incident/?${queryString}`,
          method: "GET",
        };
      },
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
  useFetchIncidentsMutation,
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
