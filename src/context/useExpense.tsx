import { useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';

export const useExpense = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error('useExpense must be used within a ExpenseProvider');
  }
  return context;
};
