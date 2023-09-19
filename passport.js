import passport from 'passport';
import passportGoogle from "passport-google-oauth20"
const GoogleStrategy = passportGoogle.Strategy
import passportFacebook from 'passport-facebook'
const FacebookStrategy = passportFacebook.Strategy
import dotenv from "dotenv"
dotenv.config()

import socialUser from "./models/socialUser-model.js"

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {

    const newUser = {
        id: profile.id,
        name: profile.displayName,
        avatar: {
            url: profile.photos[0].value
        },
        provider: profile.provider
    };
    console.log(profile)

    try {
        let user = await socialUser.findOne({ id: profile.id });
        if (user) {
            done(null, user);
        } else {
            user = await socialUser.create(newUser);
            done(null, user);
        }
    } catch (err) {
        console.error(err);
    }
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails']
},
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            id: profile.id,
            name: profile.displayName,
            // email:  profile.emails[0].value ,
            avatar: {
                url: profile.photos[0].value
            },
            provider: profile.provider
        };
        try {
            let user = await socialUser.findOne({ id: profile.id });
            if (user) {
                done(null, user);
            } else {
                user = await socialUser.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.error(err);
        }
    }
));
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport