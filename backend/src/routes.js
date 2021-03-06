const version = require('./controller/version.js');
const cook = require('./controller/cook.js');
const test = require('./controller/test.js');
const test2 = require('./controller/test2.js');
const cookPublic = require('./controller/cookPublic.js');

module.exports = app => {
  let routes = [
    // version
    { method: 'post', path: 'version/update', controller: version, middlewares: 'inner' },
    { method: 'post', path: 'version/init', controller: version, middlewares: 'inner' },
    { method: 'post', path: 'version/test', controller: version, middlewares: 'test' },
  ];
  if (app.meta.isTest || app.meta.isLocal) {
    routes = routes.concat([
      // cook
      { method: 'post', path: 'cook/create', controller: cook, middlewares: 'inner', meta: { auth: { enable: false } } },
      { method: 'post', path: 'cook/read', controller: cook, middlewares: 'inner', meta: { auth: { enable: false } } },
      { method: 'post', path: 'cook/select', controller: cook, middlewares: 'inner', meta: { auth: { enable: false } } },
      { method: 'post', path: 'cook/write', controller: cook, middlewares: 'inner,validate',
        meta: {
          auth: { enable: false },
          validate: { validator: 'cook', data: 'item' },
        },
      },
      { method: 'post', path: 'cook/delete', controller: cook, middlewares: 'inner', meta: { auth: { enable: false } } },
      { method: 'post', path: 'cook/action', controller: cook, middlewares: 'inner', meta: { auth: { enable: false } } },
      { method: 'post', path: 'cook/enable', controller: cook, middlewares: 'inner', meta: { auth: { enable: false } } },
      { method: 'post', path: 'cook/types', controller: cook },
      // test echo
      { method: 'get', path: 'test/echo/:id', controller: test, action: 'echo', middlewares: 'test,transaction' },
      { method: 'get', path: 'test/echo1', controller: test, middlewares: 'test' },
      { method: 'get', path: 'test/echo2', controller: test, middlewares: 'test' },
      // test star label
      { method: 'get', path: 'test/starlabel', controller: test, middlewares: 'test', meta: { auth: { enable: false } } },
      // test atom
      { method: 'get', path: 'test/atom', controller: test, middlewares: 'test', meta: { auth: { enable: false } } },
      // test right atom
      { method: 'post', path: 'test/checkRightCreate', controller: test, middlewares: 'test',
        meta: { right: { type: 'atom', action: 1 } },
      },
      { method: 'post', path: 'test/checkRightRead', controller: test, middlewares: 'test',
        meta: { right: { type: 'atom', action: 2 } },
      },
      { method: 'post', path: 'test/checkRightWrite', controller: test, middlewares: 'test',
        meta: { right: { type: 'atom', action: 3 } },
      },
      { method: 'post', path: 'test/checkRightAction', controller: test, middlewares: 'test',
        meta: { right: { type: 'atom', action: 101 } },
      },
      // test right function
      { method: 'post', path: 'test/checkRightFunctionUser', controller: test, middlewares: 'test',
        meta: { right: { type: 'function', module: 'a-baseadmin', name: 'user' } },
      },
      // test function
      { method: 'get', path: 'test/function', controller: test, action: 'func', middlewares: 'test', meta: { auth: { enable: false } } },
      { method: 'get', path: 'test/functionPublic', controller: test, action: 'funcPublic', middlewares: 'test', meta: { auth: { enable: false } } },
      // test event: userVerify
      { method: 'post', path: 'test/eventUserVerify', controller: test, middlewares: 'test', meta: { auth: { enable: false } } },
      // test atom public
      { method: 'get', path: 'test/atomPublic', controller: test, middlewares: 'test' },
      { method: 'post', path: 'cookPublic/create', controller: cookPublic, middlewares: 'inner', meta: { auth: { enable: false } } },
      { method: 'post', path: 'cookPublic/write', controller: cookPublic, middlewares: 'inner', meta: { auth: { enable: false } } },
      { method: 'post', path: 'cookPublic/delete', controller: cookPublic, middlewares: 'inner', meta: { auth: { enable: false } } },
      { method: 'post', path: 'test/httpLog', controller: test, middlewares: 'test,httpLog', meta: { auth: { enable: false } } },
      // test user role
      { method: 'get', path: 'test/userRole', controller: test, middlewares: 'test', meta: { auth: { enable: false } } },
      // test startup
      { method: 'post', path: 'test/startupAll', controller: test, middlewares: 'inner', meta: { instance: { enable: false } } },
      { method: 'post', path: 'test/startupInstance', controller: test, middlewares: 'inner', meta: { auth: { enable: false } } },
      // test2 sendMail
      { method: 'get', path: 'test2/sendMail', controller: test2, middlewares: 'mail,test', meta: { auth: { enable: false } } },
    ]);
  }
  return routes;
};
