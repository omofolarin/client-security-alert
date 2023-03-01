import { AdminLayout, TextInput } from "../../components";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  useApproveIncidentMutation,
  useFetchOrganizationProfileQuery,
  useFetchUserProfileQuery,
  useUpdateCompanyProfileMutation,
  useUpdateUserProfileMutation,
} from "../../api";

import { Container } from "@mui/system";
import React from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks";
import { useForm } from "react-hook-form";

const OutlinePaper = (props) => <Paper {...props} variant="outlined" />;

export const Settings = () => {
  const { data: userProfile, ...userProfileState } =
    useFetchUserProfileQuery("userProfile");
  const { data: companyProfile, ...companyProfileState } =
    useFetchOrganizationProfileQuery("organizationProfile");

  const [updateUserProfile, updateUserProfileResult] =
    useUpdateUserProfileMutation();
  const [updateCompanyProfile, updateCompanyProfileResult] =
    useUpdateCompanyProfileMutation();

  const { register, handleSubmit, setValue, getValues } = useForm({});
  const { updateUserData } = useAuth();

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
    const { first_name, last_name, company_name, industry } = value;
    console.log({ value });
    await updateUserProfile({ first_name, last_name });
    await updateCompanyProfile({ company_name, industry });
  };

  return (
    <AdminLayout>
      <Box sx={{ bgcolor: "rgb(250, 250, 251)", minHeight: "100vh" }}>
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
                  <Button sx={{ textTransform: "capitalize" }}>
                    Change Password
                  </Button>

                  <Divider orientation="vertical" />
                  <Button sx={{ textTransform: "capitalize" }}>
                    Add new user
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

                  <Box>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ textTransform: "capitalize" }}
                      disableElevation
                    >
                      Submit
                    </Button>
                  </Box>
                </Stack>
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
                    variant="contained"
                    disableElevation
                    size="medium"
                    sx={{ textTransform: "capitalize" }}
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
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">State</TableCell>
                      <TableCell align="right">Lga</TableCell>
                      <TableCell align="right">Owner</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};
