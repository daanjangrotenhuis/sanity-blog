import { defineField, defineType } from 'sanity'

const OMGEVING = [
    { title: '🌲 Bos', value: 'bos' },
    { title: '🏖️ Strand', value: 'strand' },
    { title: '🌊 Zee', value: 'zee' },
    { title: '💧 Meer / rivier', value: 'meer' },
    { title: '🏔️ Bergen / heuvelland', value: 'bergen' },
    { title: '🌿 Natuur / heide', value: 'natuur' },
    { title: '🏜️ Duinen', value: 'duinen' },
    { title: '🎢 Nabij attractiepark', value: 'nabij-attractiepark' },
    { title: '🏙️ Stad nabij', value: 'stad' },
    { title: '🚂 NS-station nabij', value: 'ns-station' },
    { title: '🛣️ Snelweg nabij', value: 'snelweg' },
]

const FACILITIES = [
    { title: '🏊 Zwembad', value: 'zwembad' },
    { title: '🌴 Subtropisch zwembad', value: 'subtropisch-zwembad' },
    { title: '🎡 Speeltuin', value: 'speeltuin' },
    { title: '🐕 Honden welkom', value: 'hondenvriendelijk' },
    { title: '🎢 Nabij attractiepark', value: 'nabij-attractiepark' },
    { title: '🍴 Restaurant', value: 'restaurant' },
    { title: '🎯 Animatie', value: 'animatie' },
    { title: '🎭 Kinderanimatie', value: 'kinderanimatie' },
    { title: '📶 Wifi', value: 'wifi' },
    { title: '⚽ Sport & spel', value: 'sport-spel' },
    { title: '🧖 Sauna & wellness', value: 'sauna-wellness' },
    { title: '🚲 Fietsverhuur', value: 'fietsverhuur' },
    { title: '🏖️ Strand of meer nabij', value: 'strand-meer' },
    { title: '🌲 Klimpark', value: 'klimpark' },
    { title: '🛒 Supermarkt nabij', value: 'supermarkt' },
    { title: '♿ Rolstoeltoegankelijk', value: 'rolstoeltoegankelijk' },
]

export default defineType({
    name: 'park',
    title: 'Park / Accommodatie',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Naam',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: { source: 'name' },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'type',
            title: 'Type accommodatie',
            type: 'string',
            options: {
                list: [
                    { title: 'Vakantiepark', value: 'vakantiepark' },
                    { title: 'Camping', value: 'camping' },
                    { title: 'Glamping', value: 'glamping' },
                    { title: 'Hotel', value: 'hotel' },
                    { title: 'Bungalowpark', value: 'bungalowpark' },
                    { title: 'Boerderijcamping', value: 'boerderijcamping' },
                ],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'featured',
            title: 'Uitgelicht (toon bovenaan)',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline (één zin)',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Beschrijving (HTML)',
            description: 'Plak hier HTML-tekst. Gebruik <h2>, <h3>, <p>, <strong>.',
            type: 'text',
            rows: 15,
        }),

        // Location
        defineField({
            name: 'location',
            title: 'Locatie',
            type: 'object',
            fields: [
                defineField({ name: 'city', title: 'Plaats', type: 'string' }),
                defineField({ name: 'province', title: 'Provincie / Regio', type: 'string' }),
                defineField({ name: 'country', title: 'Land', type: 'string', initialValue: 'Nederland' }),
                defineField({ name: 'address', title: 'Adres (optioneel)', type: 'string' }),
                defineField({ name: 'lat', title: 'Breedtegraad (lat)', type: 'number', description: 'Bijv: 52.3702' }),
                defineField({ name: 'lng', title: 'Lengtegraad (lng)', type: 'number', description: 'Bijv: 4.8952' }),
            ],
        }),

        // Images
        defineField({
            name: 'heroImageUrl',
            title: 'Hero afbeelding URL',
            type: 'url',
        }),
        defineField({
            name: 'imageUrls',
            title: "Foto galerie (extra URL's)",
            description: 'Voeg meerdere foto-URLs toe voor de galerij op de parkpagina.',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL (YouTube of mp4)',
            type: 'url',
            description: 'Bijv: https://www.youtube.com/watch?v=abc123',
        }),

        // Facilities
        defineField({
            name: 'facilities',
            title: 'Faciliteiten (binnen het park)',
            type: 'array',
            of: [{ type: 'string' }],
            options: { list: FACILITIES, layout: 'grid' },
        }),
        defineField({
            name: 'omgeving',
            title: 'Omgeving (buiten het park)',
            type: 'array',
            of: [{ type: 'string' }],
            options: { list: OMGEVING, layout: 'grid' },
        }),

        // Practical info
        defineField({
            name: 'openingPeriod',
            title: 'Openingsperiode',
            type: 'string',
            description: 'Bijv: april t/m oktober | Jaar-rond',
        }),
        defineField({
            name: 'priceFrom',
            title: 'Prijs vanaf (€ per nacht)',
            type: 'number',
        }),
        defineField({
            name: 'website',
            title: 'Website URL',
            type: 'url',
        }),
        defineField({
            name: 'bookingUrl',
            title: 'Directe boekingslink',
            type: 'url',
        }),
        defineField({
            name: 'discount',
            title: 'Speciale aanbieding / korting',
            type: 'text',
            rows: 2,
            description: 'Bijv: 10% korting via onze link',
        }),
    ],
    preview: {
        select: { title: 'name', city: 'location.city', type: 'type', featured: 'featured' },
        prepare({ title, city, type, featured }) {
            return {
                title: `${featured ? '⭐ ' : ''}${title}`,
                subtitle: `${type ?? 'onbekend'} · ${city ?? ''}`,
            }
        },
    },
})
