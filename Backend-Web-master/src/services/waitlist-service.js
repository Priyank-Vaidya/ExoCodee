import WaitlistRepository from "../repository/waitlist-repository.js";


class WaitlistSerivce {
    constructor() {
        this.WaitlistRepository = new WaitlistRepository();
    }

    async addCutomer(data) {
        try {
            const response = await this.WaitlistRepository.create(data);
            return response
        }
        catch (err) {
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.WaitlistRepository.getAll();
            return response;
        }
        catch (error) {
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const response = await this.WaitlistRepository.getByEmail(email);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}

export default WaitlistSerivce;