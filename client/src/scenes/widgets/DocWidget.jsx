import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoc } from "state";

const DocWidget = ({
  docId,
  docUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  useEffect(() => {
    const fetchDocDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/docs/${docId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setIsVerified(data.isVerified);
      } catch (error) {
        console.error('Error fetching doc details:', error);
      }
    };

    fetchDocDetails();
  }, [docId, token]);

  return (
    <WidgetWrapper m="2rem 0">
      {/* Render the Friend component with information about the doc author */}
      <Friend
        friendId={docUserId}
        name={name}
        userPicturePath={userPicturePath}
      />

      {/* Display the description of the doc */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {/* If there's a picture associated with the doc, display it */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="doc"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`}
        />
      )}

      {/* Display verification status */}
      <Box
        sx={{
          backgroundColor: isVerified ? 'green' : 'red',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          mt: '1rem',
        }}
      >
        {isVerified ? 'Verified' : 'Not Verified'}
      </Box>

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">            
          </FlexBetween>
        </FlexBetween>
        
      </FlexBetween>


    </WidgetWrapper>
  );
};

export default DocWidget;