import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStore, FaCreditCard, FaUserCircle, FaCopy, FaCheck, FaTimes, FaInfoCircle, FaLock } from 'react-icons/fa';
import Transition from '../../components/Transition';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeft, FaMinus, FaPlus, FaTrash } from 'react-icons/fa6';

const Partners = () => {
  const navigate = useNavigate();
  const [activeShop, setActiveShop] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const codeInputRefs = useRef(Array(6).fill(null));

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // if (!loggedIn) {
    //   navigate('/auth/login');
    // }
  }, [navigate]);

  // Dummy shops data
  const shops = [
    {
      id: 1,
      name: 'iTicket.az',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMhhpud6M2UphIRlOY7FnPtNNbgwY5XSSQZg&s',
      category: 'Entertainment',
      products: [
        { id: 101, name: 'Concert Ticket - Mugham Night', price: 35, image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 102, name: 'Movie Ticket - Premiere', price: 15, image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 103, name: 'Theater Show - Classic Drama', price: 45, image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 104, name: 'Football Match - Premier League', price: 60, image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
      ]
    },
    {
      id: 2,
      name: 'Hesab.az',
      logo: 'https://fed.az/upload/news/2092841.jpg',
      category: 'Utilities',
      products: [
        { id: 201, name: 'Electricity Bill Payment', price: 45.50, image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 202, name: 'Water Bill Payment', price: 28.75, image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 203, name: 'Internet Service - Monthly', price: 39.99, image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 204, name: 'Mobile Top-up', price: 20, image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
      ]
    },
    {
      id: 3,
      name: 'Kontakt Home',
      logo: 'https://abb-bank.az/storage/uploads/files/1732027339_proekt-51.png?v=1053',
      category: 'Electronics',
      products: [
        { id: 301, name: 'Smartphone - Latest Model', price: 899, image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 302, name: 'Laptop - Business Series', price: 1299, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 303, name: 'Smart TV - 55" 4K', price: 749, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 304, name: 'Wireless Headphones', price: 199, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
      ]
    },
    {
      id: 4,
      name: 'Bravo Supermarket',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Bravo_Supermarketl%C9%99r_%C5%9E%C9%99b%C9%99k%C9%99si.jpg',
      category: 'Groceries',
      products: [
        { id: 401, name: 'Fresh Produce Basket', price: 45, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 402, name: 'Gourmet Cheese Selection', price: 32, image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 403, name: 'Premium Coffee Beans', price: 18, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { id: 404, name: 'Organic Meat Package', price: 65, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
      ]
    }
  ];

  const addToCart = (product) => {
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
      // If product exists, increase quantity
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // Add new product to cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Show toast notification
    toast.success(`${product.name} səbətə əlavə edildi!`, {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#d4edda',
        color: '#155724',
        border: '1px solid #c3e6cb',
        padding: '16px',
        borderRadius: '8px',
        fontFamily: 'Inter, sans-serif',
      },
      iconTheme: {
        primary: '#007d56',
        secondary: '#FFFFFF',
      },
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowPaymentModal(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setVerificationError('');
  };
  
  // Handle code input change
  const handleCodeChange = (index, value) => {
    if (value.length > 1) {
      // If pasting multiple digits
      const pastedValue = value.replace(/[^0-9]/g, '');
      const newOtp = otpCode.split('');
      
      // Fill in the current and subsequent inputs
      for (let i = 0; i < pastedValue.length && index + i < 6; i++) {
        newOtp[index + i] = pastedValue[i];
      }
      
      setOtpCode(newOtp.join(''));
      
      // Focus on the appropriate input after pasting
      const nextIndex = Math.min(index + pastedValue.length, 5);
      if (nextIndex < 6) {
        codeInputRefs.current[nextIndex].focus();
      }
    } else {
      // Single digit input
      const newOtp = otpCode.split('');
      newOtp[index] = value;
      setOtpCode(newOtp.join(''));
      
      // Auto-focus next input
      if (value && index < 5) {
        codeInputRefs.current[index + 1].focus();
      }
    }
  };
  
  // Handle backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      // Focus previous input when backspace is pressed on an empty input
      codeInputRefs.current[index - 1].focus();
    }
  };
  
  // Verify payment
  const verifyPayment = () => {
    setIsVerifying(true);
    setVerificationError('');
    
    // Calculate total cart amount
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Get saved code and amount from localStorage
      const savedCode = localStorage.getItem('tempCode');
      const savedAmount = localStorage.getItem('paymentAmount');
      const savedExpiry = localStorage.getItem('codeExpiry');
      const now = new Date().getTime();
      
      // Check if code exists and is not expired
      if (!savedCode || !savedExpiry || parseInt(savedExpiry) < now) {
        setVerificationError('Invalid or expired code. Please generate a new code.');
        setIsVerifying(false);
        return;
      }
      
      // Check if code matches
      if (otpCode !== savedCode) {
        setVerificationError('Invalid verification code. Please try again.');
        setIsVerifying(false);
        return;
      }
      
      // Check if amount is sufficient
      if (savedAmount && parseFloat(savedAmount) < cartTotal) {
        setVerificationError(`Payment amount (${parseFloat(savedAmount).toFixed(2)}₼) is less than cart total (${cartTotal.toFixed(2)}₼). Please generate a code with sufficient amount.`);
        setIsVerifying(false);
        return;
      }
      
      // If all checks pass, process payment
      setIsVerifying(false);
      setOrderSuccess(true);
      setCart([]);
      
      // Set payment success flag and amounts in localStorage
      localStorage.setItem('paymentSuccess', 'true');
      localStorage.setItem('paymentAmount', savedAmount); // Keep amount for success message
      localStorage.setItem('orderAmount', cartTotal.toString()); // Store order amount for refund calculation
      
      // Clear payment code data
      localStorage.removeItem('tempCode');
      localStorage.removeItem('codeExpiry');
      
      // Show success toast
      toast.success('Payment successful!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
          borderRadius: '8px',
          padding: '16px'
        },
        icon: '✅'
      });
    }, 1500);
  };

  const verifyOTP = () => {
    setIsProcessing(true);
    
    // Get the stored OTP from localStorage
    const storedOTP = localStorage.getItem('tempCode');
    const expiryTime = localStorage.getItem('codeExpiry');
    const now = new Date().getTime();
    
    // Check if OTP exists, hasn't expired, and matches input
    if (storedOTP && expiryTime && now < parseInt(expiryTime) && otpCode === storedOTP) {
      // Successful payment
      setTimeout(() => {
        setIsProcessing(false);
        setOrderSuccess(true);
        
        // Calculate cart total
        const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Set payment success flag and amounts in localStorage
        const savedAmount = localStorage.getItem('paymentAmount');
        localStorage.setItem('paymentSuccess', 'true');
        localStorage.setItem('orderAmount', cartTotal.toString()); // Store order amount for refund calculation
        
        // Clear payment code data
        localStorage.removeItem('tempCode');
        localStorage.removeItem('codeExpiry');
        
        // Clear cart after successful payment
        setCart([]);
      }, 2000);
    } else {
      // Failed payment
      setTimeout(() => {
        setIsProcessing(false);
        alert('Invalid or expired code. Please try again.');
      }, 2000);
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentMethod('');
    setOtpCode('');
    setOrderSuccess(false);
    setVerificationError('');
  };

  // if (!isLoggedIn) {
  //   return <div>Redirecting to login...</div>;
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      {/* Header */}
      <header className="bg-[#007d56] text-white shadow-lg sticky top-0 z-50">
        <div className="mx-auto px-4 md:px-8 lg:px-16 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
            <div className="bg-white rounded-full p-2 mr-2 w-36 md:w-44">
              <img src="/logo.png" alt="PashaMood" className="h-full w-full object-cover" />
            </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <FaUserCircle className="mr-2" size={20} />
              <span className="hidden md:inline">My Profile</span>
            </button>
            <button 
              onClick={() => setShowCart(true)}
              className="relative bg-[#005a3e] hover:bg-[#004530] px-4 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center group"
            >
              <FaShoppingCart className="mr-2 group-hover:scale-110 transition-transform" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c50b30] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Shop Categories */}
      <div className="bg-white py-6 shadow-sm border-b border-gray-200">
        <div className="mx-auto px-4 md:px-8 lg:px-16 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-x-6 min-w-max">
            {shops.map(shop => (
              <div 
                key={shop.id} 
                onClick={() => setActiveShop(shop)}
                className={`flex flex-col items-center py-2 gap-y-2 cursor-pointer transition-all duration-200 ${activeShop?.id === shop.id ? 'transform scale-105' : 'opacity-70 hover:opacity-100'}`}
              >
                <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${activeShop?.id === shop.id ? 'border-[#007d56] shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                  <img 
                    src={shop.logo} 
                    alt={shop.name} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100?text=Logo';
                    }}
                  />
                </div>
                <span className={`whitespace-nowrap text-sm font-medium ${activeShop?.id === shop.id ? 'text-[#007d56]' : 'text-gray-600'}`}>{shop.name}</span>
                {activeShop?.id === shop.id && <div className="h-1 w-10 bg-[#007d56] rounded-full"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto lg:px-16 px-8 py-8">
        {activeShop ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center h-16">
                <img 
                  src={activeShop.logo} 
                  alt={activeShop.name} 
                  className="h-full w-full object-contain mr-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150x50?text=' + activeShop.name;
                  }}
                />
              </div>
              <button 
                onClick={() => setActiveShop(null)}
                className="text-[#007d56] hover:text-[#005a3e] font-medium"
              >
                ← Back to Partners
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
              {activeShop.products.map(product => (
                <div key={product.id} className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full cursor-pointer bg-white/90 hover:bg-white text-[#007d56] font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors backdrop-blur-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-[#007d56] transition-colors line-clamp-2">{product.name}</h3>
                      <span className="bg-[#e6f2ee] text-[#007d56] font-bold px-3 py-1 rounded-full text-sm ml-2 whitespace-nowrap">₼{product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2 mt-2">{product.description || `Premium quality ${product.name.toLowerCase()} available now with fast delivery.`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-[#007d56]">Our Partners</h1>
            <p className="text-gray-600 mb-8">Shop with our trusted partners and pay securely with PashaMood.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shops.map(shop => (
                <div 
                  key={shop.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveShop(shop)}
                >
                  <div className="h-36 flex items-center justify-center p-4">
                    <img 
                      src={shop.logo} 
                      alt={shop.name} 
                      className="h-full max-h-16 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200x100?text=' + shop.name;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{shop.name}</h3>
                    <p className="text-gray-500 text-sm">{shop.category}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-600">{shop.products.length} products</span>
                      <button className="text-[#007d56] hover:text-[#005a3e] text-sm font-medium flex items-center">
                        <FaStore className="mr-1" /> Visit Shop
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="p-6 bg-gradient-to-r from-[#007d56] to-[#005a3e] text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center">
                <FaShoppingCart className="mr-3" />
                Your Cart
              </h2>
              <button 
                onClick={() => setShowCart(false)} 
                className="text-white hover:text-gray-200 bg-white/20 rounded-full p-2 transition-all hover:bg-white/30"
              >
                <FaTimes size={16} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <FaShoppingCart className="text-gray-400 text-3xl" />
                  </div>
                  <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="px-6 py-2 bg-[#007d56] text-white rounded-lg hover:bg-[#005a3e] transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex border-b border-gray-100 pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="relative w-20 h-20 overflow-hidden rounded-xl mr-4 border border-gray-200">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/80?text=Product';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-[#007d56] font-bold">₼{item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center bg-gray-100 rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-gray-700 disabled:opacity-50 h-8 w-8 flex items-center justify-center rounded-l-lg hover:bg-gray-200 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="mx-3 font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-gray-700 h-8 w-8 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition-colors"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-gray-400 hover:text-red-500 h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-bold">₼{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Delivery:</span>
                <span className="text-[#007d56] font-medium">Free</span>
              </div>
              <div className="h-px bg-gray-200 mb-4"></div>
              <div className="flex justify-between mb-6">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">₼{calculateTotal().toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center text-lg ${
                  cart.length === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-[#007d56] hover:bg-[#005a3e] text-white'
                }`}
              >
                <FaCreditCard className="mr-2" />
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
          <div className="absolute inset-0  bg-opacity-60 backdrop-blur-sm" onClick={closePaymentModal}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-auto transform transition-all duration-300">
            {orderSuccess ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Payment Successful!</h3>
                <p className="text-gray-600 mb-6 text-lg">Your order has been placed successfully.</p>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-gray-600">
                    PashaMood code verification was successful. Thank you for your purchase!
                  </p>
                </div>
                <button
                  onClick={closePaymentModal}
                  className="bg-[#007d56] hover:bg-[#005a3e] text-white px-8 py-3 rounded-xl transition-colors text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div>
                <div className="p-6 bg-gradient-to-r from-[#007d56] to-[#005a3e] text-white rounded-t-2xl">
                  <h2 className="text-xl font-bold flex items-center">
                    <FaCreditCard className="mr-3" />
                    Complete Your Purchase
                  </h2>
                </div>
                <div className="p-8">
                  {!paymentMethod ? (
                    <div className="p-8">
                      <h3 className="font-medium mb-4 text-lg">Select Payment Method</h3>
                      <div className="space-y-3">
                        <button 
                          onClick={() => handlePaymentMethodSelect('visa')}
                          className="w-full p-4 border border-gray-200 rounded-xl flex items-center hover:bg-gray-50 transition-colors group"
                        >
                          <div className="bg-blue-50 rounded-lg p-2 mr-4 group-hover:bg-blue-100 transition-colors h-10">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-full w-full object-contain" />
                          </div>
                          <span className="font-medium">Pay with Visa</span>
                        </button>
                        <button 
                          onClick={() => handlePaymentMethodSelect('mastercard')}
                          className="w-full p-4 border border-gray-200 rounded-xl flex items-center hover:bg-gray-50 transition-colors group"
                        >
                          <div className="bg-red-50 rounded-lg p-2 mr-4 group-hover:bg-red-100 transition-colors h-10">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-full w-full object-contain" />
                          </div>
                          <span className="font-medium">Pay with Mastercard</span>
                        </button>
                        <button 
                          onClick={() => handlePaymentMethodSelect('paypal')}
                          className="w-full p-4 border border-gray-200 rounded-xl flex items-center hover:bg-gray-50 transition-colors group"
                        >
                          <div className="bg-blue-50 rounded-lg p-2 mr-4 group-hover:bg-blue-100 transition-colors h-10">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" alt="PayPal" className="h-full w-full object-contain" />
                          </div>
                          <span className="font-medium">Pay with PayPal</span>
                        </button>
                        <button 
                          onClick={() => handlePaymentMethodSelect('pashamood')}
                          className="w-full p-4 border-2 border-[#e6f2ee] rounded-xl flex items-center hover:bg-[#f5fbf9] transition-colors group bg-white shadow-sm"
                        >
                          <div className="bg-blue-50 rounded-lg p-2 mr-4 group-hover:bg-blue-100 transition-colors h-10">
                            <img src="./logo.png" alt="PayPal" className="h-full w-full object-contain" />
                          </div>
                          <span className="font-medium text-[#007d56]">Pay with PashaMood</span>
                        </button>
                      </div>
                    </div>
                  ) : paymentMethod === 'pashamood' ? (
                    <div className="">
                      <button 
                        onClick={() => setPaymentMethod('')}
                        className="text-[#007d56] hover:text-[#005a3e] font-medium mb-6 flex items-center px-4 py-2 rounded-lg hover:bg-[#f5fbf9] transition-all"
                      >
                        <FaArrowLeft className="mr-2" />
                        Back to payment methods
                      </button>
                      
                      <div className="bg-[#f5fbf9] p-4 rounded-xl mb-6">
                        <h3 className="font-medium mb-2 flex items-center text-[#007d56]">
                          <FaInfoCircle className="mr-2" />
                          Enter PashaMood Code
                        </h3>
                        <p className="text-gray-600">
                          Enter the 6-digit code generated in your PashaMood app to complete your purchase securely.
                        </p>
                      </div>
                      
                      {isProcessing ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007d56] mx-auto mb-4"></div>
                          <p className="text-gray-600">Verifying your payment...</p>
                        </div>
                      ) : (
                        <>
                          <div className="mb-6">
                            <div className="flex justify-center space-x-3">
                              {Array(6).fill().map((_, index) => (
                                <input
                                  key={index}
                                  type="text"
                                  maxLength="6"
                                  value={otpCode[index] || ''}
                                  onChange={(e) => handleCodeChange(index, e.target.value)}
                                  onKeyDown={(e) => handleKeyDown(e, index)}
                                  ref={el => codeInputRefs.current[index] = el}
                                  className="w-12 h-14 border-2 border-gray-300 rounded-lg text-center text-xl font-bold focus:border-[#007d56] focus:ring-2 focus:ring-[#e6f2ee] focus:outline-none transition-all shadow-sm"
                                  onPaste={(e) => {
                                    e.preventDefault();
                                    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
                                    const newOtp = otpCode.split('');
                                    
                                    // Fill in the inputs starting from current position
                                    for (let i = 0; i < pasteData.length && index + i < 6; i++) {
                                      newOtp[index + i] = pasteData[i];
                                    }
                                    
                                    setOtpCode(newOtp.join(''));
                                    
                                    // Focus on the last input or the next empty one
                                    const nextIndex = Math.min(index + pasteData.length, 5);
                                    if (nextIndex < 6) {
                                      codeInputRefs.current[nextIndex].focus();
                                    }
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          {verificationError && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-lg mt-4 mb-4 text-center">
                              <p>{verificationError}</p>
                            </div>
                          )}
                          
                          <button
                            onClick={verifyPayment}
                            disabled={otpCode.length !== 6 || isVerifying}
                            className={`w-full py-3 rounded-xl font-medium flex items-center justify-center text-lg transition-all ${
                              otpCode.length !== 6 || isVerifying
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#007d56] hover:bg-[#005a3e] text-white shadow-md hover:shadow-lg transform hover:-translate-y-1'
                            }`}
                          >
                            {isVerifying ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                              </>
                            ) : (
                              <>
                                <FaLock className="mr-2" />
                                Verify & Pay
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div>
                      <button 
                        onClick={() => setPaymentMethod('')}
                        className="text-[#007d56] hover:text-[#005a3e] font-medium mb-4 flex items-center"
                      >
                        ← Back to payment methods
                      </button>
                      
                      <p className="text-center text-gray-500 py-8">
                        This payment method is not implemented in this demo.
                        <br />
                        Please use PashaMood payment.
                      </p>
                      
                      <button
                        onClick={() => setPaymentMethod('pashamood')}
                        className="w-full py-3 rounded-lg font-medium bg-[#007d56] hover:bg-[#005a3e] text-white"
                      >
                        Try PashaMood Instead
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TransitionedPartners = Transition(Partners);
export default TransitionedPartners;
