import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";
import passport from 'passport';
import errorMiddleware from "./middlewares/error.middleware.js";
import artistRoutes from "./routes/artist.route.js";
import userRoutes from "./routes/user.route.js";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const app = express();
config();

app.use(cookieParser());

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and HTTP authentication to be sent cross-origin
    optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_URL
}, function (accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return done(err, user);
    // });
    cb(null, profile);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), async (req, res, next) => {
    console.log(req);
});

app.use(errorMiddleware);

app.get('/', (req, res) => {
    return res.status(200).json({
        message: `WELCOME Gana App...`
    });
});

app.use("/api/v1/artist", artistRoutes);
app.use("/api/v1/user", userRoutes);

app.all('*', (req, res) => {
    return res.status(404).json({
        message: `oops!page not found...`
    });
});

export default app;
