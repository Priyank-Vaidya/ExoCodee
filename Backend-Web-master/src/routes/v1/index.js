import express from "express";

/* Importing Other Routes */
import WaitlistRoutes from './waitlistRoutes.js'
/* --------------------------------------------- */
import { signup, login, checkAuth } from "../../controllers/auth-controller.js";
import {
  failed,
  loggedIn,
  dashboardRedirectGoogle,
  dashboardRedirectGithub,
} from "../../controllers/google-github-controller.js";
import {
  authenticate,
  authenticateOAuth, //can be used for future use
} from "../../middlewares/authenticate.js";
import passport from "passport";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

//GOOGLE LOGIN
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/failed",
  }),
  dashboardRedirectGoogle
);

//GITHUB LOGIN
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/v1/failed",
  }),
  dashboardRedirectGithub
);

//failed redirecting if we are using this
router.get("/failed", failed);

//authentication testing:
router.get("/tempJWT", authenticate, checkAuth);
router.get("/tempOther", authenticateOAuth, checkAuth);

// Routes for Waitlist
router.use('/waitlist', WaitlistRoutes);


export default router;
