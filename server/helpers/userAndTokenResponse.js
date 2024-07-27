import jwt from "jsonwebtoken";
import * as config from "../config/config.js";

export const userAndTokenResponse = (req, res, user) => {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.resetCode = undefined;
  
   return res.json({
      token,
      refreshToken,
      user,
    });
  };
