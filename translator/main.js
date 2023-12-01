const fs = require('fs');
const error = require(`../error`);
const comments = require('./comments');
const plusequal = require('./plusequal');
const var_info = require('./var_info');
const developp_var = require('./developp_var');
const func_info = require('./func_info');
const developp_func = require('./developp_func');
const math = require("./math");
const layers = require('utils/get_layers');

module.exports = function(folder, callback = null) {
    if (!fs.Directory.exists(folder)) {
        const file = folder;
    } else {
        const file = `${folder}/main.cup`;
    }
    if (!fs.existsSync(file)) {
        error(`The file ${file}`);
    }
    const package_manager = `${folder}/package.cupcake`;
    if (!fs.existsSync(package_manager)) {
        error(`The file ${package_manager} does not exist.`);
    }
    let data = {};
    try {
        data.code = fs.readFileSync(file, 'utf8');
    } catch (err) {
        error(`Error reading file: ${err}`);
        return;
    }
    data.file = file;
    console.log("GETTING CONVERSION LAYERS");
    let layer = layers[file.split('.')[-1]];
    if (!layer) {
        layer = layers.default;
    }
    if (!layer) {
        console.log("COMPILER ERROR: NO DEFAULT LAYER");
        console.kill();
    }
    console.log("LAYERS CHARGED\nFetching CupMaker...");
    data.CupMaker = CupMaker(data);
    console.log("Fetched!\nStarting to compile...");
    const lstlayers = layer.keys();
    console.log(lstlayers.split('\n'));
    for (let i = 0; i < lstlayers.length; i++) {
        data.CupMaker.SetLayer(lstlayers[i], i);
        const ndata = layer[data.CupMaker.CurrentLayer](data);
        if (ndata) {
            data = ndata;
            data.CupMaker.ProcNew(data);
        }
    }
    code = math(code);
    code = developp_var(code, function_info);
    variables_info = var_info(code, function_info);
}