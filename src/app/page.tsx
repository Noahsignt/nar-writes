// @ts-nocheck

// app/page.js or app/home/page.js
import Link from 'next/link'
import client from '../../tina/__generated__/client'

// Fetch posts directly within a Server Component
const fetchPosts = async () => {
  const postsListData = await client.queries.postConnection()
  return postsListData.data.postConnection.edges
}

const HomePage = async () => {
  const posts = await fetchPosts()  // Directly await the data

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
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
