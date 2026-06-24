import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-pink-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎂</span>
              <span className="text-xl font-bold">Sweet Delights</span>
            </div>
            <p className="text-pink-200 text-sm">
              Handcrafted cakes made with love and the finest ingredients. Every bite is a celebration.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-pink-200">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/menu" className="hover:text-white transition-colors">Menu</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Visit Us</h3>
            <address className="not-italic text-sm text-pink-200 space-y-1">
              <p>123 Baker Street</p>
              <p>Sweet City, SC 10001</p>
              <p className="mt-2">📞 (555) 123-4567</p>
              <p>✉️ hello@sweetdelights.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-pink-800 mt-8 pt-6 text-center text-sm text-pink-300">
          &copy; {new Date().getFullYear()} Sweet Delights Cake Shop. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
