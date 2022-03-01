const fs = require("fs");
let dataForJson; //escribir aqui la data final
const pathToWrite = __dirname + `/data.json`;

let data = fs.readFileSync(`${__dirname}/webToCheck.html`, "utf8");
console.log(data);



// fs.writeFile(pathToWrite, dataForJson, (err) => {
//     if (err) {
//         console.log("Error", err);
//         return;
//     }
//     console.log("Write File Sucess");
// });
