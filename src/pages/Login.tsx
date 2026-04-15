import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, ArrowRight, Loader2, Github, Chrome } from 'lucide-react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { login } from '../redux/slices/authSlice';
import { apiService } from '../services/apiService';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiService.login(formData.email, formData.password);
      dispatch(login(response));
      toast.success('Welcome back to Klyro!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[80vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
      >
        <div className="text-center space-y-4 mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto shadow-lg shadow-primary/20">
            K
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500">Enter your details to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </InputAdornment>
                ),
                sx: { borderRadius: '1rem' }
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </InputAdornment>
                ),
                sx: { borderRadius: '1rem' }
              }
            }}
          />

          <Button
            fullWidth
            type="submit"
            disabled={isLoading}
            variant="contained"
            size="large"
            sx={{
              py: 2,
              borderRadius: '1rem',
              backgroundColor: '#2ab0bf',
              '&:hover': { backgroundColor: '#218d99' },
              textTransform: 'none',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              boxShadow: '0 10px 15px -3px rgba(42, 176, 191, 0.2)'
            }}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">Sign In <ArrowRight className="w-5 h-5" /></span>
            )}
          </Button>
        </form>

        <div className="mt-10 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm text-slate-700">
              <Chrome className="w-4 h-4" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm text-slate-700">
              <Github className="w-4 h-4" /> GitHub
            </button>
          </div>

          <p className="text-center text-slate-500 text-sm">
            Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
