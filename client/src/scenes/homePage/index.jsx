import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import MyDocWidget from "scenes/widgets/MyDocWidget";
import DocsWidget from "scenes/widgets/DocsWidget";


// Home Page
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      {/* NavBar */}
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
        alignItems="center"
      >        
      </Box>
    </Box>
  );
};
export default HomePage;