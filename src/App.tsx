import React from "react";
import "./App.css";

import { Token } from "reluvate";

import { Button, TextField } from "@mui/material";

import SETTINGS from "./config";

import axios from "axios";

import qs from "qs";

import PageAuthenticated from "./components/pages/PageAuthenticated";

const { serverUrl } = SETTINGS;

const paths = {
  login: `${serverUrl}/auth/token/login`,
};

console.log(paths);
const PageLogin = ({
  setToken,
}: {
  setToken: React.Dispatch<React.SetStateAction<Token>>;
}) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [description, setDescription] = React.useState<string>("");
  return (
    <>
      <div>
        <header>Enter your credentials</header>
        <TextField
          id="outlined-basic"
          label="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          variant="outlined"
          type="password"
        />
        <Button
          variant="outlined"
          onClick={async () => {
            try {
              const _response = await axios.post(
                paths.login,
                qs.stringify({
                  username,
                  password,
                }),
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              );

              console.log("_response");
              console.log(_response);
              console.log(_response.data?.auth_token);

              const auth_token = _response.data?.auth_token;

              auth_token && setToken(auth_token);

              throw new Error(_response.data);
            } catch (err) {
              setDescription(
                `Some error occurred: ${err}. You may attempt again.`
              );
            }
            setPassword("");
          }}
        >
          Login
        </Button>
      </div>

      <div>
        <div>{description}</div>
      </div>
    </>
  );
};
const App = () => {
  const [token, setToken] = React.useState<Token>(null);

  return (
    <div className="app">
      {token == null ? (
        <PageLogin setToken={setToken} />
      ) : (
        <PageAuthenticated />
      )}
    </div>
  );
};

export default App;
