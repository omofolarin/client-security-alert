import { AdminLayout, TextInput } from "../../components";
// import { Container } from "@mui/system";

// export const Tickets = () => {
//   return <AdminLayout />;
// };

import React, {useState} from 'react';
import { Button, makeStyles, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
interface SupportTicket {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  description: string;

}

const tickets:SupportTicket[] = [
  {
    id: 1,
    title: 'Unable to log in',
    status: 'Open',
    createdAt: '2022-01-01T12:00:00Z',
    description: 'I am unable to log in'
  },
  {
    id: 2,
    title: 'Website down',
    status: 'Open',
    createdAt: '2022-01-02T08:30:00Z',
    description: 'The website is down'
  },
  {
    id: 3,
    title: 'Billing issue',
    status: 'Closed',
    createdAt: '2022-01-03T15:45:00Z',
    description: 'I hav e billing issues '
  },
  {
    id: 4,
    title: 'Feature request',
    status: 'Open',
    createdAt: '2022-01-04T11:20:00Z',
    description: 'I am requesting for a feature '
  },
  {
    id: 5,
    title: 'Product feedback',
    status: 'Open',
    createdAt: '2022-01-05T17:10:00Z',
    description: 'I need feedback '
  },
];

interface SupportTicketTableProps {
  tickets: SupportTicket[];
}

export const Tickets = () => {
const OutlinePaper = (props:any) => <Paper {...props} variant="outlined" />;

  const rowsPerPageOptions = [10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedTickets = tickets.slice(startIndex, endIndex);
  // const {
  //   watch,
  //   setValue,
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FilterForm>({
  //   mode: "onChange",
  //   // resolver: yupResolver(formSchema),
  // });
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
              overflowX: "auto"
            }}
          >
            <Typography variant="subtitle1">Tickets</Typography>
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
      <Table sx={{
         minWidth: 650,
      }} aria-label="support ticket table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Ticket ID</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">Assign</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell align="center">{ticket.id}</TableCell>
              <TableCell align="center">{ticket.title}</TableCell>
              <TableCell align="center">{ticket.description}</TableCell>
              <TableCell align="center" sx={{
                color: `${ticket.status.toLowerCase() === 'open' ? ' #22C55E' : '#E85050'}`
              }}>{ticket.status}</TableCell>
              <TableCell align="center">{ticket.createdAt}</TableCell>
              <TableCell align="center">
                <Box 
                // onClick={() => handleRowClick(ticket)} 
                sx={{
                }}>Assign ticket</Box>
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
