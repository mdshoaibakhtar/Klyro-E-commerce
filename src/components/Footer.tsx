import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-sleek pt-16 pb-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-black tracking-tighter text-primary">
              KLYRO
            </span>
          </Link>
          <p className="text-text-light text-sm leading-relaxed">
            Your one-stop destination for premium products. We bring you the best quality and the latest trends at unbeatable prices.
          </p>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 bg-slate-50 border border-border-sleek rounded-lg flex items-center justify-center text-text-light hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-text-sleek text-sm font-bold uppercase tracking-wider mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/products" className="text-text-light hover:text-primary transition-colors">Shop All</Link></li>
            <li><Link to="/categories" className="text-text-light hover:text-primary transition-colors">Categories</Link></li>
            <li><Link to="/wishlist" className="text-text-light hover:text-primary transition-colors">Wishlist</Link></li>
            <li><Link to="/cart" className="text-text-light hover:text-primary transition-colors">My Cart</Link></li>
            <li><Link to="/orders" className="text-text-light hover:text-primary transition-colors">Order Tracking</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-text-sleek text-sm font-bold uppercase tracking-wider mb-6">Support</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="text-text-light hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" className="text-text-light hover:text-primary transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="text-text-light hover:text-primary transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="text-text-light hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-text-light hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-text-sleek text-sm font-bold uppercase tracking-wider mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-text-light">123 Tech Avenue, Silicon Valley, CA 94025</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span className="text-text-light">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span className="text-text-light">support@klyro.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border-sleek flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-light font-bold">
        <p>© 2026 KLYRO E-COMMERCE. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3 opacity-30 grayscale hover:grayscale-0 transition-all" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 opacity-30 grayscale hover:grayscale-0 transition-all" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-3 opacity-30 grayscale hover:grayscale-0 transition-all" />
        </div>
      </div>
    </footer>
  );
}
