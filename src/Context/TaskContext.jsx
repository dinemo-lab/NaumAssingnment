import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();


export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}`;;
      if (filter === 'active') {
        url += '?status=active';
      } else if (filter === 'completed') {
        url += '?status=completed';
      }
      
      const res = await axios.get(url);
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await axios.post(API_URL, taskData);
      setTasks([res.data, ...tasks]);
      toast.success('Task added successfully');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add task');
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, taskData);
      setTasks(tasks.map(task => task._id === id ? res.data : task));
      toast.success('Task updated successfully');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete task');
      throw err;
    }
  };

  const toggleStatus = async (id, task) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: !task.status
      });
      
      setTasks(tasks.map(task => 
        task._id === id ? res.data : task
      ));
      
      toast.success(`Task marked as ${!task.status ? 'completed' : 'active'}`);
      return res.data;
    } catch (err) {
      toast.error('Failed to update task status');
      throw err;
    }
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      loading, 
      error, 
      filter,
      setFilter,
      fetchTasks, 
      addTask, 
      updateTask, 
      deleteTask,
      toggleStatus
    }}>
      {children}
    </TaskContext.Provider>
  );
};