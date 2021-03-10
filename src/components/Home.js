import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardPokemon from "./CardPokemons";
import FullCardPokemon from "./FullCardPokemon";
import UserProfile from "./UserProfile";
import iconSearch from "../Assets/Icons/Search.svg";
import iconMenu from "../Assets/Icons/Menu.svg";
import logoPokemon from "../Assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonsAction,
  getNextPokemonsAction,
  getPrevPokemonsAction,
} from "../redux/pokeReducer";

export default function Home() {
  const [eachPokemon, setEachPokemon] = useState();
  const [readyEachPoke, setReadyEachPoke] = useState(false);
  const [pokeError, setPokeError] = useState(false);
  const [mobile, setMobile] = useState(false);

  const dispatch = useDispatch();
  const pokemons = useSelector((store) => store.pokemons);

  //dispatch => getPokemonsAction => dispacth => type => return payload
  useEffect(() => {
    dispatch(getPokemonsAction());
  }, []);

  const next = () => {
    dispatch(getNextPokemonsAction());
  };

  const prev = () => {
    if (!pokemons.previous) return;
    dispatch(getPrevPokemonsAction());
  };

  const selectPokemon = (event) => {
    event.preventDefault();
    let name = event.target.value;
    if (name != "") {
      let selectPoke = pokemons.results.filter((poke) =>
        poke.name.includes(name)
      );
      if (selectPoke.length >= 1) {
        setEachPokemon(selectPoke);
        setReadyEachPoke(true);
        setPokeError(false);
      } else {
        setReadyEachPoke(false);
        setPokeError(true);
      }
    } else {
      setReadyEachPoke(false);
    }
  };

  const openToggle = () => {
    setMobile(!mobile);
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={3} xs={12} className="container-user-pokemon">
          <div className="mobile mx-2">
            <button
              className="btn-menu img-btn-menu mt-2"
              onClick={() => openToggle()}
            >
              <img src={iconMenu} alt="icon-Menu" />
            </button>
            <img
              className="logo-pokemon my-2"
              alt="logo-pokemon"
              src={logoPokemon}
            />
          </div>
          {mobile ? "" : <UserProfile />}
        </Col>
        <Col lg={9} xs={12} className="all-pokemon">
          <Row className="container-search m-0 pb-5">
            <Col lg={6} className="p-2">
              <button
                className={`btn-icon ${pokemons.previous ? "" : "disable"}`}
                disabled={pokemons.previous ? false : true}
                onClick={() => prev()}
              >
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button className="btn-icon ml-5" onClick={() => next()}>
                <FontAwesomeIcon icon={faForward} />
              </button>
            </Col>
            <Col lg={6} className="p-2">
              <form onChange={(event) => selectPokemon(event)}>
                <div className="container-search">
                  <input
                    list="browsers"
                    className="inp-search"
                    placeholder="Search"
                    name="browser"
                  />
                  <div className="btn-search btn-icon">
                    <img
                      src={iconSearch}
                      alt="iconSearch"
                      className="img-search"
                    />
                  </div>
                </div>
                <datalist id="browsers">
                  {pokemons.results.map((pokemon) => (
                    <option key={pokemon.id} value={pokemon.name}>
                      {pokemon.name}, {pokemon.id}
                    </option>
                  ))}
                </datalist>
              </form>
            </Col>
          </Row>
          {readyEachPoke ? (
            <FullCardPokemon
              key={eachPokemon[0].id}
              id={eachPokemon[0].id}
              image={eachPokemon[0].sprites.other.dream_world.front_default}
              shiny1={eachPokemon[0].sprites.front_shiny}
              shiny2={eachPokemon[0].sprites.back_shiny}
              name={eachPokemon[0].name}
              type1={eachPokemon[0].types[0].type.name}
              type2={
                eachPokemon[0].types[1] ? eachPokemon[0].types[1].type.name : ""
              }
              height={eachPokemon[0].height}
              weight={eachPokemon[0].weight}
            />
          ) : (
            ""
          )}
          {pokeError && (
            <div className="container-type">
              <h1 className="title-card-pokemon">
                Sorry, the pokemon you searching for doesn't exist, try in the
                next page
              </h1>
            </div>
          )}
          <Row className="m-0 row-all-pokemons">
            {pokemons.results.length > 10 || readyEachPoke ? (
              pokemons.results.map((pokemonStats, index) => (
                <Col key={index} lg={4}>
                  <CardPokemon
                    key={index}
                    id={pokemonStats.id}
                    image={pokemonStats.sprites.other.dream_world.front_default}
                    name={pokemonStats.name}
                    type={pokemonStats.types[0].type.name}
                    type2={
                      pokemonStats.types[1]
                        ? pokemonStats.types[1].type.name
                        : ""
                    }
                  />
                </Col>
              ))
            ) : (
              <h1>...</h1>
            )}
          </Row>
          <Row className="m-0 container-search">
            <button
              className={`btn-icon ${pokemons.previous ? "" : "disable"}`}
              disabled={pokemons.previous ? false : true}
              onClick={() => prev()}
            >
              <FontAwesomeIcon icon={faBackward} />
            </button>
            <button className="btn-icon ml-5" onClick={() => next()}>
              <FontAwesomeIcon icon={faForward} />
            </button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
