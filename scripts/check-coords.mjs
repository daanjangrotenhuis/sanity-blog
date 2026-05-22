import { createClient } from '@sanity/client';

const client = createClient({
    projectId: '7oxpyma4',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
});

const parks = await client.fetch(`*[_type == "park"] | order(name asc) { name, "lat": location.lat, "lng": location.lng, "country": location.country }`);

console.log(`Total parks: ${parks.length}\n`);

const withCoords = parks.filter(p => p.lat && p.lng);
const withoutCoords = parks.filter(p => !p.lat || !p.lng);

console.log(`With coordinates: ${withCoords.length}`);
console.log(`Without coordinates: ${withoutCoords.length}\n`);

console.log('--- First 20 with coordinates ---');
withCoords.slice(0, 20).forEach(p => console.log(`  ${p.name}: lat=${p.lat}, lng=${p.lng}`));

console.log('\n--- First 10 without coordinates ---');
withoutCoords.slice(0, 10).forEach(p => console.log(`  ${p.name}`));
