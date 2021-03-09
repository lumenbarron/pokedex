import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import FullCardPokemon from "./FullCardPokemon";
import iconBack from "../Assets/Icons/Back.svg";
import { getEachPokemonsAction } from "../redux/pokeReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Pokemon() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemons = useSelector((store) => store.pokemons.currentPoke);
  // console.log(Object.keys(pokemons).length ,pokemons);
  // console.log(id);

  useEffect(() => {
    dispatch(getEachPokemonsAction(id));
  }, []);

  return (
    <Container>
      <Row className="mx-0 mb-3">
        <Link className="btn-icon" to={"/"}>
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
