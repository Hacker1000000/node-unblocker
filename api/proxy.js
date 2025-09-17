import unblocker from "unblocker";
import express from "express";
import { createServer } from "http";

// Create an Express app
const app = express();

// Use node-unblocker middleware
app.use(
  unblocker({
    prefix: "/proxy/", // All proxied URLs will start with /proxy/
  })
);

// A simple homepage with a search box
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h1>Node Unblocker Proxy</h1>
        <form method="GET" action="/proxy/https://example.com/">
          <input name="url" placeholder="Enter a URL" style="width: 300px;"/>
          <button type="submit">Go</button>
        </form>
      </body>
    </html>
  `);
});

// Export as Vercel serverless handler
export default function handler(req, res) {
  const server = createServer(app);
  server.emit("request", req, res);
}
