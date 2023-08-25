// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function (params: any, context: any) {
  console.log('Received params:', params, typeof params);

  const { email } = params;

  console.log('email', email);

  if (!email) {
    return {
      code: 1,
      message: 'Email required.',
    };
  }

  if (!regex.test(email)) {
    return {
      code: 1,
      message: 'Invalid email.',
    };
  }

  try {
    // Get the emails table
    const EmailsTable = aircode.db.table('emails');

    // Find email by address
    const matchedRecord = await EmailsTable.where({ email }).findOne();

    if (matchedRecord) {
      return {
        code: 0,
        message: 'Your email is already in our subscription list.',
      };
    }

    // Insert a new email
    const newEmail = {
      email,
    };

    await EmailsTable.save(newEmail);

    return {
      code: 0,
      message: 'You have been successfully subscribed to our newsletter.',
    };
  } catch (err) {
    return {
      code: 1,
      message: `An error occurred while subscribing, please try again later, the error message: ${err}`,
    };
  }
}
