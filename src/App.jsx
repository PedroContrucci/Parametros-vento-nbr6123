import React, { useState, useMemo, useEffect } from 'react';
import { Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, Wallet, TrendingDown, TrendingUp, Sparkles, Check, AlertTriangle, Lightbulb, Globe, Star, Clock, X, Plus, RefreshCw, Heart, User, LogOut, Bookmark, Baby, UserCheck, Compass, Mountain, Building, Palmtree, Crown, Mail, Lock, Map, Sunrise, Sun, Moon, PlaneTakeoff, PlaneLanding, ArrowLeftRight, MessageSquare, Car, Copy, Phone, Download, Zap, Target, Award, ThumbsUp, Info, Anchor, Wine, Music, ShoppingBag, Sliders, ChevronDown, ChevronUp, Edit3, Trash2, ArrowUpCircle, ArrowDownCircle, Eye, Send, ChevronLeft, ChevronRight, Coffee, Bed } from 'lucide-react';

const BRAZILIAN_CITIES = ['São Paulo (GRU)', 'Rio de Janeiro (GIG)', 'Brasília (BSB)', 'Belo Horizonte (CNF)', 'Salvador (SSA)', 'Fortaleza (FOR)', 'Recife (REC)', 'Porto Alegre (POA)', 'Curitiba (CWB)', 'Manaus (MAO)', 'Florianópolis (FLN)', 'Natal (NAT)'];

const TRAVELER_TYPES = [
  { id: 'adventure', name: 'Aventureiro', icon: Mountain, color: 'emerald' },
  { id: 'culture', name: 'Cultural', icon: Building, color: 'violet' },
  { id: 'beach', name: 'Praia', icon: Palmtree, color: 'cyan' },
  { id: 'gastro', name: 'Gastronômico', icon: Utensils, color: 'orange' },
  { id: 'family', name: 'Família', icon: Users, color: 'pink' },
  { id: 'romantic', name: 'Romântico', icon: Heart, color: 'rose' },
  { id: 'budget', name: 'Econômico', icon: Wallet, color: 'lime' },
  { id: 'luxury', name: 'Luxo', icon: Crown, color: 'amber' },
];

const TRIP_PRIORITIES = [
  { id: 'gastronomy', name: 'Gastronomia', icon: Utensils, desc: 'Foco em restaurantes' },
  { id: 'beaches', name: 'Praias', icon: Anchor, desc: 'Atividades de praia' },
  { id: 'culture', name: 'Cultura', icon: Building, desc: 'Museus e história' },
  { id: 'adventure', name: 'Aventura', icon: Mountain, desc: 'Esportes e trilhas' },
  { id: 'relaxation', name: 'Relaxamento', icon: Sparkles, desc: 'Spas e tranquilidade' },
  { id: 'kids', name: 'Crianças', icon: Baby, desc: 'Family-friendly' },
  { id: 'nightlife', name: 'Vida Noturna', icon: Music, desc: 'Shows e bares' },
  { id: 'shopping', name: 'Compras', icon: ShoppingBag, desc: 'Lojas e outlets' },
];

const INTEREST_TAGS = ['Praias', 'Montanhas', 'Cidades', 'Arte', 'História', 'Gastronomia', 'Vida Noturna', 'Compras', 'Natureza', 'Aventura', 'Relaxamento', 'Fotografia'];

// Flight duration data (in hours from São Paulo)
const FLIGHT_DATA = {
  'Paris, França': { duration: 11.5, timezone: 4 },
  'Nova York, EUA': { duration: 10, timezone: 2 },
  'Miami, EUA': { duration: 8, timezone: 2 },
  'Tóquio, Japão': { duration: 24, timezone: 12 },
  'Roma, Itália': { duration: 12, timezone: 4 },
  'Barcelona, Espanha': { duration: 11, timezone: 4 },
  'Lisboa, Portugal': { duration: 9, timezone: 3 },
  'Cancún, México': { duration: 7, timezone: 2 },
  'Dubai, EAU': { duration: 14, timezone: 7 },
  'Londres, UK': { duration: 11, timezone: 3 },
  'Maldivas': { duration: 22, timezone: 8 },
  'Santorini, Grécia': { duration: 18, timezone: 5 },
  'Bali, Indonésia': { duration: 26, timezone: 10 },
  'Amsterdam, Holanda': { duration: 12, timezone: 4 },
  'Sydney, Austrália': { duration: 24, timezone: 14 },
  'Cape Town, África do Sul': { duration: 18, timezone: 5 },
};

