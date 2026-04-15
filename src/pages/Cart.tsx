import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id: number, name: string) => {
    dispatch(removeFromCart(id));
    toast.error(`${name} removed from cart`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center space-y-8">
        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto">
          <ShoppingBag className="w-16 h-16" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold text-slate-900">Your cart is empty</h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our collection and find something you love!
          </p>
        </div>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2 py-4 px-10 text-lg">
          Start Shopping <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-4xl font-display font-bold mb-12">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-center gap-6"
              >
                <Link to={`/product/${item.id}`} className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-xl font-display font-bold text-slate-900 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-slate-500 font-medium">${item.price}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
                    <div className="flex items-center bg-slate-100 rounded-xl p-1">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id, item.name)}
                      className="text-red-400 hover:text-red-600 p-2 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <p className="text-xl font-display font-bold text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 space-y-8 sticky top-24">
          <h2 className="text-2xl font-display font-bold">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping</span>
              <span className="font-bold text-green-500">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Estimated Tax</span>
              <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-display font-bold text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="w-full btn-primary py-5 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
          >
            Proceed to Checkout <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-slate-500 text-sm">
            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
            <p>Your transaction is secure and encrypted with 256-bit SSL technology.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
