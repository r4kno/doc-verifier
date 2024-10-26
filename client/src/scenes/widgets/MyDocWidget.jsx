import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDocs } from "state";

const MydocWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [doc, setDoc] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  // Function for creating new doc
  const handledoc = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append the user ID and doc description to the form data
    formData.append("userId", _id);
    formData.append("description", doc);

    // If an image is selected, append it to the form data
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    // Make a POST request to the server with the form data
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/docs`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    // Get the updated list of docs from the server
    const docs = await response.json();

    // Dispatch an action to update the docs in the Redux store
    dispatch(setDocs({ docs }));

    // Reset the image and doc
    setImage(null);
    setDoc("");
  };

  return (
    <WidgetWrapper>
      {/* Display the user image and doc input */}
      <FlexBetween gap="1.5rem">
        {/* User image component */}
        <UserImage image={picturePath} />

        {/* Input for doc text */}
        <InputBase
          placeholder="Document Name"
          onChange={(e) => setDoc(e.target.value)}
          value={doc}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {/* Show the image section if isImage is true */}
      {isImage && (
        <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
          {/* Dropzone component to add image */}
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                {/* Box to display the add image text or selected image name */}
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Document Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>

                {/* Delete button to remove image */}
                {image && (
                  <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      {/* Display various options and doc button */}
      <FlexBetween>
        {/* Option to add image */}
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
            Attach Document
          </Typography>
        </FlexBetween>

        {/* Options for non-mobile screens */}
        {isNonMobileScreens ? (
          <>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        {/* Button for doc  */}
        <Button
          disabled={!doc}
          onClick={handledoc}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          doc
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MydocWidget;
