import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { BsEmojiSmile, BsEmojiSunglasses, BsEmojiHeartEyes, BsEmojiAngry } from 'react-icons/bs';

const MistralChatbot = ({ isOpen, onClose, userData }) => {
  const [chatCharacter, setChatCharacter] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Mistral AI API call
  const chatWithMistral = async (character, userInput) => {
    setIsLoading(true);
    
    try {
      // Get character-specific prompt
      const prompt = getCharacterPrompt(character, userInput);
      
      // API key
      const API_KEY = "NNSmGttEfA6kpuzjYHLAu9jKrZ9ygD4I";
      
      // Make API request to Mistral AI
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "mistral-large-latest",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 750,
          temperature: 0.8
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const result = data.choices[0].message.content;
      
      setIsLoading(false);
      return result;
    } catch (error) {
      console.error("Error calling Mistral AI API:", error);
      setIsLoading(false);
      
      // Fallback response in case of API error
      if (character === 'happy') {
        return "😊 Üzr istəyirəm, hazırda API ilə əlaqə qura bilmirəm. Daha sonra yenidən cəhd edin.";
      } else if (character === 'sad') {
        return "🤗 Təəssüf ki, hazırda texniki problem yaşayırıq. Narahatlığa görə üzr istəyirik.";
      } else {
        return "😎 Server məşğuldur. Bir az sonra yenidən cəhd et.";
      }
    }
  };
  
  // Get character-specific prompt with transaction data
  const getCharacterPrompt = (character, userInput) => {
    // Prepare transaction data for the AI
    const transactionData = userData?.recentTransactions || [];
    
    // Calculate some basic analytics
    let totalSpent = 0;
    let totalIncome = 0;
    const categories = {};
    const merchants = {};
    
    transactionData.forEach(transaction => {
      if (transaction.amount < 0) {
        totalSpent += Math.abs(transaction.amount);
        
        // Count by category
        if (!categories[transaction.category]) {
          categories[transaction.category] = 0;
        }
        categories[transaction.category] += Math.abs(transaction.amount);
        
        // Count by merchant
        if (!merchants[transaction.merchant]) {
          merchants[transaction.merchant] = 0;
        }
        merchants[transaction.merchant] += Math.abs(transaction.amount);
      } else {
        totalIncome += transaction.amount;
      }
    });
    
    // Format transaction data for the prompt
    const transactionSummary = `
Transaction Summary:
- Total Spent: ${userData?.currency || '₼'}${totalSpent.toFixed(2)}
- Total Income: ${userData?.currency || '₼'}${totalIncome.toFixed(2)}
- Balance: ${userData?.currency || '₼'}${userData?.balance?.toFixed(2) || '2450.75'}
- Transaction Count: ${transactionData.length}
`;
    
    // Create a list of recent transactions
    const recentTransactionsList = transactionData.slice(0, 5).map(t => {
      return `- ${t.date}: ${t.merchant}, ${t.amount < 0 ? '-' : '+'}${userData?.currency || '₼'}${Math.abs(t.amount).toFixed(2)}, Category: ${t.category}`;
    }).join('\n');
    
    // Prepare the base prompt with user data and transactions
    const basePrompt = `${userInput}\n\nUser Data:\n- Name: ${userData?.name || 'User'}
- Email: ${userData?.email || 'user@example.com'}
- Balance: ${userData?.currency || '₼'}${userData?.balance?.toFixed(2) || '2450.75'}\n${transactionSummary}\n\nRecent Transactions:\n${recentTransactionsList}`;
    
    // Add character-specific instructions
    if (character === "happy") {
      return `😊 Neşəli bank chatbotu kimi, pozitiv cavab ver. Əgər istifadəçi xərcləri, transaksiyaları və ya maliyyə məsləhəti haqqında soruşsa, verilən məlumatlardan istifadə et:\n${basePrompt}`;
    } else if (character === "normal") {
      return `🤗 Empatik bank chatbotu kimi, diqqətli və dəstək verici cavab ver. Əgər istifadəçi xərcləri, transaksiyaları və ya maliyyə məsləhəti haqqında soruşsa, verilən məlumatlardan istifadə et:\n${basePrompt}`;
    } else if (character === "angry") {
      return `😡 Müştəri əsəbiləşib və narahatdır. Onu sakitləşdirməyə çalış və insan kimi empatiya göstər. Əgər istifadəçi xərcləri, transaksiyaları və ya maliyyə məsləhəti haqqında soruşsa, verilən məlumatlardan istifadə et. Cavabların:\n- Yumşaq və sakitləşdirici tonda olsun\n- Hisslərini başa düşdüyünü göstər\n- Söz verdiyin kömək barədə konkret danış\n- Lazımsız rəsmi cümlələrdən uzaq dur\n${basePrompt}`;
    } else {
      return basePrompt;
    }
  };
  
  // Colors for different chat bubble styles
  const chatColors = {
    happy: { bg: "#d4edda", text: "#155724" },
    normal: { bg: "#fff3cd", text: "#856404" },
    angry: { bg: "#d1ecf1", text: "#0c5460" },
    user: { bg: "#cce5ff", text: "#004085" }
  };
  
  // Handle chatbot message submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !chatCharacter) return;
    
    // Add user message to chat
    const newChatHistory = [
      ...chatHistory,
      { sender: 'user', message: messageInput }
    ];
    setChatHistory(newChatHistory);
    
    // Clear input
    setMessageInput('');
    
    // Get bot response
    const response = await chatWithMistral(chatCharacter, messageInput);
    
    // Add bot response to chat
    setChatHistory([
      ...newChatHistory,
      { sender: 'bot', message: response }
    ]);
  };
  
  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Reset character when closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setChatCharacter(null);
        setChatHistory([]);
      }, 300); // Wait for exit animation to complete
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden inter"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#007d56] to-[#005a3e] text-white p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaRobot className="mr-2" />
                <h3 className="font-bold inter">Pasha Mood Chatbot</h3>
              </div>
              <button 
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Character Selection or Chat Interface */}
          <div className="flex flex-col h-96">
            {!chatCharacter ? (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <h4 className="text-lg font-semibold mb-4 text-center inter">Mövcud vəziyyətinizi emoji ilə ifadə edin və söhbətə başlayın:</h4>
                <div className="grid grid-cols-3 gap-4 mb-6 w-full">
                  <button
                    onClick={() => setChatCharacter('happy')}
                    className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-transparent hover:border-[#007d56] transition-all"
                  >
                    <BsEmojiSmile className="text-3xl text-yellow-500 mb-2" />
                    <span className="inter"> Zarafatçıl</span>
                  </button>
                  <button
                    onClick={() => setChatCharacter('normal')}
                    className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-transparent hover:border-[#007d56] transition-all"
                  >
                    <BsEmojiHeartEyes className="text-3xl text-yellow-500 mb-2" />
                    <span className="inter"> Standart</span>
                  </button>
                  <button
                    onClick={() => setChatCharacter('angry')}
                    className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-transparent hover:border-[#007d56] transition-all"
                  >
                    <BsEmojiAngry className="text-3xl text-yellow-500 mb-2" />
                    <span className="inter"> Əsəbi</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Messages */}
                <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
                  {chatHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <FaRobot className="text-4xl mb-2 text-[#007d56]" />
                      <p className="inter">Sualınızı yazın və Enter basın</p>
                    </div>
                  ) : (
                    chatHistory.map((chat, index) => (
                      <div
                        key={index}
                        className={`mb-3 flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className="rounded-lg px-4 py-2 max-w-[80%] break-words inter"
                          style={{
                            backgroundColor: chat.sender === 'user' ? chatColors.user.bg : chatColors[chatCharacter].bg,
                            color: chat.sender === 'user' ? chatColors.user.text : chatColors[chatCharacter].text,
                          }}
                        >
                          {chat.message}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Sualınızı yazın..."
                      className="flex-1 inter border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#007d56]"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !messageInput.trim()}
                      className={`bg-[#007d56] text-white rounded-r-lg py-3 px-4 ${
                        isLoading || !messageInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#006245]'
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center inter">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                      ) : (
                        <FaPaperPlane />
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MistralChatbot;
