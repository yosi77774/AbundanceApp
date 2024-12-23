import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // הפנייה לדף ההתחברות לאחר התנתקות
    } catch (error) {
      console.error('שגיאה בהתנתקות:', error.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* לוגו */}
        <h1 className="text-2xl font-bold">🌟 תודעת שפע 🌟</h1>

        {/* קישורים */}
        <ul className="flex gap-4 text-lg">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-bold' : 'hover:text-yellow-300'
              }
            >
              🏠 דף הבית
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gratitude"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-bold' : 'hover:text-yellow-300'
              }
            >
              🌼 הכרת תודה
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/positive-language"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-bold' : 'hover:text-yellow-300'
              }
            >
              💬 שפה חיובית
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-bold' : 'hover:text-yellow-300'
              }
            >
              ✅ ניהול משימות
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/vision"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-bold' : 'hover:text-yellow-300'
              }
            >
              🎯 חזון אישי
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/vision/summary"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-bold' : 'hover:text-yellow-300'
              }
            >
              📊 סיכומים
            </NavLink>
          </li>
        </ul>

        {/* כפתור התנתקות */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
        >
          🚪 התנתק
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
