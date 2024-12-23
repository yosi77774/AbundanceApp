import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("הסיסמאות אינן תואמות!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("נרשמת בהצלחה!");
      navigate("/home");
    } catch (error) {
      console.error("שגיאת רישום:", error.code, error.message);
      alert("שגיאת רישום: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">רישום</h2>
      <input
        type="email"
        placeholder="אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="אישור סיסמה"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="p-2 border rounded mb-2"
      />
      <button
        onClick={handleSignUp}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        הרשמה
      </button>
      <p className="mt-4">
        יש לך כבר חשבון?{" "}
        <a href="/login" className="text-blue-500">
          התחבר כאן
        </a>
      </p>
    </div>
  );
}

export default SignUp;
