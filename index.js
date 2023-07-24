const error = require('./error');
const translate = require('./translator/main');
const run = require('./runner');
const fs = require('fs');
function compileFile(file) {
    // todo : this function convert asm file to machine code file using another command like gcc or else
}

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
            return;
        case "comp":
            if (!output[1]) {
                error("Command error at command\nNo such thing as folder has been detected");
            }
            fs.writeFile(output[1].replace('.cup', '.s'), translate(output[1]), (err) => {
                if (err) {
                    console.error('Error creating the file:', err);
                    return;
                }
                console.log('Code translated successfully!');
                if (output[2] !== "-y") {
                    const rl = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });
                    rl.question("Do you want to compile the asm file into machine code? [Y/N] : ", (answer) => {
                        if (answer.toLowerCase() === "y") {
                            compileFile(output[1].replace('.cup', '.s'));
                            console.log("Your file is now in machine code!");
                            rl.close();
                            return;
                        }
                        console.log("Okay!");
                        rl.close();
                    });
                }
                compileFile(output[1].replace('.cup', '.s'));
                console.log("Your file is now in machine code!");
                return;
            });
            return;
        case "asmfriendly":
            console.log("This feature is still in developpement!\nWe are trying really hard to make asm simpler!");
            return;
        case "exit":
            return;
        case "help":
            help();
            return;
    }
    help();
}

if (exec_command(process.argv.slice(2))){
    while (true) {
        exec_command(prompt("> ").split(' '));
    }
}