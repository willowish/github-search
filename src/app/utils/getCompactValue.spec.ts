import { getCompactValue } from 'src/app/utils/getCompactValue';
import { describe } from 'vitest';

describe('getCompactValue', () => {
  const testValues = [
    {value: 0, expected: '0'},
    {value: 1, expected: '1'},
    {value: 10, expected: '10'},
    {value: 100, expected: '100'},
    {value: 1000, expected: '1K'},
    {value: 10000, expected: '10K'},
    {value: 100000, expected: '100K'},
    {value: 1000000, expected: '1M'},
    {value: 1500000, expected: '1.5M'},
    {value: 10000000, expected: '10M'},
    {value: 100000000, expected: '100M'},
    {value: 1000000000, expected: '1B'},
    {value: 10000000000, expected: '10B'},
    ];
  it('should return the correct compact value', () => {
    testValues.forEach(({value, expected}) => {
      const result = getCompactValue(value);
      expect(result).toBe(expected);
    });
  });
});
