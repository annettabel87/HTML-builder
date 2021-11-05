const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { writer } = require('repl');
const { stdin, stdout } = process;

const filePath = path.resolve(__dirname, 'text.txt');

const readL = readline.createInterface({
  input: stdin,
  output: stdout,
});

console.log("Enter text");
readL.on('line', (data) => {
  if (data === 'exit') {
    console.log('Пока!');
    readL.close();
  } else {
    fs.appendFile(filePath, data, (err)=>{ if (err) throw writer;});      
  }   
});
