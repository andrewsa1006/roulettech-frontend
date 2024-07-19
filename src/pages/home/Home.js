import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {
  getAllFromAPI,
  putToAPI,
  deleteFromAPI,
} from "../../config/HttpService";

import Column from "../../components/column/Column";
import TicketDialog from "../../components/ticket/TicketDialog";

const Home = () => {
  const [tickets, setTickets] = useState({});
  const [focusTicket, setFocusTicket] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = (ticket, status) => {
    let tempTicket = ticket || {};
    if (status) {
      tempTicket.status = status;
    }
    setFocusTicket(tempTicket);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFocusTicket({});
  };

  const handleHTTPDeleteTicket = async (id) => {
    try {
      await deleteFromAPI(`tickets/${id}/`);
      let newTickets = { ...tickets };
      for (const key in newTickets) {
        if (newTickets[key].find((ticket) => ticket.id === id)) {
          newTickets[key] = newTickets[key].filter(
            (ticket) => ticket.id !== id
          );
          break;
        }
      }

      setTickets(newTickets);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTicketStatus = async (id, currStatus, newStatus) => {
    const newTickets = { ...tickets };

    if (currStatus === newStatus) {
      return;
    }

    // find ticket
    let ticket = tickets[currStatus].find((ticket) => ticket.id === id);
    if (!ticket) {
      return;
    }

    // update ticket
    try {
      ticket.status = newStatus;
      await putToAPI(`tickets/${id}/`, ticket);

      newTickets[newStatus].push(ticket);
      newTickets[currStatus] = newTickets[currStatus].filter(
        (ticket) => ticket.id !== id
      );

      setTickets(newTickets);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTickets = async () => {
    const unsortedTickets = await getAllFromAPI("tickets/");
    const sortedTickets = {
      OPEN: [],
      IN_PROGRESS: [],
      CLOSED: [],
    };

    try {
      unsortedTickets.tickets.forEach((ticket) => {
        sortedTickets[ticket.status].push(ticket);
      });
    } catch (error) {
      // handle error
      console.log(error);
    }

    Object.keys(sortedTickets).map((key) => {
      sortedTickets[key].sort((b, a) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
    });

    setTickets(sortedTickets);
  };

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              marginBottom: "20px",
              marginTop: "20px",
              color: "white",
            }}
          >
            Welcome to Fake Ticketeer!
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(tickets).map((key) => (
              <Column
                droppable
                key={key}
                tickets={tickets[key]}
                updateTicketStatus={updateTicketStatus}
                status={key}
                handleClickOpen={handleClickOpen}
                handleHTTPDeleteTicket={handleHTTPDeleteTicket}
              />
            ))}
          </Grid>
        </Box>
        <TicketDialog
          open={open}
          focusTicket={focusTicket}
          handleClose={handleClose}
          editingTicket={focusTicket?.created_at ? true : false}
        />
      </Box>
    </div>
  );
};

export default Home;
