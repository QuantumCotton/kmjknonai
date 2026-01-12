# KMJK Landing Page Optimization Roadmap

## Daily Snapshot – 2025-10-24 @ 10:56 PM ET
- **Completed Today**
  - Kitchen Remodel (Improved)
  - Bathroom Remodel (Improved)
  - Bathroom Repairs Landing
  - Handyman Services (Improved)
  - TV Mounting Landing
  - Palm City Bathroom Remodel
  - Sailfish Point Bathroom Remodel
  - Hutchinson Island Bathroom Remodel
  - Internal Dashboard updates (structure + logging)
  - Treasure Coast Handyman / TV Mounting / Epoxy pages → CTA alignment, pricing, hero notes
  - Palm City / Sailfish Point / Hutchinson Island bathroom landing pages → Upload prompts added, 3D mention removed
  - Bathroom Remodel Sewall’s Point → Upload CTA, pricing tiers, localized testimonial
  - Global contact/address sweep → Standardized to 1301 SE Francis Street, Jensen Beach, FL 34957
  - Palm City / Sailfish Point / Sewall’s Point / Hutchinson Island kitchen pages → Removed 3D promises, added upload prompts & pricing cues
  - Atlas chat concierge → Service catalog prompts, scope capture, richer lead notifications
  - Netlify Atlas backend → Added `netlify/functions/kmjk-openai.js` + `kmjk-send-lead.js` and aligned GPT-5 relay defaults
  - Atlas chat photo intake → S3 uploads via `kmjk-upload-image.js`, inline preview UI, lead emails include photo links
- **In Progress / Next Up**
  - Bathroom Remodel Elite → Remove financing language, add monthly context ✅
  - Bathroom Repairs Landing → Note $375 minimum, bundling, emergency surcharge ✅
  - Handyman Services (Improved) → Swap gallery/hero image to bathroom shot ✅
  - Handyman Services With Pricing → Add hero image, update pricing, drop daily jobs counter ✅
  - Treasure Coast Handyman / TV Mounting / Epoxy pages → Apply CTA + pricing alignment and refreshed imagery ✅
  - Palm City / Sailfish Point / Hutchinson Island bathroom landing pages → Remove 3D mention, add upload prompt under consultation CTA ✅
  - Palm City / Sailfish Point / Sewall’s Point / Hutchinson Island kitchen landing pages → Remove 3D mention, add upload prompt under consultation CTA ✅
  - Global contact/address → Update to 1301 SE Francis Street, Jensen Beach, FL 34957 ✅
  - Bathroom Remodel Sewall’s Point → Add pricing tiers + local testimonial ✅
  - Form modernization plan → Budget presets, upload component, SMS prompts ⏳
  - Atlas chat → Verify Netlify function email payload includes service + scope details ✅

## Phase Overview
| Phase | Focus | Key Outcomes | Status |
| --- | --- | --- | --- |
| Phase 1 | Foundation & global contact alignment | Central constants, core templates, initial CTA refresh | ✅ Complete |
| Phase 2 | Page-by-page contact/CTA rollout | SMS-first CTAs, visible buttons, consistent contact info | ✅ Complete (24 / 24) |
| Phase 3 | Intake form modernization | Budget ranges, Web3Forms upgrades, image upload, text cues | ⏳ Not started |
| Phase 4 | Hyper-local testimonials & containment | Location-accurate social proof, interim fixes, gap log | ⏳ Not started |
| Phase 5 | KMJK collateral & Atlas chatbot | Social Proof Request Kit, partner outreach, chatbot polish | ⏳ Not started |

---

## Phase 1 – Foundation & Global Contact Alignment ✅
- **[x]** `src/constants/contact.js` created with KMJK defaults.
- **[x]** `src/pages/TreasureCoast/TreasureCoastLandingTemplate.jsx` switched to SMS-first CTAs and new number.
- **[x]** `src/components/LocalPresenceSection.jsx` default contact updated.
- **[x]** `src/App.jsx` navigation, footer, and hero buttons aligned to SMS + `info@kmjk.pro`.

Deliverables complete. Moving to per-page execution.

---

## Phase 2 – Page-Level Contact & CTA Rollout ⏳
Goal: Every landing page uses the constants, exposes a visible SMS CTA, and removes legacy phone/email values.

**Progress bar**: `████████████████████` (24 / 24 pages)

- **[x]** `src/pages/BathroomLanding.jsx`
- **[x]** `src/pages/BathroomLandingElite.jsx`
- **[x]** `src/pages/BathroomLandingImproved.jsx`
- **[x]** `src/pages/BathroomRepairsLanding.jsx`
- **[x]** `src/pages/KitchenLanding.jsx`
- **[x]** `src/pages/KitchenLandingImproved.jsx`
- **[x]** `src/pages/KitchenRenovationElite.jsx`
- **[x]** `src/pages/HandymanLanding.jsx`
- **[x]** `src/pages/HandymanLandingImproved.jsx`
- **[x]** `src/pages/HandymanLandingWithPricing.jsx`
- **[x]** `src/pages/TVMountingLanding.jsx`
- **[x]** `src/pages/TreasureCoast/KitchenRenovationPages.jsx`
- **[x]** `src/pages/TreasureCoast/BathroomRenovationPages.jsx`
- **[x]** `src/pages/TreasureCoast/HandymanPages.jsx`
- **[x]** `src/pages/TreasureCoast/EpoxyFlooringPages.jsx`
- **[x]** `src/pages/TreasureCoast/TVMountingPages.jsx`
- **[x]** `src/pages/BathroomRemodelPalmCity.jsx`
- **[x]** `src/pages/BathroomRemodelSailfishPoint.jsx`
- **[x]** `src/pages/BathroomRemodelSewallsPoint.jsx`
- **[x]** `src/pages/BathroomRemodelHutchinsonIsland.jsx`
- **[x]** `src/pages/BathroomRemodelStuart.jsx`
- **[x]** `src/pages/GalleryPage.jsx`
- **[x]** `src/pages/InternalDashboard.jsx`

