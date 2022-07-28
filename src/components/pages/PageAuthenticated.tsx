import * as React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";

import PaneGuessThatPokemon from "../authenticatedPanes/PaneGuessThatPokemon";
import PaneMyPokemon from "../authenticatedPanes/PaneMyPokemon/PaneMyPokemon";

import axios from "axios";

import config from "../../config";

import { Pokemon } from "reluvate";
import {
  parsePokemonFromAPIString,
  parsePokemonsFromAPIString,
} from "../../utils/serializers";

export enum PaneOptions {
  myPokemon = "My Pokemons",
  pokedex = "pokedex",
  guessThatPokemon = "Guess That Pokemon",
}

const paneOptions: PaneOptions[] = Object.values(PaneOptions);

const PanesAuthenticated = ({
  setPaneSelection,
  paneSelection,
  tried,
  pokemonInventory,
  setTried,
  prize,
  setPrize,
  token,
  setPokemonInventory,
}: {
  pokemonInventory: Pokemon[];
  setPokemonInventory: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  prize: Pokemon | null;
  setPrize: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  tried: number | null;
  token: string | null;
  setPaneSelection: React.Dispatch<React.SetStateAction<PaneOptions | null>>;
  setTried: React.Dispatch<React.SetStateAction<number | null>>;
  paneSelection: PaneOptions | null;
}) => {
  return (
    <>
      <div className="app-responsive-bar">
        <ResponsiveAppBar
          paneOptions={paneOptions}
          setPaneSelection={setPaneSelection}
        />
      </div>
      <div className="app-body-content">
        {paneSelection === PaneOptions.myPokemon && (
          <PaneMyPokemon
            setPokemonInventory={setPokemonInventory}
            pokemonInventory={pokemonInventory}
            token={token}
          />
        )}
        {paneSelection === PaneOptions.pokedex && <div>Pokedex</div>}
        {paneSelection === PaneOptions.guessThatPokemon && (
          <PaneGuessThatPokemon
            prize={prize}
            setPrize={setPrize}
            setTried={setTried}
            token={token}
            tried={tried}
            setPokemonInventory={setPokemonInventory}
          />
        )}
        {paneSelection === null && (
          <div>Please select pane in navigation bar.</div>
        )}
      </div>
    </>
  );
};

const PageAuthenticated = ({ token }: { token: string | null }) => {
  const [paneSelection, setPaneSelection] = React.useState<PaneOptions | null>(
    null
  );

  const [tried, setTried] = React.useState<number | null>(null);

  const [prize, setPrize] = React.useState<Pokemon | null>(null);
  const [pokemonInventory, setPokemonInventory] = React.useState<Pokemon[]>([]);
  React.useEffect(() => {
    if (token == null) {
      return;
    }
    (async () => {
      console.log("With token" + token);

      const response = await axios.get(config.paths.howManyTriesAlready, {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      const tried = response.data.tried;
      const prize = parsePokemonFromAPIString(response.data.prize);
      setTried(tried);
      setPrize(prize);
    })();
    (async () => {
      const response = await axios.get(config.paths.ownedPokemons, {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("My Pokemons");
      const pokemons = parsePokemonsFromAPIString(response.data.pokemons);
      setPokemonInventory((prev) => {
        return [...prev, ...pokemons];
      });
    })();
  }, []);

  return (
    <PanesAuthenticated
      pokemonInventory={pokemonInventory}
      prize={prize}
      setPrize={setPrize}
      setTried={setTried}
      tried={tried}
      token={token}
      paneSelection={paneSelection}
      setPaneSelection={setPaneSelection}
      setPokemonInventory={setPokemonInventory}
    />
  );
};

export default PageAuthenticated;
