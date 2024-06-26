
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const dbConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (Error) {
        console.log("MONGODB CONNECTION ERROR -> ", Error);
        process.exit(1);

    }
}

export default dbConnection;
