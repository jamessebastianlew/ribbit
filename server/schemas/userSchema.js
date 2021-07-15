import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    nativeLanguage: {
        type: String,
        required: true,
    },
    learnLanguage: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: false,
    },
}, { timestamps: true, });

export default userSchema;