import mongoose from 'mongoose';

const { Schema } = mongoose;

const feedMessageSchema = new Schema({
    audioPath: {
        type: String,
        required: true,
    },
    nativeLanguage: {
        type: String,
        required: true,
    },
    learnLanguage: {
        type: String,
        required: true,
    },
    fromUsername: {
        type: String,
        required: true,
    },
}, { timestamps: true, });

export default feedMessageSchema;