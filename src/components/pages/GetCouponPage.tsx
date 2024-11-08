import React, { useState } from 'react';
import { MapPin, User, Calendar, DollarSign, Route, Users, Compass, Heart, Coffee, Utensils, Hotel, Bus, Map, Star } from 'lucide-react';
import PhotoUpload from '../coupon/PhotoUpload';
import RatingInput from '../coupon/RatingInput';

interface TravelStory {
  destination: string;
  date: string;
  description: string;
  photos: string[];
  rating: number;
  budget: string;
  itinerary: {
    transportation: string;
    accommodation: string;
    activities: string;
  };
  guides: {
    name: string;
    rating: number;
    review: string;
  }[];
  localExperience: {
    peopleFriendliness: number;
    foodQuality: number;
    localHospitality: number;
    safety: number;
  };
  tips: string;
  wouldRecommend: boolean;
}

const initialGuide = { name: '', rating: 5, review: '' };

export default function GetCouponPage() {
  const [story, setStory] = useState<TravelStory>({
    destination: '',
    date: '',
    description: '',
    photos: [],
    rating: 5,
    budget: '',
    itinerary: {
      transportation: '',
      accommodation: '',
      activities: ''
    },
    guides: [initialGuide],
    localExperience: {
      peopleFriendliness: 5,
      foodQuality: 5,
      localHospitality: 5,
      safety: 5
    },
    tips: '',
    wouldRecommend: true
  });

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
    setStory(prev => ({
      ...prev,
      photos: [...prev.photos, ...imageUrls]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting story:', story);
    alert('Merci pour votre histoire détaillée ! Votre coupon sera généré sous peu.');
  };

  const addGuide = () => {
    setStory(prev => ({
      ...prev,
      guides: [...prev.guides, initialGuide]
    }));
  };

  const updateGuide = (index: number, field: keyof typeof initialGuide, value: string | number) => {
    setStory(prev => ({
      ...prev,
      guides: prev.guides.map((guide, i) => 
        i === index ? { ...guide, [field]: value } : guide
      )
    }));
  };

  const removeGuide = (index: number) => {
    setStory(prev => ({
      ...prev,
      guides: prev.guides.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="page-title">Racontez votre voyage</h1>
        <p className="page-subtitle">Plus vous ajoutez de détails, meilleure sera votre note !</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <div className="neon-card rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                <MapPin className="inline-block w-4 h-4 mr-2" />
                Destination
              </label>
              <input
                type="text"
                value={story.destination}
                onChange={(e) => setStory(prev => ({ ...prev, destination: e.target.value }))}
                className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50"
                placeholder="Paris, France"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                <Calendar className="inline-block w-4 h-4 mr-2" />
                Date du voyage
              </label>
              <input
                type="date"
                value={story.date}
                onChange={(e) => setStory(prev => ({ ...prev, date: e.target.value }))}
                className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              <User className="inline-block w-4 h-4 mr-2" />
              Votre histoire
            </label>
            <textarea
              value={story.description}
              onChange={(e) => setStory(prev => ({ ...prev, description: e.target.value }))}
              className="w-full neon-input rounded-lg px-4 py-3 bg-tokyo-dark/50 min-h-[150px]"
              placeholder="Racontez-nous votre expérience en détail..."
              required
            />
          </div>
        </div>

        {/* Itinéraire et logistique */}
        <div className="neon-card rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Itinéraire et logistique</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                <Bus className="inline-block w-4 h-4 mr-2" />
                Transport utilisé
              </label>
              <textarea
                value={story.itinerary.transportation}
                onChange={(e) => setStory(prev => ({
                  ...prev,
                  itinerary: { ...prev.itinerary, transportation: e.target.value }
                }))}
                className="w-full neon-input rounded-lg px-4 py-3 bg-tokyo-dark/50"
                placeholder="Détaillez vos moyens de transport (vols, trains, locations de voiture...)"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                <Hotel className="inline-block w-4 h-4 mr-2" />
                Hébergement
              </label>
              <textarea
                value={story.itinerary.accommodation}
                onChange={(e) => setStory(prev => ({
                  ...prev,
                  itinerary: { ...prev.itinerary, accommodation: e.target.value }
                }))}
                className="w-full neon-input rounded-lg px-4 py-3 bg-tokyo-dark/50"
                placeholder="Décrivez vos hébergements (hôtels, airbnb, auberges...)"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                <Map className="inline-block w-4 h-4 mr-2" />
                Activités et visites
              </label>
              <textarea
                value={story.itinerary.activities}
                onChange={(e) => setStory(prev => ({
                  ...prev,
                  itinerary: { ...prev.itinerary, activities: e.target.value }
                }))}
                className="w-full neon-input rounded-lg px-4 py-3 bg-tokyo-dark/50"
                placeholder="Listez les activités, visites et expériences réalisées"
              />
            </div>
          </div>
        </div>

        {/* Guides */}
        <div className="neon-card rounded-xl p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Guides et accompagnateurs</h2>
            <button
              type="button"
              onClick={addGuide}
              className="px-4 py-2 rounded-lg bg-tokyo-accent/10 hover:bg-tokyo-accent/20 transition-colors flex items-center"
            >
              <Compass className="w-4 h-4 mr-2" />
              Ajouter un guide
            </button>
          </div>

          {story.guides.map((guide, index) => (
            <div key={index} className="space-y-4 p-4 border border-tokyo-accent/20 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Guide #{index + 1}</h3>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeGuide(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Supprimer
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Nom du guide</label>
                  <input
                    type="text"
                    value={guide.name}
                    onChange={(e) => updateGuide(index, 'name', e.target.value)}
                    className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50"
                    placeholder="Nom du guide"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Note</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => updateGuide(index, 'rating', value)}
                        className={`p-1 rounded-full transition-colors ${
                          guide.rating >= value ? 'text-yellow-400' : 'text-gray-400'
                        }`}
                      >
                        <Star className="w-5 h-5" fill={guide.rating >= value ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Commentaire</label>
                <textarea
                  value={guide.review}
                  onChange={(e) => updateGuide(index, 'review', e.target.value)}
                  className="w-full neon-input rounded-lg px-4 py-3 bg-tokyo-dark/50"
                  placeholder="Votre avis sur ce guide..."
                />
              </div>
            </div>
          ))}
        </div>

        {/* Expérience locale */}
        <div className="neon-card rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Expérience locale</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                <Heart className="inline-block w-4 h-4 mr-2" />
                Sympathie des locaux
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStory(prev => ({
                      ...prev,
                      localExperience: { ...prev.localExperience, peopleFriendliness: value }
                    }))}
                    className={`p-1 rounded-full transition-colors ${
                      story.localExperience.peopleFriendliness >= value ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                  >
                    <Star className="w-5 h-5" fill={story.localExperience.peopleFriendliness >= value ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                <Utensils className="inline-block w-4 h-4 mr-2" />
                Qualité de la nourriture
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStory(prev => ({
                      ...prev,
                      localExperience: { ...prev.localExperience, foodQuality: value }
                    }))}
                    className={`p-1 rounded-full transition-colors ${
                      story.localExperience.foodQuality >= value ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                  >
                    <Star className="w-5 h-5" fill={story.localExperience.foodQuality >= value ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                <Coffee className="inline-block w-4 h-4 mr-2" />
                Hospitalité locale
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStory(prev => ({
                      ...prev,
                      localExperience: { ...prev.localExperience, localHospitality: value }
                    }))}
                    className={`p-1 rounded-full transition-colors ${
                      story.localExperience.localHospitality >= value ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                  >
                    <Star className="w-5 h-5" fill={story.localExperience.localHospitality >= value ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                <Users className="inline-block w-4 h-4 mr-2" />
                Sécurité
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStory(prev => ({
                      ...prev,
                      localExperience: { ...prev.localExperience, safety: value }
                    }))}
                    className={`p-1 rounded-full transition-colors ${
                      story.localExperience.safety >= value ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                  >
                    <Star className="w-5 h-5" fill={story.localExperience.safety >= value ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="neon-card rounded-xl p-6">
          <PhotoUpload
            photos={story.photos}
            dragActive={dragActive}
            onDrag={handleDrag}
            onDrop={handleDrop}
            onFileSelect={(files) => files && handleFiles(Array.from(files))}
            onPhotoRemove={(index) => 
              setStory(prev => ({
                ...prev,
                photos: prev.photos.filter((_, i) => i !== index)
              }))
            }
          />
        </div>

        {/* Conseils et recommandations */}
        <div className="neon-card rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Conseils aux futurs voyageurs</h2>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              <Route className="inline-block w-4 h-4 mr-2" />
              Conseils et astuces
            </label>
            <textarea
              value={story.tips}
              onChange={(e) => setStory(prev => ({ ...prev, tips: e.target.value }))}
              className="w-full neon-input rounded-lg px-4 py-3 bg-tokyo-dark/50 min-h-[100px]"
              placeholder="Partagez vos meilleurs conseils pour les futurs voyageurs..."
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="recommend"
              checked={story.wouldRecommend}
              onChange={(e) => setStory(prev => ({ ...prev, wouldRecommend: e.target.checked }))}
              className="form-checkbox h-5 w-5 text-tokyo-accent"
            />
            <label htmlFor="recommend" className="text-sm font-medium">
              Je recommande cette destination
            </label>
          </div>
        </div>

        {/* Budget */}
        <div className="neon-card rounded-xl p-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              <DollarSign className="inline-block w-4 h-4 mr-2" />
              Budget total
            </label>
            <input
              type="text"
              value={story.budget}
              onChange={(e) => setStory(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full neon-input rounded-lg px-4 py-2.5 bg-tokyo-dark/50"
              placeholder="Budget total du voyage (ex: 2000€)"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="neon-button w-full py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
        >
          Obtenir mon coupon
        </button>
      </form>
    </div>
  );
}