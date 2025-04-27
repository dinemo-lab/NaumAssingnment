import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { LogOut, User, Menu, X, CheckSquare, Bell } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
   
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
        
          <div className="flex items-center">
            <a href="/dashboard" className="flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <CheckSquare className="h-6 w-6" />
              <span className="tracking-tight">TaskMaster</span>
            </a>
          </div>

         

        
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
 
          <div className="hidden md:flex items-center space-x-4">
        
            
    
            <div className="flex items-center space-x-3 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
              <div className="bg-blue-600 text-white p-1.5 rounded-full">
                <User className="h-4 w-4" />
              </div>
              <span className="font-medium">{user?.name || 'User'}</span>
            </div>
            
          
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

 
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-2 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex flex-col divide-y divide-gray-100">
              <div className="py-3">
                <div className="flex items-center space-x-3 py-2">
                  <div className="bg-blue-600 text-white p-1.5 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{user?.name || 'User'}</span>
                </div>
              </div>

           
              
              <div className="py-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;