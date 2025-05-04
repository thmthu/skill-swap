import { getUserById } from '../utils/user.js';
import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const { name, skills } = req.query;
        const query = {};
        if (name) {
            query.username = { $regex: name, $options: 'i' };
        }
        if (skills) {
            query.skills = { $in: skills.split(',') };
        }
        const users = await User.find(query).select('-password');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const addSkill = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const { skill } = req.body;
        user.skills.push(skill);
        await user.save();
        return res.status(200).json(user.skills);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const addLearn = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const { learn } = req.body;
        user.learn.push(learn);
        await user.save();
        return res.status(200).json(user.learn);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteSkill = async (req, res) => {
    try {   
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const { skill } = req.body;
        user.skills = user.skills.filter(s => s !== skill);
        await user.save();
        return res.status(200).json(user.skills);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteLearn = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const { learn } = req.body;
        user.learn = user.learn.filter(l => l !== learn);
        await user.save();
        return res.status(200).json(user.learn);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateUserPreference = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const { bio, skills, learn } = req.body;
        user.bio = bio;
        user.skills = skills;
        user.learn = learn;
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUserRecommendations = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const recommendations = await User.find({
            skills: { $in: user.learn },
            _id: { $ne: req.userId }
        }).select('-password');
        return res.status(200).json(recommendations);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export default { getAllUsers, 
                getUserProfile, 
                addSkill, 
                addLearn, 
                deleteSkill, 
                deleteLearn, 
                updateUserPreference,
                getUserRecommendations };
