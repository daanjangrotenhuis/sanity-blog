/**
 * Park import script — reads parks.csv and creates Sanity documents.
 *
 * STEP 1: Export your spreadsheet as parks.csv (UTF-8) into this scripts/ folder.
 *
 * STEP 2: In COLUMN_MAP below, set each value to the exact column header
 *         as it appears in your CSV. Leave it null if you don't have that column.
 *
 * STEP 3: In FACILITY_ALIASES below, add every word you use in your
 *         Faciliteiten column and map it to one of the internal facility IDs.
 *
 * STEP 4: Get a Sanity write token:
 *         sanity.io → your project → Settings → API → Tokens → Add token (Editor)
 *
 * STEP 5: Run:
 *         npm install @sanity/client papaparse   (only needed once)
 *         SANITY_TOKEN=your_token node scripts/import-parks.mjs
 *
 * The map on /overnachten/ontdekken uses the Lat + Lng columns for pins.
 * Every row with a valid lat/lng will appear as a marker on the map.
 */

import { createClient } from '@sanity/client';
import Papa from 'papaparse';
import { readFileSync } from 'fs';

const client = createClient({
    projectId: '7oxpyma4',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
});

// ─── STEP 2: MAP YOUR COLUMN HEADERS ─────────────────────────────────────────
// Set each value to the exact column header in your CSV.
// Set to null if you don't have that column.
const COLUMN_MAP = {
    name:          'Naam',                           // required
    type:          'Accommodatie Types',             // vakantiepark | camping | etc.
    tagline:       null,                             // not in spreadsheet
    city:          null,                             // not in spreadsheet
    province:      null,                             // not in spreadsheet
    country:       'Land',
    address:       null,                             // not in spreadsheet
    lat:           'latitude',
    lng:           'longitude',
    heroImageUrl:  null,                             // not in spreadsheet
    website:       'Website',
    bookingUrl:    null,                             // not in spreadsheet
    priceFrom:     null,                             // not in spreadsheet
    openingPeriod: null,                             // not in spreadsheet
    discount:      null,                             // not in spreadsheet
    videoUrl:      null,                             // not in spreadsheet
    facilities:    'Faciliteiten',
    omgeving:      'Omgeving',
    pets:          'pets_allowed_at_accommodation',  // boolean → adds hondenvriendelijk to facilities
};
// ─────────────────────────────────────────────────────────────────────────────


// ─── STEP 3: MAP YOUR FACILITY WORDS TO INTERNAL IDs ─────────────────────────
// Add every word/abbreviation you use in your Faciliteiten column here.
// The right side must be one of the internal IDs (don't change those).
// You can add as many aliases as you want (English, Dutch, abbreviations, etc.)
const FACILITY_ALIASES = {
    // Dutch
    'zwembad':              'zwembad',
    'buitenzwembad':        'zwembad',
    'binnenzwembad':        'zwembad',
    'subtropisch zwembad':  'subtropisch-zwembad',
    'subtropisch':          'subtropisch-zwembad',
    'speeltuin':            'speeltuin',
    'speeltuinen':          'speeltuin',
    'honden':               'hondenvriendelijk',
    'hondenvriendelijk':    'hondenvriendelijk',
    'huisdieren':           'hondenvriendelijk',
    'attractiepark':        'nabij-attractiepark',
    'nabij attractiepark':  'nabij-attractiepark',
    'pretpark':             'nabij-attractiepark',
    'restaurant':           'restaurant',
    'horeca':               'restaurant',
    'animatie':             'animatie',
    'kinderanimatie':       'kinderanimatie',
    'wifi':                 'wifi',
    'internet':             'wifi',
    'sport':                'sport-spel',
    'sport & spel':         'sport-spel',
    'sportfaciliteiten':    'sport-spel',
    'sauna':                'sauna-wellness',
    'wellness':             'sauna-wellness',
    'sauna & wellness':     'sauna-wellness',
    'spa':                  'sauna-wellness',
    'fietsverhuur':         'fietsverhuur',
    'fietsen':              'fietsverhuur',
    'strand':               'strand-meer',
    'meer':                 'strand-meer',
    'strand/meer':          'strand-meer',
    'water':                'strand-meer',
    'klimpark':             'klimpark',
    'klimbos':              'klimpark',
    'supermarkt':           'supermarkt',
    'rolstoeltoegankelijk': 'rolstoeltoegankelijk',
    'mindervaliden':        'rolstoeltoegankelijk',

    // English
    'swimming pool':        'zwembad',
    'pool':                 'zwembad',
    'swimmingpool':         'zwembad',
    'subtropical pool':     'subtropisch-zwembad',
    'playground':           'speeltuin',
    'playpark':             'speeltuin',
    'play area':            'speeltuin',
    'dogs allowed':         'hondenvriendelijk',
    'dogs':                 'hondenvriendelijk',
    'pets':                 'hondenvriendelijk',
    'near theme park':      'nabij-attractiepark',
    'theme park':           'nabij-attractiepark',
    'animation':            'animatie',
    'kids animation':       'kinderanimatie',
    'sports':               'sport-spel',
    'bicycle rental':       'fietsverhuur',
    'bikes':                'fietsverhuur',
    'beach':                'strand-meer',
    'lake':                 'strand-meer',
    'climbing park':        'klimpark',
    'bowling':              'sport-spel',  // bowling → mapped to sport-spel
};

