import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('testando o componente NotFound', () => {
  test('verifica página contém um heading com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const notFound = screen
      .getByRole('heading', { name: /page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const image = screen
      .getByRole('img', { name: /pikachu crying because the page/i });
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
