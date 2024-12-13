// const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        // Check if cookies exist in the request
        if (!req.cookies) {
            return res.status(400).json({
                message: "No cookies found in the request",
                success: false,
            });
        }

        // Extract token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated. Token missing.",
                success: false,
            });
        }

        // Verify the token
        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false,
            });
        }

        // Attach user ID (or other payload info) to the request object
        req.id = decode.userId;
        next();
    } catch (error) {
        console.error("Error in isAuthenticated middleware:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

module.exports = isAuthenticated;
