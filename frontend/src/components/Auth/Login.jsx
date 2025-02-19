import axios from "axios";
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";



const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();


  const handleChange = function (e) {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({
      ...user,
      [name]: value,
    });
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3000/api_auth/login', {
      username,
      password,
    });

    alert('Connexion réussie !');
    setErrorMessage('');

    const { token, role } = response.data; // Récupération du rôle
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);

    if (role === 'responsable') {
      navigate('/conge');
    } else {
      navigate('/decision'); // Rediriger les employés vers "décision"
    }
  } catch (error) {
    if (error.response?.status === 401) {
      setErrorMessage(error.response.data.error || 'Nom d’utilisateur ou mot de passe incorrect.');
    } else {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
    setSuccessMessage('');
  }
};


  const entrer = () => {
    navigate("/registre");
  };

  const styles = {
    input: {
    borderRadius: '4px',
    border: '1px solid #dddfe2',
    outline: 'none',
    color: '#1d2129',
    margin: '0.5rem 0',
    padding: '0.8rem 0.75rem',
    width: '100%',
    fontSize: '0.75rem',
    background: '#cbccce',
  },
  }
  return (
    <>
      <div className="login">
          <h1>Login</h1>
        <form onSubmit={handleLogin} >
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Entrer votre nom"
            onChange={(e) => setUsername(e.target.value)}
        style={styles.input} 
        />
          <label>Mot de passe</label>
          <input
style={styles.input}
            type="password"
            name="password"
            value={password}
            placeholder="Entrer votre mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button type="submit" >Se connecter</button>
          <div>ou</div>

          <div className="buttons"  onClick={entrer}>
            Creer un compte
          </div>
           
        </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          
        
          
      </div>
    </>
  )
}

export default Login