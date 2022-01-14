function helpFn(dirPath) {
    console.log(`
    List of all the commands:
                node main.js tree "directoryPath"
                node main.js organize "directoryPath"
                node main.js help
                `);
}
module.exports = {
    helpkey: helpFn
}