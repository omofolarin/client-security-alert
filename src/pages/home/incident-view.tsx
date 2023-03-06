import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { AdminLayout } from "../../components";
import { Box } from "@mui/system";
import React from "react";
import capitalize from "lodash.capitalize";
import { useFetchIncidentDetailsQuery } from "../../api";
import { useParams } from "react-router-dom";

export const ViewIncident = (props) => {
  const { id } = useParams();
  const { data: fetchDetails, ...fetchDetailState } =
    useFetchIncidentDetailsQuery({ id });

  const incident = fetchDetails?.data;
  console.log({ incident });
  return (
    <AdminLayout>
      <Box sx={{ bgcolor: "rgb(250, 250, 251)", minHeight: "100vh" }}>
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Incidents / View
        </Typography>
        <Paper
          variant="outlined"
          sx={{ marginX: 4, marginY: 0, paddingX: 2, paddingY: 4 }}
        >
          {fetchDetailState.isFetching && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingY: 4,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {fetchDetailState.isError && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingY: 4,
              }}
            >
              <Typography>Error fetching incident.</Typography>

              <Button onClick={async () => await fetchDetailState.refetch()}>
                Retry
              </Button>
            </Box>
          )}

          {incident && (
            <Stack spacing={1}>
              <Box>
                <Typography variant="body1">Name - {incident.name}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography>
                  Type - {capitalize(incident.incident_type)}{" "}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography>
                  Nature - {capitalize(incident.incident_nature)}{" "}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography>Date - {capitalize(incident.date)}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography>Time - {capitalize(incident.time)}</Typography>
              </Box>
              <Divider />

              <Box>
                <Typography>Lga - {capitalize(incident.lga)}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography>State - {capitalize(incident.state)}</Typography>
              </Box>

              <Divider />
              <Box>
                <Typography>
                  Details - {capitalize(incident.details)}{" "}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography>Occurrences - {capitalize("")}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography>
                  No of victims - {capitalize(incident.number_of_victims)}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography>
                  Prior warnings - {capitalize(incident.prior_warnings)}{" "}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography>
                  Perpetrators - {capitalize(incident.perpetrators)}{" "}
                </Typography>
              </Box>
            </Stack>
          )}
        </Paper>
      </Box>
    </AdminLayout>
  );
};
