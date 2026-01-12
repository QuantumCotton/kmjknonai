import { TrendingUp, DollarSign, Users, Briefcase, Target, ArrowUp, ArrowDown } from 'lucide-react';

export default function ExecutiveDashboard() {
  // Executive KPIs
  const kpis = [
    {
      label: 'Total Revenue',
      value: '$458,250',
      change: '+34%',
      trend: 'up' as const,
      icon: DollarSign,
      period: 'vs last quarter'
    },
    {
      label: 'Active Contractors',
      value: '12',
      change: '+3',
      trend: 'up' as const,
      icon: Users,
      period: 'this quarter'
    },
    {
      label: 'Completed Projects',
      value: '127',
      change: '+18%',
      trend: 'up' as const,
      icon: Briefcase,
      period: 'vs last quarter'
    },
    {
      label: 'Conversion Rate',
      value: '23.4%',
      change: '+2.1%',
      trend: 'up' as const,
      icon: Target,
      period: 'vs last month'
    },
    {
      label: 'Avg Project Value',
      value: '$58,750',
      change: '+$4.2K',
      trend: 'up' as const,
      icon: TrendingUp,
      period: 'vs last quarter'
    },
    {
      label: 'Lead Quality Score',
      value: '84/100',
      change: '+7',
      trend: 'up' as const,
      icon: Target,
      period: 'vs last month'
    }
  ];

  // Monthly revenue data
  const revenueData = [
    { month: 'Oct', revenue: 38200, projects: 8 },
    { month: 'Nov', revenue: 45800, projects: 10 },
    { month: 'Dec', revenue: 52100, projects: 11 },
    { month: 'Jan', revenue: 61500, projects: 13 },
    { month: 'Feb', revenue: 68900, projects: 15 },
    { month: 'Mar', revenue: 78450, projects: 18 }
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  // Market breakdown
  const marketData = [
    { market: 'Treasure Coast', revenue: '$312,450', share: 68, contractors: 8, projects: 78 },
    { market: 'Space Coast (Planned)', revenue: '$0', share: 0, contractors: 0, projects: 0 },
    { market: 'Tampa Bay (Planned)', revenue: '$0', share: 0, contractors: 0, projects: 0 }
  ];

  // Top contractors
  const topContractors = [
    { name: 'KMJK Construction', revenue: '$185,250', projects: 42, rating: 5.0, growth: '+28%' },
    { name: 'Elite Bathrooms Pro', revenue: '$98,400', projects: 28, rating: 4.9, growth: '+45%' },
    { name: 'Coastal Remodeling', revenue: '$76,850', projects: 19, rating: 4.8, growth: '+12%' },
    { name: 'Premium Home Solutions', revenue: '$62,300', projects: 22, rating: 4.9, growth: '+35%' }
  ];

  // Conversion funnel
  const funnelData = [
    { stage: 'Website Visitors', count: 12450, percentage: 100 },
    { stage: 'Chat Engaged', count: 3890, percentage: 31.2 },
    { stage: 'Leads Generated', count: 1247, percentage: 10.0 },
    { stage: 'Qualified Leads', count: 892, percentage: 7.2 },
    { stage: 'Contractor Matched', count: 654, percentage: 5.3 },
    { stage: 'Projects Started', count: 324, percentage: 2.6 },
    { stage: 'Projects Completed', count: 292, percentage: 2.3 }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light font-serif mb-2">Executive Dashboard</h1>
        <p className="text-zinc-500">High-level business metrics and performance indicators</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-zinc-900 border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-500">{kpi.label}</span>
                <Icon size={20} className="text-esh-gold" />
              </div>
              <div className="text-3xl font-light mb-2">{kpi.value}</div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.trend === 'up' ? <ArrowUp size={14} className="inline" /> : <ArrowDown size={14} className="inline" />}
                  {kpi.change}
                </span>
                <span className="text-xs text-zinc-600">{kpi.period}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-light font-serif mb-1">Revenue Trend</h2>
              <p className="text-sm text-zinc-500">Last 6 months performance</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-light text-esh-gold">$345K</div>
              <div className="text-xs text-zinc-500">Total 6mo</div>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="space-y-3">
            {revenueData.map((data) => (
              <div key={data.month}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">{data.month}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500">{data.projects} projects</span>
                    <span className="text-white font-medium">${(data.revenue / 1000).toFixed(1)}K</span>
                  </div>
                </div>
                <div className="w-full bg-zinc-800 h-8 relative">
                  <div
                    className="bg-esh-gold h-8 transition-all flex items-center justify-end pr-3"
                    style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                  >
                    <span className="text-xs text-black font-medium">
                      ${(data.revenue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl font-light font-serif mb-6">Market Breakdown</h2>
          <div className="space-y-4">
            {marketData.map((market) => (
              <div key={market.market} className="pb-4 border-b border-zinc-800 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm">{market.market}</h3>
                  <span className="text-esh-gold font-medium">{market.revenue}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-zinc-500 mb-2">
                  <div>{market.contractors} contractors</div>
                  <div>{market.projects} projects</div>
                  <div>{market.share}% share</div>
                </div>
                {market.share > 0 && (
                  <div className="w-full bg-zinc-800 h-2">
                    <div 
                      className="bg-esh-gold h-2"
                      style={{ width: `${market.share}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Top Contractors */}
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl font-light font-serif mb-6">Top Performing Contractors</h2>
          <div className="space-y-4">
            {topContractors.map((contractor, idx) => (
              <div key={contractor.name} className="flex items-center gap-4 p-4 bg-black border border-zinc-800">
                <div className="text-2xl font-light text-esh-gold w-8">#{idx + 1}</div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{contractor.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span>{contractor.projects} projects</span>
                    <span>⭐ {contractor.rating}</span>
                    <span className="text-green-500">{contractor.growth}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-esh-gold">{contractor.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl font-light font-serif mb-6">Conversion Funnel</h2>
          <div className="space-y-3">
            {funnelData.map((stage, idx) => (
              <div key={stage.stage}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500">{stage.percentage.toFixed(1)}%</span>
                    <span className="text-white font-medium">{stage.count.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-zinc-800 h-6 relative">
                  <div
                    className={`h-6 transition-all flex items-center justify-end pr-3 ${
                      idx === 0 ? 'bg-blue-500' :
                      idx === 1 ? 'bg-blue-600' :
                      idx === 2 ? 'bg-purple-500' :
                      idx === 3 ? 'bg-purple-600' :
                      idx === 4 ? 'bg-esh-gold' :
                      idx === 5 ? 'bg-green-500' :
                      'bg-green-600'
                    }`}
                    style={{ width: `${stage.percentage}%` }}
                  >
                    {stage.percentage > 10 && (
                      <span className="text-xs text-white font-medium">
                        {stage.count.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-black border border-zinc-800">
            <div className="text-center">
              <div className="text-3xl font-light text-esh-gold mb-1">2.3%</div>
              <div className="text-sm text-zinc-500">Overall Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 text-center">
          <div className="text-3xl font-light mb-2">$12.8K</div>
          <div className="text-sm text-zinc-500">Avg Commission</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 text-center">
          <div className="text-3xl font-light mb-2">18 days</div>
          <div className="text-sm text-zinc-500">Avg Close Time</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 text-center">
          <div className="text-3xl font-light mb-2">4.9/5.0</div>
          <div className="text-sm text-zinc-500">Avg Rating</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 text-center">
          <div className="text-3xl font-light mb-2">92%</div>
          <div className="text-sm text-zinc-500">Satisfaction Rate</div>
        </div>
      </div>
    </div>
  );
}
