import {Currency} from './currency';

export type FieldCommon = {
  name: string;
  label?: string;
  value: string;
  defaultValue?: string;
};

type PickerItem = {
  label: string;
  value: string;
};

export type Field =
  | {
      type: 'short-text';
      style: 'short' | 'med' | 'long';
      placeholder?: string;
    } & FieldCommon
  | {type: 'long-text'; placeholder?: string; lines: number} & FieldCommon
  | {type: 'uri'; placeholder?: string} & FieldCommon
  | {type: 'email-address'; placeholder?: string} & FieldCommon
  | {type: 'number'; min?: number; max?: number} & FieldCommon
  | {type: 'currency'; currency: Currency; placeholder: string} & FieldCommon
  | {type: 'date'; min: Date; max: Date; placeholder?: string} & FieldCommon
  | {
      type: 'picker';
      style: 'short' | 'med' | 'long';
      items: PickerItem[];
    } & FieldCommon
  | {type: 'toggle'} & FieldCommon
  | {type: 'compound'; name: string; label?: string; fields: Field[]}
  | {type: 'multiple'; name: string; label?: string; fields: Field[]};
