import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "next-blog8",
  apiKey: process.env.API_KEY,
});
