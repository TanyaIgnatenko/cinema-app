import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import VerticalLine from '../VerticalLine';

test('render div with given length and width', () => {
  const { getByTestId } = render(<VerticalLine length={200} width={5} />);

  const line = getByTestId('line');

  expect(line.style.height).toBe('200px');
  expect(line.style.width).toBe('5px');
});

test('render div with given length and default width', () => {
  const { getByTestId } = render(<VerticalLine length={200} />);

  const line = getByTestId('line');

  expect(line.style.height).toBe('200px');
  expect(line.style.width).toBe('2px');
});
