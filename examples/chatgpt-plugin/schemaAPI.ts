// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import { Client } from 'pg';

export default async function (params: any, context: any) {

  const { url } = params;

  const client = new Client({
    connectionString: url,
  });

  try {
    await client.connect();

    // Query to get all tables
    const tablesQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `;

    const tablesResult = await client.query(tablesQuery);
    const tables = tablesResult.rows.map(row => row.table_name);

    // Schema information
    const schema = {};
    for (const table of tables) {
      const schemaQuery = `
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = $1
      `;

      const schemaResult = await client.query(schemaQuery, [table]);
      // @ts-ignore
      schema[table] = schemaResult.rows.map(row => ({
        column: row.column_name,
        type: row.data_type,
      }));
    }

    return { tables, schema };
  } catch (err) {
    console.error('Error fetching schema and tables:', err);
    throw err;
  } finally {
    await client.end();
  }
};
