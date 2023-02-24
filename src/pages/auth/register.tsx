import { AccountCircle, Business } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = React.useState<
    "" | "user" | "organization"
  >("");
  const theme = useTheme();

  const selectedStyle: SxProps<Theme> = {
    borderColor: theme.palette.primary.main,
    borderWidth: 1.5,
  };

  return (
    <Box
      width="100%"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "100%",
            xl: "25%",
            lg: "30%",
            md: "50%",
            sm: "60%",
            xs: "95%",
          },
          marginX: "auto",
          marginY: "auto",

          bgcolor: "yellow",
        }}
      >
        <Paper
          sx={{
            minHeight: "440px",
            width: "100%",
            paddingX: 4,
            paddingY: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight={500} fontSize={24}>
              Select Account Type
            </Typography>
          </Box>

          <Box sx={{ marginY: 4 }}>
            <Stack spacing={2.5}>
              <Card
                variant="outlined"
                onClick={() => setAccountType("user")}
                sx={Object.assign(
                  {},
                  {
                    paddingX: 2,
                    paddingY: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    "&:hover": {
                      bgcolor: "Highlight",
                      cursor: "pointer",
                    },
                  },
                  accountType === "user" ? selectedStyle : {}
                )}
              >
                <AccountCircle color="action" />
                <Box sx={{ paddingX: 2 }}>
                  <Typography>User</Typography>
                  <Typography fontSize={"14px"} color="GrayText">
                    Create a user account
                  </Typography>
                </Box>
              </Card>

              <Card
                variant="outlined"
                onClick={() => setAccountType("organization")}
                sx={Object.assign(
                  {},
                  {
                    paddingX: 2,
                    paddingY: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    "&:hover": {
                      bgcolor: "Highlight",
                      cursor: "pointer",
                    },
                  },
                  accountType === "organization" ? selectedStyle : {}
                )}
              >
                <Business color="action" />
                <Box sx={{ paddingX: 2 }}>
                  <Typography>Organization</Typography>
                  <Typography fontSize={"14px"} color="GrayText">
                    Create an account for an organization
                  </Typography>
                </Box>
              </Card>

              <Box sx={{ width: "100%", marginY: 5 }}>
                <Button
                  disableElevation
                  variant="contained"
                  sx={{ textTransform: "capitalize" }}
                  disabled={accountType === ""}
                  onClick={() => {
                    if (accountType === "user") {
                      navigate("/signup/user");
                    } else {
                      navigate("/signup/organization");
                    }
                  }}
                  fullWidth
                >
                  Continue
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
