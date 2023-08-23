module.exports = {
    description: "Helps you with CupLang package manager",
    func: function(output, ctx) {
        if (output && ctx.includes(output)) {
            console.log(`${output} : ${ctx[output].description}`);
        } else if (!output) {
            let obj = "";
        } else {
            let obj = `${output} not found.\n`;
        }
        
        for (const key of ctx) {
            obj += `${key}: ${ctx[key].description}\n`;
        }
        console.log(`All of the options: ${obj}`);
    }
};