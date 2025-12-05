import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, DollarSign, Home, Lightbulb, Zap, Leaf, Shield } from "lucide-react";

export default function SouthCarolinaRebates() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-green-700">Beaufort Energy Rebates</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#stacking" className="text-gray-700 hover:text-green-700 transition">Stacking</a>
            <a href="#incentives" className="text-gray-700 hover:text-green-700 transition">Incentives</a>
            <a href="#calculator" className="text-gray-700 hover:text-green-700 transition">Calculator</a>
            <Button className="bg-green-700 hover:bg-green-800">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Stacking Your Savings: A Beaufort Homeowner's Guide to Energy Incentives
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Living in the Lowcountry offers unmatched beauty, but it also comes with unique challenges like high humidity and the risk of hurricanes. What if you could make your home more comfortable, resilient, and energy-efficient while taking advantage of thousands of dollars in incentives?
              </p>
              <div className="flex gap-4">
                <Button className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
                  Explore Incentives <ChevronRight className="ml-2" />
                </Button>
                <Button variant="outline" className="text-lg px-8 py-6">Learn More</Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/sc-hero-beaufort-home.jpg" 
                alt="Classic Beaufort home with solar panels" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                <p className="text-sm font-semibold text-gray-900">Beaufort charm meets modern efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hurricane-Ready Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Hurricane-Ready and Energy-Smart</h2>
              <p className="text-lg text-gray-700 mb-6">
                In Beaufort, a major home upgrade can serve two purposes. Impact windows not only provide crucial storm protection but also significantly improve your home's energy efficiency. Similarly, a modern, High-SEER HVAC system is essential for humidity control, which prevents mold and lowers your energy bills, making your home a healthier and safer environment.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Storm Protection</p>
                    <p className="text-gray-700">Impact windows and doors withstand hurricane-force winds</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Energy Efficiency</p>
                    <p className="text-gray-700">Reduce cooling costs in the humid Lowcountry climate</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Leaf className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Humidity Control</p>
                    <p className="text-gray-700">Prevent mold and moisture damage with proper HVAC</p>
                  </div>
                </div>
              </div>
            </div>
            <img 
              src="/images/sc-impact-window-marsh.jpg" 
              alt="Impact window with marsh view" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Rebate vs Credit */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Understanding the Incentives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-blue-700">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">Rebate (Utility Check)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  This is a direct payment or discount from your utility company (like Dominion Energy or Palmetto Electric). It's cash back that reduces your upfront cost.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Example:</p>
                  <p className="text-gray-700">Dominion Energy "Double Rebate": Up to $1,000 for heat pumps</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-700">
              <CardHeader>
                <CardTitle className="text-2xl text-green-700">Tax Credit (Tax Deduction)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  This is a dollar-for-dollar reduction of your state or federal income tax liability. You claim this when you file your taxes.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Example:</p>
                  <p className="text-gray-700">SC Solar Tax Credit: 25% of cost, max $3,500/year</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stacking Savings Visual */}
      <section id="stacking" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Stacking Your Savings</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            The key to maximizing your return on investment is to layer incentives from different sources
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img 
              src="/images/sc-stacking-savings-diagram.jpg" 
              alt="Stacking Your Savings infographic" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-l-green-700">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Federal Incentives</h3>
                <p className="text-gray-700 mb-2">Energy Efficient Home Improvement Credit (25C)</p>
                <p className="text-2xl font-bold text-green-700">30% of cost, up to $3,200/year</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-l-blue-700">
                <h3 className="text-xl font-bold text-gray-900 mb-2">SC State Incentives</h3>
                <p className="text-gray-700 mb-2">Solar Tax Credit + Fortification Credit</p>
                <p className="text-2xl font-bold text-blue-700">25% + up to $1,000</p>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-l-amber-700">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Utility Rebates</h3>
                <p className="text-gray-700 mb-2">Dominion Energy & Palmetto Electric</p>
                <p className="text-2xl font-bold text-amber-700">Up to $1,000+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incentives Table */}
      <section id="incentives" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Available Incentives at a Glance</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Multiple sources of savings for Beaufort homeowners
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Incentive Source</th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Program Name</th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Benefit</th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Key Upgrades</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-green-50 transition">
                  <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">Federal</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Energy Efficient Home Improvement Credit (25C)</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">30% of cost, up to <strong>$3,200/yr</strong></td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Heat Pumps, Insulation, Windows, Doors</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-green-50 transition">
                  <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">SC State</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">SC Solar Energy Tax Credit</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">25% of cost, max <strong>$3,500/yr</strong> (10-yr carryover)</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Solar Panels</td>
                </tr>
                <tr className="hover:bg-green-50 transition">
                  <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">SC State</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">SC Fortification Credit</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Up to <strong>$1,000</strong> tax credit</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Wind-resistant roofing, windows, doors</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-green-50 transition">
                  <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">Utility</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Dominion Energy Rebates</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Up to <strong>$1,000</strong> (seasonal "Double Rebate")</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">High-SEER Heat Pumps</td>
                </tr>
                <tr className="hover:bg-green-50 transition">
                  <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">Utility</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Palmetto Electric Rebates</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Up to <strong>$1,000</strong> ("Buried Treasure")</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">Geothermal HVAC systems</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Heat Pump Installation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Modern HVAC for the Lowcountry</h2>
              <p className="text-lg text-gray-700 mb-6">
                A high-SEER heat pump is the perfect solution for Beaufort's humid climate. It provides efficient cooling in summer, heating in winter, and helps control moisture to prevent mold growth.
              </p>
              <div className="space-y-4 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Federal Tax Credit</p>
                  <p className="text-gray-700">30% of cost, up to $2,000 for heat pumps</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Dominion Energy "Double Rebate"</p>
                  <p className="text-gray-700">Up to $1,000 (seasonal, Nov-Jan 2025)</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Palmetto Electric Rebate</p>
                  <p className="text-gray-700">Up to $1,000 for geothermal systems</p>
                </div>
              </div>
              <Button className="bg-green-700 hover:bg-green-800 text-lg px-6 py-3">
                Get HVAC Quote
              </Button>
            </div>
            <img 
              src="/images/sc-heat-pump-installation.jpg" 
              alt="HVAC technician installing heat pump" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Spray Foam Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img 
              src="/images/sc-spray-foam-attic.jpg" 
              alt="Spray foam insulation application in attic" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Spray Foam: Moisture Control & Efficiency</h2>
              <p className="text-lg text-gray-700 mb-6">
                In the humid Lowcountry, proper attic insulation and moisture control are critical. Spray foam insulation creates an air-tight seal that prevents moisture infiltration and mold growth while maximizing energy efficiency.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <Leaf className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Mold Prevention</p>
                    <p className="text-gray-700">Air-tight seal prevents moisture infiltration</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Energy Savings</p>
                    <p className="text-gray-700">Reduces cooling costs in humid climate</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Home className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Federal Tax Credit</p>
                    <p className="text-gray-700">30% of cost, up to $1,200/year</p>
                  </div>
                </div>
              </div>
              <Button className="bg-green-700 hover:bg-green-800 text-lg px-6 py-3">
                Get Insulation Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">The Beaufort ROI Calculator</h2>
          <p className="text-center text-gray-700 mb-12 text-lg">
            Stacking in Action: A $12,000 High-Efficiency Heat Pump Installation
          </p>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Cost/Benefit</th>
                  <th className="px-6 py-4 text-right font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Initial Project Cost</td>
                  <td className="px-6 py-4 text-right font-bold text-lg text-gray-900">$12,000</td>
                  <td className="px-6 py-4 text-gray-700">High-SEER Heat Pump installation</td>
                </tr>
                <tr className="border-b border-gray-200 bg-green-50 hover:bg-green-100">
                  <td className="px-6 py-4 font-semibold text-gray-900">Federal Tax Credit (25C)</td>
                  <td className="px-6 py-4 text-right font-bold text-lg text-green-700">-$2,000</td>
                  <td className="px-6 py-4 text-gray-700">30% credit, capped at $2,000 for heat pumps</td>
                </tr>
                <tr className="border-b border-gray-200 bg-blue-50 hover:bg-blue-100">
                  <td className="px-6 py-4 font-semibold text-gray-900">Dominion Energy Rebate</td>
                  <td className="px-6 py-4 text-right font-bold text-lg text-blue-700">-$1,000</td>
                  <td className="px-6 py-4 text-gray-700">Maximum seasonal "Double Rebate" from utility</td>
                </tr>
                <tr className="border-b border-gray-200 bg-amber-50 hover:bg-amber-100">
                  <td className="px-6 py-4 font-semibold text-gray-900">Energy Savings (5 Years)</td>
                  <td className="px-6 py-4 text-right font-bold text-lg text-amber-700">-$4,000</td>
                  <td className="px-6 py-4 text-gray-700">Estimated savings from more efficient system</td>
                </tr>
                <tr className="bg-gray-900 text-white">
                  <td className="px-6 py-4 font-bold text-lg">Net Cost After 5 Years</td>
                  <td className="px-6 py-4 text-right font-bold text-2xl">$5,000</td>
                  <td className="px-6 py-4">A 58% reduction in your initial investment</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-green-700">58%</CardTitle>
                <CardDescription>Cost Reduction</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Your true investment after incentives and savings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">$7,000</CardTitle>
                <CardDescription>Total Incentives</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Federal credits, rebates, and energy savings combined</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-amber-700">5 Years</CardTitle>
                <CardDescription>Payback Period</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">After which the system pays for itself</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solar Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Solar Energy: Long-Term Independence</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            South Carolina offers exceptional solar incentives for homeowners
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-2xl">Federal Tax Credit</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-green-700 mb-2">30%</p>
                <p className="text-gray-700">Of your total system cost</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-2xl">SC Solar Tax Credit</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-blue-700 mb-2">25%</p>
                <p className="text-gray-700">Max $3,500/year with 10-year carryover</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200">
              <CardHeader className="bg-amber-50">
                <CardTitle className="text-2xl">Property Tax</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-amber-700 mb-2">Exempt</p>
                <p className="text-gray-700">On the added home value from solar</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
              Get Solar Quote
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Stack Your Savings?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a free home energy audit and discover how much you can save with federal, state, and utility incentives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-6">
              Get Free Audit
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-green-800 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">About</h3>
              <p className="text-sm">Helping Beaufort homeowners access government incentives for energy efficiency and home resilience.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Energy Audit</a></li>
                <li><a href="#" className="hover:text-white transition">Find Contractors</a></li>
                <li><a href="#" className="hover:text-white transition">Tax Credits</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Incentives</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Federal Credits</a></li>
                <li><a href="#" className="hover:text-white transition">SC State Credits</a></li>
                <li><a href="#" className="hover:text-white transition">Utility Rebates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Contact</h3>
              <p className="text-sm">Questions? We're here to help.</p>
              <p className="text-sm mt-2">Email: beaufort@energyrebates.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 Beaufort Energy Rebates. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
