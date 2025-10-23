# Atlas & Cotton - AI Chatbot & Dashboard Specifications

## Atlas (Website-Facing Chatbot) 🤖

**Purpose**: Qualify homeowner leads on contractor websites (kmjk.pro)

### Core Features
- AI-powered conversational lead qualification
- Natural language processing (OpenAI GPT-4)
- Lead scoring algorithm (A/B/C tiers)
- Email notifications to Chris@TheEliteServiceHub.com
- Calendar scheduling integration
- Multi-channel communication (chat, email, SMS)

### Conversation Paths
1. **"I want a consultation"** → Full qualification flow
2. **"I have questions"** → Answer FAQs, then qualify
3. **"Show me your work"** → Portfolio, then qualify
4. **"Just browsing"** → Minimize, re-engage later

### Data Collection (Natural Conversation)
- Name
- Email
- Phone
- ZIP code
- Project type (kitchen, bathroom, both)
- Timeline (ASAP, 1-3mo, 3-6mo, 6mo+, just planning)
- Budget range ($15-25K, $25-50K, $50-75K, $75K+)
- Project details (optional, freeform)

### Lead Scoring
- **A-Tier** (80-100 pts): High budget, short timeline, in service area, complete contact
- **B-Tier** (50-79 pts): Medium budget, 3-6mo timeline, in service area
- **C-Tier** (0-49 pts): Low budget, long timeline, or outside service area

### Notifications
- **Email to Chris**: Immediate for A-tier, daily digest for B/C-tier
- **Email to Contractor**: Immediate for A-tier
- **SMS to Contractor**: Optional, only for A-tier urgent leads
- **Email to Homeowner**: Confirmation + next steps

---

## Cotton (Backend Dashboard) 💼

**Purpose**: Internal operations platform for ESH team

### Core Features
- Work order management
- Quick shortcuts to controlled websites
- Lead management & assignment
- Contractor performance tracking
- Reporting & analytics

### Work Orders System
**Create/Edit/Manage Work Orders**:
- Link to lead (auto-populate from Atlas)
- Assign to contractor
- Set priority (low, medium, high, urgent)
- Track status (draft, sent, accepted, in_progress, completed)
- Add notes and attachments
- Generate PDF for printing/emailing
- Email notifications on status changes

**Work Order Fields**:
- Client name, email, phone
- Project address
- Project type
- Estimated value
- Due date
- Assigned contractor
- Status & priority
- Internal notes

### Quick Shortcuts Panel
**One-Click Access to**:
- kmjk.pro/kitchen
- kmjk.pro/bathroom
- Google Ads Dashboard
- Supabase Dashboard
- Gmail (Chris@TheEliteServiceHub.com)
- CallRail
- Analytics
- [Customizable - add more as needed]

### Lead Management View
- All leads in sortable table
- Filter by status, tier, date range, contractor
- Search by name, email, phone
- Lead detail view with full history
- Conversation transcript from Atlas
- Assign to contractor button
- Create work order button
- Add notes section
- Status change dropdown

### Contractor Management
- List all contractors (KMJK, future partners)
- Performance metrics per contractor
- Shortcut to their marketing site
- Commission tracking
- Contact info
- Edit contractor details

### Reporting & Analytics
- Revenue by contractor
- Lead volume by source (organic, ads, referral)
- Conversion rates by stage
- ROAS (Return on Ad Spend)
- Project types distribution
- Monthly growth trends
- Export to CSV

---

## Technical Architecture

### Atlas Tech Stack
- React component (`ChatWidget.tsx`)
- OpenAI GPT-4 API
- Supabase (store conversations + leads)
- SendGrid/Resend (email)
- Twilio (SMS)
- Calendly/Cal.com (scheduling)

### Cotton Tech Stack
- React + TypeScript (dashboard UI)
- Supabase (database + auth)
- Recharts (data visualization)
- PDF generation (jsPDF or similar)
- Same email/SMS infrastructure as Atlas

### Database Tables
```sql
-- Atlas tables
leads (id, contractor_id, name, email, phone, project_type, budget, timeline, score, tier, status)
conversations (id, lead_id, messages_jsonb, created_at)

-- Cotton tables
work_orders (id, lead_id, contractor_id, status, priority, estimated_value, due_date, notes)
admin_users (id, email, name, role)
contractors (id, company_name, subdomain, trades, service_areas, active)
shortcuts (id, name, url, icon, user_id, order)
```

---

## Key Differences: Atlas vs Cotton

| Feature | Atlas (Public) | Cotton (Internal) |
|---------|----------------|-------------------|
| **Users** | Homeowners | ESH Team |
| **Purpose** | Lead qualification | Operations management |
| **Interface** | Chat widget | Full dashboard |
| **Auth** | No login required | Admin login required |
| **Data Access** | Current conversation only | All leads & data |
| **Notifications** | Sends emails | Receives notifications |
| **Location** | Contractor websites | admin.eliteservicehub.com |

---

## Phase Breakdown

### Phase 3: Atlas (Weeks 7-10)
Build the customer-facing chatbot for lead generation

### Phase 3.5: Cotton (Weeks 11-13)
Build the internal dashboard for operations management

**Why Separate?**
- Different user audiences
- Different security requirements
- Atlas can go live first, Cotton can follow
- Parallel development possible if you have help

---

## Future Enhancements (Post-MVP)

### Atlas V2
- Multi-language support (Spanish for FL market)
- Voice input/output
- Image uploads (show us your space)
- Live human handoff
- Sentiment analysis
- Proactive outreach (re-engage cold leads)

### Cotton V2
- Mobile app (iOS/Android)
- Team collaboration (assignments, comments)
- Advanced reporting (custom dashboards)
- Integrations (QuickBooks, Slack, Zapier)
- Automated workflows (if X happens, do Y)
- Machine learning insights

---

## Success Metrics

### Atlas
- **Engagement Rate**: >40% of visitors interact
- **Completion Rate**: >60% complete qualification
- **Lead Quality**: >70% are A or B-tier
- **Response Time**: <2 seconds per message

### Cotton
- **Time Saved**: 10+ hours/week on manual tasks
- **Lead Response**: <30 minutes from Atlas to work order
- **Data Accuracy**: 100% (no manual entry errors)
- **User Adoption**: Daily active use by ESH team

---

**Questions? Email Chris@TheEliteServiceHub.com**
