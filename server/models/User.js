import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // First name of the user, required with minimum length of 2 and max length of 50
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    // Last name of the user, required with minimum length of 2 and max length of 50
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    // Email of the user, required with max length of 50 and unique
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    // Password of the user, required with minimum length of 5
    password: {
      type: String,
      required: true,
      min: 5,
    },

    // Picture path of the user's profile picture, default is empty string
    picturePath: {
      type: String,
      default: "",
    },

    // Array of user's friends, default is empty array
    friends: {
      type: Array,
      default: [],
    },
    // User's location, string type
    location: String,

    // User's occupation, string type
    occupation: String,

    // Number of profiles viewed by the user
    viewedProfile: Number,

    // Number of impressions the user's profile received
    impressions: Number,
  },

  // Timestamps to keep track of when the user document was created and updated
  { timestamps: true }
);

// Compile the User schema into a model, "User" is the model's name
const User = mongoose.model("User", UserSchema);

// Export the User model
export default User;