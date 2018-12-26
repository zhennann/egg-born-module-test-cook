const require3 = require('require3');
const extend = require3('extend2');
const authFn = require('./config/passport/auth.js');

module.exports = app => {
  const meta = {
  };
  if (app.meta.isTest || app.meta.isLocal) {
    // schemas
    const schemas = require('./config/validation/schemas.js')(app);
    // meta
    extend(true, meta, {
      base: {
        atoms: {
          cook: {
            info: {
              title: 'Cook',
              tableName: 'testCookView',
            },
            actions: {
              review: {
                code: 101,
                title: 'Review',
                flag: '1',
              },
            },
            flags: {
              1: {
                title: 'Reviewing',
              },
              2: {
                title: 'Reviewed',
              },
            },
            validator: 'cook',
            search: {
              validator: 'cookSearch',
            },
          },
        },
        functions: {
          createCook: {
            title: 'Create Cook',
            scene: 'create',
            autoRight: 1,
            atomClassName: 'cook',
            action: 'create',
            sorting: 1,
            menu: 1,
          },
          listCook: {
            title: 'Cook List',
            scene: 'list',
            autoRight: 1,
            atomClassName: 'cook',
            action: 'read',
            sorting: 1,
            menu: 1,
          },
        },
      },
      validation: {
        validators: {
          cook: {
            schemas: 'cook',
          },
          cookSearch: {
            schemas: 'cookSearch',
          },
        },
        keywords: {},
        schemas: {
          cook: schemas.cook,
          cookSearch: schemas.cookSearch,
        },
      },
    });
  }
  if (app.meta.isTest) {
    // meta
    extend(true, meta, {
      base: {
        atoms: {
          cookPublic: {
            info: {
              tableName: 'testCookPublic',
              public: 1,
              flow: 1,
            },
          },
        },
        functions: {
          testPublic: {
            scene: 'tools',
            menu: 1,
            public: 1,
          },
        },
      },
      auth: authFn(app),
    });
  }
  return meta;
};
