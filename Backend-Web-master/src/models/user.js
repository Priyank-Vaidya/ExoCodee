import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/serverConfig.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    googleId: {
      type: String,
      default: "",
    },
    githubId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//comapring password
userSchema.methods.comparePassword = function compare(password) {
  return bcrypt.compareSync(password, this.password);
};

//generate password
userSchema.methods.genJWT = function generate() {
  try {
    const token = jwt.sign(
      { id: this.id, email: this.email },
      config.secretOrKey,
      {
        expiresIn: "1h",
      }
    );
    return token;
  } catch (error) {
    console.log("Token not able to create", error);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
