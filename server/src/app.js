import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from "morgan"
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.middleware.js";
const app = express();

//configure env
dotenv.config();
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
app.use(cookieParser());
app.use(morgan("dev"));

app.use(errorMiddleware);

app.get('/', (req, res) => {
    return res.status(200).json({
        message: `WELCOME Gana App...`
    });
});


app.all('*', (req, res) => {
    return res.status(404).json({
        message: `oops!page not found...`
    });
});

export default app;