import * as React from "react";

import { Button, TextField } from "@mui/material";
import axios from "axios";
import config from "../../config";

import {Pokemon} from "reluvate"
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



  const [rewards, setRewards] = React.useState<Pokemon[]>([])
  
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

    if(reply === "hit"){


        const prize_rewarded = JSON.parse(responseJSON.prize_rewarded)

        console.log(prize_rewarded)
        console.log()

        const reward:Pokemon = {
            id: prize_rewarded.id
            ,
            pokename: prize_rewarded.pokedex.pokename,
            trainer: prize_rewarded.trainer.username
        }
        console.log(prize_rewarded.pokedex.pokename)
        console.log(prize_rewarded.trainer.username)
        setRewards((rewards) => {
            return [...rewards, reward]
        })
        setTimeout( () => {
            setRewards((prev_rewards)=> {
                const current = prev_rewards.filter(prev_reward => prev_reward.id !== reward.id)
                return current
            })
        }, 3000)
        
    }
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
    {rewards.map(reward => <div> {reward.id}{reward.pokename}{reward.trainer}</div>)}
    </>
  );
};

export default PaneGuessThatPokemon;
