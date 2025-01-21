import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const Registre = () => {
    const navigate = useNavigate();

    const click = () => {
    navigate("/");
  };
  return (
    <>
<div className="login">

          <h3>Creer un compte</h3>
          <label>Nom</label>
          <input
            type="text"
            name="nom"
           
            placeholder="Entrer votre nom"
           
          />
          <label>E-mail</label>
          <input
            type="text"
            name="email"
          
            placeholder="Entrer votre email"
           
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
           
            placeholder="Entrer votre mot de passe"
            
          />
          <div className="button" >
            Inscrire
          </div>
          J'ai deja un compte?
          <NavLink to="/" onClick={click}>
            {"login"}
          </NavLink>
        </div>
    </>
  )
}

export default Registre