// ─── OMGEVING ALIASES ─────────────────────────────────────────────────────────
// Same idea as FACILITY_ALIASES — map whatever words you use to an internal ID.
const OMGEVING_ALIASES = {
    // Dutch
    'bos':                  'bos',
    'bossen':               'bos',
    'natuur':               'natuur',
    'heide':                'natuur',
    'heideveld':            'natuur',
    'strand':               'strand',
    'zee':                  'zee',
    'kust':                 'zee',
    'meer':                 'meer',
    'meren':                'meer',
    'rivier':               'meer',
    'plas':                 'meer',
    'bergen':               'bergen',
    'heuvelland':           'bergen',
    'heuvels':              'bergen',
    'duinen':               'duinen',
    'duin':                 'duinen',
    'stad':                 'stad',
    'dorp':                 'stad',
    'centrum nabij':        'stad',
    'attractiepark':        'nabij-attractiepark',
    'nabij attractiepark':  'nabij-attractiepark',
    'pretpark':             'nabij-attractiepark',
    'ns-station':           'ns-station',
    'trein':                'ns-station',
    'station':              'ns-station',
    'snelweg':              'snelweg',
    'a-weg':                'snelweg',

    // English
    'forest':               'bos',
    'woods':                'bos',
    'nature':               'natuur',
    'beach':                'strand',
    'sea':                  'zee',
    'coast':                'zee',
    'lake':                 'meer',
    'river':                'meer',
    'mountains':            'bergen',
    'hills':                'bergen',
    'dunes':                'duinen',
    'city':                 'stad',
    'town':                 'stad',
    'theme park':           'nabij-attractiepark',
    'near theme park':      'nabij-attractiepark',
    'highway':              'snelweg',
};
// ─────────────────────────────────────────────────────────────────────────────


// Maps whatever values appear in your "Accommodatie Types" column to internal IDs.
// Add more entries if your spreadsheet uses different words.
const TYPE_ALIASES = {
    'vakantiepark':     'vakantiepark',
    'holiday park':     'vakantiepark',
    'camping':          'camping',
    'campsite':         'camping',
    'glamping':         'glamping',
    'hotel':            'hotel',
    'bungalowpark':     'bungalowpark',
    'bungalow park':    'bungalowpark',
    'boerderijcamping': 'boerderijcamping',
    'farm camping':     'boerderijcamping',
};

function slugify(str) {
    return str.toLowerCase()
        .replace(/[àáäâ]/g, 'a').replace(/[èéëê]/g, 'e')
        .replace(/[ìíïî]/g, 'i').replace(/[òóöô]/g, 'o')
        .replace(/[ùúüû]/g, 'u')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function isTruthy(val) {
    return ['ja', 'yes', '1', 'x', 'true'].includes(String(val ?? '').toLowerCase().trim());
}

function parseList(raw, aliasMap) {
    if (!raw) return [];
    return raw
        .split(',')
        .map(s => s.trim().toLowerCase())
        .map(s => aliasMap[s])
        .filter(Boolean)
        .filter((v, i, arr) => arr.indexOf(v) === i); // deduplicate
}

const csv = readFileSync('./scripts/parks.csv', 'utf-8');
const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true });

