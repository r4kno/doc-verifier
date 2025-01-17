import mongoose from "mongoose";

const jsonDatabaseSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    ContactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: [String],
      default: [],
    },
    fatherName: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const JsonDatabase = mongoose.model("JsonDatabase", jsonDatabaseSchema);

export default JsonDatabase;