import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export default function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 flex flex-col items-center text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-green-500"
      >
        <CheckCircle2 className="w-16 h-16" />
      </motion.div>

      <div className="space-y-4 max-w-lg">
        <h1 className="text-5xl font-display font-bold text-slate-900">Order Confirmed!</h1>
        <p className="text-slate-500 text-lg">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm w-full max-w-md space-y-6">
        <div className="flex justify-between items-center pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-primary" />
            <span className="font-bold text-slate-700">Order ID</span>
          </div>
          <span className="font-mono font-bold text-slate-900">#{orderId}</span>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            We've sent a confirmation email to your inbox with all the details and tracking information.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/orders" className="btn-primary py-4 flex items-center justify-center gap-2">
              Track My Order <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/products" className="btn-secondary py-4 flex items-center justify-center gap-2">
              Continue Shopping <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
