import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process"

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        console.log(colors.cyan.bold(`MongoDB connected: ${connection.connection.host} : ${connection.connection.port}`));
    } catch (error) {
        console.log(colors.red.bold(`Error: ${error.message}`));
        exit(1);
    }
}