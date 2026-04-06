-- Planora MySQL schema
-- Adapted to backend in planora_unified_clean.zip
-- MySQL 8.0+

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE DATABASE IF NOT EXISTS planora_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE planora_db;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS invitations;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS vendors;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(30) NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ORGANIZER') NOT NULL DEFAULT 'USER',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_role (role),
  KEY idx_users_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE vendors (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(120) NOT NULL,
  location VARCHAR(180) NOT NULL,
  email VARCHAR(190) NULL,
  phone VARCHAR(30) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_vendors_category (category),
  KEY idx_vendors_location (location),
  KEY idx_vendors_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  organizer_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NULL,
  location VARCHAR(180) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  is_public TINYINT(1) NOT NULL DEFAULT 0,
  invitation_media_url VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_events_organizer_id (organizer_id),
  KEY idx_events_public_date_time (is_public, event_date, event_time),
  KEY idx_events_location (location),
  CONSTRAINT fk_events_organizer
    FOREIGN KEY (organizer_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT chk_events_public CHECK (is_public IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE invitations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  event_id BIGINT UNSIGNED NOT NULL,
  guest_email VARCHAR(190) NOT NULL,
  status ENUM('pending', 'accepted', 'declined') NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_invitations_event_guest (event_id, guest_email),
  KEY idx_invitations_guest_email (guest_email),
  KEY idx_invitations_status (status),
  KEY idx_invitations_sent_at (sent_at),
  CONSTRAINT fk_invitations_event
    FOREIGN KEY (event_id) REFERENCES events(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional starter data
-- Password hashes below are placeholders and will not match a known password.
-- Prefer creating users through /api/auth/register.
INSERT INTO vendors (name, category, location, email, phone) VALUES
  ('Foto Events Studio', 'Foto-Video', 'Alba Iulia', 'contact@fotoevents.local', '0722000001'),
  ('Sweet Moments', 'Cofetarie', 'Cluj-Napoca', 'orders@sweetmoments.local', '0722000002'),
  ('DJ Pulse', 'Muzica', 'Sibiu', 'booking@djpulse.local', '0722000003');

-- Useful view for public event listings
DROP VIEW IF EXISTS view_public_events;
CREATE VIEW view_public_events AS
SELECT
  e.id,
  e.title,
  e.description,
  e.location,
  e.event_date,
  e.event_time,
  e.is_public,
  e.invitation_media_url,
  e.created_at,
  e.updated_at,
  e.organizer_id,
  u.first_name,
  u.last_name,
  u.email AS organizer_email
FROM events e
JOIN users u ON u.id = e.organizer_id
WHERE e.is_public = 1;
