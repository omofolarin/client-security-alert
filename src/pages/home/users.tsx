import { AdminLayout, TextInput, UsersTable } from "../../components";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { parseErrorMessage, useAddUserMutation } from "../../api";

import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const AddEmail = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [addUser, result] = useAddUserMutation();

  React.useEffect(() => {
    if (result.isSuccess) {
      onClose();
      toast.success("User added successful", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (result.isError) {
      toast.error(`Failed to add user: failed: ${parseErrorMessage(result)}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [result.isError, result.isSuccess, result?.data]);

  const onSubmit = async (value) => {
    await addUser(value);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={"addUserToCompany"}
      fullScreen
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id={"addUserToCompany"} sx={{ textAlign: "center" }}>
          Add User
        </DialogTitle>
        <DialogContent sx={{ maxWidth: "400px", marginX: "auto" }}>
          <Stack spacing={2}>
            <TextInput label="Email" id="email" {...register("email")} />

            <TextInput label="Role" id="role" {...register("role")} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ maxWidth: "400px", marginX: "auto", paddingX: 3 }}>
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

export const Users = () => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = React.useState(false);

  return (
    <AdminLayout>
      <Box sx={{ bgcolor: "rgb(250, 250, 251)", minHeight: "100vh" }}>
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Users
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
              <Typography>Users</Typography>
            </Box>

            <Box>
              <Button
                variant="outlined"
                disableElevation
                size="medium"
                sx={{ textTransform: "capitalize" }}
                onClick={() => setIsEmailDialogOpen(true)}
              >
                New User
              </Button>
            </Box>
          </Box>

          <UsersTable />
        </Paper>
      </Box>
      <AddEmail
        isOpen={isEmailDialogOpen}
        onClose={() => {
          setIsEmailDialogOpen(false);
        }}
      />
    </AdminLayout>
  );
};
