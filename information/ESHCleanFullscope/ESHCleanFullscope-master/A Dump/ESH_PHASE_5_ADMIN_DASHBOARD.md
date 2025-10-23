# Phase 5: Admin Dashboard & Business Intelligence
## Elite Service Hub - Internal Operations & Analytics Platform

**Build Timeline**: Weeks 6-10  
**Priority**: MEDIUM  
**Purpose**: Provide ESH team with comprehensive business intelligence, partner management, and operational control

---

## Admin Dashboard Overview

### Login & Access Control

**User Roles**:
- **Super Admin**: Full access to all features
- **Market Manager**: Access to assigned market(s) only
- **Marketing Coordinator**: Campaign management, analytics
- **Lead Specialist**: Lead qualification, communication
- **Finance**: Commission tracking, invoicing, reporting

**Authentication**:
- Email + password + 2FA (required for all admin users)
- SSO integration (Google Workspace)
- IP whitelisting (optional)
- Session timeout: 15 minutes

---

## Executive Dashboard

### Home Screen

**Header**:
```
[ESH Logo] [Dashboard] [Markets] [Partners] [Leads] [Campaigns] [Analytics] [Reports] [Settings]

[User Profile] [Notifications] [Logout]
```

**Date Range Selector**:
- Today | Last 7 Days | Last 30 Days | This Quarter | This Year | Custom

**Key Performance Indicators** (6 cards):

**Total Revenue**:
- $1,275,000
- +23% vs last period
- Chart: Revenue trend

**Commission Revenue**:
- $191,250 (15% of total)
- +23% vs last period
- Chart: Commission trend

**Active Partners**:
- 12 contractors
- 3 markets
- 8 trades covered

**Leads Generated**:
- 247 leads this month
- 68% qualified rate
- 42% conversion rate

**ROAS**:
- 4.2x average
- Target: >3.5x
- Status: ✅ Above target

**Client Satisfaction**:
- 4.8/5 average rating
- NPS: 82
- 487 total reviews

---

## Market Management

### Markets Dashboard

**Market Cards** (grid view):

**Treasure Coast, FL**:
```
Status: Active | Launch Date: Oct 2024

Partners: 4
- Kitchen Remodeling: KMJK Professional Remodeling
- Bathroom Remodeling: KMJK Professional Remodeling
- Roofing: [Partner Name]
- HVAC: [Partner Name]

Performance (Last 30 Days):
- Leads: 87
- Conversions: 38 (44%)
- Revenue: $485,000
- Commission: $72,750
- ROAS: 4.5x
- Ad Spend: $16,200

[View Market Details] [Manage Partners] [View Analytics]
```

**Market Detail View**:

**Overview**:
- Market Name: Treasure Coast, FL
- Service Areas: Stuart, Port St. Lucie, Vero Beach, Jensen Beach
- Launch Date: Oct 15, 2024
- Status: Active
- Market Manager: [Name]

**Partners** (table):
| Partner | Trade | Status | Leads (30d) | Revenue (30d) | Rating |
|---------|-------|--------|-------------|---------------|--------|
| KMJK | Kitchen | Active | 45 | $285K | 4.9 ⭐ |
| KMJK | Bathroom | Active | 22 | $120K | 4.9 ⭐ |
| ABC Roofing | Roofing | Active | 12 | $65K | 4.7 ⭐ |
| XYZ HVAC | HVAC | Active | 8 | $15K | 4.8 ⭐ |

**Marketing Performance**:
- Total Ad Spend: $16,200
- Total Revenue: $485,000
- ROAS: 4.5x
- Cost Per Lead: $186
- Cost Per Acquisition: $426

**Lead Funnel**:
- Leads Generated: 87
- Qualified Leads: 59 (68%)
- Consultations Scheduled: 52 (88%)
- Estimates Sent: 48 (92%)
- Contracts Signed: 38 (79%)
- Overall Conversion: 44%

---

## Partner Management

### Partners Dashboard

**Filters**:
- All Partners | Active | Onboarding | Inactive | By Market | By Trade

**Partner Table**:
| Partner | Market | Trade | Status | Leads (30d) | Conv. Rate | Revenue (30d) | Rating | Actions |
|---------|--------|-------|--------|-------------|------------|---------------|--------|---------|
| KMJK | Treasure Coast | Kitchen | Active | 45 | 52% | $285K | 4.9 ⭐ | [View] [Edit] |
| KMJK | Treasure Coast | Bathroom | Active | 22 | 45% | $120K | 4.9 ⭐ | [View] [Edit] |

**Partner Detail View**:

