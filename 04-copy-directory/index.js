
const { readdir, mkdir, copyFile } = require('fs/promises');
const path = require('path');

const srcFile = path.resolve(__dirname, 'files');
const destFile = path.resolve(__dirname, 'files-copy');

const createDir = () => { 
  mkdir(destFile, { recursive: true }, (err) => {
    if (err) throw err;
  });
};


const getFiles = async () => {  
  const files = await readdir(srcFile, { withFileTypes: true, });
  const onlyFiles = files.filter(dir =>  dir.isFile());
  for (const onlyFile of onlyFiles) {
    const from = path.resolve(srcFile, onlyFile.name);
    const to = path.resolve(destFile, onlyFile.name);
    await copyFile(from, to);
  } 
};

const copyFiles = async () => {
  await createDir();
  await getFiles();
};

copyFiles();
