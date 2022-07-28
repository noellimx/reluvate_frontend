import * as React from "react";

import { Button, TextField } from "@mui/material";
import axios from "axios";
import config from "../../config";
const PaneGuessThatPokemon = ({
  tried,
  setTried,
  token,
}: {
  token: string | null;
  setTried: React.Dispatch<React.SetStateAction<number | null>>;
  tried: number | null;
}) => {
  const [guessValue, setGuessValue] = React.useState<number | null>(() => 0);

  const submitGuess = async (guessValue: number | null) => {
    if (guessValue == null) {
      return;
    }
    const response = await axios.post(
      config.paths.guess,
      {
        guess: guessValue,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,

          "Content-Type": "application/json",
        },
      }
    );
    console.log("[SubmitGuess]");
    console.log(response);
    console.log(response.data);

    const responseJSON = response.data;

    const tried = responseJSON?.tried;
    console.log(responseJSON);
    console.log(tried);

    setTried((_) => tried)
  };
  return (
    <>
      <div>Guess That Pokemon</div>
      <div> You've tried {tried} times. Guessing wrong from 3 times will refresh a new wild pokemon.</div>
      <TextField
        id="outlined-number"
        label="Number"
        type="number"
        value={guessValue}
        onChange={(event) => setGuessValue(Number(event.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        onClick={() => {
          submitGuess(guessValue);
        }}
      ></Button>
    </>
  );
};

export default PaneGuessThatPokemon;
