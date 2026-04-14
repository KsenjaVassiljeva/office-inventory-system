import PocketBase from "pocketbase";

const PB_URL =
  process.env.PB_URL ||
  "http://pocketbase-nymicyupwjww3n88j2wrpu9s.176.112.158.15.sslip.io";

export const createPB = () => new PocketBase(PB_URL);