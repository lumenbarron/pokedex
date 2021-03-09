import React, { useEffect } from "react";
import { Container, Row , Col} from "react-bootstrap";
import { useParams, Link ,} from "react-router-dom";
import FullCardPokemon from "./FullCardPokemon";
import iconBack from "../Assets/Icons/Back.svg";
import iconSearch from "../Assets/Icons/Search.svg";
import { getEachPokemonsAction } from "../redux/pokeReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Pokemon() {
  let id = useParams().id;
  const dispatch = useDispatch();
  const pokemons = useSelector((store) => store.pokemons);
  const history = useHistory();
  //const allPokemons = useSelector((store) => store.pokemons.results);
  // console.log(Object.keys(pokemons).length ,pokemons);
  console.log(pokemons);
  console.log(id, 'id')
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
      console.log(selectPoke)
      if (selectPoke.length >= 1) {
        console.log('redireccionando')
        let idCurrent = selectPoke[0].id;
        dispatch(getEachPokemonsAction(idCurrent));
        let id = idCurrent;
        // console.log(idCurrent)
        // history.push(`/${idCurrent}`);
        // setEachPokemon(selectPoke);
        // setReadyEachPoke(true);
        // setPokeError(false);
      } else {
        console.log('no pokemon')
        // setReadyEachPoke(false);
        // setPokeError(true);
      }
     } 
    //   setReadyEachPoke(false);
    // }
  };

  return (
    <Container>
      <Row className="mx-0 mb-3">
      <Col lg={6}>
        <Link className="btn-icon" to={"/"}>
          <img src={iconBack} alt="icon-back" className="img-search" />
        </Link>
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
      {Object.keys(pokemons.currentPoke).length > 1 ? (
        <FullCardPokemon
          key={pokemons.currentPoke.id}
          id={pokemons.currentPoke.id}
          image={pokemons.currentPoke.sprites.other.dream_world.front_default}
          shiny1={pokemons.currentPoke.sprites.front_shiny}
          shiny2={pokemons.currentPoke.sprites.back_shiny}
          name={pokemons.currentPoke.name}
          type1={pokemons.currentPoke.types[0].type.name}
          type2={pokemons.currentPoke.types[1] ? pokemons.currentPoke.types[1].type.name : ""}
          height={pokemons.currentPoke.height}
          weight={pokemons.currentPoke.weight}
        />
      ) : (
        <h1>...</h1>
      )}
    </Container>
  );
}