console.log(`Found ${data.length} rows. Starting import…\n`);

let created = 0, skipped = 0, errors = 0;

for (const row of data) {
    const name = row[COLUMN_MAP.name]?.trim();
    if (!name) { console.log('  Skipping empty row'); skipped++; continue; }

    const slug = slugify(name);
    const facilities = parseList(row[COLUMN_MAP.facilities], FACILITY_ALIASES);
    const omgeving   = parseList(row[COLUMN_MAP.omgeving],   OMGEVING_ALIASES);

    // pets_allowed_at_accommodation → add hondenvriendelijk if truthy
    if (COLUMN_MAP.pets && isTruthy(row[COLUMN_MAP.pets]) && !facilities.includes('hondenvriendelijk')) {
        facilities.push('hondenvriendelijk');
    }

    const lat = COLUMN_MAP.lat && row[COLUMN_MAP.lat] ? parseFloat(row[COLUMN_MAP.lat].replace(',', '.')) : undefined;
    const lng = COLUMN_MAP.lng && row[COLUMN_MAP.lng] ? parseFloat(row[COLUMN_MAP.lng].replace(',', '.')) : undefined;

    if (lat && lng) {
        console.log(`  📍 ${name} — map pin at (${lat}, ${lng})`);
    } else {
        console.log(`  ⚠️  ${name} — no lat/lng, won't show on map`);
    }

    const doc = {
        _type: 'park',
        _id: `park-${slug}`,
        name,
        slug: { _type: 'slug', current: slug },
        type:          (COLUMN_MAP.type && row[COLUMN_MAP.type]?.trim())
                            ? (TYPE_ALIASES[row[COLUMN_MAP.type].trim().toLowerCase()] ?? row[COLUMN_MAP.type].trim().toLowerCase())
                            : undefined,
        tagline:       (COLUMN_MAP.tagline        && row[COLUMN_MAP.tagline]?.trim())             || undefined,
        heroImageUrl:  (COLUMN_MAP.heroImageUrl   && row[COLUMN_MAP.heroImageUrl]?.trim())        || undefined,
        videoUrl:      (COLUMN_MAP.videoUrl       && row[COLUMN_MAP.videoUrl]?.trim())            || undefined,
        website:       (COLUMN_MAP.website        && row[COLUMN_MAP.website]?.trim())             || undefined,
        bookingUrl:    (COLUMN_MAP.bookingUrl     && row[COLUMN_MAP.bookingUrl]?.trim())          || undefined,
        openingPeriod: (COLUMN_MAP.openingPeriod  && row[COLUMN_MAP.openingPeriod]?.trim())       || undefined,
        discount:      (COLUMN_MAP.discount       && row[COLUMN_MAP.discount]?.trim())            || undefined,
        priceFrom:     (COLUMN_MAP.priceFrom      && row[COLUMN_MAP.priceFrom])
                            ? Number(row[COLUMN_MAP.priceFrom]) : undefined,
        facilities:    facilities.length ? facilities : undefined,
        omgeving:      omgeving.length   ? omgeving   : undefined,
        location: {
            city:     (COLUMN_MAP.city     && row[COLUMN_MAP.city]?.trim())     || undefined,
            province: (COLUMN_MAP.province && row[COLUMN_MAP.province]?.trim()) || undefined,
            country:  (COLUMN_MAP.country  && row[COLUMN_MAP.country]?.trim())  || 'Nederland',
            address:  (COLUMN_MAP.address  && row[COLUMN_MAP.address]?.trim())  || undefined,
            lat,
            lng,
        },
        featured: false,
    };

    // Strip undefined values
    const clean = obj => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
    Object.assign(doc, clean(doc));
    doc.location = clean(doc.location);

    try {
        await client.createOrReplace(doc);
        console.log(`  ✓ Imported: ${name}`);
        created++;
    } catch (err) {
        console.error(`  ✗ Error for ${name}: ${err.message}`);
        errors++;
    }
}

console.log(`\nDone — ${created} imported, ${skipped} skipped, ${errors} errors.`);
