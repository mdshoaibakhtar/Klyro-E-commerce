import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Shield, Truck, RefreshCcw, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { RootState } from '../redux/store';
import { apiService } from '../services/apiService';
import { Product } from '../redux/slices/productSlice';
import { Skeleton } from '../components/SkeletonLoader';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState<Product | null>(null);
  useDocumentTitle(product?.name || 'Product Details');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === Number(id));

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await apiService.getProductById(Number(id));
        if (data) {
          setProduct(data);
        } else {
          toast.error('Product not found');
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        }));
      }
      toast.success(`${quantity} ${product.name} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-3xl" />
          <div className="space-y-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-14 w-32" />
              <Skeleton className="h-14 flex-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 shadow-sm"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "aspect-square rounded-2xl overflow-hidden border-2 transition-all",
                  activeImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img 
                  src={`${product.image}?sig=${i}`} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="font-bold text-slate-700">{product.rating}</span>
                <span className="text-slate-400 text-sm">({product.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-display font-bold text-slate-900">${product.price}</span>
              <span className="text-slate-400 line-through text-xl">${(product.price * 1.2).toFixed(2)}</span>
              <span className="text-green-500 font-bold">20% OFF</span>
            </div>
          </div>

          <p className="text-slate-500 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-slate-100 rounded-2xl p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={() => dispatch(toggleWishlist({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image
                }))}
                className={cn(
                  "flex-1 h-14 rounded-2xl border flex items-center justify-center gap-2 font-bold transition-all",
                  isWishlisted ? "bg-red-50 border-red-100 text-red-500" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                )}
              >
                <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full h-16 btn-primary flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/20"
            >
              <ShoppingCart className="w-6 h-6" /> Add to Cart
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-6 h-6 text-primary" />
              <span className="text-xs font-bold text-slate-600">Free Express Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xs font-bold text-slate-600">2 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCcw className="w-6 h-6 text-primary" />
              <span className="text-xs font-bold text-slate-600">30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-24 space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-display font-bold">Customer Reviews</h2>
          <button className="btn-secondary">Write a Review</button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "Alex Johnson", rating: 5, date: "2 days ago", comment: "Absolutely love these! The sound quality is unmatched and they look so sleek." },
            { name: "Sarah Williams", rating: 4, date: "1 week ago", comment: "Great product, very comfortable for long hours. Shipping was a bit slow though." }
          ].map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{review.name}</p>
                    <p className="text-xs text-slate-400">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} className={cn("w-3 h-3", j < review.rating ? "text-amber-400 fill-current" : "text-slate-200")} />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
