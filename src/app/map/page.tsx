/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Link from 'next/link'
import client from '../../../tina/__generated__/client'
import MapWrapper from './MapWrapper'

const fetchPosts = async () => {
  const postsListData = await client.queries.postConnection()
  return postsListData.data.postConnection.edges
}

const MapPage = async () => {
  const posts = await fetchPosts()

  // Filter posts that have route data
  const postsWithRoutes = posts.filter(post => post.node.route && post.node.route.length > 0)

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="font-mono text-sm hover:underline mb-6 inline-block">
        ← back
      </Link>
      <h1 className="text-2xl font-mono mb-8">map</h1>
      <MapWrapper posts={postsWithRoutes} />
    </div>
  )
}

export default MapPage
