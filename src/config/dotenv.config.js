import { Command } from 'commander'
import dotenv from 'dotenv'

const program = new Command()

program.requiredOption('--mode <mode>', 'mode app', 'development')
program.parse()

const env = program.opts().mode

const cases = {
    prd: './.env.prd',
    dev: './.env.dev'
}

dotenv.config({
    path: cases[env] || './.env.prd'
})

export default {
    port: process.env.PORT,
    privateKey: process.env.PRIVATE_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALL_BACK_URL,
    connectionString: process.env.CONNECTION_STRING,
    persistence: process.env.PERSISTENCE
}
