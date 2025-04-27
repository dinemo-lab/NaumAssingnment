import { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../Context/TaskContext';
import { X, AlertTriangle, CheckCircle2, Clock, Flag, Loader2 } from 'lucide-react';

const TaskForm = ({ task, onClose }) => {
  const isEditing = !!task;
  const { addTask, updateTask } = useContext(TaskContext);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium'
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium'
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (!formData.title.trim()) return;
    
    setLoading(true);
    
    try {
      if (isEditing) {
        await updateTask(task._id, formData);
      } else {
        await addTask(formData);
      }
      // Show success indicator briefly before closing
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'text-green-600';
      case 'Medium':
        return 'text-amber-500';
      case 'High':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'Low':
        return <Flag className="h-4 w-4 text-green-600" />;
      case 'Medium':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'High':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Flag className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-300 transform"
        onClick={(e) => e.stopPropagation()}
      >
   
        <div className="bg-blue-600 px-6 py-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-medium flex items-center">
            {isEditing ? (
              <>
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Edit Task
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Create New Task
              </>
            )}
          </h2>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
     
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                submitted && !formData.title.trim() 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-300'
              }`}
              placeholder="What needs to be done?"
            />
            {submitted && !formData.title.trim() && (
              <p className="mt-1 text-sm text-red-600">Title is required</p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Add some details about this task..."
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="relative">
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all pr-10"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {getPriorityIcon(formData.priority)}
              </div>
            </div>
            <p className={`text-right mt-1 text-xs ${getPriorityColor(formData.priority)}`}>
              {formData.priority} priority
            </p>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2.5 rounded-lg text-white font-medium flex items-center justify-center min-w-24 transition-colors ${
                loading 
                  ? 'bg-blue-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isEditing ? 'Saving...' : 'Creating...'}
                </>
              ) : (
                isEditing ? 'Save Changes' : 'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;