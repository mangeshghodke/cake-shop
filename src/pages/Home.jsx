import { Link } from 'react-router-dom'
import cakes from '../data/menu.json'

const categories = [...new Set(cakes.map((c) => c.category))]

const categoryIcons = {
  Chocolate: '🍫',
  Fruit: '🍓',
  Classic: '🎂',
  Cupcakes: '🧁',
  Pastries: '🥐',
  Special: '✨',
}

const featuredCakes = [...cakes].sort(() => Math.random() - 0.5).slice(0, 3)

export default function Home() {
  return (
    <>
      <section
        className="relative h-[400px] sm:h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Sweet Delights
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pink-100">
            Handcrafted cakes for every celebration
          </p>
          <Link
            to="/menu"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full transition-colors text-lg"
          >
            Explore Our Menu
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/menu#${cat}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 sm:p-8 text-center group"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                {categoryIcons[cat] || '🍰'}
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{cat}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto bg-pink-50/50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Cakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCakes.map((cake) => (
            <div
              key={cake.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={cake.img}
                alt={cake.name}
                className="w-full h-48 sm:h-64 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{cake.name}</h3>
                  <span className="text-pink-600 font-bold text-lg">{cake.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{cake.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/menu"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      <section className="bg-pink-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            At Sweet Delights, we believe every cake tells a story. Founded in 2015, our bakery has been
            crafting delicious, beautiful cakes using the finest natural ingredients. From intimate
            birthdays to grand weddings, we pour our heart into every order. Come taste the difference
            that love makes.
          </p>
        </div>
      </section>
    </>
  )
}
