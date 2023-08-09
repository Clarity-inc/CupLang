const translate = require(`../translator/main`);
const run = require(`../runner`);
module.exports = function(output) {
    if (!output[1]) {
        error("Command error at command\nNo such thing as folder has been detected");
    }
    run(translate(output[1]));
    return;
}