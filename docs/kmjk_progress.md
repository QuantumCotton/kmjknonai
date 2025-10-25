# KMJK Landing Page Optimization Roadmap

## Phase Overview
| Phase | Focus | Key Outcomes | Status |
| --- | --- | --- | --- |
| Phase 1 | Foundation & global contact alignment | Central constants, core templates, initial CTA refresh | ✅ Complete |
| Phase 2 | Page-by-page contact/CTA rollout | SMS-first CTAs, visible buttons, consistent contact info | ⏳ In progress (12 / 18) |
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

**Progress bar**: `██████████████░` (12 / 18 pages)

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
- **[ ]** `src/pages/TreasureCoast/KitchenRenovationPages.jsx`
- **[ ]** `src/pages/TreasureCoast/BathroomRenovationPages.jsx`
- **[ ]** `src/pages/TreasureCoast/HandymanPages.jsx`
- **[ ]** `src/pages/TreasureCoast/EpoxyFlooringPages.jsx`
- **[ ]** `src/pages/TreasureCoast/TVMountingPages.jsx`
- **[ ]** `src/pages/BathroomRemodelPalmCity.jsx`
- **[ ]** `src/pages/BathroomRemodelSailfishPoint.jsx`
- **[ ]** `src/pages/BathroomRemodelSewallsPoint.jsx`
- **[ ]** `src/pages/BathroomRemodelHutchinsonIsland.jsx`
- **[ ]** `src/pages/BathroomRemodelStuart.jsx`
- **[ ]** `src/pages/GalleryPage.jsx`
- **[ ]** `src/pages/InternalDashboard.jsx`

_Note: As each page is updated, mark the checkbox and add any follow-up notes in the log below._

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
