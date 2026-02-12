import type { Schema, Struct } from '@strapi/strapi';

export interface CommentaryBhashya extends Struct.ComponentSchema {
  collectionName: 'components_commentary_bhashyas';
  info: {
    displayName: 'Bhashya';
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::author.author'>;
    Text: Schema.Attribute.Blocks;
    tika: Schema.Attribute.Component<'commentary.tika', true>;
    translation: Schema.Attribute.Blocks;
    transliteration: Schema.Attribute.Text;
  };
}

export interface CommentaryTika extends Struct.ComponentSchema {
  collectionName: 'components_commentary_tikas';
  info: {
    displayName: 'Tika';
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::author.author'>;
    text: Schema.Attribute.Blocks;
    translation: Schema.Attribute.Blocks;
    transliteration: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'commentary.bhashya': CommentaryBhashya;
      'commentary.tika': CommentaryTika;
    }
  }
}
