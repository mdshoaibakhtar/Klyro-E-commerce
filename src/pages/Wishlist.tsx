import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { RootState } from '../redux/store';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.wishlist);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    }));
    toast.success(`${item.name} added to cart!`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center space-y-8">
        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto">
          <Heart className="w-16 h-16" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold text-slate-900">Your wishlist is empty</h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Save items you love to your wishlist and they'll appear here.
          </p>
        </div>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2 py-4 px-10 text-lg">
          Explore Products <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-4xl font-display font-bold mb-12">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button 
                  onClick={() => dispatch(toggleWishlist(item))}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 line-clamp-1">{item.name}</h3>
                  <p className="text-xl font-display font-bold text-primary">${item.price}</p>
                </div>
                
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
