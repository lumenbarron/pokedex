import React from "react";
import { Row, Col } from "react-bootstrap";

export default function FullCardPokemon({
  image,
  shiny1,
  shiny2,
  name,
  type1,
  type2,
  id,
  height,
  weight}
) {
    console.log(name)
  return (
    <Row className="m-0">
      <Col lg={4} className="">
          <div className="container-card-pokemon card-all-pokemon">
        <img
          src={image}
          alt={name}
          className="img-pokemon"
        />
        <div className="container-type">
        <img src={shiny1} alt={name} />
        <img src={shiny2} alt={name} />
        </div>
        </div>
      </Col>
      <Col lg={8}>
      <div className="card-each-pokemon">
        <h1>{name}</h1>
        <div className="container-type-each-pokemon">
        <div className={`type-pokemon mr-1 ${type1}`} >{type1}</div>
       {type2 && <div  className={`type-pokemon ml-1 ${type2}`}>{type2}</div>} 
      </div>
        <h4>Pokedex Number</h4>
        <p className="number-card-pokemon pb-4 border-bottom">{id}</p>
        <h4>Height</h4>
        <p className="number-card-pokemon pb-4 border-bottom">{height}</p>
        <h4>Weight</h4>
        <p className="number-card-pokemon pb-4 border-bottom">{weight}</p>
        <h4>Shiny</h4>
        <img src={shiny1} alt={name} />
        <img src={shiny2} alt={name} />
        </div>
      </Col>
    </Row>
  );
}
