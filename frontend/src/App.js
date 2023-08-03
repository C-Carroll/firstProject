import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/SpotsBrowser";
import SpotDetails from "./components/Spot"
import CreateSpot from "./components/CreateSpot"
import Modal from "./components/LoginFormPage/LoginModal";

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
          <Route path="/login">
            <LoginFormPage />
            {/* <Modal /> */}
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <SpotsBrowser />
          </Route>
          <Route path="/spots/new">
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
