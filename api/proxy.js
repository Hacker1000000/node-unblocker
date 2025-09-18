import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export default function handler(req, res) {
  const target = req.query.url;

  if (!target) {
    res.status(400).send("Missing ?url= parameter. Example: /api/proxy.js?url=https://example.com");
    return;
  }

  proxy.web(req, res, { target }, (err) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error: " + err.message);
  });
}
