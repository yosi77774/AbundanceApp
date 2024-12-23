import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('נמוכה');

  // טעינת משימות מה-localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // הוספת משימה חדשה
  const addTask = () => {
    if (newTask.trim() === '') return;
    const currentDate = new Date().toLocaleDateString('he-IL');
    const newTaskItem = {
      text: newTask,
      priority,
      completed: false,
      date: currentDate,
    };
    const updatedTasks = [...tasks, newTaskItem];
    setTasks(updatedTasks);
    setNewTask('');
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // שינוי סטטוס משימה
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // מחיקת משימה
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div
      className="container mx-auto p-8 bg-white rounded-md shadow-md max-w-5xl"
      style={{ direction: 'rtl', textAlign: 'right' }}
    >
      {/* כותרת */}
      <h1 className="text-3xl font-bold mb-6 text-center">📋 ניהול משימות יומיות</h1>
      
      {/* הוספת משימה */}
      <div className="flex gap-4 mb-6 flex-row-reverse">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="דוגמה: לסיים פרק בספר עד סוף היום."
          className="flex-1 border p-2 rounded-md text-right"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded-md text-right"
        >
          <option value="נמוכה">נמוכה</option>
          <option value="בינונית">בינונית</option>
          <option value="גבוהה">גבוהה</option>
        </select>
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          ➕ הוסף
        </button>
      </div>

      {/* רשימת משימות */}
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`p-4 rounded-md shadow-md flex justify-between items-center ${
              task.completed ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            {/* טקסט המשימה בצד ימין */}
            <div className="flex-1 text-right">
              <span
                className={`${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.text}
              </span>
              <div className="text-sm text-gray-500 mt-1">📅 תאריך יצירה: {task.date}</div>
            </div>

            {/* כפתורים בצד שמאל */}
            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(index)}
                className={`px-3 py-1 rounded-md ${
                  task.completed
                    ? 'bg-gray-500 text-white'
                    : 'bg-green-500 text-white'
                }`}
              >
                {task.completed ? '✔️ הושלם' : '✔️ סמן כהושלם'}
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                🗑️ מחק
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
