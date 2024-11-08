import React, { useState } from 'react';
import { Map, Ticket, BookHeart, Settings, MessageSquareMore, Gift, Palmtree, X } from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';
import { NavigationItem } from '../types';

const navigation: NavigationItem[] = [
  { name: 'Créer un voyage', icon: Map, current: true },
  { name: 'Obtenir Coupon', icon: Gift, current: false },
  { name: 'Mes Voyages', icon: Map, current: false },
  { name: 'Coupons', icon: Ticket, current: false },
  { name: 'Expériences', icon: BookHeart, current: false },
  { name: 'Assistant AI', icon: MessageSquareMore, current: false },
  { name: 'Paramètres', icon: Settings, current: false },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage } = useTravelContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (pageName: string) => {
    setCurrentPage(pageName);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-tokyo-base/95 backdrop-blur-md border-t border-tokyo-accent/10 md:hidden z-40">
        <div className="flex justify-around items-center h-16 px-2">
          {navigation.slice(0, 4).map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.name)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg ${
                currentPage === item.name
                  ? 'text-tokyo-accent'
                  : 'text-tokyo-accent/50'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col w-72">
        <div className="flex flex-col h-full bg-tokyo-base/95 backdrop-blur-md border-r border-tokyo-accent/10">
          <div className="flex items-center p-4">
            <Palmtree className="h-8 w-8 text-tokyo-accent mr-2" />
            <span className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-neon-gradient neon-glow">
              Travel AI
            </span>
          </div>

          <nav className="flex-1 px-4 pb-4 space-y-3 overflow-y-auto">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`${
                  currentPage === item.name
                    ? 'neon-button text-white'
                    : 'text-tokyo-accent/80 hover:bg-tokyo-accent/10'
                } group flex items-center px-4 py-3 text-base font-medium rounded-lg w-full transition-all duration-200`}
              >
                <item.icon
                  className={`${
                    currentPage === item.name ? 'text-white' : 'text-tokyo-accent/50 group-hover:text-tokyo-accent'
                  } mr-3 h-6 w-6 transition-colors duration-200`}
                />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}