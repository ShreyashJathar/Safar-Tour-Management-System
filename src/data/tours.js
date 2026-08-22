export const initialTours = [
  {
    id: 1,
    title: "Bali Tropical Paradise Escape",
    location: "Bali, Indonesia",
    price: 1299,
    duration: 7,
    rating: 4.9,
    reviewsCount: 148,
    category: "Beach",
    image: "/assets/travel_bali.png",
    featured: true,
    description: "Immerse yourself in the breathtaking beauty of Bali. From pristine beaches and lush terraced rice paddies to ancient temples and rich cultural heritage, this 7-day tropical escape is designed for ultimate relaxation and exploration.",
    highlights: [
      "Visit the iconic Uluwatu Temple at sunset",
      "Snorkel in the crystal-clear waters of Nusa Penida",
      "Explore Ubud's sacred Monkey Forest and rice terraces",
      "Traditional Balinese spa massage session included",
      "Private beachfront seafood dinner in Jimbaran"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Beachfront Welcome", description: "Arrive in Denpasar, transfer to your luxury beachfront resort in Seminyak. Evening welcome cocktail and dinner." },
      { day: 2, title: "Ubud Cultural Tour", description: "Discover Ubud's artistic heart, visit the Tegallalang Rice Terraces, and walk through the Sacred Monkey Forest." },
      { day: 3, title: "Waterfalls & Temple Heritage", description: "Explore the stunning Tegenungan Waterfall, Tirta Empul holy spring temple, and Mount Batur view." },
      { day: 4, title: "Nusa Penida Island Adventure", description: "Take a speed boat to Nusa Penida. Visit Kelingking Beach, Broken Beach, and snorkel with manta rays." },
      { day: 5, title: "Leisure Day & Spa Treatment", description: "A free day to relax by the pool or shop. In the afternoon, enjoy a 2-hour luxury Balinese spa treatment." },
      { day: 6, title: "Uluwatu Sunset & Kecak Dance", description: "Visit the cliffside Uluwatu Temple, watch the traditional Kecak Fire Dance, and enjoy a seafood BBQ in Jimbaran." },
      { day: 7, title: "Departure", description: "Last-minute souvenir shopping, transfer to the airport for your flight home." }
    ],
    reviews: [
      { author: "Sarah Jenkins", rating: 5, date: "2026-05-12", comment: "An absolute dream trip! The organization was seamless, and Nusa Penida was the highlight of my year." },
      { author: "Michael Chen", rating: 4.8, date: "2026-06-01", comment: "Beautiful resort and friendly guides. The itinerary is packed but leaves enough time to relax." }
    ]
  },
  {
    id: 2,
    title: "Swiss Alps Adventure & Wellness",
    location: "Zermatt, Switzerland",
    price: 2499,
    duration: 6,
    rating: 4.8,
    reviewsCount: 96,
    category: "Mountain",
    image: "/assets/travel_swiss.png",
    featured: true,
    description: "Experience the majestic beauty of the Swiss Alps. Stay in a luxury Alpine chalet, hike scenic mountain trails with panoramic Matterhorn views, ski on glaciers, and unwind in world-class thermal hot springs.",
    highlights: [
      "Scenic cogwheel train ride on the Gornergrat Railway",
      "Guided Alpine hiking tour with views of the Matterhorn",
      "Full-day access to luxury thermal baths and spas",
      "Traditional Swiss cheese fondue dinner experience",
      "Glacier Paradise cable car ride to 3,883 meters"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Zermatt", description: "Arrive in Zermatt via the scenic glacier train. Check into your luxury chalet. Evening fireside welcome drinks." },
      { day: 2, title: "Matterhorn Glacier Paradise", description: "Ride the highest cable car in Europe to the Matterhorn Glacier Paradise. Explore the glacier palace and enjoy panoramic views." },
      { day: 3, title: "Gornergrat Cogwheel Railway", description: "Travel up the Gornergrat railway for breathtaking views of 29 peaks. Guided nature walk along alpine lakes." },
      { day: 4, title: "Alpine Wellness & Spa Day", description: "Spend a relaxing day in Zermatt's premium thermal spas. Includes aromatherapy massages and outdoor hot pools." },
      { day: 5, title: "Chalet Cooking & Fondue Night", description: "Leisure morning. In the evening, participate in a private cheese fondue workshop followed by a traditional dinner." },
      { day: 6, title: "Departure", description: "Breakfast at the chalet, farewell walk through Zermatt village, and departure via train." }
    ],
    reviews: [
      { author: "Emily Watson", rating: 5, date: "2026-04-20", comment: "Spectacular views! The chalet was luxurious and Zermatt is a magical car-free town." }
    ]
  },
  {
    id: 3,
    title: "Tokyo Neon Nights & Heritage",
    location: "Tokyo, Japan",
    price: 1899,
    duration: 5,
    rating: 4.9,
    reviewsCount: 215,
    category: "Cultural",
    image: "/assets/travel_tokyo.png",
    featured: true,
    description: "Witness the fascinating contrast between ancient traditions and ultra-modern technology in Tokyo. Explore historic temples, vibrant neon shopping districts, Michelin-starred cuisine, and participate in a traditional tea ceremony.",
    highlights: [
      "Sushi making masterclass with a professional chef",
      "Private guided tour of Senso-ji Temple and Meiji Shrine",
      "Stunning views from the Shibuya Sky observation deck",
      "Interactive digital art experience at teamLab Planets",
      "Vibrant street food tour in Shinjuku's Omoide Yokocho"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Shibuya Neon Night", description: "Arrive in Tokyo, transfer to Shinjuku. Evening walking tour of Shibuya Crossing and drinks at Shibuya Sky." },
      { day: 2, title: "Asakusa Traditions & Sushi Class", description: "Explore the historic Senso-ji Temple in Asakusa. Take a sushi-making workshop with a local chef for lunch." },
      { day: 3, title: "Modern Tech & digital Art", description: "Spend the morning at teamLab Planets digital art museum. Afternoon shopping and sightseeing in Akihabara." },
      { day: 4, title: "Meiji Shrine & Harajuku Fashion", description: "Walk through Yoyogi Park to Meiji Shrine. Explore the colorful boutiques of Harajuku and upscale Omotesando." },
      { day: 5, title: "Tsukiji Outer Market & Departure", description: "Early morning breakfast at Tsukiji Outer Market (fresh street food). Free afternoon, then transfer to airport." }
    ],
    reviews: [
      { author: "Liam O'Connor", rating: 5, date: "2026-05-30", comment: "teamLab Planets was mind-blowing! Japan is so clean and the food is unmatched. Best tour ever." }
    ]
  },
  {
    id: 4,
    title: "Romantic Paris & Seine Cruise",
    location: "Paris, France",
    price: 1499,
    duration: 4,
    rating: 4.7,
    reviewsCount: 182,
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    description: "Indulge in the romance of the City of Light. Enjoy skip-the-line access to the Eiffel Tower, stroll through artistic Montmartre, cruise along the Seine River at sunset, and taste exquisite pastries at a local patisserie class.",
    highlights: [
      "Eiffel Tower summit skip-the-line access",
      "Seine River dinner cruise with live accordion music",
      "Macaron making class at a traditional French patisserie",
      "Private guided tour of the Louvre Museum masterpieces",
      "Art walk through Montmartre and Sacré-Cœur"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Paris & Seine Cruise", description: "Arrive in Paris, check in near the Champs-Élysées. Sunset dinner cruise on the Seine River." },
      { day: 2, title: "Eiffel Summit & Louvre Art", description: "Ascend to the top of the Eiffel Tower. Afternoon private tour of the Louvre (Mona Lisa, Venus de Milo)." },
      { day: 3, title: "Montmartre & Macaron Workshop", description: "Explore the cobblestone streets of Montmartre. Afternoon macaron-making class with a professional chef." },
      { day: 4, title: "Palace of Versailles & Departure", description: "Morning half-day trip to the Palace of Versailles. Return to Paris for airport transfer." }
    ],
    reviews: [
      { author: "Sophia Rossi", rating: 4.6, date: "2026-06-15", comment: "The Seine cruise was magical. Skipping the lines at the Louvre saved us so much time." }
    ]
  },
  {
    id: 5,
    title: "Icelandic Lights & Glacier Hikes",
    location: "Reykjavik, Iceland",
    price: 2199,
    duration: 5,
    rating: 4.8,
    reviewsCount: 78,
    category: "Nature",
    image: "/assets/travel_iceland.png",
    featured: false,
    description: "Embark on an epic adventure to the land of fire and ice. Hunt for the elusive Northern Lights, hike across spectacular glaciers, walk behind massive waterfalls, and soak in the mineral-rich waters of the Blue Lagoon.",
    highlights: [
      "Guided Northern Lights chase with professional photographer",
      "Soak in the geothermal waters of the famous Blue Lagoon",
      "Golden Circle tour: Geysir, Gullfoss, and Thingvellir",
      "Glacier hike on Solheimajokull with crampons and ice axes",
      "Walk behind Seljalandsfoss waterfall"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Blue Lagoon Soak", description: "Arrive at Keflavik airport, direct transfer to the Blue Lagoon for a relaxing soak. Check in at Reykjavik." },
      { day: 2, title: "Golden Circle Exploration", description: "Visit Thingvellir National Park, witness the Strokkur geyser eruption, and marvel at the golden Gullfoss waterfall." },
      { day: 3, title: "South Coast Waterfall & Glacier Hike", description: "Hike along the black sand beaches, view Skogafoss, and complete a guided glacier hike on Solheimajokull." },
      { day: 4, title: "Ice Caves & Northern Lights Chase", description: "Explore natural ice caves during the day. At night, head out to the countryside to chase the Northern Lights." },
      { day: 5, title: "Reykjavik Walk & Departure", description: "Explore downtown Reykjavik, view Hallgrimskirkja church, and transfer to Keflavik airport." }
    ],
    reviews: [
      { author: "David Miller", rating: 5, date: "2026-03-10", comment: "We saw the Northern Lights on our second night! The glacier hike was challenging but absolutely worth it." }
    ]
  },
  {
    id: 6,
    title: "Munnar Misty Tea Hills",
    location: "Munnar, Kerala, India",
    price: 499,
    duration: 4,
    rating: 4.8,
    reviewsCount: 84,
    category: "Nature",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    description: "Discover the lush green expanse of Munnar, South India's premium tea capital. Enjoy crisp mountain air, trek through misty spice plantations, see endangered wildlife, and cruise tranquil mountain lakes.",
    highlights: [
      "Guided stroll through colonial Tata Tea Museum and estates",
      "Watch sunrise from Top Station (highest point in Munnar)",
      "Mattupetty Dam boating and eco-point echo testing",
      "Scenic walking tour through Cardamom and Pepper plantations",
      "Picnic lunch next to Lakkom Waterfalls"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cochin & Transfer to Munnar", description: "Drive from Cochin through winding roads flanked by waterfalls. Check into your mountain resort. Rest of the day at leisure." },
      { day: 2, title: "Tea Gardens & Museum Tour", description: "Visit the Tata Tea Museum, explore the process of tea manufacturing, and walk among manicured tea gardens. Evening spice market shopping." },
      { day: 3, title: "Eravikulam National Park & Dams", description: "Spot the rare Nilgiri Tahr mountain goat in Eravikulam. Afternoon visit to Mattupetty Dam, Kundala Lake, and Echo Point." },
      { day: 4, title: "Top Station Sunrise & Departure", description: "Early morning drive to Top Station for panoramic valley views. Return to hotel for breakfast, checkout, and transfer back to Cochin." }
    ],
    reviews: [
      { author: "Aarav Sharma", rating: 5, date: "2026-06-10", comment: "Breathtaking views. The resort was surrounded by cardamom gardens. Highly recommended!" }
    ]
  },
  {
    id: 7,
    title: "Manali Snowy Solang Valley Escape",
    location: "Manali, Himachal Pradesh, India",
    price: 699,
    duration: 5,
    rating: 4.9,
    reviewsCount: 112,
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    description: "Escape to the adventure capital of Himachal Pradesh. Surrounded by high peaks, snowy slopes, and cascading pine trees, Manali offers the perfect mix of mountain thrills and rustic chalet living.",
    highlights: [
      "Full day adventure sports session at Solang Valley",
      "Drive through the famous Atal Tunnel engineering marvel",
      "Skiing, paragliding, and snow zorbing activities",
      "Explore the ancient wooden Hadimba Temple",
      "Walk through the cozy cafes of Old Manali"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Manali & Local Walk", description: "Arrive in Manali, transfer to your hotel. Visit the hot springs of Vashisht and stroll through Mall Road." },
      { day: 2, title: "Solang Valley Adventure", description: "Spend the day in Solang Valley. Enjoy snow skiing, paragliding, or quad-biking on beautiful mountain slopes." },
      { day: 3, title: "Atal Tunnel & Sissu Excursion", description: "Drive through the 9.02km Atal Tunnel. Arrive at Sissu village in Lahaul Valley to view frozen waterfalls and snow cliffs." },
      { day: 4, title: "Hadimba Temple & Old Manali Heritage", description: "Explore the 450-year-old Hadimba Temple. Afternoon cafe-hopping in Old Manali, enjoying live acoustic music." },
      { day: 5, title: "Checkout & Departure", description: "Free morning for local shopping. Afternoon departure via luxury bus or airport transfer." }
    ],
    reviews: [
      { author: "Priya Patel", rating: 5, date: "2026-02-18", comment: "Snowboarding at Solang Valley was amazing. Sissu waterfall was absolutely frozen and stunning!" }
    ]
  },
  {
    id: 8,
    title: "Shimla Ridge & Toy Train Tour",
    location: "Shimla, Himachal Pradesh, India",
    price: 599,
    duration: 5,
    rating: 4.7,
    reviewsCount: 67,
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    description: "Walk back in time in the summer capital of British India. Shimla charms with its historic Mall Road, neo-Gothic Christ Church, colonial estates, and the heritage cogwheel Toy Train winding through pine forests.",
    highlights: [
      "Ride the legendary UNESCO Kalka-Shimla Toy Train",
      "Scenic evening stroll on Mall Road and The Ridge",
      "Spectacular panoramic views from Jakhoo Temple hill",
      "Guided tour of Viceregal Lodge (Indian Institute of Advanced Study)",
      "Short excursion to the snowy peaks of Kufri"
    ],
    itinerary: [
      { day: 1, title: "Toy Train Experience & Check-in", description: "Board the vintage Toy Train from Kalka, passing through 103 tunnels. Arrive in Shimla and check in." },
      { day: 2, title: "Colonial Heritage Walk", description: "Visit Christ Church, stroll on The Ridge, and tour the Viceregal Lodge, a majestic Elizabethan-style mansion." },
      { day: 3, title: "Excursion to Kufri & Nature Park", description: "Travel to Kufri (16km). Enjoy horse riding, view Himalayan wildlife at the nature park, and slide on snow slopes." },
      { day: 4, title: "Jakhoo Hill Hike & Shopping", description: "Hike or ride the ropeway up to Jakhoo Temple (Shimla's highest point) to see the giant Hanuman statue. Evening shopping at Lakkar Bazar." },
      { day: 5, title: "Departure", description: "Breakfast at hotel, free morning, and checkout for your onward journey." }
    ],
    reviews: [
      { author: "Rohan Das", rating: 4.6, date: "2026-05-02", comment: "The Toy train ride was very peaceful. The weather in Shimla was perfect and Mall road has great cafes." }
    ]
  },
  {
    id: 9,
    title: "Gulmarg Alpine Snow & Srinagar Dal Lake",
    location: "Gulmarg, Kashmir, India",
    price: 899,
    duration: 6,
    rating: 4.9,
    reviewsCount: 142,
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    description: "Experience the ultimate winter paradise in Kashmir. Glide above dense pine forests on the Gulmarg Gondola, ski down powder slopes of Apharwat, and spend a romantic night in a luxury wood-carved houseboat on Srinagar's Dal Lake.",
    highlights: [
      "Ride the Gulmarg Gondola, the highest cable car in Asia",
      "Skiing and snowboarding with local pro instructors",
      "Sleep in a traditional cedar houseboat on Dal Lake",
      "Shikara boat wooden cruise at sunrise",
      "Authentic Kashmiri Wazwan multiple-course dinner"
    ],
    itinerary: [
      { day: 1, title: "Srinagar Arrival & Houseboat Night", description: "Arrive in Srinagar. Check into a luxury wooden Houseboat on Dal Lake. Sunset Shikara ride around floating markets." },
      { day: 2, title: "Mughal Gardens Tour & Transfer to Gulmarg", description: "Visit the Shalimar Bagh and Nishat Bagh royal gardens. Afternoon drive to Gulmarg (Meadow of Flowers), check in at your ski resort." },
      { day: 3, title: "Gulmarg Gondola & Peak Snow", description: "Board the Gondola. Ride Phase 1 and 2 up to 13,000 feet. Enjoy hiking on snowfields and views of Nanga Parbat." },
      { day: 4, title: "Skiing & Snowshoeing Class", description: "Guided ski lessons on the gentle slopes. Afternoon snowshoeing trek through forests. Warm up with Kashmiri Kahwa tea." },
      { day: 5, title: "St. Mary's Church & Local Walk", description: "Visit the historic St. Mary's stone church in the meadows. Relax in the resort spa in the evening." },
      { day: 6, title: "Return to Srinagar & Departure", description: "Scenic drive back to Srinagar airport for departure." }
    ],
    reviews: [
      { author: "Karan Mehta", rating: 5, date: "2026-01-15", comment: " હાઉસબોટનો અનુભવ અદ્ભુત હતો! Gondola views were out of this world. Kashmiri food is so rich!" }
    ]
  },
  {
    id: 10,
    title: "Darjeeling Himalayan Tea Estates & Sunrises",
    location: "Darjeeling, West Bengal, India",
    price: 549,
    duration: 4,
    rating: 4.8,
    reviewsCount: 93,
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1557995167-9d7a2283083b?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    description: "Stay in a boutique tea garden bungalow and watch the morning sun paint the snows of Mt. Kanchenjunga in gold. Ride the steam-driven toy train and learn the secrets of brewing the world's finest tea champagne.",
    highlights: [
      "Watch the sunrise over Mt. Kanchenjunga from Tiger Hill",
      "Vintage steam-powered Toy Train loop ride",
      "Stay in an active, historic Tea Estate bungalow",
      "Visit Ghoom Monastery and the Peace Pagoda",
      "Tasting tour of Happy Valley Tea Factory"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Tea Estate Check-in", description: "Arrive via Bagdogra/NJP, transfer up the hills. Check into your boutique tea garden retreat." },
      { day: 2, title: "Tiger Hill Sunrise & Ghoom Loop", description: "Wake up at 4:00 AM for sunrise views from Tiger Hill. Ride the heritage steam Toy Train through Batasia Loop." },
      { day: 3, title: "Tea Tasting & Mountaineering Museum", description: "Visit Happy Valley tea estate for tea plucking and tasting sessions. Tour the Himalayan Mountaineering Institute." },
      { day: 4, title: "Monasteries & Departure", description: "Visit Ghoom Monastery, check out, and head down the foothills for your return transfer." }
    ],
    reviews: [
      { author: "Ananya Sen", rating: 4.8, date: "2026-04-12", comment: "Tiger Hill was freezing but the sunrise view of Kanchenjunga was holy. Best tea I've ever tasted." }
    ]
  },
  {
    id: 11,
    title: "Ooty Nilgiri Tranquility",
    location: "Ooty, Tamil Nadu, India",
    price: 449,
    duration: 4,
    rating: 4.7,
    reviewsCount: 72,
    category: "Nature",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    description: "Relax in the Queen of Hill Stations in South India. Surrounded by the blue Nilgiri hills, Ooty offers beautiful rose gardens, pristine lakes, chocolate cottages, and serene mountain vistas.",
    highlights: [
      "Ride the Nilgiri Mountain Railway toy train through gorges",
      "Stroll in the Botanical Gardens & Rose Garden",
      "Private boating session in Ooty Lake",
      "Hike to Doddabetta Peak, the highest point in South India",
      "Taste fresh chocolates at a local fudge factory"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Coimbatore & Transfer to Ooty", description: "Scenic mountain drive up the Nilgiris via Coonoor. Check into your resort. Evening lake walk." },
      { day: 2, title: "Gardens & Doddabetta Hike", description: "Visit the Rose Garden and Botanical Gardens. Hike or drive up to Doddabetta Peak for sweeping valley views." },
      { day: 3, title: "Coonoor Excursion & Toy Train Ride", description: "Take the heritage Nilgiri toy train to Coonoor. Visit Sim's Park, Dolphin's Nose viewpoint, and a tea estate." },
      { day: 4, title: "Fudge Shopping & Departure", description: "Buy homemade chocolates and eucalyptus oils. Check out and transfer back to Coimbatore." }
    ],
    reviews: [
      { author: "Aditya Nair", rating: 4.7, date: "2026-05-19", comment: "Ooty is very peaceful, especially Coonoor. The toy train ride through the green valleys was the highlight." }
    ]
  },
  {
    id: 12,
    title: "Santorini Sunset & Blue Domes",
    location: "Santorini, Greece",
    price: 1599,
    duration: 5,
    rating: 4.9,
    reviewsCount: 165,
    category: "Beach",
    image: "/assets/travel_greece.png",
    featured: true,
    description: "Experience the romance of Santorini. Stroll along the narrow whitewashed alleyways of Oia, watch the iconic sunset over the caldera blue domes, swim on black-sand beaches, and enjoy premium Greek yachting.",
    highlights: [
      "Caldera sunset luxury catamaran yacht cruise",
      "Traditional wine tasting tour in Pyrgos village",
      "Stroll through the whitewashed streets of Oia",
      "Relax on the unique Kamari Black Sand Beach",
      "Private Greek archaeological history guide"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Santorini", description: "Arrive at Santorini airport, private transfer to your cliffside resort in Oia. Evening cocktail facing the caldera sunset." },
      { day: 2, title: "White Streets & Blue Domes Walk", description: "Guided morning walking tour of Oia's historic streets. Learn the history of the blue dome chapels and take stunning photos." },
      { day: 3, title: "Sunset Catamaran Yacht Cruise", description: "Board a luxury yacht. Swim in the hot springs, enjoy a Greek buffet lunch on board, and watch the sunset from the sea." },
      { day: 4, title: "Pyrgos Wine Tasting & Black Beach", description: "Visit the volcanic vineyards for estate wine tastings. Afternoon relaxing on Kamari's volcanic black sand beaches." },
      { day: 5, title: "Departure", description: "Morning breakfast overlooking the sea, checkout, and private transfer to airport." }
    ],
    reviews: [
      { author: "Lois Lane", rating: 5, date: "2026-06-22", comment: "Watching the sunset from the catamaran was a core memory. Santorini is absolutely beautiful." }
    ]
  },
  {
    id: 13,
    title: "Taj Mahal & Royal Jaipur Heritage",
    location: "Agra & Jaipur, India",
    price: 899,
    duration: 6,
    rating: 4.8,
    reviewsCount: 114,
    category: "Cultural",
    image: "/assets/travel_india.png",
    featured: true,
    description: "Discover India's famous Golden Triangle. Witness the sunrise over the marble Taj Mahal in Agra, and explore the royal palaces, astronomical observatories, and pink sandstone forts of royal Jaipur.",
    highlights: [
      "Sunrise guided tour of the majestic Taj Mahal",
      "Explore the UNESCO Amber Fort on jeep transfer",
      "Visit the royal Hawa Mahal (Palace of Winds) in Jaipur",
      "Private block-printing textile workshop",
      "Authentic Rajasthani royal thali dining feast"
    ],
    itinerary: [
      { day: 1, title: "Delhi Arrival & Agra Transfer", description: "Arrive in Delhi. Drive directly to Agra. Evening visit to Mehtab Bagh overlooking the Taj Mahal." },
      { day: 2, title: "Taj Mahal Sunrise & Agra Fort", description: "Sunrise visit to the Taj Mahal. Return to hotel for breakfast, then tour the sandstone Agra Fort. Drive to Jaipur in afternoon." },
      { day: 3, title: "Amber Fort & Jaipur Pink City", description: "Tour the massive Amber Fort on hill loops. Afternoon photo stops at Jal Mahal (Water Palace) and Hawa Mahal." },
      { day: 4, title: "City Palace & Jantar Mantar", description: "Visit the royal museum at City Palace. Explore the architectural sundials of Jantar Mantar observatory." },
      { day: 5, title: "Artisan Block Printing & Leisure", description: "Join a local workshop to learn traditional indigo textile hand-printing. Free afternoon for souvenir bazaars." },
      { day: 6, title: "Return to Delhi & Departure", description: "Drive back to Delhi airport for your return flight." }
    ],
    reviews: [
      { author: "Rajesh Kumar", rating: 5, date: "2026-05-15", comment: "The Taj Mahal at sunrise is a marvel. Our guide was very knowledgeable. Truly a royal experience!" }
    ]
  },
  {
    id: 14,
    title: "Goa Sun, Sand & Portuguese Heritage Escape",
    location: "Goa, India",
    price: 399,
    duration: 5,
    rating: 4.9,
    reviewsCount: 168,
    category: "Beach",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    description: "Relax on the sun-kissed golden beaches of Goa. Explore 16th-century Portuguese cathedrals in Old Goa, cruise along the Mandovi River at sunset, enjoy vibrant beach shacks, water sports, and fresh seafood delicacies.",
    highlights: [
      "Sunset luxury catamaran cruise on Mandovi River",
      "Guided tour of UNESCO World Heritage Basilica of Bom Jesus in Old Goa",
      "Water sports session: Parasailing, jet skiing & banana rides at Calangute",
      "Stroll through colorful Latin Quarter of Fontainhas in Panaji",
      "Candlelight beach shack dinner with fresh Goan fish curry & live music"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Goa & Beachside Welcome", description: "Arrive at Dabolim/MOPA airport, transfer to your seaside resort. Relax by the pool or stroll on Candolim beach. Sunset drinks." },
      { day: 2, title: "North Goa Beaches & Watersports", description: "Explore Baga, Calangute, and Anjuna beaches. Enjoy parasailing and jet-skiing, followed by a beachfront shack lunch." },
      { day: 3, title: "Old Goa Portuguese Heritage & Panaji", description: "Visit the historic Basilica of Bom Jesus and Se Cathedral. Walk through Fontainhas' vibrant yellow and blue colonial villas." },
      { day: 4, title: "Spice Plantation Tour & Mandovi Sunset Cruise", description: "Guided walk in a lush spice farm with traditional Goan lunch. In the evening, enjoy a cultural dance sunset cruise on Mandovi River." },
      { day: 5, title: "Leisure Morning & Departure", description: "Free time for shopping at local flea markets, checkout and transfer to airport." }
    ],
    reviews: [
      { author: "Rohan Varma", rating: 5, date: "2026-06-05", comment: "Goa was incredible! The Fontainhas walk felt like Portugal. Sunset cruise was so lively!" },
      { author: "Sneha Kapoor", rating: 4.9, date: "2026-06-20", comment: "Perfect beach holiday. The water sports were thrill-packed and the Goan fish curry was delicious." }
    ]
  },
  {
    id: 15,
    title: "Goa Luxury Beach Resort & Island Snorkeling",
    location: "South Goa, India",
    price: 549,
    duration: 6,
    rating: 4.8,
    reviewsCount: 89,
    category: "Beach",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    description: "Experience the tranquil side of South Goa. Stay in a luxury 5-star oceanfront resort, island hop to Grande Island for dolphin spotting and crystal-clear snorkeling, and unwind on serene coconut-fringed white beaches.",
    highlights: [
      "Boat trip to Grande Island with dolphin watching & snorkeling",
      "Relax on pristine, quiet white sand beaches of Palolem & Agonda",
      "Ayurvedic massage treatment at 5-star beach spa",
      "Visit Cabo de Rama Fort for panoramic Arabian Sea views",
      "Private beachfront BBQ dinner under the stars"
    ],
    itinerary: [
      { day: 1, title: "Arrival in South Goa", description: "Check into your private 5-star beachfront resort in Cavelossim. Evening cocktail by the infinity pool." },
      { day: 2, title: "Grande Island Dolphin & Snorkeling Expedition", description: "Early morning boat ride to Grande Island. Spot wild dolphins and snorkel along coral reefs." },
      { day: 3, title: "Palolem Beach & Cabo de Rama Fort", description: "Visit peaceful Palolem beach. Explore the historic cliffside Cabo de Rama Fort overlooking the sea." },
      { day: 4, title: "Ayurvedic Spa & Wellness Day", description: "Enjoy a rejuvenating 90-minute full-body Abhyanga Ayurvedic treatment followed by healthy coastal dining." },
      { day: 5, title: "Dudhsagar Waterfalls Trek", description: "Day excursion to the majestic four-tiered Dudhsagar Waterfalls inside Bhagwan Mahavir Wildlife Sanctuary." },
      { day: 6, title: "Checkout & Departure", description: "Final beach walk, checkout, and airport transfer." }
    ],
    reviews: [
      { author: "Vikram Malhotra", rating: 5, date: "2026-05-28", comment: "South Goa is paradise if you want peace and luxury. Spotting dolphins in the morning was magical." }
    ]
  }
,
  {
  "id": 16,
  "title": "Udaipur Venice of the East & Lake Palaces",
  "location": "Udaipur, Rajasthan, India",
  "price": 649,
  "duration": 5,
  "rating": 4.9,
  "reviewsCount": 156,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1609828913637-a0ea24a29a00?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Experience the fairy-tale romance of Udaipur. Sail across Lake Pichola, marvel at the sprawling City Palace, enjoy Rajasthani folk music at Bagore Ki Haveli, and stay like royalty in heritage havelis.",
  "highlights": [
    "Sunset boat cruise on Lake Pichola facing Jag Mandir Palace",
    "Guided tour of the magnificent City Palace museum complex",
    "Traditional Rajasthani Dharohar puppet & dance performance",
    "Stroll through Saheliyon Ki Bari royal maiden gardens",
    "Rooftop candlelit dinner overlooking illuminated Lake Pichola"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Udaipur & Sunset Cruise",
      "description": "Arrive in Udaipur. Check into your lake-facing heritage hotel. Evening boat ride on Lake Pichola as the sun sets over Jag Mandir."
    },
    {
      "day": 2,
      "title": "City Palace & Jagdish Temple",
      "description": "Explore City Palace's peacock courtyards, mirror halls, and balconies. Visit the 17th-century Jagdish Temple."
    },
    {
      "day": 3,
      "title": "Saheliyon Ki Bari & Folk Art Museum",
      "description": "Morning walk in Saheliyon Ki Bari gardens. Afternoon visit to Bhartiya Lok Kala Mandal museum and shopping for leather crafts."
    },
    {
      "day": 4,
      "title": "Monsoon Palace & Bagore Ki Haveli",
      "description": "Drive up to Sajjangarh Monsoon Palace for panoramic Aravalli views. Evening traditional dance show at Bagore Ki Haveli."
    },
    {
      "day": 5,
      "title": "Checkout & Departure",
      "description": "Breakfast overlooking the lake, checkout, and airport/station transfer."
    }
  ],
  "reviews": [
    {
      "author": "Devansh Roy",
      "rating": 5,
      "date": "2026-05-10",
      "comment": "Udaipur is breathtakingly romantic! The boat ride on Lake Pichola felt like a dream."
    }
  ]
},
  {
  "id": 17,
  "title": "Varanasi Ganges Spiritual Ganga Aarti & Heritage",
  "location": "Varanasi, Uttar Pradesh, India",
  "price": 429,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 210,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Discover the spiritual pulse of humanity in the world's oldest living city. Watch sunrise boat rituals on the sacred River Ganges, witness the mesmerizing evening Ganga Aarti at Dashashwamedh Ghat, and visit Sarnath.",
  "highlights": [
    "Sunrise wooden rowboat cruise along the historic Manikarnika & Assi Ghats",
    "VIP seats for the world-famous evening Ganga Aarti ceremony",
    "Guided heritage walking tour of narrow vibrant ancient lanes",
    "Day excursion to Sarnath Buddha Deer Park & Dhamek Stupa",
    "Taste authentic Banarasi Malaiyyo & famous Banarasi Paan"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Kashi & Evening Ganga Aarti",
      "description": "Arrive in Varanasi. Check into your heritage hotel near the ghats. Witness the spellbinding Ganga Aarti at Dashashwamedh Ghat."
    },
    {
      "day": 2,
      "title": "Sunrise Rowboat Cruise & Kashi Vishwanath",
      "description": "5:30 AM sunrise boat ride past ancient palaces along the Ganges. Visit the sacred Kashi Vishwanath Corridor temple."
    },
    {
      "day": 3,
      "title": "Sarnath Excursion & Silk Weaving Tour",
      "description": "Visit Sarnath where Buddha gave his first sermon. Afternoon tour of Banarasi saree silk weavers' workshop."
    },
    {
      "day": 4,
      "title": "Morning Ghat Stroll & Departure",
      "description": "Explore street food stalls at Godowlia crossing, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Arjun Singhania",
      "rating": 5,
      "date": "2026-04-14",
      "comment": "An deeply moving spiritual journey. The evening Aarti gave me chills. Truly divine experience."
    }
  ]
},
  {
  "id": 18,
  "title": "Leh Ladakh High Altitude Himalayan Odyssey",
  "location": "Leh & Ladakh, UT, India",
  "price": 899,
  "duration": 7,
  "rating": 5.0,
  "reviewsCount": 175,
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Embark on the ultimate high-altitude adventure across the Roof of the World. Cross Khardung La pass at 17,582ft, camp beside the turquoise waters of Pangong Tso, ride double-humped Bactrian camels in Nubra Valley, and visit ancient monasteries.",
  "highlights": [
    "Overnight luxury glamping camp beside Pangong Tso lake",
    "Drive across Khardung La, one of the world's highest motorable passes",
    "Double-humped Bactrian camel safari in Hunder Sand Dunes",
    "Explore the cliffside Thiksey & Hemis Buddhist Monasteries",
    "Witness the optical illusion at Magnetic Hill"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Leh & Acclimatization",
      "description": "Arrive at Kushok Bakula Rimpoche Airport. Rest all day for high altitude acclimatization. Evening walk at Leh Market."
    },
    {
      "day": 2,
      "title": "Leh Hall of Fame & Monasteries",
      "description": "Visit Hall of Fame military museum, Shanti Stupa, and Thiksey Monastery overlooking the Indus valley."
    },
    {
      "day": 3,
      "title": "Khardung La Pass to Nubra Valley",
      "description": "Drive over Khardung La (17,582 ft). Descend into Nubra Valley. Enjoy camel riding among Hunder Sand Dunes."
    },
    {
      "day": 4,
      "title": "Diskit Monastery & Drive to Pangong Lake",
      "description": "Visit 100ft Maitreya Buddha at Diskit Monastery. Drive along Shyok River to the mesmerizing blue Pangong Tso lake."
    },
    {
      "day": 5,
      "title": "Pangong Lake Sunrise & Return via Chang La",
      "description": "Watch sunrise over Pangong lake. Return to Leh crossing Chang La pass (17,590 ft)."
    },
    {
      "day": 6,
      "title": "Magnetic Hill & Sangam Confluence",
      "description": "Visit Magnetic Hill, Gurudwara Pathar Sahib, and the confluence of Indus and Zanskar rivers."
    },
    {
      "day": 7,
      "title": "Departure",
      "description": "Early morning flight out of Leh with unforgettable Himalayan memories."
    }
  ],
  "reviews": [
    {
      "author": "Kabir Thapar",
      "rating": 5,
      "date": "2026-06-12",
      "comment": "Pangong Tso changes colors throughout the day! Ladakh is a bucket list destination for everyone."
    }
  ]
},
  {
  "id": 19,
  "title": "Alleppey Backwaters Houseboat Cruise & Lagoon Stay",
  "location": "Alleppey, Kerala, India",
  "price": 479,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 134,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Glide through Kerala's tranquil backwaters on a traditional air-conditioned Kettuvallam houseboat. Cruise past emerald paddy fields, swaying coconut palm groves, and quiet fishing villages while enjoying fresh Keralite Karimeen fish curry.",
  "highlights": [
    "Overnight stay on a luxury private AC wooden Houseboat",
    "Shikara boat ride through narrow canals of Kuttanad village",
    "Freshly prepared Keralite Karimeen Pollichathu seafood lunch",
    "Sunset views over Vembanad Lake",
    "Ayurvedic massage at backwater lagoon resort"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Check-in on Houseboat & Backwater Cruise",
      "description": "Board your private houseboat at Alleppey jetty. Cruise through narrow palm-fringed palm canals. Candlelight dinner on board."
    },
    {
      "day": 2,
      "title": "Village Walk & Lagoon Resort Transfer",
      "description": "Morning village walk along paddy fields. Disembark houseboat and check into a luxury lakeside lagoon resort."
    },
    {
      "day": 3,
      "title": "Canoe Exploration & Ayurvedic Spa",
      "description": "Enjoy a country canoe boat ride through narrow canals. Afternoon relaxing 60-minute Ayurvedic spa massage."
    },
    {
      "day": 4,
      "title": "Marari Beach Visit & Departure",
      "description": "Morning visit to serene Marari beach, checkout and transfer to Cochin airport."
    }
  ],
  "reviews": [
    {
      "author": "Meera Joshi",
      "rating": 4.9,
      "date": "2026-05-18",
      "comment": "Sleeping on the houseboat on Vembanad lake was so serene! Food cooked by the boat chef was phenomenal."
    }
  ]
},
  {
  "id": 20,
  "title": "Rishikesh White Water Rafting",
  "location": "Rishikesh, Uttarakhand, India",
  "price": 389,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 145,
  "category": "Nature",
  "image": "/assets/rishikesh_rafting.png",
  "featured": true,
  "description": "Experience the ultimate white-water rafting adventure on the rushing emerald waters of the Holy Ganges. Conquer Grade III and IV rapids from Marine Drive to Shivpuri, cliff jump into cold mountain waters, and relax at riverside beach camps.",
  "highlights": [
    "16km & 26km Thrilling White Water Rafting through Grade III & IV Rapids",
    "Cliff Jumping & Body Surfing in the emerald waters of River Ganges",
    "Overnight Riverside Beach Camping under starry Himalayan skies",
    "Cross the iconic suspension bridges of Laxman Jhula & Ram Jhula",
    "Neer Garh Waterfall Trek & natural mountain pool dip"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Rishikesh & Riverside Camp",
      "description": "Arrive in Rishikesh. Check into your riverside beach camp near Shivpuri. Evening bonfire and beach volleyball."
    },
    {
      "day": 2,
      "title": "White Water Rafting & Cliff Jumping",
      "description": "Gear up with lifejackets and helmets. Conquer 16km Grade III rapids including Roller Coaster, Golf Course, and Double Trouble. Cliff jump from 25ft rock."
    },
    {
      "day": 3,
      "title": "Neer Garh Waterfall Hike & Kayaking",
      "description": "Trek up to Neer Garh waterfall for a refreshing mountain dip. Afternoon inflatable kayaking and body surfing on the Ganges."
    },
    {
      "day": 4,
      "title": "Laxman Jhula Walk & Departure",
      "description": "Walk across Laxman Jhula suspension bridge, souvenir shopping near Ram Jhula, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Siddharth Rao",
      "rating": 5,
      "date": "2026-06-02",
      "comment": "Rafting down the Grade III rapids was an absolute rush! Cliff jumping into the Ganga was exhilarating."
    }
  ]
},
  {
  "id": 21,
  "title": "Jaisalmer Golden Fort & Thar Desert Safari",
  "location": "Jaisalmer, Rajasthan, India",
  "price": 529,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 105,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1579282240050-352db0a14c21?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Step into a Arabian Nights fantasy in the Golden City of Jaisalmer. Explore the living golden sandstone fort, ride camels across Sam Sand Dunes, stay in luxury desert camps under starry skies, and marvel at intricate Patwon Ki Haveli.",
  "highlights": [
    "Overnight luxury Swiss tent stay in Sam Sand Dunes with dune bashing",
    "Sunset camel safari across golden Thar Desert dunes",
    "Guided tour of Jaisalmer Fort (Son\u76f8\u90bb Fort), a living UNESCO fort",
    "Marvel at carved stone facades of Patwon Ki Haveli and Nathmal Ki Haveli",
    "Rajasthani Kalbelia folk dance performance with bonfire dinner"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & Jaisalmer Fort Walk",
      "description": "Arrive in Jaisalmer, check in. Walk through the golden cobbled streets of Sonar Quila inside the living fort."
    },
    {
      "day": 2,
      "title": "Havelis & Transfer to Desert Camp",
      "description": "Visit Patwon Ki Haveli and Gadisar Lake. Afternoon drive to Sam Sand Dunes. Sunset camel ride and desert camp night."
    },
    {
      "day": 3,
      "title": "Thar Dune Bashing & Kuldhara Ghost Village",
      "description": "Morning 4x4 Jeep dune bashing. Visit the mystery ghost village of Kuldhara on your return to Jaisalmer town."
    },
    {
      "day": 4,
      "title": "Gadisar Sunset & Departure",
      "description": "Morning souvenir shopping for embroidered Rajasthani textiles, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Nikhil Agarwal",
      "rating": 4.9,
      "date": "2026-03-22",
      "comment": "Camping under the clear starry sky in Thar desert was unforgettable. Jaisalmer fort is magnificent!"
    }
  ]
},
  {
  "id": 22,
  "title": "Jodhpur Blue City & Mehrangarh Fort Royalty",
  "location": "Jodhpur, Rajasthan, India",
  "price": 499,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 94,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1562670652-e5947ebd8355?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Immerse yourself in the majestic Blue City of Jodhpur. Stand atop the colossal Mehrangarh Fort towering over indigo-painted houses, stroll through Jaswant Thada marble cenotaphs, and savour world-famous Makhaniya Lassi.",
  "highlights": [
    "Audio-guided tour of colossal Mehrangarh Fort cliffside complex",
    "Walking tour through the maze of blue-painted houses in Navchokiya",
    "Visit white marble Jaswant Thada memorial & Umaid Bhawan Palace",
    "Zip-lining (Flying Fox) experience across Mehrangarh fort ramparts",
    "Taste famous Jodhpuri Mirchi Vada & Makhaniya Lassi at Clock Tower"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Jodhpur & Clock Tower Market",
      "description": "Arrive in Jodhpur. Check into your heritage haveli hotel. Evening stroll around Sardar Market and Ghanta Ghar."
    },
    {
      "day": 2,
      "title": "Mehrangarh Fort & Blue City Walk",
      "description": "Explore Mehrangarh Fort, view palace armories and palanquins. Guided heritage walk through blue alleys of Navchokiya."
    },
    {
      "day": 3,
      "title": "Jaswant Thada & Umaid Bhawan Museum",
      "description": "Visit marble Jaswant Thada. Afternoon tour of Umaid Bhawan Palace vintage car collection and museum."
    },
    {
      "day": 4,
      "title": "Bishnoi Village Excursion & Departure",
      "description": "Morning safari to Bishnoi village to see blackbucks and traditional potters. Checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Tanvi Shah",
      "rating": 4.8,
      "date": "2026-04-18",
      "comment": "Mehrangarh Fort is one of the most impressive forts in the world. The blue town views from top are iconic!"
    }
  ]
},
  {
  "id": 23,
  "title": "Ranthambore Royal Bengal Tiger Wilderness Safari",
  "location": "Ranthambore, Rajasthan, India",
  "price": 579,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 112,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Venture into the legendary hunting grounds of Maharajas in search of the elusive Royal Bengal Tiger. Ride open 4x4 Jeeps through dry deciduous forests, ruined fort arches, and lakes filled with crocodiles.",
  "highlights": [
    "2 Open 4x4 Jeep / Canter Safaris in prime tiger tracking zones",
    "Hike up to the ancient 10th-century Ranthambore Fort hilltop",
    "Spot tigers, leopards, sloth bears, sambar deer & marsh crocodiles",
    "Stay in a luxury jungle safari lodge with pool",
    "Visit Trinetra Ganesha Temple inside Ranthambore Fort"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Sawai Madhopur & Lodge Check-in",
      "description": "Arrive, check into your luxury wilderness resort. Briefing by naturalist guide. Evening high tea by bonfire."
    },
    {
      "day": 2,
      "title": "Morning & Afternoon Jungle Safaris",
      "description": "Early morning 6:00 AM Jeep safari into core tiger zones. Return for breakfast. Afternoon 2:30 PM safari for wildlife spotting."
    },
    {
      "day": 3,
      "title": "Ranthambore Fort Trek & Bird Watching",
      "description": "Trek up to Ranthambore Fort, enjoying views of Padam Talao lake. Spot migratory birds at Surwal Lake."
    },
    {
      "day": 4,
      "title": "Final Morning Safari & Departure",
      "description": "Optional morning mini-safari, breakfast, checkout and transfer to Sawai Madhopur railway station."
    }
  ],
  "reviews": [
    {
      "author": "Sameer Kulkarni",
      "rating": 5,
      "date": "2026-05-04",
      "comment": "We saw tigress Riddhi with her cubs on our second safari! Thrill of a lifetime!"
    }
  ]
},
  {
  "id": 24,
  "title": "Wayanad Spice Plantations & Edakkal Cave Trek",
  "location": "Wayanad, Kerala, India",
  "price": 429,
  "duration": 4,
  "rating": 4.7,
  "reviewsCount": 86,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Escape to the green mist of Wayanad in the Western Ghats. Trek to prehistoric cave carvings at Edakkal Caves, walk through aromatic spice and coffee plantations, Zip-line over tea gardens, and view Banasura Sagar Dam.",
  "highlights": [
    "Trek to 7,000-year-old Neolithic rock carvings at Edakkal Caves",
    "Boating on Banasura Sagar Dam, India's largest earth dam",
    "Guided walk through cardamom, pepper, and coffee plantations",
    "Longest South India Zip-line over lush tea estates",
    "View Sentinel Rock (Soochipara) Waterfalls"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Wayanad & Resort Check-in",
      "description": "Drive up the 9 hairpin curves from Kozhikode to Wayanad. Check into your treehouse or plantation resort."
    },
    {
      "day": 2,
      "title": "Edakkal Caves & Heritage Museum",
      "description": "Hike up Ambukuthi Mala to explore Edakkal Caves' Neolithic petroglyphs. Afternoon visit Wayanad Heritage Museum."
    },
    {
      "day": 3,
      "title": "Banasura Dam & Soochipara Waterfalls",
      "description": "Speedboat ride on Banasura Sagar Dam reservoir. Afternoon trek down to Soochipara Waterfalls for a bath."
    },
    {
      "day": 4,
      "title": "Spice Shopping & Departure",
      "description": "Buy fresh Wayanad pepper, cardamom, and wild honey, checkout and transfer back to Kozhikode."
    }
  ],
  "reviews": [
    {
      "author": "Nisha Thomas",
      "rating": 4.8,
      "date": "2026-06-11",
      "comment": "Staying in a treehouse surrounded by misty coffee plantations was magical."
    }
  ]
},
  {
  "id": 25,
  "title": "Varkala Cliff Beach & Black Sand Retreat",
  "location": "Varkala, Kerala, India",
  "price": 389,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 98,
  "category": "Beach",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Unwind on the dramatic red cliffs overlooking the Arabian Sea in Varkala. Relax on Papanasam Beach, try cliffside yoga, surf gentle waves, dine at boho cafes, and visit the 2,000-year-old Janardanaswamy Temple.",
  "highlights": [
    "Dramatic red cliffside sunset walk overlooking the ocean",
    "Surfing lessons at Black Sand Beach",
    "Daily cliffside yoga & meditation sessions",
    "Visit 2,000-year-old Janardanaswamy Temple",
    "Dine at Bohemian clifftop cafes serving fresh seafood & smoothie bowls"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Varkala & Cliff Walk",
      "description": "Arrive via Trivandrum. Check into your clifftop boutique resort. Sunset walk along Varkala North Cliff."
    },
    {
      "day": 2,
      "title": "Papanasam Beach & Surfing Lesson",
      "description": "Morning surf session on Black Sand beach. Dip in Papanasam sacred spring waters believed to wash away sins."
    },
    {
      "day": 3,
      "title": "Janardanaswamy Temple & Kappil Lake",
      "description": "Visit Janardanaswamy Temple. Afternoon drive to Kappil Lake where backwaters meet the sea."
    },
    {
      "day": 4,
      "title": "Ayurvedic Massage & Departure",
      "description": "Rejuvenating coastal massage, checkout and transfer to Trivandrum airport."
    }
  ],
  "reviews": [
    {
      "author": "David Smith",
      "rating": 4.9,
      "date": "2026-05-25",
      "comment": "Varkala cliff is easily one of the coolest beach spots in Asia. Incredible sunset views!"
    }
  ]
},
  {
  "id": 26,
  "title": "Coorg Coffee Country & Abbey Falls Retreat",
  "location": "Coorg (Kodagu), Karnataka, India",
  "price": 419,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 115,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Escape to the Scotland of India. Immerse yourself in fragrant Arabica coffee plantations, feed gentle elephants at Dubare Elephant Camp, marvel at Abbey Falls, and visit the golden Namdroling Tibetan Monastery.",
  "highlights": [
    "Stay inside a sprawling 200-acre private coffee & spice estate",
    "Interact with & bathe elephants at Dubare Elephant Camp",
    "Marvel at the roaring Abbey Falls nestled in dense green canopy",
    "Visit Namdroling Tibetan Monastery (Golden Temple) in Bylakuppe",
    "Sunset views from Raja's Seat amphitheater garden"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Coorg & Estate Walk",
      "description": "Drive from Mysore/Bangalore into Coorg. Check into your coffee estate resort. Guided plantation walk."
    },
    {
      "day": 2,
      "title": "Dubare Elephants & Golden Temple",
      "description": "Morning visit to Dubare Elephant Camp along Cauvery river. Afternoon tour of Namdroling Tibetan Golden Temple."
    },
    {
      "day": 3,
      "title": "Abbey Falls & Raja's Seat Sunset",
      "description": "Visit Abbey Falls suspension bridge. Tour Madikeri Fort. Watch musical fountain sunset at Raja's Seat."
    },
    {
      "day": 4,
      "title": "Coffee Tasting & Departure",
      "description": "Fresh coffee tasting session, buy homemade Coorg wines and spices, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Preeti Saxena",
      "rating": 4.8,
      "date": "2026-06-08",
      "comment": "The aroma of blooming coffee flowers was heavenly. Dubare elephant camp was super fun for kids!"
    }
  ]
},
  {
  "id": 27,
  "title": "Gokarna Om Beach & Cliff Trek Expedition",
  "location": "Gokarna, Karnataka, India",
  "price": 369,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 88,
  "category": "Beach",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Trek along rugged sea cliffs connecting Gokarna's pristine beaches shaped like spiritual symbols. Hike from Kudle Beach to Om Beach, Half Moon Beach, and Paradise Beach, and visit the ancient Mahabaleshwar Temple.",
  "highlights": [
    "Famous 5-Beach Cliff Trek: Kudle, Om, Half Moon, Paradise & Gokarna beach",
    "Visit 4th-century Mahabaleshwar Temple with Atmalinga",
    "Watch dolphins from Om Beach cliff viewpoints",
    "Beach camping & bonfire night under the stars",
    "Flea market shopping at Kudle Beach"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Gokarna & Kudle Sunset",
      "description": "Arrive in Gokarna, check into your beach resort/cottage. Relax on Kudle Beach and watch sunset."
    },
    {
      "day": 2,
      "title": "Gokarna 5-Beach Cliff Trek",
      "description": "Guided trek starting from Kudle Beach, crossing Om Beach (shaped like 'Om'), Half Moon, to secluded Paradise Beach."
    },
    {
      "day": 3,
      "title": "Mahabaleshwar Temple & Water Sports",
      "description": "Visit sacred Mahabaleshwar temple. Afternoon jet-skiing and banana boat rides on Om Beach."
    },
    {
      "day": 4,
      "title": "Mirjan Fort Excursion & Departure",
      "description": "Visit 16th-century moss-covered Mirjan Fort, checkout and departure."
    }
  ],
  "reviews": [
    {
      "author": "Rahul Dravid",
      "rating": 4.9,
      "date": "2026-05-14",
      "comment": "Gokarna beach trek is India's best coastal hike. Half Moon beach is completely secluded and gorgeous."
    }
  ]
},
  {
  "id": 28,
  "title": "Hampi UNESCO Boulder Ruins & Vijayanagara Heritage",
  "location": "Hampi, Karnataka, India",
  "price": 449,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 145,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Step into a surreal open-air museum of giant granite boulders and 14th-century Vijayanagara empire ruins. Explore the iconic Stone Chariot at Vittala Temple, coracle boat rides across Tungabhadra River, and sunsets from Matanga Hill.",
  "highlights": [
    "Iconic Stone Chariot & musical pillars at UNESCO Vittala Temple",
    "Traditional round Coracle boat ride on Tungabhadra River",
    "Sunrise panoramic view over boulder landscapes from Matanga Hill",
    "Explore Lotus Mahal, Elephant Stables & Royal Enclosure",
    "Bouldering & cafe hopping on Hippie Island"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Hampi & Virupaksha Temple",
      "description": "Arrive in Hampi. Check in. Visit 7th-century active Virupaksha Temple and meet Lakshmi the temple elephant."
    },
    {
      "day": 2,
      "title": "Vittala Temple & Royal Center",
      "description": "Tour the iconic Stone Chariot at Vittala Temple. Visit Lotus Mahal, Queen's Bath, and Elephant Stables."
    },
    {
      "day": 3,
      "title": "Matanga Sunrise & Coracle Boat Ride",
      "description": "Sunrise hike up Matanga Hill for 360-degree views. Afternoon coracle boat ride across Tungabhadra river to Anegundi."
    },
    {
      "day": 4,
      "title": "Monolith Statues & Departure",
      "description": "Visit Kadalekalu Ganesha and Lakshmi Narasimha monolithic statues, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Akash Verma",
      "rating": 5,
      "date": "2026-04-02",
      "comment": "Hampi looks like another planet! The boulder landscapes at sunset from Matanga hill left me speechless."
    }
  ]
},
  {
  "id": 29,
  "title": "Andaman Radhanagar Beach & Scuba Diving Haven",
  "location": "Havelock Island, Andaman, India",
  "price": 999,
  "duration": 6,
  "rating": 5.0,
  "reviewsCount": 188,
  "category": "Beach",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Escape to Asia's best beach in the Andaman Islands. Walk on powder-white sands of Radhanagar Beach, scuba dive among vibrant coral reefs & sea turtles at Elephant Beach, and visit historical Cellular Jail in Port Blair.",
  "highlights": [
    "Relax on Radhanagar Beach (Beach No. 7), rated Asia's Best Beach",
    "Introductory Scuba Diving session with certified PADI instructors",
    "Snorkeling & glass-bottom boat ride at Elephant Beach",
    "Makruzz catamaran cruise between Port Blair & Havelock Island",
    "Light & Sound Show at historic Cellular Jail in Port Blair"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Port Blair Arrival & Cellular Jail",
      "description": "Arrive at Port Blair. Check in. Afternoon tour of Cellular Jail and evening Light & Sound show."
    },
    {
      "day": 2,
      "title": "Catamaran Ferry to Havelock Island",
      "description": "Board high-speed Makruzz AC catamaran to Havelock Island. Afternoon check-in at luxury beach resort. Sunset at Radhanagar Beach."
    },
    {
      "day": 3,
      "title": "Scuba Diving & Elephant Beach Watersports",
      "description": "Morning PADI scuba dive among tropical fish and sea turtles. Speedboat to Elephant beach for coral snorkeling."
    },
    {
      "day": 4,
      "title": "Kalapathar Beach & Kayaking",
      "description": "Visit picturesque Kalapathar Beach with black rocks. Evening bioluminescent night kayaking tour."
    },
    {
      "day": 5,
      "title": "Return to Port Blair & Chidiyatapu Sunset",
      "description": "Ferry back to Port Blair. Sunset view at Chidiyatapu (Bird Island)."
    },
    {
      "day": 6,
      "title": "Departure",
      "description": "Breakfast at hotel, airport transfer with incredible island memories."
    }
  ],
  "reviews": [
    {
      "author": "Shreyas Iyer",
      "rating": 5,
      "date": "2026-03-30",
      "comment": "Radhanagar beach is pure heaven. Turquoise water, white sand, and lush mahua trees. Best beach trip ever!"
    }
  ]
},
  {
  "id": 30,
  "title": "Pondicherry French Quarter & Promenade Coast",
  "location": "Pondicherry, India",
  "price": 379,
  "duration": 4,
  "rating": 4.7,
  "reviewsCount": 102,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Experience French Riviera charm in India. Cycle past mustard-yellow colonial villas in White Town, visit the experimental township of Auroville and Matrimandir dome, and enjoy french pastries at oceanfront Promenade cafes.",
  "highlights": [
    "Guided vintage bicycle tour of French Quarter (White Town)",
    "Day excursion to Auroville & Matrimandir golden globe viewing point",
    "Evening stroll along 1.5km oceanfront Rock Beach Promenade",
    "French bakery tour: Fresh baguettes, croissants & crepes",
    "Visit Sri Aurobindo Ashram & Serenity Beach surfing"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Pondicherry & Promenade Walk",
      "description": "Drive from Chennai. Check into your heritage French hotel in White Town. Evening walk along Rock Beach Promenade."
    },
    {
      "day": 2,
      "title": "White Town Cycle Tour & French Bakeries",
      "description": "Morning bicycle tour past French street names and pastel villas. Stop at Baker's Street for fresh croissants and coffee."
    },
    {
      "day": 3,
      "title": "Auroville & Matrimandir Experience",
      "description": "Visit the universal township of Auroville. Walk through green paths to view the golden Matrimandir dome. Afternoon surf lesson at Serenity Beach."
    },
    {
      "day": 4,
      "title": "Chidambaram / Shopping & Departure",
      "description": "Buy handmade paper products and incense sticks, checkout and transfer back to Chennai."
    }
  ],
  "reviews": [
    {
      "author": "Camille Laurent",
      "rating": 4.8,
      "date": "2026-05-19",
      "comment": "Pondicherry felt like a slice of Southern France in India. Loved the cafes and serene beaches!"
    }
  ]
},
  {
  "id": 31,
  "title": "Kodaikanal Star Lake & Pillar Rocks Hill Escape",
  "location": "Kodaikanal, Tamil Nadu, India",
  "price": 419,
  "duration": 4,
  "rating": 4.7,
  "reviewsCount": 79,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Unwind in the Princess of Hill Stations. Pedal around the star-shaped Kodai Lake, walk through pine forest canopies, marvel at the 400ft vertical Pillar Rocks, and visit Coaker's Walk for misty valley views.",
  "highlights": [
    "Shikara boating & cycling around star-shaped Kodai Lake",
    "Panoramic mist views from Coaker's Walk edge",
    "Marvel at 400-foot vertical granite Pillar Rocks",
    "Pine Forest walk featured in classic Indian cinema",
    "Taste famous handmade Kodai chocolates & eucalyptus oils"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Kodai & Lake Boating",
      "description": "Drive up the Western Ghats from Madurai. Check in. Evening pedalo boating on Kodai Star Lake."
    },
    {
      "day": 2,
      "title": "Pillar Rocks & Pine Forest",
      "description": "Visit 400ft Pillar Rocks, Guna Caves, and walk under soaring canopy of Pine Forest."
    },
    {
      "day": 3,
      "title": "Coaker's Walk & Bryant Park",
      "description": "Morning walk along Coaker's Walk for valley views. Tour Bryant Park gardens and Bear Shola Falls."
    },
    {
      "day": 4,
      "title": "Fudge Shopping & Departure",
      "description": "Buy fresh homemade chocolates, checkout and transfer back to Madurai."
    }
  ],
  "reviews": [
    {
      "author": "Vishal Sundaram",
      "rating": 4.7,
      "date": "2026-04-28",
      "comment": "Cool crisp mountain air and beautiful pine forests. The lake ride at sunset was so peaceful."
    }
  ]
},
  {
  "id": 32,
  "title": "Madurai Meenakshi Temple & Tamil Heritage",
  "location": "Madurai, Tamil Nadu, India",
  "price": 349,
  "duration": 3,
  "rating": 4.9,
  "reviewsCount": 110,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Explore one of South India's oldest continuously inhabited cities. Admire the 14 towering colorful Gopuram towers of Meenakshi Amman Temple, visit Thirumalai Nayakkar Palace, and feast on iconic Jigarthanda & Madurai Dosa.",
  "highlights": [
    "Guided tour of iconic Meenakshi Amman Temple & 1,000 Pillar Hall",
    "Witness the night ceremony of Lord Shiva & Parvati at Meenakshi Temple",
    "Explore 17th-century Italian-style Thirumalai Nayakkar Palace",
    "Taste famous Madurai Jigarthanda cold drink & Kari Dosa",
    "Heritage rickshaw tour of banana & flower markets"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Madurai & Temple Evening",
      "description": "Arrive in Madurai, check in. Evening visit to Meenakshi Amman Temple to witness the night procession ceremony."
    },
    {
      "day": 2,
      "title": "Meenakshi Temple Architecture & Palace",
      "description": "Explore 1,000 Pillar Hall and sacred temple tank. Afternoon tour of Thirumalai Nayakkar Palace and sound show."
    },
    {
      "day": 3,
      "title": "Local Markets & Departure",
      "description": "Morning flower market walk, sample famous Madurai Jigarthanda drink, checkout and transfer to airport."
    }
  ],
  "reviews": [
    {
      "author": "Karthik Subramanian",
      "rating": 5,
      "date": "2026-05-01",
      "comment": "Meenakshi temple towers are an architectural marvel! The intricate carvings are beyond belief."
    }
  ]
},
  {
  "id": 33,
  "title": "Kaziranga One-Horned Rhino Wildlife Jeep Safari",
  "location": "Kaziranga, Assam, India",
  "price": 549,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 96,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Journey to the UNESCO World Heritage grasslands of Kaziranga, home to two-thirds of the world's Great One-Horned Rhinoceros. Spot rhinos, wild water buffaloes, Asian elephants, and royal tigers along the Brahmaputra floodplain.",
  "highlights": [
    "2 Open 4x4 Jeep Safaris across Central & Western safari ranges",
    "Spot Great One-Horned Rhinos grazing in elephant tall grass",
    "Cultural Bihu dance performance with Assamese ethnic dinner",
    "Visit Kaziranga National Orchid & Biodiversity Park",
    "Tea tasting walk in surrounding Assam tea gardens"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Guwahati & Drive to Kaziranga",
      "description": "Drive from Guwahati along Brahmaputra river to Kaziranga. Check into your safari lodge. Evening Bihu cultural dance."
    },
    {
      "day": 2,
      "title": "Central & Western Range Jeep Safaris",
      "description": "Morning 4x4 Jeep safari in Kohora (Central) range to spot rhinos and wild buffaloes. Afternoon safari in Bagori range."
    },
    {
      "day": 3,
      "title": "Orchid Park & Assam Tea Garden Walk",
      "description": "Visit Kaziranga Orchid Park featuring 500+ indigenous orchid species. Afternoon tea garden walk and tasting."
    },
    {
      "day": 4,
      "title": "Departure",
      "description": "Breakfast at lodge, checkout and drive back to Guwahati airport."
    }
  ],
  "reviews": [
    {
      "author": "Debabrata Baruah",
      "rating": 5,
      "date": "2026-03-18",
      "comment": "We saw over 15 One-Horned Rhinos up close! Kaziranga's grasslands are truly magical."
    }
  ]
},
  {
  "id": 34,
  "title": "Cherrapunji Living Root Bridges & Meghalaya Waterfalls",
  "location": "Shillong & Cherrapunji, Meghalaya, India",
  "price": 529,
  "duration": 5,
  "rating": 4.9,
  "reviewsCount": 114,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Explore the Abode of Clouds in Northeast India. Trek to the ancient bio-engineered Double Decker Living Root Bridge in Nongriat, boat on the crystal-clear Dawki River, and view roaring Nohkalikai Waterfalls.",
  "highlights": [
    "Trek down to the UNESCO Double Decker Living Root Bridge in Nongriat",
    "Boating on Umngot River in Dawki, where boats float on glass-like transparent water",
    "Marvel at Nohkalikai Falls, India's tallest plunge waterfall (1,115 ft)",
    "Explore the limestone formations inside Mawsmai & Arwah Caves",
    "Walk along Shillong's cozy Police Bazar cafes"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Guwahati to Shillong & Umiam Lake",
      "description": "Arrive in Guwahati, drive up to Shillong. Stop at scenic Umiam Lake (Barapani). Check into Shillong hotel."
    },
    {
      "day": 2,
      "title": "Shillong to Cherrapunji & Nohkalikai Falls",
      "description": "Drive to Cherrapunji (Sohra). View Nohkalikai Falls, Seven Sisters Falls, and explore Mawsmai Cave."
    },
    {
      "day": 3,
      "title": "Nongriat Double Decker Living Root Bridge Trek",
      "description": "Descend 3,000 steps into the Khasi rainforest to behold the 200-year-old Double Decker Root Bridge. Swim in natural turquoise pools."
    },
    {
      "day": 4,
      "title": "Dawki Transparent River & Mawlynnong",
      "description": "Visit Mawlynnong (Asia's cleanest village). Boat ride on glass-like clear Umngot River in Dawki bordering Bangladesh."
    },
    {
      "day": 5,
      "title": "Return to Guwahati & Departure",
      "description": "Drive back to Guwahati for your return flight."
    }
  ],
  "reviews": [
    {
      "author": "Pranjal Dutta",
      "rating": 5,
      "date": "2026-05-22",
      "comment": "Dawki river is so clear you can see the boat shadow on the riverbed! Meghalaya is pure paradise."
    }
  ]
},
  {
  "id": 35,
  "title": "Tawang Himalayan Monastery & Sela Pass Expedition",
  "location": "Tawang, Arunachal Pradesh, India",
  "price": 699,
  "duration": 6,
  "rating": 4.9,
  "reviewsCount": 82,
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Travel to the remote Eastern Himalayas. Cross Sela Pass at 13,700ft beside frozen lakes, visit Tawang Monastery (India's largest Buddhist monastery), marvel at Madhuri Lake (Sangetsar Tso), and honor heroes at Tawang War Memorial.",
  "highlights": [
    "Visit Tawang Monastery (Galden Namgey Lhatse), India's largest monastery",
    "Cross snow-covered Sela Pass (13,700 ft) & Sela Lake",
    "Excursion to high-altitude Sangetsar Tso (Madhuri Lake)",
    "Marvel at Nuranang (Jang) Waterfall cascading down mountain cliffs",
    "Warm up with traditional Monpa tea & momos"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Guwahati to Tezpur / Dirang",
      "description": "Arrive in Guwahati, drive up into Arunachal foothills to Dirang. Visit kiwi orchards."
    },
    {
      "day": 2,
      "title": "Dirang to Tawang via Sela Pass",
      "description": "Ascend through pine forests to Sela Pass (13,700 ft). View Sela Lake. Stop at Jaswant Garh memorial. Arrive in Tawang."
    },
    {
      "day": 3,
      "title": "Tawang Monastery & War Memorial",
      "description": "Explore 400-year-old Tawang Monastery housing 800+ monks. Evening Light & Sound show at Tawang War Memorial."
    },
    {
      "day": 4,
      "title": "Sangetsar (Madhuri Lake) & Bum La Pass",
      "description": "Drive up to high-altitude Sangetsar Lake surrounded by dead tree trunks in water. View Indo-China border at Bum La."
    },
    {
      "day": 5,
      "title": "Tawang to Bomdila & Nuranang Falls",
      "description": "Visit roaring Nuranang Waterfall. Drive to Bomdila and explore Bomdila Monastery."
    },
    {
      "day": 6,
      "title": "Bomdila to Guwahati Departure",
      "description": "Descend back to Guwahati airport for your onward flight."
    }
  ],
  "reviews": [
    {
      "author": "Tenzing Norbu",
      "rating": 5,
      "date": "2026-04-10",
      "comment": "Tawang monastery feels closer to heaven. Sela pass snow views were breathtaking!"
    }
  ]
},
  {
  "id": 36,
  "title": "Gangtok & Nathula Pass Himalayan Gateway",
  "location": "Gangtok, Sikkim, India",
  "price": 549,
  "duration": 5,
  "rating": 4.8,
  "reviewsCount": 130,
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1557995167-9d7a2283083b?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Discover the cleanest state in India nestled under Mt. Kanchenjunga. Visit high-altitude Tsomgo (Changu) Lake, cross Nathula Pass on the Silk Route (14,140ft), tour Rumtek Monastery, and stroll along pedestrian MG Marg.",
  "highlights": [
    "Excursion to glacial Tsomgo (Changu) Lake & Baba Mandir at 12,400ft",
    "Visit Indo-China border post at historic Nathula Pass (14,140ft)",
    "Explore Rumtek Monastery, seat of the Karma Kagyu lineage",
    "Scenic cable car ropeway ride over Gangtok valley",
    "Evening pedestrian stroll & momo tasting on MG Marg"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Bagdogra to Gangtok & MG Marg",
      "description": "Drive along Teesta river to Gangtok. Check in. Evening stroll along flower-decked MG Marg pedestrian mall."
    },
    {
      "day": 2,
      "title": "Tsomgo Lake & Nathula Pass",
      "description": "Excursion to glacial Tsomgo Lake. Ride yaks on snowbanks. Continue to Baba Mandir and Indo-China border at Nathula Pass."
    },
    {
      "day": 3,
      "title": "Gangtok City Tour & Rumtek Monastery",
      "description": "Visit Rumtek Monastery, Enchey Monastery, Ganesh Tok viewpoint, and Sikkim Handicraft Center."
    },
    {
      "day": 4,
      "title": "Cable Car & Ban Jhakri Waterfalls",
      "description": "Take Gangtok cable car ropeway. Visit Ban Jhakri Energy Park & Waterfalls and Flower Exhibition Center."
    },
    {
      "day": 5,
      "title": "Departure",
      "description": "Drive back to Bagdogra airport / NJP station."
    }
  ],
  "reviews": [
    {
      "author": "Shruti Rai",
      "rating": 4.9,
      "date": "2026-05-16",
      "comment": "Tsomgo lake surrounded by snow peaks was stunning. Gangtok is so clean and peaceful!"
    }
  ]
},
  {
  "id": 37,
  "title": "Spiti Valley High Altitude Cold Desert Expedition",
  "location": "Spiti Valley, Himachal Pradesh, India",
  "price": 799,
  "duration": 7,
  "rating": 5.0,
  "reviewsCount": 94,
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Embark on an epic road trip through the Middle Land between Tibet and India. Visit 1,000-year-old Key Monastery perched on cliffs, camp by crescent-shaped Chandratal Lake, post a letter from Hikkim (world's highest post office), and cross Kunzum Pass.",
  "highlights": [
    "Overnight camping beside crescent-shaped Chandratal (Moon Lake) at 14,100ft",
    "Explore 1,000-year-old Key Monastery perched on a steep conical hill",
    "Post a postcard from Hikkim (14,567ft), world's highest post office",
    "Visit Komic village (15,027ft), one of the world's highest motorable villages",
    "Cross high Himalayan Kunzum Pass (15,060ft)"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Manali to Kaza via Atal Tunnel & Kunzum Pass",
      "description": "Drive through Atal Tunnel, cross rugged Batal and Kunzum Pass (15,060 ft). Arrive in Kaza (12,500 ft)."
    },
    {
      "day": 2,
      "title": "Key Monastery & Kibber Village",
      "description": "Explore iconic Key Monastery. Visit Kibber village (snow leopard habitat) and cross Chicham Bridge (highest bridge in Asia)."
    },
    {
      "day": 3,
      "title": "Hikkim, Komic & Langza Fossil Village",
      "description": "Visit Hikkim post office. Drive to Komic monastery and Langza village featuring giant Buddha statue and prehistoric marine fossils."
    },
    {
      "day": 4,
      "title": "Dhankar Monastery & Tabo 1000-year-old Murals",
      "description": "Visit cliffside Dhankar Monastery. Excursion to Tabo Monastery, known as the Ajanta of the Himalayas."
    },
    {
      "day": 5,
      "title": "Kaza to Chandratal Lake Camp",
      "description": "Drive to Chandratal Lake. 2km walk to the crystal-clear Moon Lake. Overnight camping in Swiss tents."
    },
    {
      "day": 6,
      "title": "Chandratal to Manali Return",
      "description": "Drive back across Rohtang/Atal Tunnel to Manali. Check in and rest."
    },
    {
      "day": 7,
      "title": "Departure",
      "description": "Checkout from Manali and onward journey home."
    }
  ],
  "reviews": [
    {
      "author": "Stanzin Dorje",
      "rating": 5,
      "date": "2026-06-19",
      "comment": "Spiti is raw, wild, and awe-inspiring. Posting a letter from Hikkim was a dream accomplishment!"
    }
  ]
},
  {
  "id": 38,
  "title": "Dharamshala & Triund Himalayan Ridge Trek",
  "location": "Dharamshala & Mcleodganj, HP, India",
  "price": 449,
  "duration": 5,
  "rating": 4.8,
  "reviewsCount": 128,
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Discover Little Lhasa in the Dhauladhar mountains. Visit the official residence of H.H. The Dalai Lama, trek to the stunning Triund ridge facing snow peaks, stroll through Kangra tea gardens, and relax in Tibetan cafes.",
  "highlights": [
    "Overnight camping trek to Triund Ridge (9,350ft) facing Dhauladhar snow wall",
    "Visit Tsuglagkhang Complex (Dalai Lama Temple & Namgyal Monastery)",
    "Explore Bhagsu Waterfall & historic St. John in the Wilderness Church",
    "Tour HPCA Dharamshala Cricket Stadium, world's most scenic venue",
    "Tibetan momo & Thukpa food tasting tour in Mcleodganj"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Mcleodganj & Dalai Lama Temple",
      "description": "Arrive in Mcleodganj. Check into your mountain hotel. Visit Dalai Lama Temple complex and spin prayer wheels."
    },
    {
      "day": 2,
      "title": "Triund Ridge Trek (Ascent)",
      "description": "9km trek starting from Gallu Devi Temple up to Triund Ridge. Breathtaking views of Dhauladhar range. Overnight ridge camping."
    },
    {
      "day": 3,
      "title": "Triund Sunrise & Descent to Bhagsu",
      "description": "Watch sunrise over snow peaks. Descend back to Mcleodganj. Visit Bhagsu Waterfall and Bhagsunath Temple."
    },
    {
      "day": 4,
      "title": "Dharamshala Cricket Stadium & Kangra Tea",
      "description": "Visit scenic HPCA Cricket Stadium. Tour Norbulingka Institute for Tibetan arts and Kangra tea gardens."
    },
    {
      "day": 5,
      "title": "Departure",
      "description": "Shop for Tibetan singing bowls and prayer flags, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Rishi Kapoor",
      "rating": 4.9,
      "date": "2026-05-29",
      "comment": "The view from Triund camp at night with starry sky and city lights below was magical!"
    }
  ]
},
  {
  "id": 39,
  "title": "Kasol & Tosh Parvati Valley Wilderness Escape",
  "location": "Kasol, Himachal Pradesh, India",
  "price": 379,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 140,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Trek through the fairytale pine forests of Parvati Valley. Relax in Mini Israel (Kasol), visit the natural hot springs of Manikaran Sahib, hike up to wooden Tosh village, and riverside camp along pine-fringed Parvati River.",
  "highlights": [
    "Riverside camping along the rushing Parvati River",
    "Hike up to wooden Tosh Village & Waterfall overlooking glacier peaks",
    "Dip in natural hot sulfur springs at Manikaran Sahib Gurudwara",
    "Trek through pine forests to Chalal village",
    "Sample Israeli Shakshuka & Falafel at riverside cafes"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Kasol & Chalal Pine Walk",
      "description": "Arrive in Kasol via Bhuntar. Check into your riverside camp. Easy pine forest walk across cable bridge to Chalal village."
    },
    {
      "day": 2,
      "title": "Tosh Village Hike & Glacier Views",
      "description": "Drive to Barsheni. Hike up to Tosh village. Explore traditional wooden houses and enjoy views of Tosh Glacier."
    },
    {
      "day": 3,
      "title": "Manikaran Sahib Hot Springs",
      "description": "Visit Manikaran Sahib. Dip in holy hot springs and partake in the community Langar meal."
    },
    {
      "day": 4,
      "title": "Riverside Breakfast & Departure",
      "description": "Breakfast by the rushing Parvati river, checkout and transfer back to Bhuntar/Delhi."
    }
  ],
  "reviews": [
    {
      "author": "Aakash Mehta",
      "rating": 4.8,
      "date": "2026-06-14",
      "comment": "Kasol is super chill. Listening to Parvati river from our tent was so relaxing."
    }
  ]
},
  {
  "id": 40,
  "title": "Auli Himalayan Skiing & Cable Car Snow Slopes",
  "location": "Auli, Uttarakhand, India",
  "price": 699,
  "duration": 5,
  "rating": 4.9,
  "reviewsCount": 89,
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Experience India's premier ski resort. Ride the 4km Joshimath-Auli ropeway cable car, ski on pristine snow slopes with 360-degree views of Nanda Devi (India's 2nd highest peak), and visit high-altitude artificial lake.",
  "highlights": [
    "Ride the 4km Joshimath-Auli Cable Car, one of Asia's longest ropeways",
    "Skiing & snowboarding lessons with certified Himalayan instructors",
    "Panoramic views of 25,643ft Nanda Devi, Mana Parbat & Kamet peaks",
    "Walk around Auli Artificial Lake snow mirror",
    "Stay in cozy wooden ski chalets"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Rishikesh/Haridwar to Joshimath",
      "description": "Drive up along Alaknanda river from Rishikesh to Joshimath. Check into hotel. Evening walk in Joshimath bazaar."
    },
    {
      "day": 2,
      "title": "Cable Car to Auli & Ski Introduction",
      "description": "Board the 4km ropeway up to Auli. Check into your mountain chalet. Introductory ski lesson on gentle snow slopes."
    },
    {
      "day": 3,
      "title": "Full Day Skiing & Nanda Devi View",
      "description": "Full day skiing and snowboarding. Marvel at Nanda Devi peak reflected in Auli Artificial Lake."
    },
    {
      "day": 4,
      "title": "Gorson Bugyal Snow Trek",
      "description": "Guided 3km snow trek to Gorson Bugyal alpine meadow for sweeping Himalayan panoramas."
    },
    {
      "day": 5,
      "title": "Return Cable Car & Departure",
      "description": "Ropeway back to Joshimath and drive down to Rishikesh/Haridwar for onward journey."
    }
  ],
  "reviews": [
    {
      "author": "Vikrant Massey",
      "rating": 5,
      "date": "2026-02-10",
      "comment": "Auli slopes rival European resorts! Seeing Nanda Devi peak up close is humbling."
    }
  ]
},
  {
  "id": 41,
  "title": "Nainital Naini Lake & Snow View Ridge Escape",
  "location": "Nainital, Uttarakhand, India",
  "price": 429,
  "duration": 4,
  "rating": 4.7,
  "reviewsCount": 110,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Relax in the Lake District of India. Yacht and boat on eye-shaped Naini Lake, ride the aerial ropeway to Snow View Point, explore Eco Cave Gardens, and stroll Mall Road lit with glowing street lamps.",
  "highlights": [
    "Yachting & rowing boat ride on emerald Naini Lake",
    "Aerial ropeway cable car ride to Snow View Point (7,448 ft)",
    "Explore interconnected natural rocky tunnels at Eco Cave Gardens",
    "Panoramic views of 7 hills from Naina Peak (China Peak)",
    "Evening shopping for scented candles & wooden crafts on Mall Road"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Nainital & Naini Lake Boating",
      "description": "Drive up from Kathgodam into Nainital. Check in. Sunset rowboat cruise on Naini Lake."
    },
    {
      "day": 2,
      "title": "Snow View Cable Car & Eco Caves",
      "description": "Take aerial ropeway to Snow View Point for Himalayan views. Afternoon crawling through Eco Cave Gardens."
    },
    {
      "day": 3,
      "title": "Lake Tour: Bhimtal, Sattal & Naukuchiatal",
      "description": "Day trip to surrounding lakes: Bhimtal island temple, Sattal pine forests, and Naukuchiatal 9-corner lake."
    },
    {
      "day": 4,
      "title": "Naina Devi Temple & Departure",
      "description": "Visit lakeside Naina Devi Temple, buy famous Nainital carved candles, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Garima Joshi",
      "rating": 4.7,
      "date": "2026-05-24",
      "comment": "Boating on Naini lake surrounded by green hills was so relaxing. Great family trip!"
    }
  ]
},
  {
  "id": 42,
  "title": "Jim Corbett National Park Tiger Jungle Safari",
  "location": "Jim Corbett, Uttarakhand, India",
  "price": 549,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 125,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Explore India's oldest national park in the Himalayan foothills. Ride open 4x4 Jeeps through sal forests of Dhikala and Bijrani, spot wild elephants crossing Ramganga River, and track Bengal Tigers.",
  "highlights": [
    "2 Open 4x4 Jeep Safaris in Bijrani / Jhirna / Dhela zones",
    "Spot Bengal Tigers, wild elephant herds, gharials & 600+ bird species",
    "Stay in a riverside jungle resort along Kosi River",
    "Visit Corbett Waterfall & heritage Jim Corbett Museum in Kaladhungi",
    "Garjiya Devi Temple visit on Kosi river rock"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Corbett & Kosi River Walk",
      "description": "Arrive in Ramnagar/Corbett. Check into your luxury jungle resort. Afternoon walk along Kosi river bank."
    },
    {
      "day": 2,
      "title": "Morning & Afternoon Jungle Safaris",
      "description": "5:30 AM Jeep safari into Bijrani core zone. Spot elephants and deer. Afternoon safari in Jhirna zone."
    },
    {
      "day": 3,
      "title": "Corbett Waterfall & Museum",
      "description": "Visit Corbett Waterfalls surrounded by teak forest. Tour winter home of legendary hunter-conservationist Jim Corbett."
    },
    {
      "day": 4,
      "title": "Garjiya Temple & Departure",
      "description": "Visit Garjiya Devi Temple perched on a massive rock in Kosi River, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Manish Pandey",
      "rating": 4.9,
      "date": "2026-04-12",
      "comment": "Seeing a herd of wild elephants crossing the Ramganga river was an unforgettable wilderness moment."
    }
  ]
},
  {
  "id": 43,
  "title": "Valley of Flowers UNESCO Alpine Trek",
  "location": "Valley of Flowers, Uttarakhand, India",
  "price": 649,
  "duration": 6,
  "rating": 5.0,
  "reviewsCount": 78,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Trek into a UNESCO World Heritage biosphere carpeted with 500+ species of wild alpine flowers. Hike through Himalayan meadows, cross Pushpawati River, and visit sacred Hemkund Sahib glacial lake at 14,107ft.",
  "highlights": [
    "Hike into UNESCO Valley of Flowers carpeted with Blue Poppies, Orchids & Primulas",
    "Pilgrimage trek to high-altitude Hemkund Sahib Lake (14,107 ft)",
    "Cross rushing Pushpawati River over wooden bridges",
    "Spot rare Himalayan monal birds & blue sheep",
    "Stay in mountain guesthouse in Ghangaria"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Rishikesh to Govindghat",
      "description": "Drive up along Panch Prayag (confluence of 5 sacred rivers) from Rishikesh to Govindghat."
    },
    {
      "day": 2,
      "title": "Trek from Govindghat to Ghangaria",
      "description": "14km gradual trek along Lakshman Ganga river to base camp village Ghangaria (10,000 ft)."
    },
    {
      "day": 3,
      "title": "Excursion to Valley of Flowers",
      "description": "Enter the UNESCO national park. Hike among endless fields of blooming wild alpine blossoms under snow peaks."
    },
    {
      "day": 4,
      "title": "Trek to Hemkund Sahib (14,107 ft)",
      "description": "Steep 6km trek to glacial Hemkund Lake and world's highest Gurudwara. Return to Ghangaria."
    },
    {
      "day": 5,
      "title": "Descent to Govindghat & Drive to Joshimath",
      "description": "Trek back down to Govindghat and drive to Joshimath."
    },
    {
      "day": 6,
      "title": "Joshimath to Rishikesh Departure",
      "description": "Drive back down to Rishikesh for onward travel."
    }
  ],
  "reviews": [
    {
      "author": "Harpreet Kaur",
      "rating": 5,
      "date": "2026-07-05",
      "comment": "Walking through miles of blooming blue poppies surrounded by waterfalls is like stepping into Narnia!"
    }
  ]
},
  {
  "id": 44,
  "title": "Khajuraho UNESCO Temples & Sculptural Heritage",
  "location": "Khajuraho, Madhya Pradesh, India",
  "price": 429,
  "duration": 3,
  "rating": 4.8,
  "reviewsCount": 85,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Marvel at the world's finest temple stone architecture. Tour 1,000-year-old Chandela dynasty UNESCO temples famous for intricate erotic sculptures, Nagara-style spires, and evening Light & Sound shows.",
  "highlights": [
    "Guided tour of Western Group of Temples: Kandariya Mahadeva & Lakshmana Temples",
    "Admire masterwork Chandela dynasty erotic & lifestyle stone carvings",
    "Evening Light & Sound show narrated by Amitabh Bachchan",
    "Excursion to Raneh Falls canyon & Ken Gharial Sanctuary",
    "Classical Indian dance performance during Khajuraho festival"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Khajuraho & Light & Sound Show",
      "description": "Arrive in Khajuraho. Check in. Evening open-air Light & Sound show at Western Group of Temples."
    },
    {
      "day": 2,
      "title": "Western & Eastern Temple Groups",
      "description": "Full day tour of Kandariya Mahadeva, Chitragupta, and Parsvanath Jain temples showcasing master stone art."
    },
    {
      "day": 3,
      "title": "Raneh Falls Canyon & Departure",
      "description": "Visit Raneh Falls crystalline granite canyon on Ken River, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Dr. Alok Verma",
      "rating": 4.9,
      "date": "2026-03-15",
      "comment": "Kandariya Mahadeva temple is the pinnacle of Indian temple architecture. Unbelievable detail!"
    }
  ]
},
  {
  "id": 45,
  "title": "Kanha & Bandhavgarh Jungle Book Tiger Sanctuary",
  "location": "Kanha, Madhya Pradesh, India",
  "price": 649,
  "duration": 5,
  "rating": 4.9,
  "reviewsCount": 118,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Step inside Rudyard Kipling's Jungle Book. Explore Kanha National Park's sprawling sal forests and Bamni Dadar sunset point, home to royal tigers, leopards, and rare Hard-ground Barasingha swamp deer.",
  "highlights": [
    "3 Open 4x4 Jeep Safaris in Kanha core zones (Mukki & Kanha)",
    "Spot Royal Bengal Tigers, leopards & endemic Barasingha swamp deer",
    "Sunset view over forest valleys at Bamni Dadar",
    "Stay in eco-luxury safari lodge in jungle canopy",
    "Guided nature walk with tribal Baiga naturalists"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Jabalpur & Drive to Kanha",
      "description": "Drive from Jabalpur to Kanha National Park. Check into your safari resort. Evening Baiga tribal dance."
    },
    {
      "day": 2,
      "title": "Morning & Afternoon Kanha Safaris",
      "description": "5:30 AM safari into Kanha core range. Spot Barasingha in grassy meadows. 2:30 PM safari in Mukki zone."
    },
    {
      "day": 3,
      "title": "Bamni Dadar Sunset & Third Safari",
      "description": "Morning jeep safari. Afternoon visit to Bamni Dadar cliff point for sunset view over tiger forests."
    },
    {
      "day": 4,
      "title": "Nature Walk & Village Tour",
      "description": "Guided walking tour with naturalist along park border. Visit local Baiga village."
    },
    {
      "day": 5,
      "title": "Departure via Jabalpur Marble Rocks",
      "description": "Drive back to Jabalpur. Boat ride past Bhedaghat Marble Rocks on Narmada River, checkout and flight."
    }
  ],
  "reviews": [
    {
      "author": "Charles Darwin",
      "rating": 5,
      "date": "2026-04-22",
      "comment": "Kanha is the true real-life Jungle Book. Seeing the swamp deer back from extinction is wonderful."
    }
  ]
},
  {
  "id": 46,
  "title": "Amritsar Golden Temple & Wagah Border Ceremony",
  "location": "Amritsar, Punjab, India",
  "price": 389,
  "duration": 3,
  "rating": 5.0,
  "reviewsCount": 195,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1588097281266-310cead47879?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Experience deep devotion and high energy in Amritsar. Marvel at the gold-plated Sri Harmandir Sahib (Golden Temple) reflecting in Amrit Sarovar lake, volunteer at the world's largest community kitchen (Langar), and cheer at Wagah Border.",
  "highlights": [
    "Day & Night visits to illuminated Sri Harmandir Sahib (Golden Temple)",
    "Volunteer at Golden Temple Langar kitchen feeding 100,000 pilgrims daily",
    "VIP gallery seats for patriotic Wagah Border Beating Retreat Ceremony",
    "Visit historic Jallianwala Bagh memorial park",
    "Feast on authentic Amritsari Kulcha with lassi & Makhan"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Amritsar & Night Golden Temple View",
      "description": "Arrive in Amritsar. Check into hotel near Heritage Street. Night visit to illuminated Golden Temple."
    },
    {
      "day": 2,
      "title": "Golden Temple Langar & Wagah Border",
      "description": "Morning spiritual walk inside Golden Temple & Langar kitchen. Afternoon visit Jallianwala Bagh. 3:30 PM drive to Wagah Border ceremony."
    },
    {
      "day": 3,
      "title": "Amritsari Kulcha Feast & Departure",
      "description": "Breakfast at famous Kulcha Land, tour Partition Museum, checkout and transfer to airport."
    }
  ],
  "reviews": [
    {
      "author": "Gurpreet Singh",
      "rating": 5,
      "date": "2026-06-01",
      "comment": "Golden Temple night view is heavenly. The energy at Wagah border ceremony makes you beam with pride!"
    }
  ]
},
  {
  "id": 47,
  "title": "Rann of Kutch White Salt Desert & Rann Utsav",
  "location": "Kutch, Gujarat, India",
  "price": 549,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 112,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1579282240050-352db0a14c21?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Witness the magic of the Great Rann of Kutch, the world's largest salt desert. Walk across endless glittering white salt under a full moon, stay in luxury tent cities at Dhordo, and buy Kutchi mirror-work embroidery.",
  "highlights": [
    "Full moon night walk across the white salt desert of Great Rann",
    "Stay in luxury AC Swiss Tents at Tent City Dhordo during Rann Utsav",
    "Sunset view over the salt plains from Kalo Dungar (Black Hill)",
    "Visit Nirona Artisan Village (Rogan art, copper bells & lacquer craft)",
    "Kutchi folk music & Garba dance cultural night"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Bhuj Arrival & Drive to Dhordo Tent City",
      "description": "Arrive in Bhuj, drive to Rann Utsav Tent City in Dhordo. Check in. Sunset walk on White Rann."
    },
    {
      "day": 2,
      "title": "White Rann Full Moon & Kalo Dungar",
      "description": "Drive up Kalo Dungar (highest point in Kutch) for salt views. Night walk under full moon light on White Rann."
    },
    {
      "day": 3,
      "title": "Nirona Artisan Village & Bhuj Heritage",
      "description": "Visit Nirona village to watch Rogan oil painting master artisans. Tour Prag Mahal and Aina Mahal in Bhuj."
    },
    {
      "day": 4,
      "title": "Handicraft Shopping & Departure",
      "description": "Buy Kutchi mirror-work shawls and bandhani sarees, checkout and transfer to Bhuj airport."
    }
  ],
  "reviews": [
    {
      "author": "Jignesh Shah",
      "rating": 5,
      "date": "2026-01-28",
      "comment": "Walking on white salt under full moon light felt like walking on snow or the moon! Breathtaking."
    }
  ]
},
  {
  "id": 48,
  "title": "Gir Forest Asiatic Lion Sanctuary Safari",
  "location": "Gir, Gujarat, India",
  "price": 499,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 98,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Journey to the sole remaining natural habitat of the majestic Asiatic Lion in the world. Ride open 4x4 Jeeps through dry teak forests of Gir National Park, spot lion prides, leopards, and visit Somnath Temple.",
  "highlights": [
    "2 Open 4x4 Jeep Safaris in Gir National Park core lion zones",
    "Spot endangered Asiatic Lions, leopards, chital deer & nilgai",
    "Excursion to the seaside UNESCO Somnath Jyotirlinga Temple",
    "Stay in a mango orchard jungle resort",
    "Visit Devalia Safari Interpretation Zone"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Rajkot/Diul & Drive to Gir",
      "description": "Drive to Gir National Park. Check into your mango orchard resort. Evening orientation talk by forest guide."
    },
    {
      "day": 2,
      "title": "Morning & Afternoon Gir Lion Safaris",
      "description": "6:00 AM Jeep safari into core lion territory. Spot prides resting under teak trees. 3:00 PM second safari."
    },
    {
      "day": 3,
      "title": "Devalia Zone & Somnath Temple Excursion",
      "description": "Visit Devalia safari park. Afternoon drive to seaside Somnath Temple (45km) for sunset Ganga Aarti."
    },
    {
      "day": 4,
      "title": "Checkout & Departure",
      "description": "Enjoy fresh Gir Kesar mango juice (seasonal), checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Bhavin Patel",
      "rating": 4.9,
      "date": "2026-04-05",
      "comment": "We saw a pride of 4 Asiatic lions resting just 10 feet from our jeep! Incredible sanctuary."
    }
  ]
},
  {
  "id": 49,
  "title": "Lonavala Western Ghats Monsoon Forts & Lakes",
  "location": "Lonavala & Khandala, Maharashtra, India",
  "price": 329,
  "duration": 3,
  "rating": 4.7,
  "reviewsCount": 140,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Escape to Mumbai & Pune's favorite hill station. View cascading waterfalls, trek to historic Lohagad & Karla Caves, marvel at Tiger's Leap cliff, and taste hot Maggi and Maganlal Chikki.",
  "highlights": [
    "View waterfalls & fog from cliff edge at Tiger's Leap & Lion's Point",
    "Trek to 2,000-year-old Buddhist rock-cut Karla & Bhaja Caves",
    "Hike up the iron staircase of monsoon fort Lohagad",
    "Boating at Pawna Lake with lakeside camping option",
    "Taste authentic Lonavala Chikki (nut brittle) & fudge"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Lonavala & Sunset Points",
      "description": "Drive from Mumbai/Pune into Lonavala. Check in. Afternoon visit to Tiger's Leap and Lion's Point for sunset."
    },
    {
      "day": 2,
      "title": "Lohagad Fort & Pawna Lake",
      "description": "Morning monsoon trek to hilltop Lohagad Fort. Afternoon drive to Pawna Lake for boating and lake walk."
    },
    {
      "day": 3,
      "title": "Karla Caves & Chikki Shopping",
      "description": "Explore 2nd-century BC Karla Buddhist Caves. Buy fresh chikki at Maganlal store, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Siddhesh Kadam",
      "rating": 4.7,
      "date": "2026-06-25",
      "comment": "Lonavala during monsoon with green hills and waterfalls everywhere is a refreshing weekend getaway."
    }
  ]
},
  {
  "id": 50,
  "title": "Mahabaleshwar Strawberry Valleys & Viewpoints",
  "location": "Mahabaleshwar, Maharashtra, India",
  "price": 369,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 115,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Indulge in fresh strawberries and cool mountain air in Mahabaleshwar. Tour Mapro Garden strawberry farms, row boats on Venna Lake, trek to Pratapgad Fort, and view Arthur's Seat cliff points.",
  "highlights": [
    "Strawberry picking & fresh cream tasting at Mapro Gardens",
    "Boating on serene pine-fringed Venna Lake",
    "Explore historic cliffside Pratapgad Fort of Chhatrapati Shivaji Maharaj",
    "Panoramic valley views from Arthur's Seat, Needle Hole & Elphinstone points",
    "Horse riding along Panchgani table land plateau"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Mahabaleshwar & Venna Lake",
      "description": "Drive up the Western Ghats into Mahabaleshwar. Check into hotel. Sunset rowboat ride on Venna Lake."
    },
    {
      "day": 2,
      "title": "Pratapgad Fort & Mapro Garden",
      "description": "Tour 17th-century Pratapgad Fort. Afternoon visit Mapro Garden for strawberry picking and wood-fired pizza."
    },
    {
      "day": 3,
      "title": "Arthur's Seat & Panchgani Tableland",
      "description": "View Arthur's Seat cliff viewpoints. Afternoon drive to Panchgani tableland plateau for horse riding."
    },
    {
      "day": 4,
      "title": "Strawberry Shopping & Departure",
      "description": "Buy fresh strawberries, syrups, and crushed jams, checkout and transfer back."
    }
  ],
  "reviews": [
    {
      "author": "Pooja Deshmukh",
      "rating": 4.8,
      "date": "2026-05-18",
      "comment": "Fresh strawberries with whipped cream at Mapro garden was divine! Loved Pratapgad fort."
    }
  ]
}
,
  {
  "id": 51,
  "title": "Araku Valley & Visakhapatnam Coastal Escape",
  "location": "Visakhapatnam & Araku Valley, Andhra Pradesh, India",
  "price": 399,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 92,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Experience the Jewel of the East Coast. Ride the scenic Vistadome glass train through 84 tunnels to Araku Valley coffee hills, explore million-year-old Borra Caves, and relax on Vizag's RK Beach.",
  "highlights": [
    "Scenic Vistadome glass train journey from Vizag to Araku Valley",
    "Explore million-year-old stalactite Borra Caves",
    "Stroll through organic Araku coffee plantations & tribal museum",
    "Visit Submarine Museum (INS Kursura) on Vizag's RK Beach",
    "Sunset views from Kailasagiri hill park"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Vizag & RK Beach",
      "description": "Arrive in Visakhapatnam. Check in. Afternoon visit to Submarine Museum and sunset walk on RK Beach."
    },
    {
      "day": 2,
      "title": "Vistadome Train to Araku Valley",
      "description": "Board early morning Vistadome train. Enjoy mountain views passing through 84 tunnels. Arrive in Araku, check into coffee resort."
    },
    {
      "day": 3,
      "title": "Borra Caves & Coffee Plantations",
      "description": "Explore Borra limestone caves lit with color lights. Tour Araku tribal museum and coffee tasting."
    },
    {
      "day": 4,
      "title": "Kailasagiri & Departure",
      "description": "Return to Vizag. Cable car up Kailasagiri hill park for bay views, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Venkatesh Rao",
      "rating": 4.8,
      "date": "2026-05-12",
      "comment": "The Vistadome train ride up the Eastern Ghats was super fun! Borra caves are enormous."
    }
  ]
},
  {
  "id": 52,
  "title": "Tirupati Balaji Divine Pilgrimage & Tirumala Hills",
  "location": "Tirupati, Andhra Pradesh, India",
  "price": 329,
  "duration": 3,
  "rating": 5.0,
  "reviewsCount": 220,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Visit the world's most visited sacred shrine. Experience VIP Darshan at Sri Venkateswara Swamy Temple on Saptagiri Seven Hills, taste authentic Tirupati Laddu Prasadam, and visit Kapila Theertham.",
  "highlights": [
    "Special Entry VIP Darshan at Sri Venkateswara Swamy Temple in Tirumala",
    "Receive authentic world-famous GI-tagged Tirupati Laddu Prasadam",
    "Visit Sri Padmavathi Ammavari Temple at Tiruchanur",
    "Dip in sacred waterfalls at Kapila Theertham",
    "Scenic drive up the 7 sacred Saptagiri mountain loops"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Tirupati & Tiruchanur Temple",
      "description": "Arrive in Tirupati, check in. Evening visit to Sri Padmavathi Ammavari Temple at Tiruchanur."
    },
    {
      "day": 2,
      "title": "Tirumala Hills & Balaji VIP Darshan",
      "description": "Drive up Saptagiri hills. Experience VIP Darshan of Lord Venkateswara. Collect sacred Laddu prasadam."
    },
    {
      "day": 3,
      "title": "Kapila Theertham & Departure",
      "description": "Visit Kapila Theertham waterfall temple, checkout and transfer to airport/station."
    }
  ],
  "reviews": [
    {
      "author": "Srinivas Reddy",
      "rating": 5,
      "date": "2026-04-10",
      "comment": "Seamless VIP darshan. The divine energy in Tirumala is unmatched. Govinda Govinda!"
    }
  ]
},
  {
  "id": 53,
  "title": "Bodh Gaya Mahabodhi & Nalanda Ancient Heritage",
  "location": "Bodh Gaya & Nalanda, Bihar, India",
  "price": 369,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 115,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Journey to the birthplace of Buddhism and seat of ancient wisdom. Meditate under the sacred Bodhi Tree at UNESCO Mahabodhi Temple, explore ruins of 5th-century Nalanda University, and visit Rajgir ropeway.",
  "highlights": [
    "Meditate under the sacred Bodhi Tree where Buddha attained Enlightenment",
    "Tour UNESCO Mahabodhi Temple Complex & 80ft Great Buddha Statue",
    "Guided walk through the ancient red-brick ruins of Nalanda University",
    "Ride Vishwa Shanti Stupa ropeway in Rajgir",
    "Visit Griddhakuta (Vulture Peak) & Japanese Buddhist Temple"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Gaya & Mahabodhi Temple",
      "description": "Arrive in Gaya, check into Bodh Gaya hotel. Evening meditation under the Bodhi Tree at Mahabodhi Temple."
    },
    {
      "day": 2,
      "title": "International Monasteries & Great Buddha",
      "description": "Visit Thai, Tibetan, and Japanese monasteries, and the 80ft Great Buddha statue."
    },
    {
      "day": 3,
      "title": "Rajgir Ropeway & Nalanda University Ruins",
      "description": "Drive to Rajgir. Take chairlift to Vishwa Shanti Stupa. Explore the vast archaeological ruins of Nalanda University."
    },
    {
      "day": 4,
      "title": "Morning Prayer & Departure",
      "description": "Final morning quiet prayer at temple, checkout and Gaya airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Lobsang Sangay",
      "rating": 5,
      "date": "2026-03-08",
      "comment": "Sitting under the sacred Bodhi tree brought immense peace to my heart. Nalanda ruins are impressive."
    }
  ]
},
  {
  "id": 54,
  "title": "Chitrakote Falls Niagara of India & Bastar Tribal Tour",
  "location": "Jagdalpur & Bastar, Chhattisgarh, India",
  "price": 449,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 78,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Discover India's widest waterfall, known as the Niagara of India. Marvel at 300-meter-wide horseshoe Chitrakote Falls on Indravati River, explore subterranean Kotumsar limestone caves, and buy Bastar dhokra bell-metal art.",
  "highlights": [
    "Witness 300m wide horseshoe Chitrakote Falls lit with evening rainbow lights",
    "Country boat ride right up to the mist of Chitrakote waterfall base",
    "Explore subterranean pitch-black Kotumsar Cave stalactites",
    "Visit Tirathgarh tiered waterfalls inside Kanger Valley National Park",
    "Buy authentic hand-crafted Bastar Dhokra bell-metal & wooden art"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Jagdalpur & Sunset Chitrakote",
      "description": "Arrive in Raipur/Jagdalpur. Check into your eco resort. Sunset view of Chitrakote Falls."
    },
    {
      "day": 2,
      "title": "Chitrakote Boat Ride & Kanger Valley Caves",
      "description": "Morning boat ride below Chitrakote. Explore Kanger Valley National Park and subterranean Kotumsar caves."
    },
    {
      "day": 3,
      "title": "Tirathgarh Waterfalls & Bastar Craft Village",
      "description": "Visit multi-tiered Tirathgarh Falls. Afternoon tour of Kondagaon craft village for Dhokra metal casting."
    },
    {
      "day": 4,
      "title": "Departure",
      "description": "Breakfast at resort, checkout and return transfer."
    }
  ],
  "reviews": [
    {
      "author": "Anil Kumawat",
      "rating": 4.9,
      "date": "2026-06-18",
      "comment": "Chitrakote in full flow looks just like Niagara Falls! Bastar art is incredible."
    }
  ]
},
  {
  "id": 55,
  "title": "Statue of Unity Kevadia & Narmada River Cruise",
  "location": "Kevadia, Gujarat, India",
  "price": 429,
  "duration": 3,
  "rating": 4.9,
  "reviewsCount": 160,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Visit the world's tallest statue (182 meters / 597 ft) honoring Sardar Vallabhbhai Patel. Ride high-speed express elevators up to the chest viewing gallery, tour the Butterfly Park, and enjoy Narmada River laser light show.",
  "highlights": [
    "Express elevator ride to the 153m Viewing Gallery inside Statue of Unity",
    "Witness the spectacular evening Laser, Light & Sound Show at Statue of Unity",
    "Sunset ferry boat cruise along Narmada River & Sardar Sarovar Dam view",
    "Tour Jungle Safari Park, Glow Garden & Valley of Flowers",
    "Stay in eco-luxury Tent City Kevadia"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Vadodara Arrival & Drive to Kevadia",
      "description": "Arrive in Vadodara, drive to Kevadia Tent City. Evening laser light show at Statue of Unity."
    },
    {
      "day": 2,
      "title": "Statue Viewing Gallery & Jungle Safari",
      "description": "Ascend to 153m Viewing Gallery inside statue for dam views. Afternoon tour of Kevadia Jungle Safari and Glow Garden."
    },
    {
      "day": 3,
      "title": "Narmada River Cruise & Departure",
      "description": "Morning Narmada river boat cruise, visit Valley of Flowers, checkout and transfer back to Vadodara."
    }
  ],
  "reviews": [
    {
      "author": "Parthiv Patel",
      "rating": 5,
      "date": "2026-05-10",
      "comment": "The sheer size of the Statue of Unity is mind-blowing! The elevator ride and viewing gallery are world class."
    }
  ]
},
  {
  "id": 56,
  "title": "Netarhat Queen of Chotanagpur & Hundru Falls",
  "location": "Netarhat & Ranchi, Jharkhand, India",
  "price": 389,
  "duration": 4,
  "rating": 4.7,
  "reviewsCount": 65,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Discover the Queen of Chotanagpur in Jharkhand. Watch iconic sunrises at Magnolia Point, stroll through dense pine forests, trek to 320ft Hundru & Dassam Waterfalls, and visit Patratu Valley S-curves.",
  "highlights": [
    "Watch famous sunrise & sunset at Magnolia Point Netarhat",
    "Trek to 320ft roaring Hundru & Jonha Waterfalls near Ranchi",
    "Drive down scenic winding loops of Patratu Valley lake road",
    "Stroll through dense pine and sal forests of Netarhat plateau",
    "Visit Tagore Hill in Ranchi"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Ranchi Arrival & Patratu Valley",
      "description": "Arrive in Ranchi. Drive down scenic Patratu Valley loops. Boating on Patratu Lake. Check in."
    },
    {
      "day": 2,
      "title": "Drive to Netarhat & Magnolia Sunset",
      "description": "Drive through sal forests to Netarhat hill station. Watch sunset from Magnolia Point."
    },
    {
      "day": 3,
      "title": "Netarhat Sunrise & Upper Ghaghri Falls",
      "description": "4:30 AM sunrise view at Magnolia Point. Tour Upper & Lower Ghaghri Waterfalls and Pine Forest."
    },
    {
      "day": 4,
      "title": "Hundru Falls & Ranchi Departure",
      "description": "Return to Ranchi. Visit 320ft Hundru Falls, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Sanjay Soren",
      "rating": 4.7,
      "date": "2026-04-20",
      "comment": "Patratu valley looks like Switzerland roads! Netarhat sunrise was so serene."
    }
  ]
},
  {
  "id": 57,
  "title": "Pachmarhi Queen of Satpura & Marble Rocks Cruise",
  "location": "Pachmarhi & Jabalpur, MP, India",
  "price": 469,
  "duration": 5,
  "rating": 4.8,
  "reviewsCount": 108,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Explore the solitary hill station of Madhya Pradesh. Trek to Dhoopgarh (highest point in MP), swim in Bee Falls natural pools, tour Pandav Caves, and boat through 100ft Marble Rocks canyon in Bhedaghat.",
  "highlights": [
    "Sunset from Dhoopgarh (4,429ft), highest peak in Satpura range",
    "Dip in natural mountain pools of Bee Falls & Apsara Vihar",
    "Boat ride between 100ft white Marble Rocks at Bhedaghat on Narmada River",
    "Explore 1,000-year-old rock-cut Pandav Caves",
    "Jeep safari in Satpura National Park tiger habitat"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Jabalpur to Pachmarhi Drive",
      "description": "Drive from Jabalpur through Satpura mountain forests up to Pachmarhi. Check in."
    },
    {
      "day": 2,
      "title": "Bee Falls & Dhoopgarh Sunset",
      "description": "Visit Bee Falls and dip in clear waters. Drive up to Dhoopgarh peak for 360-degree sunset view."
    },
    {
      "day": 3,
      "title": "Pandav Caves & Jata Shankar",
      "description": "Tour ancient Pandav Caves, Jata Shankar cave temple, and Apsara Vihar waterfall."
    },
    {
      "day": 4,
      "title": "Bhedaghat Marble Rocks Boat Cruise",
      "description": "Drive to Jabalpur. Sunset boat cruise through Marble Rocks gorge on Narmada river."
    },
    {
      "day": 5,
      "title": "Dhuandhar Falls & Departure",
      "description": "Visit roaring Dhuandhar Waterfalls, checkout and Jabalpur airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Meenal Chouhan",
      "rating": 4.8,
      "date": "2026-05-30",
      "comment": "Boating through Marble Rocks at moonlit evening in Bhedaghat was pure magic!"
    }
  ]
},
  {
  "id": 58,
  "title": "Ajanta & Ellora Caves UNESCO Rock-Cut Architecture",
  "location": "Aurangabad (Chhatrapati Sambhajinagar), Maharashtra, India",
  "price": 479,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 165,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Journey to humanity's greatest rock-cut architectural wonders. Marvel at Cave 16 Kailasa Temple in Ellora carved top-down out of a single mountain monolith, and ancient Buddhist murals in Ajanta Caves.",
  "highlights": [
    "Behold Kailasa Temple (Cave 16, Ellora), world's largest monolithic rock structure",
    "Explore 30 horseshoe Ajanta Caves featuring 2,000-year-old Buddhist fresco paintings",
    "Tour 34 Ellora Caves showcasing Hindu, Buddhist & Jain rock art",
    "Visit Bibi Ka Maqbara (Taj of the Deccan) & Daulatabad Fort",
    "Taste authentic Himroo shawl weaving & Aurangabadi Naan Qalia"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Aurangabad & Bibi Ka Maqbara",
      "description": "Arrive in Aurangabad. Check in. Afternoon visit to Bibi Ka Maqbara and Panchakki water mill."
    },
    {
      "day": 2,
      "title": "Ajanta Caves Excursion",
      "description": "Full day tour to UNESCO Ajanta Caves (100km). View famous Padmapani & Vajrapani frescoes."
    },
    {
      "day": 3,
      "title": "Ellora Caves & Kailasa Monolith",
      "description": "Visit UNESCO Ellora Caves. Marvel at the mind-boggling Kailasa Temple carved out of a single rock cliff. Afternoon climb Daulatabad Fort."
    },
    {
      "day": 4,
      "title": "Himroo Weaving & Departure",
      "description": "Visit Himroo traditional weaving center, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Prof. David Miller",
      "rating": 5,
      "date": "2026-02-14",
      "comment": "Kailasa temple in Ellora is the greatest architectural feat on earth. Carving a temple top-down from one mountain is staggering."
    }
  ]
},
  {
  "id": 59,
  "title": "Loktak Lake Floating Islands & Keibul Lamjao Sanctuary",
  "location": "Imphal & Loktak Lake, Manipur, India",
  "price": 499,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 72,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Visit Northeast India's largest freshwater lake famous for floating circular biomass islands (Phumdis). Spot the endangered Sangai dancing deer at Keibul Lamjao, world's only floating national park.",
  "highlights": [
    "Stay in floating homestays on circular Phumdi islands on Loktak Lake",
    "Spot rare Sangai (Dancing Deer) at Keibul Lamjao, world's only floating national park",
    "Traditional wooden boat ride across blue waters of Loktak Lake",
    "Visit Ima Keithel (Mother's Market) in Imphal, world's only all-women market",
    "Tour Kangla Fort & Manipur State Museum"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Imphal & Kangla Fort",
      "description": "Arrive in Imphal. Check in. Visit historic Kangla Fort and Ima Keithel all-women market."
    },
    {
      "day": 2,
      "title": "Loktak Lake & Floating Homestay",
      "description": "Drive to Loktak Lake. Board wooden boat to Phumdi floating island. Check into floating resort cottage."
    },
    {
      "day": 3,
      "title": "Keibul Lamjao Floating Park & Sangai Spotting",
      "description": "Early morning boat safari to Keibul Lamjao National Park to spot dancing Sangai deer."
    },
    {
      "day": 4,
      "title": "Return to Imphal & Departure",
      "description": "Return to Imphal, buy Manipuri handloom textiles, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Sanatombi Devi",
      "rating": 4.9,
      "date": "2026-04-18",
      "comment": "Loktak lake is magical. Staying on a floating island and seeing Sangai deer was unforgettable!"
    }
  ]
},
  {
  "id": 60,
  "title": "Reiek Tlang Peak & Mizoram Hill Culture",
  "location": "Aizawl & Reiek, Mizoram, India",
  "price": 469,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 58,
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Trek up the rocky ridge of Reiek Tlang peak overlooking lush green valleys of Mizoram. Tour traditional Mizo heritage mock villages, explore Solomon's Temple in Aizawl, and taste bamboo shoot delicacies.",
  "highlights": [
    "Trek up the dramatic cliffside peak of Reiek Tlang (4,779 ft)",
    "Tour Reiek Mizo Heritage Village showcasing traditional Mizo huts",
    "Visit magnificent white marble Solomon's Temple in Aizawl",
    "Enjoy 360-degree views of Bangladesh plains & Tripura hills from peak",
    "Shop for Mizo Puan handloom shawls at Bara Bazar"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Lengpui/Aizawl",
      "description": "Arrive at Lengpui airport. Scenic drive up to Aizawl. Check in. Evening walk at Bara Bazar."
    },
    {
      "day": 2,
      "title": "Reiek Tlang Peak Trek & Heritage Village",
      "description": "Drive to Reiek base. Trek up Reiek Tlang rocky cliff for views. Tour Reiek Mizo Heritage Village."
    },
    {
      "day": 3,
      "title": "Solomon's Temple & KV Paradise",
      "description": "Visit grand white marble Solomon's Temple and KV Paradise memorial."
    },
    {
      "day": 4,
      "title": "Handloom Shopping & Departure",
      "description": "Buy Mizo bamboo crafts and woven shawls, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Lalremruata",
      "rating": 4.8,
      "date": "2026-05-05",
      "comment": "Reiek peak hike has cliff views that will blow your mind. Mizoram is so peaceful."
    }
  ]
},
  {
  "id": 61,
  "title": "Nagaland Hornbill Festival & Dzukou Valley Trek",
  "location": "Kohima & Dzukou Valley, Nagaland, India",
  "price": 599,
  "duration": 5,
  "rating": 4.9,
  "reviewsCount": 110,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Experience the Festival of Festivals at Kisama Heritage Village. Witness 17 Naga tribes performing warrior dances, trek into emerald Dzukou Valley (Valley of Flowers of the East), and visit Khonoma Green Village.",
  "highlights": [
    "Attend Hornbill Festival at Kisama Heritage Village (17 Naga tribes in traditional gear)",
    "Trek into pristine emerald Dzukou Valley (8,000 ft) surrounded by rolling bamboo hills",
    "Visit Khonoma, India's first official Green Village",
    "Explore Kohima WWII Cemetery & War Memorial",
    "Taste traditional Naga smoked pork with Raja Mircha chili"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Dimapur Arrival & Drive to Kohima",
      "description": "Arrive in Dimapur, drive up to Kohima. Check in. Evening walk in Kohima town."
    },
    {
      "day": 2,
      "title": "Kisama Hornbill Festival",
      "description": "Full day at Kisama Heritage Village. Watch tribal dances, archery, Naga wrestling, and music concerts."
    },
    {
      "day": 3,
      "title": "Dzukou Valley Trek Ascent",
      "description": "Drive to Viswema. 4-hour trek up to Dzukou Valley cave/guest house. Overnight in valley under stars."
    },
    {
      "day": 4,
      "title": "Dzukou Valley Exploration & Khonoma",
      "description": "Walk among rolling green bamboo hills of Dzukou. Descend back and visit Khonoma Green Village."
    },
    {
      "day": 5,
      "title": "Kohima War Memorial & Departure",
      "description": "Visit Kohima WWII Cemetery, checkout and transfer back to Dimapur."
    }
  ],
  "reviews": [
    {
      "author": "Keviletuo Angami",
      "rating": 5,
      "date": "2026-12-05",
      "comment": "Hornbill Festival is pure energy! Dzukou valley looks like rolling green waves."
    }
  ]
},
  {
  "id": 62,
  "title": "Puri Jagannath Temple & Konark Sun Temple Heritage",
  "location": "Puri & Konark, Odisha, India",
  "price": 429,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 155,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Discover Odisha's Golden Triangle. Pray at sacred Jagannath Temple in Puri, marvel at 13th-century UNESCO Konark Sun Temple chariot architecture, relax on Golden Beach, and spot Irrawaddy dolphins at Chilika Lake.",
  "highlights": [
    "Darshan at sacred 12th-century Jagannath Temple in Puri & taste Mahaprasad",
    "Guided tour of UNESCO Konark Sun Temple built as a giant 24-wheel stone chariot",
    "Boat safari on Chilika Lake at Satapada to spot rare Irrawaddy Dolphins",
    "Relax on Blue Flag certified Puri Golden Beach",
    "Watch Raghurajpur heritage village Pattachitra master painters"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Bhubaneswar to Puri & Golden Beach",
      "description": "Arrive in Bhubaneswar, drive to Puri. Check into beach resort. Sunset walk on Puri Golden Beach."
    },
    {
      "day": 2,
      "title": "Jagannath Temple & Raghurajpur Crafts",
      "description": "Morning Darshan at Jagannath Temple. Taste Mahaprasad. Afternoon tour of Raghurajpur Pattachitra artisan village."
    },
    {
      "day": 3,
      "title": "Konark Sun Temple & Chandrabhaga Beach",
      "description": "Visit 13th-century Konark Sun Temple. Explore stone sun dial wheels. Sunset at Chandrabhaga Beach."
    },
    {
      "day": 4,
      "title": "Chilika Dolphin Safari & Departure",
      "description": "Drive to Satapada on Chilika Lake. Boat safari for Irrawaddy dolphins, checkout and transfer to Bhubaneswar."
    }
  ],
  "reviews": [
    {
      "author": "Subhashree Mohanty",
      "rating": 5,
      "date": "2026-04-25",
      "comment": "Konark Sun Temple stone wheels are intricate masterworks. Chilika dolphins were so cute!"
    }
  ]
},
  {
  "id": 63,
  "title": "Pushkar Sacred Lake Camel Fair & Ajmer Sharif",
  "location": "Pushkar & Ajmer, Rajasthan, India",
  "price": 389,
  "duration": 3,
  "rating": 4.8,
  "reviewsCount": 94,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1579282240050-352db0a14c21?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Visit the holy town surrounding sacred Pushkar Lake. Tour the world's few temples dedicated to Lord Brahma, attend evening Ghat Aarti, experience Pushkar Camel Fair celebrations, and visit Ajmer Sharif Dargah.",
  "highlights": [
    "Visit the 14th-century Lord Brahma Temple, one of very few in the world",
    "Attend sunset Maha Aarti at Varaha Ghat on sacred Pushkar Lake",
    "Ropeway cable car ride up to Savitri Temple on Ratnagiri Hill",
    "Excursion to sacred Sufi shrine Ajmer Sharif Dargah",
    "Desert camel safari across Pushkar sand dunes"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Pushkar & Ghat Aarti",
      "description": "Arrive in Pushkar, check into heritage resort. Evening walk around 52 holy ghats and attend Varaha Ghat Aarti."
    },
    {
      "day": 2,
      "title": "Brahma Temple & Savitri Ropeway",
      "description": "Visit Lord Brahma Temple. Take ropeway to Savitri Temple for panoramic view over desert and lake. Afternoon camel safari."
    },
    {
      "day": 3,
      "title": "Ajmer Sharif Dargah & Departure",
      "description": "Visit Ajmer Sharif Dargah (15km). Shop for rose water and silver jewelry, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Gaurav Rathore",
      "rating": 4.8,
      "date": "2026-05-02",
      "comment": "Pushkar has a unique spiritual vibe. Watching sunset over the lake from Savitri temple top was sublime."
    }
  ]
},
  {
  "id": 64,
  "title": "Mount Abu Dilwara Marble Temples & Sunset Point",
  "location": "Mount Abu, Rajasthan, India",
  "price": 399,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 86,
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Escape to Rajasthan's only hill station in the Aravalli Range. Marvel at 11th-century Dilwara Jain Temples featuring world's finest marble ceiling carvings, boat on Nakki Lake, and watch sunset at Sunset Point.",
  "highlights": [
    "Guided tour of Dilwara Jain Temples featuring breathtaking white marble ceiling filigree",
    "Boating on Nakki Lake, India's first artificial lake",
    "Watch sunset over Aravalli hills from famous Sunset Point",
    "Drive up to Guru Shikhar (5,650 ft), highest peak in Rajasthan",
    "Explore 14th-century Achalgarh Fort"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Mount Abu & Nakki Lake",
      "description": "Drive up Aravallis from Abu Road. Check into hotel. Evening boat ride on Nakki Lake and stroll."
    },
    {
      "day": 2,
      "title": "Dilwara Temples & Sunset Point",
      "description": "Tour Dilwara Marble Temples. Marvel at Luna Vasahi ceiling carvings. Evening walk to Sunset Point."
    },
    {
      "day": 3,
      "title": "Guru Shikhar & Achalgarh Fort",
      "description": "Drive to Guru Shikhar peak for panoramic views. Tour Achalgarh Fort and Mandakini shrine."
    },
    {
      "day": 4,
      "title": "Departure",
      "description": "Free morning for local markets, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Nilesh Jain",
      "rating": 4.9,
      "date": "2026-04-14",
      "comment": "Dilwara temple marble carving is unmatched anywhere in the world. Mount Abu climate is very pleasant."
    }
  ]
},
  {
  "id": 65,
  "title": "Kanyakumari Oceans Confluence & Sunset Rock Memorial",
  "location": "Kanyakumari, Tamil Nadu, India",
  "price": 369,
  "duration": 3,
  "rating": 4.9,
  "reviewsCount": 140,
  "category": "Beach",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Stand at the southernmost tip of mainland India where the Arabian Sea, Bay of Bengal, and Indian Ocean meet (Triveni Sangam). Ferry to Vivekananda Rock Memorial and Thiruvalluvar Statue, and watch simultaneous sunset and moonrise.",
  "highlights": [
    "Ferry boat ride to Vivekananda Rock Memorial & 133ft Thiruvalluvar Statue",
    "Witness simultaneous Sunset & Moonrise over the confluence of 3 Oceans (Triveni Sangam)",
    "Visit 3,000-year-old Bhagavathy Amman Temple",
    "Tour Padmanabhapuram Wooden Palace",
    "Sunrise view at Kanyakumari beach front"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Kanyakumari & Sunset Sangam",
      "description": "Arrive in Kanyakumari. Check in. Evening walk to Triveni Sangam beach for simultaneous sunset view."
    },
    {
      "day": 2,
      "title": "Vivekananda Rock Ferry & Padmanabhapuram Palace",
      "description": "Ferry to Vivekananda Rock Memorial island. Afternoon tour of teakwood Padmanabhapuram Palace."
    },
    {
      "day": 3,
      "title": "Sunrise View & Departure",
      "description": "6:00 AM sunrise view over ocean, visit Gandhi Memorial, checkout and transfer to Trivandrum airport."
    }
  ],
  "reviews": [
    {
      "author": "Manoj Pillai",
      "rating": 5,
      "date": "2026-05-08",
      "comment": "Standing at the southern tip of India watching three oceans meet is a powerful experience!"
    }
  ]
},
  {
  "id": 66,
  "title": "Hyderabad Charminar, Golconda & Ramoji Film City",
  "location": "Hyderabad, Telangana, India",
  "price": 449,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 160,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Explore the City of Pearls & Nizams. Climb historic Charminar, hear acoustic whispers at Golconda Fort, tour opulent Chowmahalla Palace, spend a day at Ramoji Film City, and feast on world-famous Hyderabadi Dum Biryani.",
  "highlights": [
    "Climb 16th-century Charminar & shop for Laad Bazaar lac bangles & pearls",
    "Sound & Light show at massive Golconda Fort cliff",
    "Full day excursion to Ramoji Film City, world's largest film studio complex",
    "Tour opulent Chowmahalla Palace & Qutb Shahi Tombs",
    "Feast on authentic Paradise / Hotel Shadab Hyderabadi Dum Biryani"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Hyderabad & Charminar Biryani Walk",
      "description": "Arrive in Hyderabad. Check in. Visit Charminar, Laad Bazaar, and dinner at Shadab for Hyderabadi Biryani."
    },
    {
      "day": 2,
      "title": "Golconda Fort & Chowmahalla Palace",
      "description": "Explore Golconda Fort's acoustic echo halls. Afternoon tour of Chowmahalla Palace royal armories."
    },
    {
      "day": 3,
      "title": "Ramoji Film City Excursion",
      "description": "Full day tour of Ramoji Film City movie sets, stunts, and gardens."
    },
    {
      "day": 4,
      "title": "Hussain Sagar Boat Ride & Departure",
      "description": "Boat ride on Hussain Sagar Lake to Buddha Statue, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Syed Ali",
      "rating": 5,
      "date": "2026-06-02",
      "comment": "Golconda fort acoustics blew my mind. And Hyderabadi Biryani here is hands down the best on earth!"
    }
  ]
},
  {
  "id": 67,
  "title": "Unakoti Rock-Cut Reliefs & Ujjayanta Royal Palace",
  "location": "Agartala & Unakoti, Tripura, India",
  "price": 449,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 62,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Journey to the mystery rock carving hill of Unakoti in Northeast India. Marvel at colossal 30ft rock-cut bas-relief Shiva heads in jungle cliffs, tour white marble Ujjayanta Palace, and Neermahal Water Palace.",
  "highlights": [
    "Marvel at 30ft rock-cut bas-relief head of Lord Shiva (Unakotiswara Kal Bhairava)",
    "Tour white neoclassical Ujjayanta Palace museum in Agartala",
    "Boat ride to Neermahal Water Palace in Rudrasagar Lake",
    "Explore Sepahijala Wildlife Sanctuary & Clouded Leopard enclave",
    "Taste Tripura bamboo shoot & fish delicacies"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Agartala & Ujjayanta Palace",
      "description": "Arrive in Agartala. Check in. Afternoon tour of royal Ujjayanta Palace and gardens."
    },
    {
      "day": 2,
      "title": "Unakoti Rock-Cut Shiva Reliefs Excursion",
      "description": "Drive to Kailashahar (170km). Hike up Unakoti hill to view 99,99,999 stone rock carvings and 30ft Shiva head."
    },
    {
      "day": 3,
      "title": "Neermahal Water Palace & Sepahijala",
      "description": "Boat ride to Neermahal Water Palace inside Rudrasagar Lake. Visit Sepahijala wildlife sanctuary."
    },
    {
      "day": 4,
      "title": "Handicrafts & Departure",
      "description": "Buy Tripura bamboo furniture and woven mats, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Bikram Tripura",
      "rating": 4.9,
      "date": "2026-03-20",
      "comment": "Unakoti rock carvings hidden in lush jungle are awe-inspiring. Neermahal water palace is stunning."
    }
  ]
},
  {
  "id": 68,
  "title": "Ayodhya Shri Ram Janmabhoomi Divine Heritage",
  "location": "Ayodhya, Uttar Pradesh, India",
  "price": 369,
  "duration": 3,
  "rating": 5.0,
  "reviewsCount": 240,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Visit the sacred birth city of Lord Rama. Experience Darshan at the grand Shri Ram Janmabhoomi Temple, attend evening Saryu River Aarti at Ram Ki Paidi, and visit Hanuman Garhi and Kanak Bhawan.",
  "highlights": [
    "Darshan at the grand pink sandstone Shri Ram Janmabhoomi Temple",
    "Attend evening Saryu River Aarti & Light show at Ram Ki Paidi",
    "Climb 76 steps to ancient Hanuman Garhi Temple",
    "Visit Kanak Bhawan palace gifted to Sita by Queen Kaikeyi",
    "Taste famous Ayodhya Pedas & Rabri"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Ayodhya & Saryu Aarti",
      "description": "Arrive at Maharishi Valmiki Ayodhya Airport. Check in. Evening visit to Saryu River Aarti at Ram Ki Paidi."
    },
    {
      "day": 2,
      "title": "Shri Ram Janmabhoomi Darshan & Hanuman Garhi",
      "description": "Morning Darshan at Shri Ram Janmabhoomi Temple. Visit Hanuman Garhi and Kanak Bhawan."
    },
    {
      "day": 3,
      "title": "Surya Kund & Departure",
      "description": "Visit Surya Kund and Lata Mangeshkar Chowk, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Raghavendra Pandey",
      "rating": 5,
      "date": "2026-05-15",
      "comment": "The new Ram Mandir is breathtaking. Saryu Aarti at sunset fills your heart with devotion. Jai Shri Ram!"
    }
  ]
},
  {
  "id": 69,
  "title": "Mussoorie Queen of Hills & Kempty Waterfalls",
  "location": "Mussoorie, Uttarakhand, India",
  "price": 389,
  "duration": 4,
  "rating": 4.7,
  "reviewsCount": 115,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Relax in the Queen of the Hills. Take the Gun Hill cable car for panoramic views of Doon Valley, splash under Kempty Falls, stroll colonial Mall Road, and walk through Lal Tibba and Company Garden.",
  "highlights": [
    "Cable car ropeway ride up to Gun Hill (2nd highest peak in Mussoorie)",
    "Cool splash under 40ft cascading Kempty Waterfalls",
    "Walk along historic colonial Mall Road & Camel's Back Road",
    "Panoramic Himalayan peak views from Lal Tibba telescope point",
    "Visit Landour Bakehouse for famous apple pies & pastries"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Dehradun to Mussoorie & Mall Road",
      "description": "Drive up winding roads from Dehradun into Mussoorie. Check in. Evening walk on Mall Road."
    },
    {
      "day": 2,
      "title": "Kempty Falls & Gun Hill Ropeway",
      "description": "Morning excursion to Kempty Falls. Afternoon cable car up to Gun Hill peak for valley views."
    },
    {
      "day": 3,
      "title": "Landour Walk & Lal Tibba Telescope",
      "description": "Drive up to serene Landour. Visit Lal Tibba view point and enjoy apple pie at Landour Bakehouse."
    },
    {
      "day": 4,
      "title": "Company Garden & Departure",
      "description": "Visit Company Garden, checkout and transfer back to Dehradun."
    }
  ],
  "reviews": [
    {
      "author": "Deepak Rawat",
      "rating": 4.7,
      "date": "2026-06-08",
      "comment": "Mussoorie and Landour are lovely hill towns. Landour bakehouse pastries were out of this world!"
    }
  ]
},
  {
  "id": 70,
  "title": "Sundarbans UNESCO Mangrove Royal Bengal Tiger Safari",
  "location": "Sundarbans, West Bengal, India",
  "price": 499,
  "duration": 4,
  "rating": 4.9,
  "reviewsCount": 98,
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Cruise through the world's largest mangrove forest on a motorized river boat safari. Track swimming Royal Bengal Tigers, spot saltwater estuarine crocodiles, mudskippers, and spot watchtowers at Sajnekhali.",
  "highlights": [
    "Motorized boat safari through narrow mangrove creeks of world's largest delta",
    "Track swimming Royal Bengal Tigers at Dobanki & Sajnekhali watchtowers",
    "Spot giant Saltwater Crocodiles basking on mudbanks & Gangetic dolphins",
    "Stay in eco jungle resorts on mangrove islands",
    "Traditional Bengali fish curry & Baul folk music evening"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Kolkata to Godkhali & Boat to Island Resort",
      "description": "Drive from Kolkata to Godkhali jetty. Board safari boat to mangrove island resort. Evening Baul music."
    },
    {
      "day": 2,
      "title": "Full Day Creek Safari & Dobanki Canopy Walk",
      "description": "Full day boat safari through narrow mangrove channels. Visit Dobanki canopy watchtower and Pirkhali."
    },
    {
      "day": 3,
      "title": "Sajnekhali Watchtower & Sudhanyakhali",
      "description": "Visit Sajnekhali Museum and Sudhanyakhali watchtower. Spot estuarine crocodiles and monitor lizards."
    },
    {
      "day": 4,
      "title": "Return Boat & Kolkata Departure",
      "description": "Morning island walk, return boat to Godkhali, drive back to Kolkata airport."
    }
  ],
  "reviews": [
    {
      "author": "Sourav Ganguly",
      "rating": 5,
      "date": "2026-04-18",
      "comment": "Cruising through mysterious mangrove creeks is thrilling. Spotting a tiger swimming across the creek was unreal!"
    }
  ]
},
  {
  "id": 71,
  "title": "Kolkata Cultural City of Joy Heritage Tour",
  "location": "Kolkata, West Bengal, India",
  "price": 349,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 135,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Experience the Cultural Capital of India. Ride iconic yellow vintage taxis and wood-framed trams, tour white marble Victoria Memorial, walk iconic Howrah Bridge, visit Mother House, and taste famous Rosogolla & Kathi Rolls.",
  "highlights": [
    "Ride Asia's oldest electric Tramway & vintage yellow Ambassador taxis",
    "Tour magnificent white marble Victoria Memorial & Princep Ghat sunset",
    "Walk across iconic 705-meter cantilever Howrah Bridge over Hooghly River",
    "Visit Kumartuli clay idol artisans & Mother Teresa's Mother House",
    "Feast on authentic Kolkata Biryani, Kathi Rolls & hot Rosogollas"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Kolkata & Howrah Bridge Walk",
      "description": "Arrive in Kolkata. Check in. Evening walk across Howrah Bridge and sunset boat ride at Princep Ghat."
    },
    {
      "day": 2,
      "title": "Victoria Memorial & Tram Heritage Ride",
      "description": "Tour Victoria Memorial gardens and gallery. Take a heritage electric tram ride to College Street book market."
    },
    {
      "day": 3,
      "title": "Kumartuli Artisans & Dakshineswar Temple",
      "description": "Visit Kumartuli potter village to see clay idol making. Tour Dakshineswar Kali Temple along the river."
    },
    {
      "day": 4,
      "title": "Sweet Tasting & Departure",
      "description": "Taste fresh warm Rosogollas at K.C. Das, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Srijit Mukherjee",
      "rating": 4.9,
      "date": "2026-05-14",
      "comment": "Kolkata's heritage, trams, and food are unmatched. Victoria memorial at sunset is stunning."
    }
  ]
},
  {
  "id": 72,
  "title": "Delhi Sultanate, Mughal & Imperial Heritage Tour",
  "location": "Delhi, UT, India",
  "price": 399,
  "duration": 4,
  "rating": 4.8,
  "reviewsCount": 185,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1588097281266-310cead47879?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Discover India's historic capital city spanning 7 ancient empires. Explore Qutub Minar, red sandstone Humayun's Tomb (inspiration for Taj Mahal), Red Fort, majestic Lotus Temple, and ride rickshaws through Chandni Chowk.",
  "highlights": [
    "Guided tour of UNESCO Qutub Minar (73m red sandstone tower) & Iron Pillar",
    "Explore UNESCO Humayun's Tomb, Mughal garden tomb architecture masterpiece",
    "Thrilling cycle rickshaw ride through narrow lanes of Chandni Chowk & Jama Masjid",
    "Visit iconic India Gate, Rashtrapati Bhavan & Lotus Temple",
    "Dine at famous Karim's for Mughlai Kebabs & Paranthe Wali Gali"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Delhi & India Gate Night View",
      "description": "Arrive in Delhi. Check in. Evening stroll around illuminated India Gate & Kartavya Path."
    },
    {
      "day": 2,
      "title": "Old Delhi Rickshaw Tour & Red Fort",
      "description": "Visit Jama Masjid. Cycle rickshaw ride through Chandni Chowk & Paranthe Wali Gali. Tour Red Fort."
    },
    {
      "day": 3,
      "title": "Qutub Minar & Humayun's Tomb",
      "description": "Explore Qutub Minar complex. Visit Humayun's Tomb gardens and Lotus Temple."
    },
    {
      "day": 4,
      "title": "Akshardham & Departure",
      "description": "Visit grand Swaminarayan Akshardham Temple, checkout and transfer to IGI Airport."
    }
  ],
  "reviews": [
    {
      "author": "Rohan Gupta",
      "rating": 4.9,
      "date": "2026-06-01",
      "comment": "Delhi has history around every corner! Qutub Minar and Humayun's Tomb are incredible."
    }
  ]
},
  {
  "id": 73,
  "title": "Pahalgam Betaab Valley & Kashmir Pine Meadows",
  "location": "Pahalgam, Kashmir, UT, India",
  "price": 549,
  "duration": 5,
  "rating": 4.9,
  "reviewsCount": 130,
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Relax in the Valley of Shepherds in Kashmir. Walk through pine forests along snow-fed Lidder River, ride horses to Mini Switzerland (Baisaran Valley), and explore scenic Betaab & Aru Valleys.",
  "highlights": [
    "Horse riding trek up to Baisaran Valley (Mini Switzerland of India)",
    "Explore snow-capped Betaab Valley & crystal-clear Aru Valley",
    "Trout fishing & riverside walks along snow-fed Lidder River",
    "Stay in boutique timber chalets surrounded by pine forests",
    "Sample Kashmiri Kahwa tea & saffron almonds"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Srinagar to Pahalgam Drive",
      "description": "Drive past saffron fields of Pampore to Pahalgam. Check into your riverside resort. Evening walk along Lidder river."
    },
    {
      "day": 2,
      "title": "Baisaran Valley (Mini Switzerland) Horse Trek",
      "description": "Pony ride up to lush green alpine meadows of Baisaran. View surrounding glacier peaks."
    },
    {
      "day": 3,
      "title": "Betaab Valley & Aru Valley Tour",
      "description": "Visit Betaab Valley (named after Bollywood film Betaab) and snow-covered Aru Valley."
    },
    {
      "day": 4,
      "title": "Chandanwari & Trout Fishing",
      "description": "Visit Chandanwari (starting point of Amarnath Yatra). Afternoon river walk and Kahwa tea."
    },
    {
      "day": 5,
      "title": "Return to Srinagar & Departure",
      "description": "Drive back to Srinagar airport for onward flight."
    }
  ],
  "reviews": [
    {
      "author": "Zoya Akhtar",
      "rating": 5,
      "date": "2026-05-20",
      "comment": "Pahalgam is heaven on earth! Baisaran valley looks just like the Swiss Alps."
    }
  ]
},
  {
  "id": 74,
  "title": "Lakshadweep Bangaram & Agatti Coral Lagoon Scuba",
  "location": "Bangaram & Agatti, Lakshadweep, UT, India",
  "price": 1199,
  "duration": 5,
  "rating": 5.0,
  "reviewsCount": 85,
  "category": "Beach",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Escape to India's pristine tropical coral atoll paradise. Swim in turquoise glass lagoons, scuba dive among vibrant coral reefs, manta rays & sea turtles, and relax on uninhabited white sand cays.",
  "highlights": [
    "Scuba Diving & Snorkeling in crystal-clear turquoise lagoons of Bangaram Island",
    "Speedboat trip to uninhabited Thinnakara & Parali coral cays",
    "Glass-bottom boat ride to spot sea turtles, manta rays & colorful coral reefs",
    "Stay in eco beach cottages steps away from the water",
    "Bioluminescent glowing night water beach walk"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Flight to Agatti & Boat to Bangaram",
      "description": "Flight from Kochi to Agatti airport. Speedboat transfer across turquoise lagoon to Bangaram Island. Check in."
    },
    {
      "day": 2,
      "title": "Scuba Diving & Coral Reef Snorkeling",
      "description": "PADI scuba diving session in clear lagoon waters. Spot manta rays, sea turtles, and clownfish."
    },
    {
      "day": 3,
      "title": "Uninhabited Island Hopping: Thinnakara",
      "description": "Boat trip to tiny uninhabited island of Thinnakara. Picnic lunch on white sand spit."
    },
    {
      "day": 4,
      "title": "Kayaking & Bioluminescent Night Walk",
      "description": "Sea kayaking in calm lagoon. Night walk on beach to see glowing bioluminescent plankton."
    },
    {
      "day": 5,
      "title": "Return Speedboat to Agatti & Flight Home",
      "description": "Speedboat back to Agatti airport for flight to Kochi."
    }
  ],
  "reviews": [
    {
      "author": "Dr. Sameer Khan",
      "rating": 5,
      "date": "2026-03-25",
      "comment": "Lakshadweep waters are clearer than the Maldives! Diving with sea turtles was unbelievable."
    }
  ]
},
  {
  "id": 75,
  "title": "Diu Island Portuguese Fort & Nagoa Beach Escape",
  "location": "Diu, Daman & Diu, UT, India",
  "price": 389,
  "duration": 3,
  "rating": 4.7,
  "reviewsCount": 78,
  "category": "Beach",
  "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Discover India's tranquil Portuguese island getaway. Explore 16th-century sea-facing Diu Fort cannons, relax on horseshoe-shaped Nagoa Beach with rare Hoka palm trees, and tour St. Paul's Church.",
  "highlights": [
    "Explore colossal sea-facing 16th-century Diu Fort & lighthouse",
    "Relax on horseshoe-shaped Nagoa Beach with unique African Hoka palm trees",
    "Visit Baroque-style St. Paul's Church & Diu Museum",
    "Explore Naida Caves natural rock openings & light passages",
    "Sunset views from Gangeshwar Mahadev Temple sea rocks"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Diu & Diu Fort Walk",
      "description": "Arrive in Diu airport/station. Check in. Explore Diu Fort and view sea cannons."
    },
    {
      "day": 2,
      "title": "Naida Caves & Nagoa Beach",
      "description": "Photography session inside sunlit Naida Caves. Afternoon watersports and relax on Nagoa Beach."
    },
    {
      "day": 3,
      "title": "Gangeshwar Temple & Departure",
      "description": "Visit sea-washed lingams at Gangeshwar Mahadev temple, checkout and transfer."
    }
  ],
  "reviews": [
    {
      "author": "Kinjal Shah",
      "rating": 4.7,
      "date": "2026-04-18",
      "comment": "Diu is very clean and peaceful. Naida caves light beams are a photographer's dream!"
    }
  ]
},
  {
  "id": 76,
  "title": "Chandigarh Rock Garden, Sukhna Lake & City Beautiful",
  "location": "Chandigarh, UT, India",
  "price": 329,
  "duration": 3,
  "rating": 4.7,
  "reviewsCount": 85,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Tour India's best planned modern green city designed by Le Corbusier. Explore Nek Chand's iconic Rock Garden built from recycled waste, boat on peaceful Sukhna Lake, and walk Zakir Hussain Rose Garden.",
  "highlights": [
    "Explore Nek Chand's world-famous Rock Garden built entirely of industrial & home waste",
    "Sunset boat ride & walk on 3km Sukhna Lake promenade",
    "Tour Zakir Hussain Rose Garden, Asia's largest rose sanctuary",
    "Marvel at Le Corbusier's Open Hand Monument at Capitol Complex",
    "Shopping at Sector 17 Plaza market"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Chandigarh & Sukhna Lake",
      "description": "Arrive in Chandigarh. Check in. Evening walk and boating at Sukhna Lake."
    },
    {
      "day": 2,
      "title": "Rock Garden & Capitol Complex",
      "description": "Explore 40-acre Rock Garden sculptures. Afternoon guided tour of Capitol Complex and Open Hand Monument."
    },
    {
      "day": 3,
      "title": "Rose Garden & Departure",
      "description": "Stroll through Rose Garden, buy Punjabi Juttis at Sector 17, checkout and airport transfer."
    }
  ],
  "reviews": [
    {
      "author": "Harmanpreet Singh",
      "rating": 4.8,
      "date": "2026-05-10",
      "comment": "Chandigarh is super clean and well organized. The Rock garden sculptures are truly unique!"
    }
  ]
}
,
{
  "id": 501,
  "title": "Dubai Luxury & Desert Safari Expedition",
  "location": "Dubai, United Arab Emirates",
  "price": 55000,
  "duration": 5,
  "rating": 4.9,
  "reviewsCount": 210,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Experience the epitome of luxury and adventure in Dubai. From the world's tallest skyscraper Burj Khalifa to dune bashing in red desert sands, luxury yacht cruises, and gold souk shopping.",
  "highlights": [
    "At The Top Burj Khalifa observation deck entry",
    "Dune bashing 4x4 desert safari with BBQ buffet & belly dance",
    "Sunset luxury yacht cruise around Marina & Palm Jumeirah",
    "Dubai Mall & Fountain spectacle tour",
    "Old Dubai Gold & Spice Souk guided walk"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & Marina Cruise",
      "description": "Arrive at Dubai International Airport (DXB). Private transfer to 5-star hotel. Evening Dhow dinner cruise at Dubai Marina."
    },
    {
      "day": 2,
      "title": "Burj Khalifa & Modern Dubai",
      "description": "Visit Burj Khalifa 124th floor, Dubai Mall Aquarium, and watch the evening Dubai Fountain show."
    },
    {
      "day": 3,
      "title": "Red Dune Desert Safari",
      "description": "Morning at leisure. Afternoon 4x4 dune bashing in Lahbab desert, camel riding, quad biking, and Arabian night BBQ dinner."
    },
    {
      "day": 4,
      "title": "Palm Jumeirah & Atlantis",
      "description": "Explore Atlantis Aquaventure Waterpark and The Lost Chambers Aquarium. Photo stop at Burj Al Arab."
    },
    {
      "day": 5,
      "title": "Old Dubai & Departure",
      "description": "Cross Dubai Creek on traditional Abra boat, shop at Gold & Spice Souks, and transfer to airport."
    }
  ]
},
{
  "id": 502,
  "title": "Paris Romance & French Riviera Escapade",
  "location": "Paris & Nice, France",
  "price": 98000,
  "duration": 7,
  "rating": 4.9,
  "reviewsCount": 185,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Indulge in the world's romantic capital and the glamorous French Riviera. See the Eiffel Tower illuminated at night, admire masterpieces in the Louvre, and stroll the promenade of Nice.",
  "highlights": [
    "Skip-the-line Eiffel Tower summit access",
    "Seine River romantic dinner cruise",
    "Louvre Museum guided tour with Mona Lisa",
    "High-speed TGV train ride to Nice & Cote d'Azur",
    "Day trip to Monaco & Monte Carlo casinos"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Welcome to Paris",
      "description": "Check in to boutique hotel near Champs-Elysees. Evening illumination walk to Eiffel Tower."
    },
    {
      "day": 2,
      "title": "Louvre & Seine Cruise",
      "description": "Guided tour of the Louvre. Afternoon Montmartre artist square walk and evening Seine river cruise."
    },
    {
      "day": 3,
      "title": "Palace of Versailles",
      "description": "Day excursion to the majestic Palace and Gardens of Versailles."
    },
    {
      "day": 4,
      "title": "TGV to Nice & Riviera",
      "description": "Board high-speed train to Nice. Evening stroll along the famous Promenade des Anglais."
    },
    {
      "day": 5,
      "title": "Monaco & Monte Carlo",
      "description": "Day trip along the Mediterranean coast to Eze perfume factory and Monaco Grand Prix circuit."
    },
    {
      "day": 6,
      "title": "Cannes & Antibes Beach",
      "description": "Explore Cannes red carpet boulevard and Antibes billionaire yacht harbor."
    },
    {
      "day": 7,
      "title": "Departure from Nice",
      "description": "French pastry breakfast and transfer to Nice Cote d'Azur Airport."
    }
  ]
},
{
  "id": 503,
  "title": "Tokyo & Kyoto Cherry Blossom Odyssey",
  "location": "Tokyo & Kyoto, Japan",
  "price": 115000,
  "duration": 8,
  "rating": 4.9,
  "reviewsCount": 162,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Discover Japan's captivating blend of futuristic neon cities and ancient Zen traditions. Experience Shinkansen bullet trains, Mount Fuji snow peaks, Kyoto bamboo groves, and authentic sushi.",
  "highlights": [
    "Shibuya Crossing & Tokyo Skytree panorama",
    "Mount Fuji & Lake Ashi pirate boat cruise",
    "Bullet train (Shinkansen) ride to Kyoto",
    "Fushimi Inari 10,000 orange Torii gates walk",
    "Arashiyama Bamboo Forest & Geisha district tea ceremony"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Tokyo",
      "description": "Arrive at Tokyo Haneda/Narita. Transfer to Shinjuku hotel. Evening neon lights walk."
    },
    {
      "day": 2,
      "title": "Tokyo Ancient & Modern",
      "description": "Sens\u014d-ji Temple in Asakusa, Akihabara tech hub, and Shibuya Crossing."
    },
    {
      "day": 3,
      "title": "Mount Fuji & Hakone Day Trip",
      "description": "Cable car ride to Owakudani volcanic valley and boat cruise on Lake Ashi with Fuji views."
    },
    {
      "day": 4,
      "title": "Shinkansen to Kyoto",
      "description": "Experience 300 km/h bullet train. Visit Kinkaku-ji (Golden Pavilion)."
    },
    {
      "day": 5,
      "title": "Kyoto Shrine & Bamboo Grove",
      "description": "Walk through Arashiyama Bamboo Grove and Fushimi Inari Taisha shrine."
    },
    {
      "day": 6,
      "title": "Nara Deer Park Excursion",
      "description": "Feed friendly sacred deer in Nara Park and marvel at Todai-ji Giant Buddha."
    },
    {
      "day": 7,
      "title": "Osaka Dotonbori Street Food",
      "description": "Evening street food tasting tour in Osaka's vibrant Dotonbori district."
    },
    {
      "day": 8,
      "title": "Departure from Osaka/Tokyo",
      "description": "Airport transfer for return flight."
    }
  ]
},
{
  "id": 504,
  "title": "Maldives Overwater Ocean Villa Paradise",
  "location": "Male, Maldives",
  "price": 85000,
  "duration": 5,
  "rating": 5.0,
  "reviewsCount": 240,
  "category": "Beach",
  "image": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Escape to pure tropical luxury in private overwater bungalows surrounded by turquoise lagoons. Unlimited watersports, sunset dolphin cruises, and floating breakfasts.",
  "highlights": [
    "Luxury Seaplane flight transfer to private resort island",
    "Stay in private Overwater Bungalow with glass floor panel",
    "Floating breakfast in private infinity plunge pool",
    "Sunset catamaran cruise with wild dolphin watching",
    "Guided house-reef snorkeling with sea turtles & rays"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Seaplane Arrival",
      "description": "Scenic seaplane transfer from Velana Airport. Check in to Overwater Villa with ocean access."
    },
    {
      "day": 2,
      "title": "Snorkeling & Coral Reef",
      "description": "Guided reef snorkeling trip. Afternoon spa massage over the water."
    },
    {
      "day": 3,
      "title": "Floating Breakfast & Watersports",
      "description": "Iconic floating pool breakfast. Kayaking, paddleboarding, and jet-skiing."
    },
    {
      "day": 4,
      "title": "Dolphin Sunset Cruise",
      "description": "Relax on sun loungers. Sunset champagne cruise watching spinner dolphins."
    },
    {
      "day": 5,
      "title": "Seaplane Departure",
      "description": "Morning lagoon swim, seaplane transfer back to Male for departure."
    }
  ]
},
{
  "id": 505,
  "title": "Cappadocia & Istanbul Turkish Delight",
  "location": "Cappadocia & Istanbul, Turkey",
  "price": 75000,
  "duration": 6,
  "rating": 4.8,
  "reviewsCount": 130,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80",
  "featured": true,
  "description": "Soar over fairytale chimneys in a sunrise hot air balloon over Cappadocia and explore Istanbul's majestic Blue Mosque, Hagia Sophia, and Bosphorus Strait.",
  "highlights": [
    "Sunrise Hot Air Balloon flight over Cappadocia fairy chimneys",
    "Stay in authentic luxury Cave Hotel suite",
    "Guided tour of Hagia Sophia & Grand Bazaar in Istanbul",
    "Bosphorus Sunset Yacht Cruise bridging Europe & Asia",
    "Derinkuyu Underground City exploration"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Istanbul",
      "description": "Check in near Sultanahmet. Evening Turkish tea & baklava tasting walk."
    },
    {
      "day": 2,
      "title": "Istanbul Imperial Jewels",
      "description": "Visit Hagia Sophia, Blue Mosque, Topkapi Palace, and Grand Bazaar."
    },
    {
      "day": 3,
      "title": "Flight to Cappadocia & Cave Suite",
      "description": "Fly to Nevsehir/Kayseri. Check in to luxury cave resort in Goreme."
    },
    {
      "day": 4,
      "title": "Hot Air Balloon & Red Valley",
      "description": "At 5:00 AM soar in hot air balloon. Afternoon tour of Goreme Open Air Museum."
    },
    {
      "day": 5,
      "title": "Underground City & ATV Safari",
      "description": "Explore 8-level deep Derinkuyu underground city and sunset ATV quad safari."
    },
    {
      "day": 6,
      "title": "Bosphorus Cruise & Departure",
      "description": "Fly back to Istanbul. Bosphorus cruise before evening flight home."
    }
  ]
},
{
  "id": 506,
  "title": "Singapore & Sentosa Island Fantasy",
  "location": "Singapore",
  "price": 52000,
  "duration": 5,
  "rating": 4.8,
  "reviewsCount": 175,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Discover the futuristic Lion City! Marvel at Gardens by the Bay Supertrees, Marina Bay Sands infinity pool, Universal Studios Sentosa, and Night Safari.",
  "highlights": [
    "Gardens by the Bay Avatar Supertree light show & Flower Dome",
    "Full-day Universal Studios Singapore entry at Sentosa",
    "Night Safari tram ride through nocturnal wildlife habitats",
    "Marina Bay Sands Skypark observation deck",
    "Singapore Flyer giant observation wheel ride"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Jewel Changi & Marina Bay",
      "description": "Arrive at Changi. See Rain Vortex waterfall. Evening Skypark deck views."
    },
    {
      "day": 2,
      "title": "Universal Studios Sentosa",
      "description": "Full day of thrilling rides, Transformers 3D, and S.E.A. Aquarium."
    },
    {
      "day": 3,
      "title": "City Tour & Gardens by the Bay",
      "description": "Merlion Park photo stop, Chinatown, and Supertree Grove light & sound show."
    },
    {
      "day": 4,
      "title": "Mandai Wildlife Night Safari",
      "description": "Morning at leisure. Evening open-air tram ride through nocturnal rainforest."
    },
    {
      "day": 5,
      "title": "Shopping & Departure",
      "description": "Orchard Road shopping and airport departure."
    }
  ]
},
{
  "id": 507,
  "title": "Thailand Phuket & Phi Phi Island Paradise",
  "location": "Phuket & Krabi, Thailand",
  "price": 38000,
  "duration": 6,
  "rating": 4.7,
  "reviewsCount": 220,
  "category": "Beach",
  "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Experience Thailand's tropical jewel. Speedboat to Maya Bay (from 'The Beach' movie), snorkel in Emerald Lagoon, visit James Bond Island, and enjoy Patong nightlife.",
  "highlights": [
    "Speedboat excursion to Phi Phi Islands & Maya Bay",
    "James Bond Island & Phang Nga Bay sea canoeing",
    "Phuket Big Buddha & Wat Chalong Temple",
    "Traditional Thai massage & beach club entry",
    "Simon Cabaret Show & Patong Street Walking Tour"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Phuket",
      "description": "Transfer to Patong Beach resort. Evening sunset beach walk."
    },
    {
      "day": 2,
      "title": "Phi Phi & Maya Bay Speedboat",
      "description": "Speedboat tour to Maya Bay, Pileh Lagoon cliff jumping, and Monkey Beach."
    },
    {
      "day": 3,
      "title": "James Bond Island Canoeing",
      "description": "Sea kayaking through limestone caves in Phang Nga Bay."
    },
    {
      "day": 4,
      "title": "Phuket Island Highlights",
      "description": "Big Buddha viewpoint, Old Phuket Town Sino-Portuguese architecture."
    },
    {
      "day": 5,
      "title": "Elephant Sanctuary & Spa",
      "description": "Ethical elephant feeding session and 2-hour Thai herbal spa."
    },
    {
      "day": 6,
      "title": "Departure",
      "description": "Souvenir shopping and airport transfer."
    }
  ]
},
{
  "id": 508,
  "title": "Rome & Amalfi Coast Italian Dream",
  "location": "Rome & Amalfi, Italy",
  "price": 92000,
  "duration": 7,
  "rating": 4.9,
  "reviewsCount": 140,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Step back into Roman history and soak in dramatic Mediterranean cliffs. Visit the Colosseum, Vatican Museums, Trevi Fountain, and cliffside Positano village.",
  "highlights": [
    "Colosseum underground dungeons & Forum guided tour",
    "Vatican City & Sistine Chapel Michelangelo frescoes",
    "Scenic drive along cliffside Positano & Amalfi coast",
    "Authentic Neapolitan pizza & gelato making masterclass",
    "Trevi Fountain coin toss & Spanish Steps walk"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Eternal City",
      "description": "Check in to boutique hotel near Trevi Fountain. Evening pasta dinner."
    },
    {
      "day": 2,
      "title": "Ancient Colosseum & Forum",
      "description": "Skip-the-line tour of Colosseum arena floor and Palatine Hill."
    },
    {
      "day": 3,
      "title": "Vatican City & Sistine Chapel",
      "description": "Explore St. Peter's Basilica and Vatican Museum masterpieces."
    },
    {
      "day": 4,
      "title": "Train to Naples & Amalfi Coast",
      "description": "High-speed train to Naples, private transfer to Amalfi coastal hotel."
    },
    {
      "day": 5,
      "title": "Positano & Ravello Day Tour",
      "description": "Visit colorful Positano village and cliffside Villa Rufolo in Ravello."
    },
    {
      "day": 6,
      "title": "Capri Island Boat Excursion",
      "description": "Boat cruise to Capri Island and Blue Grotto sea cave."
    },
    {
      "day": 7,
      "title": "Departure from Rome/Naples",
      "description": "Espresso breakfast and airport departure."
    }
  ]
},
{
  "id": 509,
  "title": "Egypt Pyramids & Nile River Cruise",
  "location": "Cairo & Luxor, Egypt",
  "price": 68000,
  "duration": 7,
  "rating": 4.8,
  "reviewsCount": 115,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Unravel ancient mysteries of the Pharaohs. Stand before the Great Pyramids of Giza and Sphinx, sail the Nile River on a 5-star cruise ship, and see King Tutankhamun's gold mask.",
  "highlights": [
    "Great Pyramids of Giza & Great Sphinx guided expedition",
    "Egyptian Museum & King Tutankhamun solid gold mask",
    "3-Night 5-Star Nile River Cruise from Luxor to Aswan",
    "Valley of the Kings royal tombs & Karnak Temple",
    "Sunrise Hot Air Balloon over Luxor ancient temples"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Cairo",
      "description": "Transfer to hotel overlooking Pyramids. Welcome dinner."
    },
    {
      "day": 2,
      "title": "Pyramids & Sphinx",
      "description": "Explore Pyramids of Khufu, Khafre, Menkaure, and Great Sphinx."
    },
    {
      "day": 3,
      "title": "Flight to Luxor & Nile Cruise Boarding",
      "description": "Fly to Luxor. Embark 5-star Nile cruise ship. Visit Karnak Temple."
    },
    {
      "day": 4,
      "title": "Valley of the Kings & Edfu",
      "description": "Explore royal pharaoh tombs in Valley of the Kings. Sail to Edfu."
    },
    {
      "day": 5,
      "title": "Kom Ombo & Sail to Aswan",
      "description": "Visit Kom Ombo crocodile temple and sail to Aswan."
    },
    {
      "day": 6,
      "title": "Philae Temple & Cairo Return",
      "description": "Visit island Temple of Philae. Fly back to Cairo."
    },
    {
      "day": 7,
      "title": "Khan el-Khalili Bazaar & Departure",
      "description": "Shop at medieval bazaar and transfer to Cairo airport."
    }
  ]
},
{
  "id": 510,
  "title": "London & Scottish Highlands Expedition",
  "location": "London & Edinburgh, UK",
  "price": 108000,
  "duration": 8,
  "rating": 4.8,
  "reviewsCount": 125,
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
  "featured": false,
  "description": "Experience iconic British landmarks from Big Ben and Buckingham Palace to Edinburgh Castle and Loch Ness in the dramatic Scottish Highlands.",
  "highlights": [
    "London Eye ride & Big Ben photo walk",
    "Buckingham Palace Changing of the Guard",
    "Tower of London & Crown Jewels viewing",
    "High-speed LNER train to Edinburgh Castle",
    "Scottish Highlands tour to Loch Ness & Glen Coe"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in London",
      "description": "Check in near Westminster. Evening West End theatre show walk."
    },
    {
      "day": 2,
      "title": "Royal London & Tower Bridge",
      "description": "See Buckingham Palace guard change, Big Ben, and Tower Bridge."
    },
    {
      "day": 3,
      "title": "Windsor Castle & Stonehenge",
      "description": "Day trip to royal Windsor Castle and mysterious ancient Stonehenge."
    },
    {
      "day": 4,
      "title": "Train to Edinburgh",
      "description": "Scenic East Coast train to Scotland. Royal Mile evening pub walk."
    },
    {
      "day": 5,
      "title": "Edinburgh Castle & Palace",
      "description": "Explore historic Edinburgh Castle and Palace of Holyroodhouse."
    },
    {
      "day": 6,
      "title": "Loch Ness & Glen Coe Highlands",
      "description": "Guided day tour through Glen Coe valley and boat search for 'Nessie' at Loch Ness."
    },
    {
      "day": 7,
      "title": "Highland Whisky Distillery",
      "description": "Scotch whisky tasting tour and traditional Haggis dinner."
    },
    {
      "day": 8,
      "title": "Departure from Edinburgh/London",
      "description": "Flight departure."
    }
  ]
}
];
