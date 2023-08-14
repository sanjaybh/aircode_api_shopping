// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function (params: any, context: any) {
  console.log('Received params:', params);

  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello World',
      html: '<strong>It works!</strong>',
    });

    return {
      code: 0,
      message: 'success',
    };
  } catch (error) {
    console.error(error);
  }
}
