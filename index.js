const fs = require("fs");
const cheerio = require("cheerio");
var request = require("request");

const pathToWrite = __dirname + `/properties.json`;

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

// let dataForJson = fetch(
//     {
//         method: "GET",
//         url: "https://apartamentosrd.com.do/propiedades?city=60&currency=RD&listing_type=1&page=1",
//     },
//     (err, res, body) => {
//         if (err) return console.error(err);

//         getDataFromHTML(body);
//     }
// );

let dataForJson = request(
    {
        uri: "https://apartamentosrd.com.do/propiedades?city=60&currency=RD&listing_type=1&page=1",
    },
    function (error, response, body) {
        let dataJson = getDataFromHTML(JSON.parse(body));
        return dataJson;
    }
);

console.log(dataForJson)


// let dataForJson = getDataFromHTML(data);

try {
    const stringedObj = JSON.stringify(dataForJson, null, 8);
    fs.writeFileSync(pathToWrite, stringedObj);
} catch (e) {
    console.log("Error making string: ", e);
}
