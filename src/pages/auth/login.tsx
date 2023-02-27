import * as yup from "yup";

import { AuthWrapper, useAuth } from "../../hooks";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { CheckboxInput, TextInput } from "../../components";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { parseErrorMessage, useLoginMutation } from "../../api";

import { LoadingButton } from "@mui/lab";
import React from "react";
import capitalize from "lodash.capitalize";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginForm {
  email: string;
  password: string;
}

const formSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const Login = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();
  const [onLogin, result] = useLoginMutation();
  const { setValue: setSessionEmail } = useLocalStorage<string | null>(
    "session-email",
    null
  );
  const { authChecked, authState, onLogin: onLoginState } = useAuth();
  const emailInput = register("email");
  const passwordInput = register("password");

  console.log({ isValid, errors });

  React.useEffect(() => {
    console.log("isSuccess", result.isSuccess);
    if (result.isSuccess) {
      const data = result.data.data;
      onLoginState(data.access_token, data);
      navigate(`/home`);
    } else if (result.isError) {
      console.log("caught error", result.error);
      toast.error(parseErrorMessage(result), {
        position: toast.POSITION.TOP_CENTER,
      });

      if (parseErrorMessage(result)?.includes("not verified")) {
        navigate("/otp");
      }
    }
  }, [result.isSuccess, result?.isError, result?.data]);

  const onSubmit = async (values: LoginForm) => {
    setSessionEmail(values.email);
    await onLogin(values);
  };

  return (
    <AuthWrapper>
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
                Login
              </Typography>
              <Box>
                <Link
                  href="/signup"
                  sx={{ textDecoration: "unset", fontSize: "14px" }}
                >
                  Don't have an account?
                </Link>
              </Box>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ marginY: 4 }}>
                <Stack spacing={2.5}>
                  <TextInput
                    id="email"
                    label="Email Address"
                    {...emailInput}
                    type="email"
                    error={Boolean(errors["email"])}
                    helpText={capitalize(errors["email"]?.message)}
                  />
                  <TextInput
                    label="Password"
                    id="password"
                    type={hidePassword ? "password" : "text"}
                    {...passwordInput}
                    endAdornment={
                      <Box
                        sx={{
                          paddingX: 0.5,
                          paddingTop: 0.5,
                          cursor: "pointer",
                        }}
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
                    <Box>
                      <CheckboxInput
                        label={
                          <Typography variant="body1" fontSize={"14px"}>
                            Keep me signed in
                          </Typography>
                        }
                      />
                    </Box>

                    <Typography
                      variant="body1"
                      fontSize={"14px"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate("/forgot-passord")}
                    >
                      Forgot password?
                    </Typography>
                  </Box>

                  <Box sx={{ width: "100%", marginY: 5 }}>
                    <LoadingButton
                      type="submit"
                      disableElevation
                      loading={result.isLoading}
                      variant="contained"
                      sx={{ textTransform: "capitalize" }}
                      disabled={!isValid}
                      fullWidth
                    >
                      Login
                    </LoadingButton>
                  </Box>
                </Stack>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    </AuthWrapper>
  );
};
