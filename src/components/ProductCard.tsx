import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { RootState } from '../redux/store';
import { Product } from '../redux/slices/productSlice';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }));
    if (isWishlisted) {
      toast.error('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-xl border border-border-sleek p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-sleek hover:border-primary cursor-pointer"
    >
      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={cn(
          "absolute top-5 right-5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
          isWishlisted ? "bg-red-500 text-white" : "bg-white/80 backdrop-blur-md text-slate-400 hover:text-red-500"
        )}
      >
        <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50 rounded-lg mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </Link>

      {/* Content */}
      <div className="space-y-1">
        <Link to={`/product/${product.id}`}>
          <h4 className="text-sm font-bold text-text-sleek line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h4>
        </Link>
        <p className="text-[13px] text-text-light line-clamp-1">
          {product.category}
        </p>
        
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-accent fill-current" />
            <span className="text-xs font-bold text-accent">{product.rating}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-2 py-2 bg-slate-100 text-text-sleek rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
