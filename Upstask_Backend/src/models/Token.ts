import mongoose, { Schema, Document, Types } from "mongoose";

export interface IToken extends Document {
    token: String,
    user: Types.ObjectId, // Reference to the User model
    createdAt: Date
}

const tokenSchema : Schema = new Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: "10m" // Automatically delete the token after 10 minutes
    },
});

const Token = mongoose.model<IToken>("Token", tokenSchema);
export default Token;
