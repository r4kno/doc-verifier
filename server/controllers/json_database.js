import JsonDatabase from "../models/jsonDatabase.js";

export const getUserDetailsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await JsonDatabase.findOne({ emails: email });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
