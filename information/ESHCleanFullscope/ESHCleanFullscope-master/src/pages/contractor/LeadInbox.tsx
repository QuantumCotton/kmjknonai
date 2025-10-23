import { useState } from 'react';
import { Search, Filter, Phone, Mail, MapPin, Clock, DollarSign, Briefcase, MessageSquare } from 'lucide-react';
import Button from '../../components/shared/Button';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  projectType: string;
  budget: string;
  timeline: string;
  score: number;
  status: 'new' | 'viewed' | 'contacted' | 'quoted' | 'won' | 'lost';
  receivedAt: Date;
  details?: string;
}

export default function LeadInbox() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const leads: Lead[] = [
    {
      id: 'lead_1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(772) 555-0123',
      zip: '34945',
      projectType: 'Kitchen Remodel',
      budget: '$65,000',
      timeline: 'ASAP',
      score: 95,
      status: 'new',
      receivedAt: new Date('2026-03-15T10:30:00'),
      details: 'Looking to completely remodel our kitchen. Interested in custom cabinets, quartz countertops, and new appliances. Beach-inspired design with white and blue accents.'
    },
    {
      id: 'lead_2',
      name: 'Michael Rodriguez',
      email: 'mrodriguez@email.com',
      phone: '(772) 555-0456',
      zip: '34950',
      projectType: 'Master Bathroom',
      budget: '$42,000',
      timeline: '1-3 months',
      score: 88,
      status: 'viewed',
      receivedAt: new Date('2026-03-15T14:20:00'),
      details: 'Master bathroom renovation. Want to add walk-in shower, update vanity, and new flooring.'
    },
    {
      id: 'lead_3',
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      phone: '(772) 555-0789',
      zip: '34946',
      projectType: 'Kitchen & Bath',
      budget: '$110,000',
      timeline: 'ASAP',
      score: 97,
      status: 'contacted',
      receivedAt: new Date('2026-03-14T16:45:00'),
      details: 'Full kitchen and master bathroom remodel. High-end finishes. Timeline is flexible for the right contractor.'
    },
    {
      id: 'lead_4',
      name: 'David Thompson',
      email: 'dthompson@email.com',
      phone: '(772) 555-0321',
      zip: '34945',
      projectType: 'Kitchen Remodel',
      budget: '$55,000',
      timeline: '3-6 months',
      score: 78,
      status: 'quoted',
      receivedAt: new Date('2026-03-13T09:15:00')
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'new':
        return { color: 'bg-green-500 text-white', label: '🆕 New' };
      case 'viewed':
        return { color: 'bg-blue-500 text-white', label: '👁️ Viewed' };
      case 'contacted':
        return { color: 'bg-yellow-500 text-black', label: '📞 Contacted' };
      case 'quoted':
        return { color: 'bg-purple-500 text-white', label: '💰 Quoted' };
      case 'won':
        return { color: 'bg-green-600 text-white', label: '✅ Won' };
      case 'lost':
        return { color: 'bg-red-500 text-white', label: '❌ Lost' };
      default:
        return { color: 'bg-zinc-500 text-white', label: status };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const filteredLeads = filterStatus === 'all' 
    ? leads 
    : leads.filter(l => l.status === filterStatus);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-light font-serif">Lead Inbox</h1>
          <p className="text-sm text-zinc-500">Manage your incoming project opportunities</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-esh-gold"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-esh-gold"
          >
            <option value="all">All Leads</option>
            <option value="new">New</option>
            <option value="viewed">Viewed</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <Button variant="secondary">
            <Filter size={18} />
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          {['All', 'New', 'Viewed', 'Contacted', 'Quoted', 'Won'].map((status) => {
            const count = status === 'All' 
              ? leads.length 
              : leads.filter(l => l.status === status.toLowerCase()).length;
            
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status === 'All' ? 'all' : status.toLowerCase())}
                className={`p-4 border transition-colors ${
                  (filterStatus === 'all' && status === 'All') || 
                  (filterStatus === status.toLowerCase())
                    ? 'bg-esh-gold text-black border-esh-gold'
                    : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                <div className="text-2xl font-light mb-1">{count}</div>
                <div className="text-xs">{status}</div>
              </button>
            );
          })}
        </div>

        {/* Leads List */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredLeads.map((lead) => {
              const statusConfig = getStatusConfig(lead.status);
              
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`bg-zinc-900 border p-6 cursor-pointer transition-all ${
                    selectedLead?.id === lead.id
                      ? 'border-esh-gold'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-medium">{lead.name}</h3>
                        <span className={`px-3 py-1 text-xs rounded ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500">{lead.projectType}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-light ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </div>
                      <div className="text-xs text-zinc-600">Score</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={16} className="text-zinc-600" />
                      <span className="text-esh-gold">{lead.budget}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-zinc-600" />
                      <span className="text-zinc-400">{lead.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={16} className="text-zinc-600" />
                      <span className="text-zinc-400">{lead.zip}</span>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-600">
                    Received {lead.receivedAt.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lead Details */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 h-fit sticky top-6">
            {selectedLead ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-light font-serif mb-2">{selectedLead.name}</h2>
                  <span className={`inline-block px-3 py-1 text-xs rounded ${getStatusConfig(selectedLead.status).color}`}>
                    {getStatusConfig(selectedLead.status).label}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-xs text-zinc-600 mb-1">Project Type</div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-zinc-600" />
                      <span>{selectedLead.projectType}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-zinc-600 mb-1">Budget</div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-zinc-600" />
                      <span className="text-esh-gold font-medium">{selectedLead.budget}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-zinc-600 mb-1">Timeline</div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-zinc-600" />
                      <span>{selectedLead.timeline}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-zinc-600 mb-1">Email</div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-zinc-600" />
                      <a href={`mailto:${selectedLead.email}`} className="text-esh-gold hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-zinc-600 mb-1">Phone</div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-zinc-600" />
                      <a href={`tel:${selectedLead.phone}`} className="text-esh-gold hover:underline">
                        {selectedLead.phone}
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-zinc-600 mb-1">Location</div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-zinc-600" />
                      <span>{selectedLead.zip}</span>
                    </div>
                  </div>
                </div>

                {selectedLead.details && (
                  <div className="mb-6">
                    <div className="text-xs text-zinc-600 mb-2">Project Details</div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {selectedLead.details}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <Button variant="accent" className="w-full">
                    <Phone size={18} className="mr-2" />
                    Call Now
                  </Button>
                  <Button variant="primary" className="w-full">
                    <Mail size={18} className="mr-2" />
                    Send Email
                  </Button>
                  <button className="w-full py-3 border border-zinc-800 hover:bg-zinc-800 transition-colors">
                    Mark as Quoted
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-zinc-500 py-12">
                <MessageSquare size={48} className="mx-auto mb-4 text-zinc-700" />
                <p>Select a lead to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
