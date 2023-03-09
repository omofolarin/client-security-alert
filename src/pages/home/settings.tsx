import {
  AdminLayout,
  RolesTable,
  TextInput,
  UsersTable,
} from "../../components";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  parseErrorMessage,
  useAddUserLocationMutation,
  useAddUserMutation,
  useFetchCompanyUsersQuery,
  useFetchLgasQuery,
  useFetchOrganizationProfileQuery,
  useFetchStatesQuery,
  useFetchUserLocationQuery,
  useFetchUserProfileQuery,
  useResetPasswordMutation,
  useSubmitKycMutation,
  useUpdateCompanyProfileMutation,
  useUpdateUserProfileMutation,
} from "../../api";

import { FileUploadOutlined } from "@mui/icons-material";
import React from "react";
import capitalize from "lodash.capitalize";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks";
import { useForm } from "react-hook-form";

const OutlinePaper = (props) => <Paper {...props} variant="outlined" />;

const ResetPassword = ({ isOpen, onClose }) => {
  const [resetPassword, result] = useResetPasswordMutation();
  const { handleSubmit, register } = useForm();

  React.useEffect(() => {
    if (result.isSuccess) {
      onClose();
      toast.success("Password reset successful", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (result.isError) {
      toast.error(`Password reset failed: ${parseErrorMessage(result)}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [result.isError, result.isSuccess, result?.data]);

  const onSubmit = async (values) => {
    console.log({ values });
    await resetPassword(values);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby={""}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id={"change-password-title"}>Change Password</DialogTitle>
        <DialogContent sx={{ minWidth: "400px" }}>
          <Stack spacing={2}>
            <TextInput
              label="Old password"
              id="oldPassword"
              {...register("old_password")}
            />
            <TextInput
              label="New password"
              id="newPassword"
              {...register("new_password")}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ paddingX: 3 }}>
          <Stack spacing={2} direction="row">
            <Button onClick={onClose} sx={{ textTransform: "capitalize" }}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              disableElevation
            >
              Submit
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const Location = ({ isOpen, onClose }) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: fetchedStates, ...fetchStatesResult } =
    useFetchStatesQuery("states");
  const [states, setStates] = React.useState([]);
  const [lgas, setLgas] = React.useState([]);

  const { data: fetchedLgas, ...fetchLgasResult } = useFetchLgasQuery(
    (() => {
      if (watch("state") != undefined) {
        let state = watch("state");
        return state;
      } else {
        return "lagos";
      }
    })()
  );

  const [addUserLocation, addUserLocationResult] = useAddUserLocationMutation();

  const stateInput = register("state");

  React.useEffect(() => {
    if (fetchStatesResult.isSuccess) {
      const data = fetchedStates?.data ?? [];
      console.log(data);
      setStates(data);
    } else if (fetchStatesResult.isError) {
      toast.error("Could not load states. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [
    fetchStatesResult.isSuccess,
    fetchedStates?.data,
    fetchStatesResult.isError,
  ]);

  React.useEffect(() => {
    if (fetchLgasResult.isSuccess) {
      const data = fetchedLgas?.data ?? [];
      setLgas(data);
    } else if (fetchLgasResult.isError) {
      toast.error("Could not load Lgas. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [
    fetchLgasResult.isSuccess,
    fetchedLgas?.data,
    fetchLgasResult.isError,
    watch("state"),
  ]);

  React.useEffect(() => {
    if (addUserLocationResult.isSuccess) {
      toast.success("Location added successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      onClose();
      reset();
    } else if (addUserLocationResult.isError) {
      toast.error("Error submitting location.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [
    addUserLocationResult.isSuccess,
    addUserLocationResult.isError,
    addUserLocationResult.data,
  ]);

  const onSubmit = async (value) => {
    await addUserLocation({
      ...value,
      state: states.filter((f) => f.state === value.state)?.[0]?.id,
      lga: lgas.filter((l) => l.lga === value.lga)?.[0]?.id,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={"user-location"}
      fullScreen
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id={"user-location"} textAlign="center">
          Add location
        </DialogTitle>
        <DialogContent sx={{ maxWidth: "400px", mx: "auto" }}>
          <Stack spacing={2}>
            <TextInput label="Name" id="name" {...register("name")} />
            <TextInput label="Address" id="address" {...register("address")} />
            <Autocomplete
              disablePortal
              sx={{ width: "100%" }}
              onChange={(e, newValue) => {
                if (newValue) {
                  setLgas([]);
                  setValue("state", newValue?.value, {
                    shouldValidate: true,
                  });
                  setValue("lga", "", { shouldValidate: true });
                }
              }}
              options={states.map((d) => ({
                label: capitalize(d.state),
                value: d.state,
              }))}
              renderInput={(params) => {
                // const { InputLabelProps, InputProps, ...rest } = params;
                return (
                  <TextInput
                    {...params}
                    {...stateInput}
                    label="State"
                    id="state"
                    error={Boolean(errors["state"])}
                    helpText={capitalize(errors["state"]?.message)}
                    onChange={(e) => {
                      stateInput.onChange(e);
                    }}
                    fullWidth
                    autoComplete="off"
                  />
                );
              }}
            />
            <Autocomplete
              style={{ width: "100%" }}
              disablePortal
              onChange={(e, newValue) => {
                if (newValue) {
                  setValue("lga", newValue?.value, {
                    shouldValidate: true,
                  });
                }
              }}
              options={lgas.map((d) => ({
                label: capitalize(d.lga ?? ""),
                value: d.lga,
              }))}
              renderInput={(params) => {
                // const { InputLabelProps, InputProps, ...rest } = params;
                return <TextInput {...params} label="Lga" id="lga" />;
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ maxWidth: "400px", mx: "auto", px: 3 }}>
          <Stack spacing={2} direction="row">
            <Button onClick={onClose} sx={{ textTransform: "capitalize" }}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              disableElevation
            >
              Submit
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const Settings = () => {
  const [uploadKyc, kycResult] = useSubmitKycMutation();
  const { data: userProfile, ...userProfileState } =
    useFetchUserProfileQuery("userProfile");
  const { data: companyProfile, ...companyProfileState } =
    useFetchOrganizationProfileQuery("organizationProfile");

  const [updateUserProfile, updateUserProfileResult] =
    useUpdateUserProfileMutation();
  const [updateCompanyProfile, updateCompanyProfileResult] =
    useUpdateCompanyProfileMutation();
  const { data: companyUsers, ...companyUsersState } =
    useFetchCompanyUsersQuery({});
  const { data: fetchUserLocation, ...fetchUserLocationState } =
    useFetchUserLocationQuery({});
  const { watch, register, handleSubmit, setValue, getValues } = useForm({});
  const { updateUserData } = useAuth();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = React.useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = React.useState(false);

  const fileInput = register("file");

  console.log({ companyUsers });
  React.useEffect(() => {
    if (userProfileState.isSuccess) {
      setValue("first_name", userProfile?.data?.first_name);
      setValue("last_name", userProfile?.data?.last_name);
    }

    if (companyProfileState.isSuccess) {
      setValue("company_name", companyProfile?.data.company_name);
      setValue("industry", companyProfile?.data?.industry);
    }

    if (userProfileState.isError) {
      toast.error("Could not fetch user profile. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (companyProfileState.isError) {
      toast.error("Could not fetch user profile. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [
    userProfile?.data,
    companyProfile?.data,
    userProfileState.isSuccess,
    companyProfileState.isSuccess,
    userProfileState.isError,
    companyProfileState.isError,
  ]);

  React.useEffect(() => {
    if (
      updateUserProfileResult.isSuccess ||
      updateCompanyProfileResult.isSuccess
    ) {
      updateUserData(getValues());
      toast.success("Profile updated successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (updateUserProfileResult.isError) {
      toast.error("Could not update profile", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (updateCompanyProfileResult.isError) {
      toast.error("Could not update company profile. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [
    updateUserProfileResult.isSuccess,
    updateCompanyProfileResult.isSuccess,
    updateUserProfileResult.isError,
    updateCompanyProfileResult.isError,
  ]);

  const onUpdateProfile = async (value: {
    first_name: any;
    last_name: any;
    company_name: any;
    industry: any;
  }) => {
    const { file, first_name, last_name, company_name, industry } = value;
    console.log({ value });
    await updateUserProfile({ first_name, last_name });
    await updateCompanyProfile({ company_name, industry });
  };

  const onSubmitUpload = async (values) => {
    console.log({ values });
    const { file } = values;
    const formData = new FormData();
    formData.append("data", file[0]);
    await uploadKyc(formData);
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          bgcolor: "rgb(250, 250, 251)",
          minHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Settings
        </Typography>

        <Grid container>
          <Grid item xl={6}>
            <Paper
              variant="outlined"
              sx={{
                marginX: 4,
                marginY: 0,
                paddingX: 2,
                paddingY: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Profile Information</Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => setIsPasswordDialogOpen(true)}
                  >
                    Change Password
                  </Button>
                </Stack>
              </Box>

              <form onSubmit={handleSubmit(onUpdateProfile)}>
                <Stack spacing={2} sx={{ marginTop: 4 }}>
                  <TextInput
                    label="First name"
                    id="firstName"
                    {...register("first_name")}
                  />

                  <TextInput
                    label="Last name"
                    id="lastName"
                    {...register("last_name")}
                  />

                  <TextInput
                    label="Company name"
                    id="companyName"
                    {...register("company_name")}
                  />

                  <TextInput
                    label="Industry name"
                    id="industryName"
                    {...register("industry")}
                  />

                  <Box sx={{ alignSelf: "flex-end" }}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        textTransform: "capitalize",
                      }}
                      disableElevation
                    >
                      Submit
                    </Button>
                  </Box>
                </Stack>
              </form>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Upload KYC</Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmitUpload)}>
                <Box sx={{ marginY: 4 }}>
                  <Stack spacing={2.5}>
                    <label htmlFor="contained-button-file">
                      <input
                        accept="file"
                        id="contained-button-file"
                        multiple
                        type="file"
                        style={{ display: "none" }}
                        {...fileInput}
                      />
                      <Card
                        variant="outlined"
                        sx={Object.assign(
                          {},
                          {
                            borderStyle: "dashed",
                            paddingX: 2,
                            paddingY: 1,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",

                            "&:hover": {
                              bgcolor: "Highlight",
                              cursor: "pointer",
                            },
                          }
                        )}
                      >
                        <FileUploadOutlined color="action" />
                        {!watch("file")?.[0] && (
                          <Box sx={{ paddingX: 2 }}>
                            <Typography>
                              Upload identification document
                            </Typography>
                            <Typography fontSize={"14px"} color="GrayText">
                              Valid identification document are: ID card,
                              Passport, CAC
                            </Typography>
                          </Box>
                        )}
                        {watch("file")?.[0] && (
                          <Box sx={{ paddingX: 2 }}>
                            <Typography>{watch("file")?.[0]?.name}</Typography>
                            <Typography fontSize={"14px"} color="GrayText">
                              {watch("file")?.[0]?.type}
                            </Typography>
                          </Box>
                        )}
                      </Card>
                    </label>

                    <Box sx={{ marginY: 5, alignSelf: "flex-end" }}>
                      <Button
                        disableElevation
                        variant="contained"
                        sx={{ textTransform: "capitalize" }}
                        disabled={!watch("file")}
                        type="submit"
                      >
                        Upload kyc
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </form>
            </Paper>
          </Grid>

          <Grid item xl={6}>
            <Paper
              variant="outlined"
              sx={{ marginX: 4, marginY: 0, paddingX: 2, paddingY: 4 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography>Locations</Typography>
                </Box>

                <Box>
                  <Button
                    variant="outlined"
                    disableElevation
                    size="medium"
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => setIsLocationDialogOpen(true)}
                  >
                    New location
                  </Button>
                </Box>
              </Box>

              <TableContainer component={OutlinePaper} sx={{ marginY: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Address</TableCell>
                      <TableCell align="left">State</TableCell>
                      <TableCell align="left">Lga</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(fetchUserLocation?.data ?? []).map((row, i) => {
                      return (
                        <TableRow key={i.toString()}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            {row.address}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            {row.state}
                          </TableCell>

                          <TableCell component={"th"} scope="row">
                            {row.lga}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        <ResetPassword
          isOpen={isPasswordDialogOpen}
          onClose={() => {
            setIsPasswordDialogOpen(false);
          }}
        />

        <Location
          isOpen={isLocationDialogOpen}
          onClose={() => setIsLocationDialogOpen(false)}
        />
      </Box>
    </AdminLayout>
  );
};
