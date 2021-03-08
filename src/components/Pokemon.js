import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link  } from "react-router-dom";
import FullCardPokemon from "./FullCardPokemon";

export default function Pokemon() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState([]);
  const [pokemonType2, setPokemonType2] = useState([]);
  const [ready, setReady] = useState(false);

  console.log(id);
  useEffect(() => {
    getPokemon();
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
    <div>
      <Container>
        <Link
          className="btn waves-effect waves-light red accent-2 z-depth-0"
          to={"/"}
        >
          <h3>back</h3>
        </Link>
        {ready ? (
          <FullCardPokemon
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.sprites.other.dream_world.front_default}
            shiny1={pokemon.sprites.front_shiny}
            shiny2={pokemon.sprites.back_shiny}
            name={pokemon.name}
            type1={pokemon.types[0].type.name}
            type2={pokemon.types[1] ? pokemon.types[1].type.name : ""}
            height={pokemon.height}
            weight={pokemon.weight}
          />
        ) : (
          <h1>...</h1>
        )}
      </Container>
    </div>
  );
}
