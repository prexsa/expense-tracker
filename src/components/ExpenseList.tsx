import { useExpense } from '../context/useExpense';

export const ExpenseList = () => {
  const { expenses } = useExpense();

  if (!expenses.length) {
    return (
      <div className="max-w-lg px-5 m-auto">
        <h1 className="flex flex-col items-center gap-5 px-5 py-10 text-xl font-bold text-center rounded-xl">
          There are no expenses to display
        </h1>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const date = expense.date.toLocaleDateString('en-us', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
            return (
              <tr key={index} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4">
                  <div>{date}</div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div>{expense.description}</div>
                </th>
                <td className="px-6 py-4">
                  <div>{expense.category}</div>
                </td>
                <td className="px-6 py-4">
                  <div>${expense.amount}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
