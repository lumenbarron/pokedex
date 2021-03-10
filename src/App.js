import React from 'react';
import { Provider } from 'react-redux';
import generateStore from './redux/store'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import './App.scss';


function App() {
  const store = generateStore();
  return (
    <BrowserRouter>
      <Switch>
        <Provider store={store}>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={Pokemon} />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
