-- Supabase SQL schema for Life + Business HQ

-- Users
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Businesses
create table businesses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  color text,
  icon text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Tasks
create table tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  business_id uuid references businesses(id) on delete set null,
  title text not null,
  priority text,
  status text,
  type text,
  due_date date,
  notes text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Content Posts
create table content_posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  business_id uuid references businesses(id) on delete set null,
  title text not null,
  platform text,
  status text,
  caption text,
  hashtags text,
  hook text,
  post_date date,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Products
create table products (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  business_id uuid references businesses(id) on delete set null,
  name text not null,
  cost numeric,
  selling_price numeric,
  profit numeric,
  platform text,
  status text,
  supplier text,
  notes text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Money Entries
create table money_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  business_id uuid references businesses(id) on delete set null,
  amount numeric not null,
  type text,
  notes text,
  entry_date date,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Learning Steps
create table learning_steps (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  business_id uuid references businesses(id) on delete set null,
  title text not null,
  description text,
  order_num int,
  is_complete boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Notes
create table notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  business_id uuid references businesses(id) on delete set null,
  content text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Goals
create table goals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  business_id uuid references businesses(id) on delete set null,
  title text not null,
  description text,
  due_date date,
  is_complete boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);
