'use strict';

/**
 * core-text service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::core-text.core-text');
