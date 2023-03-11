import { AdminLayout, TextInput } from "../../components";
import { Autocomplete, Paper, Stack, Typography } from "@mui/material";

import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import React from "react";
import capitalize from "lodash.capitalize";
import { useForm } from "react-hook-form";

export const CreateInvoice = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {};
  const customerInput = register("customer");
  const subscriptionInput = register("subscription");
  const paymentInput = register("subscription");

  return (
    <AdminLayout>
      <Box
        sx={{
          bgcolor: "rgb(250, 250, 251)",
          overflowY: "scroll",
        }}
      >
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Invoice / Create
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
          <Typography variant="subtitle1">Create Invoice</Typography>
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
                {...paymentInput}
                label="Payment date"
                id="paymentDate"
                error={Boolean(errors["payment_date"])}
                helpText={capitalize(errors["payment_date"]?.message)}
                onChange={(e) => {
                  paymentInput.onChange(e);
                }}
                fullWidth
                autoComplete="off"
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
                      {...subscriptionInput}
                      label="Subscription"
                      id="subscription"
                      error={Boolean(errors["subscription"])}
                      helpText={capitalize(errors["subscription"]?.message)}
                      onChange={(e) => {
                        subscriptionInput.onChange(e);
                      }}
                      fullWidth
                      autoComplete="off"
                    />
                  );
                }}
              />

              <Box>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  sx={{ textTransform: "capitalize" }}
                  disableElevation
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
