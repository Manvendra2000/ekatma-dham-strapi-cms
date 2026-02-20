'use strict';

/**
 * book-title service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-title.book-title');
