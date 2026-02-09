/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Link from 'next/link'
import Image from 'next/image'
import client from '../../../tina/__generated__/client'

const fetchPosts = async () => {
  const postsListData = await client.queries.postConnection()
  return postsListData.data.postConnection.edges
}

// Extract image URLs from markdown body
const extractImages = (body) => {
  const images = []

  const traverse = (node) => {
    if (!node) return

    try {
      if (node.type === 'img' && node.url) {
        images.push(node.url)
      }
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse)
      }
    } catch (error) {
      console.error('Error traversing node:', error)
    }
  }

  try {
    if (body?.children && Array.isArray(body.children)) {
      body.children.forEach(traverse)
    }
  } catch (error) {
    console.error('Error extracting images:', error)
  }

  return images
}

const PhotosPage = async () => {
  try {
    const posts = await fetchPosts()

    // Build array of { imageUrl, postTitle, postSlug }
    const photos = []
    posts.forEach((post) => {
      if (!post?.node) return

      try {
        const imageUrls = extractImages(post.node.body)
        imageUrls.forEach((url) => {
          if (url) {
            photos.push({
              url,
              title: post.node.title || 'Untitled',
              slug: post.node._sys?.filename || '',
            })
          }
        })
      } catch (error) {
        console.error(`Error processing post ${post.node?.title}:`, error)
      }
    })

    return (
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="font-mono text-sm hover:underline mb-6 inline-block">
          ← back
        </Link>
        <h1 className="text-2xl font-mono mb-8">photos</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, idx) => (
            <Link
              key={`${photo.slug}-${idx}`}
              href={`/blog/${photo.slug}`}
              className="group"
            >
              <div className="aspect-square relative overflow-hidden border border-gray-300 hover:border-black transition-colors">
                <Image
                  src={photo.url}
                  alt={`From ${photo.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <p className="font-mono text-xs mt-1 text-gray-600 group-hover:text-black transition-colors">
                {photo.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error rendering photos page:', error)
    return (
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="font-mono text-sm hover:underline mb-6 inline-block">
          ← back
        </Link>
        <h1 className="text-2xl font-mono mb-8">photos</h1>
        <p className="font-mono text-sm">Unable to load photos.</p>
      </div>
    )
  }
}

export default PhotosPage
