import React from 'react'
import './App.css'
import RouterApp from './pages/RouterApp'
import { PaymentProvider } from './context/PaymentContext'
import { TransactionProvider } from './context/TransactionContext'

function App() {
  return (
    <PaymentProvider>
      <TransactionProvider>
        <RouterApp />
      </TransactionProvider>
    </PaymentProvider>
  )
}

export default App
