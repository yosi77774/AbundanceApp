import React, { useState, useEffect } from 'react';

const VisionSummary = () => {
  const [activeTab, setActiveTab] = useState('weekly'); // טאב פעיל: שבועי, חודשי, שנתי
  const [summaryText, setSummaryText] = useState(''); // תוכן הסיכום
  const [savedSummaries, setSavedSummaries] = useState({
    weekly: '',
    monthly: '',
    yearly: '',
  });
  const [showExampleModal, setShowExampleModal] = useState(false); // חלונית דוגמה

  // טקסט דוגמה עבור כל אפשרות
  const examples = {
    weekly: '📅 הישגים: סיימתי 3 משימות מרכזיות בעבודה.\nאתגרים: חוסר מיקוד בבקרים.\nתובנות: ניהול זמן טוב יותר יכול להוביל להצלחות.',
    monthly: '📆 הישגים: השגתי את היעד החודשי של פעילות גופנית - 12 אימונים.\nאתגרים: הקפדה על שגרת שינה קבועה.\nתובנות: רשימת משימות עזרה לי לשמור על פוקוס.',
    yearly: '🏆 הישגים: סיימתי קורס מקצועי חדש.\nאתגרים: ניהול זמן בין עבודה לחיים אישיים.\nתובנות: הצבת יעדים ריאליים קריטית להצלחה.',
  };

  // 🚀 טוען סיכומים מ־Local Storage בעת הטעינה
  useEffect(() => {
    const storedSummaries = localStorage.getItem('visionSummaries');
    if (storedSummaries) {
      setSavedSummaries(JSON.parse(storedSummaries));
      setSummaryText(JSON.parse(storedSummaries)[activeTab] || '');
    }
  }, [activeTab]);

  // ✅ שומר סיכום נוכחי לפי הטאב הפעיל
  const saveSummary = () => {
    const updatedSummaries = {
      ...savedSummaries,
      [activeTab]: summaryText,
    };
    setSavedSummaries(updatedSummaries);
    localStorage.setItem('visionSummaries', JSON.stringify(updatedSummaries));
    alert('💾 הסיכום נשמר בהצלחה!');
  };

  // 🟡 מעבר בין טאב ועדכון התוכן
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSummaryText(savedSummaries[tab] || '');
  };

  // 📚 הצגת דוגמה
  const showExample = () => {
    setShowExampleModal(true);
  };

  // ❌ סגירת חלונית דוגמה
  const closeExampleModal = () => {
    setShowExampleModal(false);
  };

  return (
    <div className="container mx-auto p-8 relative" style={{ direction: 'rtl', textAlign: 'right' }}>
      <h1 className="text-3xl font-bold mb-6 text-center">📊 סיכומים שבועיים, חודשיים ושנתיים</h1>
      <p className="text-center text-gray-600 mb-4">כאן תוכלו להוסיף, לערוך ולסכם את ההישגים והתובנות שלכם.</p>

      {/* כפתורי מעבר בין טאב */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => handleTabChange('weekly')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          🗓️ סיכום שבועי
        </button>
        <button
          onClick={() => handleTabChange('monthly')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          📅 סיכום חודשי
        </button>
        <button
          onClick={() => handleTabChange('yearly')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          🏆 סיכום שנתי
        </button>
      </div>

      {/* תיבת טקסט לסיכום */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">
          {activeTab === 'weekly' && '📅 סיכום שבועי'}
          {activeTab === 'monthly' && '📆 סיכום חודשי'}
          {activeTab === 'yearly' && '🏆 סיכום שנתי'}
        </h2>
        <textarea
          value={summaryText}
          onChange={(e) => setSummaryText(e.target.value)}
          placeholder="כתבו כאן את הסיכום שלכם..."
          className="w-full h-40 p-2 border rounded-md text-right"
          style={{ direction: 'rtl' }}
        />
      </div>

      {/* כפתורים: דוגמה ושמירה */}
      <div className="flex justify-center gap-4">
        <button
          onClick={showExample}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          📚 הצג דוגמה לסיכום
        </button>
        <button
          onClick={saveSummary}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          💾 שמור סיכומים
        </button>
      </div>

      {/* חלונית דוגמה (מיני-מודל) */}
      {showExampleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md p-6 shadow-lg w-1/2 relative">
            <h3 className="text-lg font-bold mb-4 text-right">📚 דוגמה לסיכום</h3>
            <p className="whitespace-pre-wrap text-gray-700 text-right">{examples[activeTab]}</p>
            <button
              onClick={closeExampleModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              ✖️ סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisionSummary;
