import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStore, FaCreditCard, FaUserCircle, FaCopy, FaCheck } from 'react-icons/fa';
import Transition from '../../components/Transition';
import toast, { Toaster } from 'react-hot-toast';

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
      position: 'top-right',
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
  };

  // if (!isLoggedIn) {
  //   return <div>Redirecting to login...</div>;
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      {/* Header */}
      <header className="bg-[#007d56] text-white shadow-lg">
        <div className="container mx-auto px-16 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-2 w-44">
              <img src="/logo.png" alt="PashaMood" className="h-full w-full object-cover" />
            </div>
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
              className="relative bg-[#005a3e] hover:bg-[#004530] px-4 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c50b30] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeShop.products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-[#007d56] font-bold">₼{product.price.toFixed(2)}</p>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-[#007d56] hover:bg-[#005a3e] text-white px-3 py-1 rounded-lg cursor-pointer transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
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
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="p-4 bg-[#007d56] text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setShowCart(false)} className="text-white hover:text-gray-200">
                &times;
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <FaShoppingCart className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex border-b border-gray-100 pb-4">
                      <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
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
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-[#007d56] font-bold">₼{item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 rounded-l-md w-8 h-8 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="bg-gray-100 w-10 h-8 flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-gray-300 rounded-r-md w-8 h-8 flex items-center justify-center"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-[#007d56]">₼{calculateTotal().toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full py-3 rounded-lg font-medium ${
                  cart.length === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-[#007d56] hover:bg-[#005a3e] text-white'
                }`}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closePaymentModal}></div>
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-auto">
            {orderSuccess ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
                <p className="text-sm text-gray-500 mb-6">
                  PashaMood code verification was successful. Thank you for your purchase!
                </p>
                <button
                  onClick={closePaymentModal}
                  className="bg-[#007d56] hover:bg-[#005a3e] text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="p-4 bg-[#007d56] text-white rounded-t-xl">
                  <h2 className="text-xl font-bold">Complete Your Payment</h2>
                  <p className="text-sm opacity-80">Total: ₼{calculateTotal().toFixed(2)}</p>
                </div>
                
                <div className="p-6">
                  {!paymentMethod ? (
                    <div>
                      <h3 className="font-medium mb-4">Select Payment Method</h3>
                      <div className="space-y-3">
                        <button 
                          onClick={() => handlePaymentMethodSelect('visa')}
                          className="w-full p-3 border border-gray-200 rounded-lg flex items-center hover:bg-gray-50"
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8 mr-3" />
                          <span>Pay with Visa</span>
                        </button>
                        <button 
                          onClick={() => handlePaymentMethodSelect('mastercard')}
                          className="w-full p-3 border border-gray-200 rounded-lg flex items-center hover:bg-gray-50"
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8 mr-3" />
                          <span>Pay with Mastercard</span>
                        </button>
                        <button 
                          onClick={() => handlePaymentMethodSelect('paypal')}
                          className="w-full p-3 border border-gray-200 rounded-lg flex items-center hover:bg-gray-50"
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" alt="PayPal" className="h-8 mr-3" />
                          <span>Pay with PayPal</span>
                        </button>
                        <button 
                          onClick={() => handlePaymentMethodSelect('pashamood')}
                          className="w-full p-3 border border-gray-200 rounded-lg flex items-center hover:bg-gray-50"
                        >
                          <div className="bg-[#007d56] text-white rounded-full h-8 w-8 flex items-center justify-center mr-3">
                            <FaCreditCard />
                          </div>
                          <span>Pay with PashaMood</span>
                        </button>
                      </div>
                    </div>
                  ) : paymentMethod === 'pashamood' ? (
                    <div>
                      <button 
                        onClick={() => setPaymentMethod('')}
                        className="text-[#007d56] hover:text-[#005a3e] font-medium mb-4 flex items-center"
                      >
                        ← Back to payment methods
                      </button>
                      
                      <h3 className="font-medium mb-2">Enter PashaMood Code</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Enter the 6-digit code generated in your PashaMood app
                      </p>
                      
                      {isProcessing ? (
                        <div className="text-center py-6">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007d56] mx-auto mb-4"></div>
                          <p className="text-gray-600">Verifying your payment...</p>
                        </div>
                      ) : (
                        <>
                          <div className="mb-6">
                            <input
                              type="text"
                              maxLength="6"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                              placeholder="Enter 6-digit code"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007d56] focus:border-[#007d56] text-center text-2xl tracking-widest"
                            />
                          </div>
                          
                          <button
                            onClick={verifyOTP}
                            disabled={otpCode.length !== 6}
                            className={`w-full py-3 rounded-lg font-medium ${
                              otpCode.length !== 6
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#007d56] hover:bg-[#005a3e] text-white'
                            }`}
                          >
                            Verify & Pay
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TransitionedPartners = Transition(Partners);
export default TransitionedPartners;
