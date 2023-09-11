import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  logoutUser,
  deleteUser,
  getUserById,
  updateUser,
};
