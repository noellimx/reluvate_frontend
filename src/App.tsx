import React from "react";
import "./App.css";

import { Button, TextField } from "@mui/material";

const PageAuthenticated = () => {
  return <>Authenticated</>;
};
const PageLogin = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <>
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
      <Button variant="outlined" onClick={() => {

        
      }}>Login</Button>
    </>
  );
};
const App = () => {
  const [token, setToken] = React.useState<string | null>(null);

  return (
    <div className="app">
      {token == null ? <PageLogin /> : <PageAuthenticated />}
    </div>
  );
};

export default App;
