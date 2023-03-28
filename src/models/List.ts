import { InferSchemaType, model, Schema } from "mongoose";

const listSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    task: {
        type: String,
        required: true,
    },
    priority: {
        type: Array,
        required: true,
    },
    duedate: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }

}, { timestamps: true });

type List = InferSchemaType<typeof listSchema>;

export default model<List>("Todo List", listSchema);
