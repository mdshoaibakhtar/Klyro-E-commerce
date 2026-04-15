import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Heart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-10 h-20 flex items-center bg-white border-b border-border-sleek shadow-sm",
      isScrolled ? "h-[70px]" : "h-20"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <span className="text-2xl font-display font-black tracking-tighter text-primary">
            KLYRO
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg relative">
          <div className="search-bar-sleek w-full flex items-center gap-3">
            <Search className="text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search modern tech, gadgets, lifestyle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/products" className="text-sm font-semibold text-text-light hover:text-primary transition-colors">Shop</Link>
            <Link to="/categories" className="text-sm font-semibold text-text-light hover:text-primary transition-colors">Categories</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="text-text-light hover:text-primary relative transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="text-text-light hover:text-primary relative transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 text-text-light hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-semibold hidden lg:block">{user?.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-bold text-text-light hover:text-primary transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-4 md:hidden"
          >
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </form>
            <div className="grid grid-cols-2 gap-2">
              <Link 
                to="/products" 
                onClick={() => setIsMenuOpen(false)}
                className="p-4 bg-slate-50 rounded-xl text-center font-medium hover:bg-primary/5 hover:text-primary transition-colors"
              >
                Shop All
              </Link>
              <Link 
                to="/categories" 
                onClick={() => setIsMenuOpen(false)}
                className="p-4 bg-slate-50 rounded-xl text-center font-medium hover:bg-primary/5 hover:text-primary transition-colors"
              >
                Categories
              </Link>
              <Link 
                to="/orders" 
                onClick={() => setIsMenuOpen(false)}
                className="p-4 bg-slate-50 rounded-xl text-center font-medium hover:bg-primary/5 hover:text-primary transition-colors"
              >
                My Orders
              </Link>
              <Link 
                to="/wishlist" 
                onClick={() => setIsMenuOpen(false)}
                className="p-4 bg-slate-50 rounded-xl text-center font-medium hover:bg-primary/5 hover:text-primary transition-colors"
              >
                Wishlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
