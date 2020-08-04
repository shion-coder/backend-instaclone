import { CLIENT_ORIGIN } from '@config';

/* -------------------------------------------------------------------------- */

type EMAIL_TEMPLATE = {
  subject: string;
  html: string;
  text: string;
};

const confirm = (id: string): EMAIL_TEMPLATE => ({
  subject: 'Confirm Email',
  text: `Click to confirm email: ${CLIENT_ORIGIN}/confirm/${id}`,
  html: `
    <a href='${CLIENT_ORIGIN}/confirm/${id}'>
      Click to confirm email
    </a>
  `,
});

export default { confirm };
