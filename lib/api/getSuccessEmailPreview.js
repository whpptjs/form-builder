const { template } = require('lodash');

module.exports = {
  exec(_, { text, values }) {
    let result = '';
    try {
      const preview = template(text);
      result = preview(values);
    } catch (err) {
      result =
        "Error, something went wrong; a confirmation email won't be sent. Try checking the form fields you're using.";
    }

    return result;
  },
};
