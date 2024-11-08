import React, { useState } from 'react';
import { Star, MessageCircle, ThumbsUp, Share2, BookmarkPlus } from 'lucide-react';

interface Experience {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  destination: string;
  date: string;
  image: string;
  title: string;
  description: string;
  rating: number;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
}

const initialExperiences: Experience[] = [
  {
    id: '1',
    author: {
      name: 'Marie Laurent',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    destination: 'Kyoto, Japon',
    date: '15 Mars 2024',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000',
    title: 'Un printemps magique sous les cerisiers',
    description: 'Une expérience inoubliable dans les temples ancestraux de Kyoto, bercée par la beauté des cerisiers en fleurs...',
    rating: 5,
    likes: 234,
    comments: 45,
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    author: {
      name: 'Thomas Dubois',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    destination: 'Santorini, Grèce',
    date: '10 Mars 2024',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=1000',
    title: 'Couchers de soleil et villages blancs',
    description: 'Des ruelles pittoresques aux plages volcaniques, chaque moment passé à Santorin est une carte postale vivante...',
    rating: 4,
    likes: 189,
    comments: 32,
    isLiked: false,
    isSaved: false,
  },
];

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);

  const handleLike = (id: string) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === id) {
        return {
          ...exp,
          likes: exp.isLiked ? exp.likes - 1 : exp.likes + 1,
          isLiked: !exp.isLiked,
        };
      }
      return exp;
    }));
  };

  const handleSave = (id: string) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === id) {
        return {
          ...exp,
          isSaved: !exp.isSaved,
        };
      }
      return exp;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="page-title">Expériences de Voyage</h1>
        <p className="page-subtitle">Découvrez les récits de nos voyageurs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((experience) => (
          <article key={experience.id} className="neon-card rounded-xl overflow-hidden">
            <div className="relative h-64">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 space-x-2">
                <button
                  onClick={() => handleSave(experience.id)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    experience.isSaved
                      ? 'bg-tokyo-accent text-white'
                      : 'bg-black/30 text-white hover:bg-black/50'
                  }`}
                >
                  <BookmarkPlus className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full backdrop-blur-md bg-black/30 text-white hover:bg-black/50 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={experience.author.avatar}
                  alt={experience.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium">{experience.author.name}</h3>
                  <div className="flex items-center text-sm text-tokyo-accent/70">
                    <span>{experience.destination}</span>
                    <span className="mx-2">•</span>
                    <span>{experience.date}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-2">{experience.title}</h2>
              <p className="text-tokyo-accent/80 mb-4">{experience.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(experience.id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      experience.isLiked ? 'text-tokyo-accent' : 'text-tokyo-accent/70'
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{experience.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-tokyo-accent/70">
                    <MessageCircle className="w-5 h-5" />
                    <span>{experience.comments}</span>
                  </button>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="w-5 h-5"
                      fill={index < experience.rating ? 'currentColor' : 'none'}
                      color={index < experience.rating ? '#FFD700' : '#4B5563'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}