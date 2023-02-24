import * as yup from "yup";

import { Box, Button, Link, Paper, Stack, Typography } from "@mui/material";
import {
  parseErrorMessage,
  useResendOtpMutation,
  useSubmitOtpMutation,
} from "../../api";

import { LoadingButton } from "@mui/lab";
import OtpInput from "react-otp-input";
import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useOtpStyle } from "../../components";
import { yupResolver } from "@hookform/resolvers/yup";

interface OtpForm {
  otp: string;
}

const formSchema = yup.object().shape({
  otp: yup.string().required(),
});

const OTP_WAIT_TIME = 40;
export const Otp = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<OtpForm>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const navigate = useNavigate();
  const otpStyles = useOtpStyle({ size: "medium" });
  const [submitOtp, result] = useSubmitOtpMutation();
  const [resendOtp, resendOtpResult] = useResendOtpMutation();
  const [sessionEmail] = useLocalStorage<string | null>("session-email", null);
  const [otpTimer, setOtpTimer] = React.useState(0);

  const otpInput = register("otp");

  React.useEffect(() => {
    resendOtp({ email: sessionEmail });
  }, [sessionEmail]);

  React.useEffect(() => {
    if (result.isSuccess) {
      const data = result.data;
      navigate(`/home`);
    } else if (result.isError) {
      console.log("caught error", result.error);
      toast.error(parseErrorMessage(result), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [result.isSuccess, result?.isError, result?.data]);

  React.useEffect(() => {
    if (resendOtpResult.isSuccess) {
      setOtpTimer(OTP_WAIT_TIME);
      toast.success("Sent an OTP to your email!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (resendOtpResult.isError) {
      console.log("caught error", resendOtpResult.error);
      toast.error(`Error sending OTP: ${parseErrorMessage(result)}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [
    resendOtpResult.isSuccess,
    resendOtpResult?.isError,
    resendOtpResult?.data,
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (otpTimer <= OTP_WAIT_TIME && otpTimer > 0) {
        setOtpTimer(otpTimer - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [otpTimer]);

  const onSubmit = async (values: OtpForm) => {
    if (sessionEmail) {
      await submitOtp({
        email: sessionEmail,
        code: values.otp,
      });
    }
  };

  const onResendOtp = async (value: { email: string }) => {
    await resendOtp(value);
  };

  console.log({ errors, isValid });
  return (
    <Box
      width="100%"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "100%",
            xl: "25%",
            lg: "30%",
            md: "50%",
            sm: "60%",
            xs: "95%",
          },
          marginX: "auto",
          marginY: "auto",

          bgcolor: "yellow",
        }}
      >
        <Paper
          sx={{
            minHeight: "440px",
            width: "100%",
            paddingX: 4,
            paddingY: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight={500} fontSize={24}>
              Enter OTP
            </Typography>
            <Box>
              {otpTimer === 0 && (
                <Link
                  onClick={async () => {
                    if (!sessionEmail) {
                      toast.info("Can fetch your email address, please login");
                      return;
                    }
                    await onResendOtp({
                      email: sessionEmail,
                    });
                  }}
                  sx={{
                    textDecoration: "unset",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Resend otp
                </Link>
              )}

              {otpTimer > 0 && (
                <Typography>Receiving otp via email in {otpTimer}</Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ marginY: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.5}>
                <OtpInput
                  // {...otpInput}
                  value={watch("otp")}
                  onChange={(v: string) =>
                    setValue("otp", v, { shouldValidate: true })
                  }
                  numInputs={6}
                  separator={<Typography sx={{ paddingX: 0.5 }}>-</Typography>}
                  inputStyle={otpStyles.classes.inputBaseRoot}
                  containerStyle={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <Typography
                  textAlign={"center"}
                  variant="caption"
                  color="initial"
                  sx={{ marginBottom: "8px" }}
                >
                  An otp has been sent to your email address
                </Typography>
                <Box sx={{ width: "100%", marginY: 5 }}>
                  <LoadingButton
                    loading={result.isLoading}
                    disableElevation
                    variant="contained"
                    type="submit"
                    sx={{ textTransform: "capitalize" }}
                    disabled={!isValid}
                    fullWidth
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
