const jwt = require('jsonwebtoken');
// require('dotenv').config();

const authMiddleware = (requiredRole) => {
        return async(req, res, next) => {
                const token = req.header('Authorization')?.split(' ')[1];
                if(!token) {
                    return res.status(401).json({message:'No token, Authorization Denied'});
                }
                try {
                    
                    jwt.verify(token, process.env.JWT_SECRET_KEY,  (err, decoded) => {
                        if(err) {
                            return res.status(403).json({message:'Invalid or Expired token'});
                        }
                        req.user = decoded;
                        if(requiredRole && req.user.user.role !== requiredRole) {
                            return res.status(403).json({message:'Access denied, insufficient role'});
                        }

                        next();
                    });

                }catch(err) {
                    res.status(404).send({message:'Error in token validation'})
                }
            }
}

module.exports = authMiddleware;
// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     // Get token from the Authorization header
//    const token = req.header('Authorization')?.split(' ')[1];

//     if (!token) {
//         return res.status(403).json({ message: 'Access denied, token missing' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
//         req.user = decoded; // Attach the decoded user data to the request object
//         next(); // Pass control to the next handler
//     } catch (err) {
//         return res.status(400).json({ message: 'Invalid or expired token' });
//     }
// };

// module.exports = verifyToken;
