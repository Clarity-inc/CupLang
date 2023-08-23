function get_all_files_folders(pwd) {
    let all = {
        files: [],
        folders: []
    };
    for (let i = 0; i < fs.readdirSync(pwd).length; i++) {
        const current = fs.readdirSync(pwd)[i];
        const file = fs.lstatSync(path.join(pwd, current));
        if (file.isDirectory()) {
            all.folders.push(path.join(pwd, current));
            const neww = get_all_files_folders(path.join(pwd, current));
            all.folders.push(...neww.folders);
            all.files.push(...neww.files);
        } else {
            all.files.push(path.join(pwd, current));
        }
    }
    return all;
}

module.exports = {
    description: "Removes a project (not usefull on it's own)",
    func: function(output) {
        console.log("Do you understand that this will delete everything in the project?");
        if (!prompt("Do you want to delete everything in the project? (y/n) ").toLowerCase().includes('y')) {
            console.log("Okay, bye!");
            return;
        }
        console.log("Deleting everything in the project...");
        const all = get_all_files_folders(process.cwd());
        if (!prompt(`Last warning, are you sure to delete the folders ${all.folders.join("\n")} and the files ${all.files.join("\n")}\nAre you sure to want to delete all of this? (y/n)`).toLowerCase().includes('y')) {
            console.log("Okay, bye!");
            return;
        }
        for (let i = 0; i < all.files.length; i++) {
            fs.unlinkSync(all.files[i]);
        }
        for (let i = 0; i < all.folders.length; i++) {
            fs.rmdirSync(all.folders[i]);
        }
        console.log("All Done!");
    }
};