import { GithubRepository } from "../repository/index.js";

class GithubService {
  constructor() {
    this.githubRepository = new GithubRepository();
  }

  //adding Google fetched user Data to DB
  async addToDB(data) {
    try {
      console.log(data);
      
      //create new userData to be created
      const userData = {
        name: data.name,
        picture: data.avatar_url,
        githubId: data.id,
      };
      if (data.email) userData.email = data.email;
      else userData.email = "";
      userData.githubId = data.id.toString();

      //checking if user already exists
      const user = await this.getUserByEmail(data.email);
      if (user) {
        return {
          data: userData,
          message: "User already exists",
        };
      }
      console.log("entered service add to db");

      const response = await this.githubRepository.create(userData);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.githubRepository.findBy({ email });
      return user;
    } catch (error) {
      console.log("Something went wrong service getUserByEmail");
      throw error;
    }
  }
}

export default GithubService;
