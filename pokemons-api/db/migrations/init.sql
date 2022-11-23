CREATE TABLE IF NOT EXISTS pokemon (
  pokemon_id  INTEGER PRIMARY KEY,
  name	TEXT  NOT NULL,
  type  TEXT,
  evolution_id  INTEGER,
  xp  INTEGER  DEFAULT  0,
  xp_max  INTEGER  DEFAULT  1000,
  level  INTEGER  DEFAULT  0,
  level_max   INTEGER DEFAULT  25,
  hp_max  INTEGER  DEFAULT  100,
  capacite_id  INTEGER,
  owner_id INTEGER
)