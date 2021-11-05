const fs = require('fs');
const path = require('path');


const filePath = path.resolve(__dirname, 'text.txt');
const input = fs.createReadStream(filePath);

input.on('data', chunk => console.log(chunk.toString()));
