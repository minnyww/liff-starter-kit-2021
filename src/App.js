import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import liff from "@line/liff";

export default function App() {
  const [userProfile, setUserProfile] = useState();
  const initialize = useCallback(async () => {
    liff.init({ liffId: "1654439095-No9bR5K2" });
    if (liff.isLoggedIn()) {
      const user = await liff.getProfile();
      setUserProfile(user);
    } else if (!liff.isLoggedIn()) {
      liff.login();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("load", initialize());
  }, [initialize]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users userProfile={userProfile} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users({ userProfile }) {
  return <h2>Users : {JSON.stringify(userProfile)}</h2>;
}
