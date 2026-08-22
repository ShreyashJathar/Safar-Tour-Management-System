export const initialHotels = [
  {
    id: 101,
    name: "The Wana Beachfront Resort & Spa",
    location: "Seminyak, Bali, Indonesia",
    price: 180, // Price per night
    rating: 4.9,
    reviewsCount: 194,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    description: "Nestled along the golden sands of Seminyak Beach, The Wana offers premium private villas and ocean suites. Experience world-class Balinese hospitality, a cliffside infinity pool, and an award-winning organic wellness spa.",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beachfront", "AC"],
    roomTypes: [
      { id: "rm-deluxe", name: "Deluxe Ocean View Room", priceMultiplier: 1.0, description: "King bed, private balcony with sea view, rain shower." },
      { id: "rm-suite", name: "Premium Pool Access Suite", priceMultiplier: 1.5, description: "Direct swim-up pool access, separate lounge, luxury tub." },
      { id: "rm-villa", name: "Private Oceanfront Pool Villa", priceMultiplier: 2.8, description: "Private infinity pool, beach access, butler service." }
    ],
    reviews: [
      { author: "Diana Prince", rating: 5, date: "2026-05-20", comment: "The private villa exceeded expectations. Waking up to the ocean sound was magical." }
    ]
  },
  {
    id: 102,
    name: "Matterhorn Peak Chalet & Spa",
    location: "Zermatt, Switzerland",
    price: 320,
    rating: 4.8,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80",
    description: "An iconic wooden chalet resort situated at the base of the majestic Matterhorn. Features fireplace-warmed timber rooms, a heated outdoor thermal pool, and ski-in/ski-out lockers.",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Bar", "Ski-Access", "Fireplace"],
    roomTypes: [
      { id: "rm-timber", name: "Timber Chalet Room", priceMultiplier: 1.0, description: "Traditional alpine decor, mountain views, fireplace." },
      { id: "rm-matterhorn", name: "Matterhorn Panoramic Suite", priceMultiplier: 1.6, description: "Floor-to-ceiling glass walls facing the Matterhorn peak." }
    ],
    reviews: [
      { author: "Bruce Wayne", rating: 5, date: "2026-02-14", comment: "Outstanding spa facilities. Outdoor pool in the snow is a top-tier experience." }
    ]
  },
  {
    id: 103,
    name: "Aman Plaza Luxury Tower",
    location: "Shinjuku, Tokyo, Japan",
    price: 260,
    rating: 4.9,
    reviewsCount: 242,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    description: "Occupying the top floors of a neon-surrounded skyscraper, Aman Plaza offers minimalist zen suites overlooking the Tokyo Skyline. Enjoy Michelin-starred dining and a central location.",
    amenities: ["WiFi", "Gym", "Restaurant", "SkyBar", "AC", "Concierge"],
    roomTypes: [
      { id: "rm-zen", name: "Zen Skyline Studio", priceMultiplier: 1.0, description: "Futon-style king bed, shoji screens, panoramic skyline view." },
      { id: "rm-emperor", name: "Imperial Skyline Suite", priceMultiplier: 2.0, description: "Deep wooden soaking tub, spacious study, premium views." }
    ],
    reviews: [
      { author: "Peter Parker", rating: 4.8, date: "2026-06-12", comment: "The views from the bath are incredible. Very peaceful sanctuary above busy Tokyo." }
    ]
  },
  {
    id: 104,
    name: "Hotel de L'Opera Bastille",
    location: "Paris, France",
    price: 195,
    rating: 4.7,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    description: "A charming boutique hotel in Paris' historic district, featuring classic French facades, velvet furniture, private balconies, and freshly baked croissants served in the courtyard.",
    amenities: ["WiFi", "Bar", "AC", "Courtyard", "RoomService"],
    roomTypes: [
      { id: "rm-classic", name: "Classic Parisian Room", priceMultiplier: 1.0, description: "Queen bed, courtyard views, antique writing desk." },
      { id: "rm-balcony", name: "Eiffel Balcony Suite", priceMultiplier: 1.6, description: "French doors opening to private balcony with partial Eiffel Tower views." }
    ],
    reviews: [
      { author: "Clark Kent", rating: 5, date: "2026-06-18", comment: "Loved the courtyard breakfast. Strolling to the Seine took less than 10 minutes." }
    ]
  },
  {
    id: 105,
    name: "Misty Valley Tea Estate Resort",
    location: "Munnar, Kerala, India",
    price: 95,
    rating: 4.8,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    description: "A heritage colonial estate hotel situated inside a working cardamom and tea plantation. Wake up above the clouds, hike the surrounding forest trails, and enjoy organic farm-to-table food.",
    amenities: ["WiFi", "Pool", "Restaurant", "Tea-Garden", "Hiking-Trails"],
    roomTypes: [
      { id: "rm-cottage", name: "Garden Tea Cottage", priceMultiplier: 1.0, description: "Private stone cottage facing tea valleys, veranda." },
      { id: "rm-heritage", name: "Colonial Viceroy Suite", priceMultiplier: 1.5, description: "Original teak furniture, fireplace, spacious study room." }
    ],
    reviews: [
      { author: "Tony Stark", rating: 4.7, date: "2026-04-20", comment: "Extremely quiet and peaceful. Tea plucking walk in the morning was refreshing." }
    ]
  },
  {
    id: 106,
    name: "Nilgiri View Heritage Manor",
    location: "Ooty, Tamil Nadu, India",
    price: 85,
    rating: 4.6,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    description: "A beautifully restored 19th-century British manor house, offering cozy fireplace bedrooms, vintage billiards rooms, and English gardens looking down on the Nilgiri Mountain loops.",
    amenities: ["WiFi", "Restaurant", "Fireplace", "Billiards", "Lawn-Tennis"],
    roomTypes: [
      { id: "rm-manor", name: "Heritage Manor Room", priceMultiplier: 1.0, description: "Wood paneling, original fireplace, garden view." },
      { id: "rm-deluxe-manor", name: "Grand Duke Suite", priceMultiplier: 1.4, description: "Bay windows overlooking Ooty valley, separate dining alcove." }
    ],
    reviews: [
      { author: "Steve Rogers", rating: 5, date: "2026-05-11", comment: "Feels like stepping back in time. Extremely well preserved manor with gorgeous gardens." }
    ]
  },
  {
    id: 107,
    name: "Caldera Cliffside Grand Suite",
    location: "Oia, Santorini, Greece",
    price: 240,
    rating: 4.9,
    reviewsCount: 92,
    image: "/assets/travel_greece.png",
    description: "Overhanging the volcanic caldera cliffside, this luxury hotel features signature whitewashed cave suites, individual outdoor heated plunge pools, and open-air dining views.",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Plunge-Pool", "AC", "Caldera-View"],
    roomTypes: [
      { id: "rm-cave", name: "Whitewashed Cave Suite", priceMultiplier: 1.0, description: "Traditional vaulted ceilings, caldera view veranda, private tub." },
      { id: "rm-honeymoon", name: "Infinity Pool Honeymoon Suite", priceMultiplier: 1.8, description: "Heated infinity plunge pool, private butler deck, premium sunset views." }
    ],
    reviews: [
      { author: "Lois Lane", rating: 5, date: "2026-06-25", comment: "Unbelievable service. Eating breakfast on our private caldera deck was sublime." }
    ]
  },
  {
    id: 108,
    name: "Ryokan Hanare Zen Stay",
    location: "Higashiyama, Kyoto, Japan",
    price: 150,
    rating: 4.8,
    reviewsCount: 78,
    image: "/assets/travel_kyoto.png",
    description: "A peaceful sanctuary in Kyoto's historic temple district. Experience futon-style beds, aromatic tatami straw floors, private cedar baths, and multi-course Kaiseki dinners.",
    amenities: ["WiFi", "Tea-Room", "Cedar-Bath", "Zen-Garden", "Restaurant", "AC"],
    roomTypes: [
      { id: "rm-tatami", name: "Classic Tatami Room", priceMultiplier: 1.0, description: "Traditional woven straw mat flooring, Japanese futon, garden view." },
      { id: "rm-hanare", name: "Zen Garden Hanare Villa", priceMultiplier: 1.6, description: "Detached villa facing private rock garden, outdoor cypress wood bath." }
    ],
    reviews: [
      { author: "Bruce Wayne", rating: 4.9, date: "2026-04-18", comment: "Highly recommend the Kaiseki dining. Extremely peaceful rock garden walks." }
    ]
  },
  {
    id: 109,
    name: "Taj Exotica Oceanfront Resort & Villa",
    location: "Benaulim, Goa, India",
    price: 160,
    rating: 4.9,
    reviewsCount: 138,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    description: "Embraced by 56 acres of lush gardens along Benaulim Beach in South Goa, this Mediterranean-style resort offers private plunge-pool villas, an 8-hole golf course, and beachfront seafood dining.",
    amenities: ["WiFi", "Pool", "Spa", "Golf-Course", "Beachfront", "Restaurant", "AC"],
    roomTypes: [
      { id: "rm-goa-deluxe", name: "Garden Villa Room", priceMultiplier: 1.0, description: "Portuguese-style decor, private veranda looking out to coconut palms." },
      { id: "rm-goa-pool-suite", name: "Ocean View Plunge Pool Villa", priceMultiplier: 1.8, description: "Private personal plunge pool, direct beach pathway, butler service." }
    ],
    reviews: [
      { author: "Sunil Chhetri", rating: 5, date: "2026-05-14", comment: "The private plunge pool villa in Goa was magnificent. Sunset from Benaulim beach is unmatched." }
    ]
  }
,
  {
  "id": 110,
  "name": "Taj Lake Palace Floating Heritage Hotel",
  "location": "Lake Pichola, Udaipur, Rajasthan, India",
  "price": 350,
  "rating": 5.0,
  "reviewsCount": 210,
  "image": "https://images.unsplash.com/photo-1609828913637-a0ea24a29a00?auto=format&fit=crop&w=1200&q=80",
  "description": "Floating in the middle of Lake Pichola, this 18th-century white marble royal palace offers grand suites, royal butler service, Jiva spa boats, and panoramic views of City Palace and Aravalli hills.",
  "amenities": [
    "WiFi",
    "Pool",
    "Spa",
    "Boat-Transfer",
    "Butler-Service",
    "Restaurant",
    "AC"
  ],
  "roomTypes": [
    {
      "id": "rm-palace-view",
      "name": "Palace View Luxury Room",
      "priceMultiplier": 1.0,
      "description": "Carved teak bed, marble bathtub, direct view of City Palace over water."
    },
    {
      "id": "rm-royal-suite",
      "name": "Grand Royal Maharani Suite",
      "priceMultiplier": 2.2,
      "description": "Original royal murals, private stained-glass terrace, dedicated butler."
    }
  ],
  "reviews": [
    {
      "author": "Maharaja Yuvraj",
      "rating": 5,
      "date": "2026-05-10",
      "comment": "Arriving by royal boat at sunset was unforgettable. True Indian royal hospitality!"
    }
  ]
},
  {
  "id": 111,
  "name": "BrijRama Palace Heritage Ghat Hotel",
  "location": "Darbhanga Ghat, Varanasi, Uttar Pradesh, India",
  "price": 220,
  "rating": 4.9,
  "reviewsCount": 145,
  "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
  "description": "One of the oldest structures on the sacred Ganges riverbanks, this 200-year-old palace features an ancient glass elevator, traditional Sitar recitals, and private balconies overlooking Ganga Aarti.",
  "amenities": [
    "WiFi",
    "Restaurant",
    "Elevator",
    "Ghat-Facing",
    "Yoga-Deck",
    "AC"
  ],
  "roomTypes": [
    {
      "id": "rm-varanasi-heritage",
      "name": "Ganga Facing Heritage Room",
      "priceMultiplier": 1.0,
      "description": "High stone ceilings, sunrise views over Ganges river, antique decor."
    },
    {
      "id": "rm-varanasi-suite",
      "name": "Maharaja Ganges Suite",
      "priceMultiplier": 1.7,
      "description": "Corner suite with 180-degree panoramic views of sacred ghats."
    }
  ],
  "reviews": [
    {
      "author": "Anand Mahindra",
      "rating": 5,
      "date": "2026-04-12",
      "comment": "Watching the morning sunrise boat procession directly from my bedroom window was transcendent."
    }
  ]
},
  {
  "id": 112,
  "name": "The Grand Dragon Ladakh Resort",
  "location": "Leh, Ladakh, UT, India",
  "price": 190,
  "rating": 4.9,
  "reviewsCount": 120,
  "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
  "description": "The premier 5-star eco-friendly luxury hotel in Leh. Offers solar-heated timber rooms, authentic Ladakhi woodwork, oxygen-equipped suites, and panoramic views of Stok Kangri snow peaks.",
  "amenities": [
    "WiFi",
    "Oxygen-Facility",
    "Solar-Heated",
    "Restaurant",
    "Buffet",
    "AC"
  ],
  "roomTypes": [
    {
      "id": "rm-stok-view",
      "name": "Stok Kangri Mountain View Room",
      "priceMultiplier": 1.0,
      "description": "Large double glazed windows facing snow peaks, oxygen concentrator."
    },
    {
      "id": "rm-ladakh-suite",
      "name": "Heritage Royal Suite",
      "priceMultiplier": 1.6,
      "description": "Hand-painted Rabsal wooden ceilings, private lounge, peak views."
    }
  ],
  "reviews": [
    {
      "author": "Rohan Mehra",
      "rating": 5,
      "date": "2026-06-05",
      "comment": "Great oxygen facility made acclimatization super easy. Best food in Leh!"
    }
  ]
},
  {
  "id": 113,
  "name": "Kumarakom Lake Resort & Heritage Villas",
  "location": "Kumarakom, Kerala, India",
  "price": 240,
  "rating": 4.9,
  "reviewsCount": 160,
  "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
  "description": "An award-winning heritage retreat reconstructed from 16th-century ancestral Kerala homesteads (Illams) set along Vembanad Lake. Features a 250-meter meandering pool and Ayurmana healing center.",
  "amenities": [
    "WiFi",
    "Pool",
    "Spa",
    "Lakeside",
    "Restaurant",
    "Boat-Cruise",
    "AC"
  ],
  "roomTypes": [
    {
      "id": "rm-meandering-pool",
      "name": "Meandering Pool Villa",
      "priceMultiplier": 1.0,
      "description": "Direct swim-up access to the 250m winding pool from your private bedroom deck."
    },
    {
      "id": "rm-lakefront-pool",
      "name": "Private Lakefront Pool Villa",
      "priceMultiplier": 1.9,
      "description": "Private open-air courtyard plunge pool overlooking sunset over Vembanad Lake."
    }
  ],
  "reviews": [
    {
      "author": "Prince Charles",
      "rating": 5,
      "date": "2026-05-18",
      "comment": "Absorbing, peaceful, and authentically Keralite. The Ayurmana spa treatments are superb."
    }
  ]
},
  {
  "id": 114,
  "name": "Ananda in the Himalayas Wellness Resort",
  "location": "Narendra Nagar, Rishikesh, India",
  "price": 380,
  "rating": 5.0,
  "reviewsCount": 180,
  "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
  "description": "Located on a 100-acre Maharaja's Palace estate overlooking the Ganges river valley and Rishikesh town. Renowned globally for luxury Ayurvedic detox, Vedanta philosophy, and organic wellness dining.",
  "amenities": [
    "WiFi",
    "Pool",
    "Ayurveda-Spa",
    "Yoga-Pavilion",
    "Golf-Course",
    "Restaurant"
  ],
  "roomTypes": [
    {
      "id": "rm-palace-view-ananda",
      "name": "Palace View Room",
      "priceMultiplier": 1.0,
      "description": "Private balcony facing Sal forest canopy and Ganges valley."
    },
    {
      "id": "rm-ananda-villa",
      "name": "Viceregal Palace Suite",
      "priceMultiplier": 2.5,
      "description": "Private heated outdoor pool, sauna, and gazebo in royal palace wing."
    }
  ],
  "reviews": [
    {
      "author": "Oprah Winfrey",
      "rating": 5,
      "date": "2026-04-14",
      "comment": "A sanctuary for the soul. The morning yoga pavilion overlooking the mountain valley is heavenly."
    }
  ]
},
  {
  "id": 115,
  "name": "Suryagarh Jaisalmer Luxury Desert Fortress",
  "location": "Sam Road, Jaisalmer, Rajasthan, India",
  "price": 280,
  "rating": 4.9,
  "reviewsCount": 150,
  "image": "https://images.unsplash.com/photo-1579282240050-352db0a14c21?auto=format&fit=crop&w=1200&q=80",
  "description": "A magnificent golden sandstone fortress gateway to the Thar Desert. Features courtyards, peacocks, indoor heated pool, Manganiyar folk music evenings, and desert dune safaris.",
  "amenities": [
    "WiFi",
    "Pool",
    "Spa",
    "Desert-Safari",
    "Folk-Music",
    "Restaurant",
    "AC"
  ],
  "roomTypes": [
    {
      "id": "rm-fortress",
      "name": "Palace Room",
      "priceMultiplier": 1.0,
      "description": "Golden sandstone arches, hand-carved stone Jharokha window seat."
    },
    {
      "id": "rm-haveli-suite",
      "name": "Jaisalmer Haveli Suite",
      "priceMultiplier": 1.8,
      "description": "Private plunge pool, personal butler, expansive desert views."
    }
  ],
  "reviews": [
    {
      "author": "Siddharth Malhotra",
      "rating": 5,
      "date": "2026-03-10",
      "comment": "Suryagarh feels like a real royal fortress. The desert breakfast under the banyan tree was divine."
    }
  ]
},
  {
  "id": 116,
  "name": "The Oberoi Amarvilas Agra",
  "location": "Taj East Gate, Agra, India",
  "price": 420,
  "rating": 5.0,
  "reviewsCount": 230,
  "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  "description": "Situated just 600 meters from the Taj Mahal. Every single room and suite offers uninterrupted, direct views of the ancient marble Taj Mahal monument surrounded by fountains and terraced lawns.",
  "amenities": [
    "WiFi",
    "Pool",
    "Spa",
    "Taj-View",
    "Fine-Dining",
    "Golf-Cart-Transfer",
    "AC"
  ],
  "roomTypes": [
    {
      "id": "rm-premier-taj",
      "name": "Premier Taj View Room",
      "priceMultiplier": 1.0,
      "description": "Floor-to-ceiling windows with direct, unobstructed views of the Taj Mahal."
    },
    {
      "id": "rm-luxury-taj-suite",
      "name": "Luxury Taj View Suite",
      "priceMultiplier": 2.2,
      "description": "Private open-air balcony directly facing the Taj Mahal."
    }
  ],
  "reviews": [
    {
      "author": "Satya Nadella",
      "rating": 5,
      "date": "2026-05-02",
      "comment": "Waking up to the Taj Mahal right from your bed is an experience worth every penny."
    }
  ]
},
  {
  "id": 117,
  "name": "Wildflower Hall An Oberoi Resort Shimla",
  "location": "Mashobra, Shimla, HP, India",
  "price": 310,
  "rating": 4.9,
  "reviewsCount": 175,
  "image": "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=1200&q=80",
  "description": "Perched at 8,250 feet among dense cedar pine forests, the former residence of Lord Kitchener features a famous heated outdoor open-air infinity whirlpool looking down over snow-capped Himalayan peaks.",
  "amenities": [
    "WiFi",
    "Outdoor-Heated-Pool",
    "Spa",
    "Mountain-View",
    "Restaurant",
    "Fireplace"
  ],
  "roomTypes": [
    {
      "id": "rm-mountain-view-shimla",
      "name": "Deluxe Himalayan View Room",
      "priceMultiplier": 1.0,
      "description": "Teak wood floors, rich armchairs, mountain forest views."
    },
    {
      "id": "rm-kitchener-suite",
      "name": "Lord Kitchener Heritage Suite",
      "priceMultiplier": 2.0,
      "description": "Original stone fireplace, private dining room, panoramic snow peak views."
    }
  ],
  "reviews": [
    {
      "author": "Nandan Nilekani",
      "rating": 5,
      "date": "2026-04-18",
      "comment": "The outdoor heated infinity spa pool in sub-zero snow weather is one of life's ultimate pleasures."
    }
  ]
},
  {
  "id": 118,
  "name": "The Khyber Himalayan Resort & Spa Gulmarg",
  "location": "Gulmarg, Kashmir, India",
  "price": 340,
  "rating": 4.9,
  "reviewsCount": 190,
  "image": "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=1200&q=80",
  "description": "Located a short walk from the Gulmarg Gondola ski lifts, this 7-acre luxury timber resort offers heated indoor glass-walled swimming pools looking out on snow-covered Apharwat peaks and pine forests.",
  "amenities": [
    "WiFi",
    "Indoor-Heated-Pool",
    "L'Occitane-Spa",
    "Ski-Storage",
    "Restaurant",
    "Fireplace"
  ],
  "roomTypes": [
    {
      "id": "rm-khyber-deluxe",
      "name": "Premier Apharwat Peak Room",
      "priceMultiplier": 1.0,
      "description": "Rich Kashmiri walnut wood work, floor-to-ceiling windows facing snow slopes."
    },
    {
      "id": "rm-khyber-cottage",
      "name": "Luxury Two-Bedroom Ski Cottage",
      "priceMultiplier": 2.4,
      "description": "Stand-alone timber chalet cottage with fireplace and private balcony."
    }
  ],
  "reviews": [
    {
      "author": "Ranbir Kapoor",
      "rating": 5,
      "date": "2026-01-20",
      "comment": "Khyber is world-class. Swimming in the glass indoor pool while snow falls outside is pure bliss!"
    }
  ]
},
{
  "id": 119,
  "name": "The Taj Mahal Palace & Tower",
  "location": "Colaba, Mumbai, Maharashtra, India",
  "price": 280,
  "rating": 4.96,
  "reviewsCount": 420,
  "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  "description": "India's most iconic luxury heritage landmark overlooking the Gateway of India and Arabian Sea since 1903. Features antique royal staircases, 9 fine-dining restaurants, and the Jiva Spa.",
  "amenities": ["WiFi", "Sea-View", "Pool", "Jiva-Spa", "Butler-Service", "Fine-Dining", "Valet"],
  "roomTypes": [
    { "id": "rm-taj-palace", "name": "Palace Heritage Sea View Room", "priceMultiplier": 1.0, "description": "Original hand-carved furniture, Arabian Sea panorama, 24-hour palace butler." },
    { "id": "rm-taj-grand", "name": "Tata Presidential Suite", "priceMultiplier": 3.5, "description": "Palatial luxury suite with crystal chandeliers, private dining room, and Gateway views." }
  ],
  "reviews": [
    { "author": "Ratan Tata", "rating": 5, "date": "2026-05-10", "comment": "The quintessential symbol of Indian luxury, grace, and hospitality." }
  ]
},
{
  "id": 120,
  "name": "The Oberoi Udaivilas",
  "location": "Lake Pichola, Udaipur, Rajasthan, India",
  "price": 450,
  "rating": 4.98,
  "reviewsCount": 380,
  "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  "description": "Consistently ranked among the best hotels in the world. Built on the 200-year-old hunting grounds of the Maharana of Mewar with domes, hand-painted frescoes, and semi-private moat swimming pools.",
  "amenities": ["WiFi", "Moat-Pool", "Spa", "Lake-Cruises", "Fine-Dining", "Private-Courtyard"],
  "roomTypes": [
    { "id": "rm-oberoi-pool", "name": "Premier Room with Semi-Private Pool", "priceMultiplier": 1.0, "description": "Direct access from room terrace to azure moat swimming pool." },
    { "id": "rm-oberoi-kohinoor", "name": "Kohinoor Royal Suite with Private Pool", "priceMultiplier": 3.0, "description": "Private swimming pool, courtyard fountains, and gold leaf ceilings." }
  ],
  "reviews": [
    { "author": "Ananya Birla", "rating": 5, date: "2026-06-14", comment: "Arriving by private boat on Lake Pichola at sunset felt like stepping into an ancient Indian fairy tale." }
  ]
},
{
  "id": 121,
  "name": "Burj Al Arab Jumeirah",
  "location": "Jumeirah Beach, Dubai, UAE",
  "price": 890,
  "rating": 4.95,
  "reviewsCount": 510,
  "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  "description": "The world's only self-proclaimed 7-star hotel standing on its own artificial island. Features 24-carat gold leaf interiors, duplex suites, Rolls-Royce chauffeur transfers, and an over-water infinity terrace.",
  "amenities": ["WiFi", "Helipad", "Private-Beach", "Talise-Spa", "Rolls-Royce-Chauffeur", "Submarine-Restaurant"],
  "roomTypes": [
    { "id": "rm-burj-duplex", "name": "Deluxe One-Bedroom Duplex Suite", "priceMultiplier": 1.0, "description": "Two-floor 170sqm duplex suite with spiral staircase, Hermès amenities, and sea views." },
    { "id": "rm-burj-royal", "name": "Royal Two-Bedroom Suite", "priceMultiplier": 4.0, "description": "780sqm presidential suite with rotating four-poster canopy bed and private cinema." }
  ],
  "reviews": [
    { "author": "Sheikh Mansoor", "rating": 5, date: "2026-04-12", comment: "Unparalleled extravagance. The attention to detail from the butler service is legendary." }
  ]
},
{
  "id": 122,
  "name": "Soneva Jani Overwater Water Retreat",
  "location": "Medhufaru Island, Noonu Atoll, Maldives",
  "price": 980,
  "rating": 4.99,
  "reviewsCount": 260,
  "image": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
  "description": "A tranquil sanctuary of crystal turquoise lagoons. Featuring oversized multi-story overwater villas with water slides going straight from the upper deck into the Indian Ocean, and retractable roofs for stargazing from bed.",
  "amenities": ["WiFi", "Water-Slide", "Private-Pool", "Retractable-Stargazing-Roof", "Overwater-Cinema", "Spa"],
  "roomTypes": [
    { "id": "rm-soneva-slide", "name": "1-Bedroom Water Retreat with Slide", "priceMultiplier": 1.0, description: "Private pool, lagoon curved slide, catamaran nets, and retractable roof." },
    { "id": "rm-soneva-island", "name": "4-Bedroom Island Water Reserve", "priceMultiplier": 3.8, description: "Massive private estate with gym, wine cellar, slide, and private chef." }
  ],
  "reviews": [
    { "author": "Leonardo DiCaprio", "rating": 5, date: "2026-05-18", comment: "The stargazing retractable roof over the master bed is heaven on earth." }
  ]
},
{
  "id": 123,
  "name": "The Ritz Paris",
  "location": "Place Vendôme, Paris, France",
  "price": 620,
  "rating": 4.93,
  "reviewsCount": 310,
  "image": "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80",
  "description": "The quintessential French grand hotel since 1898. Frequented by Coco Chanel and Ernest Hemingway, featuring gilded Belle Époque salons, a subterranean neoclassical pool, and the iconic Bar Hemingway.",
  "amenities": ["WiFi", "Chanel-Spa", "Indoor-Pool", "Bar-Hemingway", "Michelin-Dining", "Garden-Courtyard"],
  "roomTypes": [
    { "id": "rm-ritz-deluxe", "name": "Grand Deluxe Vendôme Room", "priceMultiplier": 1.0, description: "Belle Époque woodwork, pastel silks, marble bathroom with golden swan taps." },
    { "id": "rm-ritz-chanel", "name": "Coco Chanel Prestige Suite", "priceMultiplier": 3.2, description: "Decorated by Coco Chanel herself with Coromandel lacquers and Place Vendôme views." }
  ],
  "reviews": [
    { "author": "Camille Dupont", "rating": 5, date: "2026-06-22", comment: "Afternoon tea in the Grand Jardin with Madeleines is an unforgettable Paris memory." }
  ]
},
{
  "id": 124,
  "name": "Marina Bay Sands Luxury Suites",
  "location": "10 Bayfront Avenue, Singapore",
  "price": 390,
  "rating": 4.90,
  "reviewsCount": 680,
  "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
  "description": "The world's most famous rooftop infinity pool spanning 150 meters high across three soaring 55-story hotel towers. Features 20 Michelin-starred dining options and immediate access to the Sands SkyPark.",
  "amenities": ["WiFi", "Rooftop-Infinity-Pool", "Casino", "Banyan-Tree-Spa", "SkyPark", "Fitness-Club"],
  "roomTypes": [
    { "id": "rm-mbs-premier", "name": "Premier Sky View King Room", "priceMultiplier": 1.0, description: "Floor-to-ceiling glass looking out on Singapore Gardens by the Bay, pool access included." },
    { "id": "rm-mbs-sands", "name": "Sands Grand Harbour Suite", "priceMultiplier": 2.5, description: "Includes private butler service, jacuzzi tub, and exclusive Club55 lounge access." }
  ],
  "reviews": [
    { "author": "David Beckham", "rating": 5, date: "2026-07-02", comment: "Swimming in the 57th-floor infinity pool at sunset with Singapore skyline lights is unmatched." }
  ]
}
];
