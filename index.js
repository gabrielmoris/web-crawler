const fs = require("fs");
const cheerio = require("cheerio");
const { children } = require("cheerio/lib/api/traversing");

let dataForJson = {}; //escribir aqui la data final
const pathToWrite = __dirname + `/data.json`;

let data = fs.readFileSync(`${__dirname}/webToCheck.html`, "utf8");

const getDataFromHTML = (html) => {
    let results = [];
    const $ = cheerio.load(html, null, false);
    $.html();
    const propertyNames = $("h5", ".property-content")
        .contents()
        .map(function () {
            return this.type === "text" ? $(this).text() : "";
        })
        .get()
        .join("_");
    const propertyLocations = $("span", ".sc-bBXqnf").text();
    const propertyPrices = $("li", ".sc-fKFyDc").text();

    const arrayOfPropertyNames = propertyNames.split("_");
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
