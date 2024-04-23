import { Command } from 'commander'
import dotenv from 'dotenv'

const program = new Command()

program.requiredOption('--mode <mode>', 'mode app', 'prd')
program.parse()

const env = program.opts().mode

const environments = {
    prd: './.env.prd',
    stg: './.env.stg',
    dev: './.env.dev',
}

dotenv.config({ path: environments[env] })

export default {
    env,
    port: process.env.PORT,
    persistence: process.env.PERSISTENCE,
    logger: process.env.LOGGER,
    jwt: {
        secretKey: process.env.SECRET_KEY,
    },
    database: {
        connectionString: process.env.CONNECTION_STRING,
    },
    cloudinary: {
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
        cloudName: process.env.CLOUD_NAME,
    },
    scrapping: {
        urlQuote: process.env.URL_QUOTE,
    },
    cors: {
        allowlist: process.env.ALLOW_LIST.split(','),
    },
    mailer: {
        service: process.env.TRANSPOSRT_SERVICE,
        port: process.env.TRANSPOSRT_PORT,
        auth: {
            user: process.env.TRANSPOSRT_USER,
            pass: process.env.TRANSPOSRT_PASS,
        },
    },
    ruc: {
        companyName: process.env.SELLER_COMPANY_NAME,
        deliveryAddress: process.env.SELLER_DELIVERY_ADDRESS,
        tax: process.env.SELLER_TAX,
        fiscalAddress: process.env.SELLER_FISCAL_ADDRESS,
        email: process.env.SELLER_EMAIL,
        tel: process.env.SELLER_TEL,
    },
}
