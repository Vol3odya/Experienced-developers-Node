import { Schema, model } from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks.js";


const waterSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    curDaylyNorm: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true,
});

/*contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateSettings);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const sortByList = ["name", "phoneNumber", "email"];


const contactColection = model('contact', contactSchema);


export default contactColection;*/