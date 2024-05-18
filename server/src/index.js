
import app from './app.js';
import { config } from 'dotenv';
import dbConnection from './config/dbConnection.js';
config({
    path: './env'
});

const PORT = process.env.PORT || 3000;

dbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚙️  Server is running at port : ${PORT}`);
        });
    })
    .catch((Error) => {
        console.log('MONGODB CONNECTION FAILED -> ', Error);
    })
