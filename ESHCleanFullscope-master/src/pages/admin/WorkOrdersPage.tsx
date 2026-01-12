import { useState } from 'react';
import { Plus, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../../components/shared/Button';

export default function WorkOrdersPage() {
  const [, setShowCreateModal] = useState(false);

  const workOrders = [
    {
      id: 'WO-001',
      contractorName: 'KMJK Construction',
      leadName: 'Sarah Johnson',
      projectType: 'Kitchen Remodel',
      budget: '$65,000',
      status: 'in-progress',
      startDate: '2026-03-10',
      dueDate: '2026-04-21',
      progress: 45,
      milestones: [
        { name: 'Demo', completed: true },
        { name: 'Plumbing', completed: true },
        { name: 'Electrical', completed: false },
        { name: 'Cabinets', completed: false },
      ]
    },
    {
      id: 'WO-002',
      contractorName: 'Elite Bathrooms',
      leadName: 'Michael Chen',
      projectType: 'Master Bath',
      budget: '$42,000',
      status: 'pending',
      startDate: '2026-03-20',
      dueDate: '2026-04-17',
      progress: 0,
      milestones: []
    },
    {
      id: 'WO-003',
      contractorName: 'KMJK Construction',
      leadName: 'David Thompson',
      projectType: 'Kitchen Remodel',
      budget: '$85,000',
      status: 'completed',
      startDate: '2026-02-01',
      dueDate: '2026-03-12',
      progress: 100,
      commission: '$12,750'
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-yellow-500/20 text-yellow-400', icon: Clock };
      case 'in-progress':
        return { color: 'bg-blue-500/20 text-blue-400', icon: FileText };
      case 'completed':
        return { color: 'bg-green-500/20 text-green-400', icon: CheckCircle };
      case 'on-hold':
        return { color: 'bg-red-500/20 text-red-400', icon: AlertCircle };
      default:
        return { color: 'bg-zinc-500/20 text-zinc-400', icon: FileText };
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light font-serif mb-2">Work Orders</h1>
          <p className="text-zinc-500">Manage contractor projects and track progress</p>
        </div>
        <Button variant="accent" onClick={() => setShowCreateModal(true)}>
          <Plus size={18} className="mr-2" />
          Create Work Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <div className="text-sm text-zinc-500 mb-2">Total Active</div>
          <div className="text-3xl font-light">
            {workOrders.filter(w => w.status !== 'completed').length}
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <div className="text-sm text-zinc-500 mb-2">In Progress</div>
          <div className="text-3xl font-light text-blue-500">
            {workOrders.filter(w => w.status === 'in-progress').length}
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <div className="text-sm text-zinc-500 mb-2">Completed</div>
          <div className="text-3xl font-light text-green-500">
            {workOrders.filter(w => w.status === 'completed').length}
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <div className="text-sm text-zinc-500 mb-2">Total Value</div>
          <div className="text-3xl font-light text-esh-gold">$192K</div>
        </div>
      </div>

      {/* Work Orders Grid */}
      <div className="space-y-6">
        {workOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div key={order.id} className="bg-zinc-900 border border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-light font-serif">{order.id}</h3>
                    <span className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${statusConfig.color}`}>
                      <StatusIcon size={12} />
                      {order.status}
                    </span>
                  </div>
                  <p className="text-zinc-500">
                    {order.contractorName} · {order.leadName}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-esh-gold mb-1">{order.budget}</div>
                  {order.commission && (
                    <div className="text-sm text-green-500">Commission: {order.commission}</div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-4">
                <div>
                  <div className="text-xs text-zinc-600 mb-1">Project Type</div>
                  <div className="text-sm">{order.projectType}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-600 mb-1">Start Date</div>
                  <div className="text-sm">{order.startDate}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-600 mb-1">Due Date</div>
                  <div className="text-sm">{order.dueDate}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-500">Progress</span>
                  <span className="text-esh-gold">{order.progress}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2">
                  <div
                    className="bg-esh-gold h-2 transition-all"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>

              {/* Milestones */}
              {order.milestones && order.milestones.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {order.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          milestone.completed
                            ? 'bg-esh-gold border-esh-gold'
                            : 'border-zinc-700'
                        }`}
                      >
                        {milestone.completed && <CheckCircle size={12} className="text-black" />}
                      </div>
                      <span className={`text-xs ${milestone.completed ? 'text-white' : 'text-zinc-600'}`}>
                        {milestone.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button className="px-4 py-2 text-sm bg-black border border-zinc-800 hover:bg-zinc-800">
                  View Details
                </button>
                <button className="px-4 py-2 text-sm bg-black border border-zinc-800 hover:bg-zinc-800">
                  Update Progress
                </button>
                <button className="px-4 py-2 text-sm bg-black border border-zinc-800 hover:bg-zinc-800">
                  Contact Contractor
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
