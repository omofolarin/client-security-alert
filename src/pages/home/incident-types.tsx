import { AdminLayout, IncidentTypeForm } from "../../components";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import capitalize from "lodash.capitalize";
import { toast } from "react-toastify";
import { useFetchIncidentTypesQuery } from "../../api";
import { useNavigate } from "react-router-dom";

export const IncidentTypes = () => {
  const [isIncidentReportModalOpen, setIncidentReportModal] =
    React.useState(false);
  const { data: fetchedIncidentTypes, ...fetchedIncidentTypesState } =
    useFetchIncidentTypesQuery("incidentTypes");
  const [incidentTypes, setIncidentTypes] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (fetchedIncidentTypesState.isSuccess) {
      const data = (fetchedIncidentTypes?.data ?? [])?.map((d) => ({
        name: capitalize(d.name),
        id: d.id,
      }));
      console.log(data);
      setIncidentTypes(data);
    } else if (fetchedIncidentTypesState.isError) {
      toast.error("Could not load incident types. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [fetchedIncidentTypesState.isSuccess, fetchedIncidentTypesState.isError]);

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
            <Typography variant="subtitle1">Incident Tags</Typography>

            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                disableElevation
                sx={{ textTransform: "capitalize" }}
                onClick={() => navigate("/home/incidents/create")}
              >
                New Incident Type
              </Button>

              <Button
                variant="contained"
                disableElevation
                sx={{ textTransform: "capitalize" }}
                onClick={() => setIncidentReportModal(true)}
              >
                New Incident Nature
              </Button>

              <Button
                variant="contained"
                disableElevation
                sx={{ textTransform: "capitalize" }}
                onClick={() => setIncidentReportModal(true)}
              >
                New Incident Report
              </Button>
            </Stack>
          </Box>

          <Grid
            container
            sx={{ justifyContent: "space-between", marginTop: 1 }}
          >
            <Grid item xl={5.9}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="left">Types</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {incidentTypes.map((row, i) => (
                      <TableRow
                        key={i.toString()}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xl={5.9}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="left">Incident Nature</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {incidentTypes.map((row, i) => (
                      <TableRow
                        key={i.toString()}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>

        <IncidentTypeForm
          isOpen={isIncidentReportModalOpen}
          onClose={() => setIncidentReportModal(false)}
        />
      </Box>
    </AdminLayout>
  );
};
