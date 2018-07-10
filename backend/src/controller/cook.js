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

