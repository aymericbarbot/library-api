const crypto = require('crypto');

const generateETag = (req, res, next) => {
  const etag = crypto.createHash('md5').update(JSON.stringify(req.body)).digest('hex');
  res.setHeader('ETag', etag);
  next();
};

module.exports = generateETag;