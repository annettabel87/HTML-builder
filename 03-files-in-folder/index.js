const path = require('path');
const { readdir, stat } = require('fs/promises');



const getFiles = async (file) => {
  const filePath = path.resolve(__dirname, file);
  const files = await readdir(filePath, { withFileTypes: true, });
  const onlyFiles = files.filter(dir =>  dir.isFile());
  for (const onlyFile of onlyFiles) {
    const extName = path.extname(onlyFile.name).slice(1);
    const sizeFile = (await stat(path.resolve(filePath, onlyFile.name))).size/ 1024;
    const fileName = onlyFile.name.split('.')[0];
    console.log(`${fileName} - ${extName} - ${sizeFile}`);
  } 
};
getFiles('secret-folder');