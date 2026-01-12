import { useState } from 'react';
import { Globe, ExternalLink, Edit, Trash2, Plus, Eye, Settings } from 'lucide-react';
import Button from '../../components/shared/Button';

interface ContractorAccount {
  id: string;
  contractorName: string;
  websiteUrl: string;
  customDomain?: string;
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  totalLeads: number;
  activeProjects: number;
  revenue: string;
  websiteViews: number;
  logo?: string;
  serviceTypes: string[];
}

export default function ContractorAccountsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');

  // Mock contractor accounts data
  const contractors: ContractorAccount[] = [
    {
      id: '1',
      contractorName: 'KMJK Construction',
      websiteUrl: '/c/kmjk',
      customDomain: 'kmjkconstruction.com',
      status: 'active',
      joinDate: '2025-10-15',
      totalLeads: 127,
      activeProjects: 3,
      revenue: '$185,250',
      websiteViews: 4521,
      serviceTypes: ['Kitchen', 'Bathroom']
    },
    {
      id: '2',
      contractorName: 'Elite Bathrooms Pro',
      websiteUrl: '/c/elite-bathrooms',
      status: 'active',
      joinDate: '2025-11-02',
      totalLeads: 84,
      activeProjects: 2,
      revenue: '$98,400',
      websiteViews: 3102,
      serviceTypes: ['Bathroom']
    },
    {
      id: '3',
      contractorName: 'Coastal Remodeling',
      websiteUrl: '/c/coastal-remodeling',
      customDomain: 'coastalremodelingfl.com',
      status: 'active',
      joinDate: '2025-12-10',
      totalLeads: 62,
      activeProjects: 2,
      revenue: '$76,850',
      websiteViews: 2847,
      serviceTypes: ['Kitchen', 'Bathroom']
    },
    {
      id: '4',
      contractorName: 'Premium Home Solutions',
      websiteUrl: '/c/premium-home',
      status: 'active',
      joinDate: '2025-11-20',
      totalLeads: 71,
      activeProjects: 1,
      revenue: '$62,300',
      websiteViews: 2134,
      serviceTypes: ['Kitchen']
    },
    {
      id: '5',
      contractorName: 'Luxury Kitchens FL',
      websiteUrl: '/c/luxury-kitchens',
      status: 'pending',
      joinDate: '2026-01-15',
      totalLeads: 12,
      activeProjects: 1,
      revenue: '$48,920',
      websiteViews: 892,
      serviceTypes: ['Kitchen']
    },
    {
      id: '6',
      contractorName: 'Modern Bath Co',
      websiteUrl: '/c/modern-bath',
      status: 'suspended',
      joinDate: '2026-02-01',
      totalLeads: 24,
      activeProjects: 0,
      revenue: '$18,200',
      websiteViews: 431,
      serviceTypes: ['Bathroom']
    }
  ];

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.contractorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contractor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-zinc-500/20 text-zinc-400 border-zinc-500';
    }
  };

  const stats = {
    total: contractors.length,
    active: contractors.filter(c => c.status === 'active').length,
    pending: contractors.filter(c => c.status === 'pending').length,
    suspended: contractors.filter(c => c.status === 'suspended').length
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light font-serif mb-2">Contractor Accounts</h1>
          <p className="text-zinc-500">Manage all contractor websites and accounts</p>
        </div>
        <Button variant="accent">
          <Plus size={18} className="mr-2" />
          Add New Contractor
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <div className="text-sm text-zinc-500 mb-2">Total Accounts</div>
          <div className="text-3xl font-light">{stats.total}</div>
        </div>
        <div className="bg-zinc-900 border border-green-500/30 p-6">
          <div className="text-sm text-zinc-500 mb-2">Active</div>
          <div className="text-3xl font-light text-green-500">{stats.active}</div>
        </div>
        <div className="bg-zinc-900 border border-yellow-500/30 p-6">
          <div className="text-sm text-zinc-500 mb-2">Pending Setup</div>
          <div className="text-3xl font-light text-yellow-500">{stats.pending}</div>
        </div>
        <div className="bg-zinc-900 border border-red-500/30 p-6">
          <div className="text-sm text-zinc-500 mb-2">Suspended</div>
          <div className="text-3xl font-light text-red-500">{stats.suspended}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search contractors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-esh-gold"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-esh-gold"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Contractor Grid */}
      <div className="space-y-4">
        {filteredContractors.map((contractor) => (
          <div key={contractor.id} className="bg-zinc-900 border border-zinc-800 p-6 hover:border-esh-gold transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                {/* Logo Placeholder */}
                <div className="w-16 h-16 bg-esh-gold/20 border border-esh-gold rounded flex items-center justify-center flex-shrink-0">
                  <Globe size={24} className="text-esh-gold" />
                </div>

                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-medium">{contractor.contractorName}</h3>
                    <span className={`px-3 py-1 text-xs rounded border ${getStatusColor(contractor.status)}`}>
                      {contractor.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-zinc-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Globe size={14} />
                      {contractor.customDomain || contractor.websiteUrl}
                    </span>
                    <span>Joined {contractor.joinDate}</span>
                    <span>{contractor.serviceTypes.join(', ')}</span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-5 gap-4">
                    <div className="p-3 bg-black border border-zinc-800 text-center">
                      <div className="text-lg font-medium">{contractor.totalLeads}</div>
                      <div className="text-xs text-zinc-500">Total Leads</div>
                    </div>
                    <div className="p-3 bg-black border border-zinc-800 text-center">
                      <div className="text-lg font-medium">{contractor.activeProjects}</div>
                      <div className="text-xs text-zinc-500">Active Projects</div>
                    </div>
                    <div className="p-3 bg-black border border-zinc-800 text-center">
                      <div className="text-lg font-medium text-esh-gold">{contractor.revenue}</div>
                      <div className="text-xs text-zinc-500">Revenue</div>
                    </div>
                    <div className="p-3 bg-black border border-zinc-800 text-center">
                      <div className="text-lg font-medium">{contractor.websiteViews.toLocaleString()}</div>
                      <div className="text-xs text-zinc-500">Site Views</div>
                    </div>
                    <div className="p-3 bg-black border border-zinc-800 text-center">
                      <div className="text-lg font-medium text-green-500">15%</div>
                      <div className="text-xs text-zinc-500">Commission</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => window.open(contractor.websiteUrl, '_blank')}
                  className="p-2 bg-black border border-zinc-800 hover:bg-zinc-800 text-white rounded"
                  title="View Website"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => window.open(contractor.websiteUrl, '_blank')}
                  className="p-2 bg-black border border-zinc-800 hover:bg-zinc-800 text-white rounded"
                  title="Open in New Tab"
                >
                  <ExternalLink size={18} />
                </button>
                <button
                  className="p-2 bg-black border border-zinc-800 hover:bg-zinc-800 text-white rounded"
                  title="Edit Account"
                >
                  <Edit size={18} />
                </button>
                <button
                  className="p-2 bg-black border border-zinc-800 hover:bg-zinc-800 text-white rounded"
                  title="Settings"
                >
                  <Settings size={18} />
                </button>
                <button
                  className="p-2 bg-black border border-red-500/50 hover:bg-red-500/10 text-red-500 rounded"
                  title="Suspend Account"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContractors.length === 0 && (
        <div className="text-center py-12 bg-zinc-900 border border-zinc-800">
          <p className="text-zinc-500">No contractors found matching your search.</p>
        </div>
      )}
    </div>
  );
}
