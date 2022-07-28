import React from "react";
import "./App.css";

import { Token } from "reluvate";


import PageAuthenticated from "./components/pages/PageAuthenticated";
import PageLogin from "./components/pages/PageLogin";
import GitHubIcon from '@mui/icons-material/GitHub';



const GithubLinks = ({description, link}: {description: string, link : string}) => {

  return <div className="footer-github-link"><GitHubIcon fontSize={"small"}></GitHubIcon><div className="footer-github-link-description"><a href={link}>{description}</a></div></div>
}
const App = () => {
  const [token, setToken] = React.useState<Token>(null);

  return (
    <div className="App">
      {token == null ? (
        <PageLogin setToken={setToken} />
      ) : (
        <PageAuthenticated token={token} />
      )}

      <div className="footer"><div className="footer-demo-account">Demo Account: user | 12345</div><GithubLinks description={"Backend"} link={"https://github.com/noellimx/reluvate_backend"}/><GithubLinks description={"Frontend"} link={"/"}/></div>
    </div>
  );
};

export default App;
