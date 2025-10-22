import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all Allah's names with proper error handling
export async function getAllNames() {
  try {
    const response = await cosmic.objects
      .find({ type: 'allahs-names' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch Allah\'s names');
  }
}

// Fetch a single name by slug
export async function getNameBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'allahs-names',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch name');
  }
}