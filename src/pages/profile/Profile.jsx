import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaQrcode, FaCreditCard, FaHistory, FaChartPie, FaRobot, FaCopy, FaCheck } from 'react-icons/fa';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import Transition from '../../components/Transition';
import MistralChatbot from '../../components/chatbot/MistralChatbot';
import { FaMoneyBill } from 'react-icons/fa6';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tempCode, setTempCode] = useState('');
  const [codeTimeLeft, setCodeTimeLeft] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successAmount, setSuccessAmount] = useState('');
  const intervalRef = useRef(null);
  
  // Load saved payment data from localStorage if available
  useEffect(() => {
    const savedPaymentAmount = localStorage.getItem('paymentAmount');
    const savedTempCode = localStorage.getItem('tempCode');
    const savedCodeExpiry = localStorage.getItem('codeExpiry');
    const paymentSuccess = localStorage.getItem('paymentSuccess');
    const orderAmount = localStorage.getItem('orderAmount');
    
    // Check if payment was successful
    if (paymentSuccess === 'true' && savedPaymentAmount) {
      // Show success modal
      setSuccessAmount(savedPaymentAmount);
      setShowSuccessModal(true);
      
      // Show success toast
      toast.success('Payment completed successfully!', {
        duration: 4000,
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
      
      // Clear payment success flag
      localStorage.removeItem('paymentSuccess');
      localStorage.removeItem('orderAmount');
      
      // Clear any existing code
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTempCode('');
      setShowQRCode(false);
    } else if (savedPaymentAmount) {
      setPaymentAmount(savedPaymentAmount);
    }
    
    if (savedTempCode && savedCodeExpiry && !paymentSuccess) {
      const expiryTime = parseInt(savedCodeExpiry);
      const now = new Date().getTime();
      
      if (expiryTime > now) {
        setTempCode(savedTempCode);
        const secondsLeft = Math.floor((expiryTime - now) / 1000);
        setCodeTimeLeft(secondsLeft);
        startCountdown(secondsLeft);
        setShowQRCode(true);
      } else {
        // Clear expired code
        localStorage.removeItem('tempCode');
        localStorage.removeItem('codeExpiry');
      }
    }
  }, []);

  // User data - in a real app this would come from an API
  const userData = {
    name: 'Murad Balazada ',
    email: localStorage.getItem('userEmail') || 'user@example.com',
    balance: 2450.75,
    currency: '₼',
    recentTransactions: [
      { id: 1, merchant: 'Bravo Supermarket', amount: -45.20, date: '2025-05-29', category: 'Groceries' },
      { id: 2, merchant: 'Netflix', amount: -15.99, date: '2025-05-28', category: 'Entertainment' },
      { id: 3, merchant: 'Salary Deposit', amount: 1200.00, date: '2025-05-25', category: 'Income' },
      { id: 4, merchant: 'Starbucks', amount: -8.50, date: '2025-05-24', category: 'Food' },
      { id: 5, merchant: 'Amazon', amount: -129.99, date: '2025-05-22', category: 'Shopping' },
    ],
    cashbackOffers: [
      { id: 1, merchant: 'Bravo Supermarket', cashback: '5%', expires: '2025-06-15' },
      { id: 2, merchant: 'Starbucks', cashback: '10%', expires: '2025-06-10' },
      { id: 3, merchant: 'Cinema Plus', cashback: '15%', expires: '2025-06-05' },
    ],
    investmentSuggestions: [
      { id: 1, type: 'ETF', name: 'Vanguard Total Stock Market', potential: '+8.2%', risk: 'Medium' },
      { id: 2, type: 'Stock', name: 'Apple Inc.', potential: '+12.5%', risk: 'Medium' },
      { id: 3, type: 'Bond', name: 'Treasury Bond', potential: '+3.5%', risk: 'Low' },
    ]
  };

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // if (!loggedIn) {
    //   navigate('/auth/login');
    // }
  }, [navigate]);

  // Start countdown timer
  const startCountdown = (seconds) => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set initial time
    setCodeTimeLeft(seconds);
    
    // Start new countdown
    intervalRef.current = setInterval(() => {
      setCodeTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setTempCode('');
          localStorage.removeItem('tempCode');
          localStorage.removeItem('codeExpiry');
          localStorage.removeItem('paymentAmount');
          setShowQRCode(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // Generate temporary 6-digit code with amount
  const generateTempCode = () => {
    if (!paymentAmount || isNaN(parseFloat(paymentAmount)) || parseFloat(paymentAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    // Generate a 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setTempCode(code);
    
    // Set expiry time (2 minutes from now)
    const expiryTime = new Date().getTime() + 120000; // current time + 2 minutes in milliseconds
    
    // Save to localStorage
    localStorage.setItem('tempCode', code);
    localStorage.setItem('codeExpiry', expiryTime.toString());
    localStorage.setItem('paymentAmount', paymentAmount);
    
    // Start countdown (120 seconds = 2 minutes)
    startCountdown(120);
    
    // Show QR code
    setShowQRCode(true);
  };

  // Format time left as MM:SS
  const formatTimeLeft = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };
  
  // Generate QR code with payment information
  const generateQRCode = () => {
    // TO DO: implement QR code generation
  };



  // Close success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    localStorage.removeItem('paymentAmount');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#007d56] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
            <div className="bg-white rounded-full p-3 mr-2 w-44">
              <img src="/logo.png" alt="PashaMood" className="h-full w-full object-cover" />
            </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <span className="font-medium">Welcome, {userData.name}</span>
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                navigate('/');
              }}
              className="bg-[#005a3e] hover:bg-[#004530] px-4 py-2 rounded-lg text-sm transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Mobile App Style */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-[#007d56] to-[#005a3e] text-white">
                <h2 className="text-xl font-semibold">Account Balance</h2>
                <p className="text-3xl font-bold mt-2">{userData.currency}{userData.balance.toFixed(2)}</p>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                        activeTab === 'dashboard' ? 'bg-[#e6f2ee] text-[#007d56]' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaChartPie className="mr-3" />
                      Dashboard
                    </button>
                  </li>
                  {/* <li>
                    <button
                      onClick={() => setActiveTab('payments')}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                        activeTab === 'payments' ? 'bg-[#e6f2ee] text-[#007d56]' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaCreditCard className="mr-3" />
                      Payments
                    </button>
                  </li> */}
                  <li>
                    <button
                      onClick={() => setActiveTab('payment')}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                        activeTab === 'payment' ? 'bg-[#e6f2ee] text-[#007d56]' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaMoneyBill className="mr-3" />
                      Payment
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('transactions')}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                        activeTab === 'transactions' ? 'bg-[#e6f2ee] text-[#007d56]' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FaHistory className="mr-3" />
                      Transactions
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-indigo-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-indigo-700 mb-2">Recent Activity</h3>
                      <p className="text-gray-600">Last transaction: {userData.recentTransactions[0].merchant}</p>
                      <p className="text-gray-600">{userData.currency}{Math.abs(userData.recentTransactions[0].amount)}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-green-700 mb-2">Cashback Available</h3>
                      <p className="text-gray-600">Total cashback: {userData.currency}45.30</p>
                      <p className="text-gray-600">New offers: {userData.cashbackOffers.length}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-yellow-700 mb-2">Investment Tips</h3>
                      <p className="text-gray-600">Recommended: {userData.investmentSuggestions[0].name}</p>
                      <p className="text-gray-600">Potential: {userData.investmentSuggestions[0].potential}</p>
                    </div>
                  </div>
                  
                  {/* Recent Transactions */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userData.recentTransactions.map(transaction => (
                            <tr key={transaction.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.merchant}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                                transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {transaction.amount < 0 ? '-' : '+'}{userData.currency}{Math.abs(transaction.amount).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Cashback Offers */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Cashback Offers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {userData.cashbackOffers.map(offer => (
                        <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h4 className="font-semibold text-lg">{offer.merchant}</h4>
                          <p className="text-green-600 font-bold text-xl">{offer.cashback} Cashback</p>
                          <p className="text-gray-500 text-sm">Expires: {offer.expires}</p>
                          <button className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            Activate Offer
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

        

              {/* QR Code Tab */}
              {activeTab === 'payment' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 bg-white rounded-lg"
                >
                  <h2 className="text-2xl font-bold mb-6 text-[#007d56]">Generate Payment Code</h2>
                  <p className="text-gray-600 mb-6">
                    Generate a temporary payment code that can be used for the next 2 minutes.
                  </p>
                  
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                    {showQRCode && tempCode ? (
                      <div className="w-full max-w-md mx-auto">
                        <div className="bg-[#007d56] text-white p-4 rounded-t-xl">
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold">PashaMood Payment</h4>
                            <span className="text-sm bg-white/20 px-2 py-1 rounded">{formatTimeLeft(codeTimeLeft)}</span>
                          </div>
                          <div className="mt-2 text-lg font-semibold">
                            {userData.currency}{parseFloat(paymentAmount).toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-b-xl shadow-md">
                          {/* <div className="flex justify-center mb-6">
                            <div className="bg-white p-3 rounded-lg shadow-md">
                              <QRCode 
                                value={`PashaMood:${tempCode}:${paymentAmount}`} 
                                size={180} 
                                bgColor={"#ffffff"}
                                fgColor={"#007d56"}
                                level={"H"}
                                includeMargin={false}
                              />
                            </div>
                          </div> */}
                          
                          <div className="mb-6">
                            <p className="text-center text-gray-500 mb-2 text-sm">Or use temporary code</p>
                            <div className="flex items-center justify-center">
                              <div className="bg-gray-100 py-3 px-6 rounded-lg text-3xl font-mono tracking-wider text-gray-800 flex items-center">
                                {tempCode}
                                <button 
                                  className="ml-3 text-base text-[#007d56] hover:text-[#005a3e]" 
                                  onClick={() => {
                                    navigator.clipboard.writeText(tempCode);
                                    setCodeCopied(true);
                                    setTimeout(() => setCodeCopied(false), 2000);
                                  }}
                                >
                                  {codeCopied ? <FaCheck /> : <FaCopy />}
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 text-center mb-4">
                            Scan this code with the merchant's app to complete your payment.
                          </p>
                          
                          <button
                            onClick={() => {
                              setShowQRCode(false);
                              setTempCode('');
                              setPaymentAmount('');
                              clearInterval(intervalRef.current);
                              localStorage.removeItem('tempCode');
                              localStorage.removeItem('codeExpiry');
                              localStorage.removeItem('paymentAmount');
                              localStorage.removeItem('paymentSuccess');
                            }}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
                          >
                            Cancel Payment
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full max-w-md">
                        <div className="mb-6">
                          <label htmlFor="amount" className="block text-gray-700 text-sm font-medium mb-2">
                            Payment Amount ({userData.currency})
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <HiOutlineCurrencyDollar className="text-gray-400" />
                            </div>
                            <input
                              id="amount"
                              type="number"
                              min="0.01"
                              step="0.01"
                              value={paymentAmount}
                              onChange={(e) => setPaymentAmount(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007d56] focus:border-[#007d56] transition-colors"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        
                        <button
                          onClick={generateTempCode}
                          className="w-full bg-[#007d56] hover:bg-[#005a3e] text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                        >
                          Generate Payment Code
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'transactions' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
                  
                  {/* Filters */}
                  <div className="mb-6 flex flex-wrap gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">All Categories</option>
                        <option value="groceries">Groceries</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="food">Food & Dining</option>
                        <option value="shopping">Shopping</option>
                        <option value="income">Income</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">
                        Date Range
                      </label>
                      <select
                        id="date-range"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 3 months</option>
                        <option value="365">Last year</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Transactions Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userData.recentTransactions.map(transaction => (
                          <tr key={transaction.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.merchant}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                              transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {transaction.amount < 0 ? '-' : '+'}{userData.currency}{Math.abs(transaction.amount).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Chatbot Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-[#007d56] hover:bg-[#006245] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50"
      >
        <FaRobot className="text-2xl" />
      </button>
      {/* Mistral AI Chatbot Component */}
      <MistralChatbot 
        isOpen={showChatbot} 
        onClose={() => setShowChatbot(false)} 
        userData={userData} 
      />
      {/* Toaster for notifications */}
      <Toaster />
      
      {/* Payment Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">
                Your payment has been successfully processed.
              </p>
              {localStorage.getItem('orderAmount') && parseFloat(successAmount) > parseFloat(localStorage.getItem('orderAmount')) && (
                <div className="bg-blue-50 text-blue-700 p-3 rounded-lg mb-6">
                  <p>
                    <span className="font-semibold">{(parseFloat(successAmount) - parseFloat(localStorage.getItem('orderAmount'))).toFixed(2)}{userData.currency}</span> has been refunded to your account.
                  </p>
                </div>
              )}
              <p className="text-gray-600 mb-6">
                Transaction amount: <span className="font-semibold">{parseFloat(localStorage.getItem('orderAmount') || successAmount).toFixed(2)}{userData.currency}</span>
              </p>
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={closeSuccessModal}
                  className="w-full bg-[#007d56] hover:bg-[#005a3e] text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TransitionedProfile = Transition(Profile);
export default TransitionedProfile;
