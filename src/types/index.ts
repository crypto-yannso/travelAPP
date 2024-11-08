export interface Destination {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
}

export interface TravelPreferences {
  dates: string;
  travelers: string;
  duration: string;
  destination: string;
}

export interface NavigationItem {
  name: string;
  icon: React.FC<{ className?: string }>;
  current: boolean;
}