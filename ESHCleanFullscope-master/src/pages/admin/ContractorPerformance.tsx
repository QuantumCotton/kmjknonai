import { useState } from 'react';
import { Star, TrendingUp, Award, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ContractorPerformance() {
  const [sortBy, setSortBy] = useState('revenue');

  // Contractor performance data
  const contractors = [
    {
      id: 1,
      name: 'KMJK Construction',
      status: 'elite',
      rating: 5.0,
      reviews: 127,
      projectsCompleted: 42,
      projectsActive: 3,
      revenue: '$185,250',
      avgProjectValue: '$62,400',
      conversionRate: 28.4,
      responseTime: 1.8,
      completionRate: 98,
      growth: '+28%',
      specialties: ['Kitchen', 'Bathroom'],
      joinDate: '2025-10-15',
      tier: 'Platinum'
    },
    {
      id: 2,
      name: 'Elite Bathrooms Pro',
      status: 'elite',
      rating: 4.9,
      reviews: 84,
      projectsCompleted: 28,
      projectsActive: 2,
      revenue: '$98,400',
      avgProjectValue: '$38,900',
      conversionRate: 31.2,
      responseTime: 2.1,
      completionRate: 96,
      growth: '+45%',
      specialties: ['Bathroom'],
      joinDate: '2025-11-02',
      tier: 'Gold'
    },
    {
      id: 3,
      name: 'Coastal Remodeling',
      status: 'active',
      rating: 4.8,
      reviews: 62,
      projectsCompleted: 19,
      projectsActive: 2,
      revenue: '$76,850',
      avgProjectValue: '$58,200',
      conversionRate: 24.1,
      responseTime: 3.2,
      completionRate: 94,
      growth: '+12%',
      specialties: ['Kitchen', 'Bathroom'],
      joinDate: '2025-12-10',
      tier: 'Gold'
    },
    {
      id: 4,
      name: 'Premium Home Solutions',
      status: 'active',
      rating: 4.9,
      reviews: 71,
      projectsCompleted: 22,
      projectsActive: 1,
      revenue: '$62,300',
      avgProjectValue: '$48,900',
      conversionRate: 26.8,
      responseTime: 2.4,
      completionRate: 95,
      growth: '+35%',
      specialties: ['Kitchen'],
      joinDate: '2025-11-20',
      tier: 'Silver'
    },
    {
      id: 5,
      name: 'Luxury Kitchens FL',
      status: 'active',
      rating: 4.7,
      reviews: 38,
      projectsCompleted: 11,
      projectsActive: 1,
      revenue: '$48,920',
      avgProjectValue: '$72,100',
      conversionRate: 22.3,
      responseTime: 3.8,
      completionRate: 91,
      growth: '+18%',
      specialties: ['Kitchen'],
      joinDate: '2026-01-15',
      tier: 'Silver'
    },
    {
      id: 6,
      name: 'Modern Bath Co',
      status: 'warning',
      rating: 4.5,
      reviews: 24,
      projectsCompleted: 5,
      projectsActive: 0,
      revenue: '$18,200',
      avgProjectValue: '$35,800',
      conversionRate: 18.2,
      responseTime: 5.2,
      completionRate: 88,
      growth: '-8%',
      specialties: ['Bathroom'],
      joinDate: '2026-02-01',
      tier: 'Bronze'
    }
  ];

  // Performance tiers
  const tiers = [
    { name: 'Platinum', contractors: 1, minRevenue: '$150K+', color: 'text-purple-400' },
    { name: 'Gold', contractors: 2, minRevenue: '$75K+', color: 'text-esh-gold' },
    { name: 'Silver', contractors: 2, minRevenue: '$40K+', color: 'text-zinc-400' },
    { name: 'Bronze', contractors: 1, minRevenue: '$0+', color: 'text-orange-600' }
  ];

  // Performance benchmarks
  const benchmarks = [
    { metric: 'Avg Response Time', value: '2.8 hrs', target: '< 3 hrs', status: 'good' },
    { metric: 'Avg Completion Rate', value: '93.7%', target: '> 90%', status: 'good' },
    { metric: 'Avg Rating', value: '4.8/5.0', target: '> 4.5', status: 'good' },
    { metric: 'Avg Conversion', value: '25.2%', target: '> 20%', status: 'good' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'elite': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default: return 'bg-zinc-500/20 text-zinc-400 border-zinc-500';
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-500/20 text-purple-400';
      case 'Gold': return 'bg-esh-gold/20 text-esh-gold';
      case 'Silver': return 'bg-zinc-400/20 text-zinc-400';
      case 'Bronze': return 'bg-orange-600/20 text-orange-400';
      default: return 'bg-zinc-500/20 text-zinc-400';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light font-serif mb-2">Contractor Performance</h1>
          <p className="text-zinc-500">Rankings, metrics, and performance tracking</p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-esh-gold"
        >
          <option value="revenue">Sort by Revenue</option>
          <option value="rating">Sort by Rating</option>
          <option value="projects">Sort by Projects</option>
          <option value="growth">Sort by Growth</option>
        </select>
      </div>

      {/* Performance Tiers */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {tiers.map((tier) => (
          <div key={tier.name} className="bg-zinc-900 border border-zinc-800 p-6 text-center">
            <Award size={24} className={`mx-auto mb-3 ${tier.color}`} />
            <div className="text-xl font-light mb-1">{tier.name}</div>
            <div className="text-2xl font-light mb-2">{tier.contractors}</div>
            <div className="text-xs text-zinc-500">{tier.minRevenue}</div>
          </div>
        ))}
      </div>

      {/* Benchmarks */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {benchmarks.map((benchmark) => (
          <div key={benchmark.metric} className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-500">{benchmark.metric}</span>
              <CheckCircle size={16} className="text-green-500" />
            </div>
            <div className="text-2xl font-light mb-1">{benchmark.value}</div>
            <div className="text-xs text-zinc-600">Target: {benchmark.target}</div>
          </div>
        ))}
      </div>

      {/* Contractor Rankings */}
      <div className="space-y-4">
        {contractors.map((contractor, idx) => (
          <div key={contractor.id} className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex items-start gap-6">
              {/* Rank */}
              <div className="text-center">
                <div className="text-4xl font-light text-esh-gold mb-1">#{idx + 1}</div>
                <span className={`px-2 py-1 text-xs rounded ${getTierBadge(contractor.tier)}`}>
                  {contractor.tier}
                </span>
              </div>

              {/* Main Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-medium">{contractor.name}</h3>
                      <span className={`px-3 py-1 text-xs rounded border ${getStatusColor(contractor.status)}`}>
                        {contractor.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Star size={14} className="text-esh-gold fill-esh-gold" />
                        {contractor.rating} ({contractor.reviews} reviews)
                      </span>
                      <span>Member since {contractor.joinDate}</span>
                      <span className="text-green-500">{contractor.growth}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-light text-esh-gold mb-1">{contractor.revenue}</div>
                    <div className="text-sm text-zinc-500">{contractor.projectsCompleted} projects</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-6 gap-4 mb-4">
                  <div className="p-3 bg-black border border-zinc-800 text-center">
                    <div className="text-lg font-medium">{contractor.avgProjectValue}</div>
                    <div className="text-xs text-zinc-500">Avg Value</div>
                  </div>
                  <div className="p-3 bg-black border border-zinc-800 text-center">
                    <div className={`text-lg font-medium ${contractor.conversionRate >= 25 ? 'text-green-500' : 'text-yellow-500'}`}>
                      {contractor.conversionRate}%
                    </div>
                    <div className="text-xs text-zinc-500">Conv Rate</div>
                  </div>
                  <div className="p-3 bg-black border border-zinc-800 text-center">
                    <div className={`text-lg font-medium ${contractor.responseTime <= 3 ? 'text-green-500' : 'text-yellow-500'}`}>
                      {contractor.responseTime}h
                    </div>
                    <div className="text-xs text-zinc-500">Response</div>
                  </div>
                  <div className="p-3 bg-black border border-zinc-800 text-center">
                    <div className={`text-lg font-medium ${contractor.completionRate >= 95 ? 'text-green-500' : 'text-yellow-500'}`}>
                      {contractor.completionRate}%
                    </div>
                    <div className="text-xs text-zinc-500">Completion</div>
                  </div>
                  <div className="p-3 bg-black border border-zinc-800 text-center">
                    <div className="text-lg font-medium">{contractor.projectsActive}</div>
                    <div className="text-xs text-zinc-500">Active</div>
                  </div>
                  <div className="p-3 bg-black border border-zinc-800 text-center">
                    <div className="text-lg font-medium">{contractor.projectsCompleted}</div>
                    <div className="text-xs text-zinc-500">Complete</div>
                  </div>
                </div>

                {/* Specialties & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {contractor.specialties.map((specialty) => (
                      <span key={specialty} className="px-3 py-1 bg-black border border-zinc-800 text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm bg-black border border-zinc-800 hover:bg-zinc-800">
                      View Profile
                    </button>
                    <button className="px-4 py-2 text-sm bg-black border border-zinc-800 hover:bg-zinc-800">
                      Message
                    </button>
                  </div>
                </div>

                {/* Warning for low performers */}
                {contractor.status === 'warning' && (
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500 flex items-center gap-3">
                    <AlertTriangle size={18} className="text-yellow-500" />
                    <span className="text-sm text-yellow-400">
                      Performance below standards. Consider review meeting.
                    </span>
                  </div>
                )}

                {/* Elite badge for top performers */}
                {contractor.status === 'elite' && (
                  <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500 flex items-center gap-3">
                    <TrendingUp size={18} className="text-purple-400" />
                    <span className="text-sm text-purple-400">
                      Elite performance! Consistently exceeds all benchmarks.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
