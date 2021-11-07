const path = require('path');
const fs = require('fs');
const { readdir, mkdir, copyFile} = require('fs/promises');


const srcFile = path.resolve(__dirname, 'assets');
const destFile = path.resolve(__dirname, 'project-dist');
const assetsFile = path.join(destFile, 'assets');
const templatePath = path.resolve(__dirname, 'template.html');
const componentsPath = path.resolve(__dirname, 'components');
const htmlPath = path.join(destFile, 'index.html');


const createDir = (dir) => { 
  mkdir(dir, { recursive: true }, (err) => {
    if (err) throw err;
  });
};

const filePath = path.resolve(__dirname, 'styles');
const outFilePath = path.resolve(__dirname, 'project-dist');

const getFiles = async () => {  
  const files = await readdir(filePath, { withFileTypes: true, });   
  return(files) ;
};

const mergeFiles = async () => {
  const wrStream = fs.createWriteStream(path.join(outFilePath, 'style.css'));
  const cssFiles = await getFiles();
  for(const cssFile of cssFiles) {
    if (path.extname(cssFile.name) === '.css'){
      const readStream = fs.createReadStream(path.join(filePath, cssFile.name), 'utf8');      
      readStream.pipe(wrStream);       
    }
  }   
};


const copyFiles = async (dist, src) => {  
  const files = await readdir(src, { withFileTypes: true, });
  const onlyFiles = files.filter(dir =>  dir.isFile());
  for (const onlyFile of onlyFiles) {
    const from = path.resolve(src, onlyFile.name);
    const to = path.resolve(dist, onlyFile.name);
    await copyFile(from, to);
  } 
};

const getDirectory = async () => {  
    
  const directories = await readdir(srcFile, { withFileTypes: true, });
  const onlyDirectories = directories.filter(dir =>  dir.isDirectory());
  for (const onlyDirectory of onlyDirectories) {
    const destPath = path.join(assetsFile,  onlyDirectory.name);   
    const srcPath = path.join(srcFile, onlyDirectory.name);     
    await createDir(destPath) ;        
    await copyFiles(destPath, srcPath);
  } 
};




const createFile = async () => {

  let template = await fs.promises.readFile(templatePath, 'utf8');

  
  const readComponents = await readdir(componentsPath, {withFileTypes: true});
  for (const reaadComp of readComponents) {           
    const pathReadComp = path.join(componentsPath, reaadComp.name); 
    const textComponent = await fs.promises.readFile(pathReadComp, 'utf8');
    reaadComp.name = `{{${reaadComp.name.replace(/\.html$/gi, '')}}}`;
    template = template.replace(reaadComp.name, textComponent);
  };  
  
  const writeStream = fs.createWriteStream(htmlPath);
  writeStream.write(template);
};


const buildPage = async () => {
  await createDir(destFile);
  
  await mergeFiles();
  await getDirectory();
  await createFile();
};

buildPage();