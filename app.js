const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routeBinder = require("./binder/route.binder");
const serviceBinder = require("./binder/service.binder");
const marvelRequest = require("./helper/axios.helper");

const app = express();

async function loadRoutes(services) {
    return await routeBinder(app, express, services);
}

async function loadServices(externalSource) {
    return await serviceBinder(externalSource);
}

app.listen(3000, async () => {
    console.log("Server running at port 3000 at http://localhost/3000");
    const services = await loadServices(new marvelRequest());
    await loadRoutes(services);
    app.use(function (req, res) {
        res.status(405).json({
            description: "Specified HTTP method not allowed.",
        });
    });
});

app.use(morgan("combined"));

app.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({
            errors: [{ msg: `error parsing data: ${err.message}` }],
        });
    } else {
        next();
    }
});

app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
    })
);

app.use(
    bodyParser.json({
        limit: "50mb",
    })
);
