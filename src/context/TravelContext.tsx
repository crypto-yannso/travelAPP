import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TravelPreferences, Destination } from '../types';

interface TravelContextType {
  preferences: TravelPreferences;
  updatePreferences: (newPrefs: Partial<TravelPreferences>) => void;
  notifications: number;
  destinations: Destination[];
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export function TravelProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<TravelPreferences>({
    dates: 'Mai - Juin',
    travelers: '2 adultes',
    duration: '1-2 semaines',
    destination: 'Europe',
  });

  const [notifications] = useState(3);
  const [currentPage, setCurrentPage] = useState('Explorer');

  const [destinations] = useState<Destination[]>([
    {
      id: '1',
      title: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000",
      rating: 4.8,
      reviews: 1234,
      description: "Découvrez la ville lumière avec nos itinéraires personnalisés."
    },
    {
      id: '2',
      title: "Kyoto, Japon",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
      rating: 4.9,
      reviews: 856,
      description: "Immergez-vous dans la culture traditionnelle japonaise."
    },
    {
      id: '3',
      title: "Santorini, Grèce",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=1000",
      rating: 4.7,
      reviews: 2103,
      description: "Des vues à couper le souffle sur la mer Égée."
    }
  ]);

  const updatePreferences = (newPrefs: Partial<TravelPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  return (
    <TravelContext.Provider value={{
      preferences,
      updatePreferences,
      notifications,
      destinations,
      currentPage,
      setCurrentPage,
    }}>
      {children}
    </TravelContext.Provider>
  );
}

export function useTravelContext() {
  const context = useContext(TravelContext);
  if (context === undefined) {
    throw new Error('useTravelContext must be used within a TravelProvider');
  }
  return context;
}