import { postgreSQLConnector } from "../src/lib/postgresql";
import z from "zod";

const connectors: Array<any> = [postgreSQLConnector];

const schema = z.object({
  uri: z.string(),
  sql: z.string(),
});


export default async function (params: any, context: any) {

  const { uri, sql } = schema.parse(params);
  

  for (const connector of connectors) {
    
    if (connector.matcher(uri)) {
      try {
        const meta = await connector.query(uri, sql);
        return meta;
      } catch (err) {
        // @ts-ignore
        return { error: err.message };
      }
    }
  }

  return { error: `Unsupported database type, you can try ${connectors.map(c => c.meta.name)}` };

};
