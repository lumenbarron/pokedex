import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import { useParams, Link  } from "react-router-dom";
import FullCardPokemon from "./FullCardPokemon";
import iconBack from "../Assets/Icons/Back.svg";
import {getEachPokemonsAction} from '../redux/pokeReducer';
import {useDispatch, useSelector} from 'react-redux';

export default function Pokemon() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState([]);
  const [pokemonType2, setPokemonType2] = useState([]);
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch()
  const pokemons = useSelector( store => store.pokemons.currentPoke);
  console.log(Object.keys(pokemons).length ,pokemons);
  console.log(id);
  // useEffect(() => {
  //   getPokemon();
  // }, []);

  useEffect(() => {
    dispatch(getEachPokemonsAction(id));
  }, []);

  const getPokemon = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        console.log(res.data);
        //createPokemonCard(res.data);
        let type2 = res.data.types[1] ? res.data.types[1].type.name : "";
        setPokemonType2(type2);
        setPokemon(res.data);
        setReady(true);
        // setLoadMore(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    
      <Container>
        <Row className="mx-0 mb-3">
        <Link
          className="btn-icon"
          to={"/"}
        >
          <img src={iconBack} alt="icon-back" className="img-search" />
        </Link>
        </Row>
        {Object.keys(pokemons).length > 1 ? (
          <FullCardPokemon
            key={pokemons.id}
            id={pokemons.id}
            image={pokemons.sprites.other.dream_world.front_default}
            shiny1={pokemons.sprites.front_shiny}
            shiny2={pokemons.sprites.back_shiny}
            name={pokemons.name}
            type1={pokemons.types[0].type.name}
            type2={pokemons.types[1] ? pokemons.types[1].type.name : ""}
            height={pokemons.height}
            weight={pokemons.weight}
          />
        ) : (
          <h1>...</h1>
        )}
      </Container>
    
  );
}
