CREATE DATABASE books_tracker;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username varchar(15) UNIQUE NOT NULL,
  password text NOT NULL
);

CREATE TABLE books (
  id serial PRIMARY KEY,
  title text NOT NULL,
  author text,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  description text,
  rating int DEFAULT 0
);

ALTER TABLE books
  ADD CHECK (rating >= 0 AND rating <= 5);

-- Uncomment and built the following tables when there's more time for a complex db

-- CREATE TABLE authors (
--   id serial PRIMARY KEY,
--   name text NOT NULL,
--   info TEXT
-- );

-- CREATE TABLE tags (
--   id serial PRIMARY KEY,
--   name text NOT NULL
-- );

-- CREATE TABLE books_tags (
--   books_id integer REFERENCES books(id) ON DELETE CASCADE,
--   tags_id integer REFERENCES tags(id) ON DELETE CASCADE
-- );