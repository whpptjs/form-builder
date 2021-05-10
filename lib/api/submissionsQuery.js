module.exports = ({ $mongo: { $db, $dbPub } }, { identifier, fromDate, toDate, showDraftSubmissions }) => {
  const query = {};

  if (identifier) query['settings.identifier'] = { $regex: identifier, $options: 'i' };

  if (fromDate && fromDate !== 'undefined') {
    fromDate = new Date(fromDate);
    if (!query.$and) query.$and = [];
    query.$and.push({ createdAt: { $gte: fromDate } });
  }

  if (toDate && toDate !== 'undefined') {
    toDate = new Date(toDate);
    if (!query.$and) query.$and = [];
    query.$and.push({ createdAt: { $lte: toDate } });
  }

  if (showDraftSubmissions) {
    console.log('true, draft submissions only');
    return $db.collection('formSubmissions').find(query).sort({ createdAt: -1 }).toArray();
  }

  console.log('false, pub submissions');
  return $dbPub.collection('formSubmissions').find(query).sort({ createdAt: -1 }).toArray();
};
