import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import MyDocWidget from "scenes/widgets/MyDocWidget";
import DocsWidget from "scenes/widgets/DocsWidget";


// Home Page
const AuthorityHomePage = () => {
  // Hook to check if screen size is greater than or equal to 1000px
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

        {/* Create Doc && Get Docs Center  */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : "undefined"}
          mt={isNonMobileScreens ? "undefined" : "2rem"}
        >
          {/* Get Doc */}
          <DocsWidget userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};
export default AuthorityHomePage;