import React from 'react';
import { Link } from "react-router-dom";

const CardPokemon = ({id, image, name, type, type2,_callback }) => {
    const style = type;
    return (
        <div>
            <div className="number"><small>#0{id}</small></div>
            <img src={image} alt={name} />
            <div className="detail-wrapper">
            <Link
                className="btn waves-effect waves-light red accent-2 z-depth-0"
                to={"/" + id}
              >
               <h3>{name}</h3>
              </Link>
                
                <small>{type}</small>
                <small>{type2}</small>
            </div>
        </div>
    )
}

export default CardPokemon