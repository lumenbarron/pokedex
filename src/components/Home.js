import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import CardPokemon from "./CardPokemons";
import FullCardPokemon from "./FullCardPokemon";
import iconSearch from "../Assets/Icons/Search.svg";
import { useHistory } from "react-router-dom";
//import {useDispatch, useSelector} from 'react-redux';
//import {getTodoAction} from '../redux/todoDucks';
import swal from "sweetalert2";

export default function Home() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [eachPokemon, setEachPokemon] = useState();
  const [nextPokemons, setNextPokemons] = useState("");
  const [prevPokemons, setPrevPokemons] = useState("");
  const [optionsPokemon, setOptionsPokemon] = useState();
  const [ready, setReady] = useState(false);
  const [readyEachPoke, setReadyEachPoke] = useState(false);
  const [pokeError, setPokeError] = useState(false);
  const history = useHistory();
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    getAllPokemons(initialURL);
  }, []);

  const getAllPokemons = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setNextPokemons(res.data.next);
        setPrevPokemons(res.data.previous);
        createPokemonCard(res.data.results);

        // setLoadMore(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const next = async () => {
    setReady(false);
    setAllPokemons([]);
    getAllPokemons(nextPokemons);
    // await loadPokemon(data.results);
    // setNextPokemons(data.next);
    // setPrevPokemons(data.previous);
    // setLoading(false);
  }

  const prev = async () => {
    console.log('past')
    if (!prevPokemons) return;
    setReady(false);
    setAllPokemons([]);
    getAllPokemons(prevPokemons);
    // await loadPokemon(data.results);
    // setNextUrl(data.next);
    // setPrevUrl(data.previous);
    // setLoading(false);
  }

  const createPokemonCard = (results) => {
    results.forEach(async (pokemon) => {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((res) => {
          setAllPokemons((currentPokemon) =>
            [...currentPokemon, res.data].sort((a, b) => a.id - b.id)
          );
          setReady(true);
        });
    });
  };

  const selectPokemon = (event) => {
    event.preventDefault();
    console.log(event.target.value);

    let name = event.target.value;
    //history.push(`/${id}`);

    console.log(allPokemons);
    if (name != "") {
      let selectPoke = allPokemons.filter((poke) => poke.name.includes(name));
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
      <button onClick={() => prev()}>Past</button>
        <button onClick={() => next()}>Next</button>
        
        <form onChange={(event) => selectPokemon(event)}>
          <div className="container-search">
            <input
              list="browsers"
              className="inp-search"
              placeholder="Search"
              name="browser"
            />
            <div className="btn-search">
              <img src={iconSearch} alt="iconSearch" className="img-search" />
            </div>
          </div>
          <datalist id="browsers">
            {allPokemons.map((pokemon) => (
              <option value={pokemon.name}>
                {pokemon.name}, {pokemon.id}
              </option>
            ))}
          </datalist>
          {/* <button onClick={(event) => selectPokemon(event)}>BUscar</button> */}
        </form>
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
          {" "}
          <h1 className="title-card-pokemon">
            Sorry, the pokemon you searching for doesn't exist, try in the next
            page
          </h1>{" "}
        </div>
      )}
      <Row className="m-0 row-all-pokemons">
        {ready ? (
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
        )}
      </Row>
    </>
  );
}
