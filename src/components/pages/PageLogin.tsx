import React from "react";

import { Token } from "reluvate";

import { Button, TextField } from "@mui/material";

import config from "../../config";

import axios from "axios";

import qs from "qs";

const { paths } = config;
const PageLogin = ({
  setToken,
}: {
  setToken: React.Dispatch<React.SetStateAction<Token>>;
}) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [errorDescription, setErrorDescription] = React.useState<string>("");
  return (
    <div className="page-login">
      <div className="login-form">
        <header className="login-form-header">Enter your credentials</header>
        <div className="login-form-fields">
          <TextField
            id="outlined-basic"
            label="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            variant="outlined"
            size="small"
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
            size="small"
          />
        </div>
        <div className="login-form-submit">
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

                const auth_token = _response.data?.access;

                auth_token && setToken(auth_token);
              } catch (err) {
                console.log(err);
                setErrorDescription(
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
          <div className="login-form-error">{errorDescription}</div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
