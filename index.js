const error = require('./error');
const translate = require('./translator/main');
const run = require('./runner');
function exec_command(output) {
    const StringArgs = output.length > 0 ? output.join(' ') : null;
    if (!StringArgs) {
        return true;
    }
    switch (output[0]) {
        case "run":
            if (!output[1]) {
                error("Command error at command\nNo such thing as folder has been detected");
            }
            run(translate(output[1]));
    }
}


if (exec_command(process.argv.slice(2))){
    while (true) {
        exec_command(prompt("> ").split(' '));
    }
}