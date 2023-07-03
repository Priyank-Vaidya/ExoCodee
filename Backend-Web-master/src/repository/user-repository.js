import User from "../models/user.js";

class UserRepository {
  async create(data) {
    console.log("data at repo", data);
    try {
      const result = await User.create(data);
      console.log(result);
      return result;
    } catch (error) {
      console.log(`Something went wrong in User create repo`);
      throw error;
    }
  }

  async destroy(id) {
    try {
      const result = await User.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log("Something went wrong User in destroy repo ");
      throw error;
    }
  }

  async get(id) {
    try {
      const result = await User.findById(id);
      return result;
    } catch (error) {
      console.log(`Something went wrong in User  get repo`);
      throw error;
    }
  }

  async getAll(id) {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      console.log(`Something went wrong in User getAll repo`);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return result;
    } catch (error) {
      console.log(`Something went wrong in User update repo`);
      throw error;
    }
  }

  async findBy(data) {
    try {
      const response = await User.findOne(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async findBy(data) {
    try {
      const response = await User.findOne(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;
