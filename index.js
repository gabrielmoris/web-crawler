const fs = require("fs");
const cheerio = require("cheerio");
const pathToWrite = __dirname + `/propertiesWeb.json`;

let data = fs.readFileSync(`${__dirname}/webToCheck.html`, "utf8");

const getDataFromHTML = (html) => {
    let result = [];
    let arrayOfPrices = [];
    let arrOfNamesRaw = [];
    let arrayOfNames = [];
    const $ = cheerio.load(html, null, false);
    $.html();
    const propertyNames = $("h5", ".property-content").each(function (i, e) {
        arrOfNamesRaw[i] = $(this).text();
    });

    const propertyPrices = $(".sc-fKFyDc").each(function (i, e) {
        arrayOfPrices[i] = $(this).text();
    });

    const propertyLocations = $("span", ".sc-bBXqnf").text();
    const cleanPropertyLocations = propertyLocations
        .replace(/\s+/g, " ")
        .trim();

    const arrayOfLocations = cleanPropertyLocations.split(",");

    for (let i = 0; i < arrOfNamesRaw.length; i++) {
        arrayOfNames.push(arrOfNamesRaw[i].replace(/\s+/g, " "));
    }

    for (j = 0; j < arrOfNamesRaw.length; j++) {
        const obj = {
            property: arrayOfNames[j],
            location: arrayOfLocations[j],
            price: arrayOfPrices[j],
        };
        result.push(obj);
    }

    return result;
};

const url =
    "https://apartamentosrd.com.do/propiedades?city=60&country=149&currency=RD&listing_type=1&page=1";



let dataForJson = getDataFromHTML(data);
// console.log("DATAFORJSON ", dataForJson);

try {
    const stringedObj = JSON.stringify(dataForJson, null, 8);
    fs.writeFileSync(pathToWrite, stringedObj);
} catch (e) {
    console.log("Error making string: ", e);
}

module.exports.getDataFromHTML = getDataFromHTML;
