import React, { useState } from 'react';
import { Tag, Clock, Percent, Gift, ChevronRight } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  description: string;
  expiryDate: string;
  isUsed: boolean;
  type: 'percentage' | 'fixed';
  minSpend?: number;
}

const initialCoupons: Coupon[] = [
  {
    id: '1',
    code: 'TOKYO2024',
    discount: 20,
    description: 'Réduction sur votre prochain voyage au Japon',
    expiryDate: '2024-12-31',
    isUsed: false,
    type: 'percentage',
    minSpend: 1000,
  },
  {
    id: '2',
    code: 'SUMMER50',
    discount: 50,
    description: 'Réduction sur les destinations ensoleillées',
    expiryDate: '2024-08-31',
    isUsed: false,
    type: 'fixed',
  },
  {
    id: '3',
    code: 'ADVENTURE25',
    discount: 25,
    description: 'Réduction sur les activités d\'aventure',
    expiryDate: '2024-06-30',
    isUsed: true,
    type: 'percentage',
  },
];

export default function CouponsPage() {
  const [coupons] = useState<Coupon[]>(initialCoupons);
  const [selectedTab, setSelectedTab] = useState<'active' | 'used'>('active');

  const filteredCoupons = coupons.filter(coupon => 
    selectedTab === 'active' ? !coupon.isUsed : coupon.isUsed
  );

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Code copié !');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="page-title">Mes Coupons</h1>
        <p className="page-subtitle">Découvrez vos réductions exclusives</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSelectedTab('active')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            selectedTab === 'active'
              ? 'neon-button text-white'
              : 'text-tokyo-accent/70 hover:bg-tokyo-accent/10'
          }`}
        >
          Coupons actifs
        </button>
        <button
          onClick={() => setSelectedTab('used')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            selectedTab === 'used'
              ? 'neon-button text-white'
              : 'text-tokyo-accent/70 hover:bg-tokyo-accent/10'
          }`}
        >
          Coupons utilisés
        </button>
      </div>

      <div className="space-y-4">
        {filteredCoupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`neon-card rounded-xl p-6 ${
              coupon.isUsed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start md:items-center flex-col md:flex-row gap-4 mb-4 md:mb-0">
                  <div className="flex items-center">
                    <Gift className="w-8 h-8 text-tokyo-accent mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold">{coupon.code}</h3>
                      <p className="text-sm text-tokyo-accent/70">
                        {coupon.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Percent className="w-4 h-4 text-tokyo-accent mr-1" />
                      <span className="font-medium">
                        {coupon.discount}
                        {coupon.type === 'percentage' ? '%' : '€'}
                      </span>
                    </div>
                    {coupon.minSpend && (
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 text-tokyo-accent mr-1" />
                        <span className="text-sm">
                          Min. {coupon.minSpend}€
                        </span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-tokyo-accent mr-1" />
                      <span className="text-sm">
                        Expire le {new Date(coupon.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {!coupon.isUsed && (
                <button
                  onClick={() => copyToClipboard(coupon.code)}
                  className="flex items-center px-6 py-3 rounded-lg bg-tokyo-accent/10 hover:bg-tokyo-accent/20 transition-colors group"
                >
                  <span className="mr-2">Copier le code</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredCoupons.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-tokyo-accent/30 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">
              {selectedTab === 'active' ? 'Aucun coupon actif' : 'Aucun coupon utilisé'}
            </h3>
            <p className="text-tokyo-accent/70">
              {selectedTab === 'active'
                ? 'Partagez vos expériences de voyage pour gagner des coupons !'
                : 'Vos coupons utilisés apparaîtront ici'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}