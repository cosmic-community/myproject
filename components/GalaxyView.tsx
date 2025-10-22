'use client'

import { useState, useEffect } from 'react'
import { AllahName, NamePosition } from '@/types'
import StarModal from '@/components/StarModal'

interface GalaxyViewProps {
  names: AllahName[]
}

export default function GalaxyView({ names }: GalaxyViewProps) {
  const [selectedName, setSelectedName] = useState<AllahName | null>(null)
  const [namePositions, setNamePositions] = useState<NamePosition[]>([])

  useEffect(() => {
    // Generate random positions for names (represented as stars)
    const positions: NamePosition[] = names.map((name) => ({
      id: name.id,
      x: Math.random() * 80 + 10, // 10% to 90% of width
      y: Math.random() * 70 + 15, // 15% to 85% of height
      size: Math.random() * 20 + 15, // 15px to 35px
      name,
    }))
    setNamePositions(positions)
  }, [names])

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

            {/* Interactive stars representing Allah's names */}
            {namePositions.map((position) => (
              <button
                key={position.id}
                onClick={() => setSelectedName(position.name)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 cursor-pointer group"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  width: `${position.size}px`,
                  height: `${position.size}px`,
                }}
                aria-label={`View details for ${position.name.metadata.arabic_name} - ${position.name.metadata.transliteration}`}
              >
                <div className="w-full h-full bg-white rounded-full star-glow group-hover:star-hover-glow animate-float transition-all duration-300">
                  {position.name.metadata.name_image && (
                    <img
                      src={`${position.name.metadata.name_image.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                      alt={position.name.metadata.transliteration}
                      className="w-full h-full rounded-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  )}
                </div>
                
                {/* Name tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  <div className="bg-black bg-opacity-90 px-3 py-1 rounded text-sm">
                    {position.name.metadata.arabic_name} • {position.name.metadata.transliteration}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Instructions */}
          <div className="text-center mt-12">
            <p className="text-gray-400 text-lg">
              ✨ Hover over stars to see the names • Click to explore their meaning
            </p>
          </div>
        </div>
      </div>

      {/* Name detail modal */}
      {selectedName && (
        <StarModal name={selectedName} onClose={() => setSelectedName(null)} />
      )}
    </>
  )
}