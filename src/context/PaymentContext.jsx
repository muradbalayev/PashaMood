import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create context
const PaymentContext = createContext();

// Export the context for use by the usePayment hook

// Provider component
export const PaymentProvider = ({ children }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Function to handle successful payment
  const handlePaymentSuccess = (amount, orderAmt) => {
    // Ensure we're working with numbers for calculations
    const paymentAmountNum = parseFloat(amount);
    const orderAmountNum = parseFloat(orderAmt);
    
    // Store both original values
    setPaymentAmount(amount);
    setOrderAmount(orderAmt);
    setPaymentSuccess(true);
    setShowSuccessModal(true);
    
    // Calculate refund if payment amount exceeds order amount
    const hasRefund = paymentAmountNum > orderAmountNum;
    const refundAmount = hasRefund ? (paymentAmountNum - orderAmountNum).toFixed(2) : 0;
    
    // Store refund information in localStorage for access across components
    if (hasRefund) {
      localStorage.setItem('refundAmount', refundAmount);
    }
    
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
  };

  // Listen for localStorage changes (for cross-tab communication)
  useEffect(() => {
    const checkPaymentStatus = () => {
      const success = localStorage.getItem('paymentSuccess');
      const amount = localStorage.getItem('paymentAmount');
      const order = localStorage.getItem('orderAmount');
      
      if (success === 'true' && amount) {
        // Convert to numbers to ensure proper comparison
        const paymentAmount = parseFloat(amount);
        const orderAmount = parseFloat(order || amount); // Default to payment amount if order amount is not set
        
        handlePaymentSuccess(amount, orderAmount.toString());
        localStorage.removeItem('paymentSuccess');
      }
    };
    
    // Check immediately
    checkPaymentStatus();
    
    // Set up polling interval (check every 500ms)
    const interval = setInterval(checkPaymentStatus, 500);
    
    // Set up storage event listener for cross-tab communication
    const handleStorageChange = (e) => {
      if (e.key === 'paymentSuccess' && e.newValue === 'true') {
        checkPaymentStatus();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Reset payment state
  const resetPayment = () => {
    setPaymentSuccess(false);
    setShowSuccessModal(false);
    localStorage.removeItem('refundAmount');
  };
  
  // Close success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };
  
  // Context value
  const value = {
    paymentSuccess,
    paymentAmount,
    orderAmount,
    showSuccessModal,
    handlePaymentSuccess,
    resetPayment,
    closeSuccessModal,
    // Add refund amount to context
    refundAmount: localStorage.getItem('refundAmount') || '0'
  };
  
  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