**Company Information**:
- Company Name: KMJK Professional Remodeling
- Owner: [Name]
- License #: [Number]
- Insurance: [Provider & Policy #]
- Years in Business: 20+
- Service Areas: Treasure Coast, FL
- Trades: Kitchen Remodeling, Bathroom Remodeling

**Contact Information**:
- Primary Contact: [Name]
- Email: [Email]
- Phone: [Phone]
- Website: kmjk.pro

**Partnership Details**:
- Partner Since: Oct 15, 2024
- Status: Active
- Commission Rate: 15%
- Exclusivity: Kitchen & Bathroom (Treasure Coast)
- Contract End Date: Oct 15, 2026

**Performance Metrics** (Last 90 Days):
- Leads Received: 135
- Leads Accepted: 128 (95%)
- Consultations Scheduled: 112 (88%)
- Contracts Signed: 62 (55%)
- Total Revenue: $875,000
- Commission Owed: $131,250
- Average Job Value: $42,500
- Average Response Time: 1.1 hours
- Client Satisfaction: 4.9/5

**Lead Quality Feedback**:
- A-Tier Acceptance: 98%
- B-Tier Acceptance: 92%
- C-Tier Acceptance: 65%
- Declined Leads: 7 (reasons: outside service area, budget too low)

**Commission History**:
- Table of all invoices (paid, pending, overdue)
- Total Paid: $98,500
- Total Pending: $32,750

**Actions**:
- [Edit Partner Info]
- [Adjust Commission Rate]
- [Pause Lead Flow]
- [View Contract]
- [Send Message]
- [Schedule Review Meeting]

---

## Lead Management

### All Leads Dashboard

**Filters**:
- All | New | Qualified | Contacted | Scheduled | Converted | Declined
- By Market | By Trade | By Partner | By Source | By Date Range

**Lead Table**:
| Lead | Market | Trade | Budget | Timeline | Score | Partner | Status | Source | Date |
|------|--------|-------|--------|----------|-------|---------|--------|--------|------|
| John Smith | Treasure Coast | Kitchen | $25-50K | 1-3mo | A (92) | KMJK | Contacted | Google Ads | Jan 15 |

**Lead Detail View**:
- All lead information (same as contractor dashboard)
- Lead source and attribution
- Lead score breakdown
- Activity timeline
- Partner assignment history
- Communication history (emails, SMS, calls)
- Notes from ESH team and contractor

**Bulk Actions**:
- Reassign leads
- Export to CSV
- Send bulk email
- Update status

---

## Campaign Management

### Marketing Campaigns Dashboard

**Campaign Overview**:

**Active Campaigns** (by market):

**Treasure Coast - Kitchen Remodeling**:
```
Status: Active | Budget: $8,000/month

Performance (Last 30 Days):
- Impressions: 125,000
- Clicks: 3,750 (3.0% CTR)
- Cost Per Click: $4.27
- Leads: 45
- Cost Per Lead: $178
- Conversions: 23
- Cost Per Acquisition: $348
- Revenue: $285,000
- ROAS: 4.4x

Top Keywords:
1. kitchen remodeling stuart fl - $6.50 CPC, 450 clicks
2. kitchen renovation treasure coast - $5.20 CPC, 380 clicks
3. kitchen contractors near me - $7.80 CPC, 320 clicks

[View Campaign] [Edit Budget] [Pause] [View Keywords]
```

**Campaign Detail View**:

**Campaign Settings**:
- Campaign Name: Treasure Coast - Kitchen Remodeling
- Market: Treasure Coast, FL
- Trade: Kitchen Remodeling
- Partner: KMJK Professional Remodeling
- Platform: Google Ads
- Budget: $8,000/month ($267/day)
- Status: Active
- Start Date: Oct 15, 2024

**Performance Metrics**:
- Charts showing trends over time
- Impressions, clicks, CTR, CPC, conversions, ROAS

**Keyword Performance**:
| Keyword | Impressions | Clicks | CTR | CPC | Conversions | Conv. Rate | Cost |
|---------|-------------|--------|-----|-----|-------------|------------|------|
| kitchen remodeling stuart fl | 12,500 | 450 | 3.6% | $6.50 | 8 | 1.8% | $2,925 |

**Ad Performance**:
- Table of ad variations with CTR, conversion rate
- A/B test results

**Landing Page Performance**:
- kmjk.pro/kitchen-remodeling
- Visits: 3,750
- Conversion Rate: 12%
- Bounce Rate: 42%
- Avg. Time on Page: 3:24

**Actions**:
- [Edit Campaign]
- [Adjust Budget]
- [Add Keywords]
- [Pause Campaign]
- [Clone Campaign]

---

## Analytics & Reporting

### Business Intelligence Dashboard

**Revenue Analytics**:

**Revenue by Market** (bar chart):
- Treasure Coast: $1,275,000
- [Future markets]

**Revenue by Trade** (pie chart):
- Kitchen Remodeling: 60% ($765K)
- Bathroom Remodeling: 25% ($319K)
- Roofing: 10% ($128K)
- HVAC: 5% ($63K)

**Revenue Trend** (line chart):
- Monthly revenue over last 12 months
- Trend line showing growth

**Commission Revenue**:
- Total Commission Earned: $191,250
- Commission Paid: $158,500
- Commission Pending: $32,750
- Average Commission per Job: $5,750

**Marketing Analytics**:

**Ad Spend by Market**:
- Treasure Coast: $48,600 (last 90 days)
- [Future markets]

**ROAS by Market**:
- Treasure Coast: 4.5x
- Target: 3.5x
- Status: ✅ Above target

**ROAS by Trade**:
- Kitchen Remodeling: 4.8x
- Bathroom Remodeling: 4.2x
- Roofing: 3.9x
- HVAC: 3.1x

**Cost Per Lead by Trade**:
- Kitchen: $178
- Bathroom: $142
- Roofing: $95
- HVAC: $68

**Lead Analytics**:

**Lead Volume Trend** (line chart):
- Monthly leads over last 12 months

**Lead Quality Distribution**:
- A-Tier: 64%
- B-Tier: 28%
- C-Tier: 8%

**Lead Source Attribution**:
- Google Ads: 68%
- Organic Search: 18%
- Facebook Ads: 8%
- Referrals: 4%
- Direct: 2%

**Conversion Funnel** (all markets combined):
- Leads Generated: 247
- Qualified Leads: 168 (68%)
- Consultations Scheduled: 142 (85%)
- Estimates Sent: 131 (92%)
- Contracts Signed: 104 (79%)
- Overall Conversion: 42%

**Partner Performance**:

**Top Performing Partners** (by revenue):
1. KMJK - Kitchen: $285K (52% conv. rate)
2. KMJK - Bathroom: $120K (45% conv. rate)
3. ABC Roofing: $65K (38% conv. rate)

**Partner Response Time**:
- Average: 1.3 hours
- Target: <2 hours
- Partners meeting target: 11/12 (92%)

**Client Satisfaction by Partner**:
- Table showing each partner's rating, NPS, review count

---

## Automated Reporting

### Scheduled Reports

**Weekly Executive Report** (sent every Monday):
- Revenue summary
- Lead volume and quality
- ROAS by market
- Top performing campaigns
- Partner highlights
- Issues requiring attention

**Monthly Market Report** (sent to Market Managers):
- Market-specific performance
- Partner performance
- Campaign performance
- Recommendations for optimization

**Quarterly Business Review** (sent to stakeholders):
- Comprehensive performance analysis
- Market expansion opportunities
- Financial projections
- Strategic recommendations

**Custom Reports**:
- Build custom reports with drag-and-drop interface
- Select metrics, date ranges, filters
- Schedule delivery (daily, weekly, monthly)
- Export to PDF, CSV, Excel

---

## Financial Management

### Commission Tracking

**Commission Dashboard**:

**Pending Commissions**:
- Total: $32,750
- Number of Jobs: 7
- Oldest Pending: 15 days

**Commission by Partner**:
| Partner | Jobs Completed | Commission Owed | Oldest Invoice | Status |
|---------|----------------|-----------------|----------------|--------|
| KMJK | 3 | $19,125 | 10 days | Pending |
| ABC Roofing | 2 | $8,500 | 15 days | Pending |
| XYZ HVAC | 2 | $5,125 | 5 days | Pending |

**Commission History**:
- Table of all commissions (paid, pending, overdue)
- Filters by partner, date, status
- Export to CSV

**Payment Processing**:
- [Mark as Paid] button
- Batch payment processing
- Integration with accounting software (QuickBooks)

### Expense Tracking

**Marketing Expenses**:
- Google Ads: $48,600
- Facebook Ads: $8,200
- SEO/Content: $3,500
- Design/Creative: $2,000
- Total: $62,300

**Operational Expenses**:
- Salaries: $45,000
- Software/Tools: $5,200
- Office: $3,000
- Other: $2,500
- Total: $55,700

**Profit & Loss**:
- Revenue: $1,275,000
- Commission Revenue: $191,250
- Marketing Expenses: -$62,300
- Operational Expenses: -$55,700
- Net Profit: $73,250
- Profit Margin: 38%

---

## System Administration

### User Management

**Admin Users**:
| Name | Email | Role | Markets | Status | Last Login |
|------|-------|------|---------|--------|------------|
| John Doe | john@esh.com | Super Admin | All | Active | 5 min ago |
| Jane Smith | jane@esh.com | Market Manager | Treasure Coast | Active | 2 hours ago |

**Actions**:
- [Add User]
- [Edit User]
- [Deactivate User]
- [Reset Password]

### Settings

**Company Settings**:
- Company Name
- Logo
- Brand Colors
- Contact Information

**Email Templates**:
- Lead confirmation email
- Consultation reminder
- Follow-up sequences
- Edit templates with WYSIWYG editor

**Notification Settings**:
- Configure alerts and thresholds
- Email notifications for critical events
- Slack integration (optional)

**Integration Settings**:
- CRM (HubSpot) API keys
- Email (SendGrid) API keys
- SMS (Twilio) credentials
- Analytics (Google Analytics) tracking IDs
- Call Tracking (CallRail) account info

---

## Technical Requirements

### Performance
- Dashboard load: <2 seconds
- Real-time data updates: <10 seconds
- Report generation: <30 seconds
- Data export: <1 minute

### Security
- Role-based access control (RBAC)
- Two-factor authentication (required)
- IP whitelisting (optional)
- Audit logging (all actions logged)
- Data encryption at rest and in transit
- Regular security audits

### Scalability
- Support for 100+ markets
- Support for 1,000+ partners
- Support for 10,000+ leads/month
- Database optimization for fast queries
- Caching for frequently accessed data

### Integrations
- CRM: HubSpot API
- Accounting: QuickBooks API
- Email: SendGrid API
- SMS: Twilio API
- Analytics: Google Analytics 4, Mixpanel
- Ad Platforms: Google Ads API, Facebook Ads API
- Calendar: Google Calendar API, Outlook API

---

## Data Visualization

### Chart Types

**Line Charts**:
- Revenue trends
- Lead volume trends
- ROAS trends

**Bar Charts**:
- Revenue by market
- Revenue by trade
- Lead volume by source

**Pie Charts**:
- Revenue distribution
- Lead quality distribution
- Lead source attribution

**Funnel Charts**:
- Conversion funnel
- Sales pipeline

**Tables**:
- Partner performance
- Campaign performance
- Lead details
- Commission tracking

**Specifications**:
- Interactive charts (hover for details, click to drill down)
- Export charts as PNG or PDF
- Responsive design (mobile-friendly)
- Color-coded for easy interpretation

---

## Alerts & Notifications

### Automated Alerts

**Performance Alerts**:
- ROAS drops below 3.0x → Alert to Marketing Coordinator
- Partner response time >4 hours → Alert to Market Manager
- Lead conversion rate <30% → Alert to Lead Specialist
- Campaign budget 80% spent → Alert to Marketing Coordinator

**Operational Alerts**:
- New partner application → Alert to Super Admin
- Partner contract expiring in 30 days → Alert to Market Manager
- Commission invoice overdue >30 days → Alert to Finance
- Negative client review → Alert to Market Manager

**System Alerts**:
- API integration failure → Alert to Tech Team
- Website downtime → Alert to Tech Team
- Security breach attempt → Alert to Super Admin

**Notification Channels**:
- Email
- SMS (for critical alerts)
- Slack (optional)
- In-app notifications

---

## Success Metrics

### Dashboard KPIs

**Business Health**:
- Monthly Recurring Revenue (MRR) growth
- Profit margin
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- LTV:CAC ratio

**Operational Efficiency**:
- Lead response time
- Lead conversion rate
- Partner utilization rate
- Campaign ROAS

**Growth Metrics**:
- New markets launched
- New partners onboarded
- Lead volume growth
- Revenue growth

---

**Phase 5 Complete** → All 5 phases documented!

---

## Next Steps

1. Review all 5 phase documents
2. Prioritize features (MVP vs. nice-to-have)
3. Create detailed technical specifications
4. Set up development environment
5. Begin Phase 1 build (Public Website)
6. Follow sequential build timeline
7. Test and iterate at each phase
8. Deploy and monitor performance

**Estimated Total Build Time**: 10-12 weeks with dedicated full-stack developer

**Recommended Team**:
- 1 Full-Stack Developer (Next.js, React, Node.js, PostgreSQL)
- 1 UI/UX Designer (design system, mockups)
- 1 Project Manager (coordinate build, QA testing)
- Optional: 1 DevOps Engineer (infrastructure, deployment)
