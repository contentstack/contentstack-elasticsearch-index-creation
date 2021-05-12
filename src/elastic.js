const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200';
const esclient = new Client({ node: elasticUrl });
const index = process.env.INDEX_NAME;
const type = process.env.INDEX_TYPE;

/**
 * @function createIndex
 * @returns {void}
 * @description Creates an index in ElasticSearch.
 */

async function createIndex() {
  try {
    await esclient.indices.create({ index });
    console.log(`Created index ${index}`);
  } catch (err) {
    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);
  }
}

/**
 * @function createIndexEntriesSchema
 * @returns {void}
 * @description Create the entries schema
 */

async function createIndexEntriesSchema() {
  try {
    const schema = {
      title: {
        type: 'text',
      },
      url: {
        type: 'text',
      },
      data: {
        type: 'object',
      },
      locale: {
        type: 'keyword',
      },
      uid: {
        type: 'keyword',
      },
      content_type_uid: {
        type: 'keyword',
      },
    };

    await esclient.indices.putMapping({
      index,
      type,
      include_type_name: true,
      body: {
        properties: schema,
      },
    });

    console.log('Quotes mapping created successfully');
  } catch (err) {
    console.error('An error occurred while setting the quotes mapping:');
    console.error(err);
  }
}

/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */

function checkConnection() {
  return new Promise(async (resolve) => {
    console.log('Checking connection to ElasticSearch...');
    let isConnected = false;

    while (!isConnected) {
      try {
        await esclient.cluster.health({});
        console.log('Successfully connected to ElasticSearch');
        isConnected = true;
      } catch (_) {}
    }

    resolve(true);
  });
}

module.exports = {
  esclient,
  createIndexEntriesSchema,
  checkConnection,
  createIndex,
  index,
  type,
};
