import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { useExpense } from '../context/useExpense';
import { Input } from './Input';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export interface IFormInputs {
  description: string;
  category: string;
  amount: number;
  date: Date;
}

const schema = yup.object({
  description: yup.string().required('Description is required').max(25, 'Description is too long'),
  date: yup.date().default(() => new Date()),
  category: yup.string().required('Category is required'),
  amount: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .required('Amount is required'),
});

const EmptyDiv = () => <div className="invisible">empty</div>;

export const AddExpense = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });
  const { addExpense } = useExpense();

  const handleOnSubmit: SubmitHandler<IFormInputs> = ({ description, date, category, amount }: IFormInputs) => {
    addExpense({ date, category, amount, description });
    reset();
  };

  return (
    <>
      <h3 className="mt-10 text-center text-lg font-bold">Enter your expenses...</h3>
      <form className="w-full" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="flex items-center w-full gap-2 m-auto">
          <div className="flex flex-col justify-items-start items-start my-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <Input type="text" placeholder="A short description ..." {...register('description')} />
            {/*errors.description && <p style={{ color: '#bf1650', fontSize: 14 }}>{errors.description.message}</p>*/}
            {errors.description ? (
              <div className="text-red-error">
                <ErrorMessage errors={errors} name="description" />
              </div>
            ) : (
              <EmptyDiv />
            )}
          </div>
          <div className="flex flex-col justify-items-start items-start my-5">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Date
            </label>
            <Controller
              control={control}
              name="date"
              defaultValue={new Date()}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  // wrapperClassName="w-50"
                  className="w-170 px-5 py-2 bg-transparent border outline-none border-zinc-600 rounded placeholder:text-zinc-500 focus:border-grey"
                />
              )}
            />
            <EmptyDiv />
          </div>
          <div className="flex flex-col justify-items-start items-start my-5">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <select
              className="w-250 pl-4 pr-3 py-2 bg-transparent border outline-none border-zinc-600 rounded placeholder:text-zinc-500 focus:border-grey"
              {...register('category')}
              defaultValue={''}
            >
              <option value="" disabled>
                Categories
              </option>
              <option value={'groceries'}>Groceries</option>
              <option value={'gas'}>Gas</option>
              <option value={'insurance'}>Insurance</option>
              <option value={'utilities'}>Utilities</option>
              <option value={'resturants'}>Resturants</option>
              <option value={'entertainment'}>Entertainment</option>
              <option value={'misc'}>Misc</option>
            </select>
            {/*errors.category && <p style={{ color: '#bf1650', fontSize: 14 }}>{errors.category.message}</p>*/}
            {errors.category ? (
              <div className="text-red-error">
                <ErrorMessage errors={errors} name="category" />
              </div>
            ) : (
              <EmptyDiv />
            )}
          </div>
          <div className="flex flex-col relative justify-items-start items-start my-5">
            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Amount
            </label>
            <svg
              className="absolute top-9 left-1 w-6 h-6 text-gray-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
              />
            </svg>

            <Input
              type="number"
              placeholder="Amount ..."
              style={{ width: '120px' }}
              className="pl-6 pr-2 remove-arrow"
              {...register('amount')}
            />
            {/*errors.amount && <p style={{ color: '#bf1650', fontSize: 14 }}>{errors.amount.message}</p>*/}
            {errors.amount ? (
              <div className="text-red-error">
                <ErrorMessage errors={errors} name="amount" />
              </div>
            ) : (
              <EmptyDiv />
            )}
          </div>
          <button
            type="submit"
            className="mt-1 px-6 py-2 text-sm font-normal text-blue-900 border-2 border-blue-900 active:scale-95 rounded"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};
