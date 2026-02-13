plugins 
- graphql
- internationalization


goals is to make nested digital filing system for spiritual texts that is dynamic according the user input


## Project Sangraha: Strapi Progress Summary

We have successfully modeled a complex, three-layer spiritual library system in Strapi. This setup is designed to handle the traditional hierarchy of Vedic texts like the Gita and Upanishads.

---

### 1. Data Architecture (The Skeleton)

* **Three-Layer Nesting:** Core Text  **Bhashya** (Commentary)  **Tika** (Sub-commentary).
* **Flexible Hierarchy:** Supports both simple **Chapters** and complex **Khandas** (partitions).
* **Categorization:** Built with **Categories** (e.g., Upanishad) and **Parent-Relations** (e.g., Prasthanatrayi) for clubbing books together.

### 2. The Final Content Types

* **Collection Types:** `Shloka`, `Chapter`, `Book`, `Author`, `Category`.
* **Components:** `Bhashya` and `Tika` (nested inside each other).
* **Dynamic Zones:** `extra_variables` (allows on-the-fly adding of fields like "Speaker" or "Metre").

### 3. API & Data Entry Format

* **Internationalization (i18n):** Enabled at the field level to support Sanskrit, Hindi, and English versions within a single entry.
* **Rich Text Handling:** The `Text` and `Translation` fields use the **Blocks** format, requiring a specific JSON structure for API uploads.

---

### 4. Verified API Payload Example

Use this format to POST data to `http://localhost:1337/api/shlokas`:

```json
{
  "data": {
    "Verse_Number": 1,
    "Transliteration": "dharma-kṣetre...",
    "Text": [{ "type": "paragraph", "children": [{ "type": "text", "text": "धर्मक्षेत्रे..." }] }],
    "Commentry": [
      {
        "Text": [{ "type": "paragraph", "children": [{ "type": "text", "text": "Bhashya text" }] }],
        "tika": [{ "text": [{ "type": "paragraph", "children": [{ "type": "text", "text": "Tika text" }] }] }]
      }
    ]
  }
}

```

**Next Step:** Would you like me to help you set up the **Author profiles** so you can start linking commentators like Adi Shankara to your data?