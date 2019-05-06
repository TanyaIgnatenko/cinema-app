import React from 'react';
import { render } from 'react-testing-library/typings';
import 'react-testing-library/cleanup-after-each';

import Line from '../Line';

test('render div with given width and height', () => {
  const { getByTestId } = render(<Line width={200} height={100} />);

  const line = getByTestId('line');

  expect(line.style.width).toBe('200px');
  expect(line.style.height).toBe('100px');
});
