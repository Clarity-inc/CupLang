let data = {}
const path = require("path");
const fs = require("fs");

fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log('Error reading directory:', err);
      return;
    }
    files = files.filter(file => require(fs.statSync(path.join(directoryPath, file)).isFile()));
    for(const file of files) {
        data[file.order] = file.runner;
    }
});
data.sort();
module.exports.default = Object.values(data);