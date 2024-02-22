import { createTransport } from 'nodemailer'

import config from '../config/index.js'

export const sendEmail = async (params) => {
    console.log(params)
    const { to, subject, text, html, attachments, alternatives } = params
    const { mailer } = config

    const transport = createTransport(mailer)

    const mailOptions = {
        from: mailer.auth.user === to ? `Sistemas <${mailer.auth.user}>` : `Pricut <${mailer.auth.user}>`,
        to,
        subject,
    }
    if (text) mailOptions.text = text
    if (html) mailOptions.html = html
    if (attachments && attachments?.filename && attachments?.content) mailOptions.attachments = attachments
    if (alternatives && alternatives?.contentType && alternatives?.content) mailOptions.alternatives = alternatives

    return await transport.sendMail(mailOptions)
}
