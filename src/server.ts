import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ message: 'Hello Goooo' }));

app.listen(3333, () => {
  console.log('servidor online');
});
