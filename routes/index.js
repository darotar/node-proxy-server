const express = require('express');
const router = express.Router();
const needle = require('needle');
const url = require('url');
const apiCache = require('apicache');

const {
  API_BASE_URL,
  API_KEY_NAME,
  API_KEY_VALUE,
  NODE_ENV
} = process.env;

let cache = apiCache.middleware;

router.get('/', cache('2 minutes'),  async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: [API_KEY_VALUE],
      ...url.parse(req.url, true).query
    });

    const endpoint = `${APIBASE_URL}?${params}`;

    const apiRes = await needle('get', endpoint);
    const data = apiRes.body;

    if (NODE_ENV !== 'production') {
      console.log(`Request: ${endpoint}`);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({error});
  }
});

module.exports = router;