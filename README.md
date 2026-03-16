# Cafe Noir - Online Booking & Menu Platform

A premium cafe booking and menu platform built with Next.js 14, Tailwind CSS, and Framer Motion, with Supabase integration for persistence.

## Features

- **Home Page**: Hero section with premium animations, featured "Chef's Picks", and quick info.
- **Menu Page**: Segmented menu by categories (Hot Drinks, Cold Drinks, Breakfast, Mains, Desserts, Specials) with dietary tags.
- **Booking Flow**: A 4-step interactive booking form with date, time, guests, and seating selection.
- **Authentication**: Sign-in and sign-up with Supabase Auth.
- **Dynamic Content**: Menu items and bookings are integrated with Supabase.
- **Design**: Premium amber and dark brown palette with a mix of serif and sans fonts.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Supabase (Auth & Database).
- **Form Handling**: React Hook Form, Zod.
- **Date Handling**: date-fns, react-day-picker.

## Setup Instructions

1. **Clone the repository.**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env.local` file and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

## Database Schema (SQL)

Run the following SQL in your Supabase SQL Editor to set up the required tables:

```sql
-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  role text default 'guest',
  created_at timestamptz default now()
);

-- Menu items table
create table menu_items (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price integer not null, -- Price in paise/cents
  category text not null,
  tags text[] default '{}',
  is_featured boolean default false,
  is_available boolean default true,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Bookings table
create table bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  booking_ref text unique not null,
  date date not null,
  time_slot text not null,
  guests integer not null,
  seating text not null,
  name text not null,
  email text not null,
  phone text,
  special_requests text,
  status text default 'confirmed',
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table menu_items enable row level security;
alter table bookings enable row level security;

-- Policies
create policy "Public can read menu" on menu_items for select using (true);
create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can read own bookings" on bookings for select using (auth.uid() = user_id);
create policy "Users can insert bookings" on bookings for insert with check (true);
```
