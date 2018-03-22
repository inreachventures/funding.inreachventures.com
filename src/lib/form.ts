import {Section} from './section';

export type Submission = {
  id: string;
  created_at: Date;
  updated_at: Date;
  submission: {sections: Section[]} | null;
  answers: object | null;
};

export type Form = {
  id: string;
  update(path: ReadonlyArray<string | number>, value: string): void;
  save(): Promise<Submission>;
  submit(): Promise<{}>;
  sections: Section[];
};
