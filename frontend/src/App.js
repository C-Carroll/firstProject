import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/SpotsBrowser";
import SpotDetails from "./components/Spot"
import CreateSpot from "./components/CreateSpot"

import Modal from "./components/LoginFormModal/LoginModal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [openModal, setModalOpen] = useState(false)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotsBrowser />
          </Route>
          <Route path='/spot/new'>
            <CreateSpot />
          </Route>
          <Route path={`/spots/:spotId`}>
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
