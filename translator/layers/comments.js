module.exports = {
    order: 1,
    runner: function(data) {
        const code = data.code;
        let old_letter = "";
        let is_big_comment = false;
        let is_comment = false;
        let new_code = "";
        for (const letter of code.split('')) {
            if (is_big_comment) {
                if (letter === '/'  && old_letter === '*') {
                    is_big_comment = false;
                }
                old_letter = letter;
                continue;
            }

            if (is_comment) {
                if (letter === '\n') {
                    is_comment = false;
                }
                old_letter = letter;
                continue;
            }
            
            if (letter === '*'  && old_letter === '/') {
                is_big_comment = true;
            } else if (letter === '/' && old_letter === '/') {
                is_comment = true;
            } else {
                new_code += letter;
            }
            old_letter = letter;
        }
        data.code = new_code;
        return data;
    }
}