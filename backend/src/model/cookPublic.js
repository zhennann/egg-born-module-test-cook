module.exports = app => {

  class CookPublic extends app.meta.Model {

    constructor(ctx) {
      super(ctx, { table: 'testCookPublic', options: { disableDeleted: false } });
    }

  }

  return CookPublic;
};
