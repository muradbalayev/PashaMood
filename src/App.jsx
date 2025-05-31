import React from 'react'
import './App.css'
import RouterApp from './pages/RouterApp'
import { PaymentProvider } from './context/PaymentContext'

function App() {
  return (
    <PaymentProvider>
      <RouterApp />
    </PaymentProvider>
  )
}

export default App
