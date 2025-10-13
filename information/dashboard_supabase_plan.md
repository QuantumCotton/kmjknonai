# KMJK Dashboard Blueprint

This document captures the Supabase-anchored plan for the internal KMJK dashboard along with starter data built from the existing Chase McCullon estimates and a few synthetic clients. The goal is to give you something you can run as soon as you connect Supabase, so a simple GitHub push deploy will serve the new dashboard once it is implemented.

---

## 1. Feature Overview

- **Two-user login:** Josue Lopez and Chris Cotton authenticate through Supabase email/password. The React UI presents two quick-select bubbles, but the credentials live securely in Supabase (no hard-coded passwords).
- **Project hub:** Each project shows activity, milestones, and AI-digested notes. Projects belong to a client, and both Josue and Chris can collaborate.
- **Communication feed:** Threaded updates per project for quick back-and-forth, with optional @mentions to nudge the other party.
- **Multimodal note capture:** Upload typed notes, images (jobsite photos, handwritten slips), audio clips, or PDFs. Files land in a Supabase Storage bucket; a background job calls the OpenAI Agent to transcribe/interpret and attach structured summaries to the project.
- **AI organizer & notifications:** The Agent classifies notes by client/project, extracts tasks/materials, and flags whether Josue or Chris needs an email. Email sends through a worker (Resend/SendGrid) after the Agent response.

---

## 2. Supabase Setup Steps

