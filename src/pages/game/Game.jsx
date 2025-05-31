import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCoins, FaShoppingBag, FaCoffee, FaBook, FaUtensils, FaShoppingCart, FaGasPump, FaTshirt, FaLaptop, FaGamepad, FaCity, FaMoneyBillWave, FaChartLine, FaBuilding, FaWallet, FaHome } from 'react-icons/fa';
import { FiShoppingCart, FiCreditCard, FiTrendingUp, FiHome, FiDollarSign, FiAward } from 'react-icons/fi';
import { BsCashCoin, BsBank, BsCreditCard2Front, BsGraphUp, BsBuilding, BsWallet2 } from 'react-icons/bs';
import Transition from '../../components/Transition';
import { FaHouse } from 'react-icons/fa6';

const Game = () => {
  const navigate = useNavigate();
  const [totalCoins, setTotalCoins] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get transaction icon based on category
  const getTransactionIcon = (category) => {
    switch(category) {
      case 'shopping':
        return <FaShoppingBag size={24} />;
      case 'coffee':
        return <FaCoffee size={24} />;
      case 'books':
        return <FaBook size={24} />;
      case 'food':
        return <FaUtensils size={24} />;
      case 'groceries':
        return <FaShoppingCart size={24} />;
      case 'gas':
        return <FaGasPump size={24} />;
      case 'clothing':
        return <FaTshirt size={24} />;
      case 'electronics':
        return <FaLaptop size={24} />;
      case 'entertainment':
        return <FaGamepad size={24} />;
      default:
        return <FaShoppingBag size={24} />;
    }
  };

  // We'll define categories inside useEffect to avoid dependency issues

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // if (!loggedIn) {
    //   navigate('/auth/login');
    //   return;
    // }

    // Categories for random assignment (defined inside useEffect to avoid dependency issues)
    const categories = ['shopping', 'coffee', 'books', 'food', 'groceries', 'gas', 'clothing', 'electronics', 'entertainment'];

    // Generate static transactions
    const amounts = [5, 20, 50, 80, 66, 24, 35, 12, 45, 30];
    const generatedTransactions = amounts.map((amount, index) => {
      const cashback = amount * 0.05; // 5% cashback
      const coins = Math.round(cashback * 1000); // Convert to coins
      
      return {
        id: index + 1,
        amount,
        cashback,
        coins,
        category: categories[Math.floor(Math.random() * categories.length)],
        date: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toLocaleDateString('az-AZ'), // Random dates going back
      };
    });

    setTransactions(generatedTransactions);
    
    // Calculate total coins
    const total = generatedTransactions.reduce((sum, transaction) => sum + transaction.coins, 0);
    setTotalCoins(total);
  }, [navigate]);

  const handleStartBuilding = () => {
    navigate('/game/city');
  };

  // if (!isLoggedIn) {
  //   return <div>Redirecting to login...</div>;
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-gradient-to-r from-[#007d56] to-[#005a3e] text-white shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center ">
            <Link to="/" className="absolute top-4 left-4">
            <FaHouse className="mr-3 text-3xl" />
            </Link>
            <motion.h1 
              className="inter text-3xl md:text-4xl font-bold text-center flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BsBuilding className="mr-3 text-4xl" /> MoodCoins sənin şəhərini inkişaf etdirir!
            </motion.h1>
            <motion.p 
              className="inter mt-3 text-gray-100 text-center max-w-2xl text-lg inter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Xərclədikcə qazanın və virtual şəhərinizi qurun
            </motion.p>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Total Coins Section */}
        <motion.div 
          className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-[#007d56] to-[#005a3e] p-8 text-white">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <BsWallet2 className="mr-2 text-xl inter" /> Qazandığınız Ümumi Pasha Coins
            </h2>
            <div className="flex items-center">
              <FaCoins className="text-yellow-300 mr-3 text-4xl animate-pulse" />
              <span className="text-4xl font-bold inter">{totalCoins.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Transactions Section */}
        <div className='px-8'>
          <h2 className="inter text-2xl font-bold mb-6 text-[#007d56] flex items-center">
            <BsCreditCard2Front className="mr-2" /> Son Əməliyyatlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactions.map((transaction, index) => (
              <motion.div 
                key={transaction.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#007d56] bg-opacity-10 flex items-center justify-center text-[#007d56] mr-3 shadow-sm">
                      {getTransactionIcon(transaction.category)}
                    </div>
                    <div>
                      <h3 className="inter font-medium">{transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <FiCreditCard className="mr-1 text-xs" /> {transaction.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold flex items-center">
                     ₼{transaction.amount.toFixed(2)}
                    </span>
                    <div className="flex items-center text-green-600">
                      <BsCashCoin className="mr-1 inter" />
                      <span className="text-sm font-medium">+{transaction.cashback.toFixed(2)} ₼ Cashback</span>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="flex items-center justify-between bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] p-3 rounded-lg border border-gray-100"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <FaCoins className="text-yellow-500 mr-2" />
                      <span className="font-medium">Pasha Coins</span>
                    </div>
                    <motion.span 
                      className="text-lg font-bold text-[#007d56] bg-white px-3 py-1 rounded-full shadow-sm"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      +{transaction.coins.toLocaleString()}
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Start Building Button */}
        <motion.div 
          className="mt-12 mb-12 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={handleStartBuilding}
            className="inter bg-gradient-to-r from-[#007d56] to-[#005a3e] hover:from-[#006245] hover:to-[#004a2e] text-white font-bold py-5 px-10 rounded-full text-xl shadow-xl transform transition hover:scale-105 flex items-center"
          >
            <BsBuilding className="mr-3 text-2xl" /> Şəhərimi Qur
          </button>
        </motion.div>
        
        {/* Gamification Info */}
        <motion.div 
          className="mt-12 inter bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="inter text-2xl font-bold mb-6 text-[#007d56] flex items-center">
            <FiAward className="mr-2" /> Necə işləyir?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#007d56] bg-opacity-10 flex items-center justify-center text-[#007d56] mb-3 shadow-md">
                <FiShoppingCart size={24} />
              </div>
              <h3 className="inter font-medium mb-2">Alış-veriş edin</h3>
              <p className="inter text-gray-600 text-sm">Pasha Bank kartınızla gündəlik alış-verişlərinizi edin</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#007d56] bg-opacity-10 flex items-center justify-center text-[#007d56] mb-3 shadow-md">
                <BsCashCoin size={24} />
              </div>
              <h3 className="inter font-medium mb-2">Cashback qazanın</h3>
              <p className="inter text-gray-600 text-sm">Hər alış-verişdən 5% cashback qazanın və Pasha Coins toplayın</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#007d56] bg-opacity-10 flex items-center justify-center text-[#007d56] mb-3 shadow-md">
                <BsBuilding size={24} />
              </div>
              <h3 className="inter font-medium mb-2">Şəhərinizi qurun</h3>
              <p className="inter text-gray-600 text-sm">Qazandığınız Pasha Coins ilə virtual şəhərinizi inkişaf etdirin</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TransitionedGame = Transition(Game);
export default TransitionedGame;
