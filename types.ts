// Type definitions for Cosmic Star objects

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

export interface Star extends CosmicObject {
  type: 'stars';
  metadata: {
    star_name: string;
    short_description?: string;
    detailed_information?: string;
    discovery_date?: string;
    star_image?: {
      url: string;
      imgix_url: string;
    };
    distance?: string;
    star_type?: {
      key: string;
      value: string;
    };
  };
}

// Type literals for star types
export type StarType = 'red_dwarf' | 'main_sequence' | 'red_giant' | 'supergiant' | 'white_dwarf';

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Type guard for Star objects
export function isStar(obj: CosmicObject): obj is Star {
  return obj.type === 'stars';
}

// Helper type for star positioning in galaxy view
export interface StarPosition {
  id: string;
  x: number;
  y: number;
  size: number;
  star: Star;
}