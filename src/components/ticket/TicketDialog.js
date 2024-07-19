import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { putToAPI, postToAPI } from "../../config/HttpService";

const TicketDialog = ({ focusTicket, handleClose, open, editingTicket }) => {
  const [ticket, setTicket] = useState({});
  const [dialogTitle, setDialogTitle] = useState("");

  const handleChange = (key, event) => {
    console.log(key);
    setTicket({
      ...ticket,
      [key]: event.target.value,
    });
  };

  const handleHTTPPutEditTicket = async () => {
    console.log(ticket);
    try {
      await putToAPI(`tickets/${focusTicket.id}/`, ticket);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleHTTPPostAddTicket = async (e) => {
    if (ticket.title && ticket.status && ticket.priority) {
      try {
        await postToAPI("tickets", ticket);
        handleClose();
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    }
  };

  useEffect(() => {
    setTicket(focusTicket);
    setDialogTitle(`${editingTicket ? "Edit" : "Add"} Ticket`);
  }, [focusTicket]);
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="ticket-dialog"
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={ticket.title || ""}
          onChange={handleChange.bind(this, "title")}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          variant="standard"
          value={ticket.description || ""}
          onChange={handleChange.bind(this, "description")}
        />
        <Box sx={{ minWidth: 120, marginTop: "10px" }}>
          <FormControl fullWidth>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              value={ticket.priority || ""}
              label="Priority"
              onChange={handleChange.bind(this, "priority")}
            >
              <MenuItem value={"LOW"}>Low</MenuItem>
              <MenuItem value={"MEDIUM"}>Medium</MenuItem>
              <MenuItem value={"HIGH"}>High</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120, marginTop: "10px" }}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              value={ticket.status || ""}
              label="Status"
              onChange={handleChange.bind(this, "status")}
            >
              <MenuItem value={"OPEN"}>Open</MenuItem>
              <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
              <MenuItem value={"CLOSED"}>Closed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            editingTicket
              ? handleHTTPPutEditTicket()
              : handleHTTPPostAddTicket()
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDialog;
