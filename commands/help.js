module.exports = {
    description: "Helps you with CupLang package manager",
    func: function(output, ctx) {
        if (output && ctx.includes(output)) {
            console.log(`${output} : ${ctx[output].description}`);
            return;
        }
        let obj = "";
        if (output) {
            let obj = `${output} not found.\n`;
        }
        
        for (const key of ctx) {
            obj += `${key}: ${ctx[key].description}\n`;
        }
        console.log(`All of the options:\n${obj}`);
    }
};