_Note: As each page is updated, mark the checkbox and add any follow-up notes in the log below._

### 2025-10-24 Local Bathroom Remodel Polish
- **[x]** `src/pages/BathroomRemodelPalmCity.jsx` – upload CTA + Palm City pricing story
- **[x]** `src/pages/BathroomRemodelHutchinsonIsland.jsx` – upload CTA + coastal pricing story
- **[x]** `src/pages/BathroomRemodelSailfishPoint.jsx` – upload CTA + premium pricing
- **[x]** `src/pages/BathroomRemodelSewallsPoint.jsx` – upload CTA, pricing tiers, Sewall’s Point testimonial

### Pending Local Service Page Enhancements
- **[x]** Treasure Coast Handyman pages – hero notes + $375 minimum messaging, pricing realigned
- **[x]** Treasure Coast TV mounting pages – align CTA layout + premium prompts
- **[x]** Treasure Coast Epoxy pages – hero notes + photo/text prompts, CTA refresh

### 2025-10-24 Feedback Backlog (Dashboard Priority Order)
- **[x]** `Bathroom Remodel Elite` – financing language removed; monthly guidance references outside lenders.
- **[x]** `Bathroom Repairs Landing` – $375 minimum noted, bundling prompt + emergency surcharge reminder.
- **[x]** `Handyman Services (Improved)` – hero imagery swapped to bathroom photo, $375 minimum highlighted.
- **[x]** `Handyman Services With Pricing` – hero imagery added, daily jobs counter removed, pricing aligned (fans $375, disposals $200, $375 minimum visit).
- **[x]** `TV Mounting Landing` + Treasure Coast TV pages – pricing synced ($399/$699/$1,299 tiers) with $375 minimum callouts.
- **[ ]** `Treasure Coast Handyman` cards – apply updated pricing copy (fan/disposal starts, $375 minimum) and revised imagery where available.
- **[x]** `Treasure Coast Epoxy Flooring` pages – hero note photo prompts + CTA refresh.
- **[x]** `BathroomRemodelPalmCity` / `SailfishPoint` / `HutchinsonIsland` – remove 3D rendering promises, add upload-photo prompt beneath “Schedule Consultation.”
- **[x]** Global contact blocks (`LocalPresenceSection.jsx`, `index.html`, dashboards) – updated to `1301 SE Francis Street, Jensen Beach, FL 34957`.
- **[ ]** `docs/kmjk_progress.md` follow-up – create template guidance so galleries and testimonials mirror dashboard naming conventions.

---

## Phase 3 – Intake Form Modernization ⏳
Tasks apply wherever the Treasure Coast modal form or standalone forms exist.

- **[ ]** Adjust budget placeholders per service (kitchen, bathroom, handyman, epoxy, TV).
- **[ ]** Introduce Web3Forms image upload field (file input + payload submission).
- **[ ]** Confirm Web3Forms submission includes new fields (budget ranges, service type, source page).
- **[ ]** Update copy to encourage SMS + photo submission in confirmation state.

Deliverables will be tracked page-by-page once Phase 2 contact work finishes.

---

## Phase 4 – Hyper-Local Testimonial Alignment ⏳
Targets all hyper-local Treasure Coast builders and standalone enclave pages.

- **[ ]** Audit testimonials in `TreasureCoast/*Pages.jsx` (Kitchen, Bathroom, Handyman, Epoxy, TV) – verify author location matches page.
- **[ ]** Audit standalone bathroom remodel pages – ensure localized quotes.
- **[ ]** Apply containment rule where mismatched (generic “Treasure Coast” or remove location string).
- **[ ]** Maintain **Testimonial Gap Log** (see below).

### Testimonial Gap Log
- _Pending entries – populate as audits surface issues._

---

## Phase 5 – KMJK Collateral & Atlas Chatbot ⏳
- **[ ]** Draft Social Proof Request Kit (ask for portfolio photo + 2-sentence testimonial per enclave).
- **[ ]** Draft outreach email/script for KMJK (include deadline and incentives).
- **[ ]** Review chatbot Atlas flow (copy provided) and align intro/questions with new contact strategy.
- **[ ]** Log chatbot issues + fixes in `docs/kmjk_progress.md` updates.

---

## Rapid Reference Links
- Contact constants: `src/constants/contact.js`
- Treasure Coast template: `src/pages/TreasureCoast/TreasureCoastLandingTemplate.jsx`
- Web3Forms submission: `src/pages/TreasureCoast/TreasureCoastLandingTemplate.jsx` `handleSubmit`

---

## Update Protocol
1. After editing a file, update this checklist (mark checkbox, adjust progress bar or add log entry).
2. Note any blockers or collateral requests in the relevant phase section.
3. Ping when a phase is ready for review; we’ll summarize here and in chat.
