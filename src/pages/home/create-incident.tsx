import * as yup from "yup";

import {
  AdminLayout,
  SelectInput,
  SelectOption,
  TextInput,
} from "../../components";
import {
  Autocomplete,
  Box,
  Card,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  useAddIncidentMutation,
  useFetchIncidentNatureQuery,
  useFetchIncidentTypesQuery,
  useFetchLgasQuery,
  useFetchStatesQuery,
} from "../../api";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FileUploadOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import capitalize from "lodash.capitalize";
import moment from "moment";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup.object().shape({
  name: yup.string().required(),
  date: yup.date().required(),
  time: yup.date().required(),
  details: yup.string().required(),
  perpetrators: yup.string().required(),
  lga: yup.string().required(),
  state: yup.string().required(),
  incident_nature: yup.number().required(),
  incident_type: yup.number().required(),
  special_events: yup.string().optional(),
  prior_warnings: yup.string().optional(),
  past_occurrence: yup.string().optional(),
  number_of_victims: yup.string().required(),
  owner: yup.string().required(),
});

interface IncidentForm {
  name: string;
  date: Date;
  time: Date;
  details: string;
  lga: string;
  state: string;
  incident_nature: string;
  incident_type: string;
  special_events: string;
  prior_warnings?: string;
  owner: string;
  number_of_victims: string;
  perpetrators: string;
  past_occurrence?: string;
}

