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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Typography,
  capitalize,
} from "@mui/material";
import {
  parseErrorMessage,
  useAddRoleMutation,
  useAddUserMutation,
  useFetchPermissionsQuery,
  useFetchRolesQuery,
} from "../../api";

import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const AddRole = ({ isOpen, onClose }) => {
  const { register, watch, setValue, handleSubmit } = useForm();
  const { data: fetchPermission, ...fetchPermissionState } =
    useFetchPermissionsQuery({});

  const permissions = fetchPermission?.data ?? [];
  const [addRole, addRoleResult] = useAddRoleMutation();
  const onSubmit = async (values) => {
    console.log({ values });
    await addRole({
      name: values.name,
      permissions: values?.permissions.map((d) => d.value),
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={"add-role"}
      fullScreen
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id={"add-role"} sx={{ textAlign: "center" }}>
          Add role
        </DialogTitle>
        <DialogContent sx={{ maxWidth: "400px", marginX: "auto" }}>
          <Stack spacing={2}>
            <TextInput label="Title" id="title" {...register("name")} />
            <Autocomplete
              style={{ width: "100%" }}
              disablePortal
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => {
                return option.label === value.label;
              }}
              onChange={(e, newValue) => {
                console.log(newValue);
                if (newValue?.length) {
                  setValue("permissions", newValue, {
                    shouldValidate: true,
                  });
                }
              }}
              options={permissions.map((d) => ({
                label: capitalize(d.name ?? ""),
                value: d.name,
              }))}
              multiple
              filterSelectedOptions
              renderInput={(params) => {
                // const { InputLabelProps, InputProps, ...rest } = params;
                return (
                  <TextInput {...params} label="Permissions" id="permissions" />
                );
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ maxWidth: "400px", marginX: "auto", paddingX: 3 }}>
          <Stack direction="row" spacing={2}>
            <Button onClick={onClose} sx={{ textTransform: "capitalize" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              disableElevation
              // onClick={onClose}
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Submit
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const Roles = () => {
  const { data: fetchRoles, ...fetchRolesResult } = useFetchRolesQuery({});

  const [isRoleDialogOpen, setIsRoleDialogOpen] = React.useState(false);

  return (
    <AdminLayout>
      <Box sx={{ bgcolor: "rgb(250, 250, 251)", minHeight: "100vh" }}>
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Roles
        </Typography>

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
              py: 2,
            }}
          >
            <Box>
              <Typography>Roles</Typography>
            </Box>

            <Box>
              <Button
                variant="outlined"
                disableElevation
                size="medium"
                sx={{ textTransform: "capitalize" }}
                onClick={() => setIsRoleDialogOpen(true)}
              >
                New Role
              </Button>
            </Box>
          </Box>

          <RolesTable />
        </Paper>
      </Box>
      <AddRole
        isOpen={isRoleDialogOpen}
        onClose={() => setIsRoleDialogOpen(false)}
      />
    </AdminLayout>
  );
};
