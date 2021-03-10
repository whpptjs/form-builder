const { take, drop } = require('lodash');

const submissionsQuery = require('./submissionsQuery');

module.exports = {
  exec(context, params) {
    return getSubmissions(context, params);
  },
};

const getSubmissions = (context, { identifier, fromDate, toDate, limit, page }) => {
  return submissionsQuery(context, { identifier, fromDate, toDate }).then(submissions => {
    return { formSubmissions: take(drop(submissions, limit * (page - 1)), limit), total: submissions.length };
  });
};
