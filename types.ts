// Type definitions for Cosmic Allah's Names objects

export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface AllahName extends CosmicObject {
  type: 'allahs-names';
  metadata: {
    arabic_name: string;
    transliteration: string;
    english_meaning: string;
    short_description?: string;
    detailed_explanation?: string;
    spiritual_significance?: string;
    name_image?: {
      url: string;
      imgix_url: string;
    };
    quran_reference?: string;
    category?: {
      key: string;
      value: string;
    };
  };
}

// Type literals for name categories
export type NameCategory = 'mercy' | 'power' | 'knowledge' | 'majesty' | 'beauty';

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Type guard for Allah's Name objects
export function isAllahName(obj: CosmicObject): obj is AllahName {
  return obj.type === 'allahs-names';
}

// Helper type for name positioning in galaxy view
export interface NamePosition {
  id: string;
  x: number;
  y: number;
  size: number;
  name: AllahName;
}