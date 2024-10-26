import mongoose from "mongoose";

const AuthoritySchema = new mongoose.Schema(
  {
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

  },

  // Timestamps to keep track of when the user document was created and updated
  { timestamps: true }
);

// Compile the User schema into a model, "User" is the model's name
const Authority = mongoose.model("Authority", AuthoritySchema);

// Export the User model
export default Authority;