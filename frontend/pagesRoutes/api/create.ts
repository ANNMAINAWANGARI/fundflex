import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from "key-did-resolver";
import { type NextApiRequest, type NextApiResponse } from "next";
import { fromString } from "uint8arrays/from-string";
import * as pg from "pg";


// const {SECRET_KEY, DB_PASSWORD, DB_USER, DB_HOST, DB_PORT, DB_NAME} = env;
const {  SECRET_KEY } = process.env;
const { Client, Pool } = pg;

export default async function createCredential(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  interface RequestBody {
    recipient: string;
    event: string;
    code: string;
  }

  // const client = new Client({
  //   password: DB_PASSWORD,
  //   user: DB_USER,
  //   host: DB_HOST,
  //   port: Number(DB_PORT),
  //   database: DB_NAME,
  // });

  


  const {  recipient, code }: RequestBody = req.body as RequestBody;

  try {
    if (code && SECRET_KEY) {
       
        const event = code;
        const key = fromString(SECRET_KEY, "base16");
        const provider = new Ed25519Provider(key);
        const staticDid = new DID({
          
          resolver: KeyResolver.getResolver(),
          provider,
        });

        await staticDid.authenticate();
        const badge: {
          recipient: string;
          step: string;
          timestamp: string;
        } = {
          recipient: recipient.toLowerCase(),
          step: event,
          timestamp: new Date().toISOString(),
        };
        console.log(badge);

        const jws = await staticDid.createJWS(badge);
        const jwsJsonStr = JSON.stringify(jws);
        const jwsJsonB64 = Buffer.from(jwsJsonStr).toString("base64");
        const completeBadge = {
          ...badge,
          jwt: jwsJsonB64,
        };
        return res.json(completeBadge);
      
    } else {
      return res.json({
        err: "Missing code or unique key",
      });
    }
  } catch (err) {
    res.json({
      err,
    });
  }
}