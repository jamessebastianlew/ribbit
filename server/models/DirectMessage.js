import mongoose from 'mongoose';
import directMessageSchema from '../schemas/directMessageSchema.js';

const DirectMessage = mongoose.model('DirectMessage', directMessageSchema);

export default DirectMessage;

