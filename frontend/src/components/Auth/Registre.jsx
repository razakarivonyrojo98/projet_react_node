import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Registre = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Réinitialiser les messages d'erreur et de succès
      setError("");
      setSuccess("");

      const response = await axios.post("http://localhost:3000/api_auth/registre", formData);

      if (response.status === 201) {
        setSuccess("Compte créé avec succès !");
        setTimeout(() => {
          navigate("/"); // Rediriger vers la page de connexion après un délai
        }, 2000);
      } else {
        setError("Erreur lors de la création du compte. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      setError("Erreur lors de la création du compte. Veuillez vérifier vos informations.");
    }
  };

  return (
    <>
      <div className="login">
        <h3>Créer un compte</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <label>Nom</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Entrer votre nom"
        />

        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Entrer votre email"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Entrer votre mot de passe"
        />

        <div className="button" onClick={handleSubmit}>
          Inscrire
        </div>

        <p>J'ai déjà un compte ?</p>
        <NavLink to="/">Login</NavLink>
      </div>
    </>
  );
};

export default Registre;
