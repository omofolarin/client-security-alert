export * from "./settings";
export * from "./incidents";
export * from "./packages";
export * from "./roles";
export * from "./tickets";
export * from "./create-incident";
export * from "./incident-types";
export * from "./incident-view";
export * from "./users";
export * from "./create-ticket";

import {
  Box,
  Card,
  Stack,
  Typography,
  useTheme,
  Link,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { AdminLayout } from "../../components";
import { AccessTime, BarChart, Image } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { TabContext, TabPanel } from "@mui/lab";


export const Dashboard = () => {
  const CustomBox = styled(Box)({
    maxWidth: "100%",
    maxHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  }) as typeof Box;
  const theme = useTheme();
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <AdminLayout>
      <Box
        bgcolor="#FAFAFB"
        sx={{ padding: 4, minHeight: "100vh", overflow: "scroll" }}
      >
        <Box>
          <Typography>Dashboard</Typography>
        </Box>
        {/* Numbers */}
        <Box>
          <Grid
            container
            spacing={2}
            columns={{ xs: 12, sm: 12, md: 12 }}
            sx={{ paddingY: 2 }}
          >
            <Grid item xs={12} sm={6} md={3}>
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
                <Typography color="GrayText">
                  Total incidents in Lagos
                </Typography>

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
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
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
                <Typography color="GrayText">
                  Total incidents in Lagos
                </Typography>

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
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
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
                <Typography color="GrayText">
                  Total incidents in Lagos
                </Typography>

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
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
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
                <Typography color="GrayText">
                  Total incidents in Lagos
                </Typography>

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
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ paddingBottom: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ paddingY: 2 }}
          >
            {/* Recent Actions */}
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                height: "100%",
                paddingX: 1.5,
                paddingY: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Incidents" value="1" />
                    <Tab label="Invoices" value="2" />
                  </Tabs>
                </Box>
                {/* Incidents Tab */}
                <TabPanel value="1">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      marginBottom: 3,
                    }}
                  >
                    <Typography fontWeight={700} variant="h4" fontSize={18}>
                      Recent Incidents
                    </Typography>
                    <Link href="/home/incidents">See All Incidents</Link>
                  </Stack>
                  <Card
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: "100%",
                      paddingX: 1.5,
                      paddingY: 1.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginBottom: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="start"
                      spacing={2}
                      marginBottom={1}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight={"700"}
                          fontSize={"17px"}
                          color="#18181B"
                        >
                          Protest
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                          }}
                        >
                          <AccessTime
                            sx={{
                              color: "GrayText",
                              fontSize: "16px",
                            }}
                          />
                          <Typography color="GrayText" fontSize={"13px"}>
                            3 hours ago
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography fontSize={13}>Ongoing</Typography>
                      </Box>
                    </Stack>
                    <Divider />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      marginTop={1}
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          color="#18181B"
                          fontWeight={"700"}
                        >
                          Ikota
                        </Typography>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontSize={"13px"}
                        >
                          State
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          color="#18181B"
                          fontWeight={"700"}
                        >
                          Shopping Mall
                        </Typography>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontSize={"13px"}
                        >
                          LGA
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: "100%",
                      paddingX: 1.5,
                      paddingY: 1.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginBottom: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="start"
                      spacing={2}
                      marginBottom={1}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight={"700"}
                          fontSize={"17px"}
                          color="#18181B"
                        >
                          Protest
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                          }}
                        >
                          <AccessTime
                            sx={{
                              color: "GrayText",
                              fontSize: "16px",
                            }}
                          />
                          <Typography color="GrayText" fontSize={"13px"}>
                            3 hours ago
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography fontSize={13}>Ongoing</Typography>
                      </Box>
                    </Stack>
                    <Divider />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      marginTop={1}
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          color="#18181B"
                          fontWeight={"700"}
                        >
                          Ikota
                        </Typography>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontSize={"13px"}
                        >
                          State
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          color="#18181B"
                          fontWeight={"700"}
                        >
                          Shopping Mall
                        </Typography>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontSize={"13px"}
                        >
                          LGA
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </TabPanel>

                <TabPanel value="2">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      marginBottom: 3,
                    }}
                  >
                    <Typography fontWeight={700} variant="h4" fontSize={18}>
                      Recent Invoices
                    </Typography>
                    <Link href="/home/subscriptions">See All Invoices</Link>
                  </Stack>
                  <Card
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: "100%",
                      paddingX: 1.5,
                      paddingY: 1.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginBottom: 2,
                    }}
                  >
                    <Box marginBottom={1.5}>
                      <Typography
                        color="GrayText"
                        fontSize={"13px"}
                        textAlign="right"
                      >
                        3 hours ago
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          color="#18181B"
                          fontWeight={"700"}
                        >
                          Rose Helen
                        </Typography>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontSize={"13px"}
                        >
                          Customer
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          color="#18181B"
                          fontWeight={"700"}
                        >
                          Protest
                        </Typography>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontSize={"13px"}
                        >
                          Subscription
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: "100%",
                      paddingX: 1.5,
                      paddingY: 1.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginBottom: 2,
                    }}
                  >
                    <Box marginBottom={1.5}>
                      <Typography
                        color="GrayText"
                        fontSize={"13px"}
                        textAlign="right"
                      >
                        3 hours ago
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          color="#18181B"
                          fontWeight={"700"}
                        >
                          Rose Helen
                        </Typography>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontSize={"13px"}
                        >
                          Customer
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          color="#18181B"
                          fontWeight={"700"}
                        >
                          Protest
                        </Typography>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontSize={"13px"}
                        >
                          Subscription
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: "100%",
                      paddingX: 1.5,
                      paddingY: 1.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginBottom: 2,
                    }}
                  >
                    <Box marginBottom={1.5}>
                      <Typography
                        color="GrayText"
                        fontSize={"13px"}
                        textAlign="right"
                      >
                        3 hours ago
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          color="#18181B"
                          fontWeight={"700"}
                        >
                          Rose Helen
                        </Typography>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontSize={"13px"}
                        >
                          Customer
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          color="#18181B"
                          fontWeight={"700"}
                        >
                          Protest
                        </Typography>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontSize={"13px"}
                        >
                          Subscription
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </TabPanel>
              </TabContext>
            </Card>

            <Card
              variant="outlined"
              sx={{
                width: "100%",
                height: "100%",
                paddingX: 1.5,
                paddingY: 1.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <CustomBox>
                <img
                  src={"../../../public/map-img.png"}
                  alt={"map image"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </CustomBox>
            </Card>
          </Stack>
        </Box>
      </Box>
    </AdminLayout>
  );
};
