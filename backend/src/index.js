import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import cors from "cors";
import "dotenv/config.js";
import * as CONSTANTS from "./constants.js";
import { ApiRouter } from "./routes/api/index.js";
import { UserModel } from "./db/schemas/User.js";
import { mongooseInit } from "./db/index.js";
import { GuildModel } from "./db/schemas/Guild.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Setup
app.use(
  session({
    name: "wotify_dashboard_connection",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: CONSTANTS.DISCORD_OAUTH_SCOPES,
    },
    async (accessToken, refreshToken, profile, cb) => {
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      try {
        profile.guilds = await Promise.all(
          profile.guilds.map(async (guild) => {
            return (
              (await GuildModel.findOneAndUpdate({ id: guild.id }, guild)) ??
              GuildModel.create(guild)
            );
          })
        );
        let user = await UserModel.findOneAndUpdate(
          { id: profile.id },
          profile
        );
        if (!user) user = await UserModel.create(profile);
        cb(null, user);
      } catch (err) {
        cb(err, null);
      }
    }
  )
);
passport.serializeUser((profile, done) => {
  process.nextTick(() => {
    return done(null, profile.id);
  });
});
passport.deserializeUser((id, done) => {
  process.nextTick(async () => {
    try {
      const user = await UserModel.findOne({ id })
        .select("-_id")
        .populate("guilds", "-_id")
        .exec();
      done(null, user);
    } catch (err) {
      console.log("passport.deserializeUser error:", err);
      done(err, null);
    }
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api", ApiRouter);

mongooseInit().then(() => {
  app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
  });
});
