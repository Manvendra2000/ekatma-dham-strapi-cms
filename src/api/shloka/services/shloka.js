'use strict';

/**
 * shloka service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::shloka.shloka');
