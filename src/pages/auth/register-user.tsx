import * as yup from "yup";

import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { parseErrorMessage, useUserSignUpMutation } from "../../api";

import { LoadingButton } from "@mui/lab";
import React from "react";
import { TextInput } from "../../components";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
});

interface OrganizationForm {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company_name: string;
  industry?: string;
}

export const RegisterUser = () => {
  const {
    register,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
  } = useForm<OrganizationForm>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const [userSignUp, result] = useUserSignUpMutation();
  const [hidePassword, setHidePassword] = React.useState(true);
  const [, setSessionEmail] = useLocalStorage<string | null>(
    "session-email",
    null
  );
  const navigate = useNavigate();

  const emailInput = register("email");
  const passwordInput = register("password");
  const firstName = register("first_name");
  const lastName = register("last_name");

  React.useEffect(() => {
    if (result.isSuccess) {
      const data = result.data;
      navigate(`/otp`);
    } else if (result.isError) {
      toast.error(parseErrorMessage(result), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [result.isSuccess, result?.isError, result?.data]);

  const onSubmit = async (values: OrganizationForm) => {
    setSessionEmail(values.email);
    await userSignUp(values);
  };

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
              Signup
            </Typography>
            <Box>
              <Link href="/" sx={{ textDecoration: "unset", fontSize: "14px" }}>
                Already have an account?
              </Link>
            </Box>
          </Box>

          <Box sx={{ marginY: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2}>
                  <Box style={{ width: "100%" }}>
                    <TextInput
                      id="firstName"
                      label="First Name"
                      {...firstName}
                    />
                  </Box>

                  <Box style={{ width: "100%" }}>
                    <TextInput id="lastName" label="Last Name" {...lastName} />
                  </Box>
                </Stack>
                <TextInput id="email" label="Email Address" {...emailInput} />
                <TextInput
                  id="password"
                  label="Password"
                  type={hidePassword ? "password" : "text"}
                  endAdornment={
                    <Box
                      sx={{ paddingX: 0.5, paddingTop: 0.5, cursor: "pointer" }}
                      onClick={() => setHidePassword(!hidePassword)}
                    >
                      {!hidePassword && (
                        <VisibilityOutlined color="action" fontSize="small" />
                      )}
                      {hidePassword && (
                        <VisibilityOffOutlined
                          color="action"
                          fontSize="small"
                        />
                      )}
                    </Box>
                  }
                  {...passwordInput}
                />

                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontSize={"12px"}
                    sx={{ cursor: "pointer" }}
                  >
                    By Signing up, you agree to our{" "}
                    <Link sx={{ textDecoration: "unset" }}>
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link sx={{ textDecoration: "unset" }}>Privacy Policy</Link>
                  </Typography>
                </Box>

                <Box sx={{ width: "100%", marginY: 5 }}>
                  <LoadingButton
                    disableElevation
                    type="submit"
                    loading={result.isLoading}
                    variant="contained"
                    disabled={!isValid}
                    sx={{ textTransform: "capitalize" }}
                    fullWidth
                  >
                    Create Account
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
