import User from "../models/User.js";

// READ - Get User by ID
export const getUser = async (req, res) => {
  try {
    // Get the ID from the request parameters
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);
    res.status(200).json(user);

    // Log the user for debugging purposes
    console.log(user);
  } catch (err) {
    res.status(404).json({ message: err.message, error: "error in getuser" });
  }
};

// READ - Get User by ID
export const getUserFriends = async (req, res) => {
  try {
    // Get the ID from the request parameters
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    // Find the user's friends by ID
    const friends = await Promise.all(user.friends.map((id) => User.findById(id)));

    // Format the friends to only include specific fields
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Send the formatted friends data as response
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE - Add/Remove friend
export const addRemoveFriend = async (req, res) => {
  try {
    // Get user id and friend id from request params
    const { id, friendId } = req.params;

    // Find user and friend by id
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Check if friend is already added
    if (user.friends.includes(friendId)) {
      // Remove friend from user's friends list
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // Add friend to user's friends list
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Save the changes
    await user.save();
    await friend.save();

    // Get all friends of the user
    const friends = await Promise.all(user.friends.map((id) => User.findById(id)));

    // Format the friends data
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    // Format the friends data
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
