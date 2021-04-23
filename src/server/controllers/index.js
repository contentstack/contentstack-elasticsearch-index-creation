const model = require('../models');

/**
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

async function publishEntry(req, res) {
  const data = req.body.data;

  if (!data) {
    res.status(422).json({
      error: true,
      data: 'Missing required parameters.',
    });

    return;
  }

  try {
    const result = await model.upsertEntry(data);
    res.json({
      success: true,
      data: {
        id: result.body._id,
        data,
      },
    });
  } catch (err) {
    console.error(err.meta.body);
    res.status(500).json({ success: false, error: 'Unknown error.' });
  }
}

/**
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

async function unpublishEntry(req, res) {
  const data = req.body.data;

  if (!data) {
    res.status(422).json({
      error: true,
      data: 'Missing required parameters.',
    });

    return;
  }

  try {
    const result = await model.deleteEntry(data);

    res.json({
      success: true,
      data: {
        id: result.body._id,
        data,
      },
    });
  } catch (err) {
    console.error(err.meta.body);
    res.status(500).json({ success: false, error: 'Unknown error.' });
  }
}

/**
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

async function deleteEntry(req, res) {
  const data = req.body.data;

  if (!data) {
    res.status(422).json({
      error: true,
      data: 'Missing required parameters.',
    });

    return;
  }
  try {
    const result = await model.deleteEntry(data);

    res.json({
      success: true,
      data: {
        id: result.body._id,
        data,
      },
    });
  } catch (err) {
    console.error(err.meta.body);
    res.status(500).json({ success: false, error: 'Unknown error.' });
  }
}

async function autoUpsertOrDeleteEntry(req, res) {
  const body = req.body;

  if (!body || !body.event) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter(s): 'event'",
    });

    return;
  }

  if (body.event === 'publish') {
    return await publishEntry(req, res);
  } else if (body.event === 'unpublish') {
    return await unpublishEntry(req, res);
  } else if (body.event === 'delete') {
    return await deleteEntry(req, res);
  } else {
    res.status(422).json({
      error: true,
      data: `${body.event} logic not found`,
    });
  }
}

module.exports = {
  publishEntry,
  unpublishEntry,
  deleteEntry,
  autoUpsertOrDeleteEntry,
};
