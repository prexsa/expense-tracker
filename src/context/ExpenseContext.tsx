import React, { createContext, useState } from 'react';
import { IFormInputs } from '../components/AddExpense';

interface ExpenseContextProps {
  expenses: IFormInputs[];
  addExpense: (values: IFormInputs) => void;
}

export const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined);

export const ExpenseProvider = (props: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<IFormInputs[]>([]);

  const addExpense = (values: IFormInputs) => {
    setExpenses([...expenses, values]);
  };

  const value: ExpenseContextProps = {
    expenses,
    addExpense,
  };

  return <ExpenseContext.Provider value={value}>{props.children}</ExpenseContext.Provider>;
};
