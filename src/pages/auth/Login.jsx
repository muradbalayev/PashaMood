import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Transition from '../../components/Transition';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    // For hackathon demo purposes, we're just setting a flag in localStorage
    // In a real app, you would make an API call to authenticate
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', formData.email);
    
    // Redirect to profile page
    navigate('/profile');
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50 to-[#e6f2ee] flex items-center justify-center px-4 py-12 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#007d56] opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c50b30] opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10">
        {/* Left side - Brand/Image */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#007d56] to-[#005a3e] p-10 flex flex-col justify-between text-white">
          <div>
            <div className=' mx-auto w-64 bg-white rounded-full p-6 mb-4'>
            <img 
              src="/logo.png"  
              alt="Pasha Bank Logo" 
              className="h-full w-full object-cover"
              />
              </div>
            <h2 className="text-3xl font-bold mb-6">Secure Banking Experience</h2>
            <p className="text-gray-100 mb-8">
              Access your account to manage payments, view transactions, and enjoy our secure payment system with maximum protection.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <FaLock className="text-white" />
                </div>
                <p>Enhanced security with 6-digit temporary codes</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <FaUser className="text-white" />
                </div>
                <p>Personalized banking experience</p>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-8 border-t border-white/20">
            <p className="text-sm text-gray-200">
              &copy; {new Date().getFullYear()} Pasha Bank. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 p-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-600">Sign in to access your secure payment dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-[#ffeded] text-[#c50b30] rounded-lg text-sm border-l-4 border-[#c50b30]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className ="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007d56] focus:border-[#007d56] transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007d56] focus:border-[#007d56] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#007d56] focus:ring-[#007d56] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#007d56] hover:bg-[#005a3e] text-white font-medium py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                  Sign In
                </button>
              </div>
            </form>
{/* 
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-[#c50b30] hover:text-[#a80929] font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const TransitionedLogin = Transition(Login);
export default TransitionedLogin;
