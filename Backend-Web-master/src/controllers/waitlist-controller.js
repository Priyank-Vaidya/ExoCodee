
import WaitlistSerivce from "../services/waitlist-service.js";
const waitlistservice = new WaitlistSerivce();

export const joinWaitlist = async (req, res, next) => {
    try {
        const isUserPresent = await waitlistservice.findByEmail(req.body.email);
        if (isUserPresent) {
            throw new Error("User Already Exist!")
        }
        const response = await waitlistservice.addCutomer({
            name: req.body.name,
            email: req.body.email
        });
        return res.status(201).json({
            success: true,
            message: "Successfully created a new user",
            data: response,
            err: {},
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Unsuccessful, Try Again!",
            err: err,
        });
    }
}

export const getWaitlist = async (req, res, next) => {
    try {
        const response = await waitlistservice.getAll();
        return res.status(201).json({
            success: true,
            message: "Successfully got the list of Waitlist",
            data: response,
            err: {},
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unsuccessful, Try Again!",
            err: err,
        });
    }

}