module.exports = app => {

  class CookPublic extends app.Service {

    async create({ atomClass, key, item, user }) {
      const res = await this.ctx.model.cookPublic.insert({
        atomId: key.atomId,
      });
      return { atomId: key.atomId, itemId: res.insertId };
    }

    async write({ atomClass, key, item, user }) {
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
