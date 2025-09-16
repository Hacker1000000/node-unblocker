const Unblocker = require('unblocker');
const unblocker = new Unblocker();

module.exports = (req, res) => {
  unblocker(req, res);
};
