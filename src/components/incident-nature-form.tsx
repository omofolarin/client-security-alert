import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";

import React from "react";
import { TextInput } from "./input";
import { useForm } from "react-hook-form";

interface IncidentReportProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IncidentNatureForm = (props: IncidentReportProps) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {};

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => {
        props.onClose();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id={"incident-dialog"} sx={{ fontSize: "1.1rem" }}>
          New Incident Nature
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ minWidth: "300px" }}>
          <TextInput
            id="incidentType"
            label="Title"
            {...register("incident_nature")}
          />
        </DialogContent>

        <DialogActions sx={{ mx: 2 }}>
          <Button
            sx={{ textTransform: "capitalize" }}
            onClick={() => {
              props.onClose();
            }}
            size="small"
          >
            Cancel
          </Button>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            type="submit"
            disableElevation
            size="small"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
