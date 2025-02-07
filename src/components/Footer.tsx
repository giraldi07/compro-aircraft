import { Link } from 'react-router-dom';
import { Plane, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <Plane className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              <span className="ml-2 text-lg sm:text-xl font-bold">AeroTrade</span>
            </Link>
            <p className="mt-4 text-sm sm:text-base text-gray-400">
              Your trusted partner in aircraft equipment and services.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm sm:text-base text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="text-sm sm:text-base text-gray-400 hover:text-white">Services</Link></li>
              <li><Link to="/products" className="text-sm sm:text-base text-gray-400 hover:text-white">Products</Link></li>
              <li><Link to="/contact" className="text-sm sm:text-base text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm sm:text-base text-gray-400">Aircraft Repair</li>
              <li className="text-sm sm:text-base text-gray-400">Equipment Trading</li>
              <li className="text-sm sm:text-base text-gray-400">Parts Trading</li>
              <li className="text-sm sm:text-base text-gray-400">Aviation Consulting</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm sm:text-base text-gray-400">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                info@aerotrade.com
              </li>
              <li className="flex items-center text-sm sm:text-base text-gray-400">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                +1 234 567 890
              </li>
              <li className="flex items-center text-sm sm:text-base text-gray-400">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                123 Aviation Street, City
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm sm:text-base text-gray-400">&copy; {new Date().getFullYear()} RaldPra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}