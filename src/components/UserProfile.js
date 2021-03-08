import React from "react";
import logoPokemon from "../Assets/logo.png";
import userPokemon from "../Assets/avatar.png";
import iconLogout from "../Assets/Icons/Logout.svg";

export default function UserProfile() {
  return (
    <div className="user-pokemon">
      <img className="logo-pokemon my-5" src={logoPokemon} />
      <img className="user-img-pokemon mb-4" src={userPokemon} />
      <h4 className="user-title-pokemon">ASHK123</h4>
      <p className="user-subtitle-pokemon">Level 1</p>
      <p className="user-title-pokemon">"Work hard on your test"</p>
      <button className="btn-logout">
        <img src={iconLogout} className="img-btn-logout" />
        <h6 className="user-title-pokemon mb-0">LOG OUT</h6>
      </button>
    </div>
  );
}
