import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";


const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        requaired: true,
    },
    accessToken: {
        type: String,
        requaired: true,
    },
    refreshToken: {
        type: String,
        requaired: true,
    },
    accessTokenValidUntil: {
        type: Date,
        requaired: true,
    },
    refreshTokenValidUntil: {
        type: Date,
        requaired: true,
    },
}, { versionKey: false, timestamps: true });

sessionSchema.post("save", handleSaveError);

sessionSchema.pre("findOneAndUpdate", setUpdateSettings);

sessionSchema.post("findOneAndUpdate", handleSaveError);

const SessionCollection = model('session', sessionSchema);

export default SessionCollection;