'use strict';

/**
 * Strapi Server Entry Point
 * 
 * HOW TO ACCESS THE SERVER:
 * 
 * 1. Admin Panel (Content Management):
 *    - URL: http://localhost:1337/admin
 * 
 * 2. REST API Endpoints:
 *    - Base URL: http://localhost:1337/api
 * 
 * 3. GraphQL API:
 *    - URL: http://localhost:1337/graphql
 */

module.exports = {

  register() {},

  async bootstrap({ strapi }) {

    /**
     * ==========================================================
     * Enable Public Permissions Automatically
     * ==========================================================
     */

    try {

      await new Promise(resolve => setTimeout(resolve, 1000));

      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (!publicRole) {
        console.log('⚠️ Public role not found.');
        return;
      }

      const permissions = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({
          where: { role: publicRole.id },
        });

      if (!permissions || permissions.length === 0) {
        console.log('⚠️ No permissions found.');
        return;
      }

      const contentTypes = ['category', 'book', 'author', 'chapter', 'shloka'];
      let enabledCount = 0;

      for (const contentType of contentTypes) {

        const actions = ['find', 'findOne'];

        for (const action of actions) {

          const actionName = `api::${contentType}.${contentType}.${action}`;

          const permission = permissions.find(
            (p) => p.action === actionName
          );

          if (permission && !permission.enabled) {

            await strapi
              .query('plugin::users-permissions.permission')
              .update({
                where: { id: permission.id },
                data: { enabled: true },
              });

            console.log(`✅ Enabled public access for ${contentType}.${action}`);
            enabledCount++;
          }
        }
      }

      if (enabledCount > 0) {
        console.log(`✅ Enabled ${enabledCount} public permissions`);
      }

    } catch (error) {

      console.error('❌ Error setting public permissions:', error.message);

    }


    /**
     * ==========================================================
     * Seed Dropdown Content
     * ==========================================================
     */

    console.log("🚀 Checking for dropdown content...");

    const defaultBooks = [
      'Isha Upanishad Bhashya',
      'Kena Upanishad Pada Bhashya',
      'Kena Upanishad Vakya Bhashya',
      'Katha Upanishad Bhashya',
      'Prashna Upanishad Bhashya',
      'Mundaka Upanishad Bhashya',
      'Mandukya Upanishad Bhashya',
      'Taittiriya Upanishad Bhashya',
      'Aitareya Upanishad Bhashya',
      'Chandogya Upanishad Bhashya',
      'Brihadaranyaka Upanishad Bhashya',
      'Bhagavad Gita Bhashya',
      'Brahma Sutra Bhashya'
    ];

    const defaultAuthors = [
      'Abhirama Vidyamani',
      'Anandagiri (Anandajnana)',
      'Anantacharya',
      'Anubhutisvarupacharya',
      'Balakrishnananda Saraswati',
      'Brahmananda Saraswati',
      'Gaudapada',
      'Gopalayatindra',
      'Narayana Ashrama',
      'Nityananda Ashrama',
      'Ramachandrendra Saraswati',
      'Sayana / Vidyaranya',
      'Shankaracharya (Adi Shankara)',
      'Shankarananda',
      'Sureshwaracharya',
      'Upanishad Brahmayogin',
      'Vanamali Mishra'
    ];

    const defaultCategories = [
      'Upanishads',
      'Brahma Sutra',
      'Bhagavad Gita',
      'Prakarana Granthas',
      'Shankaracharya',
      'Prasthana Thraya'
    ];

    try {

      /**
       * Populate Authors
       */

      for (const name of defaultAuthors) {

        const existing = await strapi.documents('api::author.author').findFirst({
          filters: { name: { $eq: name } }
        });

        if (!existing) {

          console.log(`+ Adding Author: ${name}`);

          await strapi.documents('api::author.author').create({
              data: {
                name: name
              },
              status: 'published'
            });
        }
      }


      /**
       * Populate Books
       */

      for (const title of defaultBooks) {

        const existing = await strapi.documents('api::book.book').findFirst({
          filters: { Title: { $eq: title } }
        });

        if (!existing) {

          console.log(`+ Adding Book: ${title}`);

          await strapi.documents('api::book.book').create({
              data: {
                Title: title
              },
              status: 'published'
            });

        }
      }


      /**
       * Populate Categories
       */

      for (const name of defaultCategories) {

        const existing = await strapi.documents('api::category.category').findFirst({
          filters: { Name: { $eq: name } }
        });

        if (!existing) {

          console.log(`+ Adding Category: ${name}`);

          await strapi.documents('api::category.category').create({
            data: {
              Name: name
            },
            status: 'published'
          });

        }
      }

      console.log("✅ Dropdown content synchronized.");

    } catch (error) {

      console.error('❌ Error populating dropdown content:', error.message);
      console.error('Stack:', error.stack);

    }

  },
};