import { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { useExpense } from '../context/useExpense';
import { Input } from './Input';
import DatePicker from 'react-datepicker';
import { Switch, Button } from '@headlessui/react';

import 'react-datepicker/dist/react-datepicker.css';

export interface IFormValues {
  description: string;
  category: string;
  amount: number;
  date: Date;
  isRecurring: boolean;
}

export interface ISaveProps {
  saveData: (data: IFormValues) => void;
}

const schema = yup.object({
  description: yup.string().required('Description is required').max(25, 'Description is too long'),
  date: yup.date().default(() => new Date()),
  category: yup.string().required('Category is required'),
  amount: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .required('Amount is required'),
  isRecurring: yup.boolean().default(false),
});

const EmptyDiv = () => <div className="invisible">empty</div>;

export const AddExpense = ({ saveData }: ISaveProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { addExpense } = useExpense();
  const [isRecurring, setIsRecurring] = useState<boolean>(false);

  // use watch to monitor switch value change for ui
  useEffect(() => {
    const subscription = watch((value) => setIsRecurring(Boolean(value.isRecurring)));
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleOnSubmit: SubmitHandler<IFormValues> = ({
    description,
    date,
    category,
    amount,
    isRecurring,
  }: IFormValues) => {
    // saveData({ date, category, amount, description, isRecurring });
    addExpense({ date, category, amount, description, isRecurring });
    console.log({ date, category, amount, description, isRecurring });
    // 'saveData' is used for testing form
    reset();
  };

  return (
    <>
      <h3 className="mt-10 text-center text-lg font-bold">Add expenses</h3>
      <form className="w-full" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="flex items-center w-full gap-2 m-auto">
          <div className="flex flex-col justify-items-start items-start my-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <Input id="description" type="text" placeholder="A short description ..." {...register('description')} />
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
                  id="date"
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
              id="category"
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
              id="amount"
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
          {/*<button
            type="submit"
            className="mt-1 px-6 py-2 text-sm font-normal text-blue-900 border-2 border-blue-900 active:scale-95 rounded"
          >
            Add
          </button>*/}
        </div>
        <div className="text-center">
          <div>
            <div className="inline-flex gap-x-2">
              <h3>Is expense recurring?</h3>
              <Controller
                name="isRecurring"
                control={control}
                render={({ field }) => (
                  <Switch
                    onChange={(val: boolean) => field.onChange(Boolean(val))}
                    checked={Boolean(field.value)}
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-black/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#0284c7]"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block size-5 translate-x-0 -translate-y-px rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                    />
                  </Switch>
                )}
              />

              <h3 className="text-center text-lg font-medium">{isRecurring ? 'Yes ' : 'No'}</h3>
            </div>
          </div>
          {/*<Button
            type="submit"
            className="mt-1 px-6 py-2 text-sm font-normal text-blue-900 border-2 border-blue-900 active:scale-95 rounded"
          >
            Add
          </Button>*/}
          <Button
            type="submit"
            className="mt-1 px-6 py-2 text-sm font-normal transition-all border-2 bg-[#3b82f6] text-white shadow-lg hover:-translate-y-0.5 hover:shadow-blue-300 hover:border-b-[2px] active:shadow-none"
          >
            Add
          </Button>
        </div>
      </form>
    </>
  );
};

// https://codesandbox.io/p/sandbox/convert-in-boolean-with-rhf-and-zod-solved-1s3sf7?file=%2Fsrc%2FApp.js
/*<label className="relative inline-flex cursor-pointer items-center">
  <input id="switch-3" type="checkbox" className="peer sr-only" {...register('isRecurring')} />
  <label htmlFor="switch-3" className="hidden"></label>
  <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:top-0.5 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-500 peer-checked:after:translate-x-full peer-focus:ring-sky-500"></div>
</label>*/

// https://headlessui.com/react/switch
// https://www.codemancers.com/blog/2024-02-22-react-hook-foem-with-headless-ui/
