const fs = require("fs");
const path = require("path");

function servicesBinder(externalSource) {
  const servicesPath = path.join(__dirname, "..", "services");
  try {
    const services = {};
    fs.readdirSync(servicesPath)
      .filter((f) => f !== "db.js")
      .forEach((filename, index) => {
        const service = require(`${servicesPath}/${filename}`);
        const name = filename.split(".")[0];
        services[name] = new service(externalSource);
      });
    return services;
  } catch (error) {
    console.error(`Was not able to bind services: ${error.stack}`);
    return {};
  }
}

module.exports = servicesBinder;
