import mongoose, { Schema } from 'mongoose';
import { encryptPassword } from '../services/password'

const userSchema = new Schema({
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String
        }
}, {
    timestamps: true
})


const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;