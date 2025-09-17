const express = require("express");
const unblocker = require("unblocker");
const { createServer } = require("http");

const app = express();

// Node Unblocker middleware
app.use(
  unblocker({
    prefix: "/proxy/",
  })
);

// Homepage
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body style="text-align:center; margin-top:50px; font-family:sans-serif;">
        <h1>Node Unblocker Proxy</h1>
        <form method="GET" action="/proxy/">
          <input name="url" placeholder="Enter a URL" style="width:300px;">
          <button type="submit">Go</button>
        </form>
      </body>
    </html>
  `);
});

// Export function for Vercel
module.exports = (req, res) => {
  const server = createServer(app);
  server.emit("request", req, res);
};
