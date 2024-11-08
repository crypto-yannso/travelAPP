import React from 'react';
import { Bell, Globe, Lock, User, CreditCard } from 'lucide-react';

export default function ParametresPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="page-title">Paramètres</h1>
        <p className="page-subtitle">Gérez vos préférences et paramètres de compte</p>
      </div>

      <div className="space-y-6">
        <div className="neon-card rounded-xl p-6">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-tokyo-accent mr-3" />
            <h2 className="text-xl font-semibold">Profil</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Nom complet</label>
              <input
                type="text"
                className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50"
                placeholder="john@example.com"
              />
            </div>
          </div>
        </div>

        <div className="neon-card rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-6 h-6 text-tokyo-accent mr-3" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox h-5 w-5" />
              <span>Notifications par email</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox h-5 w-5" />
              <span>Notifications push</span>
            </label>
          </div>
        </div>

        <div className="neon-card rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-6 h-6 text-tokyo-accent mr-3" />
            <h2 className="text-xl font-semibold">Préférences</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Langue</label>
              <select className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50">
                <option>Français</option>
                <option>English</option>
                <option>Español</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Fuseau horaire</label>
              <select className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50">
                <option>Europe/Paris</option>
                <option>America/New_York</option>
                <option>Asia/Tokyo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="neon-card rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 text-tokyo-accent mr-3" />
            <h2 className="text-xl font-semibold">Sécurité</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Nouveau mot de passe</label>
              <input
                type="password"
                className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Confirmer le mot de passe</label>
              <input
                type="password"
                className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50"
                placeholder="••••••••"
              />
            </div>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox h-5 w-5" />
              <span>Activer l'authentification à deux facteurs</span>
            </label>
          </div>
        </div>

        <div className="neon-card rounded-xl p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="w-6 h-6 text-tokyo-accent mr-3" />
            <h2 className="text-xl font-semibold">Paiement</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Carte par défaut</label>
              <select className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50">
                <option>Visa se terminant par 4242</option>
                <option>Mastercard se terminant par 5555</option>
              </select>
            </div>
            <button className="neon-button px-4 py-2 rounded-lg text-white">
              Ajouter une nouvelle carte
            </button>
          </div>
        </div>

        <button className="neon-button w-full py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
          Sauvegarder les modifications
        </button>
      </div>
    </div>
  );
}