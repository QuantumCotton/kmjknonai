# Phase 4: Contractor Dashboard & Partner Portal
## Elite Service Hub - Contractor Interface Specifications

**Build Timeline**: Weeks 5-8  
**Priority**: HIGH  
**Purpose**: Provide contractors with real-time lead management, performance analytics, and communication tools

---

## Dashboard Overview

### Login & Authentication
- Email + password authentication
- "Remember me" option
- Password reset via email
- Two-factor authentication (optional, for security)
- Mobile-optimized login page

### Dashboard Home Screen

**Header**:
- [ESH Logo] [Dashboard] [Leads] [Projects] [Analytics] [Settings] [Profile Icon]

**Welcome Section**:
```
Welcome back, [Contractor Name]!

[Current Date/Time]
```

**Key Metrics Cards** (4 cards in a row):

**New Leads**:
- Number: 3
- Icon: Bell
- Status: "Awaiting response"
- Action: "View Leads →"

**Active Projects**:
- Number: 5
- Icon: Briefcase
- Status: "In progress"
- Action: "View Projects →"

**This Month's Revenue**:
- Number: $127,500
- Icon: Dollar sign
- Status: "+23% vs last month"
- Action: "View Analytics →"

**Pending Commission**:
- Number: $19,125
- Icon: Money
- Status: "3 jobs completed"
- Action: "View Invoices →"

---

## Leads Management

### Leads Dashboard

**Filters**:
- All Leads | New | Accepted | Contacted | Scheduled | Converted | Declined

**Lead Cards** (list view):

**Lead Card Example**:
```
🔥 HIGH PRIORITY

John Smith - Kitchen Remodeling
📍 Stuart, FL | 💰 $25K-$50K | 📅 1-3 months

Submitted: 2 hours ago
Lead Score: A-Tier (92/100)

Contact: (555) 555-5555 | john@email.com

Notes: Interested in modern farmhouse style, wants to start in 6 weeks.

[Accept Lead] [Decline] [View Details]
```

**Lead Detail View** (click "View Details"):

**Lead Information**:
- Name: John Smith
- Email: john@email.com
- Phone: (555) 555-5555
- Address: 123 Main St, Stuart, FL 34994
- Project Type: Kitchen Remodeling
- Budget: $25,000 - $50,000
- Timeline: 1-3 months (wants to start in 6 weeks)
- Lead Source: Google Ads - Kitchen Remodel
- Lead Score: A-Tier (92/100)
- Submitted: Jan 15, 2025 at 2:30 PM

**Project Details**:
- Current kitchen: 1980s style, outdated cabinets
- Goals: Modern farmhouse look, open concept, large island
- Inspiration: [Link to Pinterest board]
- Must-haves: Quartz countertops, white cabinets, farmhouse sink
- Nice-to-haves: Built-in coffee station, pot filler

**Actions**:
- [Call Now] (click-to-call)
- [Send Email]
- [Send SMS]
- [Schedule Consultation]
- [Accept Lead]
- [Decline Lead]

**Activity Timeline**:
- Jan 15, 2:30 PM: Lead submitted via website
- Jan 15, 2:31 PM: Confirmation email sent to homeowner
- Jan 15, 2:32 PM: Lead assigned to you
- Jan 15, 2:35 PM: You viewed lead details

---

## Projects Management

### Projects Dashboard

**Project Status Tabs**:
- All | Consultation Scheduled | Estimate Sent | Contract Signed | In Progress | Completed

**Project Cards**:

**Project Card Example**:
```
Sarah & Mike Thompson - Kitchen Remodel
📍 Stuart, FL | 💰 $45,000 | 📅 Started: Feb 1

Status: In Progress (Week 3 of 6)
Next Milestone: Cabinet Installation (Feb 25)

[View Project] [Update Status] [Upload Photos] [Message Client]
```

**Project Detail View**:

**Project Overview**:
- Client: Sarah & Mike Thompson
- Address: 456 Oak Ave, Stuart, FL
- Project Type: Full Kitchen Remodel
- Contract Value: $45,000
- ESH Commission: $6,750 (15%)
- Start Date: Feb 1, 2025
- Est. Completion: Mar 15, 2025
- Status: In Progress (50% complete)

**Timeline**:
```
✅ Consultation (Jan 10)
✅ Estimate Sent (Jan 15)
✅ Contract Signed (Jan 25)
✅ Permits Approved (Feb 1)
✅ Demolition (Feb 3-5)
✅ Plumbing & Electrical (Feb 8-12)
🔄 Drywall & Paint (Feb 15-19) - IN PROGRESS
⏳ Cabinet Installation (Feb 25-28)
⏳ Countertop Installation (Mar 1)
⏳ Final Walkthrough (Mar 15)
```

