import { Schema, model } from 'mongoose';

var Connection = new Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected'], 
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

var Connection = model('Connection', Connection);
export default Connection;