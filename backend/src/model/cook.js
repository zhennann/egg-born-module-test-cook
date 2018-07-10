module.exports = app => {

  class Cook extends app.meta.Model {

    constructor(ctx) {
      super(ctx, { table: 'testCook', options: { disableDeleted: false } });
    }

  }

  return Cook;
};
