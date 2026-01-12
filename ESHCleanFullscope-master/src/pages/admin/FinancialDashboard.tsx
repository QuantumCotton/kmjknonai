import { DollarSign, TrendingUp, CreditCard, AlertCircle } from 'lucide-react';

export default function FinancialDashboard() {
  // Financial overview
  const financialMetrics = [
    { label: 'Total Revenue (YTD)', value: '$1.24M', change: '+45%', icon: DollarSign },
    { label: 'Gross Profit', value: '$186K', change: '+52%', icon: TrendingUp },
    { label: 'Pending Payouts', value: '$42.8K', change: '8 contractors', icon: CreditCard },
    { label: 'Outstanding Invoices', value: '$12.4K', change: '3 pending', icon: AlertCircle }
  ];

  // Monthly financial data
  const monthlyFinancials = [
    { month: 'Jan', revenue: 98400, commission: 14760, expenses: 8200, profit: 6560 },
    { month: 'Feb', revenue: 124500, commission: 18675, expenses: 9500, profit: 9175 },
    { month: 'Mar', revenue: 156800, commission: 23520, expenses: 11200, profit: 12320 },
    { month: 'Apr', revenue: 187200, commission: 28080, expenses: 12800, profit: 15280 },
    { month: 'May', revenue: 218900, commission: 32835, expenses: 14500, profit: 18335 },
    { month: 'Jun', revenue: 245600, commission: 36840, expenses: 15900, profit: 20940 }
  ];

  // Revenue forecast
  const forecast = [
    { month: 'Jul', projected: 268000, confidence: 'high' },
    { month: 'Aug', projected: 292000, confidence: 'high' },
    { month: 'Sep', projected: 315000, confidence: 'medium' },
    { month: 'Q4', projected: 1050000, confidence: 'medium' }
  ];

  // Contractor payouts
  const payouts = [
    { contractor: 'KMJK Construction', amount: '$12,450', projects: 3, dueDate: 'Jun 30' },
    { contractor: 'Elite Bathrooms Pro', amount: '$8,920', projects: 2, dueDate: 'Jun 30' },
    { contractor: 'Coastal Remodeling', amount: '$7,380', projects: 2, dueDate: 'Jul 5' },
    { contractor: 'Premium Home Solutions', amount: '$6,240', projects: 2, dueDate: 'Jul 5' },
    { contractor: 'Luxury Kitchens FL', amount: '$4,890', projects: 1, dueDate: 'Jul 10' },
    { contractor: 'Modern Bath Co', amount: '$2,920', projects: 1, dueDate: 'Jul 10' }
  ];

  // Expense breakdown
  const expenses = [
    { category: 'Marketing', amount: 28400, percentage: 42 },
    { category: 'Software & Tools', amount: 12800, percentage: 19 },
    { category: 'Admin & Operations', amount: 15600, percentage: 23 },
    { category: 'Legal & Compliance', amount: 6200, percentage: 9 },
    { category: 'Other', amount: 4700, percentage: 7 }
  ];

  const maxRevenue = Math.max(...monthlyFinancials.map(m => m.revenue));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light font-serif mb-2">Financial Dashboard</h1>
        <p className="text-zinc-500">Revenue tracking, forecasting, and financial metrics</p>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {financialMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-zinc-900 border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-500">{metric.label}</span>
                <Icon size={20} className="text-esh-gold" />
              </div>
              <div className="text-3xl font-light mb-2">{metric.value}</div>
              <div className="text-sm text-green-500">{metric.change}</div>
            </div>
          );
        })}
      </div>

      {/* Revenue & Profit Chart */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-light font-serif mb-1">Revenue & Profit Trend</h2>
            <p className="text-sm text-zinc-500">Monthly performance (YTD)</p>
          </div>
          <div className="flex gap-6">
            <div className="text-right">
              <div className="text-2xl font-light">$1.03M</div>
              <div className="text-xs text-zinc-500">Total Revenue</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-light text-green-500">$82.6K</div>
              <div className="text-xs text-zinc-500">Net Profit</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {monthlyFinancials.map((month) => (
            <div key={month.month}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400 w-12">{month.month}</span>
                <div className="flex gap-6 text-xs">
                  <span className="text-zinc-500">Rev: ${(month.revenue / 1000).toFixed(1)}K</span>
                  <span className="text-esh-gold">Comm: ${(month.commission / 1000).toFixed(1)}K</span>
                  <span className="text-red-400">Exp: ${(month.expenses / 1000).toFixed(1)}K</span>
                  <span className="text-green-500">Profit: ${(month.profit / 1000).toFixed(1)}K</span>
                </div>
              </div>
              <div className="flex gap-1">
                {/* Revenue bar */}
                <div className="flex-1 flex gap-1">
                  <div
                    className="bg-zinc-700 h-8"
                    style={{ width: `${(month.revenue / maxRevenue) * 100}%` }}
                  />
                  <div
                    className="bg-esh-gold h-8"
                    style={{ width: `${(month.commission / maxRevenue) * 100}%` }}
                  />
                  <div
                    className="bg-red-500/50 h-8"
                    style={{ width: `${(month.expenses / maxRevenue) * 100}%` }}
                  />
                  <div
                    className="bg-green-500 h-8"
                    style={{ width: `${(month.profit / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-6 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-zinc-700"></div>
            <span className="text-xs text-zinc-500">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-esh-gold"></div>
            <span className="text-xs text-zinc-500">Commission</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/50"></div>
            <span className="text-xs text-zinc-500">Expenses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500"></div>
            <span className="text-xs text-zinc-500">Net Profit</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Forecast */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl font-light font-serif mb-6">Revenue Forecast</h2>
          <div className="space-y-4">
            {forecast.map((item) => (
              <div key={item.month} className="p-4 bg-black border border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-medium">{item.month} 2026</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.confidence === 'high' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.confidence} confidence
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-light text-esh-gold">
                      ${(item.projected / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-zinc-500">projected</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-esh-gold/10 border border-esh-gold">
            <div className="text-center">
              <div className="text-3xl font-light text-esh-gold mb-1">$1.93M</div>
              <div className="text-sm text-zinc-400">Projected 2026 Revenue</div>
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl font-light font-serif mb-6">Expense Breakdown</h2>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.category}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">{expense.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500">{expense.percentage}%</span>
                    <span className="text-white font-medium">
                      ${(expense.amount / 1000).toFixed(1)}K
                    </span>
                  </div>
                </div>
                <div className="w-full bg-zinc-800 h-3">
                  <div
                    className="bg-red-500 h-3"
                    style={{ width: `${expense.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-black border border-zinc-800 text-center">
            <div className="text-2xl font-light text-red-400 mb-1">$67.7K</div>
            <div className="text-sm text-zinc-500">Total Monthly Expenses</div>
          </div>
        </div>
      </div>

      {/* Pending Contractor Payouts */}
      <div className="bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-light font-serif">Pending Contractor Payouts</h2>
          <div className="text-right">
            <div className="text-2xl font-light text-esh-gold">$42,800</div>
            <div className="text-xs text-zinc-500">Total pending</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {payouts.map((payout) => (
            <div key={payout.contractor} className="p-4 bg-black border border-zinc-800 flex justify-between items-center">
              <div>
                <h3 className="font-medium mb-1">{payout.contractor}</h3>
                <div className="text-xs text-zinc-500">
                  {payout.projects} projects · Due {payout.dueDate}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-light text-esh-gold">{payout.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
