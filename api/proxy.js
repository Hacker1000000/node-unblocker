import express from "express";
import unblocker from "unblocker";
import { createServer } from "http";

const app = express();

// Node Unblocker middleware
app.use(
  unblocker({
    prefix: "/proxy/",
  })
);

// Optional homepage
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body style="text-align:center; margin-top:50px; font-family:sans-serif;">
        <h1>Node Unblocker Proxy</h1>
        <form method="GET" action="/proxy/https://example.com/">
          <input name="url" placeholder="Enter a URL" style="width:300px;">
          <button type="submit">Go</button>
        </form>
      </body>
    </html>
  `);
});

// Export for Vercel
export default function handler(req, res) {
  const server = createServer(app);
  server.emit("request", req, res);
}
