let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, './pets.json');

const http = require('http');
const port = process.env.PORT || 8000;


const server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});


server.listen(port, function() {
  console.log('Listening on port', port);
});







module.exports = server;
