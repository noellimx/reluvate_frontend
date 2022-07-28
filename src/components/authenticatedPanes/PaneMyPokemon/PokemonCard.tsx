import * as React from "react";

import { Pokemon } from "reluvate";

import { Button } from "@mui/material";

import axios from "axios";

import config from "../../../config";

const PokemonCard = ({
  token,
  pokemon,
  showRelease,
  setPokemonInventory,
}: {
  setPokemonInventory?: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  token?: string | null;
  showRelease?: boolean;
  pokemon: Pokemon;
}) => {
  return (
    <div className="my-poke-card">
      <div className="my-poke-card-text my-poke-card-text-id">{`#${pokemon.id}`}</div>
      <div className="my-poke-card-text my-poke-card-text-pokename">
        {pokemon.pokename}
      </div>
      {showRelease && (
        <Button
          onClick={async () => {
            const response = await axios.post(
              config.paths.release,
              { id: pokemon.id },
              {
                headers: {
                  Authorization: `JWT ${token}`,

                  "Content-Type": "application/json",
                },
              }
            );

            try {
              const removed_id = response.data?.removed_id;

              if (removed_id !== undefined) {
                const _n = Number(removed_id);
                setPokemonInventory &&
                  setPokemonInventory((prev: Pokemon[]) => {
                    const current = prev.filter((p) => p.id !== _n);
                    return [...current];
                  });
              }
            } catch {}
          }}
          style={{ color: "red" }}
          className="my-poke-card-release"
        >
          Release
        </Button>
      )}
    </div>
  );
};
export default PokemonCard;
