import * as yup from "yup";

import { AdminLayout, TextInput } from "../../components";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useSubmitTicketMutation } from "../../api";
import React from "react";
import capitalize from "lodash.capitalize";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface FormValues {
  name: string;
  email: string;
  title: string;
  message: string;
}

interface Props {
  onSubmit: (values: FormValues) => void;
}

const schema = yup.object().shape({
  title: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
  owner: yup.string().required(),
});
interface IncidentForm {
  title: string;
  message: string;
  owner: string;
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
  const { authState } = useAuth();
  const navigate = useNavigate();

  const [submitTicket, result] = useSubmitTicketMutation();

  const messageInput = register("message");
  const subjectInput = register("title");

  const onSubmit = async (v: any) => {
    console.log(v);
    await submitTicket({
      ...v,
      closed: false,
    });
  };
  React.useEffect(() => {
    if (authState?.user?.user_id) {
      setValue("owner", authState?.user?.user_id);
    }
  }, [authState?.user?.user_id]);
  React.useEffect(() => {
    if (result.isSuccess) {
      navigate("/home/tickets");
      toast.success("Ticket created successfully");
    }
  }, [result.isSuccess]);
  return (
    <AdminLayout>
      <Box
        sx={{
          bgcolor: "rgb(250, 250, 251)",
          overflowY: "scroll",
          height: "100%",
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
            width: {
              md: "60%",
            },
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
            <Typography variant="subtitle1">Create Ticket</Typography>
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
                id="title"
                label="Subject"
                {...subjectInput}
                error={Boolean(errors["title"])}
                helpText={capitalize(errors["title"]?.message)}
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
