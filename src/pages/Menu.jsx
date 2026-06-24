import { useEffect } from 'react'
import cakes from '../data/menu.json'
import { useCartDispatch } from '../context/CartContext'

const categories = [...new Set(cakes.map((c) => c.category))]

export default function Menu() {
  const dispatch = useCartDispatch()

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [])

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Menu</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Explore our handcrafted selection of cakes, cupcakes, and pastries made fresh daily.
      </p>

      {categories.map((cat) => (
        <section key={cat} id={cat} className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold text-pink-700 mb-6 border-b border-pink-200 pb-2">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cakes
              .filter((c) => c.category === cat)
              .map((cake) => (
                <div
                  key={cake.name}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={cake.img}
                    alt={cake.name}
                    className="w-full h-48 sm:h-56 object-cover"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{cake.name}</h3>
                      <span className="text-pink-600 font-bold">{cake.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{cake.description}</p>
                    <button
                      onClick={() => dispatch({ type: 'ADD', item: cake })}
                      className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 rounded-full transition-colors text-sm cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}
