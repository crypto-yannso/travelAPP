import React, { useState } from 'react';
import { Calendar, Users, Clock, MapPin, Send, Bot, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useTravelContext } from '../../context/TravelContext';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  suggestions?: string[];
}

export default function ExplorerPage() {
  const { preferences, updatePreferences } = useTravelContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Je suis votre assistant de voyage personnel. Pour commencer, dites-moi où vous souhaitez aller.",
      type: 'ai',
      suggestions: ['Paris, France', 'Tokyo, Japon', 'New York, USA', 'Bali, Indonésie']
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user'
    };

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: "D'accord, je comprends. Voici quelques suggestions basées sur vos préférences.",
      type: 'ai',
      suggestions: ['Voir les hôtels', 'Explorer les activités', 'Vérifier les vols']
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInput('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="page-title">Planifiez votre voyage</h1>
        <p className="page-subtitle">Discutez avec notre AI pour créer votre voyage idéal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="neon-card rounded-xl p-6 h-[calc(100vh-20rem)] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-6 pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-4 ${
                      message.type === 'user'
                        ? 'bg-tokyo-accent text-white'
                        : 'neon-card'
                    }`}
                  >
                    <p>{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => setInput(suggestion)}
                            className="px-3 py-1.5 rounded-full bg-tokyo-dark/50 hover:bg-tokyo-dark text-sm transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Décrivez votre voyage idéal..."
                className="w-full neon-input rounded-lg pl-4 pr-12 py-3 bg-tokyo-dark/50"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-tokyo-accent hover:text-white hover:bg-tokyo-accent rounded-lg transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="neon-card rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              Préférences
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  <Calendar className="inline-block w-4 h-4 mr-2" />
                  Dates
                </label>
                <input
                  type="text"
                  value={preferences.dates}
                  onChange={(e) => updatePreferences({ dates: e.target.value })}
                  className="w-full neon-input rounded-lg px-4 py-2 bg-tokyo-dark/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  <Users className="inline-block w-4 h-4 mr-2" />
                  Voyageurs
                </label>
                <input
                  type="text"
                  value={preferences.travelers}
                  onChange={(e) => updatePreferences({ travelers: e.target.value })}
                  className="w-full neon-input rounded-lg px-4 py-2 bg-tokyo-dark/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  <Clock className="inline-block w-4 h-4 mr-2" />
                  Durée
                </label>
                <input
                  type="text"
                  value={preferences.duration}
                  onChange={(e) => updatePreferences({ duration: e.target.value })}
                  className="w-full neon-input rounded-lg px-4 py-2 bg-tokyo-dark/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  <MapPin className="inline-block w-4 h-4 mr-2" />
                  Destination
                </label>
                <input
                  type="text"
                  value={preferences.destination}
                  onChange={(e) => updatePreferences({ destination: e.target.value })}
                  className="w-full neon-input rounded-lg px-4 py-2 bg-tokyo-dark/50"
                />
              </div>
            </div>
          </div>

          <div className="neon-card rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Feedback AI</h2>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center px-4 py-2 rounded-lg border border-tokyo-accent/20 hover:bg-tokyo-accent/10 transition-colors">
                <ThumbsUp className="w-5 h-5 mr-2" />
                Utile
              </button>
              <button className="flex items-center px-4 py-2 rounded-lg border border-tokyo-accent/20 hover:bg-tokyo-accent/10 transition-colors">
                <ThumbsDown className="w-5 h-5 mr-2" />
                À améliorer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}