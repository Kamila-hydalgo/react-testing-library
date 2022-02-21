import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente PokemonDetails.js ', () => {
  it(`Teste se as informações detalhadas do Pokémon selecionado
  são mostradas na tela`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const pikachuDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pikachuDetails).toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(summary).toBeInTheDocument();

    const paragraph = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(paragraph).toBeInTheDocument();
  });

  it(`Teste se existe na página uma seção com os mapas
  contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const gamesOfPikachu = screen
      .getByRole('heading', { level: 2, name: /game locations of pikachu/i });
    expect(gamesOfPikachu).toBeInTheDocument();

    const locations = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(locations).toHaveLength(2);

    const locationNameOne = screen.getByText(/kanto viridian forest/i);
    const locationNameTwo = screen.getByText(/kanto power plant/i);
    expect(locationNameOne && locationNameTwo).toBeInTheDocument();

    expect(locations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it(`Teste se o usuário pode favoritar um pokémon
  através da página de detalhes`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemon);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
