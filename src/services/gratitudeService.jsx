import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

export const saveGratitudes = async (gratitudes) => {
  try {
    // בדוק שהמשתמש מחובר
    if (!auth.currentUser) {
      console.error("המשתמש אינו מחובר");
      return;
    }

    // הדפס את ה-UID של המשתמש לקונסול
    console.log("User UID:", auth.currentUser?.uid);

    // שמור את התודות במסד הנתונים
    await addDoc(collection(db, "gratitude"), {
      userId: auth.currentUser.uid,
      gratitudes,
      date: new Date().toISOString(),
    });

    console.log("תודות נשמרו בהצלחה!");
  } catch (error) {
    console.error("שגיאה בשמירת התודות:", error.message);
  }
};
