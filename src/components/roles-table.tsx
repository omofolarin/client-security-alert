import { Box, Stack } from "@mui/system";
import {
  Button,
  Checkbox,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import capitalize from "lodash.capitalize";
import { useFetchRolesQuery } from "../api";

const OutlinePaper = (props) => <Paper {...props} variant="outlined" />;

export const RolesTable = () => {
  const { data: fetchRoles } = useFetchRolesQuery({});
  const roles = fetchRoles?.data ?? [];

  return (
    <Box sx={{ marginBottom: 16 }}>
      <TableContainer component={OutlinePaper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  color="primary"
                  checked={false}
                  inputProps={{
                    "aria-labelledby": "check-item",
                  }}
                />
              </TableCell>

              <TableCell>Name</TableCell>
              <TableCell align="left">Permissions</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((row, i) => {
              return (
                <TableRow
                  key={i.toString()}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="caption">
                      {(row.permissions ?? []).join(", ")}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                      <Button size="small" sx={{ textTransform: "capitalize" }}>
                        Update
                      </Button>
                      {/* <Divider orientation="vertical" sx={{ height: "2em" }} /> */}
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
