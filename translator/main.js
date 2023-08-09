const fs = require('fs');
const error = require(`${process.cwd()}/error`);
const comments = require('./comments');
const plusequal = require('./plusequal');
const developp_var = require('./developp_var');
const func_info = require('./func_info');
const developp_func = require('./developp_func');
const math = require("./math");

module.exports = function(folder, callback = null) {
    const main = `${folder}/main.cup`;
    if (!fs.existsSync(main)) {
        error(`The file ${main}`);
    }
    const package_manager = `${folder}/package.cupcake`;
    if (!fs.existsSync(package_manager)) {
        error(`The file ${package_manager} does not exist.`);
    }
    try {
        let code = fs.readFileSync(main, 'utf8');
    } catch (err) {
        error(`Error reading file: ${err}`);
        return;
    }
    code = comments(code);
    code = developp_func(code);
    const function_info = func_info(code);
    code = math(code);
    code = developp_var(code, function_info);
    variables_info = var_info(code, function_info);
}