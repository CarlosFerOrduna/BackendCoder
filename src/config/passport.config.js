import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import jwt, { ExtractJwt } from 'passport-jwt'
import local from 'passport-local'
import UserService from '../services/users.service.js'
import { createHash, isValidPassword } from '../utils/bcrypt.util.js'

const JWTStrategy = jwt.Strategy
const localStrategy = local.Strategy
const userService = new UserService()

const initializatePassport = () => {
    const jwtStrategy = new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.PRIVATE_KEY
        },
        async (jwtPayload, done) => {
            try {
                return done(null, jwtPayload)
            } catch (error) {
                return done(error)
            }
        }
    )
    passport.use('jwt', jwtStrategy)

    const registerStrategy = new localStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            try {
                const { firstName, lastName, email, age, rol } = req.body
                let user = await userService.getUserByEmail(username)
                if (user) {
                    return done(null, false)
                }

                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age,
                    rol,
                    password: createHash(password)
                }

                let result = await userService.createUser(newUser)

                return done(null, result)
            } catch (error) {
                return done(error)
            }
        }
    )
    passport.use('register', registerStrategy)

    const loginStrategy = new localStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await userService.getUserByEmail(username)
                if (!user) return done(null, false)

                if (isValidPassword(user, password)) return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
    passport.use('login', loginStrategy)

    const githubStrategy = new GitHubStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALL_BACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userService.getUserByUsername(profile._json.login)
                if (!user) {
                    const newUser = {
                        username: profile._json.login
                    }
                    const result = await userService.createUser(newUser)
                    return done(null, result)
                }

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
    passport.use('github', githubStrategy)

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getUserById(id)
        done(null, user)
    })
}

const cookieExtractor = () => {
    return req?.cookies?.authorization ?? null
}

export default initializatePassport
