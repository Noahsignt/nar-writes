// app/sitemap.xml/route.ts

import { NextResponse } from 'next/server'
import client from '../../../tina/__generated__/client'

export async function GET() {
    const staticRoutes = [
    '',
    ]

    try {
    const postsResponse = await client.queries.postConnection() || []

    const posts = postsResponse.data?.postConnection?.edges?.map((post) => {
        const slug = post?.node?._sys.filename.replace(/\.md$/, '') || 'INVALID'
        return { slug }
    })

    const blogRoutes = posts?.map((post: { slug: string }) => `/blog/${post.slug}`) || []

    const allRoutes = [...staticRoutes, ...blogRoutes]

    const baseUrl = 'https://www.narwrites.com/'

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allRoutes
        .map(
            (route) => `
        <url>
            <loc>${baseUrl}${route}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>`
        )
        .join('')}
    </urlset>`

    return NextResponse.json(sitemapXml, {
        headers: { 'Content-Type': 'application/xml' },
    })
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json('Error generating sitemap', { status: 500 })
    }
}
