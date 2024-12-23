import React, { useState, useEffect } from 'react';

const PositiveLanguage = () => {
  const [affirmations, setAffirmations] = useState([]); // רשימת הצהרות
  const [newAffirmation, setNewAffirmation] = useState(''); // הצהרה חדשה
  const [isSaved, setIsSaved] = useState(false); // סטטוס שמירה

  // טוען הצהרות מ-Local Storage
  useEffect(() => {
    const savedAffirmations = localStorage.getItem('affirmations');
    if (savedAffirmations) {
      setAffirmations(JSON.parse(savedAffirmations));
    }
  }, []);

  // שומר הצהרות ב-Local Storage
  const saveAffirmations = () => {
    localStorage.setItem('affirmations', JSON.stringify(affirmations));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); // הודעת שמירה נעלמת לאחר 2 שניות
  };

  // הוספת הצהרה חדשה
  const addAffirmation = () => {
    if (newAffirmation.trim() === '') return;
    setAffirmations([...affirmations, newAffirmation]);
    setNewAffirmation('');
  };

  // מחיקת הצהרה
  const deleteAffirmation = (index) => {
    const updatedAffirmations = affirmations.filter((_, i) => i !== index);
    setAffirmations(updatedAffirmations);
  };

  return (
    <div
      className="container mx-auto p-8 bg-white rounded-md shadow-md max-w-5xl"
      style={{ direction: 'rtl', textAlign: 'right' }}
    >
      {/* כותרת */}
      <h1 className="text-3xl font-bold mb-4 text-center">💬 תרגול שפה חיובית</h1>
      <p className="text-gray-600 text-center mb-6">
        כתבו ושמרו הצהרות חיוביות שיעזרו לכם לחזק את הביטחון העצמי והגישה החיובית.
      </p>

      {/* דוגמה להצהרה */}
      <div className="mb-4 p-4 border-r-4 border-blue-500 bg-blue-50 text-blue-700 rounded-md">
        דוגמה: "אני מסוגל להשיג את המטרות שלי בעזרת נחישות והתמדה."
      </div>

      {/* הוספת הצהרה */}
      <div className="flex gap-4 mb-6 flex-row-reverse items-center">
        <input
          type="text"
          value={newAffirmation}
          onChange={(e) => setNewAffirmation(e.target.value)}
          placeholder="כתבו כאן הצהרה חיובית..."
          className="flex-1 border p-2 rounded-md text-right"
        />
        <button
          onClick={addAffirmation}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          ➕ הוסף
        </button>
      </div>

      {/* כפתור שמירה */}
      <div className="text-center mb-6">
        <button
          onClick={saveAffirmations}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          💾 שמור
        </button>
        {isSaved && (
          <p className="text-green-600 mt-2">✅ ההצהרות נשמרו בהצלחה!</p>
        )}
      </div>

      {/* רשימת הצהרות */}
      <ul className="space-y-4">
        {affirmations.map((affirmation, index) => (
          <li
            key={index}
            className="border p-4 rounded-md shadow-md flex justify-between items-center"
            style={{ flexDirection: 'row-reverse' }}
          >
            {/* טקסט ההצהרה בצד ימין */}
            <span className="flex-1 text-right">{affirmation}</span>

            {/* כפתור מחיקה בצד שמאל */}
            <button
              onClick={() => deleteAffirmation(index)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-4"
            >
              🗑️ מחק
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PositiveLanguage;
