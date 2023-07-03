import passport from "passport";
import Google from "passport-google-oauth20";
import config from "./serverConfig.js";

const GoogleStrategy = Google.Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      return done(null, profile._json);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
