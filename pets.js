let fs = require('fs');
let path = require('path');
let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];
let petIndex = process.argv[3];



if (cmd === 'read') {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    let pet = JSON.parse(data);

    if (err) {
      throw err;
    }
    else if (petIndex < 0 || petIndex > (pet.length - 1)) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    if (petIndex === undefined) {
      console.log(pet);
    } else {
      console.log(pet[petIndex]);
    }

  });
}
else if (cmd === 'create') {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    else if (process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    let newParsed = JSON.parse(data);
    // console.log(newParsed);

    let pet = {};
    pet.age = Number.parseInt(process.argv[3]);
    pet.kind = process.argv[4];
    pet.name = process.argv[5];
    // console.log('New created pet: ', pet);
    // console.log(pet);

    newParsed.push(pet);
    // console.log(newParsed);

    let petsJSON = JSON.stringify(newParsed);

    // write to database
    fs.writeFile('./pets.json', petsJSON, function(err, data) {
      console.log(pet);
    });

  });
}
else if (cmd === 'update') {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    else if (process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined || process.argv[6] === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    let newParsed = JSON.parse(data);
    // console.log(newParsed);

    let petInx = process.argv[3];
    let petUpdated = newParsed[petInx];
    // console.log('Parsed index: ', petUpdated);
    
    petUpdated.age = Number.parseInt(process.argv[4]);
    petUpdated.kind = process.argv[5];
    petUpdated.name = process.argv[6];

    let petsJSON = JSON.stringify(newParsed);

    // write to database
    fs.writeFile('./pets.json', petsJSON, function(err, data) {
      console.log(petUpdated);
    });

  });
}
else {
  // test 1 - no cmd entered
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
