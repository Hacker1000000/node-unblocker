import express from "express";
import Unblocker from "unblocker";

const app = express();

// Add unblocker middleware
app.use(
  "/",
  new Unblocker({
    prefix: "/api/proxy/"
  })
);

// Export for Vercel
export default app;
