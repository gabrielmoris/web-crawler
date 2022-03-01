const fs = require("fs");
let dataForJson; //escribir aqui la data final
const pathToWrite = __dirname + `/data.json`;

let contentHTML = fs.readFile(__dirname + "/webToCheck.html", (err, data) => {
    if (err) throw err;
    console.log(data);
});

// console.log(contentHTML)

fs.writeFile(pathToWrite, dataForJson, (err) => {
    if (err) {
        console.log("Error", err);
        return;
    }
    console.log("Write File Sucess");
});
