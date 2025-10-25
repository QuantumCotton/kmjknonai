import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  MessageSquare,
  Menu,
  X,
  LogOut,
  BarChart3,
  DollarSign,
  MapPin,
  Crown,
  TrendingUp
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Executive', href: '/admin/executive', icon: Crown },
    { name: 'Accounts', href: '/admin/contractor-accounts', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Financial', href: '/admin/financial', icon: DollarSign },
    { name: 'Leads', href: '/admin/leads', icon: MessageSquare },
    { name: 'Work Orders', href: '/admin/work-orders', icon: FileText },
    { name: 'Performance', href: '/admin/contractor-performance', icon: TrendingUp },
    { name: 'Markets', href: '/admin/market-performance', icon: MapPin },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-black border-r border-zinc-900 transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
          {isSidebarOpen && (
            <div>
              <h1 className="text-xl font-light font-serif">Cotton Dashboard</h1>
              <p className="text-xs text-zinc-600">Elite Service Hub Admin</p>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-zinc-900 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded transition-all
                  ${active 
                    ? 'bg-esh-gold text-black' 
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }
                `}
              >
                <Icon size={20} />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-zinc-900">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-esh-gold rounded-full flex items-center justify-center text-black font-semibold">
              CC
            </div>
            {isSidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium">Chris Cotton</p>
                <p className="text-xs text-zinc-600">Admin</p>
              </div>
            )}
          </div>
          {isSidebarOpen && (
            <button className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white transition-colors w-full">
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