export const CreateIncident = () => {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncidentForm>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const navigate = useNavigate();
  const { data: fetchedIncidentTypes, ...fetchedIncidentTypesState } =
    useFetchIncidentTypesQuery("incidentTypes");
  const { data: fetchedStates, ...fetchStatesResult } =
    useFetchStatesQuery("states");
  const { data: fetchIncidentNatures, ...fetchedIncidentNaturesState } =
    useFetchIncidentNatureQuery("incidentNature");
  const { authState } = useAuth();
  const [states, setStates] = React.useState([]);
  const [lgas, setLgas] = React.useState([]);
  const [incidentTypes, setIncidentTypes] = React.useState([]);
  const [incidentNatures, setIncidentNatures] = React.useState([]);
  const [addIncident, result] = useAddIncidentMutation();

  const { data: fetchedLgas, ...fetchLgasResult } = useFetchLgasQuery(
    (() => {
      if (watch("state") != undefined) {
        let id = watch("state");
        console.log(id);
        console.log(states.filter((s) => s.id === id)?.[0]?.state);
        return states.filter((s) => s.id === id)?.[0]?.state?.toLowerCase();
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
      setStates(data);
      setLgas([]);
      setValue("lga", "", { shouldValidate: false });
      (async () => {
        const result = await fetchLgasResult.refetch();
        setLgas(result.data?.data ?? []);
      })();
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
      console.log({ currentData: fetchLgasResult.currentData });
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
    if (result.isSuccess) {
      navigate("/home/incidents");
      toast.success("Incident recorded successfully");
    }
  }, [result.isSuccess]);

  const nameInput = register("name");
  const dateInput = register("date");
  const timeInput = register("time");
  const specialEventsInput = register("special_events");
  const detailsInput = register("details");
  const priorWarningInput = register("prior_warnings");
  const perpetratorsInput = register("perpetrators");
  const lgaInput = register("lga");
  const stateInput = register("state");
  const noVictimsInput = register("number_of_victims");

  const onSubmit = async (v) => {
    console.log(v);
    await addIncident({
      ...v,
      lga: parseInt(v.lga, 10),
      state: parseInt(v.state, 10),
      date: moment(v.date).format("YYYY-MM-DD"),
      time: moment(v.time).format("h:mm:ss"),
    });
  };

  console.log({ errors });
  return (
    <AdminLayout>
      <Box
        sx={{
          bgcolor: "rgb(250, 250, 251)",
          //   minHeight: "100vh",
          //   height: "100%",
          overflowY: "scroll",
        }}
      >
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Incidents / Create
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            marginX: 4,
            marginY: 0,
            paddingX: 2,
            paddingY: 4,
            marginBottom: 20,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              paddingBottom: 4,
            }}
          >
            <Typography variant="subtitle1">Create Incident</Typography>
          </Box>

          <Box
            sx={{
              width: {
                xl: "40%",
              },
              marginX: "auto",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextInput
                  id="name"
                  label="Incident name"
                  {...nameInput}
                  error={Boolean(errors["name"])}
                  helpText={capitalize(errors["name"]?.message)}
                />

                <Stack spacing={2} direction="row">
                  <Box sx={{ width: "50%" }}>
                    <SelectInput
                      id="threatLevel"
                      label="Threat level"
                      error={Boolean(errors["threat_level"])}
                      helpText={capitalize(errors["threat_level"]?.message)}
                      onChange={(e, newValue) =>
                        setValue("threat_level", newValue, {
                          shouldValidate: true,
                        })
                      }
                    >
                      {incidentTypes.map((d, i) => (
                        <SelectOption key={i.toString()} value={d.id}>
                          {d.name}
                        </SelectOption>
                      ))}
                    </SelectInput>
                  </Box>
                  <Box sx={{ width: "50%" }}>
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
                        <SelectOption key={i.toString()} value={d.id}>
                          {capitalize(d.nature)}
                        </SelectOption>
                      ))}
                    </SelectInput>
                  </Box>
                </Stack>

                <Stack spacing={2} direction="row">
                  <Box sx={{ width: "50%" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={watch("date")}
                        PaperProps={{ sx: { marginTop: 1 }, elevation: 2 }}
                        renderInput={(props) => (
                          <TextInput
                            id="dateOfIncident"
                            error={Boolean(errors["date"])}
                            helpText={capitalize(errors["date"]?.message)}
                            {...props}
                            label="Date of incident"
                          />
                        )}
                        {...dateInput}
                        onChange={(value) => {
                          setValue("date", value, { shouldValidate: true });
                        }}
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box sx={{ width: "50%" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={watch("time")}
                        PaperProps={{ sx: { marginTop: 1 }, elevation: 2 }}
                        renderInput={(props) => (
                          <TextInput
                            id="timeOfIncident"
                            error={Boolean(errors["time"])}
                            helpText={capitalize(errors["time"]?.message)}
                            {...props}
                            label="Time of incident"
                          />
                        )}
                        {...timeInput}
                        onChange={(value) => {
                          setValue("time", value, { shouldValidate: true });
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Stack>

                <TextInput
                  id="details"
                  label="Details"
                  {...detailsInput}
                  error={Boolean(errors["details"])}
                  helpText={capitalize(errors["details"]?.message)}
                />

                <TextInput
                  id="occurrences"
                  label="Special events"
                  {...specialEventsInput}
                  error={Boolean(errors["special_events"])}
                  helpText={capitalize(errors["special_events"]?.message)}
                />

                <Stack spacing={2} direction="row">
                  <Box sx={{ width: "50%" }}>
                    <TextInput
                      id="noOfVictims"
                      label="No of victims"
                      {...noVictimsInput}
                      error={Boolean(errors["number_of_victims"])}
                      helpText={capitalize(
                        errors["number_of_victims"]?.message
                      )}
                    />
                  </Box>

                  <Box sx={{ width: "50%" }}>
                    <TextInput
                      id="impact"
                      label="Impact"
                      {...noVictimsInput}
                      error={Boolean(errors["number_of_victims"])}
                      helpText={capitalize(
                        errors["number_of_victims"]?.message
                      )}
                    />
                  </Box>
                </Stack>

                <TextInput
                  id="priorWarnings"
                  label="Prior warnings"
                  {...priorWarningInput}
                  error={Boolean(errors["prior_warnings"])}
                  helpText={capitalize(errors["prior_warnings"]?.message)}
                />
                <Stack spacing={2} direction="row">
                  <Box sx={{ width: "50%" }}>
                    <TextInput
                      id="perpetrators"
                      label="Perpetrators"
                      {...perpetratorsInput}
                      error={Boolean(errors["perpetrators"])}
                      helpText={capitalize(errors["perpetrators"]?.message)}
                    />
                  </Box>

                  <Box sx={{ width: "50%" }}>
                    <TextInput
                      id="affectedGroups"
                      label="Affected groups"
                      {...perpetratorsInput}
                      error={Boolean(errors["perpetrators"])}
                      helpText={capitalize(errors["perpetrators"]?.message)}
                    />
                  </Box>
                </Stack>

                <Stack spacing={2} direction="row">
                  <Box sx={{ width: "50%" }}>
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
                        value: d.id,
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
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Autocomplete
                      disablePortal
                      onChange={(e, newValue) => {
                        if (newValue) {
                          setValue("lga", newValue?.value, {
                            shouldValidate: true,
                          });
                        }
                      }}
                      options={lgas.map((d) => ({
                        label: capitalize(d.lga),
                        value: d.id,
                      }))}
                      renderInput={(params) => {
                        // const { InputLabelProps, InputProps, ...rest } = params;
                        return (
                          <TextInput
                            {...params}
                            {...lgaInput}
                            label="Lga"
                            id="lga"
                            error={Boolean(errors["lga"])}
                            helpText={capitalize(errors["lga"]?.message)}
                            onChange={(e) => lgaInput.onChange(e)}
                            autoComplete="off"
                          />
                        );
                      }}
                    />
                  </Box>
                </Stack>

                <label htmlFor="contained-button-file">
                  <input
                    accept="file"
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: "none" }}
                    // {...fileInput}
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
                    <Box sx={{ paddingX: 2 }}>
                      <Typography variant="body2">
                        Video recording or audio recording if available
                      </Typography>
                    </Box>
                  </Card>
                </label>
                <Box>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={result.isLoading}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
};
