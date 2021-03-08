import React from 'react';
import { Provider } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
//import generateStore from './redux/store'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import UserProfile from "./components/UserProfile";
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Provider store={store}> */}
        <Container fluid>
        <Row>
          <Col className="container-user-pokemon" lg={3}>
            <UserProfile/>
          </Col>
          <Col className="all-pokemon" lg={9}>
        <Route exact path="/" component={Home} />
        {/* <Route path="/add" component={AddTodo} />*/}
        <Route path="/:id" component={Pokemon} />
        </Col>
        </Row>
      </Container>
        {/* </Provider> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
