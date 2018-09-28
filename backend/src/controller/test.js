const require3 = require('require3');
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
