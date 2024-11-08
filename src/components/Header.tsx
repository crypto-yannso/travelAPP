import React, { useState } from 'react';
import { Bell, Search, Sunrise } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';

export default function Header() {
  const { notifications } = useTravelContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Recherche pour: ${searchQuery}`);
  };

  return (
    <header className="bg-tokyo-base/80 backdrop-blur-md border-b border-tokyo-accent/10 px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <Sunrise className="h-8 w-8 mr-3 text-tokyo-accent hidden md:block" />
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg neon-input text-tokyo-accent placeholder-tokyo-accent/50 focus:outline-none focus:ring-2 focus:ring-tokyo-accent/30 text-base"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-tokyo-accent/50" />
          </form>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="relative p-3 text-tokyo-accent hover:bg-tokyo-accent/10 rounded-full transition-colors"
            onClick={() => alert('Notifications en cours de développement')}
          >
            <Bell className="h-6 w-6" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover cursor-pointer ring-2 ring-tokyo-accent/50"
              onClick={() => alert('Profil en cours de développement')}
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-tokyo-accent">Sophie Martin</p>
              <p className="text-xs text-tokyo-accent/75">Voyageur Premium</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}