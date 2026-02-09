/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

'use client'

import { MapContainer, TileLayer, Polyline, Popup, useMap } from 'react-leaflet'
import { useRouter } from 'next/navigation'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

const MapView = ({ posts }) => {
  const router = useRouter()

  // Default center on Sydney area
  const center = [-33.8688, 151.2093]

  const colors = ['#000000', '#666666', '#333333', '#999999']

  // Component to fit bounds to show all routes
  const FitBounds = ({ posts }) => {
    const map = useMap()

    useEffect(() => {
      if (posts.length > 0) {
        const allPoints = posts.flatMap(post => post.node.route)
        if (allPoints.length > 0) {
          const bounds = allPoints.map(point => [point.lat, point.lng])
          map.fitBounds(bounds, { padding: [50, 50] })
        }
      }
    }, [posts, map])

    return null
  }

  return (
    <div className="w-full h-[600px] border border-gray-300">
      <MapContainer
        center={center}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {posts.map((post, idx) => {
          const route = post.node.route
          const positions = route.map(point => [point.lat, point.lng])
          const color = post.node.routeColor || colors[idx % colors.length]

          return (
            <Polyline
              key={post.node._sys.filename}
              positions={positions}
              color={color}
              weight={3}
              opacity={0.8}
            >
              <Popup>
                <div
                  className="font-mono text-sm cursor-pointer"
                  onClick={() => router.push(`/blog/${post.node._sys.filename}`)}
                >
                  <strong>{post.node.title}</strong>
                  <br />
                  <span className="text-xs text-gray-600">
                    click to read →
                  </span>
                </div>
              </Popup>
            </Polyline>
          )
        })}

        <FitBounds posts={posts} />
      </MapContainer>
    </div>
  )
}

export default MapView
