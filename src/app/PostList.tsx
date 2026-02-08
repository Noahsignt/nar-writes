/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

'use client'

import { useState } from 'react'
import Link from 'next/link'

const PostList = ({ posts }) => {
  const [selectedTag, setSelectedTag] = useState(null)

  const toggleTag = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.node.tags?.includes(selectedTag))
    : posts

  const tags = ['trip-report', 'essay', 'fiction', 'personal']

  return (
    <>
      <div className="mb-6 text-center font-mono text-sm">
        filter:{' '}
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`mx-1 cursor-pointer group ${selectedTag === tag ? 'font-bold' : ''}`}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">{'>'}</span>
            {selectedTag === tag ? `[${tag}]` : tag}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.node._sys.filename} className="p-6 border-b mb-8">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-2xl font-semibold">
                <Link href={`/blog/${post.node._sys.filename}`}>
                  <p className="text-gray-900 hover:underline">{post.node.title}</p>
                </Link>
              </h2>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                {post.node.tags?.sort().map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p>{post.node.body.children[0].children[0].text}..</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default PostList
