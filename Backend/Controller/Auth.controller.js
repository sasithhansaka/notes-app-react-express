import HttpStatus from "../constants/HttpStatus.js";
import { hashpassword } from "../utils/hashUtils.js"; 
import issueJwt from "../utils/jwtUtils.js";
import UserModel from "../Modles/User.model.js";
import { checkPassword } from "../utils/hashUtils.js";

const registerUser = async (req, res, next) => {
  const { password, ...userData } = req.body;

  try {
    const userExists = await UserModel.findOne({ email: userData.email });

    if (userExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const { hash, salt } = hashpassword(password);

    const newUser = await UserModel.create({
      ...userData,
      hash,
      salt,
    });

    const { access_token, refresh_Token } = issueJwt(newUser._id, newUser.Full_name);

    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "Strict",
      secure: true,
    });

    res.cookie("refreshToken", refresh_Token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: true,
    });

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};


const LoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("Stored Salt:", user.salt);
    console.log("Stored Hash:", user.hash);
    console.log("Entered Password:", password);

    const isMatch = checkPassword(password, user.salt, user.hash);

    if (!isMatch) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const { access_token, refresh_Token } = issueJwt(user._id, user.Full_name);

     // Modified cookie settings for development environment
     res.cookie("accessToken", access_token, {
      httpOnly: true, 
      maxAge: 900000, 
      sameSite: "Lax",  // Changed from Strict to Lax for development
      secure: false,    // Changed to false for HTTP in development
      // path: "/"         // Explicitly set path
    });
    
    res.cookie("refreshToken", refresh_Token, {
      httpOnly: true, 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      sameSite: "Lax",  // Changed from Strict to Lax for development
      secure: false,    // Changed to false for HTTP in development
      // path: "/"         // Explicitly set path
    });
    
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        fullName: user.Full_name,
        email: user.email,
        accessToken: access_token,
        refreshToken: refresh_Token,
      },
    });
  } catch (err) {
    next(err);
  }
};



// const currentUser = asyncHandler(async (req, res) => {
//   res.send(req.user);
// });

const logout = async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });

  res.status(HttpStatus.OK).json({
    message: "user logout successfully",
    success: true,
  });
};

const currentUser = async (req, res, next) => {
    const userId = req.user._id;

  try {

    const user = await UserModel.findById(userId);

    if(!user){
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "No user found",
      });
    }

    res.status(HttpStatus.OK).json({
      message: "User found",
      success: true,
      data: user,
    });

  }
  catch(err){
    next(err);
  }

}
    



export { registerUser, LoginUser, logout  ,currentUser };
