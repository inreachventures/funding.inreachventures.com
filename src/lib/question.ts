import {Field} from './field';

export type Question = {
  title: string;
  hint?: string;
  fields: Field[];
};
