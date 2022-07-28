import { Pokemon } from "reluvate";

const parsePokemonFromAPIJSON: (_pokemon: any) => Pokemon | null = (
  _pokemon
) => {
  try {
    return _pokemon === null
      ? null
      : {
          id: _pokemon.id,
          pokename: _pokemon.pokedex.pokename,
          trainer: _pokemon.trainer?.username,
        };
  } catch {
    return null;
  }
};

export const parsePokemonFromAPIString: (_pokemon: string) => Pokemon | null = (
  _pokemon
) => {
  try {
    const pokemon = JSON.parse(_pokemon);

    return pokemon === null ? null : parsePokemonFromAPIJSON(pokemon);
  } catch {
    return null;
  }
};

export const parsePokemonsFromAPIString: (_pokemons: string) => Pokemon[] = (
  _pokemons
) => {
  try {
    const pokemons = JSON.parse(_pokemons);

    return pokemons
      .map(parsePokemonFromAPIJSON)
      .filter((p: Pokemon | null) => p !== null);
  } catch {
    return [];
  }
};
