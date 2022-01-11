let inputArr = process.argv.slice(2);
console.log(inputArr);
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help
let command = inputArr[0];
switch (command) {
    case "tree":
        treeFn(input[1]);
        break;
    case "organize":
        organizeFn(input[1])
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
    console.log("Organize command implemented for ", dirPath);
}
function helpFn(dirPath) {
    console.log(`
    List of all the commands:
                node main.js tree "directoryPath"
                node main.js organize "directoryPath"
                node main.js help
                `);
}