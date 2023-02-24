import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginReqBody {}
interface LoginResponse {}

export const customApi = createApi({
  reducerPath: "customApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://174.138.9.133/",
    prepareHeaders: async (headers, { getState }) => {
      const token = localStorage.getItem("user_token");
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
      query: () => ({
        url: `/get-lgas/`,

        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchIndustriesQuery,
  useFetchStatesQuery,
  useFetchLgasQuery,
} = customApi;

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://174.138.9.133/api/v1/",
    prepareHeaders: async (headers, { getState }) => {
      const token = localStorage.getItem("user_token");
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
        method: "POST",
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
} = appApi;

export const parseErrorMessage = (result: any) => {
  return (
    result.error?.data?.message ??
    result.error?.status ??
    "An error occurred, please try again."
  );
};
