
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes default TTL

function getCacheKey(params) {
  return JSON.stringify(params);
}

module.exports = {
  cache,
  getCacheKey
};
