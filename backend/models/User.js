import { Schema, model } from 'mongoose';

var User = new Schema({
    username: { type: String, required: true },
    avatar: { type: String, default: '' },
    email: { type: String, required: true },
    bio: { type: String, default: '' },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    skills: { type: [String], default: [] },
    learn: { type: [String], default: [] },
    connections: { type: [String], default: [] }
});

var User = model('User', User);
export default User;