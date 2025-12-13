export interface Auction {
  id: string;
  title: string;
  seller: string;
  sellerAvatar: string;
  image: string;
  category: string;
  currentBid: number;
  startingBid: number;
  bidCount: number;
  viewers: number;
  isLive: boolean;
  endsAt: Date;
  description: string;
}

export const auctions: Auction[] = [
  {
    id: '1',
    title: 'Rare Holographic Charizard Card',
    seller: 'CardKingCollector',
    sellerAvatar: 'https://i.pravatar.cc/150?img=12',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179333076_15e664a1.webp',
    category: 'Trading Cards',
    currentBid: 850,
    startingBid: 500,
    bidCount: 47,
    viewers: 234,
    isLive: true,
    endsAt: new Date(Date.now() + 180000),
    description: 'Mint condition, PSA 10 graded'
  },
  {
    id: '2',
    title: 'Vintage Pokemon Blastoise',
    seller: 'RetroCards',
    sellerAvatar: 'https://i.pravatar.cc/150?img=33',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179334994_b6910dd1.webp',
    category: 'Trading Cards',
    currentBid: 425,
    startingBid: 200,
    bidCount: 28,
    viewers: 156,
    isLive: true,
    endsAt: new Date(Date.now() + 420000),
    description: 'First edition shadowless'
  },
  {
    id: '3',
    title: 'Sealed Magic The Gathering Booster',
    seller: 'MagicMaven',
    sellerAvatar: 'https://i.pravatar.cc/150?img=45',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179336954_fd3655b4.webp',
    category: 'Trading Cards',
    currentBid: 1200,
    startingBid: 800,
    bidCount: 63,
    viewers: 412,
    isLive: true,
    endsAt: new Date(Date.now() + 90000),
    description: 'Alpha edition, never opened'
  },
  {
    id: '4',
    title: 'Air Jordan 1 Retro High OG',
    seller: 'SneakerVault',
    sellerAvatar: 'https://i.pravatar.cc/150?img=22',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179337919_144cd216.webp',
    category: 'Sneakers',
    currentBid: 320,
    startingBid: 180,
    bidCount: 34,
    viewers: 189,
    isLive: true,
    endsAt: new Date(Date.now() + 240000),
    description: 'Size 10.5, deadstock condition'
  },
  {
    id: '5',
    title: 'Nike Dunk Low Premium',
    seller: 'KickzDaily',
    sellerAvatar: 'https://i.pravatar.cc/150?img=56',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179339765_2658dd5d.webp',
    category: 'Sneakers',
    currentBid: 215,
    startingBid: 120,
    bidCount: 19,
    viewers: 98,
    isLive: false,
    endsAt: new Date(Date.now() + 3600000),
    description: 'Brand new with box'
  },
  {
    id: '6',
    title: 'Yeezy Boost 350 V2',
    seller: 'HypeBeast',
    sellerAvatar: 'https://i.pravatar.cc/150?img=67',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179341662_7a335e1c.webp',
    category: 'Sneakers',
    currentBid: 280,
    startingBid: 150,
    bidCount: 41,
    viewers: 267,
    isLive: true,
    endsAt: new Date(Date.now() + 150000),
    description: 'Reflective, size 11'
  },
  {
    id: '7',
    title: 'Rolex Submariner Homage',
    seller: 'LuxuryTimepieces',
    sellerAvatar: 'https://i.pravatar.cc/150?img=8',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179342744_333db006.webp',
    category: 'Jewelry',
    currentBid: 450,
    startingBid: 300,
    bidCount: 22,
    viewers: 145,
    isLive: true,
    endsAt: new Date(Date.now() + 300000),
    description: 'Automatic movement, sapphire crystal'
  },
  {
    id: '8',
    title: 'Vintage Omega Seamaster',
    seller: 'WatchCollector',
    sellerAvatar: 'https://i.pravatar.cc/150?img=19',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179344766_8e09f7b3.webp',
    category: 'Jewelry',
    currentBid: 1850,
    startingBid: 1200,
    bidCount: 78,
    viewers: 523,
    isLive: true,
    endsAt: new Date(Date.now() + 60000),
    description: '1960s authentic, serviced'
  },
  {
    id: '9',
    title: 'TAG Heuer Carrera',
    seller: 'TimeMasters',
    sellerAvatar: 'https://i.pravatar.cc/150?img=31',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179346671_e06862c4.webp',
    category: 'Jewelry',
    currentBid: 980,
    startingBid: 700,
    bidCount: 45,
    viewers: 201,
    isLive: false,
    endsAt: new Date(Date.now() + 7200000),
    description: 'Chronograph, box and papers'
  },
  {
    id: '10',
    title: 'Apple AirPods Max',
    seller: 'TechDeals',
    sellerAvatar: 'https://i.pravatar.cc/150?img=42',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179347588_9baa538d.webp',
    category: 'Electronics',
    currentBid: 385,
    startingBid: 250,
    bidCount: 56,
    viewers: 312,
    isLive: true,
    endsAt: new Date(Date.now() + 210000),
    description: 'Space Gray, like new'
  },
  {
    id: '11',
    title: 'iPhone 15 Pro Max',
    seller: 'GadgetGuru',
    sellerAvatar: 'https://i.pravatar.cc/150?img=53',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179349488_e841d00d.webp',
    category: 'Electronics',
    currentBid: 1050,
    startingBid: 800,
    bidCount: 92,
    viewers: 678,
    isLive: true,
    endsAt: new Date(Date.now() + 120000),
    description: '256GB Titanium, unlocked'
  },
  {
    id: '12',
    title: 'Sony WH-1000XM5',
    seller: 'AudioPhile',
    sellerAvatar: 'https://i.pravatar.cc/150?img=64',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179351555_f2cdb903.webp',
    category: 'Electronics',
    currentBid: 275,
    startingBid: 180,
    bidCount: 38,
    viewers: 167,
    isLive: true,
    endsAt: new Date(Date.now() + 360000),
    description: 'Noise cancelling, sealed box'
  },
  {
    id: '13',
    title: 'Louis Vuitton Neverfull MM',
    seller: 'LuxuryBags',
    sellerAvatar: 'https://i.pravatar.cc/150?img=15',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179352559_38727f82.webp',
    category: 'Fashion',
    currentBid: 1450,
    startingBid: 1000,
    bidCount: 67,
    viewers: 445,
    isLive: true,
    endsAt: new Date(Date.now() + 270000),
    description: 'Authentic, monogram canvas'
  },
  {
    id: '14',
    title: 'Gucci Marmont Bag',
    seller: 'DesignerVault',
    sellerAvatar: 'https://i.pravatar.cc/150?img=26',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179354494_edc6d18d.webp',
    category: 'Fashion',
    currentBid: 890,
    startingBid: 600,
    bidCount: 43,
    viewers: 289,
    isLive: true,
    endsAt: new Date(Date.now() + 195000),
    description: 'Black leather, gold hardware'
  },
  {
    id: '15',
    title: 'Chanel Classic Flap',
    seller: 'ChicBoutique',
    sellerAvatar: 'https://i.pravatar.cc/150?img=37',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179356456_8450582e.webp',
    category: 'Fashion',
    currentBid: 3200,
    startingBid: 2500,
    bidCount: 104,
    viewers: 892,
    isLive: true,
    endsAt: new Date(Date.now() + 45000),
    description: 'Medium, caviar leather'
  },
  {
    id: '16',
    title: 'Star Wars Vintage Action Figure',
    seller: 'NostalgiaToys',
    sellerAvatar: 'https://i.pravatar.cc/150?img=48',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179357506_0eeaade3.webp',
    category: 'Collectibles',
    currentBid: 625,
    startingBid: 400,
    bidCount: 51,
    viewers: 278,
    isLive: true,
    endsAt: new Date(Date.now() + 330000),
    description: 'MOC 1977, AFA graded'
  },
  {
    id: '17',
    title: 'Funko Pop Rare Chase',
    seller: 'PopCollector',
    sellerAvatar: 'https://i.pravatar.cc/150?img=59',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179359515_99f39442.webp',
    category: 'Collectibles',
    currentBid: 185,
    startingBid: 100,
    bidCount: 29,
    viewers: 134,
    isLive: false,
    endsAt: new Date(Date.now() + 5400000),
    description: 'Limited edition 1/6 chase'
  },
  {
    id: '18',
    title: 'Marvel Legends Exclusive',
    seller: 'ActionFigureHub',
    sellerAvatar: 'https://i.pravatar.cc/150?img=70',
    image: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179361422_a787023c.webp',
    category: 'Collectibles',
    currentBid: 95,
    startingBid: 50,
    bidCount: 16,
    viewers: 87,
    isLive: true,
    endsAt: new Date(Date.now() + 480000),
    description: 'Sealed, convention exclusive'
  }
];

export const categories = [
  'All',
  'Trading Cards',
  'Sneakers',
  'Jewelry',
  'Electronics',
  'Fashion',
  'Collectibles'
];
