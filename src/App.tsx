import React from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { Dashboard } from './pages/Dashboard';
import { Trading } from './pages/Trading';
import { Rocket } from 'lucide-react';

function App() {
  // Simple routing based on window.location.pathname
  const getContent = () => {
    const path = window.location.pathname;
    switch (path) {
      case '/dashboard':
        return <Dashboard />;
      case '/trading':
        return <Trading />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <Rocket className="h-8 w-8 text-green-500" />
                <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">Nexsosphere</span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Navigation />
              <ThemeToggle />
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {getContent()}
      </main>
    </div>
  );
}

export default App;