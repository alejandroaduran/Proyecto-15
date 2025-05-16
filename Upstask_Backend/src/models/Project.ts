import mongoose, { Document, Schema } from "mongoose";

export interface Iproject extends Document {
    projectName: string;
    clientName: string;
    description: string;
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
    }
})

const Project = mongoose.model<Iproject>("Project", ProjectSchema)
export default Project