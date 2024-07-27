import Auth from "../../models/authModel.js";
import errorHandler from "express-error-handler"


export const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, username } = req.body;
    const user = await Auth.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    user.username = username || user.username;
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};