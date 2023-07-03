import { GoogleService, GithubService } from "../services/index.js";
import config from "../config/serverConfig.js";
const googleService = new GoogleService();
const githubService = new GithubService();

//if google or Github loged in fails
export const failed = (req, res) => {
  return res.status(401).json({
    success: false,
    message: "failure",
  });
};

//check to authentication by google
export const loggedIn = async (req, res, next) => {
  try {
    if (!req.user) throw err;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Not loggedIn",
      err: err,
    });
  }
};

//if successfully logged in using google
export const dashboardRedirectGoogle = async (req, res, next) => {
  try {
    if (req.user) {
      //add to db
      const response = await googleService.addToDB(req.user);
      res.status(200).json({
        success: true,
        message: "successfull",
        user: response,
        dashboardUrl: `${config.baseUrl}/dashboard`,
        //   cookies: req.cookies
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Not loggedIn",
      err: err,
    });
  }
};

//if successfully logged in using github
export const dashboardRedirectGithub = async (req, res, next) => {
  try {
    if (req.user) {
      //add to db
      const response = await githubService.addToDB(req.user);
      res.status(200).json({
        success: true,
        message: "successfull",
        user: response,
        dashboardUrl: `${config.baseUrl}/dashboard`,
        //   cookies: req.cookies
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Not loggedIn",
      err: err,
    });
  }
};
