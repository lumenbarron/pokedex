import React, { Component, useState, useEffect, } from 'react';
import { Provider } from 'react-redux'
//import generateStore from './redux/store'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Provider store={store}> */}
        <Route exact path="/" component={Home} />
        {/* <Route path="/add" component={AddTodo} />*/}
        <Route path="/:todo_id" component={Pokemon} />
        {/* </Provider> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
