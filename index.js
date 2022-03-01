const fs = require("fs");
const cheerio = require("cheerio");

let dataForJson = {}; //escribir aqui la data final
const pathToWrite = __dirname + `/data.json`;

let data = fs.readFileSync(`${__dirname}/webToCheck.html`, "utf8");

const getDataFromHTML = (html) => {
    let results = [];
    const $ = cheerio.load(html);
    $("span.comhead").each(function () {
        let a = $(this).prev();
        let title = a.text();
        let url = a.attr("href");

        let obj = {
            title: title,
            url: url,
        };
        results.push(obj);
    });
    if (results.length > 0) {
        console.log(results);
        return results;
    }
};

console.log(getDataFromHTML(data));

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
