const fs = require("fs");
let dataForJson = {}; //escribir aqui la data final
const pathToWrite = __dirname + `/data.json`;

let data = fs.readFileSync(`${__dirname}/webToCheck.html`, "utf8");
console.log(data);


//VERSION1
// fs.writeFile(pathToWrite, dataForJson, (err) => {
//     if (err) {
//         console.log("Error", err);
//         return;
//     }
//     console.log("Write File Sucess");
// });

//VERSION2
// try {
//     const stringedObj = JSON.stringify(dataForJson, null, 8);
//     fs.writeFileSync(pathToWrite, stringedObj);
// } catch (e) {
//     console.log("Error in making string: ", e); //logs 'ReferenceError: asdfasfasf is not defined'
// }
