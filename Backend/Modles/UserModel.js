import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    Full_name: {
      type: String,
      required: [true, "please enter Full name "],
    },
    email: {
      type: String,
      required: [true, "please enter email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter password"], 
      minlength: [6, "Password must be at least 6 characters"], 
    },

    createdOn: {
      type: Date,
      default: Date.now,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;