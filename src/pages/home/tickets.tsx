import { AdminLayout, TextInput } from "../../components";
import React, { useState } from "react";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFetchTicketsQuery } from "../../api";
import * as moment from "moment";
interface SupportTicket {
  id: number;
  subject: string;
  status: string;
  createdAt: string;
  message: string;
}

interface TicketsProps {
  assignee: string;
  closed: boolean;
  created_at: string;
  id: number;
  message: string;
  owner: string;
  read: boolean;
  title: string;
  updated_at: string;
}

const tickets: SupportTicket[] = [
  {
    id: 1,
    subject: "Unable to log in",
    status: "Open",
    createdAt: "2022-01-01T12:00:00Z",
    message: "I am unable to log in",
  },
  {
    id: 2,
    subject: "Website down",
    status: "Open",
    createdAt: "2022-01-02T08:30:00Z",
    message: "The website is down",
  },
  {
    id: 3,
    subject: "Billing issue",
    status: "Closed",
    createdAt: "2022-01-03T15:45:00Z",
    message: "I hav e billing issues ",
  },
  {
    id: 4,
    subject: "Feature request",
    status: "Open",
    createdAt: "2022-01-04T11:20:00Z",
    message: "I am requesting for a feature ",
  },
  {
    id: 5,
    subject: "Product feedback",
    status: "Open",
    createdAt: "2022-01-05T17:10:00Z",
    message: "I need feedback ",
  },
];

interface SupportTicketTableProps {
  tickets: SupportTicket[];
}

const FormatDate = (date: string) => {
  let dateSupplied = new Date(date);
  return dateSupplied.toLocaleString();
};
export const Tickets = () => {
  const OutlinePaper = (props: any) => <Paper {...props} variant="outlined" />;
  const { data: fetchTickets, ...results } = useFetchTicketsQuery("tickets");

  const rowsPerPageOptions = [10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [ticketsData, setTicketsData] = useState<TicketsProps | null>(null);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedTickets = tickets.slice(startIndex, endIndex);

  React.useEffect(() => {
    if (results && results.isSuccess) {
      const { data } = results.currentData;
      console.log({ data });
      setTicketsData(data);
    }
  }, [results.isSuccess]);

  return (
    <AdminLayout>
      <Box sx={{ bgcolor: "rgb(250, 250, 251)", minHeight: "100vh" }}>
        <Typography sx={{ paddingX: 4, paddingY: 2, fontSize: "0.9rem" }}>
          Home / Tickets
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
              overflowX: "auto",
            }}
          >
            <Typography variant="subtitle1">Tickets</Typography>
            <Link href="create-ticket">
              <Button
                variant="contained"
                disableElevation
                sx={{ textTransform: "capitalize" }}
              >
                Create a New Ticket
              </Button>
            </Link>
          </Box>
          <form>
            <Stack
              spacing={1}
              direction="row"
              alignItems={"center"}
              justifyContent={"flex-start"}
              width="100%"
              sx={{ paddingY: 4 }}
            >
              <Box sx={{ width: "50%" }}>
                <TextInput
                  label="Search"
                  placeholder="Search ..."
                  id="search"
                  // {...searchInput}
                />
              </Box>

              <Box
                display="flex"
                justifyContent={"center"}
                alignItems="flex-end"
              >
                <Button
                  variant="contained"
                  type="submit"
                  disableElevation
                  sx={{ marginTop: 2.5, textTransform: "capitalize" }}
                >
                  Filter
                </Button>
              </Box>
            </Stack>
          </form>
          <TableContainer component={OutlinePaper}>
            <Table
              sx={{
                minWidth: 650,
              }}
              aria-label="support ticket table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Ticket ID</TableCell>
                  <TableCell align="center">Subject</TableCell>
                  <TableCell align="center">Message</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Created At</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketsData?.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell align="center">{ticket.id}</TableCell>
                    <TableCell align="center">{ticket.title}</TableCell>
                    <TableCell align="center">{ticket.message}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: `${ticket.close ? "#E85050" : "#22C55E"}`,
                      }}
                    >
                      {ticket.close ? "Closed" : "Open"}
                    </TableCell>
                    <TableCell align="center">
                      {ticket.created_at && FormatDate(ticket.created_at)}
                      {/* {ticket.created_at} */}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        // onClick={() => handleRowClick(ticket)}
                        sx={{}}
                      >
                        Assign ticket
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={tickets.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default Tickets;
