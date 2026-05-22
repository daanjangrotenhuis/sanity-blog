/**
 * Geocode all parks in Sanity that are missing coordinates,
 * using OpenStreetMap Nominatim (free, no API key needed).
 *
 * Run: SANITY_TOKEN=your_token node scripts/geocode-parks.mjs
 *
 * It looks up each park name + country, saves the coordinates back to Sanity.
 * Respects Nominatim's rate limit of 1 request per second.
 */

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: '7oxpyma4',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Dutch lat/lng bounds — used to validate results
const NL_BOUNDS = { latMin: 50.5, latMax: 53.8, lngMin: 3.2, lngMax: 7.3 };

function inNetherlands(lat, lng) {
    return lat >= NL_BOUNDS.latMin && lat <= NL_BOUNDS.latMax &&
           lng >= NL_BOUNDS.lngMin && lng <= NL_BOUNDS.lngMax;
}

async function geocode(name, country = 'Nederland') {
    // Try with full name first, then strip common suffixes if no result
    const queries = [
        `${name}, ${country}`,
        `${name.replace(/\b(vakantiepark|camping|resort|park|hotel)\b/gi, '').trim()}, ${country}`,
    ];

    for (const q of queries) {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=3&countrycodes=nl,be,de,at,fr,es`;
        const res = await fetch(url, {
            headers: { 'User-Agent': 'VakantieVoorKids/1.0 (daan.jan.grotenhuis@bookingboosters.nl)' }
        });
        const data = await res.json();
        if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            return { lat, lng, displayName: data[0].display_name };
        }
        await sleep(1100); // rate limit
    }
    return null;
}

// Fetch all parks
const parks = await client.fetch(`
    *[_type == "park"] | order(name asc) {
        _id, name, slug,
        "lat": location.lat,
        "lng": location.lng,
        "country": location.country
    }
`);

console.log(`Found ${parks.length} parks.\n`);

let updated = 0, skipped = 0, failed = 0;

for (const park of parks) {
    const hasCoords = park.lat && park.lng;

    // Skip if coordinates look correct (within reasonable European bounds)
    if (hasCoords && Math.abs(park.lat) > 1 && Math.abs(park.lng) > 1) {
        // Warn if coords look swapped (lat should be larger than lng for NL)
        const looksSwapped = park.lat < 10 && park.lng > 40;
        if (!looksSwapped) {
            console.log(`  ⏭  Skipping ${park.name} (already has coords: ${park.lat}, ${park.lng})`);
            skipped++;
            continue;
        }
        console.log(`  ⚠️  ${park.name} — coords look swapped, re-geocoding`);
    }

    process.stdout.write(`  🔍 ${park.name}... `);
    await sleep(1100); // respect rate limit

    const result = await geocode(park.name, park.country ?? 'Nederland');

    if (!result) {
        console.log('not found');
        failed++;
        continue;
    }

    console.log(`→ (${result.lat.toFixed(4)}, ${result.lng.toFixed(4)})`);

    await client
        .patch(park._id)
        .set({ 'location.lat': result.lat, 'location.lng': result.lng })
        .commit();

    updated++;
}

console.log(`\nDone — ${updated} updated, ${skipped} skipped, ${failed} not found.`);
console.log('\nParks not found need coordinates added manually in Sanity Studio.');
