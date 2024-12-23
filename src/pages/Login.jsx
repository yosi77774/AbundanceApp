import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError('אימייל או סיסמה שגויים. נסה שוב.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* כותרת */}
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">🔑 התחבר לחשבונך</h1>
        <p className="text-center text-gray-500 mb-6">הזן את פרטיך כדי להיכנס למערכת.</p>

        {/* שדות התחברות */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="✉️ אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="🔒 סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* כפתור התחברות */}
        <button
          onClick={handleLogin}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          🚀 התחבר
        </button>

        {/* קו מפריד */}
        <div className="flex items-center justify-center my-4">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="mx-3 text-gray-500 text-sm">או</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        {/* קישור להרשמה */}
        <p className="text-center text-sm text-gray-600">
          אין לך חשבון?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            הירשם כאן
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
