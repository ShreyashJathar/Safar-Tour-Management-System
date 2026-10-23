-- ====================================================================
-- SAFAR TRAVEL & LUXURY STAYS — Production MySQL Database Schema
-- Database Name: safar_db
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `safar_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `safar_db`;

-- --------------------------------------------------------------------
-- 1. USERS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `fullName` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(255) NULL,
  `role` ENUM('Customer', 'Admin', 'Agent') DEFAULT 'Customer',
  `auth_provider` VARCHAR(50) DEFAULT 'local',
  `is_verified` TINYINT(1) DEFAULT 0,
  `avatar_url` VARCHAR(500) NULL,
  `phone` VARCHAR(30) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_login` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 2. TOURS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tours` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `duration` INT NOT NULL DEFAULT 3,
  `price` DECIMAL(10, 2) NOT NULL,
  `rating` DECIMAL(3, 2) DEFAULT 5.00,
  `reviewsCount` INT DEFAULT 0,
  `image` TEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Nature',
  `description` TEXT NOT NULL,
  `highlights` JSON NULL,
  `itinerary` JSON NULL,
  `reviews` JSON NULL,
  `featured` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_tours_category` (`category`),
  INDEX `idx_tours_price` (`price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 3. HOTELS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotels` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `rating` DECIMAL(3, 2) DEFAULT 4.90,
  `reviewsCount` INT DEFAULT 0,
  `image` TEXT NOT NULL,
  `category` VARCHAR(100) DEFAULT 'Luxury',
  `description` TEXT NOT NULL,
  `amenities` JSON NULL,
  `roomTypes` JSON NULL,
  `reviews` JSON NULL,
  `featured` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_hotels_location` (`location`),
  INDEX `idx_hotels_price` (`price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 4. PLACES / DESTINATIONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `places` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `category` VARCHAR(100) DEFAULT 'Landmarks',
  `rating` DECIMAL(3, 2) DEFAULT 4.90,
  `reviewsCount` INT DEFAULT 0,
  `ticketPrice` DECIMAL(10, 2) DEFAULT 0.00,
  `image` TEXT NOT NULL,
  `galleryImages` JSON NULL,
  `openingHours` VARCHAR(150) NULL,
  `address` VARCHAR(255) NULL,
  `description` TEXT NOT NULL,
  `highlights` JSON NULL,
  `ticketTypes` JSON NULL,
  `reviews` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_places_city` (`city`),
  INDEX `idx_places_country` (`country`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 5. FLIGHTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `flights` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `flightNumber` VARCHAR(50) NOT NULL,
  `airline` VARCHAR(100) NOT NULL,
  `logo` VARCHAR(50) DEFAULT '✈️',
  `origin` VARCHAR(10) NOT NULL,
  `originCity` VARCHAR(100) NOT NULL,
  `destination` VARCHAR(10) NOT NULL,
  `destinationCity` VARCHAR(100) NOT NULL,
  `departureTime` VARCHAR(50) NOT NULL,
  `arrivalTime` VARCHAR(50) NOT NULL,
  `duration` VARCHAR(50) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `stops` VARCHAR(50) DEFAULT 'Non-stop',
  `aircraft` VARCHAR(100) NULL,
  `cabinClasses` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_flights_route` (`origin`, `destination`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 6. BOOKINGS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `bookingId` VARCHAR(60) NOT NULL UNIQUE,
  `user_id` INT NULL,
  `user_email` VARCHAR(191) NOT NULL,
  `user_name` VARCHAR(150) NOT NULL,
  `user_phone` VARCHAR(50) NULL,
  `booking_type` ENUM('tour', 'hotel', 'place', 'flight') NOT NULL DEFAULT 'tour',
  `item_id` INT NOT NULL,
  `item_title` VARCHAR(255) NOT NULL,
  `item_location` VARCHAR(255) NULL,
  `item_image` TEXT NULL,
  `start_date` VARCHAR(50) NULL,
  `end_date` VARCHAR(50) NULL,
  `nights` INT DEFAULT 1,
  `adults` INT DEFAULT 1,
  `children` INT DEFAULT 0,
  `total_travelers` INT DEFAULT 1,
  `primaryContact` JSON NULL,
  `otherTravelers` JSON NULL,
  `addons` JSON NULL,
  `calculated_price` DECIMAL(10, 2) NOT NULL,
  `promo_discount` DECIMAL(10, 2) DEFAULT 0.00,
  `final_cost` DECIMAL(10, 2) NOT NULL,
  `payment_method` VARCHAR(50) DEFAULT 'Card',
  `payment_id` VARCHAR(100) NULL,
  `order_id` VARCHAR(100) NULL,
  `status` ENUM('Confirmed', 'Pending', 'Cancelled', 'Completed') DEFAULT 'Confirmed',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_bookings_user_email` (`user_email`),
  INDEX `idx_bookings_status` (`status`),
  INDEX `idx_bookings_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 7. WISHLISTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `wishlists` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_email` VARCHAR(191) NOT NULL,
  `item_id` INT NOT NULL,
  `item_type` VARCHAR(50) DEFAULT 'tour',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_user_item` (`user_email`, `item_id`, `item_type`),
  INDEX `idx_wishlist_user` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 8. COMMUNITY STORIES & REVIEWS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `stories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `author` VARCHAR(150) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `image` TEXT NOT NULL,
  `quote` TEXT NOT NULL,
  `avatar` VARCHAR(50) DEFAULT '🎒',
  `rating` INT DEFAULT 5,
  `likes` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 9. CONTACT / INQUIRY MESSAGES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(255) NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('New', 'Read', 'Replied') DEFAULT 'New',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
