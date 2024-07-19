import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PriorityTag = ({ priority }) => {
  const COLOR = {
    HIGH: "red",
    MEDIUM: "yellow",
    LOW: "green",
  };
  return (
    <Box
      sx={{
        backgroundColor: COLOR[priority],
        color: "black",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="body2">{priority}</Typography>
    </Box>
  );
};
export default PriorityTag;
