import 'dotenv/config';
import app from './app';

const port = process.env.PORT || process.env.API_PORT || 3000;

app.get('/', (_req, res) => {
  res.redirect('/api-docs');
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});
