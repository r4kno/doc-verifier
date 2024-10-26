import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

// This component represents a single friend item in a list
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  // Dispatch function to update the state
  const dispatch = useDispatch();

  // Function to navigate to other pages
  const navigate = useNavigate();

  // Selectors to extract data from the global state
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // Destructuring theme properties for easier use
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Check if the friends list is an array and find if the friend is already in the friends list
  
  const isFriend = Array.isArray(friends) && friends.find((friend) => friend._id === friendId); // Line 24

  // Async function to make a PATCH request to update the friends list
  const patchFriend = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // Dispatch the updated friends list to the global state
    dispatch(setFriends({ friends: data }));
  };
  return (
    // FlexBetween component is used to display the elements horizontally with space-between
    <FlexBetween>
      <FlexBetween gap="1rem">
        {/*  UserImage component to display the friend's picture  */}
        <UserImage image={userPicturePath} size="55px" />

        {/* Box component that navigates to the friend's profile page on click  */}
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          {/* Typography component to display the friend's name */}
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          {/* Typography component to display the friend's subtitle  */}
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {/* IconButton component that adds or removes */}
      
    </FlexBetween>
  );
};
export default Friend;
