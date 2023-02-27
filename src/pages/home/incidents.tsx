import { Box, Button, Paper, Typography } from "@mui/material";

import { AdminLayout } from "../../components";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

export const Incidents = () => {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <Box sx={{ bgcolor: "rgb(250, 250, 251)", minHeight: "100vh" }}>
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Incidents
        </Typography>
        <Paper
          variant="outlined"
          sx={{ marginX: 4, marginY: 0, paddingX: 2, paddingY: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle1">Incident Reports</Typography>

            <Box>
              <Button
                variant="contained"
                disableElevation
                sx={{ textTransform: "capitalize" }}
                onClick={() => navigate("/home/incidents/create")}
              >
                New Incident Report
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
};
