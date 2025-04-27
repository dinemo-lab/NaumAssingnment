import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { TaskProvider } from '../Context/TaskContext';
import Navbar from '../Components/Navbar';
import TaskForm from '../Components/TaskForm';
import TaskList from '../Components/TaskList';
import TaskFilter from '../Components/TaskFilter';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const openForm = (task = null) => {
    setEditTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditTask(null);
    setIsFormOpen(false);
  };

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        
        <main className="container mx-auto py-8 px-4 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                Welcome, <span className="text-blue-600">{user?.name || 'User'}</span>
              </h1>
              <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => openForm()}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-2 px-6 rounded-lg flex items-center shadow-lg shadow-blue-500/20 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Task
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-5 border-b bg-gray-50">
              <TaskFilter />
            </div>
            
            <div className="p-5">
              <TaskList onEditTask={openForm} />
            </div>
          </div>
        </main>
        
        {isFormOpen && (
          <TaskForm task={editTask} onClose={closeForm} />
        )}
      </div>
    </TaskProvider>
  );
};

export default Dashboard;