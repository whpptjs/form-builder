module.exports = ({ $mongo: { $db, $dbPub } }, { identifier, fromDate, toDate, formPublished }) => {
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

  if (formPublished === 'true') {
    return $dbPub.collection('formSubmissions').find(query).sort({ createdAt: -1 }).toArray();
  }
  return $db.collection('formSubmissions').find(query).sort({ createdAt: -1 }).toArray();
};
