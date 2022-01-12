let inputArr = process.argv.slice(2);
let fs = require('fs');
let path = require('path');

// console.log(inputArr);
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help
let command = inputArr[0];
let types = {
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', 'deb']
}

switch (command) {
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1])
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please Input Right Command");
        break;
}

function treeFn(dirPath) {
    console.log("Tree command implemented for ", dirPath);
}

function organizeFn(dirPath) {
    // console.log("Organize command implemented for ", dirPath);
    // 1.input -> directory path given
    let destPath;
    if (dirPath == undefined) {
        console.log("kindly enter the path");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {

            // 2.create-> organized_files -> directory
            destPath = path.join(dirPath, "organized_files")
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }
        } else {
            console.log("kindly enter the correct paths");
            return;
        }
    }
    organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
    // 3.Identify category of all the files present in that input directory ->
    let childName = fs.readdirSync(src);
    // console.log(childName);
    for (let i = 0; i < childName.length; i++) {
        let childAddress = path.join(src, childName[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childName[i]);
            let category = getCategory(childName[i]);
            console.log(childName[i], "belongs to -->", category);
            // 4.Copy / Cut files to that organized directory inside of any of category folder
            sendFiles(childAddress, dest, category);

        }
    }

}

function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to ", category);
}

function getCategory(name) {
    let ext = path.extname(name)
    ext = ext.slice(1);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}

function helpFn(dirPath) {
    console.log(`
    List of all the commands:
                node main.js tree "directoryPath"
                node main.js organize "directoryPath"
                node main.js help
                `);
}






