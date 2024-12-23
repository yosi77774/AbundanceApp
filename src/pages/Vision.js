import React, { useState, useEffect } from 'react';

const VisionPage = () => {
  const [visionItems, setVisionItems] = useState([]);
  const [newVisionTitle, setNewVisionTitle] = useState('');
  const [newVisionDescription, setNewVisionDescription] = useState('');
  const [visionText, setVisionText] = useState('');
  const [weeklyGoals, setWeeklyGoals] = useState('');
  const [monthlyGoals, setMonthlyGoals] = useState('');
  const [yearlyGoals, setYearlyGoals] = useState('');
  const [activeTab, setActiveTab] = useState('weekly');
  const [isEditing, setIsEditing] = useState(true);

  const [showExample, setShowExample] = useState({
    vision: false,
    weekly: false,
    monthly: false,
    yearly: false,
  });

  // טעינת נתונים מה-localStorage
  useEffect(() => {
    const savedVision = localStorage.getItem('visionBoard');
    if (savedVision) {
      setVisionItems(JSON.parse(savedVision));
    }
    const savedGoals = localStorage.getItem('visionGoals');
    if (savedGoals) {
      const data = JSON.parse(savedGoals);
      setVisionText(data.visionText || '');
      setWeeklyGoals(data.weeklyGoals || '');
      setMonthlyGoals(data.monthlyGoals || '');
      setYearlyGoals(data.yearlyGoals || '');
    }
  }, []);

  // שמירה ואיפוס
  const saveData = () => {
    const goalsData = {
      visionText,
      weeklyGoals,
      monthlyGoals,
      yearlyGoals,
    };
    localStorage.setItem('visionBoard', JSON.stringify(visionItems));
    localStorage.setItem('visionGoals', JSON.stringify(goalsData));
    alert('💾 כל הנתונים נשמרו בהצלחה!');
  };

  const resetData = () => {
    setVisionItems([]);
    setVisionText('');
    setWeeklyGoals('');
    setMonthlyGoals('');
    setYearlyGoals('');
    localStorage.removeItem('visionBoard');
    localStorage.removeItem('visionGoals');
    alert('🗑️ כל הנתונים נמחקו בהצלחה!');
  };

  // הוספת פריט ללוח חזון
  const addVisionItem = () => {
    if (newVisionTitle.trim() === '' || newVisionDescription.trim() === '') {
      alert('נא למלא כותרת ותיאור!');
      return;
    }
    const newItem = {
      id: Date.now(),
      title: newVisionTitle,
      description: newVisionDescription,
    };
    setVisionItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      localStorage.setItem('visionBoard', JSON.stringify(updatedItems));
      return updatedItems;
    });
    setNewVisionTitle('');
    setNewVisionDescription('');
  };

  // מחיקת פריט מלוח חזון
  const deleteVisionItem = (id) => {
    setVisionItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem('visionBoard', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <div
      className="container mx-auto p-8 bg-white rounded-md shadow-md max-w-5xl"
      style={{ direction: 'rtl', textAlign: 'right' }}
    >
      {/* כותרת */}
      <h1 className="text-3xl font-bold mb-6 text-center">🌟 חזון אישי ויעדים 🌟</h1>

      {/* כפתורי פעולה */}
      <div className="flex gap-4 justify-center mb-6">
        <button onClick={saveData} className="bg-green-500 text-white px-4 py-2 rounded-md">
          💾 שמור הכל
        </button>
        <button onClick={resetData} className="bg-red-500 text-white px-4 py-2 rounded-md">
          🗑️ איפוס הכל
        </button>
        <button onClick={() => setIsEditing(!isEditing)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">
          ✏️ {isEditing ? 'סיים עריכה' : 'ערוך'}
        </button>
      </div>

      {/* לוח חזון */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">📝 לוח חזון</h2>
        <button onClick={() => setShowExample({ ...showExample, vision: !showExample.vision })} className="bg-blue-400 text-white px-3 py-1 rounded-md mb-2">
          📚 הצג דוגמה
        </button>
        {showExample.vision && (
          <div className="p-4 bg-gray-100 border rounded-md mb-4">
            דוגמה: "אני שואף לפתח קריירה מצליחה בתחום שאני אוהב, לשמור על איזון בין חיי העבודה לחיים האישיים."
          </div>
        )}
        <div className="mb-4 border p-4 rounded-md shadow-sm bg-gray-50">
          <input
            type="text"
            placeholder="כותרת"
            value={newVisionTitle}
            onChange={(e) => setNewVisionTitle(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />
          <textarea
            placeholder="תיאור"
            value={newVisionDescription}
            onChange={(e) => setNewVisionDescription(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />
          <button onClick={addVisionItem} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            ➕ הוסף פריט ללוח
          </button>
        </div>
        <ul>
          {visionItems.map((item) => (
            <li key={item.id} className="p-2 border rounded-md mb-2 flex justify-between items-center">
              <div>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
              <button onClick={() => deleteVisionItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                🗑️ מחק
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default VisionPage;
