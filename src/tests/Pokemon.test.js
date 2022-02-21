import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('Teste o componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const typePikachu = screen.getByTestId('pokemon-type');
    expect(typePikachu.innerHTML).toBe('Electric');

    const weightPikachu = screen.getByText(/Average weight: 6.0 kg/i);
    expect(weightPikachu).toBeInTheDocument();

    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImg).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pikachuImg).toHaveProperty('alt', 'Pikachu sprite');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para
  exibir detalhes deste Pokémon.O link deve possuir a URL /pokemons/<id>, 
  onde <id> é o id do Pokémon exibido;`, () => {
    const { history } = renderWithRouter(<App />);

    const linkPikachu = screen.getByRole('link', { name: /more details/i });
    expect(linkPikachu).toBeDefined();
    userEvent.click(linkPikachu);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it(`Teste se existe um ícone de estrela nos Pokémons favoritados.
  O ícone deve ser uma imagem com o src contendo o caminho /star-icon.svg`, () => {
    renderWithRouter(<App />);
    const linkPikachu = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkPikachu);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    const favorPage = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorPage);
    const favorPokemons = screen
      .getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorPokemons).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(favorPokemons.alt).toBe('Pikachu is marked as favorite');
  });
});
