import mongoose, { Document, Schema, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";

export interface Iproject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<ITask[] & Document>[];
}

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
        //unique: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: "Task"
        }
    ]
}, {timestamps: true});
// {timestamps: true} adds createdAt and updatedAt fields to the schema

const Project = mongoose.model<Iproject>("Project", ProjectSchema)
export default Project