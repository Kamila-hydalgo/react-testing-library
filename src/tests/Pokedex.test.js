import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

import renderWithRouter from './renderWithRouter';

describe('testando o componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const text = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(text).toBeInTheDocument();
  });

  it('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('Os próximos Pokémons da lista devem ser mostrados ao clicar no botão', () => {
    renderWithRouter(<App />);

    const pokemonList = pokemons.map(({ name }) => name);

    const clickNext = () => {
      const next = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(next);
    };

    pokemonList.forEach((poke) => {
      const pokemon = screen.getByText(poke);
      expect(pokemon).toBeDefined();
      clickNext();
    });
  });

  it('O prim Pokémon aparece ao clicar no botão, se estiver no último Pokémon', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);

    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    const lastPokemon = screen.getByText(/dragonair/i);
    expect(lastPokemon).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  it('Deve existir um botão de filtragem p/ cada tipo de Pokémon, sem repetição.', () => {
    renderWithRouter(<App />);

    const numberOfTypes = 7;
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton.length).toBe(numberOfTypes);
  });

  it('selecionando botão de tipo, deve mostrar somente pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);

    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();
  });

  it('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeVisible();
  });

  it('Deverá mostrar os Pokémons normalmente quando o botão All for clicado', () => {
    renderWithRouter(<App />);
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
