'use strict';

let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, './pets.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// middleware
let morgan = require('morgan');
let bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());


app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});


app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.set('Content-Type', 'text/plain');
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});


app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petsJSON);

    let pet = {};
    pet.age = Number.parseInt(req.body.age);
    pet.kind = req.body.kind;
    pet.name = req.body.name;

    if (pet.age === '' || pet.kind === '' || pet.name === '' || pet.age !== parseInt(pet.age, 10)) {
      res.set('Content-Type', 'text/plain');
      return res.sendStatus(400);
    }

    pets.push(pet);

    let newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});


app.use(function(req, res) {
  res.sendStatus(404);
});


app.listen(port, function() {
  console.log('Listening on port', port);
});






module.exports = app;
