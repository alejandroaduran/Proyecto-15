import mongoose, { Schema, Document, Types } from "mongoose"

const taskStatus = {
    PENDING: "pending",
    ON_HOLD: "on-hold",
    IN_PROGRESS: "in-progress",
    UNDER_REVIEW: "under-review",
    COMPLETED: "completed",
} as const // as const makes the object readonly and infers the type of the keys

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]
// This will be a union of the values of the taskStatus object

export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId;
    status: TaskStatus;
}

export const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    project: {
        type: Types.ObjectId,
        ref: "Project",
    },
    status: {
        type: String,
        enum: Object.values(taskStatus), // This will be a union of the values of the taskStatus object
        default: taskStatus.PENDING
    }
}, { timestamps: true });
// {timestamps: true} adds createdAt and updatedAt fields to the schema

const Task = mongoose.model<ITask>("Task", TaskSchema)
export default Task