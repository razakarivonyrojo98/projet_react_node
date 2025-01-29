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
import ProtectedRoute from './components/congé/ProtectedRoute';

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
        <Route path="/" element={<Login />} />
        <Route path="/registre" element={<Registre />} />

        {/* Routes pour les employés */}
        <Route element={<ProtectedRoute allowedRoles={['employe']} />}>
          <Route path="/decision" element={<Decision />} />
          <Route path="/jouissance" element={<Jouissance />} />
        </Route>

        {/* Route pour le responsable */}
        <Route element={<ProtectedRoute allowedRoles={['responsable']} />}>
          <Route path="/conge" element={<Conge />} />
        </Route>

        {/* Accueil accessible aux deux */}
        <Route element={<ProtectedRoute allowedRoles={['employe', 'responsable']} />}>
          <Route path="/accueil" element={<Accueil />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
