/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// app/page.js or app/home/page.js
import Link from 'next/link'
import client from '../../tina/__generated__/client'
import PostList from './PostList'


const fetchHomepage = async () => {
  const homepageData = await client.queries.homepage({ relativePath: 'homepage.md' })
  return homepageData.data.homepage
}

const fetchPosts = async () => {
  const postsListData = await client.queries.postConnection()
  return postsListData.data.postConnection.edges
}

const HomePage = async () => {
  const homepage = await fetchHomepage()
  const posts = await fetchPosts()

  return (
    <div className="container mx-auto py-8 px-4">
      {homepage.banner && (
        <img
          src={homepage.banner}
          alt="Homepage Banner"
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-mono">nar writes</h1>
        <Link href="/map" className="font-mono text-sm hover:underline">
          map →
        </Link>
      </div>
      <PostList posts={posts} />
    </div>
  )
}

export default HomePage
