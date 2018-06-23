const cook = require('./model/cook.js');
const cookType = require('./model/cookType.js');
const cookPublic = require('./model/cookPublic.js');

module.exports = app => {
  const models = {
  };
  if (app.meta.isTest || app.meta.isLocal) {
    Object.assign(models, {
      cook,
      cookType,
      cookPublic,
    });
  }
  return models;
};
