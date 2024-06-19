import '@testing-library/jest-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { AddExpense, IFormInputs } from '../src/components/AddExpense';
import { ContextWrapper } from './ContextWrapper';

// setup userEvent
function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe('Expense form', () => {
  it('should render the fields', () => {
    const mockSave = vi.fn();
    // arrange
    const { user } = setup(
      <ContextWrapper>
        <AddExpense saveData={mockSave} />
      </ContextWrapper>,
    );

    // assert
    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /date/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /amount/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });
  it('should validate form fields', async () => {
    const mockSave = vi.fn();

    const { user } = setup(
      <ContextWrapper>
        <AddExpense saveData={mockSave} />
      </ContextWrapper>,
    );

    await user.type(screen.getByRole('textbox', { name: /description/i }), 'Gas');
    await user.type(
      screen.getByRole('textbox', { name: /date/i }),
      'Wed May 08 2024 16:00:26 GMT-0700 (Pacific Daylight Time)',
    );
    await user.type(screen.getByRole('combobox', { name: /category/i }), 'Gas');
    await user.type(screen.getByRole('spinbutton', { name: /amount/i }), '80');

    const submitBtn = screen.getByRole('button', { name: /add/i });
    await waitFor(() => user.click(submitBtn));

    expect(mockSave).not.toBeCalled();
  });

  it('should call onSubmit when the form is valid', async () => {
    const mockSave = vi.fn();

    const { user } = setup(
      <ContextWrapper>
        <AddExpense saveData={mockSave} />
      </ContextWrapper>,
    );
    mockSave({
      description: 'Gas',
      date: 'Wed May 08 2024 16:00:26 GMT-0700 (Pacific Daylight Time)',
      category: 'Gas',
      amount: '80',
    });

    await user.type(screen.getByRole('textbox', { name: /description/i }), 'Gas');
    await user.type(
      screen.getByRole('textbox', { name: /date/i }),
      'Wed May 08 2024 16:00:26 GMT-0700 (Pacific Daylight Time)',
    );
    await user.type(screen.getByRole('combobox', { name: /category/i }), 'Gas');
    await user.type(screen.getByRole('spinbutton', { name: /amount/i }), '80');
    const submitBtn = screen.getByRole('button', { name: /add/i });

    await waitFor(() => user.click(submitBtn));

    expect(mockSave).toHaveBeenCalledWith({
      description: 'Gas',
      date: 'Wed May 08 2024 16:00:26 GMT-0700 (Pacific Daylight Time)',
      category: 'Gas',
      amount: '80',
    });
  });
});
