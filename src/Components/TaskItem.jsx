import { useContext } from 'react';
import { format } from 'date-fns';
import { TaskContext } from '../Context/TaskContext';
import { Edit, Trash2, AlertCircle } from 'lucide-react';

const TaskItem = ({ task, onEdit }) => {
  const { deleteTask, toggleStatus } = useContext(TaskContext);

  
  const formattedDate = format(new Date(task.createdAt), 'MMM d, yyyy');

 
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
      task.status ? 'bg-gray-50' : 'bg-white'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
       
          <div className="mt-1">
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => toggleStatus(task._id, task)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
          </div>
          
       
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${
              task.status ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`mt-1 text-sm ${
                task.status ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center mt-2 space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                getPriorityClass(task.priority)
              }`}>
                {task.priority}
              </span>
              
              <span className="text-xs text-gray-500">
                Created: {formattedDate}
              </span>
            </div>
          </div>
        </div>
    
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-gray-500 hover:text-blue-600 p-1"
            title="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteTask(task._id)}
            className="text-gray-500 hover:text-red-600 p-1"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;