**Photo Gallery**:
- Before photos (uploaded Jan 10)
- Progress photos (uploaded weekly)
- Upload new photos: [Choose Files] [Upload]

**Client Communication**:
- Message thread with Sarah & Mike
- [Send Message] button

**Documents**:
- Contract (signed Jan 25)
- Permits (approved Feb 1)
- Material selections
- Warranty information
- [Upload Document]

**Actions**:
- [Update Status]
- [Upload Photos]
- [Message Client]
- [Mark as Complete]

---

## Analytics & Performance

### Performance Dashboard

**Date Range Selector**:
- Last 7 Days | Last 30 Days | Last 90 Days | This Year | Custom Range

**Revenue Metrics**:

**Total Revenue** (line chart):
- Shows monthly revenue over selected period
- Breakdown: Completed jobs, pending jobs, pipeline

**Revenue by Project Type** (pie chart):
- Kitchen Remodeling: 60% ($270K)
- Bathroom Remodeling: 30% ($135K)
- Other: 10% ($45K)

**Lead Performance**:

**Lead Funnel** (funnel chart):
- Leads Received: 50
- Leads Accepted: 45 (90%)
- Consultations Scheduled: 38 (84%)
- Consultations Completed: 35 (92%)
- Estimates Sent: 35 (100%)
- Contracts Signed: 20 (57%)

**Conversion Metrics**:
- Lead-to-Consultation: 84%
- Consultation-to-Estimate: 100%
- Estimate-to-Contract: 57%
- Overall Conversion Rate: 40%

**Lead Quality**:
- A-Tier Leads: 32 (64%)
- B-Tier Leads: 15 (30%)
- C-Tier Leads: 3 (6%)

**Response Time**:
- Average Response Time: 1.2 hours
- Target: <2 hours
- Status: ✅ On Track

**Project Metrics**:

**Active Projects**: 5
**Completed Projects** (this month): 3
**Average Project Value**: $38,500
**Average Project Duration**: 5.2 weeks

**Client Satisfaction**:
- Average Rating: 4.9/5 ⭐
- NPS Score: 85
- Reviews: 127 total, 124 five-star

---

## Commission & Invoicing

### Commission Dashboard

**Pending Commission**:
- 3 completed projects awaiting payment
- Total: $19,125

**Completed Projects**:

**Project 1**:
- Client: John & Jane Doe
- Project: Kitchen Remodel
- Contract Value: $42,000
- Commission (15%): $6,300
- Completion Date: Jan 20, 2025
- Payment Status: Pending
- [Generate Invoice]

**Project 2**:
- Similar structure

**Commission History**:
- Table showing all past commissions
- Filters: Paid | Pending | Overdue
- Export to CSV

**Generate Invoice**:
- Auto-populated with project details
- Commission amount calculated automatically
- PDF download
- Email to ESH billing team

---

## Settings & Profile

### Profile Settings

**Company Information**:
- Company Name
- License Number
- Insurance Provider & Policy Number
- Service Areas
- Trades/Specialties
- Years in Business
- [Save Changes]

**Contact Information**:
- Primary Contact Name
- Email
- Phone
- Website
- [Save Changes]

**Notification Preferences**:
- Email Notifications:
  - [ ] New leads
  - [ ] Project updates
  - [ ] Commission payments
  - [ ] ESH announcements
- SMS Notifications:
  - [ ] High-priority leads only
  - [ ] All new leads
  - [ ] None
- [Save Preferences]

### Account Settings

**Login & Security**:
- Change Password
- Enable Two-Factor Authentication
- Trusted Devices
- Login History

**Billing**:
- Payment Method on File
- Billing Address
- Invoice History

---

## Mobile App Specifications

### Mobile App Features

**Core Functionality**:
- View new leads (with push notifications)
- Accept/decline leads
- Call/email/SMS leads directly
- View project status
- Upload project photos
- Message clients
- View analytics

**Push Notifications**:
- New lead: "🔥 New lead: John Smith - Kitchen Remodel ($25-50K)"
- Lead reminder: "You have 3 leads awaiting response"
- Project milestone: "Cabinet installation scheduled for tomorrow"
- Client message: "Sarah Thompson sent you a message"

**Technology**:
- React Native (iOS + Android)
- Or Progressive Web App (PWA) for faster deployment

---

## Technical Requirements

### Performance
- Dashboard load time: <1 second
- Real-time updates: <5 seconds
- Mobile-responsive: All screens 320px+

### Security
- HTTPS only
- Session timeout: 30 minutes of inactivity
- Role-based access control
- Audit logging

### Integrations
- CRM sync (HubSpot)
- Calendar sync (Google Calendar, Outlook)
- Accounting software (QuickBooks)

---

**Phase 4 Complete** → Proceed to Phase 5: Admin Dashboard
