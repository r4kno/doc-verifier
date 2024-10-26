import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Creating a styled component "FlexBetween" using the styled function and passing the Box component as an argument
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export default FlexBetween;
