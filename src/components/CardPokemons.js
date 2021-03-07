import React from "react";
import { Link } from "react-router-dom";

const CardPokemon = ({ id, image, name, type, type2, _callback }) => {
  return (
      <div className="container-card-pokemon">
    <div className="card-all-pokemon">
      <Link
        className="title-card-pokemon"
        to={"/" + id}
      >
        <h3>{name}</h3>
      </Link>
      <p className="number-card-pokemon pb-4" >00{id}</p>

      <div className="number">
      <img src={image} alt={name} className="img-pokemon"/>
      </div>
 
      <div className="container-type">
        <div className="type-pokemon">{type}</div>
        <div  className="type-pokemon">{type2}</div>
      </div>
    </div>
    </div>
  );
};

export default CardPokemon;
