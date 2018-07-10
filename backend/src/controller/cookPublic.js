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

