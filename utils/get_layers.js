let data = {}
let fs = require("fs");
const layers = fs.readdirSync('../config/layers');
for (let i = 0; i < layers.length; i++) {
    const layer = require(`../config/layers/layers[i]`);
    data[layer.name] = layer.run;
}
module.exports = data;