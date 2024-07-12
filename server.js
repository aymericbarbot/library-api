const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');
const etagMiddleware = require('./middleware/etag');
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');
const borrowingRoutes = require('./routes/borrowings');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(authMiddleware);
app.use(etagMiddleware);

app.use('/api', bookRoutes);
app.use('/api', authorRoutes);
app.use('/api', borrowingRoutes);
app.use('/api', searchRoutes);

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}/api/`);
});