const { omit, find } = require('lodash');
const axios = require('axios');
const logger = require('../logger');

module.exports = {
  exec(context, { settings, form }) {
    return validateForm({ settings, form }).then(() =>
      validateRecaptcha(context, { settings, form })
        .then(() => saveForm(context, { form, settings }))
        .then(() => sendEmail(context, { settings, form }))
    );
  },
};

const validateForm = ({ settings, form }) => {
  return Promise.resolve().then(() => {
    const errors = [];
    settings.fields.forEach(field => {
      const fieldValue = form[field.name];
      // TODO: Check the checkbox value differently
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

const saveForm = ({ $id, $mongo: { $save } }, { form, settings }) => {
  if (form.recaptcha) delete form.recaptcha;

  return $save('formSubmissions', { _id: $id(), form, settings: omit(settings, ['fields']) }).catch(err => {
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

const validateRecaptcha = (context, { settings, form }) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.RECAPTCHA_SECRET;

    if (!find(settings.fields, f => f.type === 'captcha')) return resolve();
    if (!secret) return reject(new Error('A Recaptcha Secret has not been provided'));

    return axios
      .post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        params: { secret, response: form.recaptcha },
      })
      .then(response => {
        if (!response.data.success) return reject(response.data['error-codes']);

        return resolve(response);
      });
  });
};
