import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from './../../config/config';

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email });
        if(!user) 
            return res.status('401').json({ error: "User not found" });
        
        if(!user.authenticate(req.body.password))
            return res.status('401').json({ error: "Email and password don't match" });
        
        const token = jwt.sign({ _id: user._id }, config.jwtSecret);

        res.cookie('t', token, { expire: new Date() + 9999 });

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (err) {
        return res.status('401').json({ error: "Could not sign in" });
    }
};

const signout = (req, res) => {
    res.clearCookie("t");
    return res.status('200').json({
        message: "signed out"
    });
};

// Protecting routes with express-jwt
// To protect access to the read, update, and delete routes, the server will
// need to check that the requesting client is actually an authenticated and 
// authorized user. To check whether the requesting user is signed in and has
// a valid JWT when a protected route is accessed, we will use the express-jwt module.
// The express-jwt module is a piece of middleware that validates JSON Web Tokens.
//  Run yarn add express-jwt from the command line to install express-jwt.

const requireSignin = expressJwt({
    // The requireSignin method in auth.controller.js uses express-jwt to verify that
    // the incoming request has a valid JWT in the Authorization header. If the token
    // is valid, it appends the verified user's ID in an 'auth' key to the request object; 
    // otherwise, it throws an authentication error.
    secret: config.jwtSecret,
    userProperty: 'auth'
});


const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!(authorized)) {
        return res.status('403').json({
            error: 'User not authorized'
        });
    }
};

export default { signin, signout, requireSignin, hasAuthorization };
