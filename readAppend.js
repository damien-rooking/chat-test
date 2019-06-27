const fs = require('fs');
const path = require('path');

const readAppend = (file, appendFile) => {
  const data = fs.readFileSync(appendFile) + '\n';
  fs.appendFileSync(file, data);
};

const file = path.resolve(__dirname, './buildFile.js');
const folder = fs.readdirSync('./build/static/js');
const mapFolder = folder.filter(item => item.match(/chunk.js$/));
const base = path.resolve(__dirname, './firstFile.js');

const clearFile = file => fs.writeFileSync(file, '');

//clear content of file
clearFile(file);

// add base file
readAppend(file, base);

// add build files
mapFolder.map(item => `./build/static/js/${item}`).forEach(item => readAppend(file, item));
