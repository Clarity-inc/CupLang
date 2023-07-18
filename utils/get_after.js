module.exports = function(content, content_after) {
    let old = "";
    let result = "";
    let on_read = false;
    for (let i = 0; i < content.length; i++) {
        if (on_read) {
            result += content[i];
        } else {
            old += content[i];
            if (old === content_after) {
                on_read = true;
                old = [];
            } else {
                if (old.length === (content_after.lenght - 1)) {
                    old = old.slice(1);
                }
            }
        }
    }
    return result;
}