module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("require3");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const config = __webpack_require__(2);
const locales = __webpack_require__(3);
const errors = __webpack_require__(5);
const middlewares = __webpack_require__(6);

// eslint-disable-next-line
module.exports = app => {

  // routes
  const routes = __webpack_require__(7)(app);
  // services
  const services = __webpack_require__(12)(app);
  // models
  const models = __webpack_require__(18)(app);
  // meta
  const meta = __webpack_require__(22)(app);

  return {
    routes,
    services,
    models,
    config,
    locales,
    errors,
    middlewares,
    meta,
  };

};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// eslint-disable-next-line
module.exports = appInfo => {
  const config = {};
  return config;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  'zh-cn': __webpack_require__(4),
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  'Create Cook': '新建烹饪',
  'Cook List': '烹饪列表',
  Cook: '烹饪',
  Review: '评审',
  Reviewing: '评审中',
  Reviewed: '已评审',
  Breakfast: '早餐',
  Lunch: '午餐',
  Dinner: '晚餐',
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// error code should start from 1001
module.exports = {
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const version = __webpack_require__(8);
const cook = __webpack_require__(9);
const test = __webpack_require__(10);
const cookPublic = __webpack_require__(11);

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
      { method: 'post', path: 'cook/create', controller: cook, middlewares: 'inner' },
      { method: 'post', path: 'cook/read', controller: cook, middlewares: 'inner' },
      { method: 'post', path: 'cook/select', controller: cook, middlewares: 'inner' },
      { method: 'post', path: 'cook/write', controller: cook, middlewares: 'inner' },
      { method: 'post', path: 'cook/delete', controller: cook, middlewares: 'inner' },
      { method: 'post', path: 'cook/action', controller: cook, middlewares: 'inner' },
      { method: 'post', path: 'cook/enable', controller: cook, middlewares: 'inner' },
      { method: 'post', path: 'cook/types', controller: cook },
      // test echo
      { method: 'get', path: 'test/echo/:id', controller: test, action: 'echo', middlewares: 'test,transaction' },
      { method: 'get', path: 'test/echo1', controller: test, middlewares: 'test' },
      { method: 'get', path: 'test/echo2', controller: test, middlewares: 'test' },
      // test star label
      { method: 'get', path: 'test/starlabel', controller: test, middlewares: 'test' },
      // test atom
      { method: 'get', path: 'test/atom', controller: test, middlewares: 'test' },
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
      { method: 'get', path: 'test/function', controller: test, action: 'func', middlewares: 'test' },
      { method: 'get', path: 'test/functionPublic', controller: test, action: 'funcPublic', middlewares: 'test' },
      // test event: userVerify
      { method: 'post', path: 'test/eventUserVerify', controller: test, middlewares: 'test', meta: { auth: { enable: false } } },
      // test atom public
      { method: 'get', path: 'test/atomPublic', controller: test, middlewares: 'test' },
      { method: 'post', path: 'cookPublic/create', controller: cookPublic, middlewares: 'inner' },
      { method: 'post', path: 'cookPublic/write', controller: cookPublic, middlewares: 'inner' },
      { method: 'post', path: 'cookPublic/delete', controller: cookPublic, middlewares: 'inner' },
    ]);
  }
  return routes;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = app => {
  class VersionController extends app.Controller {

    async update() {
      await this.service.version.update(this.ctx.request.body);
      this.ctx.success();
    }

    async init() {
      await this.service.version.init(this.ctx.request.body);
      this.ctx.success();
    }

    async test() {
      await this.service.version.test(this.ctx.request.body);
      this.ctx.success();
    }

  }
  return VersionController;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = app => {

  class CookController extends app.Controller {

    async create() {
      const res = await this.ctx.service.cook.create(this.ctx.request.body);
      this.ctx.success(res);
    }

    async read() {
      const res = await this.ctx.service.cook.read(this.ctx.request.body);
      this.ctx.success(res);
    }

    async select() {
      const res = await this.ctx.service.cook.select(this.ctx.request.body);
      this.ctx.success(res);
    }

    async write() {
      await this.ctx.service.cook.write(this.ctx.request.body);
      this.ctx.success();
    }

    async delete() {
      await this.ctx.service.cook.delete(this.ctx.request.body);
      this.ctx.success();
    }

    async action() {
      const res = await this.ctx.service.cook.action(this.ctx.request.body);
      this.ctx.success(res);
    }

    async enable() {
      const res = await this.ctx.service.cook.enable(this.ctx.request.body);
      this.ctx.success(res);
    }

    async types() {
      const res = await this.ctx.service.cook.types(this.ctx.request.body);
      this.ctx.success(res);
    }

  }
  return CookController;
};



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const require3 = __webpack_require__(0);
const assert = require3('assert');

module.exports = app => {

  class TestController extends app.Controller {

    // right

    async checkRightCreate() {
      this.ctx.success(this.ctx.request.body);
    }

    async checkRightRead() {
      this.ctx.success(this.ctx.request.body);
    }

    async checkRightWrite() {
      this.ctx.success(this.ctx.request.body);
    }

    async checkRightAction() {
      this.ctx.success(this.ctx.request.body);
    }

    // function

    async checkRightFunctionUser() {
      this.ctx.success(this.ctx.request.body);
    }

    async func() {
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');
      const userTom = { id: userIds.Tom };

      // Tom list all
      let list = await this.ctx.meta.function.list({
        options: {
          where: { 'a.module': 'test-cook' },
          orders: [[ 'id', 'asc' ]],
          page: { index: 0, size: 0 },
          locale: '',
        },
        user: userTom,
      });
      assert.equal(list.length, 2);
      assert(!list[0].titleLocale);

      // Tom menu list zh-cn
      list = await this.ctx.meta.function.list({
        options: {
          where: { 'a.module': 'test-cook' },
          orders: [[ 'id', 'asc' ]],
          page: { index: 0, size: 0 },
          locale: 'zh-cn',
        },
        user: userTom,
      });
      assert.equal(list.length, 2);
      assert.notEqual(list[0].title, list[0].titleLocale);

      // hold
      const function1 = list[0];

      // clear locales
      await this.ctx.meta.function.clearLocales();

      // select star
      list = await this.ctx.meta.function.list({
        user: userTom,
        options: {
          where: { 'a.module': 'test-cook' },
          star: 1,
          page: { index: 0, size: 0 },
        },
      });
      assert(list.length === 0);

      // star 1
      await this.ctx.meta.function.star({ id: function1.id, star: 1, user: userTom });
      list = await this.ctx.meta.function.list({
        user: userTom,
        options: {
          where: { 'a.module': 'test-cook' },
          star: 1,
          page: { index: 0, size: 0 },
        },
      });
      assert(list.length === 1);

      // star 0
      await this.ctx.meta.function.star({ id: function1.id, star: 0, user: userTom });
      list = await this.ctx.meta.function.list({
        user: userTom,
        options: {
          where: { 'a.module': 'test-cook' },
          star: 1,
          page: { index: 0, size: 0 },
        },
      });
      assert(list.length === 0);

      // check
      list = await this.ctx.meta.function.check({
        functions: [{ name: function1.name }],
        user: userTom,
      });
      assert(list[0].passed === true);

      this.ctx.success();
    }

    async funcPublic() {

      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');
      const userTom = { id: userIds.Tom };

      // check right function
      const pass = await this.ctx.meta.function.checkRightFunction({ function: { name: 'testPublic' }, user: userTom });
      assert.equal(!!pass, true);

      // Tom list all
      const list = await this.ctx.meta.function.list({
        options: {
          where: { 'a.module': 'test-cook', 'a.public': 1 },
          orders: [[ 'id', 'asc' ]],
          page: { index: 0, size: 0 },
          locale: '',
        },
        user: userTom,
      });
      assert.equal(list.length, 1);

      // delete
      await this.ctx.model.query('delete from aFunction where id=?', [ list[0].id ]);

      this.ctx.success();
    }

    // echo

    async echo() {
      const res = await this.ctx.performAction({
        method: 'get',
        url: 'test/echo1',
      });
      assert(res.user.op.id === this.ctx.user.op.id);
      assert(res.instance.id === this.ctx.instance.id);
      assert(JSON.stringify(res.subdomains) === JSON.stringify(this.ctx.subdomains));
      assert(res.route.action !== this.ctx.route.action);
      this.ctx.success(res);
    }
    async echo1() {
      const res = await this.ctx.performAction({
        method: 'get',
        url: 'test/echo2',
      });
      this.ctx.success(res);
    }
    async echo2() {
      this.ctx.success({
        user: this.ctx.user,
        instance: this.ctx.instance,
        subdomains: this.ctx.subdomains,
        route: this.ctx.route,
      });
    }

    // atom

    async starlabel() {
      // atomClass
      const atomClass = await this.ctx.meta.atomClass.get({ atomClassName: 'cook' });
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');
      const userTom = { id: userIds.Tom };

      // add cook:star
      const cookKey = await this.ctx.meta.atom.create({
        atomClass,
        user: userTom,
      });

      // get cook
      let cook = await this.ctx.meta.atom.read({ key: cookKey, user: userTom });
      assert(!cook.star);
      assert(!cook.labels);

      // star label
      await this.ctx.meta.atom.star({ key: cookKey, atom: { star: 1 }, user: userTom });
      await this.ctx.meta.atom.labels({ key: cookKey, atom: { labels: [ 1 ] }, user: userTom });

      // get cook
      cook = await this.ctx.meta.atom.read({ key: cookKey, user: userTom });
      assert(cook.star === 1);
      assert(cook.labels === '[1]');

      // select cooks
      let cooks = await this.ctx.meta.atom.select({ user: userTom, options: { star: 1 } });
      assert(cooks.length === 1);
      cooks = await this.ctx.meta.atom.select({ user: userTom, options: { label: 1 } });
      assert(cooks.length === 1);
      cooks = await this.ctx.meta.atom.select({ user: userTom, options: { label: 2 } });
      assert(cooks.length === 0);

      // star label
      await this.ctx.meta.atom.star({ key: cookKey, atom: { star: 0 }, user: userTom });
      await this.ctx.meta.atom.labels({ key: cookKey, atom: { labels: null }, user: userTom });

      // get cook
      cook = await this.ctx.meta.atom.read({ key: cookKey, user: userTom });
      assert(!cook.star);
      assert(!cook.labels);

      // delete cook
      await this.ctx.meta.atom.delete({ key: cookKey, user: userTom });

      this.ctx.success();
    }

    async atom() {
      // atomClass
      const atomClass = await this.ctx.meta.atomClass.get({ atomClassName: 'cook' });
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');

      // // system test

      // user->atom
      await this._testCheckList(userIds, [
        [ 'Tom', 0 ],
        [ 'Jane', 0 ],
        [ 'Jimmy', 0 ],
        [ 'Smith', 0 ],
      ]);

      // // custom test

      // Tom add cook:egg
      const cookKey = await this.ctx.meta.atom.create({
        atomClass,
        user: { id: userIds.Tom },
      });
      await this.ctx.meta.atom.write({
        key: cookKey,
        item: { atomName: 'egg', cookCount: 3 },
        user: { id: userIds.Tom },
      });

      await this._testCheckList(userIds, [
        [ 'Tom', 1 ],
        [ 'Jane', 0 ],
        [ 'Jimmy', 0 ],
        [ 'Smith', 0 ],
      ]);

      // Tom enable cook:egg
      await this.ctx.meta.atom.enable({
        key: cookKey,
        atom: {
          atomEnabled: 1,
        },
        user: { id: userIds.Tom },
      });

      await this._testCheckList(userIds, [
        [ 'Tom', 1 ],
        [ 'Jane', 1 ],
        [ 'Jimmy', 1 ],
        [ 'Smith', 1 ],
      ]);

      // Tom update cook:egg
      await this.ctx.meta.atom.write({
        key: cookKey,
        item: { cookCount: 8 },
        user: { id: userIds.Tom },
      });

      // Tom get cook:egg
      const cook = await this.ctx.meta.atom.read({ key: cookKey, user: { id: userIds.Tom } });
      assert(cook);

      // Tom list cook:egg
      const cooks = await this.ctx.meta.atom.select({
        atomClass,
        options: {
          where: { atomName: { val: 'egg', op: 'likeRight' } },
          orders: [[ 'a.createdAt', 'desc' ]],
          page: { index: 0, size: 0 },
        },
        user: { id: userIds.Tom },
      });
      assert.equal(cooks.length, 1);

      // checkRightRead 1
      const checkRightReads = [[ 'Tom', cookKey.atomId, true ]];
      for (const [ userName, atomId, right ] of checkRightReads) {
        const res = await this.ctx.meta.atom.checkRightRead({
          atom: { id: atomId },
          user: { id: userIds[userName] },
        });
        assert(!!res === right);
      }

      // checkRightWrite
      const checkRightWrites = [[ 'Tom', cookKey.atomId, true ], [ 'Tomson', cookKey.atomId, false ]];
      for (const [ userName, atomId, right ] of checkRightWrites) {
        const res = await this.ctx.meta.atom.checkRightUpdate({
          atom: { id: atomId, action: this.ctx.constant.module('a-base').atom.action.write },
          user: { id: userIds[userName] },
        });
        assert(!!res === right, `${userIds[userName]}:${userName}`);
      }

      // checkRightCreate
      const checkRightCreates = [[ 'Tom', true ], [ 'Jimmy', true ], [ 'Smith', false ]];
      for (const [ userName, right ] of checkRightCreates) {
        const res = await this.ctx.meta.atom.checkRightCreate({
          atomClass,
          user: { id: userIds[userName] },
        });
        assert(!!res === right);
      }

      // checkRightAction:review(flag=1)
      const checkRightActions_1 = [[ 'Tom', cookKey.atomId, false ], [ 'Jane', cookKey.atomId, true ]];
      for (const [ userName, atomId, right ] of checkRightActions_1) {
        const res = await this.ctx.meta.atom.checkRightAction({
          atom: { id: atomId, action: 101 },
          user: { id: userIds[userName] },
        });
        assert(!!res === right);
      }

      // action: review
      await this.ctx.meta.atom.action({
        action: 101,
        key: cookKey,
        user: { id: userIds.Jane },
      });

      // checkRightAction:review(flag=2)
      const checkRightActions_2 = [[ 'Tom', 1, false ], [ 'Jane', 1, false ]];
      for (const [ userName, atomId, right ] of checkRightActions_2) {
        const res = await this.ctx.meta.atom.checkRightAction({
          atom: { id: atomId, action: 101 },
          user: { id: userIds[userName] },
        });
        assert(!!res === right);
      }

      // action: review again
      try {
        await this.ctx.meta.atom.action({
          action: 101,
          key: cookKey,
          user: { id: userIds.Jane },
        });
      } catch (e) {
        assert(e.code === 405);
      }

      // Tom delete cook:egg
      await this.ctx.meta.atom.delete({
        key: cookKey,
        user: { id: userIds.Tom },
      });

      await this._testCheckList(userIds, [
        [ 'Tom', 0 ],
        [ 'Jane', 0 ],
        [ 'Jimmy', 0 ],
        [ 'Smith', 0 ],
      ]);

      this.ctx.success();
    }

    async atomPublic() {
      // atomClass
      const atomClass = await this.ctx.meta.atomClass.get({ atomClassName: 'cookPublic' });
      // userIds
      const userIds = this.ctx.cache.mem.get('userIds');

      // // system test

      // user->atom
      await this._testCheckList(userIds, [
        [ 'Tom', 0 ],
        [ 'Jane', 0 ],
        [ 'Jimmy', 0 ],
        [ 'Smith', 0 ],
      ]);

      // // custom test

      // Tom add test:egg
      const cookKey = await this.ctx.meta.atom.create({
        atomClass,
        user: { id: userIds.Tom },
      });

      await this.ctx.meta.atom.write({
        key: cookKey,
        item: { atomName: 'egg' },
        user: { id: userIds.Tom },
      });

      await this._testCheckList(userIds, [
        [ 'Tom', 1 ],
        [ 'Jane', 0 ],
        [ 'Jimmy', 0 ],
        [ 'Smith', 0 ],
      ]);

      // Tom enable cook:egg
      await this.ctx.meta.atom.enable({
        key: cookKey,
        atom: {
          atomEnabled: 1,
        },
        user: { id: userIds.Tom },
      });

      await this._testCheckList(userIds, [
        [ 'Tom', 1 ],
        [ 'Jane', 0 ],
        [ 'Jimmy', 0 ],
        [ 'Smith', 0 ],
      ]);

      // checkRightRead 1
      let checkRightReads = [[ 'Jane', cookKey.atomId, false ]];
      for (const [ userName, atomId, right ] of checkRightReads) {
        const res = await this.ctx.meta.atom.checkRightRead({
          atom: { id: atomId },
          user: { id: userIds[userName] },
        });
        assert(!!res === right);
      }

      // flow cook:egg
      await this.ctx.meta.atom.flow({
        key: cookKey,
        atom: {
          atomFlow: 0,
        },
        user: { id: userIds.Tom },
      });

      await this._testCheckList(userIds, [
        [ 'Tom', 1 ],
        [ 'Jane', 1 ],
        [ 'Jimmy', 1 ],
        [ 'Smith', 1 ],
      ]);

      // checkRightRead 2
      checkRightReads = [[ 'Jane', cookKey.atomId, true ]];
      for (const [ userName, atomId, right ] of checkRightReads) {
        const res = await this.ctx.meta.atom.checkRightRead({
          atom: { id: atomId },
          user: { id: userIds[userName] },
        });
        assert(!!res === right);
      }

      // Tom get cook:egg
      const cook = await this.ctx.meta.atom.read({ key: cookKey, user: { id: userIds.Jane } });
      assert(cook);

      // Tom delete cook:egg
      await this.ctx.meta.atom.delete({
        key: cookKey,
        user: { id: userIds.Tom },
      });

      await this._testCheckList(userIds, [
        [ 'Tom', 0 ],
        [ 'Jane', 0 ],
        [ 'Jimmy', 0 ],
        [ 'Smith', 0 ],
      ]);

      this.ctx.success();
    }

    async eventUserVerify() {
      const data = this.ctx.request.body.data;
      console.log('onUserVerify profileId: ', data.profileUser.profileId);
      this.ctx.success();
    }

    async _testCheckList(userIds, userAtoms) {
      for (const [ userName, atomCountExpected ] of userAtoms) {
        const list = await this.ctx.meta.atom.select({
          options: {
            where: { 'b.module': 'test-cook' },
            orders: null,
            page: null,
          },
          user: { id: userIds[userName] },
        });
        assert.equal(list.length, atomCountExpected);
      }
    }

  }

  return TestController;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = app => {

  class CookPublicController extends app.Controller {

    async create() {
      const res = await this.ctx.service.cookPublic.create(this.ctx.request.body);
      this.ctx.success(res);
    }

    async write() {
      await this.ctx.service.cookPublic.write(this.ctx.request.body);
      this.ctx.success();
    }

    async delete() {
      await this.ctx.service.cookPublic.delete(this.ctx.request.body);
      this.ctx.success();
    }

  }
  return CookPublicController;
};



/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const version = __webpack_require__(13);
const cook = __webpack_require__(16);
const cookPublic = __webpack_require__(17);

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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const VersionTestFn = __webpack_require__(14);

module.exports = app => {

  class Version extends app.Service {

    async update(options) {
      if (options.version === 1) {
        let sql = `
          CREATE TABLE testCook (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            cookCount int(11) DEFAULT '0',
            cookTypeId int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `;
        await this.ctx.model.query(sql);

        sql = `
          CREATE TABLE testCookType (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            name varchar(255) DEFAULT NULL,
            PRIMARY KEY (id)
          )
        `;
        await this.ctx.model.query(sql);

        sql = `
          CREATE VIEW testCookView as
            select a.*,b.name as cookTypeName from testCook a
              left join testCookType b on a.cookTypeId=b.id
        `;
        await this.ctx.model.query(sql);

        sql = `
          CREATE TABLE testCookPublic (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `;
        await this.ctx.model.query(sql);
      }
    }

    async init(options) {
      if (options.version === 1) {
        if (this.app.meta.isTest || this.app.meta.isLocal) {
          // types
          for (const name of [ 'Breakfast', 'Lunch', 'Dinner' ]) {
            await this.ctx.model.cookType.insert({ name });
          }
        }
      }
    }

    async test() {
      const versionTest = new (VersionTestFn(this.ctx))();
      await versionTest.run();
    }

  }

  return Version;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


const testData = __webpack_require__(15);

module.exports = function(ctx) {

  class VersionTest {

    async run() {
      const roleIds = await this._testRoles();
      await this._testRoleIncs(roleIds);
      await ctx.meta.role.build();
      const userIds = await this._testUsers(roleIds);

      await this._testRoleRights(roleIds);

      await this._testAuths(userIds);

      this._testCache(roleIds, userIds);
    }

    _testCache(roleIds, userIds) {
      ctx.cache.mem.set('roleIds', roleIds);
      ctx.cache.mem.set('userIds', userIds);
    }

    // roles
    async _testRoles() {
      const roleIds = {};
      // system roles
      for (const roleName of ctx.constant.module('a-base').systemRoles) {
        const role = await ctx.meta.role.getSystemRole({ roleName });
        roleIds[roleName] = role.id;
      }
      // roles
      for (const [ roleName, leader, catalog, roleNameParent ] of testData.roles) {
        roleIds[roleName] = await ctx.meta.role.add({
          roleName,
          leader,
          catalog,
          roleIdParent: roleIds[roleNameParent],
        });
      }

      return roleIds;
    }

    // role incs
    async _testRoleIncs(roleIds) {
      for (const [ roleId, roleIdInc ] of testData.roleIncs) {
        await ctx.meta.role.addRoleInc({
          roleId: roleIds[roleId],
          roleIdInc: roleIds[roleIdInc],
        });
      }
    }

    // users
    async _testUsers(roleIds) {
      const userIds = {};
      for (const [ userName, roleName ] of testData.users) {
        userIds[userName] = await ctx.meta.user.add({
          userName,
          realName: userName,
        });
        await ctx.meta.role.addUserRole({
          userId: userIds[userName],
          roleId: roleIds[roleName],
        });
      }
      // root
      const userRoot = await ctx.meta.user.get({ userName: 'root' });
      userIds.root = userRoot.id;
      return userIds;
    }

    // role rights
    async _testRoleRights(roleIds) {
      const module = ctx.app.meta.modules[ctx.module.info.relativeName];
      for (const [ roleName, atomClassName, actionName, scopeNames ] of testData.roleRights) {
        const atomClass = await ctx.meta.atomClass.get({ atomClassName });
        await ctx.meta.role.addRoleRight({
          roleId: roleIds[roleName],
          atomClassId: atomClass.id,
          action: ctx.constant.module('a-base').atom.action[actionName] || module.main.meta.base.atoms[atomClassName]
            .actions[actionName].code,
          scope: scopeNames ? scopeNames.split(',').map(scopeName => roleIds[scopeName]) : 0,
        });
      }
    }

    // auths
    async _testAuths(userIds) {
      for (const userName in userIds) {
        await ctx.performAction({
          method: 'post',
          url: '/a/authsimple/auth/add',
          body: {
            userId: userIds[userName],
            password: '',
          },
        });
      }
    }

  }

  return VersionTest;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// roleName, leader, catalog, roleNameParent
const roles = [
  [ 'friend', 0, 0, 'external' ],
  [ 'consultant', 0, 1, 'external' ],
  [ 'study', 0, 0, 'consultant' ],
  [ 'work', 0, 0, 'consultant' ],
  [ 'life', 0, 0, 'consultant' ],
  [ 'family', 0, 1, 'internal' ],
  [ 'father', 0, 0, 'family' ],
  [ 'mother', 1, 0, 'family' ],
  [ 'son', 0, 0, 'family' ],
  [ 'daughter', 0, 0, 'family' ],
];

// friend->family
const roleIncs = [
  [ 'friend', 'family' ],
];

// family and friend
//   userName, roleName
const users = [
  [ 'Tom', 'father' ], [ 'Jane', 'mother' ], [ 'Tomson', 'son' ], [ 'Jannie', 'daughter' ],
  [ 'Jimmy', 'friend' ], [ 'Rose', 'friend' ],
  [ 'Smith', 'life' ],
];

// roleRights
const roleRights = [
  [ 'superuser', 'cook', 'create' ],
  [ 'superuser', 'cook', 'read', 'family' ],
  [ 'superuser', 'cook', 'review', 'family' ],
  [ 'superuser', 'cook', 'review', 'authenticated' ],
  [ 'family', 'cook', 'create' ],
  [ 'family', 'cook', 'read', 'family' ],
  [ 'mother', 'cook', 'review', 'family' ],
  [ 'authenticated', 'cook', 'write', 0 ],
  [ 'authenticated', 'cook', 'delete', 0 ],
  [ 'consultant', 'cook', 'read', 'family' ],
];

module.exports = {
  roles,
  roleIncs,
  users,
  roleRights,
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = app => {

  class Cook extends app.Service {

    async create({ atomClass, key, item, user }) {
      // add cook
      const res = await this.ctx.model.cook.insert({
        atomId: key.atomId,
      });
      return { atomId: key.atomId, itemId: res.insertId };
    }

    async read({ atomClass, key, item, user }) {
      // read
    }

    async select({ atomClass, options, items, user }) {
      // select
    }

    async write({ atomClass, key, item, validation, user }) {
      // update cook
      const res = await this.ctx.model.cook.update({
        id: key.itemId,
        cookCount: item.cookCount,
        cookTypeId: item.cookTypeId,
      });
      if (res.affectedRows !== 1) this.ctx.throw.module('a-base', 1003);
    }

    async delete({ atomClass, key, user }) {
      // delete cook
      const res = await this.ctx.model.cook.delete({
        id: key.itemId,
      });
      if (res.affectedRows !== 1) this.ctx.throw.module('a-base', 1003);
    }

    async action({ action, atomClass, key, user }) {
      if (action === 101) {
        // change flag
        await this.ctx.meta.atom.flag({
          key,
          atom: { atomFlag: 2 },
          user,
        });
        return 'reviewed';
      }
    }

    async enable({ atomClass, key, atom, user }) {
      // enable
      const atomFlag = atom.atomEnabled ? 1 : 0;
      // change flag
      await this.ctx.meta.atom.flag({
        key,
        atom: { atomFlag },
        user,
      });
    }

    async types({ empty }) {
      const items = await this.ctx.model.cookType.select();
      for (const item of items) {
        item.name = this.ctx.text(item.name);
      }
      if (empty) {
        items.unshift({ id: 0, name: '' });
      }
      return items;
    }

  }

  return Cook;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = app => {

  class CookPublic extends app.Service {

    async create({ atomClass, key, item, user }) {
      const res = await this.ctx.model.cookPublic.insert({
        atomId: key.atomId,
      });
      return { atomId: key.atomId, itemId: res.insertId };
    }

    async write({ atomClass, key, item, validation, user }) {
    }

    async delete({ atomClass, key, user }) {
      const res = await this.ctx.model.cookPublic.delete({
        id: key.itemId,
      });
      if (res.affectedRows !== 1) this.ctx.throw.module('a-base', 1003);
    }

  }

  return CookPublic;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const cook = __webpack_require__(19);
const cookType = __webpack_require__(20);
const cookPublic = __webpack_require__(21);

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


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = app => {

  class Cook extends app.meta.Model {

    constructor(ctx) {
      super(ctx, { table: 'testCook', options: { disableDeleted: false } });
    }

  }

  return Cook;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = app => {

  class CookType extends app.meta.Model {

    constructor(ctx) {
      super(ctx, { table: 'testCookType', options: { disableDeleted: true } });
    }

  }

  return CookType;
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = app => {

  class CookPublic extends app.meta.Model {

    constructor(ctx) {
      super(ctx, { table: 'testCookPublic', options: { disableDeleted: false } });
    }

  }

  return CookPublic;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const require3 = __webpack_require__(0);
const extend = require3('extend2');

module.exports = app => {
  const meta = {
  };
  if (app.meta.isTest || app.meta.isLocal) {
    // schemas
    const schemas = __webpack_require__(23)(app);
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
      event: {
        implementations: {
          'a-base:userVerify': 'test/eventUserVerify',
        },
      },
    });
  }
  return meta;
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = app => {
  const schemas = {};
  // cook
  schemas.cook = {
    type: 'object',
    properties: {
      atomName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Cook Name',
        notEmpty: true,
      },
      cookCount: {
        type: 'number',
        ebType: 'text',
        ebTitle: 'Cook Count',
        notEmpty: true,
      },
      cookTypeId: {
        type: 'number',
        ebType: 'select',
        ebTitle: 'Cook Type',
        ebOptionsUrl: '/test/cook/cook/types',
        ebOptionsUrlParams: { empty: true },
        ebOptionTitleKey: 'name',
        ebOptionValueKey: 'id',
        notEmpty: true,
      },
    },
  };
  // cook search
  schemas.cookSearch = {
    type: 'object',
    properties: {
      cookTypeId: {
        type: 'number',
        ebType: 'select',
        ebTitle: 'Cook Type',
        ebOptionsUrl: '/test/cook/cook/types',
        ebOptionsUrlParams: { empty: true },
        ebOptionTitleKey: 'name',
        ebOptionValueKey: 'id',
      },
    },
  };

  return schemas;
};


/***/ })
/******/ ]);
//# sourceMappingURL=backend.js.map