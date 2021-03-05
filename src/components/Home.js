import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import CardPokemon from "./CardPokemons"
//import {useDispatch, useSelector} from 'react-redux';
//import {getTodoAction} from '../redux/todoDucks';
import swal from 'sweetalert2';

export default function Home() {

  const[allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState()

  const getAllPokemons = async () => {
    const res = await axios('https://pokeapi.co/api/v2/pokemon?limit=40')
    const data = await res.data;
    console.log(data);
    let arrayPokemons = [] 
    const createPokemonCard = (results) => {
      results.forEach(async pokemon => {
        const res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.data;
        arrayPokemons.push(data)
        
        //currentPokemon => [...currentPokemon, data]
        console.log(arrayPokemons)
        //arrayPokemons.sort((a, b) => a.id - b.id)
        console.log(arrayPokemons)
        setAllPokemons(arrayPokemons)
      });

    }

    createPokemonCard(data.results)
    // setLoadMore(data.next);
    // await axios
    // .get("https://pokeapi.co/api/v2/pokemon?limit=40")
    // .then((res) => {
    //   console.log(res.data);
    //   setLoadMore(res.data);
    //   // setReady(true);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });


  }

  // const getAllPokemons = async () => {
  //   await axios
  //   .get("https://pokeapi.co/api/v2/pokemon?limit=20")
  //   .then((res) => {
  //     console.log(res.data);
  //     setLoadMore(res.data);
  //     // setTodos(res.data);
  //     // setReady(true);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  useEffect(() => {
    // dispatch(getTodoAction())
    // setReady(true);

    getAllPokemons();  

  }, []);

    return (
        <div>
            <Container fluid>
  <Row>
    <Col className="user-pokemon" lg={3} >Home </Col>
    <Col className="all-pokemon" lg={9} >Home
    {allPokemons.map( (pokemonStats, index) => 
            <CardPokemon
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
    <button onClick={() => getAllPokemons()}>Load More</button>
    </Col>
  </Row>
</Container>
        </div>
    )
}
