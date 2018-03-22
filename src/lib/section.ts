import {Question} from './question';

export type Section = {
  title: string;
  path: string;
  questions: Question[];
};
