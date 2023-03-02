import {
  AdminLayout,
  IncidentTypeForm,
  SelectInput,
  SelectOption,
  TextInput,
} from "../../components";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
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
  useApproveIncidentMutation,
  useFetchIncidentNatureQuery,
  useFetchIncidentTypesQuery,
  useFetchIncidentsMutation,
  useFetchLgasQuery,
  useFetchStatesQuery,
} from "../../api";

import { IncidentNatureForm } from "../../components/incident-nature-form";
import { LoadingButton } from "@mui/lab";
import React from "react";
import capitalize from "lodash.capitalize";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const OutlinePaper = (props) => <Paper {...props} variant="outlined" />;

interface FilterForm {
  search?: string;
  state?: string;
  incident_type?: string;
  incident_nature?: string;
  lga?: string;
}
export const Incidents = () => {
  const [isIncidentReportModalOpen, setIncidentReportModal] =
    React.useState(false);
  const [isIncidentNatureModalOpen, setIncidentNatureModal] =
    React.useState(false);

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterForm>({
    mode: "onChange",
    // resolver: yupResolver(formSchema),
  });

  const [fetchedIncident, fetchedIncidentsState] = useFetchIncidentsMutation();
  const navigate = useNavigate();
  const { data: fetchedIncidentTypes, ...fetchedIncidentTypesState } =
    useFetchIncidentTypesQuery("incidentTypes");
  const { data: fetchedStates, ...fetchStatesResult } =
    useFetchStatesQuery("states");
  const { data: fetchIncidentNatures, ...fetchedIncidentNaturesState } =
    useFetchIncidentNatureQuery("incidentNature");
  const [approveIncident, approveIncidentResult] = useApproveIncidentMutation();

  const { authState } = useAuth();
  const [incidents, setIncidents] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [lgas, setLgas] = React.useState([]);
  const [incidentTypes, setIncidentTypes] = React.useState([]);
  const [incidentNatures, setIncidentNatures] = React.useState([]);

  React.useEffect(() => {
    fetchedIncident({});
  }, []);

  React.useEffect(() => {
    if (fetchedIncidentsState.isSuccess) {
      console.log({ fetchedIncidentsState: fetchedIncidentsState.data });
      const data = fetchedIncidentsState.data.data ?? [];
      console.log(data);
      setIncidents(data);
    } else if (fetchedIncidentsState.isError) {
      toast.error("Could not load incidents. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [
    fetchedIncidentsState.isSuccess,
    fetchedIncidentsState?.data,
    fetchedIncidentsState.isError,
  ]);

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

  React.useEffect(() => {
    if (authState?.user?.user_id) {
      setValue("owner", authState?.user?.user_id);
    }
  }, [authState?.user?.user_id]);

  React.useEffect(() => {
    if (fetchedIncidentTypesState.isSuccess) {
      const data = (fetchedIncidentTypes?.data ?? [])?.map((d) => ({
        name: capitalize(d.name),
        id: d.id,
      }));
      console.log(data);
      setIncidentTypes(data);
    } else if (fetchedIncidentTypesState.isError) {
      toast.error("Could not load incident types. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [fetchedIncidentTypesState.isSuccess, fetchedIncidentTypesState.isError]);

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
    if (fetchedIncidentNaturesState.isSuccess) {
      const data = fetchIncidentNatures?.data ?? [];

      setIncidentNatures(data);
    } else if (fetchedIncidentNaturesState.isError) {
    }
  }, [
    fetchedIncidentNaturesState.isSuccess,
    fetchedIncidentNaturesState.isError,
  ]);

  React.useEffect(() => {
    if (approveIncidentResult.isSuccess) {
      (async () => {
        const d = fetchedIncidentsState.data;
        setIncidents(d.data?.data ?? []);
      })();
      toast.success("Incident has been approved", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (approveIncidentResult.isError) {
      toast.error("Error approving incident", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [approveIncidentResult.isSuccess, approveIncidentResult.isError]);

  const lgaInput = register("lga");
  const stateInput = register("state");
  const searchInput = register("search");

  const onFilter = async (values: {
    search?: string | undefined;
    state?: string | undefined;
    incident_type?: string | undefined;
    lga?: string | undefined;
  }) => {
    console.log(values);

    await fetchedIncident(values);
  };

  return (
    <AdminLayout>
      <Box sx={{ bgcolor: "rgb(250, 250, 251)", minHeight: "100vh" }}>
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Incidents
        </Typography>
        <Paper
          variant="outlined"
          sx={{ marginX: 4, marginY: 0, paddingX: 2, paddingY: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle1">Incident Reports</Typography>

            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                disableElevation
                sx={{ textTransform: "capitalize" }}
                onClick={() => navigate("/home/incidents/create")}
              >
                New Incident Report
              </Button>

              <Button
                variant="contained"
                disableElevation
                sx={{ textTransform: "capitalize" }}
                onClick={() => setIncidentReportModal(true)}
              >
                New Incident Type
              </Button>

              <Button
                variant="outlined"
                disableElevation
                sx={{ textTransform: "capitalize" }}
                onClick={() => navigate("/home/incidents/types")}
              >
                View Incident Types
              </Button>
            </Stack>
          </Box>

          <form onSubmit={handleSubmit(onFilter)}>
            <Stack
              spacing={1}
              direction="row"
              alignItems={"center"}
              justifyContent={"flex-start"}
              width="100%"
              sx={{ paddingY: 4 }}
            >
              <Box sx={{ width: "100%" }}>
                <TextInput
                  label="Search"
                  placeholder="Search ..."
                  id="search"
                  {...searchInput}
                />
              </Box>
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
              <SelectInput
                id="incidentType"
                label="Incident type"
                error={Boolean(errors["incident_type"])}
                helpText={capitalize(errors["incident_type"]?.message)}
                onChange={(e, newValue) =>
                  setValue("incident_type", newValue, {
                    shouldValidate: true,
                  })
                }
              >
                {incidentTypes.map((d, i) => (
                  <SelectOption key={i.toString()} value={d.name}>
                    {d.name}
                  </SelectOption>
                ))}
              </SelectInput>
              <SelectInput
                id="incidentNature"
                label="Incident nature"
                onChange={(e, newValue) =>
                  setValue("incident_nature", newValue, {
                    shouldValidate: true,
                  })
                }
                error={Boolean(errors["incident_nature"])}
                helpText={capitalize(errors["incident_nature"]?.message)}
              >
                {incidentNatures.map((d, i) => (
                  <SelectOption key={i.toString()} value={d.nature}>
                    {capitalize(d.nature)}
                  </SelectOption>
                ))}
              </SelectInput>

              <Box
                display="flex"
                justifyContent={"center"}
                alignItems="flex-end"
              >
                <Button
                  variant="contained"
                  type="type"
                  disableElevation
                  sx={{ marginTop: 2.5, textTransform: "capitalize" }}
                >
                  Filter
                </Button>
              </Box>
            </Stack>
          </form>

          <TableContainer component={OutlinePaper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      color="primary"
                      checked={false}
                      inputProps={{
                        "aria-labelledby": "check-item",
                      }}
                    />
                  </TableCell>

                  <TableCell>State</TableCell>
                  <TableCell align="center">LGA</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Nature</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Details</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incidents.map((row, i) => {
                  return (
                    <TableRow
                      key={i.toString()}
                      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.state}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.lga}
                      </TableCell>
                      <TableCell align="left">
                        {capitalize(row.incident_type)}
                      </TableCell>
                      <TableCell align="left">
                        {capitalize(row.incident_nature)}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.time}</TableCell>
                      <TableCell align="left">
                        <Typography variant="caption">{row.details}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        {row.company_approved ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            sx={{ textTransform: "capitalize" }}
                          >
                            View
                          </Button>
                          <Divider
                            orientation="vertical"
                            sx={{ height: "2em" }}
                          />
                          {row.company_approved && (
                            <Button
                              size="small"
                              sx={{ textTransform: "capitalize" }}
                            >
                              Dismiss
                            </Button>
                          )}
                          {!row.company_approved && (
                            <LoadingButton
                              size="small"
                              sx={{ textTransform: "capitalize" }}
                              loading={
                                approveIncidentResult.isLoading &&
                                approveIncidentResult.originalArgs?.id ===
                                  row.id
                              }
                              onClick={async () => {
                                await approveIncident({ id: row.id });
                              }}
                            >
                              Approve
                            </LoadingButton>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <IncidentTypeForm
          isOpen={isIncidentReportModalOpen}
          onClose={() => setIncidentReportModal(false)}
        />
        <IncidentNatureForm
          isOpen={isIncidentNatureModalOpen}
          onClose={() => setIncidentNatureModal(false)}
        />
      </Box>
    </AdminLayout>
  );
};
