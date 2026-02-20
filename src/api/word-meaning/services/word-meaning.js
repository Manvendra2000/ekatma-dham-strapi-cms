'use strict';

/**
 * word-meaning service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::word-meaning.word-meaning');
