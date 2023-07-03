import Waitlist from "../models/waitlist.js";

class WaitlistRepository {
    async create(data) {
        console.log("data at repo", data);
        try {
            const result = await Waitlist.create(data);
            console.log(result);
            return result;
        } catch (error) {
            console.log(`Something went wrong in User create repo`);
            throw error;
        }
    }
    async getByEmail(data) {
        try {
            const result = await Waitlist.findOne({email: data});
            return result;
        } catch (error) {
            console.log(`Something went wrong in User  get repo`);
            throw error;
        }
    }
    async getAll(id) {
        try {
            const result = await Waitlist.find({});
            return result;
        } catch (error) {
            console.log(`Something went wrong in User getAll repo`);
            throw error;
        }
    }

}

export default WaitlistRepository;