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

    async write({ atomClass, key, item, user }) {
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
