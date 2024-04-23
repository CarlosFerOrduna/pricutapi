import config from '../../config/index.js'
import { sendEmail } from '../../utils/mailer.util.js'
import { handlerError } from '../../utils/handlerError.util.js'

export class ContactController {
    constructor() {}

    contactUs = async (req, res) => {
        try {
            const { fullname, email, phone, text } = req.body
            const {
                mailer: {
                    auth: { user },
                },
            } = config

            const mailOptionsUser = {
                to: email,
                subject: 'contacto pricut',
                text: 'Muchas gracias por su consulta, en breve nos estaremos comunicando',
            }

            const mailOptionsUs = {
                to: user,
                subject: 'contacto pricut',
                text: `${fullname}\n${email}\n${phone}\n${text}`,
            }

            const [{ envelope: responseUser }, { envelope: responseUs }] = await Promise.all([
                sendEmail(mailOptionsUser),
                sendEmail(mailOptionsUs),
            ])

            return res.status(200).send({
                status: 'success',
                message: 'email sent successfully',
                data: [responseUser, responseUs],
            })
        } catch (error) {
            handlerError(error, res)
        }
    }
}
