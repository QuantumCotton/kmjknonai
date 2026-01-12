-- Sample Jobs to Populate Your Database
-- Run this in Supabase SQL Editor after creating tables

INSERT INTO jobs (
  id,
  company,
  client_name,
  client_email,
  client_phone,
  job_type,
  description,
  status,
  location,
  budget,
  estimated_completion,
  notes,
  files,
  photos,
  tags,
  ai_summary
) VALUES
(
  gen_random_uuid(),
  'Nordstrom',
  'Sally Haddad',
  'sally@nordstrom.com',
  '772-555-0101',
  'Handyman Services',
  'Staircase painting & revival work',
  'in-progress',
  'Nordstrom - Treasure Coast Mall',
  3500.00,
  '2025-01-20',
  '[
    {
      "id": "n1",
      "text": "Client approved estimate on Dec 10",
      "timestamp": "2025-01-10T10:30:00",
      "type": "update",
      "author": "contractor"
    },
    {
      "id": "n2",
      "text": "Started preliminary work on staircase",
      "timestamp": "2025-01-12T14:20:00",
      "type": "update",
      "author": "contractor"
    }
  ]'::jsonb,
  ARRAY['nordstrom-painting-sally-staircase.html'],
  ARRAY[]::text[],
  ARRAY['Nordstrom', 'Palm City', 'staircase', 'painting'],
  NULL
),
(
  gen_random_uuid(),
  'Nordstrom',
  'Chase McCullon',
  'chase@nordstrom.com',
  '772-555-0102',
  'Handyman Services',
  'Tile work, metal doors, painting, stair rails',
  'estimating',
  'Nordstrom - Treasure Coast Mall',
  8500.00,
  '2025-02-15',
  '[
    {
      "id": "n3",
      "text": "Received initial request for multiple work items",
      "timestamp": "2025-01-05T11:00:00",
      "type": "update",
      "author": "contractor"
    },
    {
      "id": "n4",
      "text": "Sent quote v3 - awaiting approval",
      "timestamp": "2025-01-08T16:45:00",
      "type": "update",
      "author": "contractor"
    }
  ]'::jsonb,
  ARRAY['kmjk_estimate_chase_mccullon_v3.html'],
  ARRAY[]::text[],
  ARRAY['Nordstrom', 'Palm City', 'tile', 'metal doors', 'stair rails'],
  NULL
),
(
  gen_random_uuid(),
  'Frank Alsayed',
  'Frank Alsayed',
  'frank@gmail.com',
  '772-555-0201',
  'Handyman Services',
  'Paint work estimate',
  'lead',
  'Stuart, FL',
  2000.00,
  NULL,
  '[
    {
      "id": "n5",
      "text": "Initial contact via website form",
      "timestamp": "2025-01-12T09:15:00",
      "type": "update",
      "author": "contractor"
    }
  ]'::jsonb,
  ARRAY['KMJK ESTIMATE FRANK ALSAYED PAINT.html'],
  ARRAY[]::text[],
  ARRAY['Stuart', 'lead', 'painting'],
  NULL
);

-- Create sample tags
INSERT INTO tags (label, count, color) VALUES
('nordstrom', 2, 'bg-blue-100 text-blue-800'),
('palm city', 2, 'bg-green-100 text-green-800'),
('stuart', 1, 'bg-purple-100 text-purple-800'),
('painting', 2, 'bg-orange-100 text-orange-800'),
('tile', 1, 'bg-pink-100 text-pink-800'),
('staircase', 1, 'bg-cyan-100 text-cyan-800'),
('stair rails', 1, 'bg-indigo-100 text-indigo-800'),
('metal doors', 1, 'bg-red-100 text-red-800'),
('lead', 1, 'bg-yellow-100 text-yellow-800');
