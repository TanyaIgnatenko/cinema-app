import { dateRange, toMoment } from '../date';

describe('dateRange', () => {
  it('should return array of dates from given start moment to given end moment', () => {
    const startMoment = toMoment('2019-04-01');
    const endMoment = toMoment('2019-04-05');

    const dateRange = dateRange(startMoment, endMoment);

    const expectedDateRange = [
      toMoment('2019-04-01'),
      toMoment('2019-04-02'),
      toMoment('2019-04-03'),
      toMoment('2019-04-04'),
      toMoment('2019-04-05'),
    ];

    expect(dateRange.length).toBe(expectedDateRange.length);
    for (let i = 0; i < dateRange.length; ++i) {
      expect(dateRange[i].isSame(expectedDateRange[i])).toBe(true);
    }
  });
});
