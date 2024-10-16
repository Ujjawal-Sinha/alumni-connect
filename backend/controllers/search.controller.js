import { User } from "../models/user.model.js"; // Import the User model

// Controller to handle search logic
export const searchUsers = async (req, res) => {
  try {
    const { username, roll, college, branch, batch, company } = req.query;

    // Build a dynamic query object based on the provided query parameters
    let searchQuery = {};

    if (username) {
      searchQuery.username = { $regex: username, $options: "i" }; // Case-insensitive regex search
    }
    if (roll) {
      searchQuery.roll = { $regex: roll, $options: "i" };
    }
    if (college) {
      searchQuery.college = { $regex: college, $options: "i" };
    }
    if (branch) {
      searchQuery.branch = { $regex: branch, $options: "i" };
    }
    if (batch) {
      searchQuery.batch = { $regex: batch, $options: "i" };
    }
    if (company) {
      searchQuery.company = { $regex: company, $options: "i" };
    }

    // Find users that match the search query
    const users = await User.find(searchQuery)
      .select("-password") // Exclude password from the response
      .populate("followers following posts bookmarks"); // Populate references if needed

    // Send the matched users as response
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error occurred during search", error: err.message });
  }
};
