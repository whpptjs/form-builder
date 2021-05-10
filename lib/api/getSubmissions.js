const { take, drop } = require('lodash');

const submissionsQuery = require('./submissionsQuery');

module.exports = {
  exec(context, params) {
    return getSubmissions(context, params);
  },
};

const getSubmissions = (context, { identifier, fromDate, toDate, showDraftSubmissions, limit, page }) => {
  return submissionsQuery(context, { identifier, fromDate, toDate, showDraftSubmissions }).then(submissions => {
    return {
      formSubmissions: take(drop(submissions, limit * (page - 1)), limit),
      total: submissions.length,
      allSubmissions: submissions,
    };
  });
};
