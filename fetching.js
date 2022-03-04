const fetch = require("node-fetch");
const getdata = require("./index");

const url =
    "https://apartamentosrd.com.do/propiedades?city=60&country=149&currency=RD&listing_type=1&page=1";

fetch(url)
    .then((res) => res.text())
    .then((body) => {
        console.log(getdata(body));
    });

