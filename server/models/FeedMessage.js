import mongoose from 'mongoose';
import feedMessageSchema from '../schemas/feedMessageSchema.js';

const FeedMessage = mongoose.model('FeedMessage', feedMessageSchema);

export default FeedMessage;

