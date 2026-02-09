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
      <div className="mb-8 font-mono text-sm">
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
