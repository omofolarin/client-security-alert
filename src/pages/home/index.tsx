export * from "./settings";
export * from "./incidents";
export * from "./packages";
export * from "./roles";
export * from "./tickets";
export * from "./create-incident";
export * from "./incident-types";
export * from "./incident-view";
export * from "./users";

import { Box, Card, Stack, Typography, useTheme } from "@mui/material";

import { AdminLayout } from "../../components";
import { BarChart } from "@mui/icons-material";

export const Dashboard = () => {
  const theme = useTheme();
  return (
    <AdminLayout>
      <Box
        bgcolor="#FAFAFB"
        sx={{ padding: 4, minHeight: "100vh", overflow: "scroll" }}
      >
        <Box>
          <Typography>Dashboard</Typography>
        </Box>

        <Box>
          <Stack direction="row" spacing={4} sx={{ paddingY: 2 }}>
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                height: "130px",
                paddingX: 1.5,
                paddingY: 1.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography color="GrayText">Total incidents in Lagos</Typography>

              <Box sx={{ display: "flex" }}>
                <Typography color="black" fontWeight="bold" fontSize="20px">
                  4,42,236
                </Typography>

                <Box
                  sx={{
                    bgcolor: theme.palette.primary.light,
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 2,
                    paddingX: 1,
                    borderRadius: 2,
                  }}
                >
                  <Box color="#fff">
                    <BarChart fontSize="small" color="inherit" />
                  </Box>
                  <Typography
                    color="black"
                    fontSize="14px"
                    sx={{ color: "#fff", paddingX: 1 }}
                  >
                    59.3%
                  </Typography>
                </Box>
              </Box>

              <Typography color="GrayText" fontSize="14px">
                400 critical, 50 mild
              </Typography>
            </Card>

            <Card
              variant="outlined"
              sx={{
                width: "100%",
                height: "130px",
                paddingX: 1.5,
                paddingY: 1.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography color="GrayText">Total incidents in Lagos</Typography>

              <Box sx={{ display: "flex" }}>
                <Typography color="black" fontWeight="bold" fontSize="20px">
                  4,42,236
                </Typography>

                <Box
                  sx={{
                    bgcolor: theme.palette.primary.light,
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 2,
                    paddingX: 1,
                    borderRadius: 2,
                  }}
                >
                  <Box color="#fff">
                    <BarChart fontSize="small" color="inherit" />
                  </Box>
                  <Typography
                    color="black"
                    fontSize="14px"
                    sx={{ color: "#fff", paddingX: 1 }}
                  >
                    59.3%
                  </Typography>
                </Box>
              </Box>

              <Typography color="GrayText" fontSize="14px">
                400 critical, 50 mild
              </Typography>
            </Card>

            <Card
              variant="outlined"
              sx={{
                width: "100%",
                height: "130px",
                paddingX: 1.5,
                paddingY: 1.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography color="GrayText">Total incidents in Lagos</Typography>

              <Box sx={{ display: "flex" }}>
                <Typography color="black" fontWeight="bold" fontSize="20px">
                  4,42,236
                </Typography>

                <Box
                  sx={{
                    bgcolor: theme.palette.primary.light,
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 2,
                    paddingX: 1,
                    borderRadius: 2,
                  }}
                >
                  <Box color="#fff">
                    <BarChart fontSize="small" color="inherit" />
                  </Box>
                  <Typography
                    color="black"
                    fontSize="14px"
                    sx={{ color: "#fff", paddingX: 1 }}
                  >
                    59.3%
                  </Typography>
                </Box>
              </Box>

              <Typography color="GrayText" fontSize="14px">
                400 critical, 50 mild
              </Typography>
            </Card>

            <Card
              variant="outlined"
              sx={{
                width: "100%",
                height: "130px",
                paddingX: 1.5,
                paddingY: 1.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography color="GrayText">Total incidents in Lagos</Typography>

              <Box sx={{ display: "flex" }}>
                <Typography color="black" fontWeight="bold" fontSize="20px">
                  4,42,236
                </Typography>

                <Box
                  sx={{
                    bgcolor: theme.palette.primary.light,
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 2,
                    paddingX: 1,
                    borderRadius: 2,
                  }}
                >
                  <Box color="#fff">
                    <BarChart fontSize="small" color="inherit" />
                  </Box>
                  <Typography
                    color="black"
                    fontSize="14px"
                    sx={{ color: "#fff", paddingX: 1 }}
                  >
                    59.3%
                  </Typography>
                </Box>
              </Box>

              <Typography color="GrayText" fontSize="14px">
                400 critical, 50 mild
              </Typography>
            </Card>
          </Stack>
        </Box>
      </Box>
    </AdminLayout>
  );
};
