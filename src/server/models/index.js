const { esclient, index } = require('../../elastic');

async function upsertEntry(data) {
  const doc = {
    title: data.entry.title || 'Undefined',
    uid: data.entry.uid,
    id: `${data.entry.uid}_${data.locale}`,
    locale: data.locale,
    data: data.entry,
    url: data.entry.url || 'Undefined',
    content_type_uid: data.content_type.uid,
  };
  return esclient.update({
    index,
    id: doc.id,
    body: {
      scripted_upsert: true,
      doc,
      upsert: doc,
    },
  });
}

async function deleteEntry(data) {
  return esclient.delete({
    index,
    id: `${data.entry.uid}_${data.entry.locale}`,
  });
}

async function deleteEntryByQuery(data) {
  return esclient.deleteByQuery({
    index,
    body: {
      query: {
        match: {
          uid: data.entry.uid,
        },
      },
    },
  });
}

module.exports = {
  upsertEntry,
  deleteEntry,
  deleteEntryByQuery,
};
