module.exports = {
    name: "default",
    run: {
        "comments": require('../../translator/comments'),
        "developp_func": require('../../translator/developp_func'),
        "math": require('../../translator/math'),
        "func_info": require('../../translator/func_info'),
        "developp_var": require('../../translator/developp_var'),
        "var_info": require('../../translator/var_info'),
    }
}