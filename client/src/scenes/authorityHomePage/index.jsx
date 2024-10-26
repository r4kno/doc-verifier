import { Box, useMediaQuery, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { useEffect, useState } from "react";

// Home Page
const AuthorityHomePage = () => {
  // Hook to check if screen size is greater than or equal to 1000px
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

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
        {/* Analyzing Page */}
        <Box
          flexBasis={isNonMobileScreens ? "80%" : "undefined"}
          mt={isNonMobileScreens ? "undefined" : "2rem"}
        >
          <Typography variant="h4" mb="2rem">Analyzing Page</Typography>
          {users.map((user) => (
            <Box key={user._id} mb="2rem" p="1rem" border="1px solid #ccc" borderRadius="0.5rem">
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="textSecondary">{user.email}</Typography>
              <Box mt="1rem">
                {user.docs.map((doc) => (
                  <Box key={doc._id} mb="1rem">
                    <Typography variant="body1">{doc.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{doc.description}</Typography>
                    <Box
                      sx={{
                        backgroundColor: doc.isVerified ? 'green' : 'red',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        mt: '0.5rem',
                      }}
                    >
                      {doc.isVerified ? 'Verified' : 'Not Verified'}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthorityHomePage;