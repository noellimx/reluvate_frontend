
import { Pokemon } from "reluvate";

export const parsePokemonFromAPI: (_pokemon: string) => Pokemon | null = (
  _pokemon
) => {
  const pokemon = JSON.parse(_pokemon);

  if (pokemon === null) {
    return null;
  }
  return {
    id: pokemon.id,
    pokename: pokemon.pokedex.pokename,
    trainer: pokemon.trainer?.username,
  };
};



