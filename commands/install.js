function get_modules(path) {
    const folder = fs.readdirSync(path);
    const modules = [];
    for (let i = 0; i < folder.length; i++) {
        if (fs.statSync(path.join(path, folder[i])).isDirectory()) {
            modules.push(...get_modules(folder[i]));
        }
        else {
            const file = folder[i];
            if (file === "init.cupcake") {
                modules.push(path.join(path, folder[i]));
            }
        }
    }
}

module.exports = function(output) {
    const url = output[1];
    if (!url || !url.startsWith("https://github.com/")) {
        console.log("Please provide a valid url (from github)\nExample : cupcake install https://github.com/clarity-inc/betterstd.git");
        return;
    }
    try {
        execSync(`git clone ${url} ${path.join(process.cwd(), "cupModules")}`);
    } catch (e) {
        console.log(e);
        console.log("[Tips] : Make sure to have git in your system.");
    }
    if (!output.includes('-y')) {
        const answer = readline.question("Do you want us to autodetect modules? (y/n) ").toLowerCase();
        if (answer !== "y" && answer !== "yes") {
            console.log("Ok Bye!");
            return;
        }
    }
    new_pkg = {};
    new_pacakages = [];
    const old_pkg = fs.readFileSync(path.join(process.cwd(), "package.cupcake"));
    for (const lin of old_pkg.split("\n")) {
        const da = lin.split(': ');
        new_pkg[da[0]] = da[1];
    }
    const modules = get_modules(path.join(process.cwd(), "cupModules", url.split('/')[-1]));
    for (let i = 0; i < modules.length; i++) {
        const file = modules[i];
        const module = file.split(path.sep)[file.split(path.sep).length - 1];
        if (new_pkg[module] && output.includes("-o")) {
            console.log(`Module ${module} is already installed, skipping it and using the old one...\n[Tips] To use the new one use the option -o`);
            continue;
        }
        const data = JSON.parse(fs.readFileSync(module, "utf8").substring(8)); 
        for (let i = 0; i < data.required_packages.length; i++) {
            const modu = data.required_packages[i];
            if (new_pkg[modu] && !output.includes("-o")) {
                console.log(`Module ${modu} is already installed, skipping it and using the old one...\n[Tips] To use the new one use the option -o`);
            } else {
                new_pacakages.push(modu);
                new_pkg[modu] = data.required_packages_location[i];
            }
        }
        new_packages.push(modu);
        new_pkg[module] = file;
    }
    let new_pkg_str = "";
    for (const key in new_pkg) {
        new_pkg_str += `${key}: ${new_pkg[key]}\n`;
    }
    fs.writeFileSync(path.join(process.cwd(), "package.cupcake"), new_pkg_str);
    console.log("Done!");
    console.log(`New/Updated packages : ${new_pacakages.join("\n")}`);
};