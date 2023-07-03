import passport from "passport";

export const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) next(err);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorised access no token",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// authMiddleware.js

export const authenticateOAuth = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      // If the user is authenticated, continue to the next middleware
      return res.status(200).json({
        message: " Authenticated",
        data: {},
        success: true,
      });
    } else {
      // If the user is not authenticated, redirect to a login page or send an error response
      throw err;
    }
  } catch (error) {
    // Handle the error appropriately (e.g., log, display an error page)
    return res.status(500).json({
      message: "Not authnticated",
      data: {},
      success: false,
      err: error,
    });
  }
};
