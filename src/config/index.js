import { Command } from 'commander'
import dotenv from 'dotenv'

const program = new Command()

program.requiredOption('--mode <mode>', 'mode app', 'prd')
program.parse()

const env = program.opts().mode

const environments = {
    prd: './.env.prd',
    stg: './.env.stg',
    dev: './.env.dev'
}

dotenv.config({ path: environments[env] })

export default {
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
    connectionString: process.env.CONNECTION_STRING,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    cloudName: process.env.CLOUD_NAME,
    urlQuote: process.env.URL_QUOTE,
    persistence: process.env.PERSISTENCE,
    logger: process.env.LOGGER
}
