const { Parser } = require('json2csv');
const dayjs = require('dayjs');
const { map } = require('lodash');

const submissionsQuery = require('./submissionsQuery');

module.exports = {
  exec(context, params) {
    return generateCSV(context, params);
  },
};

const generateCSV = (context, { identifier, fromDate, toDate }) => {
  return submissionsQuery(context, { identifier, fromDate, toDate }).then(submissions => {
    const fields = ['Form Identifier', 'Recipient', 'Submitted At'];

    submissions = map(submissions, submission => {
      return {
        'Form Identifier': submission.settings.identifier || '',
        Recipient: submission.settings.recipient || '',
        'Submitted At': dayjs(submission.createdAt).format('h:mm a, DD/MM/YYYY') || '',
      };
    });

    const parser = new Parser({ fields });
    const csv = parser.parse(submissions);

    return csv;
  });
};
