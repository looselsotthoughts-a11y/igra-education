-- IGRA Education Portal — Supabase Schema
-- Run this in your Supabase SQL editor

create table if not exists content (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  source      text not null,
  source_icon text,
  type        text not null check (type in ('video','course','article','textbook','exam')),
  subject     text not null check (subject in ('science','math','history','coding','language','geography','civics','exam')),
  url         text not null,
  duration    text,
  level       text check (level in ('Beginner','Intermediate','Advanced')),
  featured    boolean default false,
  created_at  timestamptz default now()
);

-- Enable Row Level Security (read-only for public)
alter table content enable row level security;

create policy "Public read access"
  on content for select
  using (true);

-- Sample data
insert into content (title, description, source, source_icon, type, subject, url, duration, level, featured)
values
  ('Human Body Systems', 'Digestive, nervous, and circulatory systems with animations.', 'YouTube EDU', '▶', 'video', 'science', 'https://youtube.com/education', '22 min', 'Beginner', true),
  ('Algebra Fundamentals', 'Variables, equations, and functions from the ground up.', 'Khan Academy', '🎓', 'course', 'math', 'https://khanacademy.org', '3 hrs', 'Beginner', true),
  ('Python for Beginners', 'Write your first program and learn data structures in 4 weeks.', 'Coursera', '🏅', 'course', 'coding', 'https://coursera.org', '4 weeks', 'Beginner', true),
  ('JEE Mains — Physics Prep', 'Chapter-wise notes and 200+ practice questions.', 'NCERT', '📗', 'exam', 'exam', 'https://ncert.nic.in', null, 'Advanced', false);
