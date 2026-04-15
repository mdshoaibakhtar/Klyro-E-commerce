import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ChevronDown, Search, X, SlidersHorizontal } from 'lucide-react';
import { apiService } from '../services/apiService';
import { Product } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/SkeletonLoader';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';
import debounce from 'lodash/debounce';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function ProductListing() {
  useDocumentTitle('Shop All Products');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';
  const initialSearch = queryParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await apiService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setCategory(initialCategory);
    setSearch(initialSearch);
  }, [initialCategory, initialSearch]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Search Filter
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }

    // Price Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'newest' - keep as is or sort by ID
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, category, search, sortBy, priceRange]);

  const handleSearchChange = debounce((val: string) => {
    setSearch(val);
  }, 300);

  return (
    <div className="flex min-h-screen bg-bg-sleek pt-20">
      {/* Sidebar Filters */}
      <aside className="w-64 bg-white border-r border-border-sleek p-6 hidden lg:flex flex-col gap-8 shrink-0">
        <div className="space-y-4">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-text-light">Categories</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="flex items-center gap-3 w-full group"
              >
                <div className={cn(
                  "w-[18px] h-[18px] border-2 rounded transition-colors shrink-0",
                  category === cat ? "bg-primary border-primary" : "border-border-sleek group-hover:border-primary"
                )} />
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  category === cat ? "text-primary" : "text-text-sleek group-hover:text-primary"
                )}>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-text-light">Price Range</h3>
          <div className="space-y-4 px-1">
            <div className="relative h-1 bg-slate-100 rounded-full">
              <div 
                className="absolute h-full bg-primary rounded-full" 
                style={{ left: '0%', right: `${100 - (priceRange[1] / 1000) * 100}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer"
                style={{ left: `${(priceRange[1] / 1000) * 100}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full opacity-0 absolute cursor-pointer"
            />
            <div className="flex justify-between text-[12px] text-text-light font-bold">
              <span>$0</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-text-light">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-slate-50 border border-border-sleek rounded-lg py-2 px-3 text-sm font-bold text-text-sleek outline-none focus:border-primary transition-colors"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <button 
          onClick={() => {
            setCategory('All');
            setPriceRange([0, 1000]);
            setSortBy('newest');
            setSearch('');
          }}
          className="mt-auto py-3 text-text-light font-bold text-xs hover:text-red-500 transition-colors flex items-center justify-center gap-2 border border-dashed border-border-sleek rounded-lg"
        >
          <X className="w-3.5 h-3.5" /> Reset Filters
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-hidden flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-black text-text-sleek uppercase tracking-tight">
              {category === 'All' ? 'Trending Products' : category}
            </h1>
            <p className="text-sm text-text-light font-medium">Showing {filteredProducts.length} premium items</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <div className="search-bar-sleek flex items-center gap-3">
                <Search className="text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  defaultValue={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-white rounded-2xl border border-border-sleek">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-text-sleek">No products found</h3>
              <p className="text-sm text-text-light">Try adjusting your filters or search term</p>
            </div>
            <button 
              onClick={() => {
                setCategory('All');
                setSearch('');
              }}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
