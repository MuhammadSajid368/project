import Auth from "../../models/authModel.js";

export const fetchAllUsers = async (req, res, next) => {
  const resPerPage = 10;
  const users = await Auth.find();
  const usersCount = Auth.countDocuments;

  if (users.length === 0) {
    console.log(`no  user found`);
    res.status(404).json({
      status: "error",
      message: "No User Found",
    });
  }
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: "users fected successfully",
      resPerPage ,
      users ,
      usersCount
    });
  }, 3000); 
    
};
