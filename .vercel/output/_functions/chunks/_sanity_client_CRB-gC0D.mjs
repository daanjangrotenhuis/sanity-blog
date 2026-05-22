import { createClient } from '@sanity/client';

const sanityClient = createClient(
  { "apiVersion": "2024-01-01", "projectId": "7oxpyma4", "dataset": "production", "useCdn": true }
);

export { sanityClient as s };
