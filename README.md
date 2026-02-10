# Ekatmdham Library CMS

A Strapi-based CMS for managing spiritual texts, commentaries, and multilingual content.

## Overview

This CMS manages a structured library of spiritual texts with support for:
- Multilingual content (Sanskrit, English, Hindi)
- Author commentaries and interpretations
- Hierarchical text organization
- Internationalization (i18n)

## Tech Stack

- **Backend**: Strapi 5.35.0
- **Database**: SQLite (better-sqlite3)
- **Node.js**: >=20.0.0
- **Plugins**: GraphQL, Users & Permissions, Cloud, Localazy

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access admin panel**
   Visit `http://localhost:1337/admin`

## Project Structure

```
ekatmdham-lib-cms/
├── config/                 # Strapi configuration
├── database/              # Database files and migrations
├── public/                # Static assets
├── src/
│   ├── admin/             # Admin panel extensions
│   ├── api/               # Content types and API routes
│   │   ├── author/        # Author content type
│   │   ├── commentary/    # Commentary content type
│   │   └── core-text/     # Text/Unit content type
│   ├── extensions/        # Strapi extensions
│   └── index.js          # App entry point
├── types/                 # TypeScript definitions
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Content Model

### Books (Core Texts)
- Spiritual texts like Bhagavad Gita, Upanishads
- Created once, referenced by units

### Units
- Text sections (chapters, verses, mantras)
- Support multiple languages via Strapi i18n
- Examples: Gita Chapter 2 Verse 47, Mandukya Mantra 7

### Authors
- Independent commentator entities
- Reusable across multiple texts
- Examples: Shankaracharya, Ramanujacharya

### Commentaries
- Author interpretations linked to specific units
- Support commentary types (Bhashya, Teeka, etc.)
- Multilingual content support
- Hierarchical relationships via parent_commentary

## Development Scripts

```bash
npm run dev          # Start development server
npm run develop      # Alias for dev
npm run start        # Start production server
npm run build        # Build for production
npm run deploy       # Deploy to Strapi Cloud
npm run console      # Open Strapi console
npm run upgrade      # Upgrade Strapi version
npm run upgrade:dry  # Dry run upgrade check
```

## Environment Configuration

Key environment variables (see `.env.example`):
- `HOST` - Server host (default: 0.0.0.0)
- `PORT` - Server port (default: 1337)
- `APP_KEYS` - Application keys
- `JWT_SECRET` - JWT authentication secret
- `ADMIN_JWT_SECRET` - Admin panel JWT secret

## Contributing

1. Follow existing content type patterns in `src/api/`
2. Test multilingual functionality when adding new content
3. Maintain i18n structure for new content types
4. Use Strapi conventions for API routes and controllers

## Features

- **Multilingual Support**: Built-in i18n for content
- **GraphQL API**: Query content efficiently
- **User Management**: Role-based permissions
- **Cloud Ready**: Deploy to Strapi Cloud
- **Extensible**: Plugin architecture for custom features