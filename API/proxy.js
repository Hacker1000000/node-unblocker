const Unblocker = require('unblocker');

const unblocker = new Unblocker();

module.exports = (req, res) => {
  // Adapt Express handler to Vercel serverless
  unblocker(req, res);
};
