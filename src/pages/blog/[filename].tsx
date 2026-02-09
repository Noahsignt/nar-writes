/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Head from 'next/head'
import Link from 'next/link'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import client from '../../../tina/__generated__/client'

const BlogPage = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  console.log(JSON.stringify(data.post.tags));

  return (
    <>
      <Head>
        {/* Tailwind CDN */}
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.7/tailwind.min.css'
          integrity='sha512-y6ZMKFUQrn+UUEVoqYe8ApScqbjuhjqzTuwUMEGMDuhS2niI8KA3vhH2LenreqJXQS+iIXVTRL2iaNfJbDNA1Q=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </Head>
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div>
          <Link href="/" className="font-mono text-sm hover:underline mb-6 inline-block">
            ← back
          </Link>
          <h1 className='text-2xl font-mono mb-4'>
            {data.post.title}
          </h1>
          <div className="font-mono text-sm text-gray-600 mb-2">
            {new Date(data.post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="flex gap-2 mb-8 font-mono text-xs text-gray-600">
            {data.post.tags?.sort().map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <ContentSection content={data.post.body}></ContentSection>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  let data = {}
  let query = {}
  let variables = { relativePath: `${params.filename}.md` }
  try {
    const res = await client.queries.post(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
      //myOtherProp: 'some-other-data',
    },
  }
}

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection()

  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: false,
  }
}

export default BlogPage

const PageSection = (props) => {
  return (
    <>
      <h2>{props.heading}</h2>
      <p>{props.content}</p>
    </>
  )
}

const components = {
  PageSection: PageSection,
}

const ContentSection = ({ content }) => {
  return (
    <div className='text-base leading-relaxed space-y-4'>
      <TinaMarkdown components={components} content={content} />
    </div>
  )
}
