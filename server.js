const http = require('http');

let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', category: 'fiction' },
  { id: 2, title: 'Atomic Habits', author: 'James Clear', category: 'self-help' },
  { id: 3, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', category: 'finance' }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(books));
  }
  else if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const newBook = JSON.parse(body);
      newBook.id = books.length + 1;
      books.push(newBook);

      res.statusCode = 201;
      res.end(JSON.stringify(newBook));
    });
  }
  else if (req.method === 'DELETE') {
    books = [];
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'All books deleted' }));
  }

  else {
    res.statusCode = 405;
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
});
server.listen(3000, () => {
  console.log('Library server running at http://localhost:3000');
});