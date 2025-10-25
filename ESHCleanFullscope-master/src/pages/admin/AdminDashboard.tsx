import { TrendingUp, Users, FileText, DollarSign, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Active Leads', value: '47', change: '+12%', trend: 'up' as const, icon: TrendingUp },
    { label: 'Active Contractors', value: '12', change: '+2', trend: 'up' as const, icon: Users },
    { label: 'Open Work Orders', value: '23', change: '-3', trend: 'down' as const, icon: FileText },
    { label: 'Monthly Revenue', value: '$45.2K', change: '+23%', trend: 'up' as const, icon: DollarSign },
  ];

  const recentLeads = [
    { id: 1, name: 'Sarah Johnson', project: 'Kitchen Remodel', budget: '$65K', score: 95, status: 'hot' },
    { id: 2, name: 'Michael Chen', project: 'Bathroom Renovation', budget: '$42K', score: 88, status: 'warm' },
    { id: 3, name: 'Emily Rodriguez', project: 'Kitchen & Bath', budget: '$110K', score: 97, status: 'hot' },
    { id: 4, name: 'David Thompson', project: 'Master Bath', budget: '$35K', score: 72, status: 'warm' },
  ];

  const urgentActions = [
    { id: 1, type: 'lead', message: 'High-value lead ($110K) waiting for contractor match', priority: 'high' },
    { id: 2, type: 'contractor', message: 'KMJK Construction needs photo approval', priority: 'medium' },
    { id: 3, type: 'payment', message: 'Commission payment due for 3 completed projects', priority: 'high' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light font-serif mb-2">Welcome back, Chris</h1>
        <p className="text-zinc-500">Here's what's happening with Elite Service Hub today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-500">{stat.label}</span>
                <Icon size={20} className="text-esh-gold" />
              </div>
              <div className="text-3xl font-light mb-2">{stat.value}</div>
              <div className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} from last month
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl font-light font-serif mb-6">Recent High-Quality Leads</h2>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 bg-black border border-zinc-800">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium">{lead.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      lead.status === 'hot' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {lead.status === 'hot' ? '🔥 HOT' : '⚡ WARM'}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500">{lead.project}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-esh-gold">{lead.budget}</div>
                  <div className="text-sm text-zinc-500">Score: {lead.score}/100</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 border border-zinc-800 hover:bg-zinc-800 transition-colors">
            View All Leads
          </button>
        </div>

        {/* Urgent Actions */}
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl font-light font-serif mb-6">Urgent Actions</h2>
          <div className="space-y-4">
            {urgentActions.map((action) => (
              <div key={action.id} className="p-4 bg-black border-l-4 border-l-red-500">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className={action.priority === 'high' ? 'text-red-500' : 'text-yellow-500'} />
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300">{action.message}</p>
                    <p className="text-xs text-zinc-600 mt-1">Priority: {action.priority}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-6 bg-esh-gold text-black hover:bg-esh-gold-dark transition-colors">
          <div className="text-2xl mb-2">📝</div>
          <div className="font-medium">Create Work Order</div>
        </button>
        <button className="p-6 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
          <div className="text-2xl mb-2">👤</div>
          <div className="font-medium">Add Contractor</div>
        </button>
        <button className="p-6 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
          <div className="text-2xl mb-2">📊</div>
          <div className="font-medium">View Reports</div>
        </button>
        <button className="p-6 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
          <div className="text-2xl mb-2">⚙️</div>
          <div className="font-medium">System Settings</div>
        </button>
      </div>
    </div>
  );
}
