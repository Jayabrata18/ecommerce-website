import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {Provider} from 'react-redux'
import store from './store'
import setAuthToken from "./Util/setAuthToken";
import { login, register, setCurrentUser } from './actions/authActions';

import Landing from './components/general/landing';

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
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={register} />
          <Route exact path="/login" component={login} />

          {/* <Route exact path="/" component={Heroproduct} /> */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
