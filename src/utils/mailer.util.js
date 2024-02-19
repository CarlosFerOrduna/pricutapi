import { createTransport } from 'nodemailer'

import config from '../config/index.js'

export const sendEmail = async (params) => {
    const { from, subject, text, html, attachments, alternatives } = params
    const { mailer } = config

    const transport = createTransport(mailer)

    const mailOptions = { to: mailer.auth.user, from, subject }
    if (text) mailOptions.text = text
    if (html) mailOptions.html = html
    if (attachments && attachments?.filename && attachments?.content) mailOptions.attachments = attachments
    if (alternatives && alternatives?.contentType && alternatives?.content) mailOptions.alternatives = alternatives

    return await transport.sendMail(mailOptions)
}
