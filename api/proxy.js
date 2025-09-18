import express from "express";
import Unblocker from "unblocker";

const app = express();

// Mount unblocker at /api/proxy/
app.use(
  "/",
  new Unblocker({
    prefix: "/api/proxy/"
  })
);

// Export handler for Vercel
export default app;
