import React from 'react';
import logo from './logo.svg';
import './App.css';



const Page_Authenticated = () => {

  return <>Authenticated</>
}
const Page_Login = () => {
  return <>Login</>
}
const App = () => {


  const [token , setToken] = React.useState<string | null>(null) 




  return (
    <div className="app">
      {token == null ? <Page_Login /> : <Page_Authenticated />}
    </div>
  );
}

export default App;
