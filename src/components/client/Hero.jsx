import React from "react";
import Button from "../common/Button";
import { FaShieldAlt, FaClock, FaMobileAlt, FaRobot, FaChartLine, FaGift, FaLock, FaCreditCard } from 'react-icons/fa';
import { BiSolidLock, BiSolidShield } from 'react-icons/bi';
import Copy from "../common/Copy";
import { Link } from "react-router-dom";
const Hero = () => {
  const features = [
    {
      icon: <BiSolidLock className="text-3xl text-[#007d56]" />,
      title: "Secure Payments",
      description: "6-digit temporary codes with time-limited validity for maximum security"
    },
    {
      icon: <BiSolidShield className="text-3xl text-[#007d56]" />,
      title: "Enhanced Security",
      description: "Time-limited 6-digit codes provide secure and reliable payment verification"
    },
    {
      icon: <FaClock className="text-3xl text-[#007d56]" />,
      title: "Fast Transactions",
      description: "Complete payments in seconds without entering PIN or waiting for OTP"
    },
    {
      icon: <FaMobileAlt className="text-3xl text-[#007d56]" />,
      title: "24/7 Support",
      description: "Our customer service team is available anytime to assist you"
    }
  ];
  

  return (
    <section className="w-full">
      {/* Hero Section */}
      <section className='relative w-full overflow-hidden'>
        <div className='w-full min-h-[80vh] max-w-[1440px] mx-auto lg:px-16 md:px-8 px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between'>
          <div className='w-full md:w-1/2 text-left z-10 mb-10 md:mb-0'>
            <Copy delay={0}>
              <div className="inline-block px-4 py-1 bg-[#e6f2ee] rounded-full mb-4">
                <span className="text-[#007d56] font-semibold text-sm">Next Generation Payment System</span>
              </div>
            </Copy>
            <Copy delay={0.1}>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight'>
                <span className='text-[#007d56]'>Secure & Fast <span className="text-[#c50b30]">Payments</span></span>
                <br />
                <span className='text-gray-800'>Made Simple</span>
              </h1>
            </Copy>
            <Copy delay={0.2}>
              <p className='text-base md:text-lg text-gray-600 mb-8 max-w-lg'>
                Experience the next generation of secure payments with our system
                Pay with maximum security
              </p>
            </Copy>
              <div className='flex flex-col sm:flex-row justify-start gap-4'>
                <Link to='/auth/login' className='bg-[#c50b30] hover:bg-[#a80929] text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 inline-block text-center shadow-lg'>
                  Get Started
                </Link>
              </div>
          </div>
          <div className='w-full md:w-1/2 flex justify-center items-center z-10'>
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#007d56] opacity-10 rounded-full"></div>
                <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-[#c50b30] opacity-10 rounded-full"></div>
                <div className="bg-white p-8 rounded-2xl shadow-2xl relative z-10">
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-12 h-12 bg-[#e6f2ee] rounded-full flex items-center justify-center">
                      <FaCreditCard className="text-[#007d56] text-xl" />
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm">Balance</p>
                      <p className="text-xl font-bold">₼ 2,850.75</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#007d56] to-[#005a3e] p-6 rounded-xl mb-6 text-white">
                    <div className="flex justify-between mb-4">
                      <p className="text-sm opacity-80">Payment Code</p>
                      <BiSolidLock className="text-xl" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">4</div>
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">8</div>
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">3</div>
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">7</div>
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">1</div>
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">9</div>
                      </div>
                    </div>
                    <p className="text-xs mt-4 opacity-70 text-center">Valid for 2:00 minutes</p>
                  </div>
                  <div className="flex justify-between">
                    <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl">
                      <FaLock className="text-gray-700 text-xl" />
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl">
                      <FaShieldAlt className="text-gray-700 text-xl" />
                    </button>
                    <button className="bg-[#c50b30] hover:bg-[#a80929] p-3 rounded-xl">
                      <FaMobileAlt className="text-white text-xl" />
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#007d56] opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c50b30] opacity-5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gray-50">
        <div className="mx-auto lg:px-16 px-4">
          <div className="text-center mb-16">
            <Copy delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 ">We Provide The Best Experience</h2>
            </Copy>
            <Copy delay={0.2}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our secure payment system combines speed with top-tier security features to give you peace of mind</p>
            </Copy>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <Copy delay={index * 0.2}>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                </Copy>
                <Copy delay={index * 0.2}>
                <p className="text-gray-600">{feature.description}</p>
                </Copy>
              </div>
            ))}
          </div>
        </div>
      </div>
      
  
      
    
      

      {/* CTA Section */}
      <div className="py-16 bg-[#007d56] text-white">
        <div className="mx-auto lg:px-16 px-4 text-center">
        <Copy delay={0}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Secure Payments?</h2>
          </Copy>
          <Copy delay={0.2}>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied users who have made the switch to our secure payment system
            No more complicated authentication processes or security concerns
          </p>
          </Copy>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/login" 
              className="bg-[#c50b30] hover:bg-[#a80929] text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Get Started Now
            </Link>
         
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div id="contact" className="py-20 bg-gray-50">
        <div className="mx-auto lg:px-16 px-4">
          <div className="text-center mb-16">
            <span className="text-[#007d56] font-medium mb-2 block">GET IN TOUCH</span>
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions about our payment system? Our team is here to help you.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-md">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[#006a48] mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007d56]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[#006a48] mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007d56]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-[#006a48] mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007d56]"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[#006a48] mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007d56]"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-[#007d56] hover:bg-[#006a48] text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-gray-600 mb-6">Feel free to reach out to us through any of these channels:</p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#e6f2ee] p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#007d56]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Phone</h4>
                      <p className="text-gray-600">+994 50 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[#e6f2ee] p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#007d56]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Email</h4>
                      <p className="text-gray-600">support@pashamood.az</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[#e6f2ee] p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#007d56]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Address</h4>
                      <p className="text-gray-600">123 Innovation Street, Baku, Azerbaijan</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
