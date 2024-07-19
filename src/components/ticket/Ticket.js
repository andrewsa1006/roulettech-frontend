import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PriorityTag from "./PriorityTag";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const Ticket = ({ ticket, handleClickOpen, handleHTTPDeleteTicket }) => {
  const onDragStart = (ticket, event) => {
    event.dataTransfer.setData("text", JSON.stringify(ticket));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };
  return (
    <Paper
      id={ticket.id}
      draggable
      onDragStart={onDragStart.bind(this, ticket)}
      sx={{
        p: 2,
        backgroundColor: "#21262c",
        margin: "10px",
        color: "white",
        "&:hover": { backgroundColor: "#444" },
        cursor: "grab",
      }}
    >
      <span onClick={() => handleClickOpen(ticket)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{ticket.title}</Typography>
          <PriorityTag priority={ticket.priority} />
        </Box>
        <hr />
        <Typography variant="body2">{ticket.description}</Typography>
        {ticket.status === "OPEN" && (
          <div>
            <br />
            <Typography variant="body2">
              Opened: {formatDate(ticket.created_at)}
            </Typography>
            <Typography variant="body2">
              Updated: {formatDate(ticket.updated_at)}
            </Typography>
          </div>
        )}

        {ticket.status === "CLOSED" && (
          <div>
            <br />
            <Typography variant="body2">
              Closed: {formatDate(ticket.updated_at)}
            </Typography>
          </div>
        )}
      </span>

      <hr />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={{ margin: "10px" }}
          onClick={() => handleClickOpen(ticket)}
        >
          <Edit
            sx={{
              color: "white",
            }}
          />
        </Button>

        <Button
          variant="contained"
          color="error"
          sx={{ margin: "10px" }}
          onClick={() => handleHTTPDeleteTicket(ticket.id)}
        >
          <Delete
            sx={{
              color: "white",
            }}
          />
        </Button>
      </Box>
    </Paper>
  );
};

export default Ticket;
