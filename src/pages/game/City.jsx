import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCoins, FaHome, FaTree, FaRoad, FaBuilding, FaArrowLeft, FaLock, FaUnlock, FaStar, FaTrophy, FaChartLine, FaUsers } from 'react-icons/fa';
import Transition from '../../components/Transition';

const City = () => {
  const navigate = useNavigate();
  const cityMapRef = useRef(null);
  const [totalCoins, setTotalCoins] = useState(0);
  const [cityName] = useState('Pasha City');
  const [cityLevel, setCityLevel] = useState(1);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState('');
  const [cityStats, setCityStats] = useState({
    population: 100,
    happiness: 70,
    economy: 50,
    environment: 60
  });
  
  // Enhanced buildings with more game-like properties
  const [buildings, setBuildings] = useState([
    { 
      id: 1, 
      name: 'Yaşayış Kompleksi', 
      icon: <FaHome size={24} />, 
      level: 1, 
      maxLevel: 5,
      cost: 1000, 
      baseCost: 1000,
      unlocked: true,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Şəhərinizin əsas yaşayış binaları',
      benefits: {
        population: 50,
        happiness: 10,
        economy: 5,
        environment: 0
      },
      position: { x: 20, y: 30 }
    },
    { 
      id: 2, 
      name: 'Şəhər Parkı', 
      icon: <FaTree size={24} />, 
      level: 1, 
      maxLevel: 5,
      cost: 2000, 
      baseCost: 2000,
      unlocked: true,
      image: 'https://images.unsplash.com/photo-1563425946128-0dbd21f1c309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Şəhərinizin yaşıl zonası və istirahət məkanı',
      benefits: {
        population: 0,
        happiness: 30,
        economy: 0,
        environment: 40
      },
      position: { x: 60, y: 50 }
    },
    { 
      id: 3, 
      name: 'Nəqliyyat Şəbəkəsi', 
      icon: <FaRoad size={24} />, 
      level: 1, 
      maxLevel: 5,
      cost: 1500, 
      baseCost: 1500,
      unlocked: true,
      image: 'https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Şəhərinizin nəqliyyat infrastrukturu',
      benefits: {
        population: 10,
        happiness: 20,
        economy: 20,
        environment: -10
      },
      position: { x: 40, y: 70 }
    },
    { 
      id: 4, 
      name: 'Biznes Mərkəzi', 
      icon: <FaBuilding size={24} />, 
      level: 1, 
      maxLevel: 5,
      cost: 3000, 
      baseCost: 3000,
      unlocked: true,
      image: 'https://images.unsplash.com/photo-1577760258779-e787a1633c1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Şəhərinizin iqtisadi mərkəzi',
      benefits: {
        population: 20,
        happiness: 5,
        economy: 50,
        environment: -20
      },
      position: { x: 75, y: 25 }
    },
    { 
      id: 5, 
      name: 'Texnologiya Mərkəzi', 
      icon: <FaChartLine size={24} />, 
      level: 0, 
      maxLevel: 5,
      cost: 5000, 
      baseCost: 5000,
      unlocked: false,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'İnnovasiya və texnologiya inkişafı mərkəzi',
      benefits: {
        population: 10,
        happiness: 10,
        economy: 70,
        environment: -10
      },
      position: { x: 15, y: 65 }
    },
    { 
      id: 6, 
      name: 'Mədəniyyət Mərkəzi', 
      icon: <FaUsers size={24} />, 
      level: 0, 
      maxLevel: 5,
      cost: 4000, 
      baseCost: 4000,
      unlocked: false,
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Şəhərinizin mədəni həyatını zənginləşdirən mərkəz',
      benefits: {
        population: 15,
        happiness: 50,
        economy: 10,
        environment: 0
      },
      position: { x: 65, y: 15 }
    }
  ]);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      navigate('/auth/login');
      return;
    }

    // Set initial coins from localStorage or default
    const savedCoins = localStorage.getItem('pashaCoins');
    const savedCityLevel = localStorage.getItem('cityLevel');
    const savedBuildings = localStorage.getItem('cityBuildings');
    
    if (savedCoins) {
      setTotalCoins(parseInt(savedCoins));
    } else {
      setTotalCoins(8000); // Starting coins
      localStorage.setItem('pashaCoins', '8000');
    }
    
    if (savedCityLevel) {
      setCityLevel(parseInt(savedCityLevel));
    }
    
    if (savedBuildings) {
      try {
        const parsedBuildings = JSON.parse(savedBuildings);
        // We need to restore the React elements (icons) which don't serialize
        const restoredBuildings = parsedBuildings.map(building => {
          const iconMap = {
            'FaHome': <FaHome size={24} />,
            'FaTree': <FaTree size={24} />,
            'FaRoad': <FaRoad size={24} />,
            'FaBuilding': <FaBuilding size={24} />,
            'FaChartLine': <FaChartLine size={24} />,
            'FaUsers': <FaUsers size={24} />
          };
          
          return {
            ...building,
            icon: iconMap[building.iconType] || <FaBuilding size={24} />
          };
        });
        setBuildings(restoredBuildings);
        
        // Update city stats based on buildings
        updateCityStats(restoredBuildings);
      } catch (e) {
        console.error('Error parsing saved buildings:', e);
      }
    } else {
      // For first time, prepare buildings for storage with iconType
      const buildingsWithIconType = buildings.map(building => {
        let iconType = 'FaBuilding';
        if (building.name.includes('Yaşayış')) iconType = 'FaHome';
        if (building.name.includes('Park')) iconType = 'FaTree';
        if (building.name.includes('Nəqliyyat')) iconType = 'FaRoad';
        if (building.name.includes('Biznes')) iconType = 'FaBuilding';
        if (building.name.includes('Texnologiya')) iconType = 'FaChartLine';
        if (building.name.includes('Mədəniyyət')) iconType = 'FaUsers';
        
        // Remove React elements to avoid circular references
        const { icon, ...buildingWithoutIcon } = building;
        
        return {
          ...buildingWithoutIcon,
          iconType
        };
      });
      
      localStorage.setItem('cityBuildings', JSON.stringify(buildingsWithIconType));
      updateCityStats(buildings);
    }
    
    // Check for unlockable buildings
    checkForUnlocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  
  // Function to update city stats based on buildings
  const updateCityStats = (currentBuildings) => {
    let stats = {
      population: 100, // Base population
      happiness: 70,   // Base happiness
      economy: 50,     // Base economy
      environment: 60  // Base environment
    };
    
    currentBuildings.forEach(building => {
      if (building.level > 0) {
        stats.population += building.benefits.population * building.level;
        stats.happiness += building.benefits.happiness * building.level;
        stats.economy += building.benefits.economy * building.level;
        stats.environment += building.benefits.environment * building.level;
      }
    });
    
    // Ensure no negative values
    Object.keys(stats).forEach(key => {
      stats[key] = Math.max(0, stats[key]);
    });
    
    setCityStats(stats);
  };
  
  // Check for buildings to unlock based on city level
  const checkForUnlocks = () => {
    const updatedBuildings = [...buildings];
    let unlocked = false;
    
    if (cityLevel >= 2 && !buildings[4].unlocked) {
      updatedBuildings[4].unlocked = true;
      unlocked = true;
      setAchievementMessage('Texnologiya Mərkəzi açıldı!');
    }
    
    if (cityLevel >= 3 && !buildings[5].unlocked) {
      updatedBuildings[5].unlocked = true;
      unlocked = true;
      setAchievementMessage('Mədəniyyət Mərkəzi açıldı!');
    }
    
    if (unlocked) {
      setBuildings(updatedBuildings);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
      
      // Save to localStorage
      const buildingsForStorage = updatedBuildings.map(building => ({
        ...building,
        iconType: getIconTypeFromName(building.name)
      }));
      localStorage.setItem('cityBuildings', JSON.stringify(buildingsForStorage));
    }
  };
  
  const getIconTypeFromName = (name) => {
    if (name.includes('Yaşayış')) return 'FaHome';
    if (name.includes('Park')) return 'FaTree';
    if (name.includes('Nəqliyyat')) return 'FaRoad';
    if (name.includes('Biznes')) return 'FaBuilding';
    if (name.includes('Texnologiya')) return 'FaChartLine';
    if (name.includes('Mədəniyyət')) return 'FaUsers';
    return 'FaBuilding';
  };

  const upgradeBuilding = (id) => {
    const building = buildings.find(b => b.id === id);
    
    if (building && totalCoins >= building.cost) {
      // Update coins
      const newTotalCoins = totalCoins - building.cost;
      setTotalCoins(newTotalCoins);
      localStorage.setItem('pashaCoins', newTotalCoins.toString());
      
      // Update building level and cost
      const updatedBuildings = buildings.map(b => {
        if (b.id === id) {
          const newLevel = b.level + 1;
          const newCost = Math.round(b.baseCost * Math.pow(1.5, newLevel - 1));
          
          // Show building upgrade modal
          setSelectedBuilding({
            ...b,
            level: newLevel,
            cost: newCost
          });
          setShowUpgradeModal(true);
          setTimeout(() => setShowUpgradeModal(false), 2000);
          
          // Show achievement if max level reached
          if (newLevel === b.maxLevel) {
            setAchievementMessage(`${b.name} maksimum səviyyəyə çatdı!`);
            setShowAchievement(true);
            setTimeout(() => setShowAchievement(false), 3000);
          }
          
          return {
            ...b,
            level: newLevel,
            cost: newCost
          };
        }
        return b;
      });
      
      setBuildings(updatedBuildings);
      
      // Save to localStorage with iconType
      const buildingsForStorage = updatedBuildings.map(building => {
        // Create a clean object without React elements to avoid circular references
        const { icon, ...buildingWithoutIcon } = building;
        return {
          ...buildingWithoutIcon,
          iconType: getIconTypeFromName(building.name)
        };
      });
      localStorage.setItem('cityBuildings', JSON.stringify(buildingsForStorage));
      
      // Update city stats
      updateCityStats(updatedBuildings);
      
      // Check if city level should increase
      const activeBuildings = updatedBuildings.filter(b => b.unlocked);
      const minLevel = Math.min(...activeBuildings.map(b => b.level));
      if (minLevel > cityLevel) {
        setCityLevel(minLevel);
        localStorage.setItem('cityLevel', minLevel.toString());
        
        // Show achievement for city level up
        setAchievementMessage(`Şəhər səviyyəsi ${minLevel} oldu!`);
        setShowAchievement(true);
        setTimeout(() => setShowAchievement(false), 3000);
        
        // Check for new unlocks
        checkForUnlocks();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-[#007d56] text-white shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/game')}
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              <span>Geri</span>
            </button>
            <div className="flex items-center">
              <FaCoins className="text-yellow-300 mr-2 animate-pulse" />
              <span className="font-bold">{totalCoins.toLocaleString()} Pasha Coins</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div 
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#007d56] text-white px-6 py-3 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div className="flex items-center">
              <FaTrophy className="text-yellow-300 mr-2" />
              <span>{achievementMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Building Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && selectedBuilding && (
          <motion.div 
            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-center mb-4">{selectedBuilding.name} Yüksəldi!</h3>
              <div className="flex justify-center mb-4">
                <div className="bg-[#007d56] text-white p-4 rounded-full">
                  {selectedBuilding.icon}
                </div>
              </div>
              <div className="text-center mb-4">
                <p className="text-lg font-bold">Yeni Səviyyə: {selectedBuilding.level}</p>
                <p className="text-sm text-gray-600">Şəhəriniz daha da gücləndi!</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* City Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">{cityName}</h2>
          <div className="flex justify-center items-center mb-4">
            <span className="text-lg font-medium mr-2">Səviyyə:</span>
            <span className="bg-[#007d56] text-white px-3 py-1 rounded-full">{cityLevel}</span>
          </div>
          
          {/* City Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Əhali</p>
              <p className="font-bold text-lg">{cityStats.population}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Xoşbəxtlik</p>
              <p className="font-bold text-lg">{cityStats.happiness}%</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">İqtisadiyyat</p>
              <p className="font-bold text-lg">{cityStats.economy}%</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Ətraf Mühit</p>
              <p className="font-bold text-lg">{cityStats.environment}%</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-center text-gray-700">Şəhərinizi inkişaf etdirmək üçün binaları yüksəldin.</p>
          </div>
        </div>

        {/* City Visualization */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Şəhər Görünüşü</h3>
          <div 
            ref={cityMapRef} 
            className="bg-[#e8f4ea] rounded-lg h-[600px] relative overflow-hidden"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Building Icons on the Map */}
            {buildings.filter(b => b.unlocked).map(building => (
              <motion.div
                key={building.id}
                className={`absolute cursor-pointer bg-white rounded-lg ${building.level === 0 ? 'opacity-50' : 'opacity-100'}`}
                style={{ 
                  left: `${building.position.x}%`, 
                  top: `${building.position.y}%`,
                  zIndex: building.level
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedBuilding(building)}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#007d56] bg-opacity-10 flex items-center justify-center text-[#007d56] mr-3">
                      {building.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{building.name}</h3>
                      <p className="text-sm text-gray-500">Səviyyə {building.level}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{building.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-yellow-500">
                      <FaCoins className="mr-1" />
                      <span>{building.cost.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => upgradeBuilding(building.id)}
                      disabled={totalCoins < building.cost}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        totalCoins >= building.cost
                          ? 'bg-[#007d56] hover:bg-[#005a3e] text-white'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Təkmilləşdir
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* City Benefits */}
        <motion.div 
          className="mt-12 bg-white rounded-2xl shadow-md p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4 text-[#007d56]">Şəhər Faydaları</h2>
          <p className="text-gray-600 mb-4">
            Şəhərinizi inkişaf etdirdikcə əlavə üstünlüklər əldə edirsiniz:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Səviyyə 2: Cashback 5.5%-ə yüksəlir</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Səviyyə 3: Xüsusi təkliflərə giriş</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Səviyyə 4: Pulsuz bank xidmətləri</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Səviyyə 5: VIP status və xüsusi hədiyyələr</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

const TransitionedCity = Transition(City);
export default TransitionedCity;
