/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

'use client'

import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] border border-gray-300 flex items-center justify-center font-mono text-sm">loading map...</div>
})

const MapWrapper = ({ posts }) => {
  return <MapView posts={posts} />
}

export default MapWrapper
