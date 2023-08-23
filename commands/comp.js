function compileFile(file) {
    // todo : this function convert asm file to machine code file using another command like gcc or else
}
const translate = require('../translator/main');
module.exports = {
    description: "Compile a cup project into asm or machine code",
    func: function(output) {
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
    }
};