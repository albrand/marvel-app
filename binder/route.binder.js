const fs = require("fs");
const path = require("path");

function routesBinder(app, express, services) {
  const routesPath = path.join(__dirname, "..", "routes");
  try {
    fs.readdirSync(routesPath).forEach((filename) => {
      const route = require(`${routesPath}/${filename}`);
      const name = filename.split(".")[0];
      app.use("/", name === 'ping' ? route(express) : route(express, services[name]));
    });
  } catch (error) {
    console.error(`Was not possible to bind routes: ${error}`);
    return {};
  }
}

module.exports = routesBinder;
