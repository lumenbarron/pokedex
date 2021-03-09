import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import CardPokemon from "./CardPokemons";
import FullCardPokemon from "./FullCardPokemon";
import iconSearch from "../Assets/Icons/Search.svg";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from 'react-redux';
import {getPokemonsAction, getNextPokemonsAction, getPrevPokemonsAction} from '../redux/pokeReducer';
import swal from "sweetalert2";

export default function Home() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [eachPokemon, setEachPokemon] = useState();
  const [nextPokemons, setNextPokemons] = useState("");
  const [prevPokemons, setPrevPokemons] = useState("");
  const [ready, setReady] = useState(false);
  const [readyEachPoke, setReadyEachPoke] = useState(false);
  const [pokeError, setPokeError] = useState(false);
  const history = useHistory();
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  const dispatch = useDispatch()
  const pokemons = useSelector( store => store.pokemons);
  //createPokemonCard(pokemons)
  console.log(pokemons.results)
  console.log(pokemons.previous)
  //dispatch => getPokemonsAction => dispacth => type => return payload
  useEffect(() => {
    dispatch(getPokemonsAction())
    // createPokemonCard(pokemons)
    //getAllPokemons(initialURL);
  }, []);

  // const getAllPokemons = async (url) => {
  //   await axios
  //     .get(url)
  //     .then((res) => {
  //       console.log(res.data);
  //       setNextPokemons(res.data.next);
  //       setPrevPokemons(res.data.previous);
  //       createPokemonCard(res.data.results);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const next = () => {
    dispatch(getNextPokemonsAction())
  };

  // const next = async () => {
  //   setReady(false);
  //   setAllPokemons([]);
  //   getAllPokemons(nextPokemons);
  //   await loadPokemon(data.results);
  //   setNextPokemons(data.next);
  //   setPrevPokemons(data.previous);
  //   setLoading(false);
  // };

  const prev = () => {
    if (!pokemons.previous) return;
    dispatch(getPrevPokemonsAction())
  };

  // const prev = () => {
  //   if (!prevPokemons) return;
  //   setReady(false);
  //   setAllPokemons([]);
  //   getAllPokemons(prevPokemons);
  //   await loadPokemon(data.results);
  //   setNextUrl(data.next);
  //   setPrevUrl(data.previous);
  //   setLoading(false);
  // };

  // const createPokemonCard = (results) => {
  //   console.log('creando cards')
  //   results.forEach(async (pokemon) => {
  //     await axios
  //       .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
  //       .then((res) => {
  //         setAllPokemons((currentPokemon) =>
  //           [...currentPokemon, res.data].sort((a, b) => a.id - b.id)
  //         );
  //         setReady(true);
  //       });
  //   });
  // };

  const selectPokemon = (event) => {
    event.preventDefault();
    console.log(event.target.value);

    let name = event.target.value;
    //history.push(`/${id}`);

    console.log(pokemons.results);
    if (name != "") {
      let selectPoke = pokemons.results.filter((poke) => poke.name.includes(name));
      //console.log(selectPoke[0].id);

      if (selectPoke.length >= 1) {
        //let id = selectPoke[0].id;
        //history.push(`/${id}`);
        setEachPokemon(selectPoke);
        setReadyEachPoke(true);
        setReady(false);
        setPokeError(false);
      } else {
        setReadyEachPoke(false);
        setPokeError(true);
        setReady(true);
      }
    } else {
      setReadyEachPoke(false);
      setReady(true);
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
                <option value={pokemon.name}>
                  {pokemon.name}, {pokemon.id}
                </option>
              ))}
            </datalist>
            {/* <button onClick={(event) => selectPokemon(event)}>BUscar</button> */}
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
        {/* {ready ? (
          allPokemons.map((pokemonStats, index) => (
            <Col lg={4}>
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
        )} */}
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
