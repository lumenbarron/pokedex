import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Container, Row } from "react-bootstrap";
import generateStore from './redux/store'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import UserProfile from "./components/UserProfile";
import iconMenu from "./Assets/Icons/Menu.svg";
import logoPokemon from "./Assets/logo.png";
import './App.scss';


function App() {
  const store = generateStore();
  const [mobile, setMobile] = useState(false);

  const openToggle = () => {
    console.log('toogle')
    setMobile(!mobile)
  }

  return (
    <BrowserRouter>
      <Switch>
        <Provider store={store}>
          <Container fluid>
            <Row>
              <div className="container-user-pokemon">
                <div className='mobile mx-2'>
                  <button className="btn-menu img-btn-menu mt-2" onClick={() => openToggle()}><img src={iconMenu} alt="icon-Menu" /></button>
                  <img className="logo-pokemon"  alt="logo-pokemon" src={logoPokemon} />
                </div>
                {mobile ? <UserProfile /> : '' }
              </div>
              <div className="all-pokemon">
                <Route exact path="/" component={Home} />
                <Route path="/:id" component={Pokemon} />
              </div>
            </Row>
          </Container>
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
