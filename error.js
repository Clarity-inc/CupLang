const chalk = require('chalk');
module.exports = function(message, ending=true) {
    console.log(chalk.red(message));
    if (!ending) {
        return;
    }
    process.exit();
}