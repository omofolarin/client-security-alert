import { Box, Stack, SxProps } from "@mui/system";
import {
  Button,
  Checkbox,
  Divider,
  Paper,
  PaperClasses,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@mui/material";
import { ElementType, ReactNode } from "react";

import { CommonProps } from "@mui/material/OverridableComponent";
import capitalize from "lodash.capitalize";
import { useFetchCompanyUsersQuery } from "../api";

const OutlinePaper = (
  props: JSX.IntrinsicAttributes & { component: ElementType<any> } & {
    children?: ReactNode;
    classes?: Partial<PaperClasses> | undefined;
    elevation?: number | undefined;
    square?: boolean | undefined;
    sx?: SxProps<Theme> | undefined;
    variant?: "elevation" | "outlined" | undefined;
  } & CommonProps &
    Omit<
      any,
      keyof CommonProps | "children" | "sx" | "elevation" | "variant" | "square"
    >
) => <Paper {...props} variant="outlined" />;

export const UsersTable = () => {
  const { data: fetchCompanyUsers } = useFetchCompanyUsersQuery({});
  const companyUsers = fetchCompanyUsers?.data?.users ?? [];

  return (
    <Box>
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

              <TableCell>Email</TableCell>
              <TableCell align="center">First name</TableCell>
              <TableCell align="center">Last name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyUsers.map((row, i) => {
              return (
                <TableRow
                  key={i.toString()}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.first_name}
                  </TableCell>
                  <TableCell align="left">
                    {capitalize(row.last_name)}
                  </TableCell>

                  <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                      <Button size="small" sx={{ textTransform: "capitalize" }}>
                        View
                      </Button>
                      <Divider orientation="vertical" sx={{ height: "2em" }} />
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
