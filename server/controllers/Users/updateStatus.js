import Auth from "../../models/authModel.js";



export const updateUserStatus = async (req, res) => {
    try {
      const { userId, status } = req.body;
      const user = await Auth.findByIdAndUpdate(userId, { status }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error updating user status:', error);
      res.status(500).json({ error: error.message });
    }
  };