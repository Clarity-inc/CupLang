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
        let MSG = "";
        if (typeof match === Number) {
            MSG = `${lines[match]}\nCupLang ${data.file} -> ${match}`;
        } else {
            MSG = `No correspondance was found.\nClosest match : ${match}\n[Cuplang ${data.file} -> ?]`;
            for(let i = 0; i < lines.length; i++) {
                let cLine = lines[i];
                if (cLine === match) {
                    MSG = `${match}\n[CupLang ${data.file} -> ${i + 1}]`;
                    break;
                }
            }
        }
        console.error(MSG + `\n${message}`);
        console.kill();
    }
}