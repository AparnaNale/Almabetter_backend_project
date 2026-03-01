import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Auth');
        if (!token) return res.status(401).json({ message: "Login first" });

        const decoded = jwt.verify(token, process.env.JWT);
        const id = decoded.userId;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired, please login again" });
        }

        return res.status(401).json({ message: "Invalid token" });
    }
};