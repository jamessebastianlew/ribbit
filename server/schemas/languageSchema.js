import mongoose from 'mongoose';

const { Schema } = mongoose;

const languageSchema = new Schema({
    languageName: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true, });

export default languageSchema;