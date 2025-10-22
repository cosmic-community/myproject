import { getAllStars } from '@/lib/cosmic'
import { Star } from '@/types'
import GalaxyView from '@/components/GalaxyView'
import Header from '@/components/Header'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const stars = await getAllStars() as Star[]

  return (
    <main className="min-h-screen relative">
      <Header />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 cosmic-gradient opacity-20"></div>
      </div>

      {stars.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">No Stars Found</h2>
            <p className="text-gray-400">Add stars to your Cosmic bucket to see them here.</p>
          </div>
        </div>
      ) : (
        <GalaxyView stars={stars} />
      )}
    </main>
  )
}