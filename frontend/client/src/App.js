import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {Provider} from 'react-redux'
import store from './store'
import setAuthToken from "./Util/setAuthToken";
import { setCurrentUser } from './actions/authActions';

import Navbar from "./components/general/Navbar";
import Heroproduct from "./components/general/landing/Heroproduct";

if(localStorage.token){
  setAuthToken(localStorage.token); 
}

function App() {
  useEffect(() => {
    store.dispatch(setCurrentUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          {/* <Route exact path="/" component={Heroproduct} /> */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
