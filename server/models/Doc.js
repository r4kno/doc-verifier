import mongoose from "mongoose";

// Define the doc Schema
const docSchema = mongoose.Schema(
  {
    // ID of the user who created the doc
    userId: {
      type: String,
      required: true,
    },

    // First name of the user who created the doc
    firstName: {
      type: String,
      required: true,
    },

    // Last name of the user who created the doc
    lastName: {
      type: String,
      required: true,
    },

    // Location associated with the doc
    location: String,

    // Description of the doc
    description: String,

    // Path to the picture for the doc
    picturePath: String,

    // Path to the picture for the user who created the doc
    userPicturePath: String,

    // Map of likes for the doc, key is user ID and value is boolean indicating like or not
    likes: {
      type: Map,
      of: Boolean,
    },

    // Array of comments for the doc
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true } // include timestamps for creation and update dates
);

// Compile the schema into a model
const doc = mongoose.model("doc", docSchema);

// Export the model
export default doc;
