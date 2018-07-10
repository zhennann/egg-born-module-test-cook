module.exports = app => {
  const schemas = {};
  // cook
  schemas.cook = {
    type: 'object',
    properties: {
      atomName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Cook Name',
        notEmpty: true,
      },
      cookCount: {
        type: 'number',
        ebType: 'text',
        ebTitle: 'Cook Count',
        notEmpty: true,
      },
      cookTypeId: {
        type: 'number',
        ebType: 'select',
        ebTitle: 'Cook Type',
        ebOptionsUrl: '/test/cook/cook/types',
        ebOptionsUrlParams: { empty: true },
        ebOptionTitleKey: 'name',
        ebOptionValueKey: 'id',
        notEmpty: true,
      },
    },
  };
  // cook search
  schemas.cookSearch = {
    type: 'object',
    properties: {
      cookTypeId: {
        type: 'number',
        ebType: 'select',
        ebTitle: 'Cook Type',
        ebOptionsUrl: '/test/cook/cook/types',
        ebOptionsUrlParams: { empty: true },
        ebOptionTitleKey: 'name',
        ebOptionValueKey: 'id',
      },
    },
  };

  return schemas;
};
