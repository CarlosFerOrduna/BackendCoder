import passport from 'passport';
import local from 'passport-local';
import bcryptWrapper from '../utils/bcrypt.util.js';
import userService from '../services/users.service.js';

const localStrategy = local.Strategy;
const initializatePassport = () => {
    passport.use(
        'register',
        new localStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email'
            },
            async (req, username, password, done) => {
                try {
                    const { firstName, lastName, email, age, rol } = req.body;
                    let user = await userService.getUserByEmail(username);
                    if (user) {
                        console.log('user already exists');
                        return done(null, false);
                    }

                    const newUser = {
                        firstName,
                        lastName,
                        email,
                        age,
                        rol,
                        password: bcryptWrapper.createHash(password)
                    };
                    console.log(newUser);
                    let result = await userService.createUser(newUser);

                    return done(null, result);
                } catch (e) {
                    return done('Error when register user: ' + e);
                }
            }
        )
    );

    passport.use(
        'login',
        new localStrategy(
            {
                usernameField: 'email'
            },
            async (username, password, done) => {
                try {
                    const user = await userService.getUserByEmail(username);
                    if (!user) {
                        console.log('user does not exists');
                        return done(null, false);
                    }

                    if (bcryptWrapper.isValidPassword(user, password)) return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getUserById(id);
        done(null, user);
    });
};
//01:45
export default initializatePassport;
