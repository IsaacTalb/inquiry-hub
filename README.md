# Inquiry Hub

Production-ready SaaS starter for multi-tenant inquiry operations.

## Stack
- Next.js 15 App Router + TypeScript
- Tailwind CSS + Shadcn-style UI primitives
- Supabase Auth + PostgreSQL

## Features
- User registration/login
- Tenant-aware dashboard
- Facebook page integration API
- Telegram bot integration API
- Webhook ingestion API
- Message persistence
- Daily report API
- Day/night shift report API
- Responsive layout

## Project Structure
- `app/` pages and route handlers
- `components/` UI + feature components
- `lib/` utilities, supabase clients, repositories
- `types/` shared type declarations
- `db/migrations/` database DDL

## Setup
1. Install deps: `npm install`
2. Copy env: `cp .env.example .env.local`
3. Run DB migration in Supabase SQL editor: `db/migrations/001_init.sql`
4. Start app: `npm run dev`

## Core API Endpoints
- `POST /api/tenants`
- `POST /api/integrations/facebook`
- `POST /api/integrations/telegram`
- `POST /api/webhooks`
- `GET /api/reports/daily?tenantId=<id>&date=YYYY-MM-DD`
- `GET /api/reports/shift?tenantId=<id>&shift=day|night`