const DESTINATIONS_DATABASE = {
  'Paris, França': {
    continent: 'Europa', image: '🗼', tags: ['culture', 'romantic', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    tip: 'Compre o Paris Museum Pass para economizar em museus!',
    flights: [
      { id: 'pf1', name: 'Air France - Direto', price: 4200, duration: '11h30', rating: 4.7, airline: 'Air France' },
      { id: 'pf2', name: 'TAP via Lisboa', price: 2980, duration: '14h20', rating: 4.3, airline: 'TAP' },
      { id: 'pf3', name: 'LATAM via Madrid', price: 3450, duration: '16h45', rating: 4.4, airline: 'LATAM' },
      { id: 'pf4', name: 'KLM via Amsterdam', price: 3150, duration: '15h10', rating: 4.5, airline: 'KLM' },
      { id: 'pf5', name: 'Iberia via Madrid', price: 2850, duration: '15h40', rating: 4.2, airline: 'Iberia' },
    ],
    hotels: [
      { id: 'ph1', name: 'Le Meurice', stars: 5, price: 4200, location: 'Tuileries', rating: 4.9 },
      { id: 'ph2', name: 'Sofitel Arc de Triomphe', stars: 5, price: 1650, location: 'Arc de Triomphe', rating: 4.7 },
      { id: 'ph3', name: 'Pullman Tour Eiffel', stars: 4, price: 850, location: 'Tour Eiffel', rating: 4.5 },
      { id: 'ph4', name: 'Mercure Montmartre', stars: 4, price: 580, location: 'Montmartre', rating: 4.4 },
      { id: 'ph5', name: 'Ibis Bastille', stars: 3, price: 380, location: 'Bastille', rating: 4.2 },
      { id: 'ph6', name: 'Generator Paris', stars: 2, price: 150, location: 'Canal Saint-Martin', rating: 4.0 },
    ],
    restaurants: [
      { id: 'pr1', name: 'Le Cinq', price: 850, cuisine: 'Fine Dining', rating: 4.9, tags: ['gastro', 'luxury'] },
      { id: 'pr2', name: 'Septime', price: 280, cuisine: 'Contemporânea', rating: 4.8, tags: ['gastro'] },
      { id: 'pr3', name: 'Bouillon Chartier', price: 55, cuisine: 'Tradicional', rating: 4.5, tags: ['budget'] },
      { id: 'pr4', name: 'Café de Flore', price: 75, cuisine: 'Café Parisiense', rating: 4.6, tags: ['romantic', 'culture'] },
      { id: 'pr5', name: 'Pink Mamma', price: 85, cuisine: 'Italiana', rating: 4.6, tags: ['family'] },
    ],
    activities: [
      { id: 'pa1', name: 'Torre Eiffel - Topo', price: 160, duration: 2, rating: 4.8, childFriendly: true, location: 'Champ de Mars', tags: ['landmark', 'romantic'], intensity: 'light' },
      { id: 'pa2', name: 'Museu do Louvre', price: 95, duration: 4, rating: 4.9, childFriendly: true, location: '1º Arrondissement', tags: ['culture', 'art'], intensity: 'medium' },
      { id: 'pa3', name: 'Cruzeiro no Sena', price: 85, duration: 1.5, rating: 4.7, childFriendly: true, location: 'Port de la Bourdonnais', tags: ['romantic', 'scenic'], intensity: 'light' },
      { id: 'pa4', name: 'Palácio de Versalhes', price: 195, duration: 6, rating: 4.8, childFriendly: true, location: 'Versalhes', tags: ['culture', 'history'], intensity: 'heavy' },
      { id: 'pa5', name: 'Tour Montmartre', price: 45, duration: 3, rating: 4.6, childFriendly: true, location: 'Montmartre', tags: ['culture', 'scenic'], intensity: 'medium' },
      { id: 'pa6', name: 'Museu dOrsay', price: 85, duration: 3, rating: 4.8, childFriendly: true, location: '7º Arrondissement', tags: ['culture', 'art'], intensity: 'medium' },
      { id: 'pa7', name: 'Disneyland Paris', price: 380, duration: 10, rating: 4.7, childFriendly: true, location: 'Marne-la-Vallée', tags: ['family', 'kids'], intensity: 'heavy' },
      { id: 'pa8', name: 'Jardim de Luxemburgo', price: 0, duration: 2, rating: 4.6, childFriendly: true, location: '6º Arrondissement', tags: ['free', 'nature', 'romantic', 'relaxation'], intensity: 'light' },
      { id: 'pa9', name: 'Aula de Culinária', price: 120, duration: 3, rating: 4.8, childFriendly: false, location: 'Le Marais', tags: ['gastro'], intensity: 'medium' },
      { id: 'pa10', name: 'Show Moulin Rouge', price: 185, duration: 2, rating: 4.6, childFriendly: false, location: 'Pigalle', tags: ['nightlife'], intensity: 'light' },
      { id: 'pa11', name: 'Sainte-Chapelle', price: 45, duration: 1, rating: 4.7, childFriendly: true, location: 'Île de la Cité', tags: ['culture', 'history'], intensity: 'light' },
      { id: 'pa12', name: 'Galeries Lafayette', price: 0, duration: 3, rating: 4.4, childFriendly: true, location: 'Haussmann', tags: ['shopping', 'free'], intensity: 'medium' },
    ]
  },
  'Nova York, EUA': {
    continent: 'América do Norte', image: '🗽', tags: ['culture', 'luxury', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200',
    tip: 'CityPass NYC economiza até 40% nas atrações principais!',
    flights: [
      { id: 'nf1', name: 'American Airlines - Direto', price: 3800, duration: '10h', rating: 4.5, airline: 'American' },
      { id: 'nf2', name: 'Delta - Direto', price: 4100, duration: '10h', rating: 4.6, airline: 'Delta' },
      { id: 'nf3', name: 'LATAM via Miami', price: 2950, duration: '14h', rating: 4.3, airline: 'LATAM' },
      { id: 'nf4', name: 'Copa via Panamá', price: 2650, duration: '13h', rating: 4.2, airline: 'Copa' },
    ],
    hotels: [
      { id: 'nh1', name: 'The Plaza', stars: 5, price: 4500, location: 'Central Park', rating: 4.9 },
      { id: 'nh2', name: 'The Standard High Line', stars: 5, price: 2200, location: 'Meatpacking', rating: 4.7 },
      { id: 'nh3', name: 'citizenM Times Square', stars: 4, price: 720, location: 'Times Square', rating: 4.5 },
      { id: 'nh4', name: 'Pod 51', stars: 3, price: 350, location: 'Midtown', rating: 4.2 },
      { id: 'nh5', name: 'HI NYC Hostel', stars: 2, price: 140, location: 'Upper West', rating: 4.0 },
    ],
    restaurants: [
      { id: 'nr1', name: 'Eleven Madison Park', price: 1200, cuisine: 'Fine Dining', rating: 4.9, tags: ['gastro', 'luxury'] },
      { id: 'nr2', name: 'Katzs Deli', price: 65, cuisine: 'Deli Clássica', rating: 4.7, tags: ['culture', 'budget'] },
      { id: 'nr3', name: 'Joes Pizza', price: 25, cuisine: 'Pizza NY', rating: 4.6, tags: ['budget', 'family'] },
      { id: 'nr4', name: 'Le Bernardin', price: 450, cuisine: 'Frutos do Mar', rating: 4.9, tags: ['gastro', 'luxury'] },
    ],
    activities: [
      { id: 'na1', name: 'Empire State Building', price: 180, duration: 2, rating: 4.7, childFriendly: true, location: '5th Avenue', tags: ['landmark', 'scenic'], intensity: 'light' },
      { id: 'na2', name: 'Estátua da Liberdade', price: 145, duration: 5, rating: 4.8, childFriendly: true, location: 'Liberty Island', tags: ['landmark', 'history'], intensity: 'medium' },
      { id: 'na3', name: 'Broadway Show', price: 380, duration: 3, rating: 4.9, childFriendly: true, location: 'Theater District', tags: ['culture', 'nightlife'], intensity: 'light' },
      { id: 'na4', name: 'MoMA', price: 125, duration: 3, rating: 4.8, childFriendly: true, location: 'Midtown', tags: ['culture', 'art'], intensity: 'medium' },
      { id: 'na5', name: 'Central Park Bike', price: 65, duration: 2, rating: 4.6, childFriendly: true, location: 'Central Park', tags: ['adventure', 'nature', 'family'], intensity: 'medium' },
      { id: 'na6', name: 'Top of the Rock', price: 165, duration: 1.5, rating: 4.7, childFriendly: true, location: 'Rockefeller', tags: ['landmark', 'scenic'], intensity: 'light' },
      { id: 'na7', name: '9/11 Memorial', price: 95, duration: 3, rating: 4.9, childFriendly: true, location: 'Lower Manhattan', tags: ['history', 'culture'], intensity: 'medium' },
      { id: 'na8', name: 'Brooklyn Bridge Walk', price: 0, duration: 2, rating: 4.5, childFriendly: true, location: 'Brooklyn Bridge', tags: ['free', 'scenic', 'romantic'], intensity: 'medium' },
      { id: 'na9', name: 'High Line Park', price: 0, duration: 2, rating: 4.7, childFriendly: true, location: 'Chelsea', tags: ['free', 'nature', 'relaxation'], intensity: 'light' },
      { id: 'na10', name: 'Chelsea Market', price: 0, duration: 2, rating: 4.6, childFriendly: true, location: 'Chelsea', tags: ['gastro', 'shopping', 'free'], intensity: 'light' },
      { id: 'na11', name: 'SUMMIT One Vanderbilt', price: 195, duration: 1.5, rating: 4.8, childFriendly: true, location: 'Midtown', tags: ['landmark', 'scenic'], intensity: 'light' },
      { id: 'na12', name: 'Outlet Woodbury', price: 85, duration: 8, rating: 4.5, childFriendly: true, location: 'Woodbury', tags: ['shopping'], intensity: 'heavy' },
    ]
  },
  'Miami, EUA': {
    continent: 'América do Norte', image: '🌴', tags: ['beach', 'luxury', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1200',
    tip: 'Alugue carro para explorar as Keys e Everglades!',
    flights: [
      { id: 'mf1', name: 'American Airlines - Direto', price: 2850, duration: '8h', rating: 4.5, airline: 'American' },
      { id: 'mf2', name: 'LATAM - Direto', price: 2450, duration: '8h', rating: 4.4, airline: 'LATAM' },
      { id: 'mf3', name: 'GOL - Direto', price: 2250, duration: '8h30', rating: 4.2, airline: 'GOL' },
      { id: 'mf4', name: 'Azul via Orlando', price: 2050, duration: '11h', rating: 4.1, airline: 'Azul' },
    ],
    hotels: [
      { id: 'mh1', name: 'Faena Miami Beach', stars: 5, price: 2800, location: 'Mid-Beach', rating: 4.9 },
      { id: 'mh2', name: 'The Setai', stars: 5, price: 2400, location: 'South Beach', rating: 4.8 },
      { id: 'mh3', name: 'Fontainebleau', stars: 5, price: 1200, location: 'Mid-Beach', rating: 4.6 },
      { id: 'mh4', name: 'Hyatt Centric', stars: 4, price: 750, location: 'South Beach', rating: 4.5 },
      { id: 'mh5', name: 'Freehand Miami', stars: 3, price: 320, location: 'Miami Beach', rating: 4.4 },
      { id: 'mh6', name: 'Generator Miami', stars: 2, price: 140, location: 'South Beach', rating: 4.1 },
    ],
    restaurants: [
      { id: 'mr1', name: 'Zuma', price: 350, cuisine: 'Japonesa', rating: 4.8, tags: ['gastro', 'luxury'] },
      { id: 'mr2', name: 'Joes Stone Crab', price: 220, cuisine: 'Frutos do Mar', rating: 4.7, tags: ['gastro'] },
      { id: 'mr3', name: 'Versailles', price: 45, cuisine: 'Cubana', rating: 4.6, tags: ['culture', 'budget'] },
      { id: 'mr4', name: 'Juvia', price: 180, cuisine: 'Fusion', rating: 4.7, tags: ['gastro', 'romantic'] },
    ],
    activities: [
      { id: 'ma1', name: 'South Beach', price: 0, duration: 4, rating: 4.7, childFriendly: true, location: 'South Beach', tags: ['beach', 'free', 'relaxation'], intensity: 'light' },
      { id: 'ma2', name: 'Art Deco Tour', price: 45, duration: 2, rating: 4.5, childFriendly: true, location: 'Ocean Drive', tags: ['culture', 'history'], intensity: 'medium' },
      { id: 'ma3', name: 'Everglades Tour', price: 95, duration: 4, rating: 4.6, childFriendly: true, location: 'Everglades', tags: ['adventure', 'nature', 'family', 'kids'], intensity: 'medium' },
      { id: 'ma4', name: 'Wynwood Walls', price: 0, duration: 2, rating: 4.7, childFriendly: true, location: 'Wynwood', tags: ['art', 'free', 'culture'], intensity: 'light' },
      { id: 'ma5', name: 'Vizcaya Museum', price: 65, duration: 3, rating: 4.6, childFriendly: true, location: 'Coconut Grove', tags: ['culture', 'history', 'romantic'], intensity: 'medium' },
      { id: 'ma6', name: 'Little Havana Tour', price: 75, duration: 3, rating: 4.7, childFriendly: true, location: 'Little Havana', tags: ['gastro', 'culture'], intensity: 'medium' },
      { id: 'ma7', name: 'Jet Ski South Beach', price: 120, duration: 1, rating: 4.5, childFriendly: false, location: 'South Beach', tags: ['adventure', 'beach'], intensity: 'medium' },
      { id: 'ma8', name: 'Key West Day Trip', price: 195, duration: 14, rating: 4.7, childFriendly: true, location: 'Key West', tags: ['scenic', 'beach', 'adventure'], intensity: 'heavy' },
      { id: 'ma9', name: 'Sawgrass Mills Outlet', price: 0, duration: 5, rating: 4.4, childFriendly: true, location: 'Sunrise', tags: ['shopping', 'free'], intensity: 'medium' },
      { id: 'ma10', name: 'Miami Seaquarium', price: 85, duration: 4, rating: 4.3, childFriendly: true, location: 'Key Biscayne', tags: ['family', 'kids'], intensity: 'medium' },
    ]
  },
  'Tóquio, Japão': {
    continent: 'Ásia', image: '🗾', tags: ['culture', 'gastro', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
    tip: 'JR Pass de 7 dias é essencial! Compre antes de embarcar.',
    flights: [
      { id: 'tf1', name: 'ANA via Houston', price: 5800, duration: '24h', rating: 4.8, airline: 'ANA' },
      { id: 'tf2', name: 'Emirates via Dubai', price: 4650, duration: '28h', rating: 4.6, airline: 'Emirates' },
      { id: 'tf3', name: 'Qatar via Doha', price: 4350, duration: '30h', rating: 4.5, airline: 'Qatar' },
    ],
    hotels: [
      { id: 'th1', name: 'Park Hyatt Tokyo', stars: 5, price: 3200, location: 'Shinjuku', rating: 4.8 },
      { id: 'th2', name: 'Hotel Gracery', stars: 4, price: 650, location: 'Shinjuku', rating: 4.5 },
      { id: 'th3', name: 'Shinjuku Granbell', stars: 4, price: 520, location: 'Shinjuku', rating: 4.4 },
      { id: 'th4', name: 'Khaosan Tokyo', stars: 2, price: 110, location: 'Asakusa', rating: 4.1 },
    ],
    restaurants: [
      { id: 'tr1', name: 'Sukiyabashi Jiro', price: 1800, cuisine: 'Sushi Omakase', rating: 4.9, tags: ['gastro', 'luxury'] },
      { id: 'tr2', name: 'Ichiran Ramen', price: 45, cuisine: 'Ramen', rating: 4.7, tags: ['budget', 'gastro'] },
      { id: 'tr3', name: 'Tsukiji Outer Market', price: 75, cuisine: 'Frutos do Mar', rating: 4.8, tags: ['gastro', 'culture'] },
      { id: 'tr4', name: 'Gonpachi', price: 95, cuisine: 'Izakaya', rating: 4.6, tags: ['gastro', 'culture'] },
    ],
    activities: [
      { id: 'ta1', name: 'Tokyo Skytree', price: 95, duration: 2, rating: 4.7, childFriendly: true, location: 'Sumida', tags: ['landmark', 'scenic'], intensity: 'light' },
      { id: 'ta2', name: 'Templo Senso-ji', price: 0, duration: 2, rating: 4.8, childFriendly: true, location: 'Asakusa', tags: ['culture', 'free'], intensity: 'light' },
      { id: 'ta3', name: 'teamLab Planets', price: 165, duration: 2.5, rating: 4.9, childFriendly: true, location: 'Toyosu', tags: ['art'], intensity: 'light' },
      { id: 'ta4', name: 'DisneySea Tokyo', price: 320, duration: 10, rating: 4.9, childFriendly: true, location: 'Urayasu', tags: ['family', 'kids'], intensity: 'heavy' },
      { id: 'ta5', name: 'Monte Fuji Day Trip', price: 280, duration: 11, rating: 4.8, childFriendly: true, location: 'Mt. Fuji', tags: ['nature', 'scenic', 'adventure'], intensity: 'heavy' },
      { id: 'ta6', name: 'Shibuya + Harajuku', price: 0, duration: 3, rating: 4.5, childFriendly: true, location: 'Shibuya', tags: ['culture', 'free', 'shopping'], intensity: 'medium' },
      { id: 'ta7', name: 'Akihabara Tour', price: 55, duration: 3, rating: 4.6, childFriendly: true, location: 'Akihabara', tags: ['culture', 'shopping'], intensity: 'medium' },
      { id: 'ta8', name: 'Aula de Sushi', price: 150, duration: 3, rating: 4.8, childFriendly: false, location: 'Tsukiji', tags: ['gastro'], intensity: 'light' },
      { id: 'ta9', name: 'Meiji Shrine', price: 0, duration: 1.5, rating: 4.7, childFriendly: true, location: 'Harajuku', tags: ['culture', 'free', 'relaxation'], intensity: 'light' },
      { id: 'ta10', name: 'Robot Restaurant', price: 85, duration: 2, rating: 4.3, childFriendly: false, location: 'Shinjuku', tags: ['nightlife'], intensity: 'light' },
      { id: 'ta11', name: 'Onsen Experience', price: 65, duration: 2, rating: 4.6, childFriendly: false, location: 'Odaiba', tags: ['relaxation', 'culture'], intensity: 'light' },
    ]
  },
  'Roma, Itália': {
    continent: 'Europa', image: '🏛️', tags: ['culture', 'gastro', 'romantic'],
    coverUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200',
    tip: 'Reserve Coliseu e Vaticano com antecedência! Filas de 3+ horas.',
    flights: [
      { id: 'rf1', name: 'ITA Airways - Direto', price: 3650, duration: '12h', rating: 4.4, airline: 'ITA' },
      { id: 'rf2', name: 'TAP via Lisboa', price: 2750, duration: '15h', rating: 4.2, airline: 'TAP' },
      { id: 'rf3', name: 'Iberia via Madrid', price: 2650, duration: '16h', rating: 4.1, airline: 'Iberia' },
    ],
    hotels: [
      { id: 'rh1', name: 'Hotel de Russie', stars: 5, price: 3200, location: 'Piazza del Popolo', rating: 4.9 },
      { id: 'rh2', name: 'Hotel Artemide', stars: 4, price: 580, location: 'Via Nazionale', rating: 4.5 },
      { id: 'rh3', name: 'Hotel Campo de Fiori', stars: 3, price: 320, location: 'Centro', rating: 4.3 },
      { id: 'rh4', name: 'Generator Rome', stars: 2, price: 120, location: 'Termini', rating: 4.0 },
    ],
    restaurants: [
      { id: 'rr1', name: 'La Pergola', price: 720, cuisine: 'Fine Dining', rating: 4.9, tags: ['gastro', 'luxury'] },
      { id: 'rr2', name: 'Roscioli', price: 120, cuisine: 'Romana', rating: 4.7, tags: ['gastro'] },
      { id: 'rr3', name: 'Da Baffetto', price: 35, cuisine: 'Pizza', rating: 4.6, tags: ['budget', 'family'] },
      { id: 'rr4', name: 'Armando al Pantheon', price: 85, cuisine: 'Trattoria', rating: 4.7, tags: ['gastro', 'culture'] },
    ],
    activities: [
      { id: 'ra1', name: 'Coliseu + Fórum', price: 125, duration: 4, rating: 4.9, childFriendly: true, location: 'Centro', tags: ['history', 'landmark', 'culture'], intensity: 'medium' },
      { id: 'ra2', name: 'Vaticano + Sistina', price: 165, duration: 5, rating: 4.9, childFriendly: true, location: 'Vaticano', tags: ['culture', 'art', 'history'], intensity: 'heavy' },
      { id: 'ra3', name: 'Fontana di Trevi', price: 0, duration: 1, rating: 4.5, childFriendly: true, location: 'Centro', tags: ['landmark', 'romantic', 'free'], intensity: 'light' },
      { id: 'ra4', name: 'Aula de Pasta', price: 85, duration: 3, rating: 4.8, childFriendly: true, location: 'Trastevere', tags: ['gastro'], intensity: 'light' },
      { id: 'ra5', name: 'Villa Borghese', price: 55, duration: 3, rating: 4.7, childFriendly: true, location: 'Villa Borghese', tags: ['art', 'nature', 'relaxation'], intensity: 'medium' },
      { id: 'ra6', name: 'Trastevere Food Tour', price: 75, duration: 3, rating: 4.7, childFriendly: true, location: 'Trastevere', tags: ['gastro', 'culture', 'nightlife'], intensity: 'medium' },
      { id: 'ra7', name: 'Panteão', price: 0, duration: 1, rating: 4.8, childFriendly: true, location: 'Centro', tags: ['history', 'free', 'culture'], intensity: 'light' },
      { id: 'ra8', name: 'Piazza Navona', price: 0, duration: 1, rating: 4.5, childFriendly: true, location: 'Centro', tags: ['free', 'scenic', 'romantic'], intensity: 'light' },
      { id: 'ra9', name: 'Galleria Borghese', price: 65, duration: 2, rating: 4.8, childFriendly: true, location: 'Villa Borghese', tags: ['art', 'culture'], intensity: 'light' },
    ]
  },
  'Dubai, EAU': {
    continent: 'Ásia', image: '🏙️', tags: ['luxury', 'adventure', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
    tip: 'Reserve Burj Khalifa para o pôr do sol! A vista é espetacular.',
    flights: [
      { id: 'df1', name: 'Emirates - Direto', price: 4850, duration: '14h', rating: 4.8, airline: 'Emirates' },
      { id: 'df2', name: 'Qatar via Doha', price: 3650, duration: '18h', rating: 4.6, airline: 'Qatar' },
    ],
    hotels: [
      { id: 'dh1', name: 'Burj Al Arab', stars: 5, price: 7500, location: 'Jumeirah', rating: 4.9 },
      { id: 'dh2', name: 'Atlantis The Palm', stars: 5, price: 2600, location: 'Palm Jumeirah', rating: 4.7 },
      { id: 'dh3', name: 'JW Marriott Marquis', stars: 5, price: 950, location: 'Business Bay', rating: 4.6 },
      { id: 'dh4', name: 'Rove Downtown', stars: 4, price: 480, location: 'Downtown', rating: 4.4 },
    ],
    restaurants: [
      { id: 'dr1', name: 'At.mosphere', price: 550, cuisine: 'Fine Dining', rating: 4.8, tags: ['gastro', 'luxury', 'romantic'] },
      { id: 'dr2', name: 'Pierchic', price: 380, cuisine: 'Frutos do Mar', rating: 4.7, tags: ['gastro', 'romantic'] },
      { id: 'dr3', name: 'Ravi Restaurant', price: 25, cuisine: 'Paquistanesa', rating: 4.6, tags: ['budget', 'culture'] },
    ],
    activities: [
      { id: 'da1', name: 'Burj Khalifa', price: 220, duration: 2, rating: 4.9, childFriendly: true, location: 'Downtown', tags: ['landmark', 'scenic'], intensity: 'light' },
      { id: 'da2', name: 'Desert Safari', price: 165, duration: 6, rating: 4.7, childFriendly: true, location: 'Deserto', tags: ['adventure', 'culture'], intensity: 'heavy' },
      { id: 'da3', name: 'Dubai Mall + Fountain', price: 0, duration: 4, rating: 4.6, childFriendly: true, location: 'Downtown', tags: ['free', 'shopping', 'scenic'], intensity: 'medium' },
      { id: 'da4', name: 'Aquaventure', price: 280, duration: 6, rating: 4.8, childFriendly: true, location: 'Palm Jumeirah', tags: ['family', 'adventure', 'kids'], intensity: 'heavy' },
      { id: 'da5', name: 'Dubai Frame', price: 75, duration: 1.5, rating: 4.5, childFriendly: true, location: 'Zabeel Park', tags: ['landmark', 'scenic'], intensity: 'light' },
      { id: 'da6', name: 'Dhow Creek Cruise', price: 65, duration: 2, rating: 4.4, childFriendly: true, location: 'Dubai Creek', tags: ['scenic', 'romantic'], intensity: 'light' },
      { id: 'da7', name: 'Gold & Spice Souk', price: 0, duration: 2, rating: 4.5, childFriendly: true, location: 'Deira', tags: ['shopping', 'culture', 'free'], intensity: 'medium' },
      { id: 'da8', name: 'Ski Dubai', price: 95, duration: 3, rating: 4.4, childFriendly: true, location: 'Mall of Emirates', tags: ['family', 'adventure', 'kids'], intensity: 'medium' },
    ]
  },
  'Lisboa, Portugal': {
    continent: 'Europa', image: '🇵🇹', tags: ['culture', 'gastro', 'romantic'],
    coverUrl: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200',
    tip: 'Lisboa Card dá transporte ilimitado + museus. Vale muito!',
    flights: [
      { id: 'lf1', name: 'TAP - Direto', price: 2450, duration: '9h', rating: 4.5, airline: 'TAP' },
      { id: 'lf2', name: 'Azul - Direto', price: 2280, duration: '9h', rating: 4.3, airline: 'Azul' },
    ],
    hotels: [
      { id: 'lh1', name: 'Four Seasons Ritz', stars: 5, price: 2200, location: 'Marquês de Pombal', rating: 4.9 },
      { id: 'lh2', name: 'LX Boutique', stars: 4, price: 420, location: 'Cais do Sodré', rating: 4.5 },
      { id: 'lh3', name: 'My Story Rossio', stars: 3, price: 280, location: 'Baixa', rating: 4.3 },
      { id: 'lh4', name: 'Lisboa Central Hostel', stars: 2, price: 85, location: 'Baixa', rating: 4.2 },
    ],
    restaurants: [
      { id: 'lr1', name: 'Belcanto', price: 520, cuisine: 'Fine Dining', rating: 4.9, tags: ['gastro', 'luxury'] },
      { id: 'lr2', name: 'Cervejaria Ramiro', price: 95, cuisine: 'Frutos do Mar', rating: 4.8, tags: ['gastro'] },
      { id: 'lr3', name: 'Time Out Market', price: 55, cuisine: 'Food Hall', rating: 4.6, tags: ['gastro', 'family'] },
      { id: 'lr4', name: 'Pastéis de Belém', price: 18, cuisine: 'Pastelaria', rating: 4.8, tags: ['gastro', 'budget', 'culture'] },
    ],
    activities: [
      { id: 'la1', name: 'Torre de Belém', price: 45, duration: 1.5, rating: 4.6, childFriendly: true, location: 'Belém', tags: ['landmark', 'history'], intensity: 'light' },
      { id: 'la2', name: 'Mosteiro Jerónimos', price: 55, duration: 2, rating: 4.8, childFriendly: true, location: 'Belém', tags: ['history', 'culture'], intensity: 'medium' },
      { id: 'la3', name: 'Elétrico 28', price: 18, duration: 1, rating: 4.5, childFriendly: true, location: 'Alfama', tags: ['scenic', 'culture'], intensity: 'light' },
      { id: 'la4', name: 'Sintra Day Trip', price: 125, duration: 8, rating: 4.9, childFriendly: true, location: 'Sintra', tags: ['nature', 'history', 'romantic'], intensity: 'heavy' },
      { id: 'la5', name: 'Fado Show', price: 75, duration: 2, rating: 4.7, childFriendly: false, location: 'Alfama', tags: ['culture', 'nightlife'], intensity: 'light' },
      { id: 'la6', name: 'Oceanário', price: 55, duration: 3, rating: 4.7, childFriendly: true, location: 'Parque das Nações', tags: ['family', 'kids'], intensity: 'medium' },
      { id: 'la7', name: 'Alfama Walking Tour', price: 25, duration: 2, rating: 4.6, childFriendly: true, location: 'Alfama', tags: ['culture', 'budget'], intensity: 'medium' },
      { id: 'la8', name: 'Miradouro Senhora Monte', price: 0, duration: 1, rating: 4.7, childFriendly: true, location: 'Graça', tags: ['scenic', 'free', 'romantic'], intensity: 'light' },
    ]
  },
  'Maldivas': {
    continent: 'Ásia', image: '🏝️', tags: ['beach', 'romantic', 'luxury'],
    coverUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200',
    tip: 'Melhor época: novembro a abril (estação seca).',
    flights: [
      { id: 'mvf1', name: 'Emirates via Dubai', price: 6200, duration: '22h', rating: 4.7, airline: 'Emirates' },
      { id: 'mvf2', name: 'Qatar via Doha', price: 5800, duration: '24h', rating: 4.6, airline: 'Qatar' },
    ],
    hotels: [
      { id: 'mvh1', name: 'Soneva Fushi', stars: 5, price: 8500, location: 'Baa Atoll', rating: 4.9 },
      { id: 'mvh2', name: 'Conrad Maldives', stars: 5, price: 4500, location: 'Rangali Island', rating: 4.8 },
      { id: 'mvh3', name: 'Anantara Veli', stars: 5, price: 2800, location: 'South Malé', rating: 4.7 },
      { id: 'mvh4', name: 'Centara Ras Fushi', stars: 4, price: 1200, location: 'North Malé', rating: 4.5 },
    ],
    restaurants: [
      { id: 'mvr1', name: 'Ithaa Undersea', price: 950, cuisine: 'Fine Dining Subaquático', rating: 4.9, tags: ['gastro', 'luxury', 'romantic'] },
      { id: 'mvr2', name: 'Resort Dining', price: 180, cuisine: 'Internacional', rating: 4.6, tags: ['gastro'] },
    ],
    activities: [
      { id: 'mva1', name: 'Snorkel com Mantas', price: 180, duration: 3, rating: 4.9, childFriendly: true, location: 'Hanifaru Bay', tags: ['adventure', 'nature', 'beach'], intensity: 'medium' },
      { id: 'mva2', name: 'Mergulho Certificado', price: 250, duration: 4, rating: 4.8, childFriendly: false, location: 'Atoll', tags: ['adventure', 'beach'], intensity: 'heavy' },
      { id: 'mva3', name: 'Sunset Dolphin Cruise', price: 95, duration: 2, rating: 4.7, childFriendly: true, location: 'Oceano Índico', tags: ['romantic', 'scenic', 'relaxation'], intensity: 'light' },
      { id: 'mva4', name: 'Spa Overwater', price: 350, duration: 2, rating: 4.8, childFriendly: false, location: 'Resort', tags: ['relaxation', 'luxury', 'romantic'], intensity: 'light' },
      { id: 'mva5', name: 'Jantar Privado Praia', price: 450, duration: 3, rating: 4.9, childFriendly: false, location: 'Resort', tags: ['romantic', 'gastro', 'luxury'], intensity: 'light' },
      { id: 'mva6', name: 'Kayak no Atoll', price: 45, duration: 2, rating: 4.5, childFriendly: true, location: 'Resort', tags: ['adventure', 'beach'], intensity: 'medium' },
    ]
  },
};

const COMMUNITY_ITINERARIES = [
  { id: 'ci1', title: 'Paris Romântica - Lua de Mel', destination: 'Paris, França', author: { name: 'Marina Silva', avatar: '👩', verified: true }, duration: 7, budget: 35000, travelers: 2, likes: 4521, rating: 4.9, reviews: 412, tags: ['romantic', 'luxury'], highlights: ['Torre Eiffel ao Pôr do Sol', 'Cruzeiro no Sena', 'Jantar Le Cinq'], featured: true, flightId: 'pf1', hotelId: 'ph3', comments: [
    { id: 1, user: 'Ana Costa', avatar: '👩', rating: 5, date: '2025-12-15', text: 'Perfeito para lua de mel! O cruzeiro no Sena ao pôr do sol foi mágico. Recomendo muito!' },
    { id: 2, user: 'Bruno Martins', avatar: '👨', rating: 5, date: '2025-11-28', text: 'Seguimos esse roteiro e foi incrível! As dicas de horário ajudaram muito.' },
    { id: 3, user: 'Carla Dias', avatar: '👩', rating: 4, date: '2025-11-10', text: 'Muito bom! Só achei Versalhes cansativo no mesmo dia da Torre Eiffel.' },
  ]},
  { id: 'ci2', title: 'NYC Cultural - 5 Dias', destination: 'Nova York, EUA', author: { name: 'Juliana Costa', avatar: '👩', verified: true }, duration: 5, budget: 22000, travelers: 2, likes: 5234, rating: 4.8, reviews: 523, tags: ['culture'], highlights: ['Broadway', 'MoMA', 'Central Park'], featured: true, flightId: 'nf3', hotelId: 'nh4', comments: [
    { id: 1, user: 'Pedro Lima', avatar: '👨', rating: 5, date: '2025-12-20', text: 'Broadway é imperdível! Conseguimos ver 2 shows seguindo as dicas.' },
    { id: 2, user: 'Fernanda Rocha', avatar: '👩', rating: 5, date: '2025-12-01', text: 'Roteiro perfeito para quem ama arte e cultura!' },
  ]},
  { id: 'ci3', title: 'Miami Beach Life', destination: 'Miami, EUA', author: { name: 'Camila Andrade', avatar: '👩', verified: true }, duration: 5, budget: 18000, travelers: 2, likes: 3456, rating: 4.7, reviews: 312, tags: ['beach'], highlights: ['South Beach', 'Wynwood', 'Everglades'], featured: true, flightId: 'mf2', hotelId: 'mh4', comments: [
    { id: 1, user: 'Lucas Santos', avatar: '👨', rating: 5, date: '2025-12-18', text: 'South Beach é incrível! Wynwood superou expectativas.' },
    { id: 2, user: 'Mariana Alves', avatar: '👩', rating: 4, date: '2025-11-25', text: 'Muito bom! Everglades é essencial, mas leve repelente!' },
  ]},
  { id: 'ci4', title: 'Tóquio em Família', destination: 'Tóquio, Japão', author: { name: 'Pedro Santos', avatar: '👨', verified: true }, duration: 10, budget: 55000, travelers: 4, likes: 2890, rating: 4.8, reviews: 234, tags: ['family', 'culture'], highlights: ['DisneySea', 'teamLab', 'Senso-ji'], featured: true, flightId: 'tf3', hotelId: 'th2', comments: [
    { id: 1, user: 'Renata Oliveira', avatar: '👩', rating: 5, date: '2025-12-10', text: 'DisneySea é o melhor parque do mundo! Crianças amaram.' },
  ]},
  { id: 'ci5', title: 'Roma Histórica', destination: 'Roma, Itália', author: { name: 'Marcos Oliveira', avatar: '👨', verified: true }, duration: 6, budget: 24000, travelers: 2, likes: 3234, rating: 4.8, reviews: 289, tags: ['culture'], highlights: ['Coliseu VIP', 'Vaticano', 'Trastevere'], featured: true, flightId: 'rf2', hotelId: 'rh2', comments: [
    { id: 1, user: 'Amanda Costa', avatar: '👩', rating: 5, date: '2025-12-05', text: 'Reserve o Vaticano bem cedo! A dica salvou nossa viagem.' },
  ]},
  { id: 'ci6', title: 'Dubai Luxo Extremo', destination: 'Dubai, EAU', author: { name: 'Helena Borges', avatar: '👩', verified: true }, duration: 7, budget: 75000, travelers: 2, likes: 2567, rating: 4.9, reviews: 198, tags: ['luxury'], highlights: ['Burj Khalifa', 'Desert Safari', 'Atlantis'], featured: true, flightId: 'df1', hotelId: 'dh2', comments: [
    { id: 1, user: 'Ricardo Mendes', avatar: '👨', rating: 5, date: '2025-11-30', text: 'Dubai é outro nível! Burj Khalifa no pôr do sol é obrigatório.' },
  ]},
  { id: 'ci7', title: 'Lisboa Pastéis e Fado', destination: 'Lisboa, Portugal', author: { name: 'Antonio Ferreira', avatar: '👨', verified: true }, duration: 5, budget: 15000, travelers: 2, likes: 4123, rating: 4.8, reviews: 389, tags: ['gastro', 'culture'], highlights: ['Pastéis de Belém', 'Fado', 'Sintra'], featured: true, flightId: 'lf2', hotelId: 'lh2', comments: [
    { id: 1, user: 'Sofia Nunes', avatar: '👩', rating: 5, date: '2025-12-12', text: 'Lisboa é acolhedora! Fado em Alfama foi emocionante.' },
  ]},
  { id: 'ci8', title: 'Maldivas Lua de Mel', destination: 'Maldivas', author: { name: 'Carolina Mendes', avatar: '👩', verified: true }, duration: 6, budget: 85000, travelers: 2, likes: 4567, rating: 4.9, reviews: 423, tags: ['romantic', 'luxury', 'beach'], highlights: ['Overwater Villa', 'Jantar na Praia', 'Snorkel'], featured: true, flightId: 'mvf1', hotelId: 'mvh2', comments: [
    { id: 1, user: 'Daniel Rocha', avatar: '👨', rating: 5, date: '2025-12-08', text: 'Melhor viagem da vida! Overwater villa é surreal.' },
  ]},
];

// Helper functions
const formatDate = (dateStr, addDays = 0) => {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + addDays);
  const weekdays = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
  return { 
    weekday: weekdays[d.getDay()], 
    day: d.getDate().toString().padStart(2, '0'), 
    month: (d.getMonth() + 1).toString().padStart(2, '0'),
    full: d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  };
};

const formatTime = (hour) => {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

const getTimeSlotColor = (hour) => {
  if (hour < 12) return { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', label: 'Manhã' };
  if (hour < 18) return { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', label: 'Tarde' };
  return { bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700', label: 'Noite' };
};

// Auth Modal
const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  if (!isOpen) return null;
  const handleSubmit = (e) => { e.preventDefault(); onLogin({ name: formData.name || 'Viajante', email: formData.email, avatar: '👤', joinDate: 'Janeiro 2026' }); onClose(); };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/80 hover:text-white z-10"><X size={20} /></button>
        <div className="p-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-center"><Globe size={48} className="mx-auto mb-3" /><h2 className="text-2xl font-bold">SmartTravel AI</h2></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && <div><label className="text-sm font-medium text-slate-600 block mb-1">Nome</label><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Seu nome" /></div>}
          <div><label className="text-sm font-medium text-slate-600 block mb-1">E-mail</label><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="seu@email.com" required /></div>
          <div><label className="text-sm font-medium text-slate-600 block mb-1">Senha</label><input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="••••••••" required /></div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-xl">{mode === 'login' ? 'Entrar' : 'Criar Conta'}</button>
          <p className="text-center text-sm text-slate-500">{mode === 'login' ? <>Não tem conta? <button type="button" onClick={() => setMode('register')} className="text-teal-600 font-medium">Cadastre-se</button></> : <>Já tem conta? <button type="button" onClick={() => setMode('login')} className="text-teal-600 font-medium">Entrar</button></>}</p>
        </form>
      </div>
    </div>
  );
};

// Community Itinerary Detail Modal
const ItineraryDetailModal = ({ itinerary, isOpen, onClose, onUse }) => {
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  if (!isOpen || !itinerary) return null;
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  const flight = destData?.flights.find(f => f.id === itinerary.flightId);
  const hotel = destData?.hotels.find(h => h.id === itinerary.hotelId);
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header with cover image */}
        <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${destData?.coverUrl})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/30 rounded-full text-white hover:bg-black/50"><X size={20} /></button>
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              {itinerary.featured && <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1"><Crown size={12} /> DESTAQUE</span>}
              {itinerary.tags.map(t => <span key={t} className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">{t}</span>)}
            </div>
            <h2 className="text-2xl font-bold text-white">{itinerary.title}</h2>
            <p className="text-white/80 flex items-center gap-2 mt-1"><MapPin size={14} /> {itinerary.destination}</p>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {/* Author & Stats */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{itinerary.author.avatar}</span>
              <div>
                <p className="font-semibold">{itinerary.author.name} {itinerary.author.verified && <UserCheck size={14} className="inline text-teal-500" />}</p>
                <p className="text-sm text-slate-500">{itinerary.duration} dias • {itinerary.travelers} viajantes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center"><p className="text-2xl font-bold text-teal-600">R$ {(itinerary.budget/1000).toFixed(0)}k</p><p className="text-xs text-slate-500">orçamento</p></div>
              <div className="text-center"><div className="flex items-center gap-1 text-amber-500"><Star size={20} className="fill-amber-500" /><span className="text-xl font-bold">{itinerary.rating}</span></div><p className="text-xs text-slate-500">{itinerary.reviews} reviews</p></div>
            </div>
          </div>
          
          {/* Flight & Hotel */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2"><Plane size={18} /> Voo Recomendado</div>
              <p className="font-bold">{flight?.name}</p>
              <p className="text-sm text-blue-600">{flight?.duration} • R$ {flight?.price.toLocaleString('pt-BR')}/pessoa</p>
            </div>
            <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
              <div className="flex items-center gap-2 text-violet-700 font-semibold mb-2"><Hotel size={18} /> Hotel Recomendado</div>
              <p className="font-bold">{hotel?.name} {'⭐'.repeat(hotel?.stars || 0)}</p>
              <p className="text-sm text-violet-600">{hotel?.location} • R$ {hotel?.price.toLocaleString('pt-BR')}/noite</p>
            </div>
          </div>
          
          {/* Highlights */}
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Sparkles size={18} className="text-amber-500" /> Destaques do Roteiro</h3>
            <div className="flex flex-wrap gap-2">{itinerary.highlights.map((h, i) => <span key={i} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">✨ {h}</span>)}</div>
          </div>
          
          {/* Comments Section */}
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><MessageSquare size={18} className="text-teal-600" /> Avaliações da Comunidade ({itinerary.comments?.length || 0})</h3>
            <div className="space-y-4 mb-4">
              {itinerary.comments?.map(comment => (
                <div key={comment.id} className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2"><span className="text-xl">{comment.avatar}</span><span className="font-medium">{comment.user}</span></div>
                    <div className="flex items-center gap-2"><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < comment.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'} />)}</div><span className="text-xs text-slate-400">{comment.date}</span></div>
                  </div>
                  <p className="text-slate-600">{comment.text}</p>
                </div>
              ))}
            </div>
            
            {/* Add Comment */}
            <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
              <p className="font-semibold text-teal-800 mb-3">Deixe sua avaliação</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-slate-600">Sua nota:</span>
                <div className="flex gap-1">{[1,2,3,4,5].map(n => <button key={n} onClick={() => setUserRating(n)} className="p-1"><Star size={20} className={n <= userRating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'} /></button>)}</div>
              </div>
              <div className="flex gap-2">
                <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Compartilhe sua experiência..." className="flex-1 px-4 py-2 bg-white border border-teal-200 rounded-xl" />
                <button className="px-4 py-2 bg-teal-600 text-white rounded-xl font-medium flex items-center gap-1"><Send size={16} /> Enviar</button>
              </div>
            </div>
          </div>
          
          {/* Use Button */}
          <button onClick={() => { onUse(itinerary); onClose(); }} className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all">
            <Copy size={20} /> Usar Este Roteiro como Base
          </button>
        </div>
      </div>
    </div>
  );
};

// Activity Selector Modal
const ActivitySelectorModal = ({ isOpen, onClose, activities, restaurants, currentItem, onSelect, onRemove, mode }) => {
  const [tab, setTab] = useState('activities');
  const [search, setSearch] = useState('');
  if (!isOpen) return null;
  
  const filtered = (tab === 'activities' ? activities : restaurants).filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.location?.toLowerCase().includes(search.toLowerCase()) ||
    a.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="p-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{mode === 'swap' ? 'Trocar Atividade' : mode === 'add' ? 'Adicionar ao Roteiro' : 'Selecionar'}</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg"><X size={20} /></button>
          </div>
          {currentItem && <p className="text-teal-200 text-sm mt-1">Substituindo: {currentItem.name}</p>}
        </div>
        
        <div className="p-4 border-b">
          <div className="flex gap-2 mb-3">
            <button onClick={() => setTab('activities')} className={`px-4 py-2 rounded-lg font-medium ${tab === 'activities' ? 'bg-teal-600 text-white' : 'bg-slate-100'}`}>🎯 Atividades</button>
            <button onClick={() => setTab('restaurants')} className={`px-4 py-2 rounded-lg font-medium ${tab === 'restaurants' ? 'bg-teal-600 text-white' : 'bg-slate-100'}`}>🍽️ Restaurantes</button>
          </div>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nome, local ou tipo..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl" />
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[50vh] space-y-2">
          {filtered.map(item => (
            <button key={item.id} onClick={() => { onSelect({ ...item, category: tab === 'restaurants' ? 'restaurant' : 'activity' }); onClose(); }} className="w-full p-4 bg-slate-50 hover:bg-teal-50 rounded-xl text-left border border-slate-200 hover:border-teal-300 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.location || item.cuisine} • {item.duration ? `${item.duration}h` : ''}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.price === 0 ? <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full">Gratuito</span> : <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-600 rounded-full">R$ {item.price}</span>}
                    {item.childFriendly && <span className="text-xs px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full">👶 Kids</span>}
                    {item.intensity === 'light' && <span className="text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded-full">Leve</span>}
                    {item.intensity === 'heavy' && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full">Intenso</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500"><Star size={14} className="fill-amber-500" />{item.rating}</div>
              </div>
            </button>
          ))}
        </div>
        
        {currentItem && mode === 'swap' && (
          <div className="p-4 border-t bg-red-50">
            <button onClick={() => { onRemove(); onClose(); }} className="w-full py-3 bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-600">
              <Trash2 size={18} /> Remover do Roteiro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Hotel Selector Modal
const HotelSelectorModal = ({ isOpen, onClose, hotels, currentHotel, onSelect, tripDays }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="p-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white">
          <div className="flex items-center justify-between"><h2 className="text-xl font-bold">Trocar Hotel</h2><button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg"><X size={20} /></button></div>
          {currentHotel && <p className="text-violet-200 text-sm mt-1">Atual: {currentHotel.name}</p>}
        </div>
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-3">
          {hotels.map(hotel => (
            <button key={hotel.id} onClick={() => { onSelect(hotel); onClose(); }} className={`w-full p-4 rounded-xl text-left border-2 transition-all ${hotel.id === currentHotel?.id ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-violet-300 bg-white'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{hotel.name} <span className="text-amber-500">{'⭐'.repeat(hotel.stars)}</span></p>
                  <p className="text-sm text-slate-500">{hotel.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-violet-600">R$ {hotel.price.toLocaleString('pt-BR')}<span className="text-xs text-slate-400">/noite</span></p>
                  <p className="text-xs text-slate-500">Total: R$ {(hotel.price * tripDays).toLocaleString('pt-BR')}</p>
                </div>
              </div>
              {hotel.id === currentHotel?.id && <span className="inline-block mt-2 px-2 py-1 bg-violet-500 text-white text-xs rounded-full">✓ Selecionado</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// AI Insights Panel with Tabs
const AIInsightsPanel = ({ insights, upgrades, downgrades, onAction }) => {
  const [activeTab, setActiveTab] = useState('tips');
  const tabs = [
    { id: 'tips', label: 'Dicas', icon: Lightbulb, items: insights },
    { id: 'upgrades', label: 'Upgrades', icon: ArrowUpCircle, items: upgrades },
    { id: 'downgrades', label: 'Economia', icon: ArrowDownCircle, items: downgrades },
  ];
  const currentItems = tabs.find(t => t.id === activeTab)?.items || [];
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <h3 className="font-bold flex items-center gap-2"><Sparkles size={18} /> Insights da IA</h3>
      </div>
      <div className="flex border-b">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all ${activeTab === tab.id ? 'bg-violet-50 text-violet-700 border-b-2 border-violet-600' : 'text-slate-500 hover:bg-slate-50'}`}>
            <tab.icon size={16} /> {tab.label}
            {tab.items.length > 0 && <span className="px-1.5 py-0.5 bg-violet-100 text-violet-600 text-xs rounded-full">{tab.items.length}</span>}
          </button>
        ))}
      </div>
      <div className="p-4 max-h-80 overflow-y-auto">
        {currentItems.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Sparkles size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">{activeTab === 'upgrades' ? 'Nenhum upgrade disponível com o orçamento atual' : activeTab === 'downgrades' ? 'Você está dentro do orçamento! 🎉' : 'Nenhuma dica no momento'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentItems.map((item, i) => (
              <div key={i} className={`p-4 rounded-xl border-2 ${
                item.type === 'upgrade' ? 'bg-emerald-50 border-emerald-200' : 
                item.type === 'downgrade' ? 'bg-amber-50 border-amber-200' : 
                item.type === 'danger' ? 'bg-red-50 border-red-200' :
                'bg-violet-50 border-violet-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    item.type === 'upgrade' ? 'bg-emerald-100' : 
                    item.type === 'downgrade' ? 'bg-amber-100' : 
                    item.type === 'danger' ? 'bg-red-100' :
                    'bg-violet-100'
                  }`}>
                    {item.type === 'upgrade' ? <ArrowUpCircle size={18} className="text-emerald-600" /> : 
                     item.type === 'downgrade' ? <ArrowDownCircle size={18} className="text-amber-600" /> :
                     item.type === 'danger' ? <AlertTriangle size={18} className="text-red-600" /> :
                     <Lightbulb size={18} className="text-violet-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                    <p className="text-xs text-slate-600 mt-1">{item.message}</p>
                    {item.savings && <p className="text-xs font-bold text-emerald-600 mt-1">💰 Economia: R$ {item.savings.toLocaleString('pt-BR')}</p>}
                    {item.cost && <p className="text-xs font-bold text-violet-600 mt-1">💎 Investimento: +R$ {item.cost.toLocaleString('pt-BR')}</p>}
                    {item.action && <button onClick={() => onAction(item)} className={`mt-3 px-4 py-1.5 text-white text-xs font-semibold rounded-lg ${
                      item.type === 'upgrade' ? 'bg-emerald-500 hover:bg-emerald-600' : 
                      item.type === 'downgrade' ? 'bg-amber-500 hover:bg-amber-600' : 
                      'bg-violet-500 hover:bg-violet-600'
                    }`}>{item.action}</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Calendar Schedule Item
const ScheduleItem = ({ item, onEdit, onRemove, startTime }) => {
  const timeColor = getTimeSlotColor(startTime);
  const endTime = startTime + (item.duration || 1);
  
  return (
    <div className={`relative p-3 rounded-xl border-2 ${timeColor.bg} group hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold ${timeColor.text}`}>{formatTime(startTime)} - {formatTime(endTime)}</span>
            {item.childFriendly && <span className="text-xs bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded">👶</span>}
            {item.intensity === 'light' && <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded">Leve</span>}
          </div>
          <p className="font-bold text-slate-800 text-sm">{item.category === 'restaurant' ? '🍽️' : item.type === 'transfer' ? '🚐' : item.type === 'rest' ? '😴' : '🎯'} {item.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{item.location || item.cuisine}</p>
          <div className="flex items-center gap-2 mt-2">
            {item.price === 0 ? <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full">Gratuito</span> : <span className="text-xs px-2 py-0.5 bg-white text-slate-600 rounded-full shadow-sm">R$ {item.price?.toLocaleString('pt-BR')}</span>}
            {item.duration && <span className="text-xs text-slate-400">{item.duration}h</span>}
          </div>
        </div>
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(item)} className="p-1.5 bg-white rounded-lg shadow hover:shadow-md"><Edit3 size={14} className="text-slate-600" /></button>
          <button onClick={() => onRemove(item)} className="p-1.5 bg-white rounded-lg shadow hover:shadow-md"><Trash2 size={14} className="text-red-500" /></button>
        </div>
      </div>
    </div>
  );
};

// Calendar Day View - The new beautiful calendar interface
const CalendarDayCard = ({ day, dateInfo, items, hotel, flight, isFirst, isLast, origin, destination, onEditItem, onRemoveItem, onAddItem, totalPayingTravelers, arrivalTime, departureTime }) => {
  const [expanded, setExpanded] = useState(true);
  
  // Calculate daily cost
  let dayTotal = hotel?.price || 0;
  items.forEach(item => dayTotal += (item.price || 0));
  if (isFirst && flight) dayTotal += flight.price * totalPayingTravelers;
  if (isLast && flight) dayTotal += flight.price * totalPayingTravelers;
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all">
      {/* Day Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 text-white cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-200 text-xs font-medium">{dateInfo.weekday}</p>
            <p className="text-2xl font-bold">{dateInfo.day}/{dateInfo.month}</p>
          </div>
          <div className="flex items-center gap-2">
            {isFirst && <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">✈️ Chegada</span>}
            {isLast && <span className="px-2 py-1 bg-blue-400 text-blue-900 text-xs font-bold rounded-full">✈️ Partida</span>}
            <span className="font-bold">R$ {dayTotal.toLocaleString('pt-BR')}</span>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 space-y-3">
          {/* Flight Arrival */}
          {isFirst && flight && (
            <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-amber-700">✈️ {arrivalTime || '08:00'} - Chegada</span>
              </div>
              <p className="font-bold text-slate-800 text-sm">{flight.name}</p>
              <p className="text-xs text-slate-500">{origin?.split(' ')[0]} → {destination?.split(',')[0]} • {flight.duration}</p>
              <p className="text-xs text-amber-600 font-medium mt-1">R$ {(flight.price * totalPayingTravelers).toLocaleString('pt-BR')} ({totalPayingTravelers} passageiros)</p>
            </div>
          )}
          
          {/* Hotel */}
          {hotel && (
            <div className="p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1"><span className="text-xs font-bold text-violet-700">🏨 Hospedagem</span></div>
                  <p className="font-bold text-slate-800 text-sm">{hotel.name} {'⭐'.repeat(hotel.stars)}</p>
                  <p className="text-xs text-slate-500">{hotel.location} • R$ {hotel.price.toLocaleString('pt-BR')}/noite</p>
                </div>
                <button onClick={() => onEditItem({ type: 'hotel' })} className="p-2 bg-white rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity"><Edit3 size={14} className="text-violet-600" /></button>
              </div>
            </div>
          )}
          
          {/* Schedule Items */}
          {items.map((item, idx) => (
            <ScheduleItem key={idx} item={item} startTime={item.startTime || (8 + idx * 3)} onEdit={() => onEditItem(item)} onRemove={() => onRemoveItem(day, idx)} />
          ))}
          
          {/* Add Activity Button */}
          <button onClick={() => onAddItem(day)} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-teal-400 hover:text-teal-500 transition-colors flex items-center justify-center gap-2 text-sm">
            <Plus size={18} /> Adicionar Atividade
          </button>
          
          {/* Flight Departure */}
          {isLast && flight && (
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-700">✈️ {departureTime || '22:00'} - Partida</span>
              </div>
              <p className="font-bold text-slate-800 text-sm">{flight.name}</p>
              <p className="text-xs text-slate-500">{destination?.split(',')[0]} → {origin?.split(' ')[0]}</p>
              <p className="text-xs text-blue-600 font-medium mt-1">R$ {(flight.price * totalPayingTravelers).toLocaleString('pt-BR')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Community Card
const CommunityCard = ({ itinerary, onView, onUse, onLike, isLiked }) => {
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
      <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: `url(${destData?.coverUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        {itinerary.featured && <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full"><Crown size={10} className="inline" /> DESTAQUE</div>}
        <button onClick={() => onLike(itinerary.id)} className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center ${isLiked ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'}`}><Heart size={16} className={isLiked ? 'fill-white' : ''} /></button>
        <div className="absolute bottom-2 left-3 right-3"><h3 className="text-white font-bold text-sm leading-tight">{itinerary.title}</h3><p className="text-white/70 text-xs">{itinerary.destination}</p></div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1"><span className="text-lg">{itinerary.author.avatar}</span><span className="text-xs text-slate-600">{itinerary.duration}d • R${(itinerary.budget/1000).toFixed(0)}k</span></div>
          <div className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-500" /><span className="text-xs font-bold">{itinerary.rating}</span></div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onView(itinerary)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 flex items-center justify-center gap-1"><Eye size={14} /> Ver</button>
          <button onClick={() => onUse(itinerary)} className="flex-1 py-2 bg-teal-600 text-white text-xs font-medium rounded-lg hover:bg-teal-700 flex items-center justify-center gap-1"><Copy size={14} /> Usar</button>
        </div>
      </div>
    </div>
  );
};

// Profile Page
const ProfilePage = ({ user, setUser, userProfile, setUserProfile, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(userProfile);
  
  const toggleType = (typeId) => {
    if (!editing) return;
    const current = tempProfile.types || [];
    if (current.includes(typeId)) {
      if (current.length > 1) setTempProfile({...tempProfile, types: current.filter(t => t !== typeId)});
    } else if (current.length < 3) {
      setTempProfile({...tempProfile, types: [...current, typeId]});
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">{user.avatar}</div>
          <div className="flex-1"><h1 className="text-2xl font-bold">{user.name}</h1><p className="text-teal-200">{user.email}</p></div>
          <button onClick={onLogout} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30"><LogOut size={16} /></button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Perfil do Viajante</h2>
          {!editing ? <button onClick={() => { setTempProfile(userProfile); setEditing(true); }} className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-lg font-medium">Editar</button> : <button onClick={() => { setUserProfile(tempProfile); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Salvar</button>}
        </div>
        <h3 className="font-semibold text-slate-700 mb-2">Seus estilos (até 3)</h3>
        <div className="grid grid-cols-4 gap-3 mb-6">{TRAVELER_TYPES.map(type => {
          const isSelected = (tempProfile.types || []).includes(type.id);
          return (<button key={type.id} onClick={() => toggleType(type.id)} disabled={!editing} className={`p-3 rounded-xl border-2 text-center transition-all ${isSelected ? 'border-teal-500 bg-teal-50' : 'border-slate-200'}`}><type.icon size={24} className={isSelected ? 'text-teal-600 mx-auto' : 'text-slate-400 mx-auto'} /><p className="text-xs font-medium mt-1">{type.name}</p></button>);
        })}</div>
        <h3 className="font-semibold text-slate-700 mb-2">Orçamento preferido</h3>
        <div className="grid grid-cols-3 gap-3">{[{ id: 'budget', label: 'Econômico', icon: '💰' }, { id: 'medium', label: 'Médio', icon: '✨' }, { id: 'luxury', label: 'Luxo', icon: '👑' }].map(opt => (<button key={opt.id} onClick={() => editing && setTempProfile({...tempProfile, preferredBudget: opt.id})} disabled={!editing} className={`p-3 rounded-xl border-2 text-center ${tempProfile.preferredBudget === opt.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200'}`}><span className="text-2xl">{opt.icon}</span><p className="font-medium text-sm">{opt.label}</p></button>))}</div>
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({ types: [], interests: [], preferredBudget: 'medium' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [origin, setOrigin] = useState('São Paulo (GRU)');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('2026-04-14');
  const [endDate, setEndDate] = useState('2026-04-20');
  const [departureTime, setDepartureTime] = useState('22:00');
  const [returnTime, setReturnTime] = useState('20:00');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [totalBudget, setTotalBudget] = useState(28000);
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [daySchedule, setDaySchedule] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripPriorities, setTripPriorities] = useState([]);
  const [likedItineraries, setLikedItineraries] = useState([]);
  const [showPriorityPanel, setShowPriorityPanel] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [communityFilter, setCommunityFilter] = useState({ destination: 'all', type: 'all' });
  
  // Modals
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [activityModalMode, setActivityModalMode] = useState('add');
  const [editingItem, setEditingItem] = useState(null);
  const [editingDay, setEditingDay] = useState(null);

  const currentData = destination ? DESTINATIONS_DATABASE[destination] : null;
  const flightInfo = destination ? FLIGHT_DATA[destination] : null;
  const tripDays = useMemo(() => Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))), [startDate, endDate]);
  const payingChildren = useMemo(() => childrenAges.filter(age => age > 2).length, [childrenAges]);
  const totalPayingTravelers = adults + payingChildren;

  // Calculate arrival time and if first day should be light
  const arrivalInfo = useMemo(() => {
    if (!flightInfo || !departureTime) return { arrivalTime: '08:00', isLongFlight: false, jetLagHours: 0 };
    const [depH, depM] = departureTime.split(':').map(Number);
    const depDecimal = depH + depM / 60;
    let arrivalHour = (depDecimal + flightInfo.duration) % 24;
    const isLongFlight = flightInfo.duration > 10;
    return {
      arrivalTime: formatTime(arrivalHour),
      isLongFlight,
      jetLagHours: flightInfo.timezone,
      firstDayStart: Math.max(arrivalHour + 2, 14) // Start activities at least 2h after arrival or after 2pm
    };
  }, [flightInfo, departureTime]);

  // Calculate costs
  const costs = useMemo(() => {
    if (!itineraryGenerated) return { flights: 0, hotels: 0, activities: 0, food: 0, transport: 0, total: 0 };
    const flightCost = (selectedFlight?.price || 0) * totalPayingTravelers * 2;
    const hotelCost = (selectedHotel?.price || 0) * tripDays;
    let activitiesCost = 0, foodCost = 0, transportCost = 0;
    Object.values(daySchedule).forEach(day => { day.forEach(item => { if (item.type === 'transfer') transportCost += (item.price || 0); else if (item.category === 'restaurant') foodCost += (item.price || 0); else activitiesCost += (item.price || 0); }); });
    const total = flightCost + hotelCost + (activitiesCost + foodCost) * totalPayingTravelers + transportCost;
    return { flights: flightCost, hotels: hotelCost, activities: activitiesCost * totalPayingTravelers, food: foodCost * totalPayingTravelers, transport: transportCost, total };
  }, [selectedFlight, selectedHotel, daySchedule, tripDays, totalPayingTravelers, itineraryGenerated]);

  const remaining = totalBudget - costs.total;
  const isOverBudget = remaining < 0;

  // Generate AI Insights, Upgrades, and Downgrades
  const { insights, upgrades, downgrades } = useMemo(() => {
    if (!itineraryGenerated || !currentData) return { insights: [], upgrades: [], downgrades: [] };
    const ins = [], ups = [], downs = [];
    
    // Destination tip
    if (currentData.tip) ins.push({ type: 'tip', title: '💡 Dica Local', message: currentData.tip });
    
    // Jet lag warning
    if (arrivalInfo.isLongFlight) ins.push({ type: 'tip', title: '😴 Jet Lag', message: `Voo longo (${flightInfo?.duration}h) com ${flightInfo?.timezone}h de fuso. Primeiro dia com atividades leves para adaptação.` });
    
    // Profile insights
    const userTypes = userProfile.types || [];
    if (userTypes.includes('beach') && currentData.tags.includes('beach')) ins.push({ type: 'tip', title: '🏖️ Destino de Praia', message: 'Perfeito para seu perfil! Priorizamos atividades de praia no roteiro.' });
    if (children > 0) ins.push({ type: 'tip', title: '👨‍👩‍👧 Viagem em Família', message: `Roteiro otimizado com atividades kids-friendly para suas ${children} crianças.` });
    
    // UPGRADES (when under budget)
    if (remaining > 2000) {
      // Better hotel
      const betterHotel = currentData.hotels.find(h => h.stars > (selectedHotel?.stars || 0) && h.price * tripDays <= remaining + (selectedHotel?.price || 0) * tripDays);
      if (betterHotel && betterHotel.id !== selectedHotel?.id) {
        const extraCost = (betterHotel.price - (selectedHotel?.price || 0)) * tripDays;
        ups.push({ type: 'upgrade', title: `🏨 Upgrade: ${betterHotel.name}`, message: `Hotel ${betterHotel.stars}★ com rating ${betterHotel.rating}. Melhore sua experiência!`, cost: extraCost, action: 'Aplicar Upgrade', actionType: 'upgrade_hotel', targetId: betterHotel.id });
      }
      
      // Premium activities not in schedule
      const scheduledIds = Object.values(daySchedule).flat().map(i => i.id);
      const premiumActs = currentData.activities.filter(a => !scheduledIds.includes(a.id) && a.price > 150 && a.rating >= 4.7);
      premiumActs.slice(0, 2).forEach(act => {
        if (act.price <= remaining) {
          ups.push({ type: 'upgrade', title: `✨ Adicionar: ${act.name}`, message: `${act.duration}h • Rating ${act.rating} • ${act.location}`, cost: act.price, action: 'Adicionar', actionType: 'add_activity', targetId: act.id });
        }
      });
      
      // Better flight
      const betterFlight = currentData.flights.find(f => f.rating > (selectedFlight?.rating || 0) && f.price * totalPayingTravelers * 2 <= remaining + (selectedFlight?.price || 0) * totalPayingTravelers * 2);
      if (betterFlight && betterFlight.id !== selectedFlight?.id) {
        const extraCost = (betterFlight.price - (selectedFlight?.price || 0)) * totalPayingTravelers * 2;
        if (extraCost > 0 && extraCost <= remaining) {
          ups.push({ type: 'upgrade', title: `✈️ Voo Melhor: ${betterFlight.name}`, message: `${betterFlight.duration} • Rating ${betterFlight.rating}`, cost: extraCost, action: 'Trocar Voo', actionType: 'upgrade_flight', targetId: betterFlight.id });
        }
      }
    }
    
    // DOWNGRADES (when over budget)
    if (isOverBudget) {
      ins.push({ type: 'danger', title: '⚠️ Orçamento Excedido', message: `Você está R$ ${Math.abs(remaining).toLocaleString('pt-BR')} acima do limite. Veja sugestões de economia.` });
      
      // Cheaper hotel
      const cheaperHotel = currentData.hotels.filter(h => h.price < (selectedHotel?.price || 0) && h.rating >= 4.0).sort((a, b) => b.rating - a.rating)[0];
      if (cheaperHotel) {
        const savings = ((selectedHotel?.price || 0) - cheaperHotel.price) * tripDays;
        downs.push({ type: 'downgrade', title: `🏨 Trocar para: ${cheaperHotel.name}`, message: `${cheaperHotel.stars}★ • Rating ${cheaperHotel.rating} • Ainda excelente opção!`, savings, action: 'Aplicar', actionType: 'downgrade_hotel', targetId: cheaperHotel.id });
      }
      
      // Cheaper flight
      const cheaperFlight = currentData.flights.filter(f => f.price < (selectedFlight?.price || 0)).sort((a, b) => b.rating - a.rating)[0];
      if (cheaperFlight) {
        const savings = ((selectedFlight?.price || 0) - cheaperFlight.price) * totalPayingTravelers * 2;
        downs.push({ type: 'downgrade', title: `✈️ Trocar voo: ${cheaperFlight.name}`, message: `${cheaperFlight.duration} • Rating ${cheaperFlight.rating}`, savings, action: 'Aplicar', actionType: 'downgrade_flight', targetId: cheaperFlight.id });
      }
      
      // Expensive activities to remove
      const expensiveActs = Object.values(daySchedule).flat().filter(i => i.category === 'activity' && i.price > 100).sort((a, b) => b.price - a.price);
      expensiveActs.slice(0, 2).forEach(act => {
        downs.push({ type: 'downgrade', title: `🎯 Remover: ${act.name}`, message: `Economize e substitua por atividade gratuita`, savings: act.price * totalPayingTravelers, action: 'Remover', actionType: 'remove_activity', targetId: act.id });
      });
    }
    
    return { insights: ins, upgrades: ups, downgrades: downs };
  }, [itineraryGenerated, currentData, userProfile, children, remaining, isOverBudget, selectedHotel, selectedFlight, daySchedule, tripDays, totalPayingTravelers, arrivalInfo, flightInfo]);

  // Handle insight actions
  const handleInsightAction = (insight) => {
    if (!currentData) return;
    switch (insight.actionType) {
      case 'upgrade_hotel':
      case 'downgrade_hotel':
        const hotel = currentData.hotels.find(h => h.id === insight.targetId);
        if (hotel) setSelectedHotel(hotel);
        break;
      case 'upgrade_flight':
      case 'downgrade_flight':
        const flight = currentData.flights.find(f => f.id === insight.targetId);
        if (flight) setSelectedFlight(flight);
        break;
      case 'add_activity':
        const activity = currentData.activities.find(a => a.id === insight.targetId);
        if (activity) {
          // Add to a day with space
          const dayNum = Object.keys(daySchedule).find(d => daySchedule[d].length < 4) || '2';
          setDaySchedule({...daySchedule, [dayNum]: [...(daySchedule[dayNum] || []), { ...activity, category: 'activity', startTime: 14 }]});
        }
        break;
      case 'remove_activity':
        Object.keys(daySchedule).forEach(day => {
          const idx = daySchedule[day].findIndex(i => i.id === insight.targetId);
          if (idx >= 0) {
            const newDay = [...daySchedule[day]];
            newDay.splice(idx, 1);
            setDaySchedule({...daySchedule, [day]: newDay});
          }
        });
        break;
    }
  };

  // Generate Smart Itinerary
  const generateItinerary = () => {
    if (!destination) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const data = DESTINATIONS_DATABASE[destination];
      const budget = { flights: totalBudget * 0.30, hotels: totalBudget * 0.35 };
      
      // Select flight
      const affordableFlights = data.flights.filter(f => f.price * totalPayingTravelers * 2 <= budget.flights);
      const bestFlight = affordableFlights.sort((a, b) => b.rating - a.rating)[0] || data.flights[data.flights.length - 1];
      
      // Select hotel based on profile
      const hotelBudget = budget.hotels / tripDays;
      let targetStars = userProfile.types?.includes('luxury') ? 5 : userProfile.types?.includes('budget') ? 3 : 4;
      const affordableHotels = data.hotels.filter(h => h.price <= hotelBudget && h.stars >= targetStars - 1);
      const bestHotel = affordableHotels.sort((a, b) => b.rating - a.rating)[0] || data.hotels.find(h => h.price <= hotelBudget) || data.hotels[data.hotels.length - 1];
      
      // Score activities
      const scoreActivity = (act) => {
        let score = act.rating * 10;
        const userTypes = userProfile.types || [];
        userTypes.forEach(type => {
          if (type === 'beach' && act.tags?.includes('beach')) score += 25;
          if (type === 'gastro' && act.tags?.includes('gastro')) score += 25;
          if (type === 'culture' && (act.tags?.includes('culture') || act.tags?.includes('history'))) score += 25;
          if (type === 'adventure' && act.tags?.includes('adventure')) score += 25;
          if (type === 'romantic' && act.tags?.includes('romantic')) score += 25;
          if (type === 'family' && act.childFriendly) score += 20;
        });
        tripPriorities.forEach(p => {
          if (p === 'gastronomy' && act.tags?.includes('gastro')) score += 40;
          if (p === 'beaches' && act.tags?.includes('beach')) score += 40;
          if (p === 'culture' && act.tags?.includes('culture')) score += 40;
          if (p === 'adventure' && act.tags?.includes('adventure')) score += 40;
          if (p === 'kids' && act.childFriendly) score += 40;
          if (p === 'relaxation' && act.tags?.includes('relaxation')) score += 40;
          if (p === 'nightlife' && act.tags?.includes('nightlife')) score += 40;
          if (p === 'shopping' && act.tags?.includes('shopping')) score += 40;
        });
        if (children > 0 && !act.childFriendly) score -= 15;
        return score;
      };
      
      const sortedActivities = [...data.activities].sort((a, b) => scoreActivity(b) - scoreActivity(a));
      const restaurants = [...data.restaurants].sort((a, b) => b.rating - a.rating);
      
      // Build schedule
      const schedule = {};
      const usedActivities = new Set();
      let actIdx = 0, restIdx = 0;
      
      for (let d = 1; d <= tripDays; d++) {
        schedule[d] = [];
        let currentTime = 9; // Default start
        
        if (d === 1) {
          // First day: light schedule due to arrival
          currentTime = arrivalInfo.firstDayStart;
          schedule[d].push({ type: 'transfer', name: 'Transfer Aeroporto → Hotel', location: `Aeroporto → ${bestHotel.location}`, price: 150, duration: 1.5, startTime: arrivalInfo.firstDayStart - 2 });
          
          if (arrivalInfo.isLongFlight) {
            schedule[d].push({ type: 'rest', name: 'Descanso - Adaptação ao Fuso', location: 'Hotel', price: 0, duration: 2, startTime: currentTime, intensity: 'light' });
            currentTime += 2;
          }
          
          // Add 1-2 light activities
          const lightActs = sortedActivities.filter(a => a.intensity === 'light' && !usedActivities.has(a.id));
          for (let i = 0; i < (arrivalInfo.isLongFlight ? 1 : 2) && i < lightActs.length; i++) {
            const act = lightActs[i];
            usedActivities.add(act.id);
            schedule[d].push({ ...act, category: 'activity', startTime: currentTime });
            currentTime += act.duration + 0.5;
          }
        } else if (d === tripDays) {
          // Last day: check-out + light activities before flight
          schedule[d].push({ type: 'checkout', name: 'Check-out do Hotel', location: bestHotel.location, price: 0, duration: 1, startTime: 10 });
          currentTime = 11;
          
          // 1-2 activities before departure
          const availableActs = sortedActivities.filter(a => !usedActivities.has(a.id) && a.duration <= 3);
          for (let i = 0; i < 2 && i < availableActs.length && currentTime < 18; i++) {
            const act = availableActs[i];
            usedActivities.add(act.id);
            schedule[d].push({ ...act, category: 'activity', startTime: currentTime });
            currentTime += act.duration + 0.5;
          }
        } else {
          // Regular days: full schedule
          currentTime = 9;
          
          // Morning activity
          const morningAct = sortedActivities.find(a => !usedActivities.has(a.id));
          if (morningAct) {
            usedActivities.add(morningAct.id);
            schedule[d].push({ ...morningAct, category: 'activity', startTime: currentTime });
            currentTime += morningAct.duration + 0.5;
          }
          
          // Lunch
          if (currentTime >= 12 && currentTime <= 14) {
            const lunch = restaurants[restIdx % restaurants.length];
            schedule[d].push({ ...lunch, category: 'restaurant', startTime: 13, duration: 1.5, location: lunch.cuisine });
            restIdx++;
            currentTime = 14.5;
          }
          
          // Afternoon activity
          const afternoonAct = sortedActivities.find(a => !usedActivities.has(a.id));
          if (afternoonAct && currentTime < 17) {
            usedActivities.add(afternoonAct.id);
            schedule[d].push({ ...afternoonAct, category: 'activity', startTime: currentTime });
            currentTime += afternoonAct.duration + 0.5;
          }
          
          // Evening - dinner or night activity
          if (currentTime < 20) {
            const nightAct = sortedActivities.find(a => !usedActivities.has(a.id) && a.tags?.includes('nightlife'));
            if (nightAct && (tripPriorities.includes('nightlife') || userProfile.types?.includes('romantic'))) {
              usedActivities.add(nightAct.id);
              schedule[d].push({ ...nightAct, category: 'activity', startTime: 20 });
            } else {
              const dinner = restaurants[restIdx % restaurants.length];
              schedule[d].push({ ...dinner, category: 'restaurant', startTime: 20, duration: 2, location: dinner.cuisine });
              restIdx++;
            }
          }
        }
      }
      
      setSelectedFlight(bestFlight);
      setSelectedHotel(bestHotel);
      setDaySchedule(schedule);
      setItineraryGenerated(true);
      setIsGenerating(false);
    }, 2500);
  };

  // Use community itinerary
  const useCommunityItinerary = (itinerary) => {
    const data = DESTINATIONS_DATABASE[itinerary.destination];
    if (!data) return;
    setDestination(itinerary.destination);
    setTotalBudget(itinerary.budget);
    const flight = data.flights.find(f => f.id === itinerary.flightId) || data.flights[0];
    const hotel = data.hotels.find(h => h.id === itinerary.hotelId) || data.hotels[0];
    
    // Build schedule
    const schedule = {};
    for (let d = 1; d <= itinerary.duration; d++) {
      schedule[d] = [];
      let currentTime = d === 1 ? 14 : 9;
      
      if (d === 1) schedule[d].push({ type: 'transfer', name: 'Transfer Aeroporto → Hotel', location: `Aeroporto → ${hotel.location}`, price: 150, duration: 1.5, startTime: 12 });
      
      const dayActs = data.activities.slice((d * 2) % data.activities.length, (d * 2) % data.activities.length + 2);
      dayActs.forEach(act => {
        schedule[d].push({ ...act, category: 'activity', startTime: currentTime });
        currentTime += act.duration + 1;
      });
      
      const rest = data.restaurants[d % data.restaurants.length];
      schedule[d].push({ ...rest, category: 'restaurant', startTime: 20, duration: 1.5, location: rest.cuisine });
    }
    
    const today = new Date(); const start = new Date(today); start.setDate(today.getDate() + 30); const end = new Date(start); end.setDate(start.getDate() + itinerary.duration);
    setStartDate(start.toISOString().split('T')[0]); setEndDate(end.toISOString().split('T')[0]);
    setSelectedFlight(flight); setSelectedHotel(hotel); setDaySchedule(schedule); setItineraryGenerated(true); setCurrentView('plan');
  };

  // Edit handlers
  const handleEditItem = (item) => {
    if (item.type === 'hotel') { setShowHotelModal(true); return; }
    setEditingItem(item);
    setActivityModalMode('swap');
    setShowActivityModal(true);
  };
  
  const handleRemoveItem = (day, idx) => {
    const newSchedule = { ...daySchedule };
    newSchedule[day] = [...newSchedule[day]];
    newSchedule[day].splice(idx, 1);
    setDaySchedule(newSchedule);
  };
  
  const handleAddItem = (day) => {
    setEditingDay(day);
    setEditingItem(null);
    setActivityModalMode('add');
    setShowActivityModal(true);
  };
  
  const handleSelectActivity = (activity) => {
    if (activityModalMode === 'add' && editingDay) {
      const newSchedule = { ...daySchedule };
      const dayItems = newSchedule[editingDay] || [];
      const lastTime = dayItems.length > 0 ? (dayItems[dayItems.length - 1].startTime || 9) + (dayItems[dayItems.length - 1].duration || 2) + 0.5 : 9;
      newSchedule[editingDay] = [...dayItems, { ...activity, startTime: lastTime }];
      setDaySchedule(newSchedule);
    } else if (activityModalMode === 'swap' && editingItem) {
      Object.keys(daySchedule).forEach(day => {
        const idx = daySchedule[day].findIndex(i => i.id === editingItem.id);
        if (idx >= 0) {
          const newSchedule = { ...daySchedule };
          newSchedule[day] = [...newSchedule[day]];
          newSchedule[day][idx] = { ...activity, startTime: newSchedule[day][idx].startTime };
          setDaySchedule(newSchedule);
        }
      });
    }
  };

  useEffect(() => { setItineraryGenerated(false); setDaySchedule({}); }, [destination]);
  useEffect(() => { if (children > childrenAges.length) setChildrenAges([...childrenAges, ...Array(children - childrenAges.length).fill(5)]); else if (children < childrenAges.length) setChildrenAges(childrenAges.slice(0, children)); }, [children]);

  const filteredDestinations = useMemo(() => Object.entries(DESTINATIONS_DATABASE).filter(([, data]) => selectedContinent === 'all' || data.continent === selectedContinent), [selectedContinent]);
  const filteredCommunity = useMemo(() => COMMUNITY_ITINERARIES.filter(it => (communityFilter.destination === 'all' || it.destination === communityFilter.destination) && (communityFilter.type === 'all' || it.tags.includes(communityFilter.type))), [communityFilter]);
  const continents = ['all', ...new Set(Object.values(DESTINATIONS_DATABASE).map(d => d.continent))];
  const togglePriority = (id) => { if (tripPriorities.includes(id)) setTripPriorities(tripPriorities.filter(p => p !== id)); else if (tripPriorities.length < 3) setTripPriorities([...tripPriorities, id]); };
  const toggleLike = (id) => { if (likedItineraries.includes(id)) setLikedItineraries(likedItineraries.filter(i => i !== id)); else setLikedItineraries([...likedItineraries, id]); };

  // LANDING VIEW
  if (currentView === 'landing') return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      <header className="p-4"><div className="max-w-7xl mx-auto flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center"><Globe size={24} className="text-white" /></div><span className="text-xl font-bold text-white">SmartTravel AI</span></div>{user ? <button onClick={() => setCurrentView('profile')} className="px-4 py-2 bg-white/10 text-white rounded-lg flex items-center gap-2">{user.avatar} {user.name}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">Entrar</button>}</div></header>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 rounded-full text-teal-300 text-sm mb-6"><Sparkles size={16} /> Powered by AI</div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Viaje <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Inteligente</span></h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">Roteiros personalizados com IA. Considera fuso horário, jet lag, seus interesses e orçamento. {Object.keys(DESTINATIONS_DATABASE).length} destinos disponíveis.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button onClick={() => setCurrentView('plan')} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-teal-500/30"><Sparkles size={20} />Criar Meu Roteiro</button>
          <button onClick={() => setCurrentView('community')} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl flex items-center justify-center gap-2"><Users size={20} />Ver Comunidade</button>
        </div>
        <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-5 text-left"><Clock size={24} className="text-teal-400 mb-2" /><h3 className="font-bold text-white">Horários Inteligentes</h3><p className="text-slate-400 text-sm">Roteiro com horários reais considerando voos e jet lag</p></div>
          <div className="bg-white/5 backdrop-blur rounded-2xl p-5 text-left"><Sliders size={24} className="text-emerald-400 mb-2" /><h3 className="font-bold text-white">100% Customizável</h3><p className="text-slate-400 text-sm">Troque atividades, hotéis e adicione experiências</p></div>
          <div className="bg-white/5 backdrop-blur rounded-2xl p-5 text-left"><ArrowUpCircle size={24} className="text-violet-400 mb-2" /><h3 className="font-bold text-white">Upgrades & Economia</h3><p className="text-slate-400 text-sm">IA sugere upgrades ou economia baseado no orçamento</p></div>
          <div className="bg-white/5 backdrop-blur rounded-2xl p-5 text-left"><MessageSquare size={24} className="text-amber-400 mb-2" /><h3 className="font-bold text-white">Reviews Reais</h3><p className="text-slate-400 text-sm">Veja avaliações da comunidade antes de viajar</p></div>
        </div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
    </div>
  );

  // PROFILE VIEW
  if (currentView === 'profile') {
    if (!user) { setCurrentView('landing'); return null; }
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button onClick={() => setCurrentView('plan')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button></nav></div></header>
        <div className="max-w-7xl mx-auto px-4 py-8"><ProfilePage user={user} setUser={setUser} userProfile={userProfile} setUserProfile={setUserProfile} onLogout={() => { setUser(null); setCurrentView('landing'); }} /></div>
      </div>
    );
  }

  // COMMUNITY VIEW
  if (currentView === 'community') return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button onClick={() => setCurrentView('plan')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button className="text-teal-600 font-medium">Comunidade</button>{user ? <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg">Entrar</button>}</nav></div></header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Roteiros da Comunidade</h1>
        <p className="text-slate-500 mb-6">{COMMUNITY_ITINERARIES.length} roteiros com avaliações reais</p>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-wrap gap-4">
          <select value={communityFilter.destination} onChange={(e) => setCommunityFilter({...communityFilter, destination: e.target.value})} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl"><option value="all">Todos Destinos</option>{Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}</select>
          <select value={communityFilter.type} onChange={(e) => setCommunityFilter({...communityFilter, type: e.target.value})} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl"><option value="all">Todos Tipos</option>{TRAVELER_TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">{filteredCommunity.map(it => <CommunityCard key={it.id} itinerary={it} onView={(i) => { setSelectedItinerary(i); setShowItineraryModal(true); }} onUse={useCommunityItinerary} onLike={toggleLike} isLiked={likedItineraries.includes(it.id)} />)}</div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
      <ItineraryDetailModal itinerary={selectedItinerary} isOpen={showItineraryModal} onClose={() => setShowItineraryModal(false)} onUse={useCommunityItinerary} />
    </div>
  );

  // PLAN VIEW
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button className="text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>{user ? <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg">Entrar</button>}</nav></div></header>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Destination Selection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><MapPin size={20} className="text-teal-600" />Escolha seu Destino</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Saindo de</label><select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium">{BRAZILIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label><div className="px-4 py-3 bg-teal-50 border border-teal-200 rounded-xl font-medium text-teal-700">{destination ? `${DESTINATIONS_DATABASE[destination]?.image} ${destination}` : 'Selecione abaixo ↓'}</div></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">{continents.map(c => <button key={c} onClick={() => setSelectedContinent(c)} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${selectedContinent === c ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{c === 'all' ? '🌍 Todos' : c}</button>)}</div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">{filteredDestinations.map(([name, data]) => (<button key={name} onClick={() => setDestination(name)} className={`relative overflow-hidden rounded-xl h-20 group ${destination === name ? 'ring-2 ring-teal-500 ring-offset-2' : ''}`}><div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform" style={{ backgroundImage: `url(${data.coverUrl})` }} /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-1 left-1"><span className="text-lg">{data.image}</span><p className="text-white text-[10px] font-bold leading-tight">{name.split(',')[0]}</p></div>{destination === name && <div className="absolute top-1 right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center"><Check size={12} className="text-white" /></div>}</button>))}</div>
            </div>

            {/* Trip Configuration */}
            {destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Calendar size={20} className="text-teal-600" />Detalhes da Viagem</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Data Ida</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Horário Partida</label><input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Previsão Chegada</label><div className="px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 font-medium">🛬 {arrivalInfo.arrivalTime} {arrivalInfo.isLongFlight && '(+1 dia)'}</div></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Data Volta</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Horário Volta</label><input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Duração</label><div className="px-3 py-2 bg-teal-50 border border-teal-200 rounded-xl text-sm text-teal-700 font-medium">📅 {tripDays} dias</div></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Adultos</label><input type="number" value={adults} onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))} min="1" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Crianças</label><input type="number" value={children} onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))} min="0" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                </div>
                
                {children > 0 && <div className="mb-4 p-3 bg-pink-50 rounded-xl border border-pink-200"><p className="text-xs font-medium text-pink-700 mb-2">👶 Idades (0-2 anos: voo grátis)</p><div className="flex flex-wrap gap-2">{Array.from({ length: children }, (_, i) => (<select key={i} value={childrenAges[i] || 5} onChange={(e) => { const a = [...childrenAges]; a[i] = parseInt(e.target.value); setChildrenAges(a); }} className="px-2 py-1 bg-white border border-pink-200 rounded-lg text-sm">{Array.from({ length: 18 }, (_, age) => <option key={age} value={age}>{age} anos</option>)}</select>))}</div></div>}
                
                <div className="mb-4"><label className="text-xs font-medium text-slate-500 mb-2 block">Orçamento: R$ {totalBudget.toLocaleString('pt-BR')}</label><input type="range" min="5000" max="150000" step="1000" value={totalBudget} onChange={(e) => setTotalBudget(parseInt(e.target.value))} className="w-full accent-teal-600" /></div>
                
                {/* Priorities */}
                <button onClick={() => setShowPriorityPanel(!showPriorityPanel)} className="w-full p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Sliders size={18} className="text-violet-600" /><span className="font-semibold text-slate-700">Prioridades do Roteiro</span>{tripPriorities.length > 0 && <span className="px-2 py-0.5 bg-violet-600 text-white text-xs rounded-full">{tripPriorities.length}</span>}</div>
                  {showPriorityPanel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {showPriorityPanel && <div className="mb-4 p-4 bg-slate-50 rounded-xl border"><p className="text-xs text-slate-500 mb-3">Escolha até 3 prioridades:</p><div className="grid grid-cols-4 gap-2">{TRIP_PRIORITIES.map(p => (<button key={p.id} onClick={() => togglePriority(p.id)} className={`p-2 rounded-xl text-center transition-all ${tripPriorities.includes(p.id) ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200 hover:border-violet-300'}`}><p.icon size={18} className={tripPriorities.includes(p.id) ? 'mx-auto' : 'mx-auto text-violet-500'} /><p className="text-xs font-medium mt-1">{p.name}</p></button>))}</div></div>}
                
                <button onClick={generateItinerary} disabled={isGenerating} className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-70">
                  {isGenerating ? <><RefreshCw size={20} className="animate-spin" />Gerando Roteiro Inteligente...</> : <><Sparkles size={20} />Gerar Roteiro com IA</>}
                </button>
              </div>
            )}

            {/* Generated Calendar Itinerary */}
            {itineraryGenerated && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Calendar size={22} className="text-teal-600" />Seu Roteiro</h2>
                    <p className="text-slate-500 text-sm">{origin.split(' ')[0]} → {destination} • {tripDays} dias • {adults + children} viajantes</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setItineraryGenerated(false); setDaySchedule({}); }} className="px-3 py-2 text-sm text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 flex items-center gap-1"><RefreshCw size={14} /> Regenerar</button>
                    <button className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1"><Download size={14} /> Exportar PDF</button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: tripDays }, (_, i) => i + 1).map(day => (
                    <CalendarDayCard 
                      key={day} 
                      day={day} 
                      dateInfo={formatDate(startDate, day - 1)} 
                      items={daySchedule[day] || []} 
                      hotel={selectedHotel}
                      flight={selectedFlight}
                      isFirst={day === 1} 
                      isLast={day === tripDays} 
                      origin={origin} 
                      destination={destination} 
                      onEditItem={handleEditItem}
                      onRemoveItem={handleRemoveItem}
                      onAddItem={handleAddItem}
                      totalPayingTravelers={totalPayingTravelers}
                      arrivalTime={arrivalInfo.arrivalTime}
                      departureTime={returnTime}
                    />
                  ))}
                </div>
              </div>
            )}

            {!destination && <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center"><Globe size={64} className="text-teal-200 mx-auto mb-4" /><h3 className="text-xl font-bold text-slate-800 mb-2">Escolha um destino</h3><p className="text-slate-500">Selecione para onde você quer viajar</p></div>}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget */}
            <div className={`bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-5 text-white shadow-xl ${!itineraryGenerated && 'opacity-60'}`}>
              <div className="flex items-center justify-between mb-1"><h3 className="font-semibold">Orçamento</h3><Wallet size={18} /></div>
              <div className="text-2xl font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</div>
              {itineraryGenerated && (<>
                <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isOverBudget ? 'bg-red-500/40' : 'bg-white/20'}`}>{isOverBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{isOverBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString('pt-BR')}` : `Sobra: R$ ${remaining.toLocaleString('pt-BR')}`}</div>
                <div className="mt-3 pt-3 border-t border-white/20 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="opacity-80">✈️ Voos</span><span>R$ {costs.flights.toLocaleString('pt-BR')}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">🏨 Hotel ({tripDays}n)</span><span>R$ {costs.hotels.toLocaleString('pt-BR')}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">🎯 Passeios</span><span>R$ {costs.activities.toLocaleString('pt-BR')}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">🍽️ Alimentação</span><span>R$ {costs.food.toLocaleString('pt-BR')}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">🚐 Transporte</span><span>R$ {costs.transport.toLocaleString('pt-BR')}</span></div>
                  <div className="flex justify-between font-bold pt-2 border-t border-white/20"><span>Total</span><span>R$ {costs.total.toLocaleString('pt-BR')}</span></div>
                </div>
              </>)}
            </div>

            {/* AI Insights */}
            {itineraryGenerated && <AIInsightsPanel insights={insights} upgrades={upgrades} downgrades={downgrades} onAction={handleInsightAction} />}

            {/* Flight & Hotel Selection */}
            {itineraryGenerated && selectedFlight && selectedHotel && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3">Suas Seleções</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="font-semibold text-sm text-blue-800">✈️ {selectedFlight.name}</p>
                    <p className="text-xs text-blue-600">{selectedFlight.duration} • R$ {selectedFlight.price.toLocaleString('pt-BR')}/pessoa</p>
                  </div>
                  <button onClick={() => setShowHotelModal(true)} className="w-full p-3 bg-violet-50 rounded-xl border border-violet-200 text-left hover:bg-violet-100 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-violet-800">🏨 {selectedHotel.name} {'⭐'.repeat(selectedHotel.stars)}</p>
                        <p className="text-xs text-violet-600">{selectedHotel.location} • R$ {selectedHotel.price.toLocaleString('pt-BR')}/noite</p>
                      </div>
                      <Edit3 size={16} className="text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Community Suggestions */}
            {destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Crown size={16} className="text-amber-500" />Top Roteiros - {destination.split(',')[0]}</h3>
                <div className="space-y-2">
                  {COMMUNITY_ITINERARIES.filter(i => i.destination === destination).slice(0, 2).map(it => (
                    <button key={it.id} onClick={() => { setSelectedItinerary(it); setShowItineraryModal(true); }} className="w-full p-3 bg-slate-50 rounded-xl text-left hover:bg-teal-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{it.title}</p>
                          <p className="text-xs text-slate-500">{it.duration}d • R$ {(it.budget/1000).toFixed(0)}k • {it.reviews} reviews</p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500"><Star size={14} className="fill-amber-500" />{it.rating}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
      <ItineraryDetailModal itinerary={selectedItinerary} isOpen={showItineraryModal} onClose={() => setShowItineraryModal(false)} onUse={useCommunityItinerary} />
      <ActivitySelectorModal 
        isOpen={showActivityModal} 
        onClose={() => setShowActivityModal(false)} 
        activities={currentData?.activities || []} 
        restaurants={currentData?.restaurants || []}
        currentItem={editingItem}
        onSelect={handleSelectActivity}
        onRemove={() => { if (editingItem) { Object.keys(daySchedule).forEach(day => { const idx = daySchedule[day].findIndex(i => i.id === editingItem.id); if (idx >= 0) handleRemoveItem(day, idx); }); } }}
        mode={activityModalMode}
      />
      <HotelSelectorModal 
        isOpen={showHotelModal} 
        onClose={() => setShowHotelModal(false)} 
        hotels={currentData?.hotels || []} 
        currentHotel={selectedHotel}
        onSelect={setSelectedHotel}
        tripDays={tripDays}
      />
    </div>
  );
}
