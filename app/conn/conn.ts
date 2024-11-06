import { createClient } from "@libsql/client";

// const client = createClient({
//   url: "http://127.0.0.1:8080",
// });

export const client = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN,
});


export default client;