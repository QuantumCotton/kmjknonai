import { useState } from 'react';
import { Calendar, Download, TrendingUp, TrendingDown } from 'lucide-react';
import Button from '../../components/shared/Button';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  // Lead source performance
  const leadSources = [
    { source: 'Atlas Chatbot', leads: 487, conversions: 124, rate: 25.5, cost: '$2,340', cpl: '$4.80' },
    { source: 'Google Ads', leads: 312, conversions: 68, rate: 21.8, cost: '$4,560', cpl: '$14.62' },
    { source: 'Organic Search', leads: 198, conversions: 52, rate: 26.3, cost: '$0', cpl: '$0' },
    { source: 'Referrals', leads: 156, conversions: 48, rate: 30.8, cost: '$0', cpl: '$0' },
    { source: 'Facebook Ads', leads: 94, conversions: 18, rate: 19.1, cost: '$1,280', cpl: '$13.62' }
  ];

  // Service type performance
  const serviceTypes = [
    { type: 'Kitchen Remodel', leads: 687, avgValue: '$62,400', convRate: 24.8, margin: 15 },
    { type: 'Bathroom Remodel', leads: 421, avgValue: '$38,900', convRate: 26.1, margin: 15 },
    { type: 'Kitchen + Bath', leads: 139, avgValue: '$98,500', convRate: 31.2, margin: 15 }
  ];

  // Hourly lead distribution
  const hourlyData = [
    { hour: '12am', leads: 12 }, { hour: '3am', leads: 8 }, { hour: '6am', leads: 18 },
    { hour: '9am', leads: 67 }, { hour: '12pm', leads: 98 }, { hour: '3pm', leads: 124 },
    { hour: '6pm', leads: 156 }, { hour: '9pm', leads: 89 }
  ];

  const maxHourly = Math.max(...hourlyData.map(d => d.leads));

  // Weekly trends
  const weeklyTrends = [
    { metric: 'Lead Volume', current: 312, previous: 287, change: '+8.7%', trend: 'up' as const },
    { metric: 'Conversion Rate', current: 24.3, previous: 22.1, change: '+2.2%', trend: 'up' as const },
    { metric: 'Avg Project Value', current: 58750, previous: 61200, change: '-4.0%', trend: 'down' as const },
    { metric: 'Lead Response Time', current: 2.4, previous: 3.1, change: '-22.6%', trend: 'up' as const }
  ];

  // Geographic performance
  const geoData = [
    { city: 'Port St. Lucie', leads: 342, projects: 89, revenue: '$5.2M' },
    { city: 'Fort Pierce', leads: 198, projects: 52, revenue: '$3.1M' },
    { city: 'Stuart', leads: 156, projects: 41, revenue: '$2.4M' },
    { city: 'Jensen Beach', leads: 124, projects: 32, revenue: '$1.9M' },
    { city: 'Palm City', leads: 98, projects: 27, revenue: '$1.6M' },
    { city: 'Vero Beach', leads: 82, projects: 22, revenue: '$1.3M' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light font-serif mb-2">Analytics & Reports</h1>
          <p className="text-zinc-500">Detailed performance metrics and insights</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-esh-gold"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="accent">
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {weeklyTrends.map((trend) => (
          <div key={trend.metric} className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="text-sm text-zinc-500 mb-2">{trend.metric}</div>
            <div className="flex items-end justify-between mb-2">
              <div className="text-3xl font-light">
                {trend.metric.includes('Rate') || trend.metric.includes('Time') 
                  ? trend.current.toFixed(1) 
                  : trend.metric.includes('Value')
                    ? `$${(trend.current / 1000).toFixed(0)}K`
                    : trend.current
                }
              </div>
              {trend.trend === 'up' ? (
                <TrendingUp size={24} className="text-green-500" />
              ) : (
                <TrendingDown size={24} className="text-red-500" />
              )}
            </div>
            <div className={`text-sm ${trend.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend.change} vs last week
            </div>
          </div>
        ))}
      </div>

      {/* Lead Source Performance */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-8">
        <h2 className="text-xl font-light font-serif mb-6">Lead Source Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-zinc-500">Source</th>
                <th className="text-right p-3 text-sm font-medium text-zinc-500">Leads</th>
                <th className="text-right p-3 text-sm font-medium text-zinc-500">Conversions</th>
                <th className="text-right p-3 text-sm font-medium text-zinc-500">Conv. Rate</th>
                <th className="text-right p-3 text-sm font-medium text-zinc-500">Cost</th>
                <th className="text-right p-3 text-sm font-medium text-zinc-500">CPL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {leadSources.map((source) => (
                <tr key={source.source} className="hover:bg-zinc-800/50">
                  <td className="p-3 font-medium">{source.source}</td>
                  <td className="p-3 text-right">{source.leads}</td>
                  <td className="p-3 text-right text-esh-gold">{source.conversions}</td>
                  <td className="p-3 text-right">
                    <span className={source.rate >= 25 ? 'text-green-500' : 'text-zinc-400'}>
                      {source.rate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-3 text-right text-zinc-400">{source.cost}</td>
                  <td className="p-3 text-right">
                    <span className={source.cpl === '$0' ? 'text-green-500' : 'text-zinc-400'}>
                      {source.cpl}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Service Type Performance */}
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl font-light font-serif mb-6">Service Type Performance</h2>
          <div className="space-y-4">
            {serviceTypes.map((service) => (
              <div key={service.type} className="p-4 bg-black border border-zinc-800">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{service.type}</h3>
                  <span className="text-esh-gold font-medium">{service.avgValue}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-zinc-500 text-xs mb-1">Leads</div>
                    <div className="font-medium">{service.leads}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 text-xs mb-1">Conv. Rate</div>
                    <div className="font-medium text-green-500">{service.convRate}%</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 text-xs mb-1">Margin</div>
                    <div className="font-medium">{service.margin}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Lead Distribution */}
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl font-light font-serif mb-6">Hourly Lead Distribution</h2>
          <div className="space-y-3">
            {hourlyData.map((data) => (
              <div key={data.hour}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">{data.hour}</span>
                  <span className="text-white font-medium">{data.leads} leads</span>
                </div>
                <div className="w-full bg-zinc-800 h-6">
                  <div
                    className="bg-esh-gold h-6 transition-all"
                    style={{ width: `${(data.leads / maxHourly) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-black border border-zinc-800 text-center">
            <div className="text-sm text-zinc-500">Peak Hours: 6pm - 9pm</div>
          </div>
        </div>
      </div>

      {/* Geographic Performance */}
      <div className="bg-zinc-900 border border-zinc-800 p-6">
        <h2 className="text-xl font-light font-serif mb-6">Geographic Performance (Treasure Coast)</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {geoData.map((city) => (
            <div key={city.city} className="p-4 bg-black border border-zinc-800">
              <h3 className="font-medium mb-3">{city.city}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Leads</span>
                  <span className="font-medium">{city.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Projects</span>
                  <span className="font-medium text-esh-gold">{city.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Revenue</span>
                  <span className="font-medium text-green-500">{city.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
