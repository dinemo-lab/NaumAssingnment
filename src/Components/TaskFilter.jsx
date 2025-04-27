import { useContext } from 'react';
import { TaskContext } from '../Context/TaskContext';
import { CheckCircle, Circle, LayersIcon } from 'lucide-react';

const TaskFilter = () => {
  const { filter, setFilter } = useContext(TaskContext);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          <LayersIcon className="h-4 w-4 mr-2 text-blue-600" />
          View Tasks
        </h3>
        
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setFilter('all')}
            className={`py-2 px-4 text-sm font-medium rounded-l-md border border-r-0 transition-all duration-200 flex items-center justify-center min-w-20 ${
              filter === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <LayersIcon className="h-3.5 w-3.5 mr-1.5" />
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`py-2 px-4 text-sm font-medium border transition-all duration-200 flex items-center justify-center min-w-20 ${
              filter === 'active'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Circle className="h-3.5 w-3.5 mr-1.5" />
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`py-2 px-4 text-sm font-medium rounded-r-md border border-l-0 transition-all duration-200 flex items-center justify-center min-w-20 ${
              filter === 'completed'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
            Completed
          </button>
        </div>
      </div>
      
      <div className="mt-3 flex justify-end">
        <span className="text-xs text-gray-500">
          {filter === 'all' && 'Showing all tasks'}
          {filter === 'active' && 'Showing active tasks'}
          {filter === 'completed' && 'Showing completed tasks'}
        </span>
      </div>
    </div>
  );
};

export default TaskFilter;