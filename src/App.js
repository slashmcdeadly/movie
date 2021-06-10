import './App.css';
import {useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer'; 
import SignUp from './components/SignUp';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

function App() {

  const [ user, setUser] = useState(undefined);

  const getUser = useCallback(async function() {
    try {
      const response = await fetch("/api/users/me", {
        headers: {
          // by default this is set to 'same-origin' which will work in development
          credentials: 'include',
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }

      setUser(json.data);
    } catch (err) {
      setUser(undefined);
      console.log({ err });
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);
  
  const logOut = () => {
    setUser(undefined);
  }

  return (
    <div className="App">
      <Router>
      <button className="logOut" onClick={logOut}>Log Out</button>
        <Switch>


          <Route exact
            path="/login"
            render={props => {
              if (user) {
                return <Redirect to="/" />;
              }

              return <Header getUser={getUser} {...props} />;
            }}
          />

          <Route
            exact
            path="/signup"
            render={props => {
              if (user) {
                return <Redirect to="/" />;
              }
              return <SignUp getUser={getUser} updateUser={setUser} {...props} />;
            }}
          />

          <Route
            path="/"
            render={props => {
              if (!user) {
                return <Redirect to="/login" />;
              }

              return <Body user={user} {...props} getUser={getUser} {...props} />;
            }}
          />

        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
