import React from "react";
import logoPokemon from "../Assets/logo.png";
import userPokemon from "../Assets/avatar.png";
import iconLogout from "../Assets/Icons/Logout.svg";

export default function UserProfile() {
  return (
    <div>
      <img className="logo-pokemon mb-5" src={logoPokemon} />
      <img className="user-img-pokemon mb-4" src={userPokemon} />
      <h4 className="user-title-pokemon">ASHK123</h4>
      <p className="user-subtitle-pokemon">Level 1</p>
      <p className="user-title-pokemon">"Work hard on your test"</p>
      <div className="btn-logout">
        <img src={iconLogout} className="ml-2" />
        <h6 className="user-title-pokemon mb-0 ml-5">LOG OUT</h6>
      </div>
    </div>
  );
}
