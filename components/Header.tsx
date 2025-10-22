export default function Header() {
  return (
    <header className="relative z-10 py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Stellar Explorer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Journey through the cosmos. Click on any star to explore its mysteries.
          </p>
        </div>
      </div>
    </header>
  )
}