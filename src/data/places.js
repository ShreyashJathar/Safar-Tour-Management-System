export const initialPlaces = [
  {
    id: 301,
    name: "Eiffel Tower & Summit Pass",
    city: "Paris",
    country: "France",
    category: "Landmarks",
    rating: 4.9,
    reviewsCount: 14200,
    ticketPrice: 38,
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "09:30 AM - 11:45 PM Daily",
    address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
    description: "Experience panoramic views of Paris from the iconic Iron Lady. Choose between stair access to the second floor or elevator access straight to the Gustave Eiffel summit suite.",
    highlights: [
      "360-degree glass summit observatory",
      "Champagne bar at 276 meters altitude",
      "Skip-the-line VIP elevator entry option",
      "Illuminated night light show every hour"
    ],
    ticketTypes: [
      { id: "tk-std", name: "Standard 2nd Floor Elevator Ticket", priceMultiplier: 1.0, description: "Access to 1st & 2nd floor observation decks via elevator." },
      { id: "tk-summit", name: "Summit Direct Access Ticket", priceMultiplier: 1.6, description: "Includes summit elevator pass and access to Gustave Eiffel's private office replica." },
      { id: "tk-vip", name: "VIP Skip-the-Line Summit & Champagne", priceMultiplier: 2.5, description: "Priority elevator entry, dedicated host guide, and complimentary glass of Moët & Chandon champagne." }
    ],
    reviews: [
      { author: "Sophie Martin", rating: 5, date: "2026-06-14", comment: "Breathtaking sunset views! Buying the VIP ticket saved us almost 2 hours of waiting." },
      { author: "Rahul Sharma", rating: 5, date: "2026-05-29", comment: "The summit view of the Seine and Notre Dame is unmatched. Must visit when in Paris." }
    ]
  },
  {
    id: 302,
    name: "Taj Mahal & Fort Heritage Ticket",
    city: "Agra",
    country: "India",
    category: "Historical",
    rating: 4.95,
    reviewsCount: 22400,
    ticketPrice: 15,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "Sunrise to Sunset (Closed Fridays)",
    address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India",
    description: "Marvel at the world's most famous monument of love. Built entirely in white marble by Mughal Emperor Shah Jahan, this UNESCO World Heritage Site sparkles under the morning sun.",
    highlights: [
      "UNESCO World Heritage Site & New 7 Wonder of the World",
      "Intricate marble inlay craftsmanship & reflecting pools",
      "Sunrise & sunset light reflection viewing",
      "Included access to Agra Fort Red Sandstone Citadel"
    ],
    ticketTypes: [
      { id: "tk-taj-std", name: "Foreigner Visitor Outer Grounds Ticket", priceMultiplier: 1.0, description: "Includes shoe covers, water bottle, and access to Taj gardens & museum." },
      { id: "tk-taj-mausoleum", name: "Main Mausoleum & Interior Dome Pass", priceMultiplier: 1.4, description: "Access inside the central marble dome and royal cenotaphs." },
      { id: "tk-taj-guided", name: "Sunrise VIP Fast-Track & Historian Tour", priceMultiplier: 2.2, description: "Priority gate entry at 05:30 AM, certified historian guide, and Agra Fort combo pass." }
    ],
    reviews: [
      { author: "Emily Watson", rating: 5, date: "2026-07-02", comment: "The sunrise view over the Yamuna river was ethereal. Truly deserving of a 7 Wonders status!" },
      { author: "Aarav Patel", rating: 5, date: "2026-06-18", comment: "Very well managed fast-track entry. Guide explained all marble inlay secrets." }
    ]
  },
  {
    id: 303,
    name: "Burj Khalifa At The Top (124th & 125th Floor)",
    city: "Dubai",
    country: "UAE",
    category: "Landmarks",
    rating: 4.8,
    reviewsCount: 18900,
    ticketPrice: 48,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "08:00 AM - 12:00 AM Daily",
    address: "1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE",
    description: "Soar to the top of the world's tallest building at 828 meters. Ride high-speed double-deck elevators up to 10m/s and enjoy sweeping views of Dubai's skyline, Arabian Gulf, and desert dunes.",
    highlights: [
      "World's highest outdoor observation deck",
      "High-speed elevator with interactive projection show",
      "High-powered telescopes with historical time-travel view",
      "Views of Dubai Fountain evening music shows"
    ],
    ticketTypes: [
      { id: "tk-bk-124", name: "At the Top (Level 124 & 125)", priceMultiplier: 1.0, description: "Non-prime hours access to Levels 124 and 125 observation decks." },
      { id: "tk-bk-prime", name: "Sunset Prime Hours Pass (124+125)", priceMultiplier: 1.5, description: "Prime sunset timing slot between 4:00 PM and 6:30 PM." },
      { id: "tk-bk-sky", name: "SKY Level 148 Luxury Lounge Pass", priceMultiplier: 3.2, description: "Access to Level 148 (555m high) with signature refresh drinks, luxury lounge, and fast-track elevator." }
    ],
    reviews: [
      { author: "Michael Chang", rating: 5, date: "2026-07-10", comment: "Unbelievable view! Watching the sunset over Dubai from 124th floor is a bucket list experience." }
    ]
  },
  {
    id: 304,
    name: "Louvre Museum Priority Ticket",
    city: "Paris",
    country: "France",
    category: "Museums",
    rating: 4.85,
    reviewsCount: 16500,
    ticketPrice: 24,
    image: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "09:00 AM - 06:00 PM (Closed Tuesdays, Open till 09:45 PM Fridays)",
    address: "Musée du Louvre, 75001 Paris, France",
    description: "Explore the world's largest art museum housed inside a former royal palace. See Da Vinci's Mona Lisa, Venus de Milo, Winged Victory of Samothrace, and over 35,000 masterpiece artworks.",
    highlights: [
      "Home to Da Vinci's world-famous Mona Lisa",
      "I.M. Pei's iconic glass pyramid entrance",
      "Greek, Etruscan, Roman, and Ancient Egyptian antiquities",
      "Includes 1-year access to digital audio headset guide app"
    ],
    ticketTypes: [
      { id: "tk-louvre-std", name: "Timed Entry E-Ticket", priceMultiplier: 1.0, description: "Guaranteed entry within 30 minutes of scheduled timeslot." },
      { id: "tk-louvre-audio", name: "Timed Entry + Nintendo 3DS Audio Guide", priceMultiplier: 1.4, description: "Includes interactive 3D location-aware audio guide headset." },
      { id: "tk-louvre-master", name: "Masterpieces Guided Small Group Pass", priceMultiplier: 2.8, description: "2.5-hour tour with art history expert highlighting top 10 masterpieces without queues." }
    ],
    reviews: [
      { author: "Elena Rostova", rating: 5, date: "2026-06-25", comment: "The Mona Lisa room was crowded but overall the museum is colossal and magnificent." }
    ]
  },
  {
    id: 305,
    name: "Fushimi Inari Taisha & Kyoto Temple Pass",
    city: "Kyoto",
    country: "Japan",
    category: "Cultural",
    rating: 4.92,
    reviewsCount: 19800,
    ticketPrice: 18,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "Open 24/7 (Shrine grounds and trails)",
    address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto 612-0882, Japan",
    description: "Hike beneath thousands of vibrant vermilion Torii gates stretching across Mount Inari. Dedicated to Shinto god of rice and agriculture Inari, this is Kyoto's most serene spiritual destination.",
    highlights: [
      "Over 10,000 famous Senbon Torii mountain gates",
      "Iconic fox (Kitsune) stone statues guarding sacred trails",
      "Summit view looking across southern Kyoto",
      "Traditional tea ceremony experience at mountain tea house"
    ],
    ticketTypes: [
      { id: "tk-kyoto-std", name: "Temple Grounds & Trail Map Pass", priceMultiplier: 1.0, description: "Access to sacred mountain trail, shrine inner sanctuary, and map brochure." },
      { id: "tk-kyoto-tea", name: "Torii Trail + Traditional Matcha Tea Ceremony", priceMultiplier: 1.8, description: "Includes green tea ceremony with sweet Wagashi in a 200-year-old tea pavilion." },
      { id: "tk-kyoto-kimono", name: "Kimono Rental + Professional Photographer Trail Pass", priceMultiplier: 3.5, description: "Full silk kimono fitting, hair styling, and 1-hour professional portrait session at Torii gates." }
    ],
    reviews: [
      { author: "Kenji Sato", rating: 5, date: "2026-07-15", comment: "Hiked early morning at 6:30 AM before crowds arrived. Magical atmospheric fog and silence." }
    ]
  },
  {
    id: 306,
    name: "Colosseum & Roman Forum Priority Pass",
    city: "Rome",
    country: "Italy",
    category: "Historical",
    rating: 4.88,
    reviewsCount: 2100,
    ticketPrice: 32,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "08:30 AM - 07:15 PM Daily",
    address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
    description: "Step back into Ancient Rome at the world's greatest amphitheater. Walk the arena floor where gladiators fought, explore the subterranean Hypogeum tunnels, and wander Palatine Hill ruins.",
    highlights: [
      "Gladiator arena floor reconstructed stage access",
      "Subterranean Hypogeum cage and trapdoor tour",
      "Includes combined entry to Roman Forum & Palatine Hill",
      "Audio-visual 3D reconstruction app included"
    ],
    ticketTypes: [
      { id: "tk-col-std", name: "Regular Colosseum + Forum 24h Pass", priceMultiplier: 1.0, description: "Standard timed entry to 1st & 2nd tiers of Colosseum and Roman Forum ruins." },
      { id: "tk-col-arena", name: "Gladiator Arena Floor Exclusive Ticket", priceMultiplier: 1.5, description: "Walk directly onto the wooden arena floor through the Libitinarian Gate." },
      { id: "tk-col-underground", name: "VIP Underground Tunnels & Top Tier Pass", priceMultiplier: 2.6, description: "Exclusive restricted access to subterranean tunnels and 3rd level high panoramic tier." }
    ],
    reviews: [
      { author: "Marco Rossi", rating: 5, date: "2026-06-20", comment: "Standing on the arena floor looking up at the tiers gives true shivers. Sensational heritage." }
    ]
  },
  {
    id: 307,
    name: "Walt Disney World Orlando 1-Day Park Pass",
    city: "Orlando",
    country: "USA",
    category: "Theme Parks",
    rating: 4.9,
    reviewsCount: 31200,
    ticketPrice: 119,
    image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1597466599360-3b9775841aec?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "09:00 AM - 10:00 PM Daily",
    address: "Walt Disney World Resort, Orlando, FL 32830, USA",
    description: "Where dreams come true! Select between Magic Kingdom, Epcot, Disney's Hollywood Studios, or Disney's Animal Kingdom. Enjoy world-renowned rides, fireworks, and character meet-and-greets.",
    highlights: [
      "Cinderella Castle night fireworks show",
      "Star Wars: Galaxy's Edge & Rise of the Resistance ride",
      "Avatar Flight of Passage in Pandora World",
      "Disney Genie+ Lightning Lane queue acceleration option"
    ],
    ticketTypes: [
      { id: "tk-disney-1park", name: "1-Park Standard Admission Ticket", priceMultiplier: 1.0, description: "Full day access to 1 theme park of your choice (Magic Kingdom / Epcot / Studios / Animal Kingdom)." },
      { id: "tk-disney-hopper", name: "Park Hopper 2-in-1 Day Pass", priceMultiplier: 1.45, description: "Hop between multiple Disney theme parks after 2:00 PM on the same day." },
      { id: "tk-disney-genie", name: "Park Hopper + Lightning Lane Multi Pass", priceMultiplier: 1.85, description: "Includes priority skip-line access for top 15 mega rides and unlimited Disney PhotoPass." }
    ],
    reviews: [
      { author: "Jessica Miller", rating: 5, date: "2026-07-08", comment: "Star Wars Rise of the Resistance is the greatest theme park ride ever created!" }
    ]
  },
  {
    id: 308,
    name: "Grand Canyon National Park Helicopter Flight",
    city: "Las Vegas / Arizona",
    country: "USA",
    category: "Nature",
    rating: 4.96,
    reviewsCount: 9400,
    ticketPrice: 220,
    image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "06:00 AM - 06:00 PM Flights",
    address: "South Rim Visitor Center & Grand Canyon West Rim, AZ, USA",
    description: "Soar over one of nature's greatest wonders. Take in breathtaking aerial vistas of Colorado River, Kaibab National Forest, and 2 billion years of geological history carved into deep red rock canyons.",
    highlights: [
      "Eco-Star luxury helicopter with 180-degree wrap panoramic windows",
      "Champagne landing on canyon floor 4,000 feet below rim",
      "Walk the transparent glass Grand Canyon Skywalk bridge",
      "Includes hotel shuttle pickup from Las Vegas Strip"
    ],
    ticketTypes: [
      { id: "tk-gc-rim", name: "South Rim Express Helicopter Flight (30 min)", priceMultiplier: 1.0, description: "Scenic aerial loop over Dragon Corridor and Painted Desert." },
      { id: "tk-gc-landing", name: "Grand Canyon Floor Landing + Champagne Picnic", priceMultiplier: 1.6, description: "Includes 40-minute landing inside the inner canyon with gourmet champagne toast." },
      { id: "tk-gc-skywalk", name: "VIP Helicopter Landing + Glass Skywalk Pass", priceMultiplier: 2.1, description: "Includes Landing, Glass Skywalk admission pass, and West Rim shuttle tour." }
    ],
    reviews: [
      { author: "David Miller", rating: 5, date: "2026-06-30", comment: "The canyon floor landing was surreal. Words cannot describe the scale of this natural miracle." }
    ]
  },
  {
    id: 309,
    name: "Statue of Liberty & Ellis Island Ferry Pass",
    city: "New York",
    country: "USA",
    category: "Landmarks",
    rating: 4.82,
    reviewsCount: 15300,
    ticketPrice: 29,
    image: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "08:30 AM - 04:00 PM Ferry Departure",
    address: "Battery Park, New York, NY 10004, USA",
    description: "Board the official Statue City Cruises ferry from Battery Park to Liberty Island. Marvel at Lady Liberty up close and trace the immigration history of America at the famous Ellis Island Museum.",
    highlights: [
      "Round-trip ferry passage to Liberty Island & Ellis Island",
      "Pedestal & Crown access options with skyline views of Manhattan",
      "Access to official Statue of Liberty Museum & original torch display",
      "Self-guided multilingual audio tour included"
    ],
    ticketTypes: [
      { id: "tk-statue-grounds", name: "Ferry + Liberty & Ellis Island Reserve Ticket", priceMultiplier: 1.0, description: "Includes round-trip ferry, island grounds access, and museum entries." },
      { id: "tk-statue-pedestal", name: "Pedestal Access Ticket", priceMultiplier: 1.25, description: "Includes climbing to the stone pedestal museum directly beneath Lady Liberty's feet." },
      { id: "tk-statue-crown", name: "Exclusive Crown Climb Pass", priceMultiplier: 1.7, description: "Includes double spiral staircase climb inside the statue up to Lady Liberty's crown." }
    ],
    reviews: [
      { author: "Brian K.", rating: 5, date: "2026-07-04", comment: "Climbing to the crown was unforgettable! Spectacular view of New York Harbor." }
    ]
  },
  {
    id: 310,
    name: "Sagrada Familia Fast-Track Tower Pass",
    city: "Barcelona",
    country: "Spain",
    category: "Architecture",
    rating: 4.94,
    reviewsCount: 18200,
    ticketPrice: 36,
    image: "https://images.unsplash.com/photo-1583772289962-4a682466f1ad?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1583772289962-4a682466f1ad?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "09:00 AM - 08:00 PM Daily",
    address: "C/ de Mallorca, 401, 08013 Barcelona, Spain",
    description: "Step into Antoni Gaudí's masterpiece of architectural geometry. Be mesmerized by stained glass forest columns bathed in rainbow sunlight and ascend the Nativity or Passion towers.",
    highlights: [
      "Gaudí's iconic UNESCO World Heritage basilica",
      "Organic tree-like stone column sanctuary",
      "Elevator access up the Nativity or Passion Spire towers",
      "Crypt and Gaudí Museum history entrance"
    ],
    ticketTypes: [
      { id: "tk-sf-std", name: "Fast-Track Entry + Official Audio App Pass", priceMultiplier: 1.0, description: "Skip main entrance queue with interactive smartphone guide." },
      { id: "tk-sf-towers", name: "Fast-Track Entry + Spire Tower Elevator Pass", priceMultiplier: 1.45, description: "Includes elevator climb up Nativity Façade tower for panoramic Barcelona coast views." },
      { id: "tk-sf-guided", name: "Small-Group Architecture Specialist Guided Tour", priceMultiplier: 2.3, description: "90-minute expert tour revealing hidden symbolisms in Gaudí's façade sculptures." }
    ],
    reviews: [
      { author: "Lucia Gomez", rating: 5, date: "2026-06-11", comment: "The sunlight coming through the stained glass feels like a living rainbow inside. Magic!" }
    ]
  },
  {
    id: 311,
    name: "Marina Bay Sands Skypark & Gardens by the Bay Combo",
    city: "Singapore",
    country: "Singapore",
    category: "Landmarks",
    rating: 4.87,
    reviewsCount: 14100,
    ticketPrice: 42,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "11:00 AM - 09:00 PM Daily",
    address: "10 Bayfront Ave, Singapore 018956",
    description: "Visit Singapore's futuristic icon! Stand 57 levels high on the Sands Skypark Observation Deck overlooking Marina Bay, then stroll through the Flower Dome and Cloud Forest Supertrees.",
    highlights: [
      "57th floor Skypark deck with 360-degree Singapore strait view",
      "Gardens by the Bay Cloud Forest 35-meter indoor waterfall",
      "Supertree Grove OCBC Skyway canopy walkway",
      "Evening Spectra light & water show ticket"
    ],
    ticketTypes: [
      { id: "tk-mbs-skypark", name: "Sands Skypark Observation Deck E-Ticket", priceMultiplier: 1.0, description: "Direct admission ticket to 57th floor viewing deck." },
      { id: "tk-mbs-gardens", name: "Skypark + Gardens by the Bay Double Dome Combo", priceMultiplier: 1.7, description: "Includes Skypark deck + Flower Dome & Cloud Forest tickets." },
      { id: "tk-mbs-vip", name: "VIP Skypark + Supertree Skyway + Drink Voucher", priceMultiplier: 2.2, description: "Includes priority entry, Supertree walkway pass, and Ce La Vi rooftop cocktail voucher." }
    ],
    reviews: [
      { author: "Tan Wei Ming", rating: 5, date: "2026-07-01", comment: "Cloud Forest waterfall cooling mist is unbelievable in tropical humidity. 10/10!" }
    ]
  },
  {
    id: 312,
    name: "Bali Sacred Monkey Forest & Ubud Rice Terrace Ticket",
    city: "Bali",
    country: "Indonesia",
    category: "Nature",
    rating: 4.86,
    reviewsCount: 11200,
    ticketPrice: 12,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "08:30 AM - 06:00 PM Daily",
    address: "Jl. Monkey Forest, Ubud, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571, Indonesia",
    description: "Immerse in the spiritual heart of Bali. Wander under ancient banyan trees populated by over 1,000 playful Balinese long-tailed macaques, and take photos on the Tegallalang Jungle Swing.",
    highlights: [
      "12.5 hectares of sacred sanctuary forest with 14th-century mossy temples",
      "1,000+ friendly free-roaming Balinese long-tailed monkeys",
      "Tegallalang emerald rice terrace walkway",
      "Bali Swing flying photo station pass"
    ],
    ticketTypes: [
      { id: "tk-bali-monkey", name: "Monkey Forest Sanctuary Entry Ticket", priceMultiplier: 1.0, description: "Official entry ticket to forest sanctuary and ancient temple ruins." },
      { id: "tk-bali-swing", name: "Monkey Forest + Tegallalang Rice Terrace & Swing Pass", priceMultiplier: 2.2, description: "Includes sanctuary entry, rice terrace pass, and 1 flying jungle swing photo ticket." },
      { id: "tk-bali-private", name: "All-Inclusive Ubud Cultural Tour with Driver", priceMultiplier: 4.5, description: "Includes private AC car, Monkey Forest, Swing, Tegenungan Waterfall, and organic lunch." }
    ],
    reviews: [
      { author: "Claire Bennet", rating: 5, date: "2026-06-09", comment: "Monkeys are super curious and funny! Take care of sunglasses and phone, wonderful day out." }
    ]
  },
  {
    id: 313,
    name: "Hawa Mahal & City Palace Royal Heritage Pass",
    city: "Jaipur",
    country: "India",
    category: "Historical",
    rating: 4.92,
    reviewsCount: 16800,
    ticketPrice: 18,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "09:00 AM - 05:00 PM Daily",
    address: "Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002",
    description: "Admire the 953 intricate honeycomb pink sandstone windows of the 'Palace of Winds' and explore the regal courtyards, armory, and Chandra Mahal of Jaipur's royal Maharajas.",
    highlights: [
      "953 carved jharokhas (latticework windows) designed for royal ladies",
      "Pritam Niwas Chowk 4 Peacock Gates in City Palace",
      "World's largest sterling silver vessels (Gangajalis)",
      "Access to Jantar Mantar UNESCO Astronomical Observatory"
    ],
    ticketTypes: [
      { id: "tk-hawa-std", name: "Hawa Mahal + Jantar Mantar Combined Pass", priceMultiplier: 1.0, description: "Entry to Hawa Mahal viewing towers and Jantar Mantar sundials." },
      { id: "tk-hawa-palace", name: "Jaipur Royal Pink City Heritage Mega Pass", priceMultiplier: 1.8, description: "Includes Hawa Mahal, City Palace museum, Albert Hall, and Amber Fort." },
      { id: "tk-hawa-royal", name: "Chandra Mahal Private Royal Suite Tour", priceMultiplier: 3.5, description: "VIP guided walkthrough of private living quarters of current Royal Family with tea." }
    ],
    reviews: [
      { author: "Kavita Singhania", rating: 5, date: "2026-06-25", comment: "The Peacock Gate in City Palace is an artistic masterpiece! Sunrise view from Hawa Mahal cafe is magical." }
    ]
  },
  {
    id: 314,
    name: "Golden Temple & Wagah Border Ceremony Pass",
    city: "Amritsar",
    country: "India",
    category: "Historical",
    rating: 4.99,
    reviewsCount: 28400,
    ticketPrice: 20,
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "Open 24 Hours Daily",
    address: "Golden Temple Rd, Atta Mandi, Katra Ahluwalia, Amritsar, Punjab 143006",
    description: "Experience the supreme spiritual serenity of Sri Harmandir Sahib covered in pure gold foil in the holy Amrit Sarovar lake, followed by the electrifying evening Beating Retreat at Wagah Border.",
    highlights: [
      "World's largest free community kitchen (Guru ka Langar serving 100k people/day)",
      "Pure gold foil gilded sanctum in sacred holy water pool",
      "VIP grandstand seating for Wagah Border Beating Retreat flag-lowering",
      "Included Jallianwala Bagh National Memorial walkthrough"
    ],
    ticketTypes: [
      { id: "tk-gt-guide", name: "Spiritual Heritage Walk & Langar Experience", priceMultiplier: 1.0, description: "Guided spiritual walk around Sarovar and community kitchen service." },
      { id: "tk-gt-wagah", name: "Golden Temple + Wagah Border AC Transfer Combo", priceMultiplier: 2.0, description: "Includes private AC car to Wagah Border with reserved VIP seating." }
    ],
    reviews: [
      { author: "Harpreet Singh", rating: 5, date: "2026-07-04", comment: "The night Palki Sahib ceremony with shimmering gold reflections brought tears to our eyes. Pure bliss." }
    ]
  },
  {
    id: 315,
    name: "Qutub Minar & Red Fort Heritage Ticket",
    city: "Delhi",
    country: "India",
    category: "Historical",
    rating: 4.90,
    reviewsCount: 19800,
    ticketPrice: 12,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "07:00 AM - 07:00 PM Daily",
    address: "Seth Sarai, Mehrauli, New Delhi, Delhi 110030",
    description: "Explore the world's tallest brick minaret standing at 72.5 meters, built in 1192 AD, and discover the rust-resistant 1600-year-old Gupta iron pillar set inside historic gardens.",
    highlights: [
      "72.5m fluted red sandstone minaret with Arabic calligraphy carvings",
      "4th-century rust-proof Iron Pillar of Chandragupta II",
      "Ala'i Darwaza gateway & Quwwat-ul-Islam mosque ruins",
      "Combo option with Red Fort Diwan-i-Khas & Humayun Tomb"
    ],
    ticketTypes: [
      { id: "tk-qutub-std", name: "Qutub Complex Fast-Track E-Ticket", priceMultiplier: 1.0, description: "Skip-the-line entrance to Qutub Minar complex & Mehrauli ruins." },
      { id: "tk-delhi-trio", name: "Delhi UNESCO Trio Pass (Qutub + Red Fort + Humayun)", priceMultiplier: 2.2, description: "Covers all three UNESCO World Heritage monuments in Delhi." }
    ],
    reviews: [
      { author: "Ananya Sen", rating: 5, date: "2026-06-20", comment: "The stone carvings and Islamic calligraphy are breathtaking. Must visit during late afternoon sunset." }
    ]
  },
  {
    id: 316,
    name: "Gateway of India & Elephanta Caves Island Boat Ticket",
    city: "Mumbai",
    country: "India",
    category: "Historical",
    rating: 4.88,
    reviewsCount: 15400,
    ticketPrice: 16,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "09:00 AM - 05:30 PM (Closed Mondays)",
    address: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
    description: "Board a harbor ferry from the historic Gateway of India across the Arabian Sea to Elephanta Island. Marvel at 5th-century rock-cut basalt cave temples and the famous 20-foot Trimurti Shiva sculpture.",
    highlights: [
      "Iconic 1924 basalt Gateway of India monument overlooking Mumbai harbor",
      "Scenic 1-hour Arabian Sea ferry cruise with flying seagulls",
      "UNESCO 6th-century rock-cut Shiva cave temples",
      "20-foot three-headed Sadashiva / Trimurti rock sculpture"
    ],
    ticketTypes: [
      { id: "tk-elephanta-ferry", name: "Return Luxury Ferry + Cave Entry Ticket", priceMultiplier: 1.0, description: "Upper deck ferry ticket + toy train pass + Elephanta cave admission." },
      { id: "tk-elephanta-guide", name: "Historian Guided Cave Tour & Private Boat Pass", priceMultiplier: 2.1, description: "Includes certified archaeological guide, fast-track boat, and heritage village tea." }
    ],
    reviews: [
      { author: "Rohan Deshmukh", rating: 5, date: "2026-05-15", comment: "The Trimurti sculpture is magnificent! Great breeze on the boat ride from Colaba." }
    ]
  },
  {
    id: 317,
    name: "Pyramids of Giza & Great Sphinx Plateau Pass",
    city: "Cairo",
    country: "Egypt",
    category: "Historical",
    rating: 4.94,
    reviewsCount: 31200,
    ticketPrice: 32,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "08:00 AM - 05:00 PM Daily",
    address: "Al Haram, Giza Governorate, Egypt",
    description: "Stand before the last surviving wonder of the ancient world. Gaze upon the Great Pyramid of Khufu, Khafre, and Menkaure, and come face-to-face with the mythical Great Sphinx carved from limestone.",
    highlights: [
      "Last remaining original Ancient 7 Wonder of the World (4,500 years old)",
      "Great Sphinx of Giza limestone mythical guardian statue",
      "Panoramic desert viewpoint with camel ride package",
      "Internal burial chamber entrance option for Khufu's pyramid"
    ],
    ticketTypes: [
      { id: "tk-giza-std", name: "Giza Plateau General Admission Ticket", priceMultiplier: 1.0, description: "Entry to plateau, Sphinx enclosure, and Valley Temple." },
      { id: "tk-giza-inner", name: "Giza Plateau + Great Pyramid Inner Chamber Entry", priceMultiplier: 1.8, description: "Includes entering narrow ascents into King Khufu's granite sarcophagus room." },
      { id: "tk-giza-vip", name: "VIP Private Egyptologist Tour with Camel Caravan & Lunch", priceMultiplier: 3.2, description: "Full day tour with private air-conditioned car, historian guide, camel trek, and traditional lunch." }
    ],
    reviews: [
      { author: "Marcus Aurelius", rating: 5, date: "2026-06-28", comment: "Seeing the pyramids in real life is overwhelming. You feel the weight of millennia." }
    ]
  },
  {
    id: 318,
    name: "Colosseum, Roman Forum & Palatine Hill Priority Ticket",
    city: "Rome",
    country: "Italy",
    category: "Historical",
    rating: 4.91,
    reviewsCount: 26800,
    ticketPrice: 35,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "09:00 AM - 07:15 PM Daily",
    address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
    description: "Step into the gladiatorial arena of the Roman Empire! Walk the stone tiers of the 50,000-seat amphitheater and explore the temples and triumphal arches of the ancient Roman Forum.",
    highlights: [
      "Fast-track skip-the-line entrance to the 2,000-year-old Colosseum",
      "Access to Gladiators Arena Floor & Underground Hypogeum",
      "Stroll through the Roman Forum where Julius Caesar walked",
      "Palatine Hill emperor palaces and panoramic Rome overlook"
    ],
    ticketTypes: [
      { id: "tk-rome-std", name: "Colosseum, Forum & Palatine 24h Pass", priceMultiplier: 1.0, description: "Standard timed entry ticket with audio guide app." },
      { id: "tk-rome-arena", name: "Colosseum Arena Floor Direct Access Pass", priceMultiplier: 1.5, description: "Enter via the Gladiator Gate straight onto the wooden arena floor." }
    ],
    reviews: [
      { author: "Giulia Rossi", rating: 5, date: "2026-07-08", comment: "Standing in the center of the Colosseum floor gave me goosebumps! A must-see." }
    ]
  }
];
