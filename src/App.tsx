import React from "react";
import "./App.css";

import { Token } from "reluvate";


import PageAuthenticated from "./components/pages/PageAuthenticated";
import PageLogin from "./components/pages/PageLogin";
const App = () => {
  const [token, setToken] = React.useState<Token>(null);

  return (
    <div className="app">
      {token == null ? (
        <PageLogin setToken={setToken} />
      ) : (
        <PageAuthenticated token={token} />
      )}
    </div>
  );
};

export default App;
