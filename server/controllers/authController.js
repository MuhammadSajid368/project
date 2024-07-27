import * as config from "../config/config.js";
import jwt from "jsonwebtoken";
import { emailTemplate } from "../helpers/email.js";
import { hashPassword, comparePassword, verifyPassword } from "../helpers/auth.js";
import Auth from "../models/authModel.js";
import { nanoid } from "nanoid";
import validator from "email-validator";
import { userAndTokenResponse } from "../helpers/userAndTokenResponse.js";
import bcrypt from "bcryptjs"

/* Pre-Signup User */
export const preSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation - required
    if (!validator.validate(email)) {
      return res.status(400).json({ error: "Valid email address is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Your Password is required" });
    }
    if (password.length < 5) {
      return res.status(400).json({ error: "Your Password should be at least 5 characters long" });
    }

    // Email Taken Error
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "This Email is already taken please choose a different email address" });
    }

    const token = jwt.sign({ email, password  }, config.JWT_SECRET, {
      expiresIn: "4h",
    });

    // Send email
    config.AWSSES.sendEmail(
      emailTemplate(
        email,
        `
        <h3>Pre Sign Up Verification Code</h3>
        <p>Please click the link below to activate your account.</p>
        <a style='color: orange; font-weight: bold' href="${config.CLIENT_URL}/auth/account-activate/${token}">Activate my Account!!</a>`,
        config.REPLY_TO,
        "Activation Account Link"
      ),
      (err, data) => {
        if (err) {
          console.log(err);
          if (err.code === "MessageRejected" && err.message.includes("Email address is not verified.")) {
            return res.status(400).json({ error: "This email address is not verified for Admin Account.Chose a different one!" });
          } else {
            return res.status(500).json({ error: "Email sending failed. Try again." });
          }
        } else {
          console.log(data);
          res.status(200).json({ message: "Email sent successfully." });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong... Try again",
    });
  }
};


export const signup = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify JWT token
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    if (!decodedToken || !decodedToken.email || !decodedToken.password) {
      return res.status(401).json({ error: "Invalid token provided" });
    }

    const { email, password } = decodedToken;

    // Check if user already exists
    const userExist = await Auth.findOne({ email });
    if (userExist) {
      return res.json({
        error:
          "This Email is already taken please choose a different email address",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await new Auth({
      username: nanoid(7),
      email,
      role : "admin" ,
      password: hashedPassword,
    }).save();

    // Respond with user and token
    userAndTokenResponse(req, res, user);
  } catch (err) {
    console.log(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token provided" });
    }
    res.status(500).json({ error: "Something went wrong... Try again" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, first_name, last_name, email, password, gender, role } = req.body;

    if (!first_name || !last_name || !email || !password || !gender || !role) {
      return res.status(400).json({ error: "Please fill all fields" });
    }
    // Check if user already exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Valid email address is required" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await Auth.create({
      username: nanoid(7),
      first_name,
      last_name,
      email,
      password: hashedPassword,
      gender,
      role
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/* Login User */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    /* 1. Find user by email */
    const user = await Auth.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ error: "User not exists with this email address" });
    }
    /* 2. Compare the password */
    const matched = await comparePassword(password, user.password);
    if (!matched) {
      return res.status(403).json({ error: "Your Password is Wrong" });
    }
    /* 3. Create JWT Tokens */
    userAndTokenResponse(req, res, user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong... Try again",
    });
  }
};

/*  Forgot Password */
/*  Forgot Password */
export const forgotPassword = async (req, res) => {
  try {
    /* 1. find user with provided email */
    const { email } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      res.json({
        error: `Could not find user with that email:${email}`,
      });
    } else {
      /* 2. Generate a random reset code and save it to the database */
      const resetCode = nanoid();
      user.resetCode = resetCode;
      user.save();
      /* 3. Generate a token based on reset code */
      const token = jwt.sign({ resetCode }, config.JWT_SECRET, {
        expiresIn: "1h",
      });
      /* 4. Send clickable link this token based on reset code to email address */
      config.AWSSES.sendEmail(
        emailTemplate(
          email,
          `
      <h3> Reset Password Link </h3> 
      <p> Please click the link below to Access your account. </p>
      <a href='${config.CLIENT_URL}/auth/access-account/${token}'> Access my account </a> 
      `,
          config.REPLY_TO,
          "Using this Reset link to Access your Account"
        ),
        (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({ ok: false });
          } else {
            console.log(data);
            res.status(200).json({ ok: true });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong... Try again",
    });
  }
};

/* Access Account after forgetting pasword */
export const accessAccount = async (req, res) => {
  try {
    /* 1. grab the token (resetCode) & verify with jwt */
    const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET);
    /* 2. query database to find the user matching resetCode & udpate it */
    const user = await Auth.findOneAndUpdate({ resetCode }, { resetCode: "" });
    /* 3.generate the token & refresh token & send user */
    console.log(user);

    userAndTokenResponse(req, res, user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong... Try again",
    });
  }
};

/* Refresh Token  */
export const refreshToken = async (req, res) => {
  try {
    const { id } = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);
    const user = await Auth.findById(id);
    userAndTokenResponse(req, res, user);
  } catch (err) {
    console.log(err);
    res.json({ error: "Refresh Token faield" });
  }
};

/*  Reset your password after forgot it */
export const resetPassword = async (req, res) => {
  const { resetCode } = req.params; // Fixed destructuring
  const { password } = req.body;
  try {
    // Hash the new password
    let hashedPass = await bcrypt.hash(password, 10);

    // Check if user exists with provided token and is not expired
    const user = await Auth.findOneAndUpdate(
      { resetCode },
      { password: hashedPass, resetCode: "" },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong... Try again" });
  }
};


/* Fetch Currently logge in user */
export const loggedInUser = async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id);
    user.password = undefined;
    user.resetCode = undefined;
    res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: "Unauthorized User" });
  }
};

/* Public Profile  */
export const publicProfile = async (req, res) => {
  try {
    const user = await Auth.findOne({ username: req.params.username });
    user.password = undefined;
    user.resetCode = undefined;
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ error: `This User ${req.params.username} not found` });
  }
};
/* Update User Password (logged user only)  */
export const changePassword = async (req, res) => {
  try {
    /* Take User's New Password */
    const { password, lastPassword } = req.body;

    /* Validate New Password */
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    if (password.length < 5) {
      return res.status(400).json({ error: "Password should be at least 5 characters long" });
    }

    /* Verify Last Password */
    if (!lastPassword) {
      return res.status(400).json({ error: "Valid email address is required" });
    }
    const user = await Auth.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isLastPasswordCorrect = await verifyPassword(lastPassword, user.password);
    if (!isLastPasswordCorrect) {
      return res.status(401).json({ error: "Last password is incorrect" });
    }

    /* Hash New Password */
    const hashedPassword = await hashPassword(password);

    /* Update User's Password */
    await Auth.findByIdAndUpdate(req.user.id, {
      password: hashedPassword,
    });

    res.status(200).json({ ok: true, message: "Your password has been changed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/* Update User Porfile (logged user only)  */
export const updateProfile = async (req, res) => {
  try {
    const user = await Auth.findByIdAndUpdate(req.user.id, req.body, {new: true});
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    if(err.codeName === "DuplicateKey"){
     return res.json({error: `Username or Email is already taken please chose different`})
    } else {
      return res.json({error:"Unauthorized"})
    }
  }
};

