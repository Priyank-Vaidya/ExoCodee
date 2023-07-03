import passport from "passport";
import config from "./serverConfig.js";
import GitHub from "passport-github2";

const GitHubStrategy = GitHub.Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: config.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("entered github profile.json:");
      console.log(profile);
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
