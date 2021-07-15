import mongoose from 'mongoose';

const { Schema } = mongoose;

const directMessageSchema = new Schema({
    audioPath: {
        type: String,
        required: true,
    },
    toUsername: {
        type: String,
        required: true,

    },
    fromUsername: {
        type: String,
        required: true,
    },
    extra: {
        transcript: {
            type: String,
            required: false,
        },
        correction: {
            type: String,
            required: false,
        },
        correctionAudioPath: {
            type: String,
            required: false,
        },
    },
}, { timestamps: true, });

export default directMessageSchema;