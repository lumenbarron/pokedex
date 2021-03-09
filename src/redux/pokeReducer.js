import axios from "axios";

//constants
const inicialData = {
  results: [],
  count: 0,
  previous: null,
  next: null,
  currentPoke : [],
};

const GET_POKEMONS = "GET_POKEMONS";
const GET_NEXT_POKEMONS = "GET_NEXT_POKEMONS";
const GET_PREV_POKEMONS = "GET_PREV_POKEMONS";
const GET_EACH_POKEMONS = "GET_EACH_POKEMONS";
//reducers

export default function pokeReducer(state = inicialData, actions) {
  switch (actions.type) {
    case GET_POKEMONS:
      return {
        ...state,
        results: actions.payload,
        next: actions.next,
        previous: actions.prev,
      };
    case GET_NEXT_POKEMONS:
      return {
        ...state,
        results: actions.payload,
        next: actions.next,
        previous: actions.prev,
      };
    case GET_PREV_POKEMONS:
      return {
        ...state,
        results: actions.payload,
        next: actions.next,
        previous: actions.prev,
      };
      case GET_EACH_POKEMONS:
        return {
          ...state,
          currentPoke: actions.payload,
        };
    default:
      return state;
  }
}

//actions
//dispatch get the reducer, get state get the state
export const getPokemonsAction = () => async (dispatch, getState) => {
  try {
    const rest = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const data = rest.data.results;
    const prev = rest.data.previous;
    const next = rest.data.next;
    console.log(rest.data);
    let pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        return pokemonRecord.data;
      })
    );
    console.log(pokemonData);
    dispatch({
      type: GET_POKEMONS,
      payload: pokemonData,
      next: next,
      prev: prev,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNextPokemonsAction = () => async (dispatch, getState) => {
  const nextUrl = getState().pokemons.next;
  console.log(nextUrl);
  try {
    const rest = await axios.get(nextUrl);
    console.log(rest.data);
    const data = rest.data.results;
    const prev = rest.data.previous;
    const next = rest.data.next;

    let pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        return pokemonRecord.data;
      })
    );
    console.log(pokemonData);
    dispatch({
      type: GET_NEXT_POKEMONS,
      payload: pokemonData,
      next: next,
      prev: prev,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPrevPokemonsAction = () => async (dispatch, getState) => {
  const prevUrl = getState().pokemons.previous;
  console.log(prevUrl);
  try {
    const rest = await axios.get(prevUrl);
    console.log(rest.data);
    const data = rest.data.results;
    const prev = rest.data.previous;
    const next = rest.data.next;

    let pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        return pokemonRecord.data;
      })
    );
    console.log(pokemonData);
    dispatch({
      type: GET_PREV_POKEMONS,
      payload: pokemonData,
      next: next,
      prev: prev,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEachPokemonsAction = (id) => async (dispatch) => {
  try {
    const rest = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(rest.data);
    dispatch({
      type: GET_EACH_POKEMONS,
      payload: rest.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//primero se dispara la acción. la accion usa las constantes de type, regresa un resultado en payload a la funcion reducer
