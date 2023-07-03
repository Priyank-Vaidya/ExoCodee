import { GoogleRepository } from "../repository/index.js";

class GoogleService {
  constructor() {
    this.googleRepository = new GoogleRepository();
  }

  //adding Google fetched user Data to DB
  async addToDB(data) {
    try {

      //create new userData to be created
      const userData = {
        email: data.email,
        name: data.name,
        picture: data.picture,
        googleId: data.sub,
      };
      
      //checking if user already exists
      const user = await this.getUserByEmail(data.email);
      if (user) {
        return {
          data: userData,
          message: "User already exists",
        };
      }
      console.log("entered service add to db");

      const response = await this.googleRepository.create(userData);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.googleRepository.findBy({ email });
      return user;
    } catch (error) {
      console.log("Something went wrong service getUserByEmail");
      throw error;
    }
  }
}

export default GoogleService;
