import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'text',
        }),
        defineField({
            name: 'imageUrl',
            title: 'Afbeelding URL',
            type: 'url',
        }),
        defineField({
            name: 'categories',
            title: 'Categorieën',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Vakantie met kids', value: 'vakantie-met-kids' },
                    { title: 'Vakantie Nederland met kids', value: 'vakantie-nederland-met-kids' },
                    { title: 'Vakantie België met kids', value: 'vakantie-belgie-met-kids' },
                    { title: 'Vakantie Duitsland met kids', value: 'vakantie-duitsland-met-kids' },
                    { title: 'Vakantie Oostenrijk met kids', value: 'vakantie-oostenrijk-met-kids' },
                    { title: 'Vakantiepark voor kids', value: 'vakantiepark-voor-kids' },
                    { title: 'Midweek weg met kids', value: 'midweek-weg-met-kids' },
                    { title: 'Weekend weg met kids', value: 'weekend-weg-met-kids' },
                    { title: 'Campings voor kids', value: 'campings-voor-kids' },
                    { title: 'Kindvriendelijke restaurants', value: 'kindvriendelijke-restaurants' },
                    { title: 'Kindvriendelijk musea', value: 'kindvriendelijk-musea' },
                    { title: 'Binnenspeeltijd', value: 'binnenspeeltijd' },
                    { title: 'Zwemparadijs', value: 'zwemparadijs' },
                ],
            },
        }),
    ],
})
