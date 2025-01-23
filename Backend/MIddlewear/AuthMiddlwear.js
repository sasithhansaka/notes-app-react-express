import User from "../Modles/UserModel.js";
import mongoose from "mongoose";

const authMiddleware = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      succes: false,
      message: "userid not found",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID format",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Id invalid",
    });
  }

  next();
};

export default authMiddleware;