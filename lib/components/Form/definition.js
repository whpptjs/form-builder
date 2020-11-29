export default {
  key: 'WFormsForm',
  name: 'Form',
  componentType: 'WFormsForm',
  init: ({ $set }, content = {}) => {
    if (!content.recipient) $set(content, 'recipient', '');
    if (!content.subject) $set(content, 'subject', '');
    if (!content.primaryButtonText) $set(content, 'primaryButtonText', '');
    if (!content.secondaryLink) $set(content, 'secondaryLink', { type: 'page', href: '', text: '' });
    if (!content.ccs) $set(content, 'ccs', []);
    if (!content.fields) $set(content, 'fields', []);
    return content;
  },
};
