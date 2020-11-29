export default {
  key: 'WFormsForm',
  name: 'Form',
  componentType: 'WFormsForm',
  init: ({ $set }, content = {}) => {
    if (!content.fields) {
      $set(content, 'fields', []);
    }
    if (!content.ccs) {
      $set(content, 'ccs', []);
    }
    if (!content.secondaryLink) {
      $set(content, 'secondaryLink', { type: 'page' });
    }
    return content;
  },
};
