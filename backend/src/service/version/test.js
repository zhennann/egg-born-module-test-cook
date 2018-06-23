
const testData = require('./testData.js');

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
