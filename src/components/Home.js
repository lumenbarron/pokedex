import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import CardPokemon from "./CardPokemons";
import UserProfile from "./UserProfile";
import iconSearch from "../Assets/Icons/Search.svg";
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

  useEffect(() => {
    getAllPokemons();
  }, []);

  const getAllPokemons = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        console.log(res.data);
        setNextPokemons(res.data.next);
        setPrevPokemons(res.data.prev);
        createPokemonCard(res.data.results);

        // setLoadMore(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    console.log(allPokemons);
    let selectPoke = allPokemons.filter((poke) => poke.name.includes(name));
    console.log(selectPoke);
    if (selectPoke.length >= 1) {
      setEachPokemon(selectPoke);
      setReadyEachPoke(true);
      setPokeError(false);
    } else {
      setReadyEachPoke(false);
      setPokeError(true);
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="user-pokemon" lg={3}>
            <UserProfile/>
          </Col>
          <Col className="all-pokemon" lg={9}>
          <Row className="container-search m-0 pb-5">
            <form onChange={(event) => selectPokemon(event)}>
              <div className="container-search">
              <input list="browsers" className="inp-search" placeholder="Search" name="browser" />
              <div className="btn-search">  <img src={iconSearch} alt="iconSearch" className="img-search"/></div>
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
            <Row>
            {readyEachPoke ? (
              <CardPokemon
                key={eachPokemon[0].id}
                id={eachPokemon[0].id}
                image={eachPokemon[0].sprites.other.dream_world.front_default}
                name={eachPokemon[0].name}
                type={eachPokemon[0].types[0].type.name}
                type2={
                  eachPokemon[0].types[1]
                    ? eachPokemon[0].types[1].type.name
                    : ""
                }
              />
            ) : (
              ""
            )}
            {pokeError && <h1>el pokemon que buscas no existe</h1>}
            </Row>
            <Row className="m-0">
            {ready ? (
              allPokemons.map((pokemonStats, index) => (
                // <div className="m-3">
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
                // </div>
              ))
            ) : (
              <h1 className="">Loading...</h1>
            )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
