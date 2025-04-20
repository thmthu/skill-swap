import Connection  from '../models/Connection.js';
import { getUserByReq } from '../utils/user.js';

export const createConnection = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const user = await getUserByReq(req);
        const connection = await Connection.create({
            sender: user._id,
            receiver: receiverId
        });
        return res.status(200).json({ message: 'Connection created', connection });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const respondConnection = async (req, res) => {
    try {
        const { connectionId, action } = req.body;
        const user = await getUserByReq(req);
        const connection = await Connection.findById(connectionId);
        if (!connection) {
            return res.status(404).json({ message: 'Connection not found' });
        }
        if (connection.receiverId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: `The receiver is different from the user who ${action} this connection` });
        }
        connection.status = action;
        connection.updatedAt = Date.now();
        await connection.save();
        return res.status(200).json({ message: `Connection ${action}ed` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default { createConnection, respondConnection };
