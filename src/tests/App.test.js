import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';

describe('testando o componente App', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
  });
  test('verifica se redireciona para a página inicial, na URL / ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });

      userEvent.click(homeLink);
      expect(history.location.pathname).toBe('/');
    });
  test('teste se ao clicar no link About renderiza para /about',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: /about/i });

      userEvent.click(aboutLink);
      expect(history.location.pathname).toBe('/about');
    });
  test('teste se ao clicar no link Pokémons Favoritados renderiza para /favorites',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

      userEvent.click(favoriteLink);
      expect(history.location.pathname).toBe('/favorites');
    });
  test('verifica se vai para a página Not Found ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/xablau');
      const notFound = screen.getByText(/Page requested not found/i);
      expect(notFound).toBeInTheDocument();
    });
});
