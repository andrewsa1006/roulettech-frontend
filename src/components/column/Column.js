import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import Ticket from "../ticket/Ticket";

const Column = ({
  tickets,
  status,
  updateTicketStatus,
  handleClickOpen,
  handleHTTPDeleteTicket,
}) => {
  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (newStatus, event) => {
    event.preventDefault();
    const ticket = JSON.parse(event.dataTransfer.getData("text"));
    updateTicketStatus(ticket.id, ticket.status, newStatus);
  };

  return (
    <Grid sx={{ width: "20vw", height: "75vh" }} item xs={12} md={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "#2a2d32",
          borderRadius: "10px",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <Typography color={"white"} textAlign={"center"} variant="h6">
          {status.replace("_", " ")}
        </Typography>

        <Button
          variant="contained"
          color="success"
          sx={{ margin: "10px" }}
          onClick={() => handleClickOpen({}, status)}
        >
          <AddIcon />
        </Button>
      </Box>
      <Box
        droppable={"true"}
        onDrop={onDrop.bind(this, status)}
        onDragOver={onDragOver}
        sx={{
          width: "100%",
          height: "100%",
          minHeight: "75vh",
          backgroundColor: "#2a2d32",
          paddingTop: "5px",
          borderRadius: "10px",
        }}
      >
        {tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            handleClickOpen={handleClickOpen}
            handleHTTPDeleteTicket={handleHTTPDeleteTicket}
          />
        ))}
      </Box>
    </Grid>
  );
};

export default Column;
