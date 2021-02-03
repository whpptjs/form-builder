module.exports = {
  exec(context, params) {
    return getForm(context, params);
  },
};

const getForm = ({ $mongo: { $db } }, { identifier }) => {
  if (identifier && identifier.length) {
    return $db
      .collection('formSubmissions')
      .find({ 'settings.identifier': identifier })
      .toArray()
      .then(formSubmissionArray => {
        return formSubmissionArray;
      });
  }
  return $db
    .collection('formSubmissions')
    .find()
    .toArray()
    .then(formSubmissionArray => {
      return formSubmissionArray;
    });
};
