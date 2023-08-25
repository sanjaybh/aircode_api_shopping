require('@babel/register')({
  presets: ['@babel/preset-react'],
});

type RecordItem = {
  email: string,
};

import aircode from 'aircode';

const getEmail = require('./email.jsx');
const { render } = require('@react-email/render');

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function (params: any, context: any) {
  console.log('Received params:', params);

  const { title, excerpt, coverImage, href } = params;

  const html = render(getEmail(title, excerpt, coverImage, href));

  const emailTables = aircode.db.table('emails');

  const emailsRecords = await emailTables
    .where()
    .projection({ email: 1 })
    .find();

  console.log('emailsRecords', emailsRecords);

  if (emailsRecords && emailsRecords.length) {
    const emailList = emailsRecords.map((item) => item.email);

    console.log('emails', emailList);

    try {
      const data = await resend.emails.send({
        from: 'hello@aircode.io',
        to: emailList,
        subject: `AirCode updates: ${title}`,
        html,
      });

      console.log(data);
      return {
        data,
        code: 0,
        message: 'success',
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        code: 1,
        message: error,
      };
    }
  }
  return {
    data: null,
    message: 'There is no mailing list to deliver, please add email.',
  };
};
