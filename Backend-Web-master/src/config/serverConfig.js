import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  secretOrKey: process.env.secretOrKey,
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  baseUrl: process.env.baseUrl,
  DB_URL: process.env.DB_URL,
};

export default config;
