import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaFileAlt, FaUsers } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import './App.css';
import Accueil from './components/congé/Accueil';
import Decision from './components/congé/Decision';
import Jouissance from './components/congé/Jouissance';
import Login from './components/Auth/Login';
import Registre from './components/Auth/Registre';
import Conge from './components/congé/Conge';

// Animation pour les transitions de pages
const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

function App() {
  const location = useLocation();

  // Vérifie si on est sur les pages Login ou Registre
  const hideSidebar = location.pathname === '/' || location.pathname === '/registre';

  return (
    <div className="app-container">
      {/* Sidebar affichée uniquement si hideSidebar est faux */}
      {!hideSidebar && (
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
            <li><Link to="/"><CiLogout className="icon" /> Logout </Link></li>
          </ul>
        </motion.div>
      )}

      {/* Contenu principal */}
      <div className="main-content">
        <AnimatedRoutes />
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Route publique - Login */}
        <Route
          path="/"
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
              <Login />
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
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
              <Accueil />
            </motion.div>
          }
        />
        <Route
          path="/decision"
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
              <Decision />
            </motion.div>
          }
        />
        <Route
          path="/jouissance"
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
              <Jouissance />
            </motion.div>
          }
        />
        <Route
          path="/conge"
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
              <Conge />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
