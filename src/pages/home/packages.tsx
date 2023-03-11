import { Box, Button, Stack, Typography } from "@mui/material";

import { AdminLayout } from "../../components";
import { useNavigate } from "react-router-dom";

export const Packages = () => {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <Box
        sx={{
          bgcolor: "rgb(250, 250, 251)",
          minHeight: "100vh",
          paddingX: 4,
          paddingY: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1">Subscriptions</Typography>

          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              disableElevation
              sx={{ textTransform: "capitalize" }}
              onClick={() => navigate("/home/subscriptions/create")}
            >
              New subscription
            </Button>

            <Button
              variant="contained"
              disableElevation
              sx={{ textTransform: "capitalize" }}
              onClick={() => navigate("/home/invoices/create")}
            >
              New invoice
            </Button>
          </Stack>
        </Box>
      </Box>
    </AdminLayout>
  );
};
