// //ATLAS
import mongoose from "mongoose";
import config from "./serverConfig.js";
export const connect = async () => {
  try {
    await mongoose.connect(config.DB_URL);
  } catch (error) {
    console.log("Error while connecting " + error.message);
  }
};

// COMPASS;
// import mongoose from "mongoose";

// export const connect = async () => {
//   await mongoose.connect("mongodb://localhost/Xerocodee");
// };
