import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('testando o componente FavoritePokemons', () => {
  it('verifica na tela a msg,se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);
    const noFavPok = screen.getByText(/no favorite pokemon found/i);
    expect(noFavPok).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkFav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkFav);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
