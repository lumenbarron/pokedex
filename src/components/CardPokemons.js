import React from "react";
import { Link } from "react-router-dom";

const CardPokemon = ({ id, image, name, type, type2 }) => {
  return (
    <div className="container-card-pokemon">
      <div className="card-all-pokemon">
        <Link className="title-card-pokemon" to={"/" + id}>
          <h3 className="capitalize-text">{name}</h3>
        </Link>
        <p className="number-card-pokemon pb-4">00{id}</p>
        <div className="number">
          <img src={image} alt={name} className="img-pokemon" />
        </div>
        <div className="container-type">
          <div className={`type-pokemon mr-1 ${type}`}>{type}</div>
          {type2 && <div className={`type-pokemon ml-1 ${type2}`}>{type2}</div>}
        </div>
      </div>
    </div>
  );
};

export default CardPokemon;
