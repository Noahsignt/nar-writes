/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PostList = ({ posts }) => {
  const [selectedTag, setSelectedTag] = useState(null)
  const router = useRouter()

  const toggleTag = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const getRandomPost = () => {
    const randomIndex = Math.floor(Math.random() * posts.length)
    const randomPost = posts[randomIndex]
    router.push(`/blog/${randomPost.node._sys.filename}`)
  }

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.node.tags?.includes(selectedTag))
    : posts

  const tags = ['trip-report', 'essay', 'fiction', 'personal']

  return (
    <>
      <div className="mb-8 font-mono text-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span>filter:{' '}</span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`cursor-pointer group ${selectedTag === tag ? 'font-bold' : ''}`}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">{'>'}</span>
              {selectedTag === tag ? `[${tag}]` : tag}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 mt-2 sm:mt-0 text-center sm:text-left">
          <button
            onClick={getRandomPost}
            className="cursor-pointer group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">{'>'}</span>
            [surprise me]
          </button>
        </div>
      </div>
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.node._sys.filename} className="pb-6 border-b mb-8">
            <Link href={`/blog/${post.node._sys.filename}`}>
              <h2 className="text-lg font-mono hover:underline mb-2">{post.node.title}</h2>
            </Link>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2 font-mono">
              {post.node.tags?.sort().map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="text-sm text-gray-700">{post.node.body.children[0].children[0].text}..</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default PostList
