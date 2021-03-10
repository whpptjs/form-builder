export const { take, drop } = require('lodash');

module.exports = ({ $mongo: { $db } }, { identifier, fromDate, toDate }) => {
  const query = {};
  if (identifier) query['settings.identifier'] = { $regex: identifier, $options: 'i' };

  if (fromDate && fromDate !== 'undefined') {
    if (!query.$and) query.$and = [];
    query.$and.push({ createdAt: { $gte: new Date(fromDate) } });
  }
  if (toDate && toDate !== 'undefined') {
    if (!query.$and) query.$and = [];
    query.$and.push({ createdAt: { $lte: new Date(toDate) } });
  }

  return $db.collection('formSubmissions').find(query).sort({ createdAt: -1 }).toArray();
};
