import {
  AdminLayout,
  SelectInput,
  SelectOption,
  TextInput,
} from "../../components";
import { Autocomplete, Paper, Stack, Typography } from "@mui/material";

import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import React from "react";
import capitalize from "lodash.capitalize";
import { useForm } from "react-hook-form";

export const CreateSubscription = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const [incidentNatures, setIncidentNatures] = React.useState([]);
  const customerInput = register("customer");
  const stateInput = register("state");
  const threatLevelInput = register("threat_level");
  const primaryThreatActorInput = register("primary_threat_actor");
  const affectedGroupsInput = register("affected_groups");

  const onSubmit = () => {};

  return (
    <AdminLayout>
      <Box
        sx={{
          bgcolor: "rgb(250, 250, 251)",
          overflowY: "scroll",
        }}
      >
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Subscriptions / Create
        </Typography>
      </Box>

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
          <Typography variant="subtitle1">Create Subscription</Typography>
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
                {...register("customer")}
                error={Boolean(errors["customer"])}
                helpText={capitalize(errors["customer"]?.message)}
              />

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

              <SelectInput
                id="alertType"
                label="Alert type"
                onChange={(e, newValue) =>
                  setValue("alert_type", newValue, {
                    shouldValidate: true,
                  })
                }
                error={Boolean(errors["alert_type"])}
                helpText={capitalize(errors["alert_type"]?.message)}
              >
                {incidentNatures.map((d, i) => (
                  <SelectOption key={i.toString()} value={d.id}>
                    {capitalize(d.nature)}
                  </SelectOption>
                ))}
              </SelectInput>

              <Autocomplete
                disablePortal
                sx={{ width: "100%" }}
                onChange={(e, newValue) => {
                  if (newValue) {
                  }
                }}
                options={[].map((d) => ({
                  label: capitalize(d.state),
                  value: d.id,
                }))}
                renderInput={(params) => {
                  return (
                    <TextInput
                      {...params}
                      {...customerInput}
                      label="Customer"
                      id="customer"
                      error={Boolean(errors["customer"])}
                      helpText={capitalize(errors["customer"]?.message)}
                      onChange={(e) => {
                        customerInput.onChange(e);
                      }}
                      fullWidth
                      autoComplete="off"
                    />
                  );
                }}
              />

              <Autocomplete
                disablePortal
                sx={{ width: "100%" }}
                onChange={(e, newValue) => {
                  if (newValue) {
                  }
                }}
                options={[].map((d) => ({
                  label: capitalize(d.state),
                  value: d.id,
                }))}
                renderInput={(params) => {
                  return (
                    <TextInput
                      {...params}
                      {...threatLevelInput}
                      label="Threat level"
                      id="threat_level"
                      error={Boolean(errors["threat_level"])}
                      helpText={capitalize(errors["threat_level"]?.message)}
                      onChange={(e) => {
                        threatLevelInput.onChange(e);
                      }}
                      fullWidth
                      autoComplete="off"
                    />
                  );
                }}
              />

              <Autocomplete
                disablePortal
                sx={{ width: "100%" }}
                onChange={(e, newValue) => {
                  if (newValue) {
                  }
                }}
                options={[].map((d) => ({
                  label: capitalize(d.state),
                  value: d.id,
                }))}
                renderInput={(params) => {
                  return (
                    <TextInput
                      {...params}
                      {...primaryThreatActorInput}
                      label="Primary threat actor"
                      id="primaryThreatActor"
                      error={Boolean(errors["primary_threat_actor"])}
                      helpText={capitalize(
                        errors["primary_threat_actor"]?.message
                      )}
                      onChange={(e) => {
                        primaryThreatActorInput.onChange(e);
                      }}
                      fullWidth
                      autoComplete="off"
                    />
                  );
                }}
              />

              <Autocomplete
                disablePortal
                sx={{ width: "100%" }}
                multiple
                onChange={(e, newValue) => {
                  if (newValue) {
                  }
                }}
                options={[].map((d) => ({
                  label: capitalize(d.state),
                  value: d.id,
                }))}
                renderInput={(params) => {
                  return (
                    <TextInput
                      {...params}
                      {...affectedGroupsInput}
                      label="Affected groups"
                      id="affectedGroups"
                      error={Boolean(errors["affected_groups"])}
                      helpText={capitalize(errors["affected_groups"]?.message)}
                      onChange={(e) => {
                        affectedGroupsInput.onChange(e);
                      }}
                      fullWidth
                      autoComplete="off"
                    />
                  );
                }}
              />

              <Autocomplete
                disablePortal
                sx={{ width: "100%" }}
                onChange={(e, newValue) => {
                  if (newValue) {
                  }
                }}
                options={[].map((d) => ({
                  label: capitalize(d.state),
                  value: d.id,
                }))}
                renderInput={(params) => {
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

              <SelectInput
                id="paymentStatus"
                label="Payment status"
                onChange={(e, newValue) =>
                  setValue("payment_status", newValue, {
                    shouldValidate: true,
                  })
                }
                error={Boolean(errors["payment_status"])}
                helpText={capitalize(errors["payment_status"]?.message)}
              >
                {incidentNatures.map((d, i) => (
                  <SelectOption key={i.toString()} value={d.id}>
                    {capitalize(d.nature)}
                  </SelectOption>
                ))}
              </SelectInput>

              <Box>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  disableElevation
                  sx={{ textTransform: "capitalize" }}
                >
                  Submit
                </LoadingButton>
              </Box>
            </Stack>
          </form>
        </Box>
      </Paper>
    </AdminLayout>
  );
};
