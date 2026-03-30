import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClass = ({ isActive }) =>
    `font-pixel text-xs md:text-sm px-4 py-2 transition-colors ${
      isActive
        ? 'text-primary border-b-2 border-primary'
        : 'text-white hover:text-accent'
    }`;

  return (
    <nav className="bg-surface border-b-2 border-primary sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-pixel text-lg md:text-xl text-accent hover:text-primary transition-colors">
            RetroAni
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/search" className={navLinkClass}>
              Search
            </NavLink>
            <NavLink to="/watchlist" className={navLinkClass}>
              Watchlist
            </NavLink>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-primary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block font-pixel text-xs px-4 py-2 ${
                  isActive ? 'text-primary bg-background' : 'text-white hover:text-accent'
                }`
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `block font-pixel text-xs px-4 py-2 ${
                  isActive ? 'text-primary bg-background' : 'text-white hover:text-accent'
                }`
              }
              onClick={toggleMenu}
            >
              Search
            </NavLink>
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `block font-pixel text-xs px-4 py-2 ${
                  isActive ? 'text-primary bg-background' : 'text-white hover:text-accent'
                }`
              }
              onClick={toggleMenu}
            >
              Watchlist
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
