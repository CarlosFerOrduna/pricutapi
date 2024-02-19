import { createTransport } from 'nodemailer'

import config from '../config/index.js'

export const sendEmail = async () => {
    const { mailer } = config
    console.log({ mailer })
    const transport = createTransport(mailer)
}
