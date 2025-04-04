import dotenv from "dotenv";

dotenv.config();
export default {
    dialect: "postgresql",
    schema: "./utils/schema.jsx",
    out: "./drizzle",
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DATABASE_URL,
    },
 };