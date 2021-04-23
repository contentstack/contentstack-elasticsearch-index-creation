const express = require('express');
const controller = require('../controllers');
const routes = express.Router();

routes.route('/publish').post(controller.publishEntry);
routes.route('/unpublish').post(controller.unpublishEntry);
routes.route('/delete').post(controller.deleteEntry);
routes.route('/auto').post(controller.autoUpsertOrDeleteEntry);

module.exports = routes;
