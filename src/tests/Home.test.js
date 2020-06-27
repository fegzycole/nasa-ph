import React from 'react';
import {
  render, screen, waitForElement, fireEvent, cleanup,
} from '@testing-library/react';

import Home from '../containers/Home';
import Wrapper from './helpers/Wrapper';

afterEach(cleanup);

test('Can set a favorite image to localstorage successfully', async () => {
  const { getByText } = render(<Wrapper><Home /></Wrapper>);

  const favoriteBtn = await waitForElement(() => getByText(/Set Favorite/i));

  expect(favoriteBtn).toBeInTheDocument();

  fireEvent.click(favoriteBtn);

  expect(screen.getByText(/Remove Favorite/i)).toBeInTheDocument();

  const favorites = JSON.parse(localStorage.getItem('favorites'));

  expect(favorites.length).toBe(1);
});
