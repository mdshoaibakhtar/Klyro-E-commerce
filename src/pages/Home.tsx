import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, RefreshCcw } from 'lucide-react';
import { apiService } from '../services/apiService';
import { Product } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton, CategorySkeleton } from '../components/SkeletonLoader';
import { motion } from 'motion/react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Premium E-commerce');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          apiService.getProducts(),
          apiService.getCategories()
        ]);
        setProducts(productsRes);
        setCategories(categoriesRes);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredProducts = products.filter(p => p.featured);
  const trendingProducts = products.filter(p => p.trending);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="px-4 md:px-10">
        <div className="max-w-7xl mx-auto h-[220px] bg-linear-to-br from-[#2ab0bf] to-[#1e848f] rounded-[20px] relative flex items-center px-12 overflow-hidden shadow-lg shadow-primary/30">
          <div className="relative z-10 space-y-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              The Future of Sound
            </h2>
            <p className="text-white/80 text-lg">
              Experience ultra-high fidelity with the new Klyro Pro Max Series.
            </p>
            <Link to="/products" className="inline-block bg-white text-primary px-8 py-2.5 rounded-full font-bold mt-4 hover:bg-slate-50 transition-all active:scale-95">
              Explore Collection
            </Link>
          </div>
          {/* Decorative element */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 text-9xl opacity-10 select-none pointer-events-none hidden md:block">
            🎧
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $500" },
            { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
            { icon: RefreshCcw, title: "Easy Returns", desc: "30-day money back" },
            { icon: Zap, title: "Priority Support", desc: "24/7 expert help" }
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-xl border border-border-sleek shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-sleek">{feature.title}</h3>
                <p className="text-xs text-text-light">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Shop by Category</h2>
              <p className="text-slate-500">Explore our wide range of collections</p>
            </div>
            <Link to="/categories" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {loading ? (
              Array(5).fill(0).map((_, i) => <CategorySkeleton key={i} />)
            ) : (
              categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/products?category=${cat.name}`}
                  className="group flex flex-col items-center gap-4"
                >
                  <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-slate-100">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <span className="text-white font-display font-bold text-lg">{cat.name}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 md:px-8 bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Featured Products</h2>
              <p className="text-slate-500">Handpicked items just for you</p>
            </div>
            <Link to="/products" className="btn-secondary">
              Shop All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
            ) : (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Trending Now</h2>
              <p className="text-slate-500">What everyone is talking about</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
            ) : (
              trendingProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto bg-primary rounded-[2.5rem] p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Join the Klyro Community</h2>
            <p className="text-white/80 text-lg">
              Subscribe to our newsletter and get 10% off your first order plus early access to new drops.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white rounded-xl px-6 py-4 outline-none focus:ring-4 focus:ring-white/20 transition-all"
                required
              />
              <button type="submit" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
