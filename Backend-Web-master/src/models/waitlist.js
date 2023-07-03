import mongoose from 'mongoose';
const waitlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    },
);
const Waitlist = mongoose.model('Waitlist', waitlistSchema);
export default Waitlist;
