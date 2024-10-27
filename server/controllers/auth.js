import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Authority from "../models/authority.js"; // Import the Authority model

// REGISTER USER
export const register = async (req, res) => {
  try {
    // Destructuring the required fields from the request body
    const { firstName, lastName, email, password } = req.body;

    // Generating salt for bcrypt
    const salt = await bcrypt.genSalt(10);

    // Hashing the password with bcrypt
    const passwordHash = await bcrypt.hash(password, salt);

    // Creating a new user object with the details
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    // Saving the user to the database
    const savedUser = await newUser.save();

    // Sending a 201 status code and the saved user object in the response
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).sort({ lastName: 1 }); // Sorting users by lastName

    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// AUTHORITY LOGIN
export const authorityLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const authority = await Authority.findOne({ email: email }).sort({ email: 1 }); // Sorting authorities by email

    if (!authority) return res.status(400).json({ msg: "Authority does not exist." });

    const isMatch = await bcrypt.compare(password, authority.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

    const token = jwt.sign({ id: authority._id }, process.env.JWT_SECRET);
    delete authority.password;

    res.status(200).json({ token, authority });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
