import { UserRepository } from "../repository/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  //JWT encrypting password
  async encryptPass(pass) {
    try {
      const SALT = bcrypt.genSaltSync(9);
      const encryptedPassword = bcrypt.hashSync(pass, SALT);
      return encryptedPassword;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //check if user already exists by email
  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.findBy({ email });
      return user;
    } catch (error) {
      console.log("Something went wrong service getUserByEmail");
      throw error;
    }
  }

  //signup using jwt
  async signup(data) {
    try {
      //added if email exists then return no need to create
      const user = await this.getUserByEmail(data.email);
      if (user) {
        throw {
          message: "User already exists",
        };
      }
      
      //encrypting password
      data.password = await this.encryptPass(data.password);
      const response = await this.userRepository.create(data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //signIn using jwt
  async signin(data) {
    try {
      const user = await this.getUserByEmail(data.email);
      if (!user) {
        throw {
          message: "no user found",
        };
      }

      if (!user.comparePassword(data.password)) {
        throw {
          message: "incorrect password",
        };
      }
      const token = user.genJWT();
      return token;
    } catch (error) {
      console.log("Something went wrong service user login");
      throw error;
    }
  }
}

export default UserService;
