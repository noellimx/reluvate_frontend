import * as React from "react";

import { Pokemon } from "reluvate";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="my-poke-card">
      <div className="my-poke-card-text my-poke-card-text-id">{`#${pokemon.id}`}</div>
      <div className="my-poke-card-text my-poke-card-text-pokename">{pokemon.pokename}</div>
    </div>
  );
};
export default PokemonCard;
