import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import {useParams} from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Pokemon() {
  const {id} = useParams();

  const [pokemon, setPokemon] = useState([]);
  const [pokemonType2, setPokemonType2] = useState([]);
  const [ready, setReady] = useState(false);

  console.log(id)
  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        console.log(res.data);
        //createPokemonCard(res.data);
        let type2 = res.data.types[1] ? res.data.types[1].type.name : ''
        setPokemonType2(type2)
        setPokemon(res.data)
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
         <Row>                   
    <Col>
    <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
    <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
    <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />
    </Col>
    <Col>
    {pokemon.name}

    <p>{pokemon.types[0].type.name}</p>
    <p>{pokemonType2}</p>
    {/* ( {pokemon.types[1]} ? <p>{pokemon.types[1].type.name}</p> : <p></p> ) */}
    <h3>Pokedex Number</h3>
    <p>{pokemon.id}</p>

    <h3>Height</h3>
    <p>{pokemon.height}</p>

    <h3>Weight</h3>
    <p>{pokemon.weight}</p>

    <h3>Shiny</h3>
    <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
    <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />
    
    </Col>
    </Row> 
   )   : (<h1 className="">Loading...</h1>) }
  

</Container>
        </div>
    )
}
