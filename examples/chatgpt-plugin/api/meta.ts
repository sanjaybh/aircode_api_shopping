import { postgreSQLConnector } from "../src/lib/postgresql";
import z from "zod";
// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';


const connectors: Array<any> = [postgreSQLConnector];

const schema = z.object({
  uri: z.string(),
});


export default async function (params: any, context: any) {

  console.log(params);


  const { uri } = schema.parse(params);

  for (const connector of connectors) {
    if (connector.matcher(uri)) {
      try {
        const meta = await connector.getMeta(uri);
        return meta;
      } catch (err) {
        // @ts-ignore
        return { error: err.message };
      }
    }
  }

  return { error: `Unsupported database type, you can try ${connectors.map(c => c.meta.name)}` };

};
