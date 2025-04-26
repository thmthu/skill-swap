import { Schema, model } from 'mongoose';

var User = new Schema({
    username: { type: String, required: true },
    avatar: { type: String, default: '' },
    email: { type: String, required: true, unique: true, match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email."
    ]},
    bio: { type: String, default: '' },
    password: { type: String, required: false },
    googleId: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    skills: { type: [String], default: [] },
    learn: { type: [String], default: [] },
    connections: { type: [String], default: [] }
});

var User = model('User', User);
export default User;