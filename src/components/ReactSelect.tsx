import Select from 'react-select';

export interface ISelectProps {
  options: {
    value: string;
    label: string;
  }[];
}

export const ReactSelect = ({ options }: ISelectProps) => <Select options={options} />;
