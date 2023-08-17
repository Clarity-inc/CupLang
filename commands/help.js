module.exports = {
    description: "Helps you with CupLang package manager",
    func: function(output, ctx) {
        let obj = "";
        for (const key of ctx) {
            obj += `${key}: ${ctx[key].description}\n`;
        }
        console.log(`All of the options: ${obj}`);
    }
}