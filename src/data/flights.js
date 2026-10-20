export const initialFlights = [
  {
    id: 501,
    flightNumber: "AI-102",
    airline: "Air India",
    logo: "✈️",
    origin: "DEL",
    originCity: "Delhi (DEL)",
    destination: "BOM",
    destinationCity: "Mumbai (BOM)",
    departureTime: "07:30 AM",
    arrivalTime: "09:45 AM",
    duration: "2h 15m",
    price: 65,
    stops: "Non-stop",
    aircraft: "Boeing 787 Dreamliner",
    cabinClasses: [
      { id: "cb-eco", name: "Economy Super Value", priceMultiplier: 1.0, baggage: "15 kg Check-in, 7 kg Cabin" },
      { id: "cb-flex", name: "Economy Flex Pass", priceMultiplier: 1.3, baggage: "25 kg Check-in, Free Seat Selection" },
      { id: "cb-biz", name: "Executive Business Class", priceMultiplier: 2.8, baggage: "35 kg Check-in, Flat-bed seat, Lounge access" }
    ]
  },
  {
    id: 502,
    flightNumber: "EK-507",
    airline: "Emirates",
    logo: "🇦🇪",
    origin: "BOM",
    originCity: "Mumbai (BOM)",
    destination: "DXB",
    destinationCity: "Dubai (DXB)",
    departureTime: "03:15 PM",
    arrivalTime: "05:00 PM",
    duration: "3h 15m",
    price: 240,
    stops: "Non-stop",
    aircraft: "Airbus A380-800",
    cabinClasses: [
      { id: "cb-eco", name: "Economy Saver", priceMultiplier: 1.0, baggage: "25 kg Check-in, 7 kg Cabin" },
      { id: "cb-biz", name: "Business Class Lounge", priceMultiplier: 3.5, baggage: "40 kg Check-in, Chauffeur drive, Onboard lounge" }
    ]
  },
  {
    id: 503,
    flightNumber: "SQ-421",
    airline: "Singapore Airlines",
    logo: "🇸🇬",
    origin: "DEL",
    originCity: "Delhi (DEL)",
    destination: "SIN",
    destinationCity: "Singapore (SIN)",
    departureTime: "09:50 AM",
    arrivalTime: "06:05 PM",
    duration: "5h 45m",
    price: 310,
    stops: "Non-stop",
    aircraft: "Boeing 787-10",
    cabinClasses: [
      { id: "cb-eco", name: "Economy Class", priceMultiplier: 1.0, baggage: "30 kg Check-in, KrisWorld Entertainment" },
      { id: "cb-peco", name: "Premium Economy", priceMultiplier: 1.6, baggage: "35 kg Check-in, Priority Boarding, Champagne" }
    ]
  },
  {
    id: 504,
    flightNumber: "AF-226",
    airline: "Air France",
    logo: "🇫🇷",
    origin: "DEL",
    originCity: "Delhi (DEL)",
    destination: "CDG",
    destinationCity: "Paris (CDG)",
    departureTime: "01:20 AM",
    arrivalTime: "06:50 AM",
    duration: "9h 00m",
    price: 580,
    stops: "Non-stop",
    aircraft: "Airbus A350-900",
    cabinClasses: [
      { id: "cb-eco", name: "Standard Economy", priceMultiplier: 1.0, baggage: "23 kg Check-in, French Cuisine Meal" },
      { id: "cb-biz", name: "Business Direct-Access", priceMultiplier: 3.2, baggage: "2 x 32 kg Check-in, Full Flat Bed, Salon Lounge" }
    ]
  },
  {
    id: 505,
    flightNumber: "6E-2041",
    airline: "IndiGo",
    logo: "🟦",
    origin: "DEL",
    originCity: "Delhi (DEL)",
    destination: "GOI",
    destinationCity: "Goa (GOI)",
    departureTime: "11:10 AM",
    arrivalTime: "01:45 PM",
    duration: "2h 35m",
    price: 52,
    stops: "Non-stop",
    aircraft: "Airbus A320neo",
    cabinClasses: [
      { id: "cb-eco", name: "Saver Fare", priceMultiplier: 1.0, baggage: "15 kg Check-in" },
      { id: "cb-flexi", name: "Flexi Plus", priceMultiplier: 1.25, baggage: "15 kg Check-in, Free Sandwich + Seat" }
    ]
  },
  {
    id: 506,
    flightNumber: "JL-740",
    airline: "Japan Airlines",
    logo: "🇯🇵",
    origin: "DEL",
    originCity: "Delhi (DEL)",
    destination: "NRT",
    destinationCity: "Tokyo (NRT)",
    departureTime: "07:15 PM",
    arrivalTime: "06:40 AM (+1 day)",
    duration: "7h 55m",
    price: 640,
    stops: "Non-stop",
    aircraft: "Boeing 787-9",
    cabinClasses: [
      { id: "cb-eco", name: "JAL SKY WIDER Economy", priceMultiplier: 1.0, baggage: "2 x 23 kg Check-in" },
      { id: "cb-biz", name: "JAL SKY SUITE Business", priceMultiplier: 3.4, baggage: "3 x 32 kg Check-in, Japanese Kaiseki Dining" }
    ]
  },
  {
    id: 507,
    flightNumber: "BA-138",
    airline: "British Airways",
    logo: "🇬🇧",
    origin: "BOM",
    originCity: "Mumbai (BOM)",
    destination: "LHR",
    destinationCity: "London (LHR)",
    departureTime: "02:10 AM",
    arrivalTime: "07:30 AM",
    duration: "9h 50m",
    price: 610,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    cabinClasses: [
      { id: "cb-eco", name: "World Traveller", priceMultiplier: 1.0, baggage: "23 kg Check-in, High-tea service" },
      { id: "cb-club", name: "Club World Business Suite", priceMultiplier: 3.6, baggage: "2 x 32 kg Check-in, Club Suite with privacy door" }
    ]
  },
  {
    id: 508,
    flightNumber: "QR-557",
    airline: "Qatar Airways",
    logo: "🇶🇦",
    origin: "BLR",
    originCity: "Bengaluru (BLR)",
    destination: "DOH",
    destinationCity: "Doha (DOH)",
    departureTime: "04:15 AM",
    arrivalTime: "06:20 AM",
    duration: "4h 35m",
    price: 260,
    stops: "Non-stop",
    aircraft: "Airbus A350-1000",
    cabinClasses: [
      { id: "cb-eco", name: "Classic Economy", priceMultiplier: 1.0, baggage: "30 kg Check-in, Oryx One entertainment" },
      { id: "cb-qsuite", name: "Qsuite Business Class", priceMultiplier: 3.8, baggage: "40 kg Check-in, Double bed in the sky, Al Mourjan lounge" }
    ]
  },
  {
    id: 509,
    flightNumber: "UK-811",
    airline: "Vistara",
    logo: "✈️",
    origin: "DEL",
    originCity: "Delhi (DEL)",
    destination: "BLR",
    destinationCity: "Bengaluru (BLR)",
    departureTime: "06:00 AM",
    arrivalTime: "08:45 AM",
    duration: "2h 45m",
    price: 58,
    stops: "Non-stop",
    aircraft: "Airbus A321neo",
    cabinClasses: [
      { id: "cb-eco", name: "Economy Standard", priceMultiplier: 1.0, baggage: "15 kg Check-in, Hot gourmet meal" },
      { id: "cb-peco", name: "Premium Economy", priceMultiplier: 1.5, baggage: "20 kg Check-in, Extra legroom, Priority check-in" },
      { id: "cb-biz", name: "Business Class", priceMultiplier: 2.9, baggage: "30 kg Check-in, Lounge access, Leather recliner" }
    ]
  },
  {
    id: 510,
    flightNumber: "AI-187",
    airline: "Air India",
    logo: "✈️",
    origin: "DEL",
    originCity: "Delhi (DEL)",
    destination: "SFO",
    destinationCity: "San Francisco (SFO)",
    departureTime: "03:30 AM",
    arrivalTime: "07:00 AM",
    duration: "15h 30m",
    price: 950,
    stops: "Non-stop (Polar Route)",
    aircraft: "Boeing 777-200LR",
    cabinClasses: [
      { id: "cb-eco", name: "Economy Long Haul", priceMultiplier: 1.0, baggage: "2 x 23 kg Check-in, Full hot meals" },
      { id: "cb-biz", name: "Executive Flat Bed", priceMultiplier: 3.5, baggage: "2 x 32 kg Check-in, Maharajah Lounge, 180° Flat Bed" }
    ]
  },
  {
    id: 511,
    flightNumber: "6E-1405",
    airline: "IndiGo",
    logo: "🟦",
    origin: "BOM",
    originCity: "Mumbai (BOM)",
    destination: "MLE",
    destinationCity: "Maldives (MLE)",
    departureTime: "08:25 AM",
    arrivalTime: "10:55 AM",
    duration: "3h 00m",
    price: 135,
    stops: "Non-stop",
    aircraft: "Airbus A320neo",
    cabinClasses: [
      { id: "cb-eco", name: "Saver Paradise", priceMultiplier: 1.0, baggage: "20 kg Check-in" },
      { id: "cb-flex", name: "Super 6E Plus", priceMultiplier: 1.35, baggage: "25 kg Check-in, Hot meal, Free XL seat" }
    ]
  },
  {
    id: 512,
    flightNumber: "EY-205",
    airline: "Etihad Airways",
    logo: "🇦🇪",
    origin: "BOM",
    originCity: "Mumbai (BOM)",
    destination: "AUH",
    destinationCity: "Abu Dhabi (AUH)",
    departureTime: "04:55 PM",
    arrivalTime: "06:45 PM",
    duration: "3h 20m",
    price: 215,
    stops: "Non-stop",
    aircraft: "Boeing 787-9",
    cabinClasses: [
      { id: "cb-eco", name: "Economy Choice", priceMultiplier: 1.0, baggage: "30 kg Check-in, E-BOX Entertainment" },
      { id: "cb-biz", name: "Business Studio", priceMultiplier: 3.2, baggage: "40 kg Check-in, Chauffeur transfer, Dine anytime" }
    ]
  }
];
