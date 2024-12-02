let data = {}
const path = require("path");
const fs = require("fs");

fs.readdir("../translator/layers", (err, files) => {
    if (err) {
      console.log('Error reading directory:', err);
      return;
    }
    files = files.filter(file => require(fs.statSync(path.join("../translator/layers", file)).isFile()));
    for(const file of files) {
        if (file.order !== -1) // File order -1 = ressource file
          data[file.order] = file.runner;
    }
});
data.sort();
module.exports.default = Object.values(data); // layers