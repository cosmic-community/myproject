'use client'

import { useState, useEffect } from 'react'
import { Star, StarPosition } from '@/types'
import StarModal from '@/components/StarModal'

interface GalaxyViewProps {
  stars: Star[]
}

export default function GalaxyView({ stars }: GalaxyViewProps) {
  const [selectedStar, setSelectedStar] = useState<Star | null>(null)
  const [starPositions, setStarPositions] = useState<StarPosition[]>([])

  useEffect(() => {
    // Generate random positions for stars
    const positions: StarPosition[] = stars.map((star, index) => ({
      id: star.id,
      x: Math.random() * 80 + 10, // 10% to 90% of width
      y: Math.random() * 70 + 15, // 15% to 85% of height
      size: Math.random() * 20 + 15, // 15px to 35px
      star,
    }))
    setStarPositions(positions)
  }, [stars])

  return (
    <>
      <div className="relative min-h-screen pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="relative w-full" style={{ height: '80vh' }}>
            {/* Background stars effect */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={`bg-star-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>

            {/* Interactive stars */}
            {starPositions.map((position) => (
              <button
                key={position.id}
                onClick={() => setSelectedStar(position.star)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 cursor-pointer group"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  width: `${position.size}px`,
                  height: `${position.size}px`,
                }}
                aria-label={`View details for ${position.star.metadata.star_name}`}
              >
                <div className="w-full h-full bg-white rounded-full star-glow group-hover:star-hover-glow animate-float transition-all duration-300">
                  {position.star.metadata.star_image && (
                    <img
                      src={`${position.star.metadata.star_image.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                      alt={position.star.metadata.star_name}
                      className="w-full h-full rounded-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  )}
                </div>
                
                {/* Star name tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  <div className="bg-black bg-opacity-90 px-3 py-1 rounded text-sm">
                    {position.star.metadata.star_name}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Instructions */}
          <div className="text-center mt-12">
            <p className="text-gray-400 text-lg">
              💫 Hover over stars to see their names • Click to explore their story
            </p>
          </div>
        </div>
      </div>

      {/* Star detail modal */}
      {selectedStar && (
        <StarModal star={selectedStar} onClose={() => setSelectedStar(null)} />
      )}
    </>
  )
}