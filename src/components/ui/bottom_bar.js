

const BottomBar = () => {
  const links = [
    { href: '/information/about_us', label: 'About Us' },
    { href: '/information/contact_us', label: 'Contact Us' },
    { href: '/information/pricing_policy', label: 'Pricing Policy' },
    { href: '/information/privacy_policy', label: 'Privacy Policy' },
    { href: '/information/terms_and_conditions', label: 'Terms and Conditions' },
    { href: '/information/cancellation_refund_policy', label: 'Cancellation/Refund Policy' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Social Media Links */}
          <div className="flex items-center space-x-4 gap-3">
            <span className="text-gray-300">Follow us on -</span>
            <a href="https://www.instagram.com/flexmood.pro" className="group" target="_blank">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                className="fill-gray-300 group-hover:fill-white transition-colors duration-300"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@flexmood-pro" className="group" target="_blank">
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                className="fill-gray-300 group-hover:fill-white transition-colors duration-300"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap justify-center gap-6 lg:gap-12">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium tracking-wide hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />

          {/* Copyright Text */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Flexmood</span>. All rights reserved.
          </p>

          {/* Made with Love */}
          <div className="flex items-center text-gray-400 text-sm">
            Crafted with <span className="text-red-500 mx-1 text-lg">❤</span> by the passionate Flexmood Team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BottomBar;