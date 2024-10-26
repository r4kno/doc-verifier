import Doc from "../models/Doc.js";
import User from "../models/User.js";

// create doc for user
export const createDoc = async (req, res) => {
  try {
    // Get values from the request body
    const { userId, description, picturePath } = req.body;

    // Find the user by the provided userId
    const user = await User.findById(userId);

    // Create a new doc with the user's information and doc information
    const newDoc = new Doc({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newDoc.save();

    // Get all docs and return them in the response
    const doc = await Doc.find();
    res.status(201).json(doc);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Get Feed Doc of all User
export const getFeedDocs = async (req, res) => {
  try {
    // Get all docs from the database
    const doc = await Doc.find();
    res.status(200).json(doc);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get User's Docs
export const getUserDocs = async (req, res) => {
  try {
    // Get the userId from the URL parameters
    const { userId } = req.params;

    // Get all docs by the user from the database
    const doc = await Doc.find({ userId });
    res.status(200).json(doc);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update doc to like/unlike a doc
export const likeDoc = async (req, res) => {
  try {
    // Get the doc id from the URL parameters
    const { id } = req.params;

    // Get the userId from the request body
    const { userId } = req.body;

    // Find the doc by the provided id
    const doc = await Doc.findById(id);

    // Check if the doc has been liked by the user
    const isLiked = doc.likes.get(userId);

    // If the doc has been liked, unlike it
    if (isLiked) {
      doc.likes.delete(userId);
    } else {
      // If the doc has not been liked, like it
      doc.likes.set(userId, true);
    }
    // update the Doc
    const updatedDoc = await Doc.findByIdAndUpdate(id, { likes: doc.likes }, { new: true });
    res.status(200).json(updatedDoc);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};