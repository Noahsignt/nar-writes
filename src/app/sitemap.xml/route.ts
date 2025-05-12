// app/sitemap.xml/route.ts

import { MetadataRoute } from 'next'
import client from '../../../tina/__generated__/client'

export async function GET(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
    '',
    ]

    const postsResponse = await client.queries.postConnection() || [];

    const posts = postsResponse.data.postConnection.edges && postsResponse.data.postConnection.edges.map((post) => {
        const slug = post?.node?._sys.filename.replace(/\.md$/, '') || 'INVALID';
        return { slug };
    });

    const blogRoutes = posts?.map((post: { slug: string }) => `/blog/${post.slug}`) || []

    const allRoutes = [...staticRoutes, ...blogRoutes]

    const baseUrl = 'https://www.narwrites.com/'

    return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    }))
}
