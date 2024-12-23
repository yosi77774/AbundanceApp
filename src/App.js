import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Navbar from "./components/Navbar"; // ייבוא התפריט

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Gratitude from './pages/Gratitude';
import PositiveLanguage from "./pages/PositiveLanguage";
import Tasks from "./pages/Tasks";
import Vision from "./pages/Vision";
import VisionSummary from "./pages/VisionSummary";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>טוען...</div>;
  }

  return (
    <Router>
      {/* Navbar קבוע בראש העמוד */}
      <Navbar />
      <div className="pt-20"> {/* מרווח כדי למנוע חפיפה עם ה-Navbar */}
        <Routes>
          {/* דפים ציבוריים */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* דפים פרטיים */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/gratitude" element={<PrivateRoute><Gratitude /></PrivateRoute>} />
          <Route path="/positive-language" element={<PrivateRoute><PositiveLanguage /></PrivateRoute>} />
          <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="/vision" element={<PrivateRoute><Vision /></PrivateRoute>} />
          <Route path="/vision/summary" element={<PrivateRoute><VisionSummary /></PrivateRoute>} />

          {/* ניתוב ברירת מחדל */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
