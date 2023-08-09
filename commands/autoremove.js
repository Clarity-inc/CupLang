const fs = require('fs');
const path = require('path');
module.exports = function(output) {
    const project = output[1];
    if (!project) {
        console.log('Please indicate a project name\nExample : cupcake autoremove betterstd');
        return;
    }
    console.log(`Trying to find ${project}...`)
    let packages = {};
    for (const lin of fs.readFileSync(path.join(process.cwd(), "package.cupcake"), 'utf8').split('\n')) {
        const da = lin.split(': ');
        packages[da[0]] = da[1];
    }
    if (!packages[project]) {
        console.log(`Project ${project} not found`);
        return;
    }
    console.log(`Removing ${project}...`);
    const dat = JSON.parse(fs.readFileSync(packages[project], 'utf8').substring(8))
    for (const file of dat.import) {
        fs.unlinkSync(file);
    }
    fs.unlinkSync(packages[project]);
    if (fs.readdirSync(path.join(process.cwd(), project)).length === 0) {
        fs.rmdirSync(path.join(process.cwd(), project));
    }
    delete packages[project];
    let packages_str = "";
    for (const key in packages) {
        packages_str += `${key}: ${packages[key]}\n`;
    }
    fs.writeFileSync(path.join(process.cwd(), "package.cupcake"), packages_str);
    console.log(`Removed ${project}!`);
};