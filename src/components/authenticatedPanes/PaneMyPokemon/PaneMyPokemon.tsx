import * as React from "react";

import { Pokemon } from "reluvate";

import PokemonCard from "./PokemonCard";

const PaneMyPokemon = ({
  pokemonInventory,
  token,
  setPokemonInventory,
}: {
  pokemonInventory: Pokemon[];
  setPokemonInventory: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  token: string | null;
}) => {
  return (
    <div className="pane-my-pokemon">
      <div className="pane-description">
        {" "}
        {`My Pokemons (Total:${pokemonInventory.length})`}
      </div>
      <div className="my-poke-cards">
        {pokemonInventory.map((p) => (
          <PokemonCard
            setPokemonInventory={setPokemonInventory}
            token={token}
            showRelease={true}
            key={p.id}
            pokemon={p}
          />
        ))}
      </div>
    </div>
  );
};

export default PaneMyPokemon;
