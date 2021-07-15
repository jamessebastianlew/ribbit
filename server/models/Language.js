import mongoose from 'mongoose';
import languageSchema from '../schemas/languageSchema.js';

const Language = mongoose.model('Language', languageSchema);

export default Language;

