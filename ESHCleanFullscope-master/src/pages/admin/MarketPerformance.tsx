import { MapPin, TrendingUp, Users, Briefcase, Calendar } from 'lucide-react';

export default function MarketPerformance() {
  // Current market (Treasure Coast)
  const treasureCoast = {
    name: 'Treasure Coast',
    status: 'Active',
    launchDate: '2025-10-01',
    contractors: 12,
    leads: 1247,
    projects: 127,
    revenue: '$458,250',
    growth: '+45%',
    cities: ['Port St. Lucie', 'Fort Pierce', 'Stuart', 'Jensen Beach', 'Palm City', 'Vero Beach']
  };

  // City performance within Treasure Coast
  const cityPerformance = [
    { 
      city: 'Port St. Lucie', 
      population: '204,000',
      leads: 487, 
      projects: 58, 
      revenue: '$185,400', 
      contractors: 5,
      avgProjectValue: '$63,200',
      growth: '+52%'
    },
    { 
      city: 'Fort Pierce', 
      population: '47,000',
      leads: 312, 
      projects: 34, 
      revenue: '$98,750', 
      contractors: 4,
      avgProjectValue: '$58,900',
      growth: '+38%'
    },
    { 
      city: 'Stuart', 
      population: '17,000',
      leads: 198, 
      projects: 21, 
      revenue: '$76,450', 
      contractors: 3,
      avgProjectValue: '$61,200',
      growth: '+41%'
    },
    { 
      city: 'Jensen Beach', 
      population: '12,000',
      leads: 124, 
      projects: 8, 
      revenue: '$48,920', 
      contractors: 2,
      avgProjectValue: '$59,400',
      growth: '+29%'
    },
    { 
      city: 'Palm City', 
      population: '25,000',
      leads: 87, 
      projects: 4, 
      revenue: '$28,650', 
      contractors: 1,
      avgProjectValue: '$57,300',
      growth: '+18%'
    },
    { 
      city: 'Vero Beach', 
      population: '17,000',
      leads: 39, 
      projects: 2, 
      revenue: '$20,080', 
      contractors: 1,
      avgProjectValue: '$56,800',
      growth: '+12%'
    }
  ];

  // Expansion markets
  const expansionMarkets = [
    {
      name: 'Space Coast',
      status: 'Q3 2026',
      population: '590,000',
      cities: ['Melbourne', 'Palm Bay', 'Cocoa Beach', 'Titusville'],
      projectedContractors: 15,
      projectedRevenue: '$680K/year',
      confidence: 'High',
      competitors: 3,
      avgHomeValue: '$285,000'
    },
    {
      name: 'Tampa Bay',
      status: 'Q4 2026',
      population: '3.2M',
      cities: ['Tampa', 'St. Petersburg', 'Clearwater', 'Brandon'],
      projectedContractors: 35,
      projectedRevenue: '$2.4M/year',
      confidence: 'Medium',
      competitors: 12,
      avgHomeValue: '$325,000'
    },
    {
      name: 'Sarasota',
      status: 'Q1 2027',
      population: '435,000',
      cities: ['Sarasota', 'Bradenton', 'Venice', 'North Port'],
      projectedContractors: 20,
      projectedRevenue: '$980K/year',
      confidence: 'Medium',
      competitors: 5,
      avgHomeValue: '$398,000'
    }
  ];

  // Market health indicators
  const healthIndicators = [
    { metric: 'Lead Quality Score', value: 84, target: 80, status: 'excellent' },
    { metric: 'Contractor Satisfaction', value: 92, target: 85, status: 'excellent' },
    { metric: 'Customer Satisfaction', value: 96, target: 90, status: 'excellent' },
    { metric: 'Market Penetration', value: 3.2, target: 5.0, status: 'growing' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light font-serif mb-2">Market Performance</h1>
        <p className="text-zinc-500">Geographic expansion tracking and market analytics</p>
      </div>

      {/* Treasure Coast Overview */}
      <div className="bg-zinc-900 border border-esh-gold p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-light font-serif">{treasureCoast.name}</h2>
              <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                {treasureCoast.status}
              </span>
            </div>
            <p className="text-sm text-zinc-500">Launched {treasureCoast.launchDate}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light text-esh-gold mb-1">{treasureCoast.revenue}</div>
            <div className="text-sm text-green-500">{treasureCoast.growth} growth</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="text-center p-4 bg-black border border-zinc-800">
            <div className="text-2xl font-light mb-1">{treasureCoast.contractors}</div>
            <div className="text-xs text-zinc-500">Contractors</div>
          </div>
          <div className="text-center p-4 bg-black border border-zinc-800">
            <div className="text-2xl font-light mb-1">{treasureCoast.leads}</div>
            <div className="text-xs text-zinc-500">Total Leads</div>
          </div>
          <div className="text-center p-4 bg-black border border-zinc-800">
            <div className="text-2xl font-light mb-1">{treasureCoast.projects}</div>
            <div className="text-xs text-zinc-500">Projects</div>
          </div>
          <div className="text-center p-4 bg-black border border-zinc-800">
            <div className="text-2xl font-light mb-1">6</div>
            <div className="text-xs text-zinc-500">Cities</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {treasureCoast.cities.map((city) => (
            <span key={city} className="px-3 py-1 bg-black border border-zinc-800 text-sm">
              {city}
            </span>
          ))}
        </div>
      </div>

      {/* City Performance */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-8">
        <h2 className="text-xl font-light font-serif mb-6">City-Level Performance</h2>
        <div className="space-y-4">
          {cityPerformance.map((city) => (
            <div key={city.city} className="p-4 bg-black border border-zinc-800">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-medium">{city.city}</h3>
                    <span className="text-xs text-zinc-600">Pop: {city.population}</span>
                  </div>
                  <div className="text-sm text-green-500">{city.growth} growth</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-esh-gold mb-1">{city.revenue}</div>
                  <div className="text-xs text-zinc-500">{city.projects} projects</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-zinc-600 text-xs mb-1">Leads</div>
                  <div className="font-medium">{city.leads}</div>
                </div>
                <div>
                  <div className="text-zinc-600 text-xs mb-1">Contractors</div>
                  <div className="font-medium">{city.contractors}</div>
                </div>
                <div>
                  <div className="text-zinc-600 text-xs mb-1">Avg Project</div>
                  <div className="font-medium">{city.avgProjectValue}</div>
                </div>
                <div>
                  <div className="text-zinc-600 text-xs mb-1">Conv. Rate</div>
                  <div className="font-medium">{((city.projects / city.leads) * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Health */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        {healthIndicators.map((indicator) => (
          <div key={indicator.metric} className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="text-sm text-zinc-500 mb-3">{indicator.metric}</div>
            <div className="flex items-end justify-between mb-3">
              <div className="text-3xl font-light">{indicator.value}{indicator.metric.includes('Score') || indicator.metric.includes('Satisfaction') ? '' : '%'}</div>
              <TrendingUp 
                size={20} 
                className={indicator.status === 'excellent' ? 'text-green-500' : 'text-yellow-500'} 
              />
            </div>
            <div className="text-xs text-zinc-600">Target: {indicator.target}</div>
            <div className="w-full bg-zinc-800 h-2 mt-2">
              <div
                className={`h-2 ${indicator.status === 'excellent' ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${(indicator.value / indicator.target) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Expansion Markets */}
      <div className="bg-zinc-900 border border-zinc-800 p-6">
        <h2 className="text-xl font-light font-serif mb-6">Expansion Pipeline</h2>
        <div className="space-y-6">
          {expansionMarkets.map((market) => (
            <div key={market.name} className="p-6 bg-black border border-zinc-800">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={20} className="text-esh-gold" />
                    <h3 className="text-xl font-medium">{market.name}</h3>
                    <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                      {market.status}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500">Population: {market.population}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-esh-gold mb-1">{market.projectedRevenue}</div>
                  <div className="text-xs text-zinc-500">Projected annual</div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-zinc-900 border border-zinc-800 text-center">
                  <Users size={16} className="mx-auto mb-1 text-zinc-600" />
                  <div className="text-lg font-medium">{market.projectedContractors}</div>
                  <div className="text-xs text-zinc-500">Contractors</div>
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-800 text-center">
                  <Briefcase size={16} className="mx-auto mb-1 text-zinc-600" />
                  <div className="text-lg font-medium">{market.competitors}</div>
                  <div className="text-xs text-zinc-500">Competitors</div>
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-800 text-center">
                  <TrendingUp size={16} className="mx-auto mb-1 text-zinc-600" />
                  <div className="text-lg font-medium">{market.avgHomeValue}</div>
                  <div className="text-xs text-zinc-500">Avg Home</div>
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-800 text-center">
                  <Calendar size={16} className="mx-auto mb-1 text-zinc-600" />
                  <div className={`text-lg font-medium ${
                    market.confidence === 'High' ? 'text-green-500' : 'text-yellow-500'
                  }`}>
                    {market.confidence}
                  </div>
                  <div className="text-xs text-zinc-500">Confidence</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {market.cities.map((city) => (
                  <span key={city} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
