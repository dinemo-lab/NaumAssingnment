import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { CheckCircle, XCircle, LogIn, UserPlus, ArrowRight, CheckSquare, Clock, Flag, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const AuthPage = () => {
  const [activeView, setActiveView] = useState('landing'); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (activeView === 'register' && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (activeView === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
 
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <CheckSquare className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-600">TaskMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setActiveView('login')}
                className="px-4 py-2 rounded-md text-blue-600 font-medium hover:bg-blue-50 transition-colors flex items-center"
              >
                <LogIn className="h-4 w-4 mr-2" /> 
                Log In
              </button>
              <button 
                onClick={() => setActiveView('register')}
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-2" /> 
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
 
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="lg:flex items-center gap-12">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Organize your tasks with <span className="text-blue-600">TaskMaster</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              The simple, intuitive way to manage your daily tasks, set priorities, and boost your productivity.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setActiveView('register')}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg shadow-blue-500/20"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <button 
                onClick={() => setActiveView('login')}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Already have an account?
              </button>
            </div>
            
            
            <div className="mt-12 grid grid-cols-1 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Simple Task Management</h3>
                  <p className="mt-1 text-gray-600">Create, organize, and track your tasks with ease.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Flag className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Priority Setting</h3>
                  <p className="mt-1 text-gray-600">Assign different priority levels to focus on what matters most.</p>
                </div>
              </div>
              
 
            </div>
          </div>
          
        
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-2xl p-4 border border-gray-200">
              <div className="h-8 flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <input type="checkbox" className="h-5 w-5 text-blue-600 rounded border-gray-300" checked />
                  <div className="ml-3 flex-1">
                    <h4 className="text-gray-800 font-medium line-through">Complete project proposal</h4>
                    <div className="flex mt-1">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-200">Low</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <input type="checkbox" className="h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <div className="ml-3 flex-1">
                    <h4 className="text-gray-800 font-medium">Schedule team meeting</h4>
                    <div className="flex mt-1">
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200">Medium</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <input type="checkbox" className="h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <div className="ml-3 flex-1">
                    <h4 className="text-gray-800 font-medium">Review client feedback</h4>
                    <div className="flex mt-1">
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full border border-red-200">High</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '33%' }}></div>
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-gray-500">33% completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuthForm = () => {
    const isLogin = activeView === 'login';
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8">
              <div className="flex justify-center mb-4">
                <CheckSquare className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white text-center">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-blue-100 text-center mt-2">
                {isLogin ? 'Log in to manage your tasks' : 'Sign up to start organizing your tasks'}
              </p>
            </div>
          
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transition-all`}
                >
                  {loading 
                    ? 'Processing...' 
                    : isLogin 
                      ? 'Log In' 
                      : 'Create Account'
                  }
                </button>
              </div>
            </form>
            
         
            <div className="px-8 pb-8 text-center">
              <button
                onClick={() => setActiveView(isLogin ? 'register' : 'login')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Log in"
                }
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
              
              <button
                onClick={() => setActiveView('landing')}
                className="mt-6 text-gray-500 hover:text-gray-700 text-sm"
              >
                Return to home page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {activeView === 'landing' && renderLandingPage()}
      {(activeView === 'login' || activeView === 'register') && renderAuthForm()}
    </>
  );
};

export default AuthPage;