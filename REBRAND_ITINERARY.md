# KMJK → KMJK Group Rebrand Itinerary
## Hotel & Property Management Focus

**Started:** January 14, 2026  
**Status:** In Progress

---

## Overview
Rebranding from **KMJK Home Improvement** to **KMJK Group** with a focus on **Hotel and Property Management** services. This involves updating all branding, messaging, styling, and functionality across the entire application.

---

## Phase 1: Core Branding & Identity
- [x] **1.1** Update `src/constants/contact.js` - Company name, taglines, contact info
- [x] **1.2** Update `index.html` - Title, meta descriptions, Open Graph tags, LocalBusiness schema
- [x] **1.3** Update `public/manifest.json` - App name and descriptions
- [ ] **1.4** Create new logo assets (or update `kmjk-logo.png`, `favicon.ico`)
- [ ] **1.5** Update `public/robots.txt` and `public/sitemap.xml` if domain changes

---

## Phase 2: CSS & Visual Styling
- [x] **2.1** Update `src/App.css` - Brand colors (Coastal Professional palette)
  - NEW: Ocean Slate (#1E3A5F), Sunset Gold (#D4A853), Palm Silver (#64748B)
  - Deep Teal (#0D9488), Coastal White (#F8FAFC)
- [x] **2.2** Update CSS variables comments to "KMJK Group Brand Colors - Coastal Professional"
- [ ] **2.3** Update typography/fonts for more professional hotel aesthetic
- [ ] **2.4** Review hero section styling for property management focus

---

## Phase 3: Main Application (`App.jsx`)
- [x] **3.1** Navigation logo text: "KMJK" → "KMJK Group"
- [x] **3.2** Footer company info and tagline updates
- [x] **3.3** HomePage hero section - logo text and tagline
- [x] **3.4** Mission statement rewrite for Hotel/Property Management
- [x] **3.5** Core services section - update from Kitchen/Bathroom/Custom to Property Management services
- [x] **3.6** Copyright footer text update

---

## Phase 4: Chatbot Service (`kmjkChatService.js`)
- [x] **4.1** Update Atlas greeting message (line ~141)
- [x] **4.2** Update `<company_info>` section (line ~564)
- [x] **4.3** Update `serviceCatalog` array for property management services
- [ ] **4.4** Update local touches and regional references
- [ ] **4.5** Update system prompt for hotel/property context

---

## Phase 5: Landing Pages (34+ pages)
### Main Landing Pages
- [ ] **5.1** `BathroomLanding.jsx` - Repurpose or archive
- [ ] **5.2** `BathroomLandingElite.jsx` - Repurpose or archive
- [ ] **5.3** `BathroomLandingImproved.jsx` - Repurpose or archive
- [ ] **5.4** `BathroomRepairsLanding.jsx` - Repurpose or archive
- [ ] **5.5** `KitchenLanding.jsx` - Repurpose or archive
- [ ] **5.6** `KitchenLandingImproved.jsx` - Repurpose or archive
- [ ] **5.7** `KitchenRenovationElite.jsx` - Repurpose or archive
- [ ] **5.8** `HandymanLanding.jsx` - Repurpose for maintenance services
- [ ] **5.9** `HandymanLandingImproved.jsx` - Repurpose for maintenance services
- [ ] **5.10** `HandymanLandingWithPricing.jsx` - Repurpose or archive
- [ ] **5.11** `TVMountingLanding.jsx` - Keep/update for hotel AV services
- [ ] **5.12** `CoatingsLanding.jsx` - Repurpose for commercial flooring
- [ ] **5.13** `ChristmasLightsLanding.jsx` - Archive or seasonal
- [ ] **5.14** `GutterGuardLanding.jsx` - Archive or property maintenance
- [ ] **5.15** `RoofingLanding.jsx` - Property maintenance focus
- [ ] **5.16** `EnergyRebatesLanding.jsx` - Commercial energy efficiency

### City-Specific Pages
- [ ] **5.17** `BathroomRemodelHutchinsonIsland.jsx` - Archive/redirect
- [ ] **5.18** `BathroomRemodelPalmCity.jsx` - Archive/redirect
- [ ] **5.19** `BathroomRemodelSailfishPoint.jsx` - Archive/redirect
- [ ] **5.20** `BathroomRemodelSewallsPoint.jsx` - Archive/redirect
- [ ] **5.21** `BathroomRemodelStuart.jsx` - Archive/redirect

### Treasure Coast Template Pages
- [ ] **5.22** `TreasureCoast/TreasureCoastLandingTemplate.jsx` - Master template update
- [ ] **5.23** `TreasureCoast/BathroomRenovationPages.jsx` - Archive/redirect
- [ ] **5.24** `TreasureCoast/KitchenRenovationPages.jsx` - Archive/redirect
- [ ] **5.25** `TreasureCoast/HomeRenovationPages.jsx` - Repurpose for property services
- [ ] **5.26** `TreasureCoast/HandymanPages.jsx` - Property maintenance
- [ ] **5.27** `TreasureCoast/EpoxyFlooringPages.jsx` - Commercial flooring
- [ ] **5.28** `TreasureCoast/TVMountingPages.jsx` - Hotel AV services

---

## Phase 6: Components
- [x] **6.1** `LocalPresenceSection.jsx` - Update business name default
- [x] **6.2** `ContactForm.jsx` - Update form subjects and messaging
- [ ] **6.3** `CallTeamButtons.jsx` - Review contact team info
- [ ] **6.4** `ChatWidget.jsx` - Ensure branding consistency
- [ ] **6.5** `MetaPixelTracker.jsx` - Review if tracking IDs change

---

## Phase 7: Testimonials & Social Proof
- [x] **7.1** Audit all testimonial content across pages (reviewed - generic enough)
- [ ] **7.2** Update testimonials to reflect hotel/property management clients (future)

---

## Phase 8: Dashboard & Internal Tools
- [x] **8.1** `InternalDashboard.jsx` - Update title and branding
- [x] **8.2** `Dashboard.jsx` - Update title and branding
- [x] **8.3** Review any hardcoded company references
- [ ] **8.4** `GalleryPage.jsx` - Update portfolio for property projects

---

## Phase 9: Public Assets & Documents
- [x] **9.1** Update `public/sitemap.xml` (updated domain to kmjk.pro)
- [x] **9.2** Review `public/robots.txt` (no changes needed)
- [ ] **9.3** Check `public/documents/` for KMJK references (future)
- [ ] **9.4** Update any public HTML documents with branding (future)
- [ ] **9.5** Archive/update `public/images/` if needed (future)

---

## Phase 10: Upload Service & Backend
- [ ] **10.1** `kmjkUploadService.js` - Update bucket naming conventions
- [ ] **10.2** Review `netlify/functions/` for any hardcoded branding
- [ ] **10.3** Update any API references

---

## Phase 11: Email Signatures
- [x] **11.1** `EMAIL_SIGNATURE.html`
- [ ] **11.2** `EMAIL_SIGNATURE_FINAL.html` (not found)
- [x] **11.3** `EMAIL_SIGNATURE_SIMPLE.html`
- [x] **11.4** `EMAIL_SIGNATURE_ZOHO.html`
- [x] **11.5** `EMAIL_SIGNATURE_ZOHO_FINAL.html`

---

## Phase 12: New Service Pages (Create)
Suggested new pages for Hotel & Property Management focus:
- [ ] **12.1** Property Maintenance Services landing
- [ ] **12.2** Hotel Renovation Services landing
- [ ] **12.3** Commercial Flooring Solutions landing
- [ ] **12.4** Property Management Partnerships landing
- [ ] **12.5** Facility Maintenance Contracts landing
- [ ] **12.6** Hotel AV & Technology Services landing

---

## Phase 13: Routes & Navigation
- [ ] **13.1** Update route definitions in `App.jsx`
- [ ] **13.2** Update navigation links array
- [ ] **13.3** Set up redirects for old pages in `public/_redirects`

---

## Phase 14: Final Review & Testing
- [ ] **14.1** Full site walkthrough for branding consistency
- [ ] **14.2** Test chatbot with new company context
- [ ] **14.3** Verify all forms submit with correct company info
- [ ] **14.4** Check mobile responsiveness
- [ ] **14.5** SEO audit - ensure all meta tags updated
- [ ] **14.6** Performance testing

---

## Notes
- **Elite Service Hub / PSR Homes / Epoxy company** - These are separate entities under the umbrella, not the main rebrand target
- **Treasure Coast** - Consider if geographic focus remains or expands
- **"Exceptional Craftsmanship. A Seamless Experience."** - Tagline needs update for property management

---

## Suggested New Tagline Options
1. "Professional Property Solutions. Exceptional Service."
2. "Your Partner in Property Excellence."
3. "Comprehensive Property Management & Services."
4. "Elevating Properties. Exceeding Expectations."

---

## Color Palette Suggestions (Hotel/Property Focus)
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Navy | #1A365D | Primary |
| Slate Gray | #475569 | Secondary |
| Champagne Gold | #D4AF37 | Accent |
| Warm White | #FAFAFA | Background |
| Charcoal | #374151 | Text |

---

*Last Updated: January 14, 2026*
