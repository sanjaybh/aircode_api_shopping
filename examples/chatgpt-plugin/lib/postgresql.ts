import { Pool } from 'pg';

export const postgreSQLConnector = {
  meta: {
    name: 'PostgreSQL',
    uriExample: 'postgresql://localhost:5432',
  },
  matcher: (uri: string) => uri.startsWith('postgre'),
  getMeta: async (uri: string) => {
    let pool = new Pool({
      connectionString: uri,
    });
    const client = await pool.connect();
    const tablesResult = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`);
    // @ts-ignore
    const tables: any[] = tablesResult.rows.map(row => row.table_name);

    const meta: { tables: any[]} = { tables: [] };
    for (const table of tables) {
      const fieldsResult = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${table}';`);
      // @ts-ignore
      const fields = fieldsResult.rows.map(row => ({ name: row.column_name, type: row.data_type }));
      meta.tables.push({ name: table, fields });
    }
    client.release();
    await pool.end();
    return meta;
  },
  query: async (uri: string, sql: string) => {
    let pool = new Pool({
      connectionString: uri,
    });
    const client = await pool.connect();
    const result = await client.query(sql);
    client.release();
    await pool.end();
    return result.rows
  }

};
