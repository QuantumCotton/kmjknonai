import { useState } from 'react';
import { Search, Filter, Download, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import Button from '../../components/shared/Button';
import { getAllLeads } from '../../services/atlasService';

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Get Atlas leads
  const atlasLeads = getAllLeads();

  const mockLeads = [
    {
      id: 'lead_1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(772) 555-0123',
      zip: '34945',
      projectType: 'kitchen',
      budget: '$65,000',
      timeline: 'ASAP',
      score: 95,
      status: 'new',
      source: 'website',
      createdAt: new Date('2026-03-15T10:30:00')
    },
    {
      id: 'lead_2',
      name: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '(772) 555-0456',
      zip: '34950',
      projectType: 'bathroom',
      budget: '$42,000',
      timeline: '1-3 months',
      score: 88,
      status: 'contacted',
      source: 'atlas',
      createdAt: new Date('2026-03-15T14:20:00')
    },
    {
      id: 'lead_3',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '(772) 555-0789',
      zip: '34946',
      projectType: 'kitchen',
      budget: '$110,000',
      timeline: 'ASAP',
      score: 97,
      status: 'qualified',
      source: 'referral',
      createdAt: new Date('2026-03-14T16:45:00')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-400';
      case 'qualified': return 'bg-green-500/20 text-green-400';
      case 'converted': return 'bg-purple-500/20 text-purple-400';
      case 'lost': return 'bg-red-500/20 text-red-400';
      default: return 'bg-zinc-500/20 text-zinc-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light font-serif mb-2">Lead Management</h1>
          <p className="text-zinc-500">Manage and track all incoming leads</p>
        </div>
        <Button variant="accent">
          <Download size={18} className="mr-2" />
          Export Leads
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search leads by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-esh-gold"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-esh-gold"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
        <Button variant="secondary">
          <Filter size={18} />
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {['All', 'New', 'Contacted', 'Qualified', 'Converted'].map((status) => (
          <div key={status} className="bg-zinc-900 border border-zinc-800 p-4 text-center">
            <div className="text-2xl font-light mb-1">
              {status === 'All' ? mockLeads.length : mockLeads.filter(l => l.status === status.toLowerCase()).length}
            </div>
            <div className="text-xs text-zinc-500">{status}</div>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-zinc-900 border border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-zinc-500">Lead Info</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-500">Project</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-500">Contact</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-500">Score</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-500">Status</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-zinc-800/50">
                  <td className="p-4">
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-zinc-500 flex items-center gap-2 mt-1">
                      <Calendar size={14} />
                      {lead.createdAt.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-zinc-600 mt-1">
                      Source: {lead.source}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium capitalize">{lead.projectType}</div>
                    <div className="text-sm text-zinc-500">{lead.budget}</div>
                    <div className="text-xs text-zinc-600">{lead.timeline}</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-zinc-600" />
                        <span className="text-zinc-400">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-zinc-600" />
                        <span className="text-zinc-400">{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-zinc-600" />
                        <span className="text-zinc-400">{lead.zip}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`text-2xl font-light ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </div>
                    <div className="text-xs text-zinc-600">/ 100</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-esh-gold text-black hover:bg-esh-gold-dark">
                        Assign
                      </button>
                      <button className="px-3 py-1 text-xs border border-zinc-700 hover:bg-zinc-800">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Atlas Leads Preview */}
      {atlasLeads.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-light font-serif mb-4">Atlas AI Leads ({atlasLeads.length})</h2>
          <div className="bg-zinc-900 border border-zinc-800 p-4">
            <p className="text-zinc-500 text-sm">
              {atlasLeads.length} leads captured by Atlas chatbot. Click to view details.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
