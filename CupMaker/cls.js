module.exports = class {
    constructor(data) {
        this.code = data.code;
        this.file = data.file;
        this.layer_num = 0;
        this.CurrentLayer = "";
    }
    ProcNew(data) {
        this.code = data.code;
    }
    SetLayer(layer, num) {
        this.CurrentLayer = layer;
        this.layer_num = num;
    }
    FatalError(match, message) {
        const lines = data.code.split('\n');
        if (typeof match === Number) {
            const line = lines[match];
        } else {
            // find match 80% or more
        }
        console.error(MSG);
        console.kill();
    }
}