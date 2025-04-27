import { useContext, useEffect } from 'react';
import { TaskContext } from '../Context/TaskContext';
import TaskItem from './TaskItem';
import { AlertCircle, Loader2, ClipboardList, CheckCircle2, ListX } from 'lucide-react';

const TaskList = ({ onEditTask }) => {
  const { tasks, loading, error, fetchTasks, filter } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 shadow-md">
        <div className="relative">
          <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
          <div className="absolute inset-0 animate-pulse opacity-40 blur-md">
            <Loader2 className="h-16 w-16 text-blue-400" />
          </div>
        </div>
        <p className="text-gray-700 mt-8 font-medium text-xl">
          Loading your tasks...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 bg-gradient-to-br from-red-50 to-red-100/80 rounded-2xl border border-red-200 shadow-md">
        <div className="p-4 bg-white rounded-full mb-6 shadow-sm border border-red-200">
          <AlertCircle className="h-12 w-12 text-red-600" />
        </div>
        <h3 className="text-2xl font-bold text-red-800">Failed to load tasks</h3>
        <p className="text-red-600 mt-4 text-center max-w-md leading-relaxed">
          {error}
        </p>
        <button 
          onClick={fetchTasks}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all font-semibold flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <ClipboardList className="h-5 w-5 mr-3" />
          Try Again
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl border border-gray-200 shadow-md">
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200 mb-8">
          {filter === 'all' && <ClipboardList className="h-14 w-14 text-gray-400" />}
          {filter === 'active' && <ListX className="h-14 w-14 text-gray-400" />}
          {filter === 'completed' && <CheckCircle2 className="h-14 w-14 text-gray-400" />}
        </div>
        <h3 className="text-3xl font-bold text-gray-800">No tasks found</h3>
        <p className="mt-4 text-gray-500 text-center max-w-md leading-relaxed text-lg">
          {filter === 'all' 
            ? "You don't have any tasks yet. Create a new task to get started." 
            : filter === 'active' 
              ? "You don't have any active tasks. Tasks you haven't completed will appear here." 
              : "You don't have any completed tasks. Tasks you finish will appear here."
          }
        </p>
  
      </div>
    );
  }

  return (
    <div className="space-y-8">
   
      <div className="space-y-4">
        {tasks.map(task => (
          <div 
            key={task._id} 
            className="transform transition-all hover:-translate-y-1 hover:shadow-md rounded-xl overflow-hidden"
          >
            <TaskItem 
              task={task} 
              onEdit={() => onEditTask(task)} 
            />
          </div>
        ))}
      </div>
   
      {tasks.length > 0 && (
        <div className="text-center py-6 text-sm text-gray-500 border-t border-gray-200 font-medium">
          Showing {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} 
          {filter !== 'all' && (
            <span className="inline-flex items-center ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
              {filter}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;