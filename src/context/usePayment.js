import { useContext } from 'react';
import PaymentContext from './PaymentContext';

// Custom hook to use the payment context
export const usePayment = () => useContext(PaymentContext);

export default usePayment;
