// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import { Client } from 'pg';

export default async function (params: any, context: any) {

  const { url, sql } = params;

  const client = new Client({
    connectionString: url,
  });

  try {
    await client.connect();

    // Execute the provided SQL query
    const result = await client.query(sql);

    // Return the result
    return { response: result.rows };
  } catch (err) {
    console.error('Error executing SQL query:', err);
    throw err;
  } finally {
    await client.end();
  }
};
