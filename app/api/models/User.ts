import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
        name: {
            type: String,
            trim: true
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