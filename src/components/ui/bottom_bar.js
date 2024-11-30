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
  