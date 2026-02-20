'use strict';

/**
 * verse-translation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::verse-translation.verse-translation');
