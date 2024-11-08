import React, { useState } from 'react';
import { Plane, Calendar, MapPin, Clock, Users, CreditCard, ChevronRight } from 'lucide-react';

interface Trip {
  id: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'past' | 'cancelled';
  travelers: number;
  price: number;
  bookingNumber: string;
}

const initialTrips: Trip[] = [
  {
    id: '1',
    destination: 'Tokyo, Japon',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000',
    startDate: '2024-05-15',
    endDate: '2024-05-30',
    status: 'upcoming',
    travelers: 2,
    price: 2800,
    bookingNumber: 'TYO24051',
  },
  {
    id: '2',
    destination: 'Bali, Indonésie',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000',
    startDate: '2024-08-10',
    endDate: '2024-08-24',
    status: 'upcoming',
    travelers: 2,
    price: 2200,
    bookingNumber: 'BAL24081',
  },
  {
    id: '3',
    destination: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
    startDate: '2023-12-10',
    endDate: '2023-12-15',
    status: 'past',
    travelers: 2,
    price: 1200,
    bookingNumber: 'PAR23121',
  },
];

export default function MesVoyagesPage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [trips] = useState<Trip[]>(initialTrips);

  const filteredTrips = trips.filter(trip => 
    selectedTab === 'upcoming' ? trip.status === 'upcoming' : trip.status === 'past'
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="page-title">Mes Voyages</h1>
        <p className="page-subtitle">Gérez vos voyages passés et à venir</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSelectedTab('upcoming')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            selectedTab === 'upcoming'
              ? 'neon-button text-white'
              : 'text-tokyo-accent/70 hover:bg-tokyo-accent/10'
          }`}
        >
          Voyages à venir
        </button>
        <button
          onClick={() => setSelectedTab('past')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            selectedTab === 'past'
              ? 'neon-button text-white'
              : 'text-tokyo-accent/70 hover:bg-tokyo-accent/10'
          }`}
        >
          Voyages passés
        </button>
      </div>

      <div className="space-y-6">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="neon-card rounded-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto relative">
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-full object-cover"
                />
                {trip.status === 'upcoming' && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-tokyo-accent/90 text-white text-sm">
                    À venir
                  </div>
                )}
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{trip.destination}</h2>
                    <div className="flex items-center text-tokyo-accent/70 mb-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Réservation #{trip.bookingNumber}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{trip.price}€</div>
                    <div className="text-sm text-tokyo-accent/70">par personne</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-tokyo-accent mr-2" />
                    <div className="text-sm">
                      <div className="font-medium">Départ</div>
                      <div className="text-tokyo-accent/70">{formatDate(trip.startDate)}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-tokyo-accent mr-2" />
                    <div className="text-sm">
                      <div className="font-medium">Retour</div>
                      <div className="text-tokyo-accent/70">{formatDate(trip.endDate)}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-tokyo-accent mr-2" />
                    <div className="text-sm">
                      <div className="font-medium">Voyageurs</div>
                      <div className="text-tokyo-accent/70">{trip.travelers} personnes</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {trip.status === 'upcoming' && (
                    <>
                      <button className="neon-button px-4 py-2 rounded-lg text-white flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Voir la réservation
                      </button>
                      <button className="px-4 py-2 rounded-lg border border-tokyo-accent/20 hover:bg-tokyo-accent/10 transition-colors flex items-center">
                        <Plane className="w-4 h-4 mr-2" />
                        Détails du vol
                      </button>
                    </>
                  )}
                  {trip.status === 'past' && (
                    <button className="px-4 py-2 rounded-lg border border-tokyo-accent/20 hover:bg-tokyo-accent/10 transition-colors flex items-center">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Voir les détails
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <Plane className="w-16 h-16 text-tokyo-accent/30 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">
              {selectedTab === 'upcoming' ? 'Aucun voyage prévu' : 'Aucun voyage passé'}
            </h3>
            <p className="text-tokyo-accent/70">
              {selectedTab === 'upcoming'
                ? 'Commencez à planifier votre prochain voyage !'
                : 'Vos voyages passés apparaîtront ici'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}