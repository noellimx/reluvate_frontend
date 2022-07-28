import * as React from "react";

import { Button, TextField } from "@mui/material";
import axios from "axios";
import config from "../../config";

import { Pokemon } from "reluvate";

import PokemonCard from "./PaneMyPokemon/PokemonCard";

import { parsePokemonFromAPIString } from "../../utils/serializers";
const PaneGuessThatPokemon = ({
  tried,
  setTried,
  token,
  setPokemonInventory,
  prize,
  setPrize,
}: {
  setPokemonInventory: React.Dispatch<React.SetStateAction<Pokemon[]>>;

  token: string | null;
  setTried: React.Dispatch<React.SetStateAction<number | null>>;
  tried: number | null;
  prize: Pokemon | null;
  setPrize: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}) => {
  const [guessValue, setGuessValue] = React.useState<number | null>(() => 0);

  const [rewards, setRewards] = React.useState<Pokemon[]>([]);

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
    console.log(responseJSON);

    const tried = responseJSON.tried;
    const reply = responseJSON.reply;

    if (reply === "hit") {
      const reward: Pokemon | null = parsePokemonFromAPIString(
        responseJSON.prize_rewarded
      );

      if (reward !== null) {
        setPokemonInventory((prev) => [...prev, reward]);
        setRewards((rewards) => {
          return [...rewards, reward];
        });

        setTimeout(() => {
          setRewards((prev_rewards) => {
            const next = prev_rewards.filter(
              (prev_reward) => prev_reward.id !== reward.id
            );
            return next;
          });
        }, 6000);
      }
    }

    const prize: Pokemon | null = parsePokemonFromAPIString(
      responseJSON.prize_next
    );
    console.log(prize);
    console.log("prize");
    if (prize !== null) {
      setPrize(prize);
    }

    setTried((_) => tried);
  };
  return (
    <div className="pane-guess-that-pokemon">
      <div className="pane-description pane-description-guess">
        Guess That Pokemon
      </div>
      <div>
        {" "}
        You've tried {tried} times. Guessing wrong for consecutively 3 times
        will refresh a new wild pokemon.
      </div>

      <div className="line-spacing-10"></div>
      <div className="pane-guess-that-pokemon-form">
        <TextField
          id="outlined-number"
          className="guess-field"
          type="number"
          size="small"
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
          value={"GUESS"}
        >
          GUESS
        </Button>
      </div>
      {rewards.map((reward) => (
        <div key={reward.id} className="pane-guess-reward-notification">
          <div className={"pane-guess-reward-notification-text"}>
            You win a pokemon!!
          </div>

          <PokemonCard pokemon={reward} />
        </div>
      ))}

      {prize && <div>Your next prize is {prize.pokename}</div>}
    </div>
  );
};

export default PaneGuessThatPokemon;