1. Create (or recover) your Supabase project.
2. Under **Authentication → Providers**, disable public signups and invite only the two user accounts (Chris & Josue). Reset temporary passwords as needed.
3. Create a **Storage** bucket named `project-evidence` for photo/audio uploads.
4. Run the schema SQL (below) in the Supabase SQL editor. This pulls in the tables, policies, and helper functions.
5. Once the auth users exist, run the seed script to insert clients, projects, memberships, and example notes.
6. Store Supabase credentials in the Vite app `.env.local` (e.g. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

---

## 3. Database Schema (run in Supabase SQL editor)

```sql
-- Enable UUID helpers if not already enabled
create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  role text check (role in ('owner', 'project_manager')) default 'project_manager',
  phone text,
  created_at timestamptz default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_name text,
  contact_email text,
  contact_phone text,
  industry text,
  notes text,
  created_at timestamptz default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  code text unique,
  title text not null,
  status text not null check (status in ('planning','active','on_hold','completed')),
  summary text,
  location text,
  start_date date,
  target_completion date,
  budget numeric(12,2),
  last_ai_summary text,
  created_at timestamptz default now()
);

create table public.project_members (
  project_id uuid references public.projects (id) on delete cascade,
  user_id uuid references public.profiles (id) on delete cascade,
  role text default 'collaborator',
  primary key (project_id, user_id)
);

create table public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  author_id uuid references public.profiles (id) on delete set null,
  body text not null,
  created_at timestamptz default now()
);

create type note_source as enum ('text','image','audio','document');

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects (id) on delete cascade,
  author_id uuid references public.profiles (id) on delete set null,
  source note_source not null,
  raw_text text,
  ai_summary text,
  ai_structured jsonb,
  requires_attention boolean default false,
  notify_role text check (notify_role in ('josue','chris')),
  created_at timestamptz default now()
);

create table public.note_attachments (
  id uuid primary key default gen_random_uuid(),
  note_id uuid references public.notes (id) on delete cascade,
  storage_path text not null,
  mime_type text,
  uploaded_at timestamptz default now()
);

create table public.notification_log (
  id uuid primary key default gen_random_uuid(),
  note_id uuid references public.notes (id) on delete cascade,
  recipient_email text not null,
  delivered_at timestamptz default now(),
  payload jsonb
);

-- Basic Row Level Security
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.clients enable row level security;
alter table public.project_members enable row level security;
alter table public.notes enable row level security;
alter table public.note_attachments enable row level security;
alter table public.project_updates enable row level security;
alter table public.notification_log enable row level security;

create policy "Users can view their profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update their profile"
  on public.profiles for update
  using ( auth.uid() = id );

create policy "Collaborators can read clients"
  on public.clients for select
  using (
    exists (
      select 1
      from public.projects p
      join public.project_members pm on pm.project_id = p.id
      where p.client_id = clients.id
        and pm.user_id = auth.uid()
    )
  );

create policy "Collaborators can read projects"
  on public.projects for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = projects.id
        and pm.user_id = auth.uid()
    )
  );

create policy "Collaborators can read project notes"
  on public.notes for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = notes.project_id
        and pm.user_id = auth.uid()
    )
  );

create policy "Collaborators can insert notes"
  on public.notes for insert
  with check (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = notes.project_id
        and pm.user_id = auth.uid()
    )
  );

create policy "Collaborators can manage attachments"
  on public.note_attachments for all
  using (
    exists (
      select 1 from public.project_members pm
      join public.notes n on n.id = note_attachments.note_id
      where pm.project_id = n.project_id
        and pm.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.project_members pm
      join public.notes n on n.id = note_attachments.note_id
      where pm.project_id = n.project_id
        and pm.user_id = auth.uid()
    )
  );
```

---

## 4. Seed Data Script

Run this after creating the Supabase auth users for Chris (`chris@theeliteservicehub.com`) and Josue (`josue@kmjk.pro`, update with the actual email you invite). Adjust emails if you use different ones.

```sql
-- Convenience CTEs to grab user IDs from existing auth users
with chris as (
  select id from auth.users where email = 'chris@theeliteservicehub.com'
),
josue as (
  select id from auth.users where email = 'josue@kmjk.pro'
),
upsert_profiles as (
  insert into public.profiles (id, display_name, role, phone)
  select id, 'Chris Cotton', 'project_manager', '650-501-7659' from chris
  on conflict (id) do nothing
  returning id
)
insert into public.profiles (id, display_name, role, phone)
select id, 'Josue Lopez', 'owner', '650-501-7659' from josue
on conflict (id) do nothing;

-- Clients
insert into public.clients (id, name, contact_name, contact_email, contact_phone, industry, notes)
values
  ('11111111-2222-3333-4444-555555555555', 'Nordstrom Palm Beach Gardens', 'Chase McCullon', 'chase.mccullon@nordstrom.com', '+1 (786) 644-9499', 'Retail Tenant Improvement', 'Primary retail partner with rolling scopes.'),
  ('22222222-3333-4444-5555-666666666666', 'Harper Residence', 'Megan Harper', 'megan.harper@example.com', '+1 (561) 555-0142', 'Residential Remodel', 'Single family full-kitchen refresh.'),
  ('33333333-4444-5555-6666-777777777777', 'Seabreeze HOA', 'Rafael Jimenez', 'r.jimenez@seabreezehoa.com', '+1 (772) 555-0194', 'Community Facilities', 'Clubhouse maintenance and upgrades.');

-- Projects
insert into public.projects (id, client_id, code, title, status, summary, location, start_date, target_completion, budget)
values
  ('aaaa1111-bb22-cc33-dd44-eeeeeeee0001', '11111111-2222-3333-4444-555555555555', 'KMJK-NORD-REHAB', 'Mobile Home Rehab for Retail Staff Housing', 'planning',
   'Convert existing mobile home into expanded 3 bed / 2 bath staff housing including full flooring replacement and kitchen rework.',
   'Jensen Beach, FL', '2025-10-15', '2025-12-05', 19000.00),
  ('aaaa1111-bb22-cc33-dd44-eeeeeeee0002', '11111111-2222-3333-4444-555555555555', 'KMJK-NORD-WALL', 'Nordstrom Beauty Wall Demolition', 'completed',
   'Night-crew demolition of 22ft beauty wall with debris disposal and dawn turnover.',
   '3111 PGA Blvd, Palm Beach Gardens, FL', '2025-10-12', '2025-10-14', 600.00),
  ('aaaa1111-bb22-cc33-dd44-eeeeeeee0003', '11111111-2222-3333-4444-555555555555', 'KMJK-NORD-CHAIRS', 'Beauty Lounge Chair Reupholstery', 'active',
   'Reupholster 16 chairs with premium fabric, including pickup, delivery, and installation.',
   '3111 PGA Blvd, Palm Beach Gardens, FL', '2025-10-20', '2025-11-03', 2000.00),
  ('bbbb1111-bb22-cc33-dd44-eeeeeeee0004', '22222222-3333-4444-5555-666666666666', 'KMJK-HRP-KITCH', 'Harper Kitchen Glow-Up', 'planning',
   'Full kitchen refresh with new shaker cabinetry, quartz tops, and undercabinet lighting.',
   '1240 Juniper Ave, Stuart, FL', '2025-11-01', '2025-12-20', 48500.00),
  ('cccc1111-bb22-cc33-dd44-eeeeeeee0005', '33333333-4444-5555-6666-777777777777', 'KMJK-SBHOA-CLUB', 'Seabreeze Clubhouse Refresh', 'on_hold',
   'Pressure wash, repaint, and repair common-area millwork ahead of HOA holiday season.',
   '89 Ocean Breeze Way, Jensen Beach, FL', null, null, 12500.00);

-- Project memberships (assign both Josue and Chris)
insert into public.project_members (project_id, user_id, role)
select project_id, user_id, role from (
  select 'aaaa1111-bb22-cc33-dd44-eeeeeeee0001'::uuid as project_id, id as user_id, 'lead' as role from josue
  union all
  select 'aaaa1111-bb22-cc33-dd44-eeeeeeee0001', id, 'manager' from chris
  union all
  select 'aaaa1111-bb22-cc33-dd44-eeeeeeee0002', id, 'lead' from josue
  union all
  select 'aaaa1111-bb22-cc33-dd44-eeeeeeee0002', id, 'manager' from chris
  union all
  select 'aaaa1111-bb22-cc33-dd44-eeeeeeee0003', id, 'lead' from josue
  union all
  select 'aaaa1111-bb22-cc33-dd44-eeeeeeee0003', id, 'manager' from chris
  union all
  select 'bbbb1111-bb22-cc33-dd44-eeeeeeee0004', id, 'manager' from chris
  union all
  select 'cccc1111-bb22-cc33-dd44-eeeeeeee0005', id, 'lead' from josue
) as memberships;

-- Example updates and notes extracted from existing estimates
insert into public.project_updates (project_id, author_id, body)
select 'aaaa1111-bb22-cc33-dd44-eeeeeeee0003'::uuid, id,
       'Fabric swatch selection meeting penciled for Oct 18 with Chase.' from chris
union all
select 'aaaa1111-bb22-cc33-dd44-eeeeeeee0002', id,
       'Night crew scheduled; building services confirms 2 AM access.' from josue;

insert into public.notes (id, project_id, author_id, source, raw_text, ai_summary, ai_structured, requires_attention, notify_role)
select gen_random_uuid(), 'aaaa1111-bb22-cc33-dd44-eeeeeeee0001'::uuid, c.id, 'text',
       'Replace toilet with standing shower conversion; confirm AC supplied by client.',
       'Convert bath to standing shower, replace toilet, leave AC off scope.',
       jsonb_build_object('materials', jsonb_build_array('shower enclosure','PVC fittings','floor tile'), 'action_items', jsonb_build_array('Confirm AC handling with Chase')),
       false, null
from chris c
union all
select gen_random_uuid(), 'aaaa1111-bb22-cc33-dd44-eeeeeeee0002', j.id, 'image',
       'Photo: wall section behind display - mark studs before demo.',
       'Image shows 22ft wall; label studs, cover product racks before demo.',
       jsonb_build_object('materials', jsonb_build_array('plastic sheeting','stud finder','paint touchup')), true, 'chris'
from josue j;
```

---

## 5. Next Front-End Tasks

1. **Vite Route Scaffolding**
   - Add `/src/pages/dashboard/LoginGate.tsx` with two user bubbles (Chris, Josue). Clicking sets the email hint; form posts to Supabase auth using the password field.
   - Create `/src/pages/dashboard/ProjectBoard.tsx` that loads clients → projects, filtered by membership.
2. **State Management**
   - Centralize Supabase client in `/src/lib/supabaseClient.ts`.
   - Use React Query/TanStack Query for fetching projects, notes, and updates.
3. **File Upload Flow**
   - Use Supabase Storage `project-evidence` bucket with folder convention `projectId/noteId/filename`.
   - After upload, call `/api/notes` (Node/Cloudflare Worker) to enqueue the OpenAI agent job.
4. **Agent Worker**
   - Create an OpenAI Agent configured with instructions similar to:
     ```
     You are KMJK Project Clerk. For each note, identify the client, required materials, urgent blockers, and whether Chris or Josue should be notified.
     ```
   - Worker calls `openai.responses.create({...})` with attachments (image/audio) as needed. Persist AI output back into `notes.ai_summary` and `notes.ai_structured`.
5. **Email Delivery**
   - When `requires_attention` is true, call Resend/SendGrid with a templated HTML email summarizing the note and linking back to the dashboard route.

---

## 6. Credentials & Environment Variables

Add these to `.env.local` (never commit values):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...        # for server-side jobs only
OPENAI_API_KEY=...
RESEND_API_KEY=...                   # or SENDGRID_API_KEY
NOTE_AGENT_ID=...                    # OpenAI Agent ID once created
```

---

## 7. Sample Clients & Projects Summary

| Client | Projects | Notes |
|--------|----------|-------|
| Chase McCullon / Nordstrom Palm Beach Gardens | Rehab (planning), Wall Demo (completed), Chair Reupholstery (active) | Derived directly from your estimate HTML files. |
| Megan Harper | Kitchen Glow-Up | Single residential remodel example, ready for design selections. |
| Seabreeze HOA | Clubhouse Refresh | HOA maintenance scope currently on hold pending board approval. |

This gives you one complex client with multiple scopes, plus two simpler single-project clients to test navigation, filters, and note organization.

---

With the schema, seed data, and roadmap above, we can now start wiring up the actual dashboard components. Let me know when you’re ready for the React scaffolding or for automating the OpenAI Agent worker.*** End Patch
