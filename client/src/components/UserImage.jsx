import { Box } from "@mui/material";

// UserImage component to display a user image
const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      {/* Wrap the image in a Box element and set its width and height */}
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        // Image source URL, constructed from the base URL defined in the environment variables and the image name
        src={`${process.env.REACT_APP_BASE_URL}/assets/${image}`}
      />
    </Box>
  );
};
export default UserImage;
