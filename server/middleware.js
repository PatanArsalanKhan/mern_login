const jwt = require("jsonwebtoken");
const JWT_SECRET = "yourSecretKey";  // Same secret as in server.js

const middleware = (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = middleware;
