import jwt from "jsonwebtoken";

// Middleware to verify JSON web token in the request header
export const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the request header
    let token = req.header("Authorization");

    // If the token is not present in the request header
    if (!token) {
      // Return a 403 error with an 'Access Denied' message
      res.status(403).send("Access Denied");
    }

    // Return a 403 error with an 'Access Denied' message
    if (token.startsWith("Bearer ")) {
      // Remove 'Bearer ' from the token
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the JWT_SECRET from the environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the verified user to the request object
    req.user = verified;

    // Call the next middleware function in the chain
    next();
  } catch (err) {
    // Return a 500 error with the error message
    res.status(500).json({ error: err.message });
  }
};
