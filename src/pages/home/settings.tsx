import { Box, Grid, Paper, Typography } from "@mui/material";

import { AdminLayout } from "../../components";
import { Container } from "@mui/system";

export const Settings = () => {
  return (
    <AdminLayout>
      <Box sx={{ bgcolor: "rgb(250, 250, 251)", minHeight: "100vh" }}>
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Settings
        </Typography>
      </Box>

      <Box width="100%">
        <Grid container>
          <Grid item xl={6}>
            <Paper>
              <Typography>Profile Information</Typography>
            </Paper>
          </Grid>
          <Grid item xl={6}>
            <Paper>Locations</Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};
