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
  import { useState } from "react";
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
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
  
    return (
      <WidgetWrapper m="2rem 0">
        {/* Render the Friend component with information about the doc author */}
        <Friend
          friendId={docUserId}
          name={name}
          subtitle={location}
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
  
        {/* If there's a picture associated with the doc, display it */}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
    
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
          {/* Render the share button */}
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
  
        {/* If comments are displayed, render each comment along with a divider */}
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>{comment}</Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  export default DocWidget;