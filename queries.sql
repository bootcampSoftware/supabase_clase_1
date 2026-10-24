-- ---------- Esquema ----------
 
create table players (
  id         bigint generated always as identity primary key,
  username   text not null unique,
  country    text,
  created_at timestamptz not null default now()
);
 
create table games (
  id          bigint generated always as identity primary key,
  player_x    bigint not null references players(id),
  player_o    bigint not null references players(id),
  winner      bigint references players(id),
  status      text not null default 'waiting'
              check (status in ('waiting', 'playing', 'finished', 'draw')),
  created_at  timestamptz not null default now(),
  finished_at timestamptz,
  check (player_x <> player_o)
);
 
create table moves (
  id          bigint generated always as identity primary key,
  game_id     bigint not null references games(id) on delete cascade,
  player_id   bigint not null references players(id),
  position    smallint not null check (position between 0 and 8),
  move_number smallint not null check (move_number between 1 and 9),
  created_at  timestamptz not null default now(),
  unique (game_id, position),
  unique (game_id, move_number)
);



insert into players (username, country, created_at) values
  ('ana',    'MX', now() - interval '60 days'),
  ('bruno',  'MX', now() - interval '55 days'),
  ('carla',  'CO', now() - interval '40 days'),
  ('diego',  'AR', now() - interval '30 days'),
  ('elena',  'ES', now() - interval '20 days'),
  ('fabian', 'MX', now() - interval '12 days'),
  ('gina',   'CL', now() - interval '5 days'),
  ('hugo',   'MX', now() - interval '1 day'),
  ('iris',   null, now());



insert into games (player_x, player_o, winner, status, created_at, finished_at) values
  (1, 2, 1,    'finished', now() - interval '30 days', now() - interval '30 days' + interval '4 minutes'),
  (1, 3, 3,    'finished', now() - interval '28 days', now() - interval '28 days' + interval '6 minutes'),
  (2, 4, null, 'draw',     now() - interval '25 days', now() - interval '25 days' + interval '9 minutes'),
  (3, 5, 3,    'finished', now() - interval '20 days', now() - interval '20 days' + interval '5 minutes'),
  (4, 1, 1,    'finished', now() - interval '18 days', now() - interval '18 days' + interval '7 minutes'),
  (5, 6, 6,    'finished', now() - interval '12 days', now() - interval '12 days' + interval '3 minutes'),
  (2, 7, 2,    'finished', now() - interval '8 days',  now() - interval '8 days'  + interval '4 minutes'),
  (6, 8, 8,    'finished', now() - interval '6 days',  now() - interval '6 days'  + interval '8 minutes'),
  (7, 1, 1,    'finished', now() - interval '3 days',  now() - interval '3 days'  + interval '5 minutes'),
  (3, 2, null, 'draw',     now() - interval '2 days',  now() - interval '2 days'  + interval '10 minutes'),
  (5, 1, null, 'playing',  now() - interval '1 hour',  null),
  (8, 4, null, 'playing',  now() - interval '5 minutes', null);

insert into moves (game_id, player_id, position, move_number) values
  (1, 1, 0, 1), (1, 2, 4, 2), (1, 1, 1, 3), (1, 2, 3, 4), (1, 1, 2, 5),
  (2, 1, 4, 1), (2, 3, 0, 2), (2, 1, 1, 3), (2, 3, 3, 4), (2, 1, 8, 5), (2, 3, 6, 6),
  (3, 2, 4, 1), (3, 4, 0, 2), (3, 2, 2, 3), (3, 4, 6, 4), (3, 2, 3, 5),
  (3, 4, 5, 6), (3, 2, 7, 7), (3, 4, 1, 8), (3, 2, 8, 9),
  (4, 3, 0, 1), (4, 5, 4, 2), (4, 3, 3, 3), (4, 5, 1, 4), (4, 3, 6, 5),
  (11, 5, 4, 1), (11, 1, 0, 2);



-- RETOS 1
-- a) Jugadores mexicanos registrados en los últimos 30 días (fabian, hugo)
-- b) Partidas que siguen en juego
-- c) Las 3 partidas terminadas más recientes



-- RETOS 2
-- a) Casilla más usada en toda la historia
-- b) Empates con el nombre de ambos jugadores
-- c) Duración promedio de las partidas terminadas (finished_at - created_at)
