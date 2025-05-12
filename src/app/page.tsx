/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// app/page.js or app/home/page.js
import Link from 'next/link'
import client from '../../tina/__generated__/client'


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
    <div className="container mx-auto py-16">
      {homepage.banner && (
        <img
          src={homepage.banner}
          alt="Homepage Banner"
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold text-center mb-8">Nar Writes</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.node._sys.filename} className="p-6 border-b">
            <h2 className="text-2xl font-semibold">
              <Link href={`/blog/${post.node._sys.filename}`}>
                <p className="text-blue-600 hover:underline">{post.node.title}</p>
              </Link>
            </h2>
            <p>{post.node.body.children[0].children[0].text}...</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
