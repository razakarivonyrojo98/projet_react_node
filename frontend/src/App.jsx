import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaFileAlt, FaUserPlus, FaUsers } from 'react-icons/fa'; // Import des icônes
import './App.css';
import Accueil from './components/congé/Accueil';
import CongeMaladie from './components/congé/CongeMaladie';
import CongeMaternite from './components/congé/CongeMaternite';
import Login from './components/Auth/Login';
import Registre from './components/Auth/Registre';
import Contrat2 from './components/congé/contrat2';

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État de connexion

  const handleLogin = () => {
    setIsAuthenticated(true); // Mettre à jour l'état lorsqu'on est connecté
  };

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        {isAuthenticated && (
          <motion.div
            className="sidebar"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <h2>Menu</h2>
            <ul>
              <li>
                <Link to="/accueil">
                  <FaFileAlt className="icon" /> Accueil
                </Link>
              </li>
              <li>
                <Link to="/CongeMaternite">
                  <FaUserPlus className="icon" /> Congé de maternité
                </Link>
              </li>
              <li>
                <Link to="/CongeMaladie">
                  <FaUsers className="icon" /> Congé de maladie
                </Link>
              </li>
              <li>
                <Link to="/contrat">
                  <FaUsers className="icon" /> Contrat
                </Link>
              </li>
            </ul>
          </motion.div>
        )}

        {/* Main content */}
        <div className="main-content">
          <AnimatedRoutes isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
        </div>
      </div>
    </Router>
  );
}

function AnimatedRoutes({ isAuthenticated, handleLogin }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/accueil" />
            ) : (
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.5 }}
              >
                <Login onLogin={handleLogin} />
              </motion.div>
            )
          }
        />
        <Route
          path="/registre"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <Registre />
            </motion.div>
          }
        />
        {isAuthenticated && (
          <>
            <Route
              path="/accueil"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Accueil />
                </motion.div>
              }
            />
            <Route
              path="/CongeMaladie"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <CongeMaladie />
                </motion.div>
              }
            />
            <Route
              path="/CongeMaternite"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <CongeMaternite />
                </motion.div>
              }
            />
            <Route
              path="/contrat"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Contrat2 />
                </motion.div>
              }
            />
          </>
        )}
      </Routes>
    </AnimatePresence>
  );
}

export default App;
