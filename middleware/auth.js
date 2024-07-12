const API_KEY = '8f94826adab8ffebbeadb4f9e161b2dc';

const authenticate = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Accès refusé. API Key invalide.' });
  }
  next();
};

module.exports = authenticate;