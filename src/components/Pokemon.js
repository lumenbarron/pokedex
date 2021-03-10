import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import FullCardPokemon from "./FullCardPokemon";
import UserProfile from "./UserProfile";
import iconBack from "../Assets/Icons/Back.svg";
import iconSearch from "../Assets/Icons/Search.svg";
import iconMenu from "../Assets/Icons/Menu.svg";
import logoPokemon from "../Assets/logo.png";
import { getEachPokemonsAction } from "../redux/pokeReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Pokemon() {
  const [pokeError, setPokeError] = useState(false);
  const [readyEachPoke, setReadyEachPoke] = useState(true);
  const [mobile, setMobile] = useState(false);

  let id = useParams().id;
  const dispatch = useDispatch();
  const pokemons = useSelector((store) => store.pokemons);

  useEffect(() => {
    dispatch(getEachPokemonsAction(id));
  }, [id]);

  const selectPokemon = (event) => {
    event.preventDefault();
    let name = event.target.value;
    if (name != "") {
      let selectPoke = pokemons.results.filter((poke) =>
        poke.name.includes(name)
      );
      if (selectPoke.length >= 1) {
        let idCurrent = selectPoke[0].id;
        dispatch(getEachPokemonsAction(idCurrent));
        setReadyEachPoke(true);
        setPokeError(false);
      } else {
        setReadyEachPoke(false);
        setPokeError(true);
      }
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
          <Row className="mx-0 my-3">
            <Col lg={6} sm={3} xs={3}>
              <div className="btn-icon">
                <Link to={"/"}>
                  <img src={iconBack} alt="icon-back" className="img-search" />
                </Link>
              </div>
            </Col>
            <Col lg={6} sm={9} xs={9} className="container-search-form">
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
          {Object.keys(pokemons.currentPoke).length > 1 && readyEachPoke ? (
            <FullCardPokemon
              key={pokemons.currentPoke.id}
              id={pokemons.currentPoke.id}
              image={
                pokemons.currentPoke.sprites.other.dream_world.front_default
              }
              shiny1={pokemons.currentPoke.sprites.front_shiny}
              shiny2={pokemons.currentPoke.sprites.back_shiny}
              name={pokemons.currentPoke.name}
              type1={pokemons.currentPoke.types[0].type.name}
              type2={
                pokemons.currentPoke.types[1]
                  ? pokemons.currentPoke.types[1].type.name
                  : ""
              }
              height={pokemons.currentPoke.height}
              weight={pokemons.currentPoke.weight}
            />
          ) : (
            <h1 className="title-card-pokemon">...</h1>
          )}
          {pokeError && (
            <div className="container-type">
              <h1 className="title-card-pokemon">
                Sorry, the pokemon you searching for doesn't exist, try in the
                next page
              </h1>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
