import React from 'react';
import { ExpenseProvider } from '../src/context/ExpenseContext';

// Wrapper for 'Expense Context'
export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ExpenseProvider>{children}</ExpenseProvider>;
};
