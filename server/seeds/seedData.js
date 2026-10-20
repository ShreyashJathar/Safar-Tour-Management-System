import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';
import { initialTours } from '../../src/data/tours.js';
import { initialHotels } from '../../src/data/hotels.js';
import { initialPlaces } from '../../src/data/places.js';
import { initialFlights } from '../../src/data/flights.js';

export async function seedInitialData() {
  try {
    // 1. Seed Default Admin User
    const [adminCheck] = await pool.query('SELECT id FROM users WHERE email = ?', ['shreyash.admin@gmail.com']);
    if (adminCheck.length === 0) {
      const hashedPassword = await bcrypt.hash('shashank', 10);
      await pool.query(
        'INSERT INTO users (fullName, email, password, role, is_verified) VALUES (?, ?, ?, "Admin", 1)',
        ['Shreyash Jathar', 'shreyash.admin@gmail.com', hashedPassword]
      );
      console.log("[Seed] Admin user 'Shreyash Jathar' initialized.");
    }

    // 2. Seed Tours (All 86+ tours)
    const [tourCount] = await pool.query('SELECT COUNT(*) as count FROM tours');
    if (tourCount[0].count < initialTours.length) {
      for (const tour of initialTours) {
        await pool.query(
          `INSERT INTO tours (id, title, location, duration, price, rating, reviewsCount, image, category, description, highlights, itinerary, reviews, featured)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
             title = VALUES(title), location = VALUES(location), duration = VALUES(duration), 
             price = VALUES(price), rating = VALUES(rating), reviewsCount = VALUES(reviewsCount),
             image = VALUES(image), category = VALUES(category), description = VALUES(description),
             highlights = VALUES(highlights), itinerary = VALUES(itinerary), reviews = VALUES(reviews),
             featured = VALUES(featured)`,
          [
            tour.id,
            tour.title,
            tour.location,
            tour.duration || 5,
            tour.price,
            tour.rating || 5.0,
            tour.reviewsCount || 0,
            tour.image,
            tour.category || 'Adventure',
            tour.description || '',
            JSON.stringify(tour.highlights || []),
            JSON.stringify(tour.itinerary || []),
            JSON.stringify(tour.reviews || []),
            tour.featured ? 1 : 0
          ]
        );
      }
      console.log(`[Seed] Successfully synchronized ${initialTours.length} Tour Packages in MySQL.`);
    }

    // 3. Seed Hotels (All 24+ hotels)
    const [hotelCount] = await pool.query('SELECT COUNT(*) as count FROM hotels');
    if (hotelCount[0].count < initialHotels.length) {
      for (const hotel of initialHotels) {
        await pool.query(
          `INSERT INTO hotels (id, name, location, price, rating, reviewsCount, image, description, amenities, roomTypes, reviews)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             name = VALUES(name), location = VALUES(location), price = VALUES(price),
             rating = VALUES(rating), reviewsCount = VALUES(reviewsCount), image = VALUES(image),
             description = VALUES(description), amenities = VALUES(amenities), roomTypes = VALUES(roomTypes),
             reviews = VALUES(reviews)`,
          [
            hotel.id,
            hotel.name,
            hotel.location,
            hotel.price,
            hotel.rating || 5.0,
            hotel.reviewsCount || 0,
            hotel.image,
            hotel.description || '',
            JSON.stringify(hotel.amenities || []),
            JSON.stringify(hotel.roomTypes || []),
            JSON.stringify(hotel.reviews || [])
          ]
        );
      }
      console.log(`[Seed] Successfully synchronized ${initialHotels.length} Luxury Hotels in MySQL.`);
    }

    // 4. Seed Places (All 18+ landmark destinations)
    const [placeCount] = await pool.query('SELECT COUNT(*) as count FROM places');
    if (placeCount[0].count < initialPlaces.length) {
      for (const place of initialPlaces) {
        await pool.query(
          `INSERT INTO places (id, name, city, country, category, rating, reviewsCount, ticketPrice, image, galleryImages, openingHours, address, description, highlights, ticketTypes, reviews)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             name = VALUES(name), city = VALUES(city), country = VALUES(country), category = VALUES(category),
             rating = VALUES(rating), reviewsCount = VALUES(reviewsCount), ticketPrice = VALUES(ticketPrice),
             image = VALUES(image), galleryImages = VALUES(galleryImages), openingHours = VALUES(openingHours),
             address = VALUES(address), description = VALUES(description), highlights = VALUES(highlights),
             ticketTypes = VALUES(ticketTypes), reviews = VALUES(reviews)`,
          [
            place.id,
            place.name,
            place.city,
            place.country,
            place.category || 'Landmarks',
            place.rating || 4.9,
            place.reviewsCount || 100,
            place.ticketPrice || 25,
            place.image,
            JSON.stringify(place.galleryImages || []),
            place.openingHours || '09:00 AM - 06:00 PM',
            place.address || '',
            place.description || '',
            JSON.stringify(place.highlights || []),
            JSON.stringify(place.ticketTypes || []),
            JSON.stringify(place.reviews || [])
          ]
        );
      }
      console.log(`[Seed] Successfully synchronized ${initialPlaces.length} Landmark Places & Attractions in MySQL.`);
    }

    // 5. Seed Flights (All 12+ flight routes)
    const [flightCount] = await pool.query('SELECT COUNT(*) as count FROM flights');
    if (flightCount[0].count < initialFlights.length) {
      for (const flight of initialFlights) {
        await pool.query(
          `INSERT INTO flights (id, flightNumber, airline, logo, origin, originCity, destination, destinationCity, departureTime, arrivalTime, duration, price, stops, aircraft, cabinClasses)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             flightNumber = VALUES(flightNumber), airline = VALUES(airline), logo = VALUES(logo),
             origin = VALUES(origin), originCity = VALUES(originCity), destination = VALUES(destination),
             destinationCity = VALUES(destinationCity), departureTime = VALUES(departureTime),
             arrivalTime = VALUES(arrivalTime), duration = VALUES(duration), price = VALUES(price),
             stops = VALUES(stops), aircraft = VALUES(aircraft), cabinClasses = VALUES(cabinClasses)`,
          [
            flight.id,
            flight.flightNumber,
            flight.airline,
            flight.logo || '✈️',
            flight.origin,
            flight.originCity,
            flight.destination,
            flight.destinationCity,
            flight.departureTime,
            flight.arrivalTime,
            flight.duration,
            flight.price,
            flight.stops || 'Non-stop',
            flight.aircraft || 'Boeing 787',
            JSON.stringify(flight.cabinClasses || [])
          ]
        );
      }
      console.log(`[Seed] Successfully synchronized ${initialFlights.length} Scheduled Flights in MySQL.`);
    }

    // 6. Seed Community Stories if empty
    const [storyCount] = await pool.query('SELECT COUNT(*) as count FROM stories');
    if (storyCount[0].count === 0) {
      const initialStories = [
        {
          authorName: "Priya & Siddharth Sharma",
          authorLocation: "Pune, India",
          authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          tourTitle: "Kashmir Paradise: Dal Lake & Gulmarg Snow Peaks",
          rating: 5,
          date: "July 2026",
          story: "Our Dal Lake houseboat morning with steaming Kashmiri Kahwa and the shikara flower market was the most peaceful experience of our lives. The gondola ride to Phase 2 in Gulmarg was breathtaking!",
          image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=1000&q=80",
          likes: 248
        },
        {
          authorName: "Alexander Wright",
          authorLocation: "London, UK",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          tourTitle: "Rajasthan Royal Forts & Desert Safari Odyssey",
          rating: 5,
          date: "June 2026",
          story: "Watching folk dancers around a desert bonfire in Jaisalmer under a canopy of endless stars will stay with me forever. The Taj Mahal and Amber Fort were beyond magnificent.",
          image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
          likes: 194
        },
        {
          authorName: "Chihiro Tanaka",
          authorLocation: "Tokyo, Japan",
          authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          tourTitle: "Kerala Backwaters & Munnar Emerald Tea Hills",
          rating: 5,
          date: "May 2026",
          story: "Gliding through Alleppey backwaters on a private wooden kettuvallam houseboat while savoring fresh Karimeen fish curry was pure bliss. Kerala truly is God's Own Country.",
          image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
          likes: 312
        }
      ];

      for (const item of initialStories) {
        await pool.query(
          `INSERT INTO stories (author, location, image, quote, avatar, rating, likes)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [item.authorName, item.authorLocation, item.image, item.story, "🎒", item.rating, item.likes]
        );
      }
      console.log(`[Seed] Seeded ${initialStories.length} Community Stories in MySQL.`);
    }

    console.log("[Seed] Complete database inventory successfully synchronized with MySQL.");
  } catch (err) {
    console.error("[Seed Error]:", err.message);
  }
}
