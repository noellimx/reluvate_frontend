import * as React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";

import PaneGuessThatPokemon from "../authenticatedPanes/PaneGuessThatPokemon";

import axios from "axios";

import config from "../../config";

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
  setTried,
  token,
}: {
  tried: number | null;
  token: string | null;
  setPaneSelection: React.Dispatch<React.SetStateAction<PaneOptions | null>>;
  setTried: React.Dispatch<React.SetStateAction<number | null>>;
  paneSelection: PaneOptions | null;
}) => {
  return (
    <>
      <div>
        <ResponsiveAppBar
          paneOptions={paneOptions}
          setPaneSelection={setPaneSelection}
        />
      </div>
      {paneSelection === PaneOptions.myPokemon && <div>My Pokemons</div>}
      {paneSelection === PaneOptions.pokedex && <div>Pokedex</div>}
      {paneSelection === PaneOptions.guessThatPokemon && (
        <PaneGuessThatPokemon setTried={setTried} token={token} tried={tried} />
      )}
      {paneSelection === null && (
        <div>Please select pane in navigation bar.</div>
      )}
    </>
  );
};

const PageAuthenticated = ({ token }: { token: string | null }) => {
  const [paneSelection, setPaneSelection] = React.useState<PaneOptions | null>(
    null
  );

  const [tried, setTried] = React.useState<number | null>(null);

  const [prize, setPrize] = React.useState<string | null>(null);

  React.useEffect(() => {
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

      setTried(tried);
    })();
  }, [token]);

  return (
    <PanesAuthenticated
      setTried={setTried}
      tried={tried}
      token={token}
      paneSelection={paneSelection}
      setPaneSelection={setPaneSelection}
    />
  );
};

export default PageAuthenticated;
