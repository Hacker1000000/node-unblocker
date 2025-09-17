// api/proxy.js
const unblocker = require("unblocker");

module.exports = (req, res) => {
  // Parse ?url= parameter
  const urlParam = req.url.split("?url=")[1];
  if (!urlParam) {
    res.statusCode = 400;
    return res.end("Missing ?url= parameter. Example: /proxy/?url=https://example.com");
  }

  // Ensure full URL
  const target = urlParam.startsWith("http") ? urlParam : `http://${urlParam}`;

  // Initialize Unblocker
  unblocker({ prefix: "/proxy" })(req, res, () => {
    res.statusCode = 502;
    res.end(`Failed to proxy: ${target}`);
  });
};

// Homepage
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body style="text-align:center; margin-top:50px; font-family:sans-serif;">
        <h1>Node Unblocker Proxy</h1>
        <form method="GET" action="/proxy/">
  <input name="url" placeholder="Enter a full URL (https://...)" required>
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
