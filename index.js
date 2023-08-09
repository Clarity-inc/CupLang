const error = require('./error');
const translate = require('./translator/main');
const run = require('./runner');
const fs = require('fs');

let commands = {};
for (const file in fs.readdirSync('./commands/')) {
    commands[file] = require('./commands/' + file.replace('.js', ''));
}

function exec_command(output) {
    if (!output) {
        return true;
    }
    output = output.split(' ');
    if (!commands[output[0]]) {
        commands.help(output);
        return;
    }
    commands[output[0]](output);
}

if (exec_command(process.argv.slice(2))){
    while (true) {
        exec_command(prompt("> ").split(' '));
    }
}