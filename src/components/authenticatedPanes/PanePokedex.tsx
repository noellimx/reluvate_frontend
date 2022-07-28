import * as React from "react";
import { Pokemon } from "reluvate";

import axios from "axios";

import config from "../../config";
const PanePokedex = ({
  pokemonInventory,
  token,
}: {
  token: string | null;
  pokemonInventory: Pokemon[];
}) => {
  const [unownedPokedex, setUnownedPokedex] = React.useState<string[]>([]);

  React.useEffect(() => {
    (async () => {
     const response =  await axios.get(config.paths.unownedPokedex, {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUnownedPokedex(() => response.data.pokedex)
    })();
  }, [pokemonInventory]);

  return <div><div className="pane-description pane-description-pokedex">Pokedex</div><div>
    
    {unownedPokedex.length > 0 ? <div>


<div className="unowned-pokedex-item"> {`The following ${unownedPokedex.length} pokemon${unownedPokedex.length === 1 ? "" : 's'} have not been captured:`} </div>
{unownedPokedex.map(p => <div key={p}>{p}</div>)}
</div> : <div>{`You have completed the pokedex :]`}</div>}




</div></div>;
};

export default PanePokedex;
