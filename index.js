const fs = require("fs");
const cheerio = require("cheerio");
const { children } = require("cheerio/lib/api/traversing");

let dataForJson = {}; //escribir aqui la data final
const pathToWrite = __dirname + `/data.json`;

let data = fs.readFileSync(`${__dirname}/webToCheck.html`, "utf8");

const getDataFromHTML = (html) => {
    let result = []
    let arrayOfPrices = []
    let arrOfNamesRaw =[]
    let arrayOfNames =[]
    const $ = cheerio.load(html, null, false);
    $.html();
    const propertyNames = $("h5", ".property-content").each(function (i, e) {
        arrOfNamesRaw[i] = $(this).text();
    });

    const propertyPrices = $(".sc-fKFyDc").each(function (i, e) {
        arrayOfPrices[i] = $(this).text()
    });
    
    const propertyLocations = $("span", ".sc-bBXqnf").text();
    const cleanPropertyLocations = propertyLocations.replace(/\s+/g, ' ').trim()

    const arrayOfLocations = cleanPropertyLocations.split(",")

    for(let i = 0; i< arrOfNamesRaw.length;i++){
        arrayOfNames.push(arrOfNamesRaw[i].replace(/\s+/g, ' '))
    }

    for(j =0; j<arrOfNamesRaw.length;j++){
          const obj ={
              property: arrayOfNames[j],
              location: arrayOfLocations[j],
              price: arrayOfPrices[j]
          }
          result.push(obj)
    }

    return result
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
