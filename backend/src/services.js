const version = require('./service/version.js');
const cook = require('./service/cook.js');
const cookPublic = require('./service/cookPublic.js');

module.exports = app => {
  const services = {
    version,
  };
  if (app.meta.isTest || app.meta.isLocal) {
    Object.assign(services, {
      cook,
      cookPublic,
    });
  }
  return services;
};
