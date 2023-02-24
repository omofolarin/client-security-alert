import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginReqBody {}
interface LoginResponse {}

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://174.138.9.133/api/v1/" }),
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
        url: `/user`,
        method: "POST",
        body,
      }),
    }),

    resetPassword: build.mutation<{}, LoginReqBody>({
      query: (body) => ({
        url: `/user`,
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
