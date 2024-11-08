import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';
import { TravelProvider } from './context/TravelContext';

function App() {
  return (
    <TravelProvider>
      <div className="flex h-screen bg-tokyo-light cyber-pattern font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <MainContent />
        </div>
      </div>
    </TravelProvider>
  );
}

export default App;