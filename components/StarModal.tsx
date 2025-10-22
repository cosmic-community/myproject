'use client'

import { useEffect } from 'react'
import { AllahName } from '@/types'

interface StarModalProps {
  name: AllahName
  onClose: () => void
}

export default function StarModal({ name, onClose }: StarModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-cosmic-dark to-black border border-purple-500 rounded-2xl shadow-2xl animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full transition-all text-white text-2xl"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Name image header */}
        {name.metadata.name_image && (
          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-t-2xl">
            <img
              src={`${name.metadata.name_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={name.metadata.transliteration}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {name.metadata.arabic_name}
              </h2>
              <p className="text-2xl text-gray-200 mb-2">
                {name.metadata.transliteration}
              </p>
              {name.metadata.short_description && (
                <p className="text-lg text-gray-300">
                  {name.metadata.short_description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {!name.metadata.name_image && (
            <div className="mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {name.metadata.arabic_name}
              </h2>
              <p className="text-2xl text-gray-200 mb-2">
                {name.metadata.transliteration}
              </p>
              {name.metadata.short_description && (
                <p className="text-lg text-gray-300">
                  {name.metadata.short_description}
                </p>
              )}
            </div>
          )}

          {/* Metadata grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-900 bg-opacity-30 rounded-lg p-4 border border-purple-500">
              <div className="text-sm text-gray-400 mb-1">English Meaning</div>
              <div className="text-lg font-semibold text-purple-300">
                {name.metadata.english_meaning}
              </div>
            </div>
            
            {name.metadata.category && (
              <div className="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-500">
                <div className="text-sm text-gray-400 mb-1">Category</div>
                <div className="text-lg font-semibold text-blue-300">
                  {name.metadata.category.value}
                </div>
              </div>
            )}
            
            {name.metadata.quran_reference && (
              <div className="bg-pink-900 bg-opacity-30 rounded-lg p-4 border border-pink-500">
                <div className="text-sm text-gray-400 mb-1">Quran Reference</div>
                <div className="text-lg font-semibold text-pink-300">
                  {name.metadata.quran_reference}
                </div>
              </div>
            )}
          </div>

          {/* Detailed explanation */}
          {name.metadata.detailed_explanation && (
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">Detailed Explanation</h3>
              <div 
                className="prose prose-invert prose-purple max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: name.metadata.detailed_explanation }}
              />
            </div>
          )}

          {/* Spiritual significance */}
          {name.metadata.spiritual_significance && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Spiritual Significance</h3>
              <div 
                className="prose prose-invert prose-purple max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: name.metadata.spiritual_significance }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}