CREATE TABLE IF NOT EXISTS users (
  user_id  INTEGER PRIMARY KEY,
  password TEXT DEFAULT 'toto',
  name TEXT,
  money INTEGER DEFAULT 10
)