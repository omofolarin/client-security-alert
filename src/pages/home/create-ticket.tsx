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
  Button,
  Card,
  makeStyles,
  Paper,
  Stack,
  TextField,
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

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Props {
  onSubmit: (values: FormValues) => void;
}

const schema = yup.object().shape({
  // name: yup.string().required("Name is required"),
  // email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});
interface IncidentForm {
  subject: string;
  message: Date;
}
export const CreateTicket = () => {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncidentForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  // const classes = useStyles();

  // const onSubmitHandler = handleSubmit((data) => {
  //   // onSubmit(data);
  //   console.log(data)
  // });
  const messageInput = register("message");
  const subjectInput = register("subject");
  const onSubmit = async (v: any) => {
    console.log(v);
  };
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
          Home / Tickets / Create
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
              <TextInput
                id="subject"
                label="Subject"
                {...subjectInput}
                error={Boolean(errors["subject"])}
                helpText={capitalize(errors["subject"]?.message)}
              />
              <TextInput
                id="message"
                label="Message"
                {...messageInput}
                error={Boolean(errors["message"])}
                helpText={capitalize(errors["message"]?.message)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                // className={classes.submitButton}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
};
