import React from 'react';
import { useTravelContext } from '../context/TravelContext';
import ExplorerPage from './pages/ExplorerPage';
import MesVoyagesPage from './pages/MesVoyagesPage';
import CouponsPage from './pages/CouponsPage';
import ExperiencesPage from './pages/ExperiencesPage';
import AssistantAIPage from './pages/AssistantAIPage';
import ParametresPage from './pages/ParametresPage';
import GetCouponPage from './pages/GetCouponPage';

export default function MainContent() {
  const { currentPage } = useTravelContext();

  const renderPage = () => {
    switch (currentPage) {
      case 'Explorer':
        return <ExplorerPage />;
      case 'Obtenir Coupon':
        return <GetCouponPage />;
      case 'Mes Voyages':
        return <MesVoyagesPage />;
      case 'Coupons':
        return <CouponsPage />;
      case 'Expériences':
        return <ExperiencesPage />;
      case 'Assistant AI':
        return <AssistantAIPage />;
      case 'Paramètres':
        return <ParametresPage />;
      default:
        return <ExplorerPage />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-tokyo-dark p-4 md:p-6 text-tokyo-accent/90 pb-20 md:pb-6">
      {renderPage()}
    </main>
  );
}