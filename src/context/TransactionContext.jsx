import React, { createContext, useState, useEffect } from 'react';

// Create context
const TransactionContext = createContext();

// Provider component
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch (error) {
        console.error('Error parsing transactions:', error);
        // Initialize with empty array if there's an error
        setTransactions([]);
      }
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  const addTransaction = (transaction) => {
    // Generate a unique ID and add timestamp if not provided
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...transaction
    };
    
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    return newTransaction;
  };

  // Get transactions for a specific category
  const getTransactionsByCategory = (category) => {
    return transactions.filter(transaction => transaction.category === category);
  };

  // Get transactions for a specific date range
  const getTransactionsByDateRange = (startDate, endDate) => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
    });
  };

  // Get total spent by category
  const getTotalByCategory = (category) => {
    return transactions
      .filter(transaction => transaction.category === category && transaction.amount < 0)
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  };

  // Get monthly spending
  const getMonthlySpending = () => {
    const monthlyData = {};
    
    transactions.forEach(transaction => {
      if (transaction.amount < 0) { // Only count expenses
        const month = transaction.date.substring(0, 7); // Format: YYYY-MM
        if (!monthlyData[month]) {
          monthlyData[month] = 0;
        }
        monthlyData[month] += Math.abs(transaction.amount);
      }
    });
    
    return monthlyData;
  };

  // Clear all transactions
  const clearTransactions = () => {
    setTransactions([]);
    localStorage.removeItem('transactions');
  };

  // Context value
  const value = {
    transactions,
    addTransaction,
    getTransactionsByCategory,
    getTransactionsByDateRange,
    getTotalByCategory,
    getMonthlySpending,
    clearTransactions
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
