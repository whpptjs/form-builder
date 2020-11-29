const logger = require('../logger');

module.exports = {
  exec(context, { settings, form }) {
    return validateForm({ settings, form })
      .then(() => saveForm(context, { form }))
      .then(() => sendEmail(context, { settings, form }));
  },
};

const validateForm = ({ settings, form }) => {
  return Promise.resolve().then(() => {
    const errors = [];
    settings.fields.forEach(field => {
      const fieldValue = form[field.name];
      // TODO: Check the checkbox valud differently
      //   if (field.type === 'checkbox' && field.required) return errors.push(`${field.label} is required.`);
      if (field.required && !fieldValue) return errors.push(`${field.label} is required.`);
    });
    if (errors.length) {
      const err = new Error('Invalid Form Error');
      err.validationErrors = errors;
      throw err;
    }
  });
};

const saveForm = ({ $mongo: { $save } }, form) => {
  return $save('formSubmissions', form).catch(err => {
    logger.error('Could not save form: form: %o error: %s', form, err.stack);
    throw err;
  });
};

const sendEmail = ({ $email }, { settings, form }) => {
  return $email
    .send({
      to: settings.recipient,
      cc: settings.ccs.map(cc => cc),
      subject: settings.subject,
      html: JSON.stringify(form),
    })
    .catch(err => {
      logger.error('Could not save form: form: %o settings: %o error: %s', form, settings, err.stack);
      throw err;
    });
};
