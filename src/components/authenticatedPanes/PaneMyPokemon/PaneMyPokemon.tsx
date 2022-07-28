import * as React from "react";

import { Pokemon } from "reluvate";

import PokemonCard from "./PokemonCard";

const PaneMyPokemon = ({
  pokemonInventory,
}: {
  pokemonInventory: Pokemon[];
}) => {
  return (
    <div className="pane-my-pokemon">
      <div className="pane-description"> {`My Pokemons (Total:${pokemonInventory.length})`}</div>
      <div className="my-poke-cards">
        {pokemonInventory.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
};

export default PaneMyPokemon;
