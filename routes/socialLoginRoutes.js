import { Router } from "express";
const socialUserRoutes = Router()
import passport from 'passport';

socialUserRoutes.get('/google', passport.authenticate('google', { scope: ['profile'] }));
socialUserRoutes.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URL}/account`);
    });

socialUserRoutes.get('/login/success', (req, res) => {

    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Login",
            user: req.user
        })
    }
    else {
        res.status(403).json({
            success: false,
            message: "Not Authorized"
        })
    }
});
socialUserRoutes.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
socialUserRoutes.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URL}/account`);
    });

socialUserRoutes.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Login",
            user: req.user
        })
    }
    else {
        res.status(403).json({
            success: false,
            message: "Not Authorized"
        })
    }
});



socialUserRoutes.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) console.log(err); 
        res.redirect(`${process.env.CLIENT_URL}/login`);

    });

});




export default socialUserRoutes