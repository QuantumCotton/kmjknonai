import { useState } from 'react';
import { Bell, Star, TrendingUp, DollarSign, Calendar, MessageSquare } from 'lucide-react';
import Button from '../../components/shared/Button';

export default function ContractorDashboard() {
  const [contractor] = useState({
    name: 'KMJK Construction',
    rating: 5.0,
    projectsCompleted: 127,
    totalEarned: '$458,250',
    activeLeads: 8,
    pendingPayouts: '$12,750'
  });

  const recentLeads = [
    {
      id: 'lead_1',
      name: 'Sarah Johnson',
      projectType: 'Kitchen Remodel',
      budget: '$65,000',
      zip: '34945',
      timeline: 'ASAP',
      score: 95,
      receivedAt: '2 hours ago',
      status: 'new'
    },
    {
      id: 'lead_2',
      name: 'Michael Rodriguez',
      projectType: 'Master Bathroom',
      budget: '$42,000',
      zip: '34950',
      timeline: '1-3 months',
      score: 88,
      receivedAt: '5 hours ago',
      status: 'viewed'
    },
    {
      id: 'lead_3',
      name: 'Emily Chen',
      projectType: 'Kitchen & Bath',
      budget: '$110,000',
      zip: '34946',
      timeline: 'ASAP',
      score: 97,
      receivedAt: '1 day ago',
      status: 'contacted'
    }
  ];

  const activeProjects = [
    {
      id: 'proj_1',
      clientName: 'David Thompson',
      projectType: 'Kitchen Remodel',
      progress: 65,
      startDate: '2026-02-15',
      dueDate: '2026-03-28',
      value: '$75,000',
      commission: '$11,250'
    },
    {
      id: 'proj_2',
      clientName: 'Lisa Anderson',
      projectType: 'Master Bath',
      progress: 30,
      startDate: '2026-03-01',
      dueDate: '2026-04-05',
      value: '$48,000',
      commission: '$7,200'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500';
      case 'viewed': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      default: return 'bg-zinc-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/images/logos/esh-dark-bg.png" 
              alt="Elite Service Hub" 
              className="h-12 w-auto"
            />
            <div className="h-8 w-px bg-zinc-800" />
            <h1 className="text-xl font-light">{contractor.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-zinc-900 rounded">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 bg-esh-gold rounded-full flex items-center justify-center text-black font-semibold">
              KM
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-light font-serif mb-2">Welcome back! 👋</h2>
          <p className="text-zinc-500">Here's what's happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-500">New Leads</span>
              <MessageSquare size={20} className="text-esh-gold" />
            </div>
            <div className="text-3xl font-light mb-1">{contractor.activeLeads}</div>
            <div className="text-xs text-green-500">+3 this week</div>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-500">Rating</span>
              <Star size={20} className="text-esh-gold" />
            </div>
            <div className="text-3xl font-light mb-1">{contractor.rating}</div>
            <div className="text-xs text-zinc-500">{contractor.projectsCompleted} reviews</div>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-500">Total Earned</span>
              <TrendingUp size={20} className="text-esh-gold" />
            </div>
            <div className="text-3xl font-light mb-1">{contractor.totalEarned}</div>
            <div className="text-xs text-green-500">+$45K this month</div>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-500">Pending</span>
              <DollarSign size={20} className="text-esh-gold" />
            </div>
            <div className="text-3xl font-light mb-1">{contractor.pendingPayouts}</div>
            <div className="text-xs text-zinc-500">Available soon</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* New Leads */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-light font-serif">New Leads</h3>
              <Button variant="secondary" className="text-sm px-4 py-2">View All</Button>
            </div>
            
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="bg-black border border-zinc-800 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium">{lead.name}</h4>
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(lead.status)}`} />
                      </div>
                      <p className="text-sm text-zinc-500">{lead.projectType}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-esh-gold">{lead.budget}</div>
                      <div className="text-xs text-zinc-600">Score: {lead.score}/100</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                    <span>📍 {lead.zip}</span>
                    <span>⏱️ {lead.timeline}</span>
                    <span>🕐 {lead.receivedAt}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="accent" className="flex-1 text-sm py-2">
                      Contact Lead
                    </Button>
                    <button className="px-4 py-2 text-sm border border-zinc-700 hover:bg-zinc-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <h3 className="text-xl font-light font-serif mb-6">Active Projects</h3>
            
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="bg-black border border-zinc-800 p-4">
                  <h4 className="font-medium mb-1">{project.clientName}</h4>
                  <p className="text-sm text-zinc-500 mb-3">{project.projectType}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-600">Progress</span>
                      <span className="text-esh-gold">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2">
                      <div
                        className="bg-esh-gold h-2 transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-zinc-600 mb-3">
                    <span>Due: {project.dueDate}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-zinc-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Commission</span>
                      <span className="text-esh-gold font-medium">{project.commission}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-3 border border-zinc-800 hover:bg-zinc-800 transition-colors text-sm">
              View All Projects
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-6 bg-esh-gold text-black hover:bg-esh-gold-dark transition-colors">
            <MessageSquare className="mb-2" size={24} />
            <div className="font-medium">Message Center</div>
          </button>
          <button className="p-6 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
            <Calendar className="mb-2" size={24} />
            <div className="font-medium">Schedule</div>
          </button>
          <button className="p-6 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
            <Star className="mb-2" size={24} />
            <div className="font-medium">Reviews</div>
          </button>
          <button className="p-6 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
            <DollarSign className="mb-2" size={24} />
            <div className="font-medium">Payouts</div>
          </button>
        </div>
      </div>
    </div>
  );
}
