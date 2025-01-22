import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaFileAlt, FaUserPlus, FaUsers } from 'react-icons/fa';
import './App.css';
import Accueil from './components/congé/Accueil';
import Decision from './components/congé/Decision';
import Jouissance from './components/congé/Jouissance';
import Login from './components/Auth/Login';
import Registre from './components/Auth/Registre';
import Conge from './components/congé/Conge';
import { CiLogout } from "react-icons/ci";

// Animation pour les transitions de pages
const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

// Composant pour protéger les routes
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérification du token dans le localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []); // Charge seulement au premier rendu

  const handleLogin = () => {
    setIsAuthenticated(true); // L'utilisateur est authentifié
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false); // Déconnexion
  };

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar affichée uniquement si l'utilisateur est authentifié */}
        {isAuthenticated && (
          <motion.div
            className="sidebar"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <h2>Menu</h2>
            <ul>
              <li><Link to="/accueil"><FaFileAlt className="icon" /> Accueil</Link></li>
              <li><Link to="/decision"><FaUsers className="icon" /> Demande des décisions</Link></li>
              <li><Link to="/jouissance"><FaUsers className="icon" /> Demande de jouissance</Link></li>
              <li><Link to="/conge"><FaUsers className="icon" /> Demande de congé</Link></li>
              <li onClick={handleLogout}><CiLogout className="icon" /> Logout</li>
            </ul>
          </motion.div>
        )}

        {/* Contenu principal */}
        <div className="main-content">
          <AnimatedRoutes isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
        </div>
      </div>
    </Router>
  );
}

// Routes animées avec la protection de l'authentification
function AnimatedRoutes({ isAuthenticated, handleLogin }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Route publique - Login */}
        <Route
          path="/"
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
              <Login onLogin={handleLogin} />
            </motion.div>
          }
        />

        {/* Route publique - Registre */}
        <Route
          path="/registre"
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
              <Registre />
            </motion.div>
          }
        />

        {/* Routes protégées */}
        <Route
          path="/accueil"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
                <Accueil />
              </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="/decision"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
                <Decision />
              </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="/jouissance"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
                <Jouissance />
              </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="/conge"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
                <Conge />
              </motion.div>
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
