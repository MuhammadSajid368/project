import Auth from "../../models/authModel.js";

export const userDetails = async (req, res, next) => {
  const user = await Auth.findById(req.params.id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not Found!!",
    });
  }
  res.status(200).json({
    success: true,
    user,
  });
};
