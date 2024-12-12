import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
import { emailRegexp } from "../../constants/users.js";


const userSchema = new Schema({
    name: {
        type: String,
        requaired: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        requaired: true,
    },
    password: {
        type: String,
        requaired: true,
    },
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const UserCollection = model('user', userSchema);


export default UserCollection;