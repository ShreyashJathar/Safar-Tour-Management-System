/**
 * SAFAR API CLIENT & DATABASE SERVICE LAYER
 * Provides seamless communication with the Express backend & MySQL database (safar_db).
 * Includes automatic retry, network fault tolerance, and graceful offline fallback.
 */

export const getBackendBaseUrl = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
  }
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");
  }
  if (typeof window !== "undefined" && window.location.hostname && window.location.hostname !== "localhost" && !window.location.hostname.includes("127.0.0.1")) {
    return "https://safar-backend.onrender.com";
  }
  return "http://localhost:5000";
};

export const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }
  return `${getBackendBaseUrl()}/api`;
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Helper to handle fetch requests with timeout and error handling
 */
async function request(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 8000);

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please check if backend server is running.");
    }
    throw error;
  }
}

// ----------------------------------------------------------------------
// 1. DATABASE & SYSTEM HEALTH
// ----------------------------------------------------------------------

export async function checkDatabaseHealth() {
  try {
    const res = await request("/system/health", { timeout: 3000 });
    return res;
  } catch (err) {
    return {
      success: false,
      server: "Offline / Unreachable",
      database: { connected: false, error: err.message }
    };
  }
}

export async function triggerDbReseed() {
  return await request("/system/reseed", { method: "POST" });
}

export async function submitContactInquiry(inquiryData) {
  return await request("/system/contact", {
    method: "POST",
    body: JSON.stringify(inquiryData)
  });
}

// ----------------------------------------------------------------------
// 2. TOURS API (MySQL)
// ----------------------------------------------------------------------

export async function fetchToursFromDb(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "All") query.append("category", params.category);
  if (params.search) query.append("search", params.search);
  if (params.maxPrice) query.append("maxPrice", params.maxPrice);

  const queryString = query.toString() ? `?${query.toString()}` : "";
  const res = await request(`/tours${queryString}`);
  return res.data;
}

export async function createTourInDb(tourData) {
  const res = await request("/tours", {
    method: "POST",
    body: JSON.stringify(tourData)
  });
  return res.data;
}

export async function updateTourInDb(id, tourData) {
  const res = await request(`/tours/${id}`, {
    method: "PUT",
    body: JSON.stringify(tourData)
  });
  return res.data;
}

export async function deleteTourFromDb(id) {
  return await request(`/tours/${id}`, { method: "DELETE" });
}

export async function addTourReviewInDb(tourId, reviewData) {
  return await request(`/tours/${tourId}/reviews`, {
    method: "POST",
    body: JSON.stringify(reviewData)
  });
}

// ----------------------------------------------------------------------
// 3. HOTELS API (MySQL)
// ----------------------------------------------------------------------

export async function fetchHotelsFromDb(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "All") query.append("category", params.category);
  if (params.search) query.append("search", params.search);
  if (params.maxPrice) query.append("maxPrice", params.maxPrice);

  const queryString = query.toString() ? `?${query.toString()}` : "";
  const res = await request(`/hotels${queryString}`);
  return res.data;
}

export async function createHotelInDb(hotelData) {
  const res = await request("/hotels", {
    method: "POST",
    body: JSON.stringify(hotelData)
  });
  return res.data;
}

export async function updateHotelInDb(id, hotelData) {
  const res = await request(`/hotels/${id}`, {
    method: "PUT",
    body: JSON.stringify(hotelData)
  });
  return res.data;
}

export async function deleteHotelFromDb(id) {
  return await request(`/hotels/${id}`, { method: "DELETE" });
}

export async function addHotelReviewInDb(hotelId, reviewData) {
  return await request(`/hotels/${hotelId}/reviews`, {
    method: "POST",
    body: JSON.stringify(reviewData)
  });
}

// ----------------------------------------------------------------------
// 4. PLACES & DESTINATIONS API (MySQL)
// ----------------------------------------------------------------------

export async function fetchPlacesFromDb(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "All") query.append("category", params.category);
  if (params.search) query.append("search", params.search);

  const queryString = query.toString() ? `?${query.toString()}` : "";
  const res = await request(`/places${queryString}`);
  return res.data;
}

export async function addPlaceReviewInDb(placeId, reviewData) {
  return await request(`/places/${placeId}/reviews`, {
    method: "POST",
    body: JSON.stringify(reviewData)
  });
}

// ----------------------------------------------------------------------
// 5. FLIGHTS API (MySQL)
// ----------------------------------------------------------------------

export async function fetchFlightsFromDb() {
  const res = await request("/flights");
  return res.data;
}

// ----------------------------------------------------------------------
// 6. BOOKINGS API (MySQL)
// ----------------------------------------------------------------------

export async function fetchAllBookingsFromDb() {
  const res = await request("/bookings");
  return res.data;
}

export async function fetchUserBookingsFromDb(email) {
  if (!email) return [];
  const res = await request(`/bookings/user/${encodeURIComponent(email)}`);
  return res.data;
}

export async function createBookingInDb(bookingData) {
  const res = await request("/bookings", {
    method: "POST",
    body: JSON.stringify(bookingData)
  });
  return res.data;
}

export async function updateBookingStatusInDb(bookingId, status) {
  const res = await request(`/bookings/${bookingId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
  return res.data;
}

export async function cancelBookingInDb(bookingId) {
  return await request(`/bookings/${bookingId}`, { method: "DELETE" });
}

// ----------------------------------------------------------------------
// 7. WISHLIST API (MySQL)
// ----------------------------------------------------------------------

export async function fetchUserWishlistFromDb(email) {
  if (!email) return [];
  const res = await request(`/wishlist/${encodeURIComponent(email)}`);
  return res.wishlist || [];
}

export async function toggleWishlistInDb(email, itemId, itemType = "tour") {
  const res = await request("/wishlist/toggle", {
    method: "POST",
    body: JSON.stringify({ email, itemId, itemType })
  });
  return res;
}

// ----------------------------------------------------------------------
// 8. STORIES API (MySQL)
// ----------------------------------------------------------------------

export async function fetchStoriesFromDb() {
  const res = await request("/stories");
  return res.data;
}

export async function createStoryInDb(storyData) {
  const res = await request("/stories", {
    method: "POST",
    body: JSON.stringify(storyData)
  });
  return res.data;
}

export async function likeStoryInDb(id) {
  const res = await request(`/stories/${id}/like`, { method: "POST" });
  return res.likes;
}
