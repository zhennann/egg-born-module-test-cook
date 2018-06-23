module.exports = app => {

  class CookType extends app.meta.Model {

    constructor(ctx) {
      super(ctx, { table: 'testCookType', options: { disableDeleted: true } });
    }

  }

  return CookType;
};
