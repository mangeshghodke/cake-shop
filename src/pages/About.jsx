export default function About() {
  return (
    <>
      <section className="relative h-[250px] sm:h-[400px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-pink-100">Our passion for baking, your sweet moments</p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=600&q=80"
              alt="Our bakery"
              className="rounded-2xl shadow-lg w-full h-[300px] sm:h-[400px] object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sweet Delights began as a small home kitchen dream in 2015. What started as baking
              for family and friends quickly blossomed into a beloved local bakery known for
              quality and creativity.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Every cake we make starts with the finest ingredients — real butter, fresh cream,
              premium chocolate, and seasonal fruits. We believe in baking from scratch, because
              that&apos;s the only way to create something truly special.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether it&apos;s a wedding, birthday, or just a Tuesday, we&apos;re here to make
              your moments a little sweeter.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-pink-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">🥚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fresh Ingredients</h3>
              <p className="text-gray-600">We source locally and use only the freshest dairy, eggs, and seasonal produce.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">👩‍🍳</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Handcrafted with Love</h3>
              <p className="text-gray-600">Every cake is baked and decorated by hand — no shortcuts, no compromises.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Orders</h3>
              <p className="text-gray-600">Dream it and we&apos;ll bake it. Custom designs for every occasion.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Visit Us</h2>
        <p className="text-gray-600 text-lg mb-2">123 Baker Street, Sweetville</p>
        <p className="text-gray-600 text-lg mb-2">contact@sweetdelights.com</p>
        <p className="text-gray-600 text-lg">Mon – Sat: 9 AM – 7 PM</p>
      </section>
    </>
  )
}
