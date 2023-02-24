import * as yup from "yup";

import { Box, Button, Link, Paper, Stack, Typography } from "@mui/material";
import { useResendOtpMutation, useSubmitOtpMutation } from "../../api";

import OtpInput from "react-otp-input";
import React from "react";
import capitalize from "lodash.capitalize";
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
  const [resendOtp, resetOtpResult] = useResendOtpMutation();
  const [sessionEmail] = useLocalStorage<string | null>("session-email", null);
  const otpInput = register("otp");

  React.useEffect(() => {
    console.log({ result: result.isSuccess });
    if (result.isSuccess) {
      navigate('/home')
    }
  }, [result.isSuccess]);

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
              <Link
                href="/signup"
                sx={{ textDecoration: "unset", fontSize: "14px" }}
              >
                Resend otp
              </Link>
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
                  <Button
                    disableElevation
                    variant="contained"
                    type="submit"
                    sx={{ textTransform: "capitalize" }}
                    disabled={!isValid}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
