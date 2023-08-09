const fs = require('fs');
module.exports = function(output) {
    console.log("Creating project base...");
    fs.writeFileSync(`${process.cwd()}/package.cupcake`, "");
    console.log("[==>-------] 33%");
    fs.writeFileSync(`${process.cwd()}/main.cup`, "func main() {\n\t\n}");
    console.log("[=====>---] 66%");
    fs.mkdirSync(`${process.cwd()}/cupModules`);
    console.log("[==========] 100% yay !\nProject base created successfully!");
}