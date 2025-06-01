import { useContext } from 'react';
import TransactionContext from './TransactionContext';

// Export the context hook
export const useTransactions = () => useContext(TransactionContext);

export default useTransactions;
