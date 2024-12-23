// שמירה ושליפת נתונים מ-Local Storage

const GRATITUDE_KEY = 'gratitudeEntries';

// פונקציה לשמירת תודות ב-Local Storage
export const saveGratitudesToLocal = (gratitudes) => {
  try {
    const data = {
      gratitudes,
      date: new Date().toISOString()
    };
    localStorage.setItem(GRATITUDE_KEY, JSON.stringify(data));
    console.log("תודות נשמרו בהצלחה בזיכרון המקומי!");
  } catch (error) {
    console.error("שגיאה בשמירת התודות בזיכרון המקומי:", error.message);
  }
};

// פונקציה לשליפת התודות מה-Local Storage
export const getGratitudesFromLocal = () => {
  try {
    const data = localStorage.getItem(GRATITUDE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("שגיאה בשליפת התודות מהזיכרון המקומי:", error.message);
    return null;
  }
};

// פונקציה לניקוי התודות מה-Local Storage
export const clearGratitudesFromLocal = () => {
  try {
    localStorage.removeItem(GRATITUDE_KEY);
    console.log("תודות נמחקו מהזיכרון המקומי.");
  } catch (error) {
    console.error("שגיאה במחיקת התודות מהזיכרון המקומי:", error.message);
  }
};
