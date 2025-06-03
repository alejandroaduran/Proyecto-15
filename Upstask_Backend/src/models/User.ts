import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: String,
    password: String,
    name: String,
    confirmed: Boolean,
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
})

const User = mongoose.model<IUser>("User", userSchema);

export default User;