const fs = require('fs');
const error = require(`../error`);
const comments = require('./comments');
const plusequal = require('./plusequal');
const var_info = require('./var_info');
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
    let data = {};
    try {
        data.code = fs.readFileSync(main, 'utf8');
    } catch (err) {
        error(`Error reading file: ${err}`);
        return;
    }
    console.log("GETTING CONVERSION LAYERS");
    const layers = require('../config/layers');
    console.log("LAYERS CHARGED");
    const lstlayers = layers.keys();
    console.log(lstlayers.split('\n'));
    for (let i = 0; i < lstlayers.length; i++) {
        const ndata = layers[lstlayers[i]](data);
        if (ndata) {
            data = ndata;
        }
    }
    code = math(code);
    code = developp_var(code, function_info);
    variables_info = var_info(code, function_info);
}