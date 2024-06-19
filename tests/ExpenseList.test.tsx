import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as useExpense from '../src/context/useExpense';
import { render, screen } from '@testing-library/react';
import { ExpenseList } from '../src/components/ExpenseList';
// import { IFormInputs } from '../src/components/AddExpense';
import { ContextWrapper } from './ContextWrapper';
import { Connect } from 'vite';

describe('Expense List', () => {
  const useExpenseSpy = vi.spyOn(useExpense, 'useExpense');

  it('should render the list of expenses', () => {
    const expenses = [
      {
        description: 'Gas',
        category: 'gas',
        amount: 80,
        date: new Date('Wed May 08 2024 16:00:26 GMT-0700 (Pacific Daylight Time)'),
      },
    ];
    useExpenseSpy.mockReturnValue({
      expenses: expenses,
      addExpense: vi.fn(),
    });

    const { getByTestId } = render(<ExpenseList />, { wrapper: ContextWrapper });

    // screen.debug();
    expect(getByTestId('expenses-list').children.length).toBe(expenses.length);
  });

  afterEach(() => {
    useExpenseSpy.mockClear();
  });
});
