'use strict';

/**
 * Strapi Server Entry Point
 * 
 * HOW TO ACCESS THE SERVER:
 * 
 * 1. Admin Panel (Content Management):
 *    - URL: http://localhost:1337/admin
 *    - Use this to create/edit content, manage users, configure settings
 * 
 * 2. REST API Endpoints:
 *    - Base URL: http://localhost:1337/api
 *    - Available endpoints:
 *      * GET http://localhost:1337/api/shlokas - Get all shlokas
 *      * GET http://localhost:1337/api/books - Get all books
 *      * GET http://localhost:1337/api/authors - Get all authors
 *      * GET http://localhost:1337/api/chapters - Get all chapters
 *      * GET http://localhost:1337/api/categories - Get all categories
 *    - Note: Accessing /api directly returns 404. Use specific endpoints above.
 *    - IMPORTANT: If you get 403 Forbidden, you need to enable public permissions:
 *      Go to Settings > Users & Permissions Plugin > Roles > Public
 *      Then enable "find" and "findOne" for each content type (Category, Book, etc.)
 *      OR restart the server - the bootstrap function below will auto-enable them.
 * 
 * 3. GraphQL API:
 *    - URL: http://localhost:1337/graphql
 *    - Use GraphQL Playground to query your content types
 * 
 * 4. To start the server:
 *    - Run: npm run dev (development mode)
 *    - Run: npm start (production mode)
 */

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Enable public access to all content types for development
    // This allows accessing /api/categories, /api/books, etc. without authentication
    try {
      // Wait a bit for database to be ready
      await new Promise(resolve => setTimeout(resolve, 1000));

      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (!publicRole) {
        console.log('⚠️  Public role not found. Permissions will need to be set manually.');
        return;
      }

      // Get all permissions for public role
      const permissions = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({
          where: { role: publicRole.id },
        });

      if (!permissions || permissions.length === 0) {
        console.log('⚠️  No permissions found. Permissions will need to be set manually.');
        return;
      }

      // Content types to enable public access
      const contentTypes = ['category', 'book', 'author', 'chapter', 'shloka'];
      let enabledCount = 0;

      for (const contentType of contentTypes) {
        const actions = ['find', 'findOne'];
        
        for (const action of actions) {
          const actionName = `api::${contentType}.${contentType}.${action}`;
          const permission = permissions.find(
            (p) => p.action === actionName
          );

          if (permission) {
            if (!permission.enabled) {
              await strapi
                .query('plugin::users-permissions.permission')
                .update({
                  where: { id: permission.id },
                  data: { enabled: true },
                });
              console.log(`✅ Enabled public access for ${contentType}.${action}`);
              enabledCount++;
            }
          } else {
            console.log(`⚠️  Permission not found: ${actionName}`);
          }
        }
      }

      if (enabledCount > 0) {
        console.log(`✅ Successfully enabled ${enabledCount} public permissions`);
      } else {
        console.log('ℹ️  All permissions were already enabled or not found.');
      }
    } catch (error) {
      console.error('❌ Error setting up public permissions:', error.message);
      console.error('Stack:', error.stack);
      console.log('\n📝 To enable permissions manually:');
      console.log('   1. Go to http://localhost:1337/admin');
      console.log('   2. Settings > Users & Permissions Plugin > Roles > Public');
      console.log('   3. Enable "find" and "findOne" for each content type');
    }

    // Populate dropdown content if missing
    console.log("🚀 Checking for dropdown content...");

    const defaultBooks = [
      'Isha Upanishad Bhashya', 'Kena Upanishad Pada Bhashya', 'Kena Upanishad Vakya Bhashya',
      'Katha Upanishad Bhashya', 'Prashna Upanishad Bhashya', 'Mundaka Upanishad Bhashya',
      'Mandukya Upanishad Bhashya', 'Taittiriya Upanishad Bhashya', 'Aitareya Upanishad Bhashya',
      'Chandogya Upanishad Bhashya', 'Brihadaranyaka Upanishad Bhashya', 'Bhagavad Gita Bhashya', 'Brahma Sutra Bhashya'
    ];

    const defaultAuthors = [
      
      'Abhirama Vidyamani’, ‘Anandagiri (Anandajnana)’, ‘Anantacharya’, ‘Anubhutisvarupacharya’, ‘Balakrishnananda Saraswati’, ‘Brahmananda Saraswati’, ‘Gaudapada’, ‘Gopalayatindra’, ‘Narayana Ashrama’, ‘Nityananda Ashrama’, ‘Ramachandrendra Saraswati’, ‘Sayana / Vidyaranya’, ‘Shankaracharya (Adi Shankara)’, ‘Shankarananda’, ‘Sureshwaracharya’, ‘Upanishad Brahmayogin’, ‘Vanamali Mishra'

    ];

    try {
      // 1. Populate Authors (Used for Bhashya Lineage and Tika Allocations)
      for (const name of defaultAuthors) {
        const existing = await strapi.documents('api::author.author').findFirst({
          filters: { name: { $eq: name } }
        });

        if (!existing) {
          console.log(`+ Adding Author: ${name}`);
          await strapi.documents('api::author.author').create({
            data: { name, status: 'published' }
          });
        }
      }

      // 2. Populate Books (Volume Titles)
      for (const title of defaultBooks) {
        const existing = await strapi.documents('api::book.book').findFirst({
          filters: { Title: { $eq: title } }
        });

        if (!existing) {
          console.log(`+ Adding Book: ${title}`);
          await strapi.documents('api::book.book').create({
            data: { Title: title, status: 'published' }
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
