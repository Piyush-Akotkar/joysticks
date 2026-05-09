export interface Package {
  id: number;
  name: string;
  duration: string;
  price: number;
  deposit: number;
  featured: boolean;
  description: string;
  controllers: string;
  extraController: string;
  includedItems: string[];
  imageUrl?: string;
  maxGamesAllowed: number;
}

export interface Game {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
}

export const STATIC_PACKAGES: Package[] = [
  {
    id: 1,
    name: "Weekend Rush",
    duration: "Fri + Sat + Sun",
    price: 1800,
    deposit: 0,
    featured: false,
    description: "Perfect for quick weekend gaming sessions.",
    controllers: "1 Controller Included",
    extraController: "Extra controller ₹200",
    includedItems: [
      "PS5 Console",
      "1 DualSense Controller",
      "2 Pre-installed Games",
      "100+ Games Available",
      "Free Delivery",
    ],
    maxGamesAllowed: 2,
  },
  {
    id: 2,
    name: "Weekend Party Pack",
    duration: "Fri + Sat + Sun",
    price: 2200,
    deposit: 0,
    featured: false,
    description: "Weekend multiplayer bundle for friends & family.",
    controllers: "2 Controllers Included",
    extraController: "Extra controller ₹200",
    includedItems: [
      "PS5 Console",
      "2 DualSense Controllers",
      "5 Pre-installed Games",
      "100+ Games Available",
      "Free Delivery",
    ],
    maxGamesAllowed: 5,
  },
  {
    id: 3,
    name: "Solo Gamer Pass",
    duration: "7 Days",
    price: 3900,
    deposit: 0,
    featured: false,
    description: "Affordable weekly PS5 rental for solo or casual gaming.",
    controllers: "1 Controller Included",
    extraController: "Extra controller ₹200",
    includedItems: [
      "PS5 Console",
      "1 DualSense Controller",
      "2 Pre-installed Games",
      "100+ Games Available",
      "Free Delivery",
    ],
    maxGamesAllowed: 2,
  },
  {
    id: 4,
    name: "Squad Gamer Pass",
    duration: "7 Days",
    price: 4200,
    deposit: 0,
    featured: true,
    description: "Best value for multiplayer gaming and long sessions.",
    controllers: "2 Controllers Included",
    extraController: "Extra controller ₹200",
    includedItems: [
      "PS5 Console",
      "2 DualSense Controllers",
      "5 Pre-installed Games",
      "100+ Games Available",
      "Free Delivery",
    ],
    maxGamesAllowed: 5,
  },
];

export const STATIC_GAMES: Game[] = [
  {
    id: 1,
    title: "Spider-Man 2",
    category: "Action",
    imageUrl:
      "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/2028edeaf4c0b60142550a3d6e024b6009853ceb9f51591e.jpg",
    isAvailable: true,
  },
  {
    id: 2,
    title: "FC 24",
    category: "Sports",
    imageUrl:
      "https://image.api.playstation.com/vulcan/ap/rnd/202408/0817/4248a0d1a669210e5caf5174eda176c7883be2c9089fa106.png",
    isAvailable: true,
  },
  {
    id: 3,
    title: "God of War Ragnarök",
    category: "Action/Adventure",
    imageUrl:
      "https://image.api.playstation.com/vulcan/ap/rnd/202503/2016/9c66234099a4c6dc39a12c4101746f7dc9d87babbca5efe4.jpg",
    isAvailable: true,
  },
  {
    id: 4,
    title: "Call of Duty: MW3",
    category: "Shooter",
    imageUrl:
      "https://image.api.playstation.com/vulcan/ap/rnd/202308/1722/15f4ab1e0fe6a37609b164362a653c0e5bcee98a861d0f10.png",
    isAvailable: true,
  },
  {
    id: 5,
    title: "WWE 2K24",
    category: "Fighting",
    imageUrl:
      "https://image.api.playstation.com/vulcan/ap/rnd/202401/0902/8ef9ab648b8b46461778764d6942c44a1c485abd7879e7ce.png",
    isAvailable: true,
  },
  {
    id: 6,
    title: "Mortal Kombat 11",
    category: "Fighting",
    imageUrl:
      "https://image.api.playstation.com/cdn/UP1018/CUSA11395_00/7OAyqPW3B00cjsIJwoQSm9gaJwJ4mOLTwJFuH5yQFn1L9SNBRoISaTgZTRGjZtAh.png",
    isAvailable: true,
  },
  {
    id: 7,
    title: "Cricket 24",
    category: "Sports",
    imageUrl:
      "https://image.api.playstation.com/vulcan/ap/rnd/202309/2212/54f507a4710284ed98303c7b6e888b07b56c8ec52c4c209e.jpg",
    isAvailable: true,
  },
  {
    id: 8,
    title: "Spider-Man: Miles Morales",
    category: "Action",
    imageUrl:
      "https://image.api.playstation.com/vulcan/ap/rnd/202008/1020/PRfYtTZQsuj3ALrBXGL8MjAH.jpg",
    isAvailable: true,
  },
  {
    id: 9,
    title: "Dirt 5",
    category: "Racing",
    imageUrl:
      "https://image.api.playstation.com/vulcan/img/rnd/202007/2111/AU9y67cQ8s4t6S0Tg2peRQ5s.png",
    isAvailable: true,
  },
  {
    id: 10,
    title: "Grand Tourismo 7",
    category: "Racing",
    imageUrl:
      "https://image.api.playstation.com/vulcan/ap/rnd/202202/2806/xreKEb65CYM6LKfzgiNLFKlV.png",
    isAvailable: true,
  }
];