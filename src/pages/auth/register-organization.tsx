import * as yup from "yup";

import {
  Autocomplete,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  parseErrorMessage,
  useFetchIndustriesQuery,
  useFetchStatesQuery,
  useOrganizationSignUpMutation,
} from "../../api";

import { LoadingButton } from "@mui/lab";
import React from "react";
import { TextInput } from "../../components";
import capitalize from "lodash.capitalize";
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
  company_name: yup.string().required(),
  industry: yup.string().required(),
  state: yup.string().required(),
});

interface OrganizationForm {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company_name: string;
  industry: string;
  state: string;
}

export const RegisterOrganization = () => {
  const {
    register,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<OrganizationForm>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const [hidePassword, setHidePassword] = React.useState(true);
  const navigate = useNavigate();
  const [orgSignUp, result] = useOrganizationSignUpMutation();
  const emailInput = register("email");
  const passwordInput = register("password");
  const firstName = register("first_name");
  const lastName = register("last_name");
  const industryInput = register("industry");
  const stateInput = register("state");
  const companyName = register("company_name");
  const { setValue: setSessionEmail } = useLocalStorage<string | null>(
    "session-email",
    null
  );
  const { data: fetchedIndustries, ...fetchIndustriesState } =
    useFetchIndustriesQuery("industries");

  const { data: fetchedStates, ...fetchStatesResult } =
    useFetchStatesQuery("states");

  const [states, setStates] = React.useState([]);
  const [industries, setIndustries] = React.useState([]);

  React.useEffect(() => {
    if (fetchIndustriesState.isSuccess) {
      const data = (fetchedIndustries?.data ?? [])?.map((d) => d.name);
      console.log(data);
      setIndustries(data);
    } else if (fetchIndustriesState.isError) {
      toast.error("Could not load industries. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [fetchIndustriesState.isSuccess, fetchIndustriesState.isError]);

  React.useEffect(() => {
    if (fetchStatesResult.isSuccess) {
      const data = (fetchedStates?.data ?? [])?.map((s) => s.state);
      console.log(data);
      setStates(data);
    } else if (fetchStatesResult.isError) {
      toast.error("Could not load states. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [fetchStatesResult.isSuccess, fetchStatesResult.isError]);

  React.useEffect(() => {
    if (result.isSuccess) {
      const data = result.data;
      navigate("/otp");
    } else if (result.isError) {
      toast.error(parseErrorMessage(result), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }, [result.isSuccess, result.isError, result?.data]);

  const onSubmit = async (values: OrganizationForm) => {
    setSessionEmail(values.email);
    await orgSignUp(values);
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
                      label="First Name"
                      id="firstName"
                      {...firstName}
                      error={Boolean(errors["first_name"])}
                      helpText={capitalize(errors["first_name"]?.message)}
                    />
                  </Box>

                  <Box style={{ width: "100%" }}>
                    <TextInput
                      label="Last Name"
                      id="lastName"
                      {...lastName}
                      error={Boolean(errors["last_name"])}
                      helpText={capitalize(errors["last_name"]?.message)}
                    />
                  </Box>
                </Stack>
                <TextInput
                  label="Company name"
                  id="companyName"
                  {...companyName}
                  error={Boolean(errors["company_name"])}
                  helpText={capitalize(errors["company_name"]?.message)}
                />
                <TextInput
                  id="companyEmail"
                  label="Company Email Address"
                  {...emailInput}
                />
                <TextInput
                  label="Password"
                  id="password"
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
                  error={Boolean(errors["password"])}
                  helpText={capitalize(errors["password"]?.message)}
                />

                <Autocomplete
                  disablePortal
                  id="industries"
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setValue("industry", newValue?.value, {
                        shouldValidate: true,
                      });
                    }
                  }}
                  options={industries.map((d) => ({
                    label: capitalize(d.toLowerCase()),
                    value: d,
                  }))}
                  renderInput={(params) => {
                    // const { InputLabelProps, InputProps, ...rest } = params;
                    return (
                      <TextInput
                        {...params}
                        {...industryInput}
                        label="Industry"
                        error={Boolean(errors["industry"])}
                        helpText={capitalize(errors["industry"]?.message)}
                        onChange={(e) => industryInput.onChange(e)}
                      />
                    );
                  }}
                />

                <Autocomplete
                  disablePortal
                  id="state"
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setValue("state", newValue?.value, {
                        shouldValidate: true,
                      });
                    }
                  }}
                  options={states.map((d) => ({
                    label: capitalize(d.toLowerCase()),
                    value: d,
                  }))}
                  renderInput={(params) => {
                    // const { InputLabelProps, InputProps, ...rest } = params;
                    return (
                      <TextInput
                        {...params}
                        {...stateInput}
                        label="State"
                        error={Boolean(errors["state"])}
                        helpText={capitalize(errors["state"]?.message)}
                        onChange={(e) => industryInput.onChange(e)}
                      />
                    );
                  }}
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
                    variant="contained"
                    loading={result.isLoading}
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
