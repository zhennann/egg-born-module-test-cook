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
  [ 'system', 'cook', 'create' ],
  [ 'system', 'cook', 'read', 'family' ],
  [ 'system', 'cook', 'review', 'family' ],
  [ 'system', 'cook', 'review', 'authenticated' ],
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
