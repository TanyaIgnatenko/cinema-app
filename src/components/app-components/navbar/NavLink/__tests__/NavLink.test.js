import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from 'react-testing-library/typings';
import 'react-testing-library/cleanup-after-each';
import { createBrowserHistory } from 'history';

import NavLink from '../NavLink';

test('render link with the given label', () => {
  const history = createBrowserHistory();
  const linkLabel = 'Ссылка';
  const { getByTestId } = render(
    <Router history={history}>
      <NavLink to=''>{linkLabel}</NavLink>
    </Router>,
  );

  const link = getByTestId('link');

  expect(link.textContent).toBe(linkLabel);
});

test('become active after clicked', () => {
  const history = createBrowserHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <NavLink to='hhh'>Ссылка</NavLink>
    </Router>,
  );

  //TODO: not working :(
  const link = getByTestId('link');
  fireEvent.click(link);

  const linkBox = getByTestId('link-box');
  expect(linkBox.className).toContain('activeLinkBox');
});

test('become active after url is set to the same route', () => {
  const linkRoute = '/page';
  const history = createBrowserHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <NavLink to={linkRoute}>Ссылка</NavLink>
    </Router>,
  );

  history.push(linkRoute);

  const link = getByTestId('link');
  const linkBox = getByTestId('link-box');
  expect(link.className).toContain('activeLink');
  expect(linkBox.className).toContain('activeLinkBox');
});

test('non-active when url is set to other route', () => {
  const linkRoute = '/page1';
  const otherLinkRoute = '/page2';
  const history = createBrowserHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <NavLink to={linkRoute}>Ссылка</NavLink>
    </Router>,
  );

  history.push(otherLinkRoute);

  const link = getByTestId('link');
  const linkBox = getByTestId('link-box');
  expect(link.className).not.toContain('activeLink');
  expect(linkBox.className).not.toContain('activeLinkBox');
});
