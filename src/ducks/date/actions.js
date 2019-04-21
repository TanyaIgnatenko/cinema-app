import { SELECT_DATE } from './action-types';

const selectDate = date => ({
  type: SELECT_DATE,
  date,
});

export { selectDate };
