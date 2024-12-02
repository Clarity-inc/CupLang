const get_after = require(`../utils/get_after`);
module.exports = {
    order: 2,
    runner: function(data) {
        const code = data.code;
        const lines = code.split('\n');
        let line = "";
        let result = "";
        let new_code = "";
        for (let i = 0; i < lines.length; i++) {
            line = lines[i];
            if (line.startsWith('func ')) {
                result = get_after(line, ")")
                if (result.replace(" ", '').startsWith('{')) {
                    result = "";
                    for (let i = 0; i < (line.length - result.length); i++) {
                        result += line[i];
                    }
                    new_code += result + " -> void {\n";
                    continue;
                }
            }
            new_code += line + '\n';
        }
        data.code = new_code;
        return data;
    }
}