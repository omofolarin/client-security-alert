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

interface IncidentReportProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IncidentTypeForm = (props: IncidentReportProps) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => {
        props.onClose();
      }}
      // aria-labelledby={"incident-dialog"}
    >
      <DialogTitle id={"incident-dialog"} sx={{ fontSize: "1.1rem" }}>
        New Incident Type
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ minWidth: "300px" }}>
        <TextInput id="incidentType" label="Title" />
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
          onClick={() => {}}
          disableElevation
          size="small"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
