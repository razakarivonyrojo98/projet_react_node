import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaFileAlt, FaUserPlus, FaUsers } from 'react-icons/fa'; // Import des icônes
import './App.css';
import Accueil from './components/congé/Accueil';
import Decision from './components/congé/Decision';
import Jouissance from './components/congé/Jouissance';
import Login from './components/Auth/Login';
import Registre from './components/Auth/Registre';
import Conge from './components/congé/Conge';
import { CiLogout } from "react-icons/ci";

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
                <Link to="/decision">
                  <FaUsers className="icon" /> Demande des decision
                </Link>
              </li>
              <li>
                <Link to="/jouissance">
                  <FaUsers className="icon" /> Demande des jouissance de congé
                </Link>
              </li>
              <li>
                <Link to="/conge">
                  <FaUsers className="icon" /> Demande de congé
                </Link>
              </li>
              <li>
                <Link to="/">
                  <CiLogout className="icon" /> Logout
                </Link>
              </li>
            </ul>
          </motion.div>
      

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
             
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.5 }}
              >
                <Login  />
              </motion.div>
            
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
              path="/decision"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Decision />
                </motion.div>
              }
            />
            <Route
              path="/jouissance"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Jouissance />
                </motion.div>
              }
            />
            <Route
              path="/conge"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Conge />
                </motion.div>
              }
            />
          </>
      
      </Routes>
    </AnimatePresence>
  );
}

export default App;
