import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // נשתמש בנווט מ-React Router

const quotes = [
  "🌟 'שפע הוא לא מה שיש לך, אלא מה שאתה מרגיש.' - אופרה ווינפרי",
  "💬 'כשאתה מתמקד בשפע, הוא מתרחב.' - טוני רובינס",
  "📚 'החיים הם לא על לחכות שהסערה תחלוף, אלא על ללמוד איך לרקוד בגשם.' - ויויאן גרין",
  "❤️ 'שפע הוא תוצאה של מחשבה ממוקדת ואמונה בעצמך.'",
  "🌱 'כל מחשבה חיובית היא צעד נוסף בדרך לשפע.'",
];

const Home = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const navigate = useNavigate(); // נווט לדפים אחרים

  // מעבר אוטומטי בין ציטוטים כל 2 שניות
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 2000); // כל 2 שניות

    return () => clearInterval(interval); // ניקוי הטיימר כשמרעננים או עוזבים את הדף
  }, []);

  const nextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
  };

  // פונקציה לטיפול בלחיצה על כפתור "התחל עכשיו"
  const handleStartNow = () => {
    navigate('/vision'); // נווט לעמוד "חזון אישי ויעדים"
  };

  return (
    <div className="container mx-auto p-8 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* כותרת ראשית */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-blue-800">🌟 ברוך הבא לאתר תודעת שפע 🌟</h1>
        <p className="text-lg text-gray-600 mt-2">
          האתר נועד לעזור לך לפתח תודעת שפע, להציב יעדים ולהגשים חלומות. התחל היום!
        </p>
      </header>

      {/* תצוגת ציטוטים עם מעבר אוטומטי */}
      <section className="relative bg-white p-6 rounded-md shadow-lg mb-8 text-center">
        <button
          onClick={prevQuote}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
        >
          ◀️
        </button>
        <p className="text-xl font-medium italic text-gray-700">{quotes[currentQuoteIndex]}</p>
        <button
          onClick={nextQuote}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
        >
          ▶️
        </button>
      </section>

      {/* כרטיסיות ניווט לדפים השונים */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-xl transition">
          🌼 <h3 className="font-bold text-lg">הכרת תודה יומית</h3>
          <p>התחילו כל יום עם מחשבה חיובית.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-xl transition">
          💬 <h3 className="font-bold text-lg">שפה חיובית</h3>
          <p>למדו להשתמש בשפה שמעצימה אתכם.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-xl transition">
          ✅ <h3 className="font-bold text-lg">ניהול משימות</h3>
          <p>ארגנו את המשימות שלכם בצורה יעילה.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-xl transition">
          🎯 <h3 className="font-bold text-lg">חזון אישי ויעדים</h3>
          <p>כתבו את החזון והיעדים שלכם.</p>
        </div>
      </section>

      {/* קריאה לפעולה */}
      <section className="text-center mt-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">✨ התחל את המסע שלך עוד היום! ✨</h2>
        <button
          onClick={handleStartNow}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition"
        >
          🚀 התחל עכשיו
        </button>
      </section>
    </div>
  );
};

export default Home;
