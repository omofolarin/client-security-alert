import {
  AdminLayout,
  IncidentTypeForm,
  SelectInput,
  TextInput,
} from "../../components";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  capitalize,
} from "@mui/material";
import {
  useFetchIncidentNatureQuery,
  useFetchIncidentTypesQuery,
  useFetchIncidentsQuery,
  useFetchLgasQuery,
  useFetchStatesQuery,
} from "../../api";

import { IncidentNatureForm } from "../../components/incident-nature-form";
import React from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

interface FilterForm {
  search?: string;
  state?: string;
  incident_type?: string;
  incident_natures?: string;
  lga?: string;
}
export const Incidents = () => {
  const [isIncidentReportModalOpen, setIncidentReportModal] =
    React.useState(false);
  const [isIncidentNatureModalOpen, setIncidentNatureModal] =
    React.useState(false);
  const { data: fetchedIncident, ...fetchedIncidentsState } =
    useFetchIncidentsQuery("incidents");
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
  const navigate = useNavigate();
  const { data: fetchedIncidentTypes, ...fetchedIncidentTypesState } =
    useFetchIncidentTypesQuery("incidentTypes");
  const { data: fetchedStates, ...fetchStatesResult } =
    useFetchStatesQuery("states");
  const { data: fetchIncidentNatures, ...fetchedIncidentNaturesState } =
    useFetchIncidentNatureQuery("incidentNature");
  const { authState } = useAuth();
  const [incidents, setIncidents] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [lgas, setLgas] = React.useState([]);
  const [incidentTypes, setIncidentTypes] = React.useState([]);
  const [incidentNatures, setIncidentNatures] = React.useState([]);

  React.useEffect(() => {
    if (fetchedIncidentsState.isSuccess) {
      const data = fetchedIncident?.data ?? [];
      console.log(data);
      setIncidents(data);
    } else if (fetchedIncidentsState.isError) {
      toast.error("Could not load incidents. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [fetchedIncidentsState.isSuccess, fetchedIncidentsState.isError]);

  const { data: fetchedLgas, ...fetchLgasResult } = useFetchLgasQuery(
    (() => {
      if (watch("state") != undefined) {
        let id = watch("state");
        return states.filter((s) => s.id === id)?.[0]?.state;
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
  }, [fetchStatesResult.isSuccess, fetchStatesResult.isError]);

  React.useEffect(() => {
    if (fetchLgasResult.isSuccess) {
      const data = fetchedLgas?.data ?? [];
      setLgas(data);
    } else if (fetchLgasResult.isError) {
      toast.error("Could not load Lgas. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [fetchLgasResult.isSuccess, fetchLgasResult.isError, watch("state")]);

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

          <Toolbar>
            <Stack
              spacing={2}
              direction="row"
              alignItems={"center"}
              width="100%"
              sx={{ paddingY: 2 }}
            >
              <Box sx={{ width: "100%" }}>
                <TextInput label="Search" placeholder="Search ..." />
              </Box>

              <SelectInput label="States" />
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
                  value: d.id,
                }))}
                renderInput={(params) => {
                  // const { InputLabelProps, InputProps, ...rest } = params;
                  return <TextInput {...params} label="Lga" id="lga" />;
                }}
              />
              <SelectInput label="Incident Types" />
              <SelectInput label="Incident Natures" />
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems="flex-end"
              >
                <Button
                  variant="contained"
                  disableElevation
                  sx={{ marginTop: 2.5, textTransform: "capitalize" }}
                >
                  Filter
                </Button>
              </Box>
            </Stack>
          </Toolbar>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>State</TableCell>
                  <TableCell align="right">LGA</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Nature</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incidents.map((row, i) => (
                  <TableRow
                    key={i.toString()}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.state}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.lga}
                    </TableCell>
                    <TableCell align="right">{row.incident_type}</TableCell>
                    <TableCell align="right">{row.incident_nature}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.time}</TableCell>
                    <TableCell align="right">{row.details}</TableCell>
                  </TableRow>
                ))}
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
