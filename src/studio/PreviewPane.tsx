import React from 'react'

const ORIGIN = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://www.vakantievoorkids.nl'

function getPath(schemaType: string, doc: any): string | null {
    const slug = doc?.slug?.current ?? doc?.slug
    if (!slug) return null
    if (schemaType === 'post') return `/blog/${slug}`
    if (schemaType === 'pillarPage') return `/${slug}`
    if (schemaType === 'park') return `/overnachten/ontdekken/${slug}`
    return null
}

interface Props {
    document: { displayed: any }
    schemaType: string
}

export function PreviewPane({ document: { displayed }, schemaType }: Props) {
    const path = getPath(schemaType, displayed)

    if (!path) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>
                Sla het document op om een preview te zien
            </div>
        )
    }

    return (
        <iframe
            key={path}
            src={`${ORIGIN}${path}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
        />
    )
}
