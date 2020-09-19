import nodemailer from 'nodemailer';

import { MAIL_USER, MAIL_PASS } from '@config';
import { errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

/**
 * Send email with nodemailer
 */

export const sendEmail = async (to: string, content: Record<string, unknown>): Promise<void> => {
  const contacts = {
    from: MAIL_USER,
    to,
  };

  /**
   * Combining the content and contacts into a single object that can be passed to Nodemailer.
   */

  const email = Object.assign({}, content, contacts);

  try {
    await transporter.sendMail(email);

    // logger.info(`Message sent: ${info.messageId}`);
    // logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  } catch {
    throw new Error(errorMessage.sendingEmail);
  }
};
