// api/proxy.js
const Unblocker = require("unblocker");

module.exports = (req, res) => {
  try {
    // Expect ?url= parameter
    const queryIndex = req.url.indexOf("?url=");
    if (queryIndex === -1) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/plain");
      return res.end("Missing ?url= parameter. Example: /api/proxy.js?url=https://example.com");
    }

    const urlParam = decodeURIComponent(req.url.slice(queryIndex + 5));
    if (!urlParam) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/plain");
      return res.end("Missing URL value after ?url=");
    }

    // Ensure proper protocol
    const target = urlParam.startsWith("http") ? urlParam : `http://${urlParam}`;

    // Initialize Unblocker with prefix
    const unblocker = Unblocker({ prefix: "/proxy" });

    // Handle the request
    unblocker(req, res, () => {
      res.statusCode = 502;
      res.setHeader("Content-Type", "text/plain");
      res.end(`Failed to proxy: ${target}`);
    });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end(`Internal server error: ${err.message}`);
  }
};
