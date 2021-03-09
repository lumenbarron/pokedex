import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
// import axios from "axios";
import CardPokemon from "./CardPokemons";
import FullCardPokemon from "./FullCardPokemon";
import iconSearch from "../Assets/Icons/Search.svg";
// import { useHistory } from "react-router-dom";
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
  // const history = useHistory();

  const dispatch = useDispatch();
  const pokemons = useSelector((store) => store.pokemons);
  // console.log(pokemons.results)
  // console.log(pokemons.previous)

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
        //let id = selectPoke[0].id;
        //history.push(`/${id}`);
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

  return (
    <>
      <Row className="container-search m-0 pb-5">
        <Col lg={6}>
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
        <Col lg={6}>
          <form onChange={(event) => selectPokemon(event)}>
            <div className="container-search">
              <input
                list="browsers"
                className="inp-search"
                placeholder="Search"
                name="browser"
              />
              <div className="btn-search btn-icon">
                <img src={iconSearch} alt="iconSearch" className="img-search" />
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
            Sorry, the pokemon you searching for doesn't exist, try in the next
            page
          </h1>{" "}
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
                  pokemonStats.types[1] ? pokemonStats.types[1].type.name : ""
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
    </>
  );
}
