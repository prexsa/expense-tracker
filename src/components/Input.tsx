import { FC, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import cn from 'classnames';

export type InputSize = 'medium' | 'large';
export type InputType = 'text' | 'email' | 'number';

export type InputProps = {
  // id: string;
  name: string;
  // label: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in InputSize]: string } = {
  medium: 'p-3 text-base',
  large: 'p-4 text-base',
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ name, type = 'text', size = 'medium', className = '', placeholder, ...props }, ref) => {
    return (
      <input
        // id={id}
        ref={ref}
        name={name}
        type={type}
        // aria-label={label}
        placeholder={placeholder}
        className={cn([
          'w-150 px-5 py-2 bg-transparent border outline-none border-zinc-600 rounded placeholder:text-zinc-500 focus:border-grey',
          sizeMap[size],
          className,
        ])}
        {...props}
      />
    );
  },
);
