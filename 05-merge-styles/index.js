const path = require('path');
const fs = require('fs');
const { readdir} = require('fs/promises');


const filePath = path.resolve(__dirname, 'styles');
const outFilePath = path.resolve(__dirname, 'project-dist');

const getFiles = async () => {  
  const files = await readdir(filePath, { withFileTypes: true, });   
  return(files) ;
};

const mergeFiles = async () => {
  const wrStream = fs.createWriteStream(path.join(outFilePath, 'bundle.css'));
  const cssFiles = await getFiles();
  for(const cssFile of cssFiles) {
    if (path.extname(cssFile.name) === '.css'){
      const readStream = fs.createReadStream(path.join(filePath, cssFile.name), 'utf8');      
      readStream.pipe(wrStream);  
      console.log(cssFile.name);
    }
  }   
};
mergeFiles();