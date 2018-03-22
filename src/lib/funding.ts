import {range} from 'ramda';

export default [
  ...amounts(50000, 1000000, 50000),
  ...amounts(1000000, 5000000, 250000),
  ...amounts(5000000, 10000001, 1000000),
  {value: '10000001', label: `€${(10000001).toLocaleString()}+`}
];

function amounts(start: number, end: number, step: number) {
  return range(start, end)
    .filter((i) => i % step === 0)
    .map((i) => ({
      label: `€${i.toLocaleString()}`,
      value: i.toString()
    }));
}
