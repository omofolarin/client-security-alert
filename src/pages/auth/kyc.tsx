import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { parseErrorMessage, useSubmitKycMutation } from "../../api";

import { FileUploadOutlined } from "@mui/icons-material";
import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormData {
  file: FileList;
}
export const Kyc = () => {
  const navigate = useNavigate();
  const { handleSubmit, watch, register } = useForm<FormData>();
  const [uploadKyc, result] = useSubmitKycMutation();
  const theme = useTheme();

  const fileInput = register("file");

  React.useEffect(() => {
    if (result.isSuccess) {
      const data = result.data;
      navigate(`/home`);
    } else if (result.isError) {
      console.log("caught error", result.error);
      toast.error(parseErrorMessage(result), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [result.isSuccess, result?.isError, result?.data]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("data", data.file[0]);

    await uploadKyc(uploadKyc);
    console.log({ data });
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
                Upload KYC
              </Typography>
            </Box>

            <Box sx={{ marginY: 4 }}>
              <Stack spacing={2.5}>
                <label htmlFor="contained-button-file">
                  <input
                    accept="file"
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: "none" }}
                    {...fileInput}
                  />
                  <Card
                    variant="outlined"
                    sx={Object.assign(
                      {},
                      {
                        borderStyle: "dashed",
                        paddingX: 2,
                        paddingY: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",

                        "&:hover": {
                          bgcolor: "Highlight",
                          cursor: "pointer",
                        },
                      }
                    )}
                  >
                    <FileUploadOutlined color="action" />
                    <Box sx={{ paddingX: 2 }}>
                      <Typography>Upload identification document</Typography>
                      <Typography fontSize={"14px"} color="GrayText">
                        Valid identification document are: ID card, Passport,
                        CAC
                      </Typography>
                    </Box>
                  </Card>
                </label>

                <Box sx={{ width: "100%", marginY: 5 }}>
                  <Button
                    disableElevation
                    variant="contained"
                    sx={{ textTransform: "capitalize" }}
                    disabled={!watch("file")}
                    type="submit"
                    fullWidth
                  >
                    Continue
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </form>
    </Box>
  );
};
