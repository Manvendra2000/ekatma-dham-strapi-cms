# 📚 Ekatma Dham Strapi CMS - Project Overview

## 🎯 Project Purpose

A **nested digital filing system for spiritual texts** that dynamically organizes Vedic literature (like the Gita and Upanishads) with a three-layer commentary system.

---

## 🏗️ Content Architecture

### **Content Types (5 Main Types)**

1. **📖 Category** (`/api/categories`)
   - Groups books together (e.g., "Upanishad", "Prasthanatrayi")
   - Has a `parent` relation to Author
   - Contains multiple Books

2. **📚 Book** (`/api/books`)
   - Belongs to a Category
   - Contains multiple Chapters
   - Example: "Bhagavad Gita", "Mundaka Upanishad"

3. **📑 Chapter** (`/api/chapters`)
   - Belongs to a Book
   - Has a Chapter_Number and Title
   - Contains multiple Shlokas

4. **🕉️ Shloka** (`/api/shlokas`)
   - **Most complex content type!**
   - Belongs to a Chapter
   - Fields:
     - `Verse_Number` (integer)
     - `Text` (blocks - Sanskrit text)
     - `Translation` (blocks - English/Hindi translation)
     - `Transliteration` (string - Romanized Sanskrit)
     - `Commentry` (repeatable component - Bhashya)
     - `extra_variables` (dynamic zone for custom fields)
   - **Internationalization enabled** - supports Sanskrit, Hindi, English

5. **✍️ Author** (`/api/authors`)
   - Has name, slug, and bio
   - Can be linked to Categories and Commentaries

---

## 🔗 Relationship Structure

```
Category
  └── Book
      └── Chapter
          └── Shloka
              └── Bhashya (Commentary)
                  └── Tika (Sub-commentary)
```

---

## 🧩 Components (Reusable Structures)

### 1. **Bhashya** (Commentary Component)
- Contains:
  - `Text` (blocks)
  - `translation` (blocks)
  - `transliteration` (text)
  - `author` (relation to Author)
  - `tika` (repeatable - nested Tika components)

### 2. **Tika** (Sub-commentary Component)
- Contains:
  - `text` (blocks)
  - `translation` (blocks)
  - `transliteration` (text)
  - `author` (relation to Author)

### 3. **Dynamic Variables** (Extra Variables)
- `numeric-variable` - for numeric metadata
- `text-variable` - for text metadata
- Allows adding custom fields like "Speaker", "Metre", etc. on-the-fly

---

## 🌍 Features

### ✅ **Internationalization (i18n)**
- Enabled for Shloka content type
- Supports multiple languages: Sanskrit, Hindi, English
- Field-level localization

### ✅ **GraphQL API**
- Available at `/graphql`
- Query all content types with relationships

### ✅ **REST API**
- Standard Strapi REST endpoints
- All content types accessible via `/api/{content-type}`

### ✅ **Rich Text Support**
- Uses Strapi Blocks format
- Supports formatted text, paragraphs, etc.

---

## 📡 API Endpoints

Once permissions are enabled, you can access:

- `GET /api/categories` - List all categories
- `GET /api/books` - List all books
- `GET /api/chapters` - List all chapters
- `GET /api/shlokas` - List all shlokas
- `GET /api/authors` - List all authors

Each endpoint supports:
- `?populate=*` - Include all relations
- `?filters[field][$eq]=value` - Filter results
- `?pagination[page]=1&pagination[pageSize]=10` - Pagination

---

## 🎨 Example Data Structure

### Shloka with Commentary:
```json
{
  "Verse_Number": 1,
  "Transliteration": "dharma-kṣetre kuru-kṣetre",
  "Text": [{ "type": "paragraph", "children": [{ "type": "text", "text": "धर्मक्षेत्रे कुरुक्षेत्रे" }] }],
  "Translation": [{ "type": "paragraph", "children": [{ "type": "text", "text": "In the field of dharma, in Kurukshetra" }] }],
  "Commentry": [
    {
      "Text": [{ "type": "paragraph", "children": [{ "type": "text", "text": "Bhashya explanation..." }] }],
      "author": { "id": 1 },
      "tika": [
        {
          "text": [{ "type": "paragraph", "children": [{ "type": "text", "text": "Tika sub-commentary..." }] }],
          "author": { "id": 2 }
        }
      ]
    }
  ]
}
```

---

## 🚀 How to Explore

1. **Admin Panel**: http://localhost:1337/admin
   - Create content
   - Manage relationships
   - Configure permissions

2. **GraphQL Playground**: http://localhost:1337/graphql
   - Query with relationships
   - Explore the schema

3. **REST API**: http://localhost:1337/api/{content-type}
   - Use browser or Postman
   - Add `?populate=*` to see relationships

---

## 📝 Notes

- **Permissions**: Currently need to be enabled manually in Admin Panel > Settings > Users & Permissions > Roles > Public
- **Database**: SQLite (`.tmp/data.db`) - perfect for development
- **Draft & Publish**: All content types support draft/publish workflow

---

## 🔍 What Makes This Special?

1. **Three-layer nesting**: Shloka → Bhashya → Tika (unique commentary structure)
2. **Dynamic zones**: Can add custom metadata fields on-the-fly
3. **Multi-language support**: Sanskrit, Hindi, English in one entry
4. **Flexible hierarchy**: Categories can group books, books have chapters, chapters have shlokas
5. **Rich text**: Blocks format for formatted text storage
