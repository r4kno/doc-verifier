import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import MyDocWidget from "scenes/widgets/MyDocWidget";
import DocsWidget from "scenes/widgets/DocsWidget";
import ApplicationWidget from "scenes/widgets/ApplicationWidget";


// Home Page
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  
  return (
    <Box>
      {/* NavBar */}
      <Navbar />
      <ApplicationWidget />
    </Box>
  );
};
export default HomePage;