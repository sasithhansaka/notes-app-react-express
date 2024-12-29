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
    },
    password: {
      type: String,
      required: [true, "please enter password"],
    },
    createdOn: {
      type: Date,
      default: Date.now, 
    },
    // verified: {
    //   type: Boolean,
    //   default: false,
    // }, 
   },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
