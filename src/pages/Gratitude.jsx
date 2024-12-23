import React, { useState, useEffect } from 'react';
import { saveGratitudesToLocal, getGratitudesFromLocal, clearGratitudesFromLocal } from '../services/gratitudeStorage';
import './Gratitude.css'; // נוסיף קובץ CSS

const Gratitude = () => {
  const [gratitudes, setGratitudes] = useState(["", "", ""]);
  const [savedGratitudes, setSavedGratitudes] = useState(null);

  // שליפת תודות מהזיכרון המקומי עם טעינת הקומפוננטה
  useEffect(() => {
    const saved = getGratitudesFromLocal();
    if (saved) {
      setSavedGratitudes(saved);
    }
  }, []);

  // שמירת התודות
  const handleSave = () => {
    saveGratitudesToLocal(gratitudes);
    setSavedGratitudes({ gratitudes, date: new Date().toISOString() });
  };

  // איפוס התודות
  const handleClear = () => {
    clearGratitudesFromLocal();
    setSavedGratitudes(null);
    setGratitudes(["", "", ""]);
  };

  return (
    <div className="gratitude-container rtl">
      <h1>🙏 הכרת תודה יומית</h1>
      <p>כתוב שלושה דברים שעליהם אתה מודה היום:</p>
      <div className="gratitude-inputs">
        {gratitudes.map((gratitude, index) => (
          <div key={index} className="gratitude-input">
            <label>תודה {index + 1}:</label>
            <input
              type="text"
              value={gratitude}
              placeholder={`תודה ${index + 1}`}
              onChange={(e) => {
                const updatedGratitudes = [...gratitudes];
                updatedGratitudes[index] = e.target.value;
                setGratitudes(updatedGratitudes);
              }}
            />
          </div>
        ))}
      </div>
      <div className="gratitude-buttons">
        <button onClick={handleSave} className="save-button">💾 שמור תודות</button>
        <button onClick={handleClear} className="clear-button">🗑️ נקה תודות</button>
      </div>

      {savedGratitudes && (
        <div className="gratitude-saved">
          <h2>✨ תודות שנשמרו:</h2>
          <ul>
            {savedGratitudes.gratitudes.map((g, index) => (
              <li key={index}>{g}</li>
            ))}
          </ul>
          <p>📅 תאריך שמירה: {savedGratitudes.date}</p>
        </div>
      )}
    </div>
  );
};

export default Gratitude;
