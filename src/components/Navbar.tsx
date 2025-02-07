import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Home, Info, Briefcase, Package, Image, Users, Book, Mail } from 'lucide-react';

const navigation = [
  { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
  { name: 'About Us', path: '/about', icon: <Info className="h-5 w-5" /> },
  { name: 'Our Services', path: '/services', icon: <Briefcase className="h-5 w-5" /> },
  { name: 'Products', path: '/products', icon: <Package className="h-5 w-5" /> },
  { name: 'Gallery', path: '/gallery', icon: <Image className="h-5 w-5" /> },
  { name: 'Customers', path: '/customers', icon: <Users className="h-5 w-5" /> },
  { name: 'Blog', path: '/blog', icon: <Book className="h-5 w-5" /> },
  { name: 'Contact', path: '/contact', icon: <Mail className="h-5 w-5" /> },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <>
      {/* Navbar utama */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Plane className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                <span className="ml-2 text-lg sm:text-xl font-bold">AeroTrade</span>
              </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-2 lg:px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Tombol Menu Mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="text-gray-700 dark:text-gray-300 p-2"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar (Mobile Menu) */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} navigation={navigation} />
    </>
  );
}
